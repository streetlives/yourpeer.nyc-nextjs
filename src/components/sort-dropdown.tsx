// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

"use client";

// import { usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

export function SortDropdown() {
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target?.value);
    console.log("hello");
  };

  return (
    <select
      name="select_sort"
      className="w-auto border-transparent cursor-pointer text-sm"
      onChange={handleChange}
    >
      <option value="nearby" selected>
        Nearby
      </option>
      <option value="recently-updated">Recently Updated</option>
      <option value="most-services">Most Services</option>
    </select>
  );
}
