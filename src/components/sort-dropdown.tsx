// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import {
  DEFAULT_SORT_BY_VALUE,
  LAST_SELECTED_LOCATION_SORT_COOKIE_NAME,
  LATITUDE_COOKIE_NAME,
  LONGITUDE_COOKIE_NAME,
  NEARBY_SORT_BY_VALUE,
  SORT_BY_LABELS,
  SORT_BY_QUERY_PARAM,
} from "./common";
import { getUrlWithNewFilterParameter } from "./navigation";
import { useCookies } from "next-client-cookies";

export function SortDropdown() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const cookies = useCookies();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLocationSort = e.target?.value;
    if (selectedLocationSort) {
      cookies.set(
        LAST_SELECTED_LOCATION_SORT_COOKIE_NAME,
        selectedLocationSort,
      );
      router.push(
        getUrlWithNewFilterParameter(
          pathname,
          searchParams,
          SORT_BY_QUERY_PARAM,
          e.target?.value,
        ),
      );
    }
  };

  const _sortBy = searchParams?.get(SORT_BY_QUERY_PARAM);
  const sortBy = _sortBy ? _sortBy : DEFAULT_SORT_BY_VALUE;

  return (
    <select
      name="select_sort"
      className="w-auto border-transparent cursor-pointer text-sm"
      onChange={handleChange}
      value={sortBy}
    >
      {Object.entries(SORT_BY_LABELS).map(([k, v]) => (
        <option
          key={k}
          value={k}
          disabled={
            k === NEARBY_SORT_BY_VALUE &&
            !(
              cookies.get(LATITUDE_COOKIE_NAME) &&
              cookies.get(LONGITUDE_COOKIE_NAME)
            )
              ? true
              : undefined
          }
        >
          {v}
        </option>
      ))}
    </select>
  );
}
