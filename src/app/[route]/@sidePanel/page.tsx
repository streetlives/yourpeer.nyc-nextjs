import { Metadata, ResolvingMetadata } from "next";
import {
  AGE_PARAM,
  AMENITIES_PARAM_LAUNDRY_VALUE,
  AMENITIES_PARAM_RESTROOM_VALUE,
  AMENITIES_PARAM_SHOWER_VALUE,
  AMENITIES_PARAM_TOILETRIES_VALUE,
  CATEGORY_TO_ROUTE_MAP,
  Category,
  FullLocationData,
  LOCATION_ROUTE,
  PAGE_PARAM,
  REQUIREMENT_PARAM,
  RESOURCE_ROUTES,
  RouteParams,
  SHOW_ADVANCED_FILTERS_PARAM,
  SearchParams,
  SubRouteParams,
  YourPeerLegacyLocationData,
  YourPeerParsedRequestParams,
  parseCategoryFromRoute,
  parseRequest,
} from "../../common";
import FiltersHeader from "../filters-header";
import FiltersPopup from "../filters-popup";
import LocationsContainer from "../locations-container";
import {
  getFullLocationData,
  getTaxonomies,
  map_gogetta_to_yourpeer,
} from "../streetlives-api-service";
import { notFound } from "next/navigation";

export {generateMetadata} from '../metadata'

interface SidePanelComponentData {
  parsedSearchParams: YourPeerParsedRequestParams;
  category: Category;
  resultCount: number;
  numberOfPages: number;
  yourPeerLegacyLocationData: YourPeerLegacyLocationData[];
}


export async function getSidePanelComponentData({
  searchParams,
  params
}: {
  searchParams: SearchParams;
  params: RouteParams;
}): Promise<SidePanelComponentData>{
  const category = parseCategoryFromRoute(params.route);
  // FIXME: the string composition in the next line is a bit ugly. I should clean up the type used in this interface
  const parsedSearchParams = parseRequest({ params, searchParams });
  const taxonomiesResults = await getTaxonomies(category, parsedSearchParams);
  const { locations, numberOfPages, resultCount } =
    await await getFullLocationData({
      ...parsedSearchParams,
      ...parsedSearchParams[REQUIREMENT_PARAM],
      ...taxonomiesResults,
    });
  const yourPeerLegacyLocationData = locations.map((location) =>
    map_gogetta_to_yourpeer(location, false)
  );
  return {
    parsedSearchParams,
    category,
    resultCount,
    numberOfPages,
    yourPeerLegacyLocationData
  }
}

export function SidePanelComponent({
  searchParams,
  sidePanelComponentData: {
    parsedSearchParams,
    category,
    resultCount,
    numberOfPages,
    yourPeerLegacyLocationData,
  },
}: {
  searchParams: SearchParams;
  sidePanelComponentData: SidePanelComponentData;
}) {
  return (
    <div
      className="w-full h-full md:h-full flex flex-col"
      id="filters_and_list_screen"
    >
      {parsedSearchParams[SHOW_ADVANCED_FILTERS_PARAM] ? (
        <FiltersPopup category={category} numLocationResults={resultCount} />
      ) : undefined}
      <FiltersHeader category={category} searchParams={searchParams} />
      <LocationsContainer
        resultCount={resultCount}
        numberOfPages={numberOfPages}
        currentPage={parsedSearchParams[PAGE_PARAM]}
        category={category}
        yourPeerLegacyLocationData={yourPeerLegacyLocationData}
      />
    </div>
  );
}

export default async function SidePanelPage({
  searchParams,
  params
}: {
  searchParams: SearchParams;
  params: RouteParams;
}) {
  return RESOURCE_ROUTES.includes(params.route) ? (
    <SidePanelComponent
      searchParams={searchParams}
      sidePanelComponentData={await getSidePanelComponentData({
        searchParams,
        params,
      })}
    />
  ) : notFound();
}
