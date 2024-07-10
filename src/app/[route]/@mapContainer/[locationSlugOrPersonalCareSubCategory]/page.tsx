import { notFound } from "next/navigation";
import {
  AMENITIES_PARAM_SUBCATEGORY_AND_CANONICAL_ORDERING,
  AmenitiesSubCategory,
  Category,
  PERSONAL_CARE_CATEGORY,
  SearchParams,
  SubRouteParams,
  parseCategoryFromRoute,
} from "../../../common";
import LocationsMap from "../../map";
import {
  Error404Response,
  fetchLocationsDetailData,
} from "../../streetlives-api-service";
import { getMapContainerData } from "../map-container-component";

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
      const location = await fetchLocationsDetailData(
        params.locationSlugOrPersonalCareSubCategory,
      );
      return <LocationsMap locationDetailStub={location} />;
    }
  } catch (e) {
    if (e instanceof Error404Response) {
      return notFound();
    }
  }
}
