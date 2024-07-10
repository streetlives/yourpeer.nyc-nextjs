import { notFound } from "next/navigation";
import {
  Category,
  REQUIREMENT_PARAM,
  RESOURCE_ROUTES,
  RouteParams,
  SearchParams,
  SimplifiedLocationData,
  parseCategoryFromRoute,
  parseRequest,
} from "../../common";
import LocationsMap from "../map";
import {
  getSimplifiedLocationData,
  getTaxonomies,
} from "../streetlives-api-service";

export async function getMapContainerData({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: RouteParams;
}): Promise<SimplifiedLocationData[]> {
  const category = parseCategoryFromRoute(params.route);
  const parsedSearchParams = parseRequest({ params, searchParams });
  const taxonomiesResults = await getTaxonomies(category, parsedSearchParams);
  const locationStubs = await getSimplifiedLocationData({
    ...parsedSearchParams,
    ...parsedSearchParams[REQUIREMENT_PARAM],
    ...taxonomiesResults,
  });
  return locationStubs;
}

export default async function MapContainerPage({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: RouteParams;
}) {
  return RESOURCE_ROUTES.includes(params.route) ? (
    <LocationsMap
      locationStubs={await getMapContainerData({
        searchParams,
        params,
      })}
    />
  ) : (
    notFound()
  );
}
