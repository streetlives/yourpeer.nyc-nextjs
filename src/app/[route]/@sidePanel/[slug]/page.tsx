import {
  CATEGORIES,
  CATEGORY_DESCRIPTION_MAP,
  CategoryNotNull,
  getIconPath,
  getServicesWrapper,
  LocationDetailData,
  YourPeerLegacyScheduleData,
  YourPeerLegacyServiceData,
  YourPeerLegacyServiceDataWrapper,
} from "../../../common";
import { fetchLocationsDetailData, map_gogetta_to_yourpeer } from "../../streetlives-api-service";
import customStreetViews from "./custom-streetviews";
import LocationDetailComponent from "./location-detail-component";
import Service from "./service-component";

export default async function LocationDetail({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const location = map_gogetta_to_yourpeer(
    await fetchLocationsDetailData(slug),
    true
  );

  return <LocationDetailComponent location={location} slug={slug} />;
}