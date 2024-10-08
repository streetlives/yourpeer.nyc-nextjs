// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

import { notFound } from "next/navigation";
import {
  RESOURCE_ROUTES,
  RouteParams,
  SearchParams,
} from "../../../components/common";
import LocationsMap from "../../../components/map";

import { getMapContainerData } from "../../../components/map-container-component";
import { cookies } from "next/headers";
import { redirectIfNearbyAndIfLatitudeAndLongitudeIsNotSet } from "@/components/navigation";

export default async function MapContainerPage({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: RouteParams;
}) {
  redirectIfNearbyAndIfLatitudeAndLongitudeIsNotSet({
    searchParams,
    params,
    cookies: cookies(),
  });
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
