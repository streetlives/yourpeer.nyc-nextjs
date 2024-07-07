import { Category, SearchParams, parseCategoryFromRoute } from '../../../common';
import LocationsMap from "../../map";
import { fetchLocations, fetchLocationsDetailData, map_gogetta_to_yourpeer } from '../../streetlives-api-service';

export default async function MapDetail({
  params: { route, slug },
}: {
  params: { route: string; slug: string };
}) {
  const location = await fetchLocationsDetailData(slug);
  return <LocationsMap locationDetailStub={location} />;
}


