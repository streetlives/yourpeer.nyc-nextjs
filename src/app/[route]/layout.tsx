// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be f../../components/footerhe LICENSE file or at
// https://opensource.org/licenses/MIT.

import MapListToggleButton from "@/components/map-list-toggle-button";
import {
  COMPANY_ROUTES,
  CompanyRoute,
  RESOURCE_ROUTES,
} from "../../components/common";
import { Footer } from "../../components/footer";
import {
  LocationsNavbarCompanyRoutes,
  LocationsNavbarResourceRoutes,
} from "../../components/locations-navbar";
import { notFound } from "next/navigation";
import { SearchProvider } from "@/components/search-context";
import { Suspense } from "react";

export default function LocationsLayout({
  mapContainer,
  sidePanel,
  staticPage,
  params: { route },
}: {
  mapContainer: React.ReactNode;
  sidePanel: React.ReactNode;
  staticPage: React.ReactNode;
  params: { route: string };
}) {
  //console.log("route", route);
  // TODO: handle the other top-level routes that are not the category routes
  return RESOURCE_ROUTES.includes(route) ? (
    <>
      <div className="h-[100dvh] w-full">
        <MapListToggleButton />
        <SearchProvider>
          <div className="flex flex-col w-full h-full">
            <div>
              <LocationsNavbarResourceRoutes />
            </div>
            <main className="flex-1 overflow-hidden flex flex-col md:flex-row">
              <div
                className="relative w-full md:w-1/2 lg:w-1/3 bg-white overflow-hidden"
                id="left_panel"
              >
                <Suspense fallback={<p>Loading location data...</p>}>
                  {sidePanel}
                </Suspense>
              </div>
              <Suspense fallback={<p>Loading map...</p>}>
                {mapContainer}
              </Suspense>
            </main>
          </div>
        </SearchProvider>
      </div>
    </>
  ) : COMPANY_ROUTES.includes(route as CompanyRoute) ? (
    <>
      <LocationsNavbarCompanyRoutes />
      {staticPage}
      <Footer />
    </>
  ) : (
    notFound()
  );
}
