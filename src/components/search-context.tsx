// https://vercel.com/guides/react-context-state-management-nextjs

"use client";

import { useCookies } from "next-client-cookies";
import React, { createContext, useState } from "react";
import { SHOW_MAP_VIEW_COOKIE_NAME } from "./common";

export const SearchContext = createContext<SearchContextType | null>(null);

export type SearchContextType = {
  search: string | null;
  setSearch: (search: string | null) => void;
  showMapViewOnMobile: boolean;
  setShowMapViewOnMobile: (showMapViewOnMobile: boolean) => void;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = React.useState<string | null>(null);
  const cookies = useCookies();
  const [showMapViewOnMobile, setShowMapViewOnMobile] = useState<boolean>(
    cookies.get(SHOW_MAP_VIEW_COOKIE_NAME) === "true",
  );
  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        showMapViewOnMobile,
        setShowMapViewOnMobile: (showMapViewOnMobile: boolean) => {
          setShowMapViewOnMobile(showMapViewOnMobile);
          cookies.set(
            SHOW_MAP_VIEW_COOKIE_NAME,
            JSON.stringify(showMapViewOnMobile),
          );
        },
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
