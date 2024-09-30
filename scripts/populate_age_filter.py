from pprint import pprint
import json
import csv
import psycopg2
import os
from psycopg2.extras import Json
psycopg2.extras.register_uuid()
import uuid
from urllib.parse import urlparse
import traceback
from collections import OrderedDict

# Connect to your postgres DB
conn = psycopg2.connect(
    dbname=os.environ.get('DATABASE_NAME'),
    user=os.environ.get('DATABASE_USER'),
    password=os.environ.get('DATABASE_PASSWORD'),
    host=os.environ.get('DATABASE_HOST'),
    port=os.environ.get('DATABASE_PORT'),
)

userid_map = {
    'doobneek':'338c2517-27d5-4d40-ad53-9e6ef71822a6',
    'Gavilán' : '3d9f45a6-3418-4415-ad08-52c5a10dc218',
    'Kiesha': '364903f1-1c9a-46e9-bb3c-2884e1ba8bce',
    'Liz': '410370eb-f81b-474e-bdce-ba0994761730',
}

# Open a cursor to perform database operations
cur = conn.cursor()

cur.execute("select id from eligibility_parameters where name = 'age'")
age_parameter_id = cur.fetchone()[0]


# optional: reset db (for test purposes only)
# cur.execute("delete from eligibility where parameter_id = %s", (age_parameter_id,))
# conn.commit()


SOURCE = '20240828 YourPeer Age and Population Served sheet - 20240508.csv'

with open(SOURCE) as f:
    ungrouped_rows = [
        {
            'eligible_values' : {
                'population_served': None if row['Population served'] == '' else row['Population served'],
                'age_max' : None if row['Age max (inclusive)'] in ('', '?') else int(row['Age max (inclusive)']),
                'age_min': None if row['Age min'] == '' else int(row['Age min']),
                'all_ages': bool(row['All ages']),
            },
            'gogetta_url': row['gogetta_link (service)'],
            'updated_by': row['updated_by'],
        }
        for row in csv.DictReader(f)
    ]

# group by gogetta_url and aggregate eligible_values
grouped_rows = OrderedDict()
for row in ungrouped_rows:
    gogetta_url = row['gogetta_url']
    eligible_values = row['eligible_values']
    updated_by = row['updated_by']
    if updated_by and \
        (eligible_values['age_max'] or \
            eligible_values['age_min'] or \
            eligible_values['all_ages']):
        if gogetta_url in grouped_rows:
            grouped_rows[gogetta_url]['eligible_values'].append(eligible_values)
        else:
            grouped_rows[gogetta_url] = {
                'eligible_values': [eligible_values],
                'updated_by': userid_map[updated_by],
            }

print('number of rows', len(grouped_rows))
#pprint(rows)

def validate_service_id(service_id):
    uuid_service_id = uuid.UUID(service_id)
    # verify that service exists
    cur.execute('select count(1) from services where id = %s', (service_id, ))
    assert cur.fetchone()[0] == 1

with open('out.csv', 'w') as f:

    writer = csv.DictWriter(f, 
        fieldnames=['status', 'op', 'gogetta_url', 'eligible_values'])
    writer.writeheader()

    for i, [gogetta_url, row] in enumerate(grouped_rows.items()): 
        eligible_values = row['eligible_values']
        updated_by = row['updated_by']
        print(i)
        try:
            service_id = urlparse(gogetta_url).path.split('/')[-1]
            validate_service_id(service_id)
        except:
            writer.writerow({
                'status': f'ERROR: Unable to find a service_id for given row: {traceback.format_exc()}',
                **row
            })
            continue

        # accumulate results. If there's already a row in the database, append another age filter to him
        cur.execute('''
            select id, eligible_values from eligibility where parameter_id = %s and service_id = %s
        ''', (
            age_parameter_id,
            service_id,
        ))
        existing_row = cur.fetchone()
        # TODO: check that the row has a creator
        if existing_row:
            # update only if changed
            existing_row_id, existing_row_eligible_values = existing_row
            if  != eligible_values:
                # nothing to do
                op = 'SKIP'
            else:
                op = 'UPDATE'
                cur.execute('''
                    update eligibility
                        set eligible_values = %s
                        where parameter_id = %s and service_id = %s
                ''', (
                    Json(eligible_values),
                    age_parameter_id,
                    service_id,
                ))
                cur.execute('''
                    insert into metadata
                        (
                            id,
                            resource_id,
                            resource_table,
                            last_action_date,
                            last_action_type,
                            field_name,
                            previous_value,
                            replacement_value,
                            updated_by,
                            created_at,
                            updated_at,
                            source
                        )
                        values (
                            %s,
                            %s,
                            'eligibility',
                            now(),
                            'update',
                            'eligible_values',
                            %s,
                            %s,
                            %s,
                            now(),
                            now(),
                            %s
                        )
                ''', (
                    str(uuid.uuid4()),
                    existing_row_id,
                    json.dumps(existing_row_eligible_values),
                    json.dumps(eligible_values),
                    updated_by,
                    SOURCE,
                ))
        else:
            op = 'INSERT'
            # TODO: add a row to metadata table
            (new_row_id,) = cur.execute('''
                insert into eligibility
                    (
                        id,
                        eligible_values,
                        created_at,
                        updated_at,
                        parameter_id,
                        service_id
                    )
                    values(
                        %s,
                        %s,
                        NOW(),
                        NOW(),
                        %s,
                        %s
                    )
                    returning id
            ''', (
                str(uuid.uuid4()),
                Json(eligible_values),
                age_parameter_id,
                service_id,
            ))
            for field_name, replacement_value in (
                ('eligible_values', json.dumps(eligible_values)),
                ('parameter_id', age_parameter_id),
                ('service_id', service_id),
            ):
                cur.execute('''
                    insert into metadata
                        (
                            id,
                            resource_id,
                            resource_table,
                            last_action_date,
                            last_action_type,
                            field_name,
                            previous_value,
                            replacement_value,
                            updated_by,
                            created_at,
                            updated_at,
                            source
                        )
                        values (
                            %s,
                            %s,
                            'eligibility',
                            now(),
                            'create',
                            %s,
                            null,
                            %s,
                            %s,
                            now(),
                            now(),
                            %s
                        )
                ''', (
                    str(uuid.uuid4()),
                    new_row_id,
                    field_name,
                    replacement_value,
                    updated_by,
                    SOURCE,
                ))


        #cur.execute("SELECT * FROM services where id = %s", (service_id,))
        conn.commit()

        writer.writerow({
            'status': 'SUCCESS',
            'op': op,
            'gogetta_url': gogetta_url,
            'eligible_values': eligible_values
        })
        f.flush()

        #x = cur.execute(f"SELECT * FROM locations where id = '{location_id}'")
        #print(i, x, row)
        #cur.execute("SELECT * FROM locations where id = $1", (row['location_id'],))

