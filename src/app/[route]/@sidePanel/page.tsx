import {
  Category,
  RouteParams,
  SHOW_ADVANCED_FILTERS_PARAM,
  SearchParams,
  YourPeerLegacyLocationData,
  YourPeerParsedRequestParams,
  parseCategoryFromRoute,
  parseRequest,
} from "../../common";
import FiltersHeader from "../filters-header";
import FiltersPopup from "../filters-popup";
import LocationsContainer from "../locations-container";
import {
  fetchLocations,
  map_gogetta_to_yourpeer,
} from "../streetlives-api-service";

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
  const { locations, numberOfPages, resultCount } = await fetchLocations(
    category,
    parsedSearchParams
  );
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
  return <SidePanelComponent
    searchParams={searchParams}
    sidePanelComponentData={await getSidePanelComponentData({
      searchParams,
      params,
    })}
  />;
}
