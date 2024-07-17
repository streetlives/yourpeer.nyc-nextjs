import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { parseCookies } from "./cookies";
import { SHOW_MAP_VIEW_COOKIE_NAME } from "./common";

export default function useShowMapViewCookie(): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
] {
  const [showMapView, setShowMapView] = useState(true);
  useEffect(() => {
    const cookies = parseCookies();
    const showMapViewCookie = cookies[SHOW_MAP_VIEW_COOKIE_NAME] === "true";
    setShowMapView(showMapViewCookie);
  }, []);
  return [showMapView, setShowMapView];
}
