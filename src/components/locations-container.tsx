// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

import Link from "next/link";
import {
  CATEGORIES,
  Category,
  CATEGORY_ICON_SRC_MAP,
  getIconPath,
  getServicesWrapper,
  YourPeerLegacyLocationData,
} from "./common";
import { LocationsContainerPager } from "./locations-container-pager";

export default function LocationsContainer({
  category,
  yourPeerLegacyLocationData,
  resultCount,
  numberOfPages,
  currentPage,
}: {
  category: Category;
  yourPeerLegacyLocationData: YourPeerLegacyLocationData[];
  resultCount: number;
  numberOfPages: number;
  currentPage: number;
}) {
  return (
    <div
      className="md:flex flex-col flex-1 overflow-y-auto scrollbar-hide md:scrollbar-thumb-primary md:scrollbar-w-2 md:scrollbar-track-rounded md:scrollbar-thumb-rounded md:scrollbar-track-primary/20"
      id="locations_container"
    >
      <div className="flex-1 flex flex-col">
        <div className="text-sm px-6 py-4 flex items-center border-b border-dotted border-neutral-200 justify-between">
          <h1>
            <span>
              {category === "shelters-housing"
                ? "All popular Shelter & Housing locations"
                : category === "food"
                  ? "All popular Food locations"
                  : category === "clothing"
                    ? "All popular Clothing locations"
                    : category === "personal-care"
                      ? "All popular Personal care locations"
                      : category === "health-care"
                        ? "All popular Health locations"
                        : category === "other"
                          ? "All popular Other locations"
                          : "All service locations"}
            </span>
          </h1>
        </div>
        {yourPeerLegacyLocationData.length ? (
          <>
            <ul
              id="locations"
              className="flex flex-1 flex-col divide-y divide-dotted divide-neutral-200 relative"
            >
              {yourPeerLegacyLocationData.map((location) => (
                <li
                  data-id={location.id}
                  data-lat={location.lat}
                  data-lng={location.lng}
                  className="p-6"
                  key={location.id}
                >
                  <div
                    translate="no"
                    className="location_name text-dark text-lg sm:text-xl font-medium mb-1"
                  >
                    {location.name}
                  </div>
                  <div>
                    {location.name ? (
                      <p
                        className="text-xs text-neutral-500 mb-1"
                        translate="no"
                      >
                        {location.location_name}
                      </p>
                    ) : undefined}
                    <p className="flex items-center gap-x-1 text-xs text-neutral-500">
                      <span translate="no" className="truncate">
                        {location.area}
                      </span>
                      <span className="text-success truncate">
                        {" "}
                        ✓ Validated <span> {location.last_updated} </span>
                      </span>
                    </p>
                  </div>
                  {location.closed ? (
                    <div className="mt-3">
                      <div className="flex space-x-1.5">
                        <span className="text-danger">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>

                        <div>
                          <p className="text-dark mb-0.5 font-medium text-sm">
                            Closed
                          </p>
                          {location.info ? (
                            <p className="text-dark font-normal text-sm">
                              {location.info[0]}
                            </p>
                          ) : undefined}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ul className="mt-3 flex gap-2 flex-col xl:pr-20">
                      {CATEGORIES.map((serviceCategory) => {
                        const servicesWrapper = getServicesWrapper(
                          serviceCategory,
                          location,
                        );
                        return servicesWrapper?.services.length ? (
                          <li
                            className="flex space-x-1.5 text-sm text-dark"
                            key={serviceCategory}
                          >
                            <img
                              src={getIconPath(
                                CATEGORY_ICON_SRC_MAP[serviceCategory],
                              )}
                              className="flex-shrink-0 max-h-5"
                              alt=""
                              width="15"
                              height="16"
                            />
                            <p>
                              {servicesWrapper?.services
                                .map((item) => item.name)
                                .join(" • ")}
                            </p>
                          </li>
                        ) : undefined;
                      })}
                    </ul>
                  )}
                  <div className="mt-3">
                    <Link
                      href={location.slug}
                      className="flex items-center space-x-2 text-sm text-info hover:text-blue-600 transition"
                    >
                      <span>More Details</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <LocationsContainerPager
              resultCount={resultCount}
              numberOfPages={numberOfPages}
              currentPage={currentPage}
            />
          </>
        ) : undefined}
      </div>
    </div>
  );
}
