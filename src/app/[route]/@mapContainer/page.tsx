import { notFound } from "next/navigation";
import { RESOURCE_ROUTES, RouteParams, SearchParams } from "../../common";
import LocationsMap from "../map";

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
