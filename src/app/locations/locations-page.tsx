import SearchForm from "./search-form";
import QuickExit from "./quick-exit";
import {
  AGE_PARAM,
  Category,
  CATEGORY_TO_TAXONOMY_NAME_MAP,
  LocationDetailData,
  OPEN_PARAM,
  SearchParams,
  SEARCH_PARAM,
  ShelterValues,
  SHELTER_PARAM,
  SHELTER_PARAM_FAMILY_VALUE,
  SHELTER_PARAM_SINGLE_VALUE,
  YourPeerSearchParams,
  TaxonomyResponse,
  Taxonomy,
  SHOW_ADVANCED_FILTERS_PARAM,
  SimplifiedLocationData,
  FullLocationData,
  ServiceData,
  CategoryNotNull,
  YourPeerLegacyServiceData,
  TAXONOMY_CATEGORIES,
  YourPeerLegacyLocationData,
  YourPeerLegacyServiceDataWrapper,
  setIntersection,
  TaxonomyCategory,
} from "../common";
import FiltersPopup from "./filters-popup";
import FiltersHeader from "./filters-header";
import LocationsContainer from "./locations-container";
import moment from "moment";

const GO_GETTA_PROD_URL = process.env.GO_GETTA_PROD_URL;
const DEFAULT_PAGE_SIZE = 20;

async function fetchLocationsDetailData(
  location_id: string
): Promise<LocationDetailData> {
  const query_url = `${GO_GETTA_PROD_URL}/locations/${location_id}`;
  return fetch(query_url).then((response) => response.json());
}

export interface LocationsDataResponse<T extends SimplifiedLocationData> {
  locations: T[];
  numberOfPages: number;
  resultCount: number;
}

async function fetchLocationsData<T extends SimplifiedLocationData>({
  page_num = 0,
  page_size = DEFAULT_PAGE_SIZE,
  taxonomies,
  taxonomy_specific_attributes = undefined,
  no_requirement = undefined,
  referral_required = undefined,
  membership = undefined,
  open = false,
  search = undefined,
  location_fields_only,
  age = undefined,
  shelter = undefined,
}: {
  page_num?: number;
  page_size?: number;
  taxonomies: string[] | null;
  taxonomy_specific_attributes?: string[];
  no_requirement?: boolean | null;
  referral_required?: boolean | null;
  membership?: boolean | null;
  open?: boolean | null;
  search?: string | null;
  location_fields_only?: boolean;
  age?: number | null;
  shelter?: string | null;
}): Promise<LocationsDataResponse<T>> {
  // TODO: handle shelter type by looking up the appropriate taxonomy
  // TODO: maybe convert this function to use a url parse library, as opposed to string concatenation
  let query_url = `${GO_GETTA_PROD_URL}/locations?occasion=COVID19`;
  if (page_num !== undefined && page_size !== undefined) {
    query_url += `&pageNumber=${page_num}&pageSize=${page_size}`;
  }
  if (location_fields_only) {
    query_url += `&locationFieldsOnly=true`;
  }
  if (age) {
    query_url += `&age=${age}`;
  }
  if (taxonomies && taxonomies.length) {
    query_url += `&taxonomyId=${taxonomies.join(",")}`;
  }
  if (taxonomy_specific_attributes) {
    query_url +=
      "&" +
      taxonomy_specific_attributes
        .map((a, i) => `taxonomySpecificAttribute[${i}]=${a}`)
        .join("&");
  }
  if (no_requirement) {
    if (!referral_required) {
      query_url += `&referralRequired=false`;
    }
    if (!membership) {
      query_url += `&membership=false`;
    }
  } else {
    if (referral_required !== undefined) {
      query_url += `&referralRequired=${referral_required}`;
    }
    if (membership !== undefined) {
      query_url += `&membership=${membership}`;
    }
  }

  if (search) {
    query_url += `&searchString=${search}`;
  }

  if (open) {
    query_url += `&openAt=${new Date().toISOString()}`;
  }

  console.log("query_url", query_url);

  const gogetta_response = await fetch(query_url);
  const numberOfPages = parseInt(
    gogetta_response.headers.get("Pagination-Count") || "0",
    10
  );
  const resultCount = parseInt(
    gogetta_response.headers.get("Total-Count") || "0",
    10
  );
  const locations = recursiveParseUpdatedAt<T>(
    (await gogetta_response.json()) as unknown
  );
  return {
    locations,
    numberOfPages,
    resultCount,
  };
}

