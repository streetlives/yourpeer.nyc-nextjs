import { notFound } from "next/navigation";
import {
  AMENITIES_PARAM_SUBCATEGORY_AND_CANONICAL_ORDERING,
  AmenitiesSubCategory,
  CATEGORIES,
  CATEGORY_DESCRIPTION_MAP,
  CategoryNotNull,
  getIconPath,
  getServicesWrapper,
  LocationDetailData,
  PERSONAL_CARE_CATEGORY,
  SearchParams,
  SubRouteParams,
  YourPeerLegacyScheduleData,
  YourPeerLegacyServiceData,
  YourPeerLegacyServiceDataWrapper,
} from "../../../common";
import {
  Error404Response,
  fetchLocationsDetailData,
  map_gogetta_to_yourpeer,
} from "../../streetlives-api-service";
import { getSidePanelComponentData, SidePanelComponent } from "../side-panel-component";
import customStreetViews from "./custom-streetviews";
import LocationDetailComponent from "./location-detail-component";
import Service from "./service-component";

export { generateMetadata } from "../../metadata";

export default async function LocationDetail({
  params,
  searchParams,
}: {
  params: SubRouteParams;
  searchParams: SearchParams;
}) {
  try {
    if (
      params.route === PERSONAL_CARE_CATEGORY &&
      AMENITIES_PARAM_SUBCATEGORY_AND_CANONICAL_ORDERING.includes(
        params.locationSlugOrPersonalCareSubCategory as AmenitiesSubCategory,
      )
    ) {
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
