// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

"use client";

import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";
import { LOCATION_ROUTE, SimplifiedLocationData } from "./common";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  activeMarkerIcon,
  defaultZoom,
  mapStyles,
  myLocationIcon,
} from "./map-common";
import LocationStubMarker from "./location-stub-marker";
import { MobileTray } from "./mobile-tray";

interface Position {
  lat: number;
  lng: number;
}

const MAX_NUM_LOCATIONS_TO_INCLUDE_IN_BOUNDS = 5;

const GOOGLE_MAPS_API_KEY = (
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
).toString();

const centralPark: Position = {
  lat: 40.782539,
  lng: -73.965602,
};

function calculateDistanceInMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
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
  locationDetailStub,
  locationSlugClickedOnMobile,
  setLocationSlugClickedOnMobile,
}: {
  locationStubs?: SimplifiedLocationData[];
  locationDetailStub?: SimplifiedLocationData;
  locationSlugClickedOnMobile?: string;
  setLocationSlugClickedOnMobile: (slug: string) => void;
}) {
  const locationStubClickedOnMobile = locationStubs
    ?.filter(
      (locationStub) => locationStub.slug === locationSlugClickedOnMobile,
    )
    .pop();
  const router = useRouter();
  const [userPosition, setUserPosition] = useState<GeolocationPosition>();
  const [mapCenter, setMapCenter] = useState<Position>(
    locationDetailStub
      ? {
          lat: locationDetailStub.position.coordinates[1],
          lng: locationDetailStub.position.coordinates[0],
        }
      : locationStubClickedOnMobile
        ? {
            lat: locationStubClickedOnMobile.position.coordinates[1],
            lng: locationStubClickedOnMobile.position.coordinates[0],
          }
        : centralPark,
  );
  const googleMap = useMap();

  useEffect(() => {
    if (locationStubClickedOnMobile) {
      googleMap?.panTo({
        lat: locationStubClickedOnMobile.position.coordinates[1],
        lng: locationStubClickedOnMobile.position.coordinates[0],
      });
    }
  }, [locationStubClickedOnMobile, setMapCenter, googleMap]);

  useEffect(() => {
    if (locationDetailStub) {
      setMapCenter({
        lat: locationDetailStub.position.coordinates[1],
        lng: locationDetailStub.position.coordinates[0],
      });
    }
  }, [locationDetailStub, setMapCenter]);

  useEffect(() => {
    if (locationStubClickedOnMobile) {
      setMapCenter({
        lat: locationStubClickedOnMobile.position.coordinates[1],
        lng: locationStubClickedOnMobile.position.coordinates[0],
      });
    }
  }, [locationStubClickedOnMobile, setMapCenter]);

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => {
      //console.log("camera changed: ", ev.detail);
      const center = ev.map.getCenter();
      if (center) {
        const newCenter = {
          lat: center.lat(),
          lng: center.lng(),
        };
        if (
          mapCenter.lat !== newCenter.lat ||
          mapCenter.lng !== newCenter.lng
        ) {
          setMapCenter(newCenter);
        }
      }
    },
    [mapCenter, setMapCenter],
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
          centralPark.lng,
        );

        console.log("distanceInMiles", distanceInMiles);

        if (locationDetailStub) {
          setMapCenter({
            lat: locationDetailStub.position.coordinates[1],
            lng: locationDetailStub.position.coordinates[0],
          });
        } else if (locationStubClickedOnMobile) {
          setMapCenter({
            lat: locationStubClickedOnMobile.position.coordinates[1],
            lng: locationStubClickedOnMobile.position.coordinates[0],
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
      },
    );
  }, [locationDetailStub, setMapCenter, locationStubClickedOnMobile]);

  const centerTheMap = () => {
    const normalizedUserPosition = userPosition
      ? {
          lat: userPosition.coords.latitude,
          lng: userPosition.coords.longitude,
        }
      : centralPark;
    if (locationDetailStub && googleMap) {
      var bounds = new google.maps.LatLngBounds();
      bounds.extend(new google.maps.LatLng(normalizedUserPosition));
      bounds.extend(
        new google.maps.LatLng(
          locationDetailStub.position.coordinates[1],
          locationDetailStub.position.coordinates[0],
        ),
      );
      googleMap.fitBounds(bounds);
    } else {
      setMapCenter(normalizedUserPosition);
    }
  };

  // when we get new locationStubs AND the user's location is set,
  // then pan/zoom the map to contain 25 locations
  // FIXME: do we want to set a maximum distance?
  useEffect(() => {
    if (userPosition && locationStubs && locationStubs.length) {
      // TODO: eliminate duplicate code
      const distanceInMiles = calculateDistanceInMiles(
        userPosition.coords.latitude,
        userPosition.coords.longitude,
        centralPark.lat,
        centralPark.lng,
      );

      const centerPosition =
        distanceInMiles <= 26
          ? {
              lat: userPosition.coords.latitude,
              lng: userPosition.coords.longitude,
            }
          : centralPark;

      const simplifiedLocationDataWithDistance: SimplifiedLocationDataWithDistance[] =
        locationStubs
          .map((locationStub) => ({
            ...locationStub,
            distanceMiles: calculateDistanceInMiles(
              centerPosition.lat,
              centerPosition.lng,
              locationStub.position.coordinates[1],
              locationStub.position.coordinates[0],
            ),
          }))
          .sort((a, b) => a.distanceMiles - b.distanceMiles);
      const closest25Locations = simplifiedLocationDataWithDistance.slice(
        0,
        Math.min(
          simplifiedLocationDataWithDistance.length,
          MAX_NUM_LOCATIONS_TO_INCLUDE_IN_BOUNDS,
        ),
      );

      if (googleMap && !locationDetailStub && !locationStubClickedOnMobile) {
        var bounds = new google.maps.LatLngBounds();
        closest25Locations.forEach(function (loc) {
          var latLng = new google.maps.LatLng(
            loc.position.coordinates[1],
            loc.position.coordinates[0],
          );
          bounds.extend(latLng);
        });
        // make sure user position is shown on the map if he is within 26 miles of central park, otherwise ignore him
        if (userPosition && distanceInMiles <= 26) {
          bounds.extend(
            new google.maps.LatLng(
              userPosition.coords.latitude,
              userPosition.coords.longitude,
            ),
          );
        }
        googleMap.fitBounds(bounds);
      }
    }
  }, [
    userPosition,
    locationStubs,
    googleMap,
    locationDetailStub,
    locationStubClickedOnMobile,
  ]);

  return (
    <>
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
              <LocationStubMarker
                locationStub={locationStub}
                key={locationStub.id}
                locationSlugClickedOnMobile={locationSlugClickedOnMobile}
                setLocationSlugClickedOnMobile={setLocationSlugClickedOnMobile}
              />
            ))
          : undefined}
        {locationDetailStub ? (
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
        ) : undefined}
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

      <div
        id="recenter-btn"
        onClick={centerTheMap}
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
    </>
  );
}

export default function LocationsMap({
  locationStubs,
  locationDetailStub,
}: {
  locationStubs?: SimplifiedLocationData[];
  locationDetailStub?: SimplifiedLocationData;
}) {
  const [locationSlugClickedOnMobile, setLocationSlugClickedOnMobile] =
    useState<string>();

  return (
    <>
      <div id="map" className="w-full h-full">
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={["marker"]}>
          <MapWrapper
            locationStubs={locationStubs}
            locationDetailStub={locationDetailStub}
            locationSlugClickedOnMobile={locationSlugClickedOnMobile}
            setLocationSlugClickedOnMobile={setLocationSlugClickedOnMobile}
          />
        </APIProvider>
      </div>
      {locationSlugClickedOnMobile ? (
        <Suspense fallback={<div>Loading data...</div>}>
          <MobileTray
            locationSlugClickedOnMobile={locationSlugClickedOnMobile}
            setLocationSlugClickedOnMobile={setLocationSlugClickedOnMobile}
          />
        </Suspense>
      ) : undefined}
    </>
  );
}