function recursiveParseUpdatedAt<T extends SimplifiedLocationData>(
  gogetta_response: any
): T[] {
  Object.entries(gogetta_response).forEach(([k, v]) => {
    if (k === "updatedAt" || k === 'last_validated_at') {
      gogetta_response[k] = new Date(v as string);
    } else if (typeof v === "object" && v) {
      recursiveParseUpdatedAt(v);
    }
  });
  return gogetta_response;
}

export async function getSimplifiedLocationData({
  taxonomies,
  taxonomy_specific_attributes = undefined,
  no_requirement = undefined,
  referral_required = undefined,
  membership = undefined,
  open = false,
  search = undefined,
  age = undefined,
  shelter = undefined,
}: {
  page_num?: number;
  page_size?: number;
  taxonomies: string[] | null;
  taxonomy_specific_attributes?: string[];
  no_requirement?: boolean | null;
  referral_required?: boolean | null;
  membership?: boolean | null;
  open?: boolean | null;
  search?: string | null;
  age?: number | null;
  shelter?: string | null;
}): Promise<SimplifiedLocationData[]> {
  const response: LocationsDataResponse<SimplifiedLocationData> =
    await fetchLocationsData<SimplifiedLocationData>({
      taxonomies,
      taxonomy_specific_attributes,
      no_requirement,
      referral_required,
      membership,
      open,
      search,
      age,
      shelter,
      location_fields_only: true,
    });
  return response.locations;
}

export async function getFullLocationData({
  page_num = 0,
  page_size = DEFAULT_PAGE_SIZE,
  taxonomies,
  taxonomy_specific_attributes = undefined,
  no_requirement = undefined,
  referral_required = undefined,
  membership = undefined,
  open = false,
  search = undefined,
  age = undefined,
  shelter = undefined,
}: {
  page_num?: number;
  page_size?: number;
  taxonomies: string[] | null;
  taxonomy_specific_attributes?: string[];
  no_requirement?: boolean | null;
  referral_required?: boolean | null;
  membership?: boolean | null;
  open?: boolean | null;
  search?: string | null;
  age?: number | null;
  shelter?: string | null;
}): Promise<LocationsDataResponse<FullLocationData>> {
  return fetchLocationsData<FullLocationData>({
    page_num,
    page_size,
    taxonomies,
    taxonomy_specific_attributes,
    no_requirement,
    referral_required,
    membership,
    open,
    search,
    age,
    shelter,
    location_fields_only: false,
  });
}

