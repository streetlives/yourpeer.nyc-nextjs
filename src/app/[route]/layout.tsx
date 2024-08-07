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
import { MainComponent } from "@/components/main-component";
import { CookiesProvider } from "next-client-cookies/server";
import { GTranslateSelect } from "@/components/gtranslate-select";

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
        <CookiesProvider>
          <GTranslateSelect withSelect={false} />
          <SearchProvider>
            <MapListToggleButton />
            <div className="flex flex-col w-full h-full">
              <div>
                <LocationsNavbarResourceRoutes />
              </div>
              <MainComponent
                mapContainer={mapContainer}
                sidePanel={sidePanel}
              />
            </div>
          </SearchProvider>
        </CookiesProvider>
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
