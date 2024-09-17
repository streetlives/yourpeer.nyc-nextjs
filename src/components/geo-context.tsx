// https://vercel.com/guides/react-context-state-management-nextjs

"use client";

import { useCookies } from "next-client-cookies";
import React, { createContext, useState } from "react";
import { Position } from "./common";

export type GeoCoordinates = {
  latitude: number;
  longitude: number;
};

export const GeoCoordinatesContext =
  createContext<GeoCoordinatesContextType | null>(null);

export type GeoCoordinatesContextType = {
  userPosition: Position | undefined;
  refreshUserPosition: (
    cb?: () => void,
    errBack?: (err: GeolocationPositionError | undefined) => void,
  ) => void;
};

export const GeoCoordinatesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const cookies = useCookies();
  const [userPosition, setUserPosition] = useState<Position>();
  function refreshUserPosition(
    cb?: () => void,
    errBack?: (err: GeolocationPositionError | undefined) => void,
  ) {
    cookies.remove("latitude");
    cookies.remove("longitude");
    window.navigator.geolocation.getCurrentPosition(
      (userPosition) => {
        // TODO: logGeoEvent(pos.coords);
        setUserPosition({
          lat: userPosition.coords.latitude,
          lng: userPosition.coords.longitude,
        });
        cookies.set("latitude", userPosition.coords.latitude.toString());
        cookies.set("longitude", userPosition.coords.longitude.toString());
        // TODO: we want to change the selection to "nearby"
        // if the selection had not been previously explicitly set.
        if (cb) {
          cb();
        }
      },
      (error) => {
        console.log("unable to get user position", error);
        if (errBack) {
          errBack(error);
        }
      },
    );
  }
  return (
    <GeoCoordinatesContext.Provider
      value={{
        userPosition,
        refreshUserPosition,
      }}
    >
      {children}
    </GeoCoordinatesContext.Provider>
  );
};