function filter_services_by_name(
  d: FullLocationData,
  is_location_detail: boolean,
  category_name: Category
): YourPeerLegacyServiceDataWrapper {
  const services: YourPeerLegacyServiceData[] = [];
  for (let service of d.Services) {
    let age_eligibilities = null;
    const taxonomiesForService = new Set(
      service.Taxonomies.flatMap((taxonomy) => [
        taxonomy.name,
        taxonomy.parent_name,
      ])
      .filter(t => t !== null)
    )
    if (
      !category_name ||
      taxonomiesForService.has(CATEGORY_TO_TAXONOMY_NAME_MAP[category_name])
    ) {
      if (is_location_detail && service.Eligibilities) {
        age_eligibilities = [];
        for (let elig of service.Eligibilities) {
          if (elig.EligibilityParameter.name === "age") {
            for (let elig_value of elig.eligible_values) {
              age_eligibilities.push(elig_value);
            }
          }
        }
      }
      services.push({
        name: service["name"],
        description: service["description"],
        category: service["Taxonomies"][0]["parent_name"],
        subcategory: service["Taxonomies"][0]["name"],
        info: service?.EventRelatedInfos?.map((x) => x.information).filter(
          (information) => information !== null
        ),
        closed: !!service?.HolidaySchedules?.filter((x) => x.closed).length,
        schedule: {}, // TODO
        docs: is_location_detail
          ? service.RequiredDocuments.filter(
              (doc) => doc.document && doc.document != "None"
            ).map((doc) => doc.document)
          : null,
        referral_letter: is_location_detail
          ? !!service.RequiredDocuments.filter((doc) =>
              doc.document.toLowerCase().includes("referral letter")
            ).length
          : null,
        eligibility: is_location_detail
          ? service.Eligibilities.map(
              (eligibility) => eligibility.description
            ).filter((description) => description !== null)
          : null,
        membership: is_location_detail
          ? !!service.Eligibilities.filter(
              (eligibility) =>
                eligibility.EligibilityParameter.name
                  .toLowerCase()
                  .includes("membership") &&
                eligibility.eligible_values.length &&
                !eligibility.eligible_values
                  .map((elig_value) => elig_value.toLowerCase())
                  .includes("false")
            ).length
          : null,
        age: age_eligibilities,
      });
    }
  }
  return { services };
}

function map_gogetta_to_yourpeer(
  d: FullLocationData,
  is_location_detail: boolean
): YourPeerLegacyLocationData {
  const org_name = d["Organization"]["name"];
  const address = d["PhysicalAddresses"][0];
  const updated_at = d["last_validated_at"];
  return {
    id: d.id,
    location_name: d["name"],
    address: address.address_1,
    city: address.city,
    region: address.region,
    state: address.state_province,
    zip: address.postal_code,
    lat: d["position"]["coordinates"][1],
    lng: d["position"]["coordinates"][0],
    area: address.neighborhood,
    info: null,
    slug: `/locations/${d["slug"]}`,
    last_updated: moment(updated_at).endOf("day").fromNow(),
    last_updated_date: updated_at,
    name: org_name,
    phone: d["Phones"] && d["Phones"][0] && d["Phones"][0]["number"],
    url: d["Organization"]["url"],
    accommodation_services: filter_services_by_name(
      d,
      is_location_detail,
      "shelters-housing"
    ),
    food_services: filter_services_by_name(d, is_location_detail, "food"),
    clothing_services: filter_services_by_name(
      d,
      is_location_detail,
      "clothing"
    ),
    personal_care_services: filter_services_by_name(
      d,
      is_location_detail,
      "personal-care"
    ),
    health_services: filter_services_by_name(
      d,
      is_location_detail,
      "health-care"
    ),
    other_services: {
      services: filter_services_by_name(
        d,
        is_location_detail,
        null
      ).services.filter(
        (service) => {
          const serviceCategorySet = new Set([
            service.category,
            service.subcategory,
          ]);
          return !Array.from(
            setIntersection(
              serviceCategorySet,
              new Set<TaxonomyCategory>([
                "Health",
                "Shelter",
                "Food",
                "Clothing",
                "Personal Care",
              ])
            )
          ).length;
        }
      ),
    },
    closed: d["closed"],
  };
}

