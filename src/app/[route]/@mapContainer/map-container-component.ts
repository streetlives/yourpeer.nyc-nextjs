import {
  REQUIREMENT_PARAM,
  RouteParams,
  SearchParams,
  SimplifiedLocationData,
  parseCategoryFromRoute,
  parseRequest,
} from "../../common";
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
