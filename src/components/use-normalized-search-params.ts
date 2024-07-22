import { AGE_PARAM, SEARCH_PARAM, mapsAreEqual } from "./common";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";

import { SearchContext, SearchContextType } from "./search-context";

export interface UseNormalizedSearchParamsType {
  normalizedSearchParams?: Map<string, string>;
  ageParam?: number;
  search?: string | null;
  setAgeParam: Dispatch<SetStateAction<number | undefined>>;
}

export function useNormalizedSearchParams(): UseNormalizedSearchParamsType {
  const { search } = useContext(SearchContext) as SearchContextType;
  const searchParams = useSearchParams();
  const [normalizedSearchParams, setNormalizedSearchParams] =
    useState<Map<string, string>>();
  const [ageParam, setAgeParam] = useState<number>();
  // normalize the search params
  useEffect(() => {
    const localNormalizedSearchParams = searchParams
      ? new Map(searchParams.entries())
      : new Map();
    if (searchParams && searchParams.has(AGE_PARAM) && ageParam === undefined) {
      const age = searchParams.get(AGE_PARAM);
      if (age) {
        setAgeParam(parseInt(age, 10));
      }
      localNormalizedSearchParams.set(AGE_PARAM, age);
    }
    if (search && localNormalizedSearchParams.get(SEARCH_PARAM) !== ageParam) {
      localNormalizedSearchParams.set(SEARCH_PARAM, search);
    }
    if (ageParam && localNormalizedSearchParams.get(AGE_PARAM) !== ageParam) {
      localNormalizedSearchParams.set(AGE_PARAM, ageParam);
    }
    // only set him if he's changed
    if (
      normalizedSearchParams === undefined ||
      !mapsAreEqual(localNormalizedSearchParams, normalizedSearchParams)
    ) {
      setNormalizedSearchParams(localNormalizedSearchParams);
    }
  }, [
    ageParam,
    searchParams,
    normalizedSearchParams,
    setNormalizedSearchParams,
    search,
  ]);
  return { normalizedSearchParams, ageParam, search, setAgeParam };
}
