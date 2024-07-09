import SearchForm from "./search-form";
import QuickExit from "./quick-exit";
import { COMPANY_ROUTES, CompanyRoute, RESOURCE_ROUTES } from "../common";
import { Footer } from "../footer";
import { LocationsNavbarCompanyRoutes, LocationsNavbarResourceRoutes } from "./locations-navbar";

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
  ) : undefined;
}
