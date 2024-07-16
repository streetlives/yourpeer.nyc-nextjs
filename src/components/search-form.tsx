// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SEARCH_PARAM } from "./common";
import {
  getUrlWithNewFilterParameter,
  getUrlWithoutFilterParameter,
} from "./navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";

function SearchPanel({ currentSearch }: { currentSearch: string }) {
  const searchParams = useSearchParams() || new Map();
  const pathname = usePathname();
  const newUrl = getUrlWithNewFilterParameter(
    pathname,
    searchParams,
    SEARCH_PARAM,
    currentSearch,
  );
  //console.log("currentSearch", currentSearch);
  return (
    <div
      className="bg-white fixed z-40 md:absolute bottom-0 md:bottom-auto w-full top-[49.6px] md:top-full inset-x-0 rounded border md:border-gray-300"
      id="search_panel"
    >
      <div>
        <Link
          className="flex items-center px-5 py-4 hover:bg-gray-200 transition"
          href={newUrl}
          id="search_panel_link"
        >
          <img
            src="/img/icons/search-icon.png"
            className="flex-shrink-0 w-6 h-6 max-h-6 object-contain"
            alt=""
          />
          <div className="flex-1 text-dark">
            Search for{" "}
            <span id="search_for" translate="no">
              {currentSearch}
            </span>
          </div>
          <span className="text-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </Link>
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-center flex-col p-5 sm:p-7">
          <img
            src="/img/icons/search-icon.png"
            className="w-9 h-9 max-h-9 object-contain"
            alt=""
          />
          <p className="mt-5 text-base text-dark text-center ">
            Search for keywords <br /> in our service listings
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SearchForm() {
  const searchParams = useSearchParams() || new Map();
  const searchParamFromQuery = searchParams.get(SEARCH_PARAM);
  const [search, setSearch] = useState(searchParams.get(SEARCH_PARAM));
  const [inputHasFocus, setInputHasFocus] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setSearch(searchParamFromQuery);
  }, [searchParamFromQuery]);

  function doSetSearch(e: ChangeEvent) {
    setSearch((e.target as HTMLFormElement).value);
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    setInputHasFocus(true);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    // we add a small delay to allow time for page to navigate
    setTimeout(() => setInputHasFocus(false), 250);
  }

  function doSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (search) {
      router.push(
        getUrlWithNewFilterParameter(
          pathname,
          searchParams,
          SEARCH_PARAM,
          search,
        ),
      );
      setInputHasFocus(false);
    }
  }

  return (
    <>
      <form
        className="flex items-center ml-2 relative flex-1"
        id="search_form"
        onSubmit={doSearchSubmit}
      >
        <input
          className="text-xs md:pl-3 sm:text-sm text-gray-600 w-full border-none p-0 focus:ring-0 block mt-0"
          type="text"
          placeholder="Search"
          id="search_input"
          name="search"
          onChange={doSetSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={search || ""}
        />
        {search ? (
          <Link
            href={getUrlWithoutFilterParameter(
              pathname,
              searchParams,
              SEARCH_PARAM,
            )}
          >
            <XMarkIcon className="w-5 h-5 text-black" />
          </Link>
        ) : undefined}
      </form>
      {inputHasFocus && search ? (
        <SearchPanel currentSearch={search} />
      ) : undefined}
    </>
  );
}
