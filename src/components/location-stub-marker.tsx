import { Marker } from "@vis.gl/react-google-maps";
import { LOCATION_ROUTE, SimplifiedLocationData } from "./common";
import { useRouter } from "next/navigation";
import { activeMarkerIcon, closedMarker, markerIcon } from "./map-common";

export default function LocationStubMarker({
  locationStub,
  locationSlugClickedOnMobile,
  setLocationSlugClickedOnMobile,
}: {
  locationStub: SimplifiedLocationData;
  locationSlugClickedOnMobile?: string;
  setLocationSlugClickedOnMobile: (slug: string) => void;
}) {
  const router = useRouter();
  return (
    <Marker
      position={{
        lat: locationStub.position.coordinates[1],
        lng: locationStub.position.coordinates[0],
      }}
      clickable={true}
      onClick={() => {
        const pageWidth = document.documentElement.scrollWidth;

        if (pageWidth > 767) {
          router.push(`/${LOCATION_ROUTE}/${locationStub.slug}`);
        } else {
          setLocationSlugClickedOnMobile(locationStub.slug);
        }
      }}
      title={locationStub.name}
      icon={
        locationStub.closed
          ? closedMarker
          : locationSlugClickedOnMobile === locationStub.slug
            ? activeMarkerIcon
            : markerIcon
      }
    />
  );
}