// TODO: we probably don't want to look this up every time. We probably at least want to cache it
// TODO: add support for HTTP caching (e.g. ETag or Last-Modified headers) on streetlives-api
async function getTaxonomies(
  category: Category,
  parsedSearchParams: YourPeerSearchParams
): Promise<string[] | null> {
  const query_url = `${GO_GETTA_PROD_URL}/taxonomy`;
  const taxonomyResponse = await fetch(query_url).then(
    (response) => response.json() as unknown as TaxonomyResponse[]
  );
  if (!category) return null;
  const parentTaxonomyName = CATEGORY_TO_TAXONOMY_NAME_MAP[category];
  // FIXME: currently it's only two layers deep. Technically, taxonomy can be arbitrary depth, and we should handle that case
  let taxonomies: Taxonomy[] = [];
  switch (category) {
    case "clothing":
      // TODO: do this after we finish the other filters

      // query = TAXONOMIES_BASE_SQL + " and t.name = 'Clothing'"
      // if is_casual:
      //     taxonomy_specific_attributes.append('clothingOccasion')
      //     taxonomy_specific_attributes.append('everyday')
      // elif is_professional:
      //     taxonomy_specific_attributes.append('clothingOccasion')
      //     taxonomy_specific_attributes.append('interview')

      break;
    case "food":
      // TODO: do this after we finish the other filters

      // if food_pantry:
      //     query += "and t.name='Food Pantry'"
      // elif soup_kitchen:
      //     query += "and t.name='Soup Kitchen'"
      // else:
      //     query += "and t.name='Food'"
      break;
    case "health-care":
    //    query = TAXONOMIES_BASE_SQL + " and (t.name='Health' or t.parent_name = 'Health')"
    case "other":
      //query = TAXONOMIES_BASE_SQL + " and (t.name = 'Other service' or t.parent_name = 'Other service')"
      taxonomies = taxonomyResponse.flatMap((r) =>
        r.name === parentTaxonomyName
          ? [r as Taxonomy].concat(r.children ? r.children : [])
          : []
      );
      break;
    case "personal-care":
      // TODO: do this after we finish the other filters

      // if not has_care_type:
      //     query += " and t.name = 'Personal Care'"
      // else:
      //     conditions = []
      //     if is_toiletries:
      //         conditions.append('Toiletries')
      //     if is_shower:
      //         conditions.append('Shower')
      //     if is_laundry:
      //         conditions.append('Laundry')
      //     if is_haircut:
      //         conditions.append('Haircut')
      //     if is_restrooms:
      //         conditions.append('Restrooms')
      //    conditions_in_quotes = [f"'{c}'" for c in conditions]
      //    query += f" and t.parent_name = 'Personal Care' and t.name in ({','.join(conditions_in_quotes) })"
      break;
    case "shelters-housing":
      // if is_single:
      //     query += " and t.name = 'Single Adult' and t.parent_name = 'Shelter'"
      // elif is_family:
      //     query += " and t.name = 'Families' and t.parent_name = 'Shelter'"
      // else:
      //     query += " and t.name = 'Shelter'"
      switch (parsedSearchParams[SHELTER_PARAM]) {
        case null:
          taxonomies = taxonomyResponse.flatMap((r) =>
            r.name === parentTaxonomyName ? [r as Taxonomy] : []
          );
          break;
        case SHELTER_PARAM_FAMILY_VALUE:
          taxonomies = taxonomyResponse.flatMap((r) =>
            !r.children
              ? []
              : r.children.filter(
                  (t) =>
                    t.parent_name === parentTaxonomyName &&
                    t.name === "Families"
                )
          );
        case SHELTER_PARAM_SINGLE_VALUE:
          taxonomies = taxonomyResponse.flatMap((r) =>
            !r.children
              ? []
              : r.children.filter(
                  (t) =>
                    t.parent_name === parentTaxonomyName &&
                    t.name === "Single Adult"
                )
          );
          break;
      }
  }
  return taxonomies.map((t) => t.id);
}

export interface AllLocationsData
  extends LocationsDataResponse<FullLocationData> {
  locationStubs: SimplifiedLocationData[];
}

