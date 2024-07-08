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
  fetchLocations,
  fetchLocationsDetailData,
  map_gogetta_to_yourpeer,
} from "../../streetlives-api-service";
import { getMapContainerData } from "../page";

export default async function MapDetail({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: SubRouteParams;
}) {
  // TODO: move out this check
  if (
    params.route === PERSONAL_CARE_CATEGORY &&
    AMENITIES_PARAM_SUBCATEGORY_AND_CANONICAL_ORDERING.includes(
      params.locationSlugOrPersonalCareSubCategory as AmenitiesSubCategory
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
      params.locationSlugOrPersonalCareSubCategory
    );
    return <LocationsMap locationDetailStub={location} />;
  }
}
