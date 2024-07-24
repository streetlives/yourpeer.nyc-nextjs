import { Marker } from "@vis.gl/react-google-maps";
import { LOCATION_ROUTE, SimplifiedLocationData } from "./common";
import { useRouter } from "next/navigation";
import { closedMarker, markerIcon } from "./map-common";

export default function LocationStubMarker({
  locationStub,
}: {
  locationStub: SimplifiedLocationData;
}) {
  const router = useRouter();
  return (
    <Marker
      position={{
        lat: locationStub.position.coordinates[1],
        lng: locationStub.position.coordinates[0],
      }}
      clickable={true}
      onClick={() => router.push(`/${LOCATION_ROUTE}/${locationStub.slug}`)}
      title={locationStub.name}
      icon={locationStub.closed ? closedMarker : markerIcon}
    />
  );
}