export async function fetchLocations(
  category: Category,
  parsedSearchParams: YourPeerSearchParams
): Promise<AllLocationsData> {
  const taxonomies = await getTaxonomies(category, parsedSearchParams);
  return {
    ...(await fetchLocationsData({
      ...parsedSearchParams,
      taxonomies,
    })),
    locationStubs: await getSimplifiedLocationData({
      ...parsedSearchParams,
      taxonomies,
    }),
  };
}

export default function LocationsPageComponent({
  category,
  locationDataResponse: {
    locations,
    numberOfPages,
    resultCount,
    locationStubs,
  },
  parsedSearchParams,
  searchParams,
}: {
  category: Category;
  locationDataResponse: AllLocationsData;
  parsedSearchParams: YourPeerSearchParams;
  searchParams: SearchParams;
}) {
  const yourPeerLegacyLocationData = locations.map((location) =>
    map_gogetta_to_yourpeer(location, false)
  );
  console.log("parsedSearchParams", parsedSearchParams);
  console.log("searchParams", searchParams);
  // TODO: maybe validate query params and then cast it as a more restrictive object where key-value pairs are fully typed
  //console.log('taxonomies', taxonomies)
  return (
    <>
      <div className="h-[100dvh] w-full">
        <div className="flex flex-col w-full h-full">
          <div className="bg-white relative z-20 shadow w-full flex flex-col">
            <nav className="flex space-x-3 items-center justify-between px-5 py-2 md:py-3">
              <div className="flex items-center">
                <button
                  className="hover:cursor-pointer text-gray-900 hover:text-gray-600 hover:brightness-125 inline-block transition"
                  id="offCanvasMenuButton"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <a
                  href="/"
                  translate="no"
                  className="text-sm ml-3 leading-3 hidden sm:inline-block"
                >
                  <span className="text-black font-extrabold">YourPeer</span>
                  NYC
                </a>
              </div>
              <div id="search_container" className="flex-grow md:flex-none">
                <div className="flex items-center relative rounded py-1 px-2 sm:px-3 md:p-3 border border-gray-300 w-full sm:w-64 md:w-96">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </div>
                  <SearchForm />
                </div>
              </div>
              <QuickExit />
            </nav>
          </div>
          <main className="flex-1 overflow-hidden flex flex-col md:flex-row">
            <div
              className="relative w-full md:w-1/2 lg:w-1/3 bg-white overflow-hidden"
              id="left_panel"
            >
              <div
                className="w-full h-full md:h-full flex flex-col"
                id="filters_and_list_screen"
              >
                {parsedSearchParams[SHOW_ADVANCED_FILTERS_PARAM] ? (
                  <FiltersPopup
                    category={category}
                    numLocationResults={resultCount}
                  />
                ) : undefined}
                <FiltersHeader
                  category={category}
                  searchParams={searchParams}
                />
                <LocationsContainer
                  category={category}
                  yourPeerLegacyLocationData={yourPeerLegacyLocationData}
                  />
              </div>
            </div>
            <div
              id="map_container"
              className="w-full hidden md:block md:w-1/2 lg:w-2/3 bg-gray-300 h-full flex-1 relative"
            >
              <div id="map" className="w-full h-full"></div>
              <div
                id="recenter-btn"
                className="absolute top-2 right-2 z-[1] bg-white/95 flex items-center justify-center cursor-pointer w-9 h-9 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.0294 0.0566351L0.413683 7.84112C0.144651 7.96016 -0.0198463 8.23615 0.00343285 8.52942C0.026712 8.82269 0.232687 9.06927 0.517131 9.14438L7.12859 10.8845C7.6114 11.0114 7.98859 11.3883 8.11596 11.871L9.85611 18.4824C9.93099 18.767 10.1774 18.9732 10.4707 18.9967C10.764 19.0202 11.0402 18.8558 11.1594 18.5868L18.9402 0.971044C19.0552 0.709941 18.9985 0.404985 18.7971 0.202812C18.5957 0.000638069 18.291 -0.0573878 18.0294 0.0566351Z"
                    fill="#5A87FF"
                  />
                </svg>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
