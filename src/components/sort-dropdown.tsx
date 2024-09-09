// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { SORT_BY_LABELS, SORT_BY_QUERY_PARAM } from "./common";
import { getUrlWithNewFilterParameter } from "./navigation";

export function SortDropdown() {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(
      getUrlWithNewFilterParameter(
        pathname,
        searchParams,
        SORT_BY_QUERY_PARAM,
        e.target?.value
      )
    );
  };

  const _sortBy = searchParams?.get(SORT_BY_QUERY_PARAM);
  const sortBy = _sortBy ? _sortBy : undefined;

  return (
    <select
      name="select_sort"
      className="w-auto border-transparent cursor-pointer text-sm"
      onChange={handleChange}
      value={sortBy}
    >
      {Object.entries(SORT_BY_LABELS).map(([k, v]) => (
        <option key={k} value={k}>
          {v}
        </option>
      ))}
    </select>
  );
}
