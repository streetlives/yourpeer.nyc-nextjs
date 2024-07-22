// https://vercel.com/guides/react-context-state-management-nextjs

"use client";

import React, { createContext } from "react";

export const SearchContext = createContext<SearchContextType | null>(null);

export type SearchContextType = {
  search: string | null;
  setSearch: (search: string | null) => void;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = React.useState<string | null>(null);
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
