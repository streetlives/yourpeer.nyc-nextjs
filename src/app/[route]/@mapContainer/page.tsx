import { Category, SearchParams, parseCategoryFromRoute, parseSearchParams } from '../../common';
import LocationsMap from "../map";
import { fetchLocations } from '../streetlives-api-service';

export default async function MapContainerPage({ 
  searchParams, 
  params: { route },
}: { 
  searchParams: SearchParams,
  params: { route: string };
}) {
    const category = parseCategoryFromRoute(route);
    const parsedSearchParams = parseSearchParams(`/${route}`, searchParams);
    // TODO: break fetchLocations out into two API calls
    const { locationStubs } = await fetchLocations(
      category,
      parsedSearchParams
    );
    return <LocationsMap locationStubs={locationStubs} />
;
}

