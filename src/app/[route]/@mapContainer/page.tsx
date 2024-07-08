import {
  Category,
  RouteParams,
  SearchParams,
  SimplifiedLocationData,
  parseCategoryFromRoute,
  parseRequest,
} from "../../common";
import LocationsMap from "../map";
import { fetchLocations } from "../streetlives-api-service";


export async function getMapContainerData({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: RouteParams;
}): Promise<SimplifiedLocationData[]>{
  const category = parseCategoryFromRoute(params.route);
  const parsedSearchParams = parseRequest({ params, searchParams });
  // TODO: break fetchLocations out into two API calls
  const { locationStubs } = await fetchLocations(category, parsedSearchParams);
  return locationStubs 
}

export default async function MapContainerPage({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: RouteParams;
}) {
  return (
    <LocationsMap
      locationStubs={await getMapContainerData({
        searchParams,
        params,
      })}
    />
  );
}
