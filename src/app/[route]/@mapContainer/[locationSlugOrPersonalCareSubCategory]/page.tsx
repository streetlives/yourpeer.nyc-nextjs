// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

import { notFound } from "next/navigation";
import {
  AMENITIES_PARAM_SUBCATEGORY_AND_CANONICAL_ORDERING,
  AmenitiesSubCategory,
  LAST_SET_PARAMS_COOKIE_NAME,
  PERSONAL_CARE_CATEGORY,
  RouteParams,
  SearchParams,
  SubRouteParams,
} from "../../../../components/common";
import LocationsMap from "../../../../components/map";
import {
  Error404Response,
  fetchLocationsDetailData,
} from "../../../../components/streetlives-api-service";
import { getMapContainerData } from "../../../../components/map-container-component";
import { cookies } from "next/headers";

export default async function MapDetail({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: SubRouteParams;
}) {
  // TODO: move out this check
  try {
    if (
      params.route === PERSONAL_CARE_CATEGORY &&
      AMENITIES_PARAM_SUBCATEGORY_AND_CANONICAL_ORDERING.includes(
        params.locationSlugOrPersonalCareSubCategory as AmenitiesSubCategory,
      )
    ) {
      return (
        <LocationsMap
          locationStubs={await getMapContainerData({
            searchParams,
            params,
          })}
        />
      );
    } else {
      // TODO: get the cookie
      const cookie = cookies().get(LAST_SET_PARAMS_COOKIE_NAME);
      console.log("cookie", cookie);
      let previousParams = undefined;
      if (cookie && cookie.value) {
        // TODO: where is the type for this?
        previousParams = JSON.parse(cookie.value) as unknown as {
          searchParams: SearchParams;
          params: RouteParams | SubRouteParams;
        };
      }
      const location = await fetchLocationsDetailData(
        params.locationSlugOrPersonalCareSubCategory,
      );
      return (
        <LocationsMap
          locationStubs={
            previousParams && (await getMapContainerData(previousParams))
          }
          locationDetailStub={location}
        />
      );
    }
  } catch (e) {
    if (e instanceof Error404Response) {
      return notFound();
    }
  }
}
