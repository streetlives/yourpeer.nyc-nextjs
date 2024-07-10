import SearchForm from "./search-form";
import QuickExit from "./quick-exit";
import {
  AMENITIES_PARAM_LAUNDRY_VALUE,
  AMENITIES_PARAM_RESTROOM_VALUE,
  AMENITIES_PARAM_SHOWER_VALUE,
  AMENITIES_PARAM_TOILETRIES_VALUE,
  CATEGORY_TO_ROUTE_MAP,
  COMPANY_ROUTES,
  CompanyRoute,
  LOCATION_ROUTE,
  PAGE_PARAM,
  RESOURCE_ROUTES,
  RouteParams,
  SubRouteParams,
} from "../common";
import { Footer } from "../footer";
import {
  LocationsNavbarCompanyRoutes,
  LocationsNavbarResourceRoutes,
} from "./locations-navbar";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

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
        <div className="flex flex-col w-full h-full">
          <div>
            <LocationsNavbarResourceRoutes />
          </div>
          <main className="flex-1 overflow-hidden flex flex-col md:flex-row">
            <div
              className="relative w-full md:w-1/2 lg:w-1/3 bg-white overflow-hidden"
              id="left_panel"
            >
              {sidePanel}
            </div>

            {mapContainer}
          </main>
        </div>
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
