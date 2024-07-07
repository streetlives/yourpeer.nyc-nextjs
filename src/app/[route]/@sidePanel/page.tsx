import { Category, SHOW_ADVANCED_FILTERS_PARAM, SearchParams, parseCategoryFromRoute, parseSearchParams } from '../../common';
import FiltersHeader from '../filters-header';
import FiltersPopup from '../filters-popup';
import LocationsContainer from '../locations-container';
import { fetchLocations, map_gogetta_to_yourpeer } from '../streetlives-api-service';

export default async function SidePanelPage({
  searchParams,
  params: { route },
}: {
  searchParams: SearchParams;
  params: { route: string };
}) {
  const category = parseCategoryFromRoute(route);
  // FIXME: the string composition in the next line is a bit ugly. I should clean up the type used in this interface
  const parsedSearchParams = parseSearchParams(`/${route}`, searchParams);
  const { locations, numberOfPages, resultCount } = await fetchLocations(
    category,
    parsedSearchParams
  );
  const yourPeerLegacyLocationData = locations.map((location) =>
    map_gogetta_to_yourpeer(location, false)
  );
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
