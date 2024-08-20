// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

import { notFound } from "next/navigation";
import {
  getParsedSubCategory,
  SearchParams,
  SubRouteParams,
} from "../../../../components/common";
import {
  Error404Response,
  fetchLocationsDetailData,
  map_gogetta_to_yourpeer,
} from "../../../../components/streetlives-api-service";
import { SidePanelComponent } from "../../../../components/side-panel-component";
import LocationDetailComponent from "../../../../components/location-detail-component";
import { usePreviousParams } from "@/components/use-previous-params";
import { getMapContainerData } from "@/components/map-container-component";
import { getSidePanelComponentData } from "@/components/get-side-panel-component-data";
import { isOnLocationDetailPage } from "@/components/navigation";

export { generateMetadata } from "../../../../components/metadata";

export default async function LocationDetail({
  params,
  searchParams,
}: {
  params: SubRouteParams;
  searchParams: SearchParams;
}) {
  const previousParams = usePreviousParams();
  try {
    if (!isOnLocationDetailPage(params)) {
      // validate
      getParsedSubCategory(params);
      return (
        <SidePanelComponent
          searchParams={searchParams}
          sidePanelComponentData={await getSidePanelComponentData({
            searchParams,
            params,
          })}
        />
      );
    } else {
      const location = map_gogetta_to_yourpeer(
        await fetchLocationsDetailData(
          params.locationSlugOrPersonalCareSubCategory,
        ),
        true,
      );

      return (
        <LocationDetailComponent
          location={location}
          locationStubs={
            previousParams
              ? await getMapContainerData(previousParams)
              : undefined
          }
          slug={params.locationSlugOrPersonalCareSubCategory}
        />
      );
    }
  } catch (e) {
    if (e instanceof Error404Response) {
      return notFound();
    }
  }
}
