// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

import { notFound } from "next/navigation";
import {
  AMENITIES_PARAM_SUBCATEGORY_AND_CANONICAL_ORDERING,
  AmenitiesSubCategory,
  PERSONAL_CARE_CATEGORY,
  SearchParams,
  SubRouteParams,
} from "../../../../components/common";
import LocationsMap from "../../../../components/map";
import {
  Error404Response,
  fetchLocationsDetailData,
} from "../../../../components/streetlives-api-service";
import { getMapContainerData } from "../../../../components/map-container-component";
import { usePreviousParams } from "@/components/use-previous-params";

export default async function MapDetail({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: SubRouteParams;
}) {
  const previousParams = usePreviousParams();
  try {
    if (
      // TODO: eliminate duplicate code - move this condition out
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
      const location = await fetchLocationsDetailData(
        params.locationSlugOrPersonalCareSubCategory,
      );
      return (
        <LocationsMap
          locationStubs={
            previousParams
              ? await getMapContainerData(previousParams)
              : undefined
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
