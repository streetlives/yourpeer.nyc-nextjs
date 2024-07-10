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
import { getMapContainerData } from "./map-container-component";


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
