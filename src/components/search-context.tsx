// https://vercel.com/guides/react-context-state-management-nextjs

"use client";

import React, { createContext } from "react";

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
  const [showMapViewOnMobile, setShowMapViewOnMobile] = React.useState<boolean>(false);
  return (
    <SearchContext.Provider value={{ search, setSearch, showMapViewOnMobile, setShowMapViewOnMobile }}>
      {children}
    </SearchContext.Provider>
  );
};
