import { Category, SearchParams, parseSearchParams } from '../../common';
import LocationsMap from "../map";
import { fetchLocations } from '../streetlives-api-service';

export default async function MapContainerPage({ searchParams }: { searchParams: SearchParams }) {
    const category:Category = null; // TODO: get category from the route
    const parsedSearchParams = parseSearchParams(searchParams);
    const { locationStubs } = await fetchLocations(
      category,
      parsedSearchParams
    );
    return <LocationsMap locationStubs={locationStubs} />
;
}

