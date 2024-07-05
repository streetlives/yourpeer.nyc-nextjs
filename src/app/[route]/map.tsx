"use client";

import { useLocalStorage } from "usehooks-ts";
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  MapCameraChangedEvent,
  Marker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { LOCATION_ROUTE, SimplifiedLocationData } from "../common";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Position {
  lat: number;
  lng: number;
}

const MAX_NUM_LOCATIONS_TO_INCLUDE_IN_BOUNDS = 5

const GOOGLE_MAPS_API_KEY = (
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
).toString();

const mapStyles: google.maps.MapTypeStyle[] = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        saturation: -25,
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    stylers: [
      {
        saturation: -25,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        saturation: -45,
      },
    ],
  },
];

const centralPark: Position = {
  lat: 40.782539,
  lng: -73.965602,
};

const defaultZoom = 14;

const markerIcon =
  "data:image/svg+xml,%3Csvg width='25' height='32' viewBox='0 0 25 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='cash-pin' filter='url(%23filter0_d_28_9457)'%3E%3Cpath id='Shape' fill-rule='evenodd' clip-rule='evenodd' d='M12.5 1C16.6421 1 20 4.35786 20 8.5C20 11.907 14.926 19.857 13.125 22.572C12.9857 22.781 12.7512 22.9066 12.5 22.9066C12.2488 22.9066 12.0143 22.781 11.875 22.572C10.074 19.856 5 11.907 5 8.5C5 4.35786 8.35786 1 12.5 1Z' fill='%23FFDC00' stroke='%23323232' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d_28_9457' x='0.25' y='0.25' width='24.5' height='31.4066' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dy='4'/%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_28_9457'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_28_9457' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A";
const myLocationIcon =
  "data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='25' cy='25' r='25' fill='%230085FF' fill-opacity='0.2'/%3E%3Ccircle cx='25' cy='25' r='7.5' fill='white'/%3E%3Ccircle cx='25' cy='25' r='5' fill='%230085FF'/%3E%3C/svg%3E ";
const activeMarkerIcon =
  "data:image/svg+xml,%3Csvg width='34' height='45' viewBox='0 0 34 45' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='pin1' filter='url(%23filter0_d_28_9454)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17 1C23.6274 1 29 6.37258 29 13C29 18.4512 20.8816 31.1712 18 35.5152C17.7772 35.8497 17.4019 36.0506 17 36.0506C16.5981 36.0506 16.2228 35.8497 16 35.5152C13.1184 31.1696 5 18.4512 5 13C5 6.37258 10.3726 1 17 1Z' fill='%23323232'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17 1C23.6274 1 29 6.37258 29 13C29 18.4512 20.8816 31.1712 18 35.5152C17.7772 35.8497 17.4019 36.0506 17 36.0506C16.5981 36.0506 16.2228 35.8497 16 35.5152C13.1184 31.1696 5 18.4512 5 13C5 6.37258 10.3726 1 17 1Z' stroke='%23323232' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d_28_9454' x='0.25' y='0.25' width='33.5' height='44.5506' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dy='4'/%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_28_9454'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_28_9454' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A";
const closedMarker =
  "data:image/svg+xml,%3Csvg width='25' height='32' viewBox='0 0 25 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='cash-pin' filter='url(%23filter0_d_28_9460)'%3E%3Cpath id='Shape' fill-rule='evenodd' clip-rule='evenodd' d='M12.5 1C16.6421 1 20 4.35786 20 8.5C20 11.907 14.926 19.857 13.125 22.572C12.9857 22.781 12.7512 22.9066 12.5 22.9066C12.2488 22.9066 12.0143 22.781 11.875 22.572C10.074 19.856 5 11.907 5 8.5C5 4.35786 8.35786 1 12.5 1Z' fill='%23F0F0F0' stroke='%23323232' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d_28_9460' x='0.25' y='0.25' width='24.5' height='31.4066' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dy='4'/%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_28_9460'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_28_9460' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A";

function calculateDistanceInMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const earthRadiusMiles = 3958.8; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusMiles * c;

  return distance;
}

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}

interface SimplifiedLocationDataWithDistance extends SimplifiedLocationData {
  distanceMiles: number;
}

