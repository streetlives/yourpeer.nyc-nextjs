// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

"use client";

import { useContext } from "react";
import { SHOW_MAP_VIEW_COOKIE_NAME } from "./common";
import { SearchContext, SearchContextType } from "./search-context";
import useShowMapViewCookie from "./use-show-map-view-cookie";

export default function MapListToggleButton() {

  const { showMapViewOnMobile, setShowMapViewOnMobile } = useContext(
    SearchContext
  ) as SearchContextType;

  function setMapIsVisible(mapIsVisible: boolean): void {
    setShowMapViewOnMobile(mapIsVisible);
  }

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 md:hidden z-30">
      {showMapViewOnMobile ? (
        <button
          className="items-center justify-center text-black bg-primary rounded-full shadow-sm hover:brightness-90 hover:cursor-pointer text-sm py-2 px-4 space-x-2"
          onClick={() => setMapIsVisible(false)}
        >
          <img
            src="/img/icons/list-icon.svg"
            className="w-5 max-h-5 object-contain"
            style={{ display: "inline" }}
          />
          <span>View list</span>
        </button>
      ) : (
        <button
          className="inline-flex items-center justify-center text-black bg-primary rounded-full shadow-sm hover:brightness-90 hover:cursor-pointer text-sm py-2 px-4 space-x-2"
          onClick={() => setMapIsVisible(true)}
        >
          <img
            src="/img/icons/map-icon.svg"
            className="w-5 max-h-5 object-contain"
          />
          <span>View map</span>
        </button>
      )}
    </div>
  );
}