// this exists because useMap hook must be inside of APIWrapper in order to work
function MapWrapper({
  locationStubs,
  locationDetailStub
}: {
  locationStubs?: SimplifiedLocationData[];
  locationDetailStub?: SimplifiedLocationData;
}){
  const router = useRouter()
  const [userPosition, setUserPosition] = useState<GeolocationPosition>();
  const [mapCenter, setMapCenter] = useLocalStorage<Position>(
    "map-center",
    locationDetailStub
      ? {
          lat: locationDetailStub.position.coordinates[1],
          lng: locationDetailStub.position.coordinates[0],
        }
      : centralPark
  );
  const googleMap = useMap();

  useEffect(() => {
    if (locationDetailStub) {
      setMapCenter({
        lat: locationDetailStub.position.coordinates[1],
        lng: locationDetailStub.position.coordinates[0],
      });
    }
  }, [locationDetailStub, setMapCenter]);

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => {
      console.log("camera changed: ", ev.detail);
      const center = ev.map.getCenter();
      if (center) {
        setMapCenter({
          lat: center.lat(),
          lng: center.lng(),
        });
      }
    },
    [setMapCenter]
  );

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (pos) => {
        // TODO: logGeoEvent(pos.coords);
        setUserPosition(pos);

        const distanceInMiles = calculateDistanceInMiles(
          pos.coords.latitude,
          pos.coords.longitude,
          centralPark.lat,
          centralPark.lng
        );

        if (locationDetailStub) {
          setMapCenter({
            lat: locationDetailStub.position.coordinates[1],
            lng: locationDetailStub.position.coordinates[0],
          });
        } else {
          if (distanceInMiles > 26) {
            setMapCenter(centralPark);
          } else {
            setMapCenter({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          }
        }
      },
      (error) => {
        console.log("unable to get user position", error);
      }
    );
  }, [locationDetailStub, setMapCenter]);

  // when we get new locationStubs AND the user's location is set,
  // then pan/zoom the map to contain 25 locations
  // FIXME: do we want to set a maximum distance? 
  useEffect(() => {
    if (userPosition && locationStubs && locationStubs.length) {
      const simplifiedLocationDataWithDistance: SimplifiedLocationDataWithDistance[] =
        locationStubs
          .map((locationStub) => ({
            ...locationStub,
            distanceMiles: calculateDistanceInMiles(
              userPosition.coords.latitude,
              userPosition.coords.longitude,
              locationStub.position.coordinates[1],
              locationStub.position.coordinates[0]
            ),
          }))
          .sort((a, b) => a.distanceMiles - b.distanceMiles);
      const closest25Locations = simplifiedLocationDataWithDistance.slice(
        0,
        Math.min(
          simplifiedLocationDataWithDistance.length,
          MAX_NUM_LOCATIONS_TO_INCLUDE_IN_BOUNDS
        )
      );

      if (googleMap) {
        var bounds = new google.maps.LatLngBounds();
        closest25Locations.forEach(function (loc) {
          var latLng = new google.maps.LatLng(
            loc.position.coordinates[1],
            loc.position.coordinates[0]
          );
          bounds.extend(latLng);
        });
        googleMap.fitBounds(bounds);
      }
    }
  }, [userPosition, locationStubs, googleMap]);

  return (
    <Map
      defaultZoom={defaultZoom}
      gestureHandling={"greedy"}
      streetViewControl={false}
      mapTypeControl={false}
      fullscreenControl={false}
      center={mapCenter}
      onCameraChanged={handleCameraChange}
      styles={mapStyles}
    >
      {locationStubs
        ? locationStubs.map((locationStub) => (
            <Marker
              key={locationStub.id}
              position={{
                lat: locationStub.position.coordinates[1],
                lng: locationStub.position.coordinates[0],
              }}
              clickable={true}
              onClick={() =>
                router.push(`/${LOCATION_ROUTE}/${locationStub.slug}`)
              }
              title={locationStub.name}
              icon={locationStub.closed ? closedMarker : markerIcon}
            />
          ))
        : undefined}
      {locationDetailStub?
            <Marker
              position={{
                lat: locationDetailStub.position.coordinates[1],
                lng: locationDetailStub.position.coordinates[0],
              }}
              clickable={true}
              onClick={() =>
                router.push(`/${LOCATION_ROUTE}/${locationDetailStub.slug}`)
              }
              title={locationDetailStub.name}
              icon={activeMarkerIcon}
            />
        : undefined}
      {userPosition ? (
        <Marker
          position={{
            lat: userPosition.coords.latitude,
            lng: userPosition.coords.longitude,
          }}
          clickable={false}
          title="You are here!"
          icon={myLocationIcon}
        />
      ) : undefined}
    </Map>
  );
}

export default function LocationsMap({
  locationStubs,
  locationDetailStub
}: {
  locationStubs?: SimplifiedLocationData[];
  locationDetailStub?: SimplifiedLocationData;
}) {
  return (
    <div
      id="map_container"
      className="w-full hidden md:block md:w-1/2 lg:w-2/3 bg-gray-300 h-full flex-1 relative"
    >
      <div id="map" className="w-full h-full">
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={["marker"]}>
          <MapWrapper
            locationStubs={locationStubs}
            locationDetailStub={locationDetailStub}
          />
        </APIProvider>
      </div>
      <div
        id="recenter-btn"
        className="absolute top-2 right-2 z-[1] bg-white/95 flex items-center justify-center cursor-pointer w-9 h-9 rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.0294 0.0566351L0.413683 7.84112C0.144651 7.96016 -0.0198463 8.23615 0.00343285 8.52942C0.026712 8.82269 0.232687 9.06927 0.517131 9.14438L7.12859 10.8845C7.6114 11.0114 7.98859 11.3883 8.11596 11.871L9.85611 18.4824C9.93099 18.767 10.1774 18.9732 10.4707 18.9967C10.764 19.0202 11.0402 18.8558 11.1594 18.5868L18.9402 0.971044C19.0552 0.709941 18.9985 0.404985 18.7971 0.202812C18.5957 0.000638069 18.291 -0.0573878 18.0294 0.0566351Z"
            fill="#5A87FF"
          />
        </svg>
      </div>
    </div>
  );
}
