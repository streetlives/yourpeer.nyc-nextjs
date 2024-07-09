import SearchForm from "./search-form";
import QuickExit from "./quick-exit";
import { COMPANY_ROUTES, CompanyRoute, RESOURCE_ROUTES } from "../common";
import { Footer } from "../footer";
import { LocationsNavbar } from "./locations-navbar";

export default function LocationsLayout({
  mapContainer,
  sidePanel,
  staticPage,
  params: { route },
}: {
  mapContainer: React.ReactNode;
  sidePanel: React.ReactNode;
  staticPage: React.ReactNode,
  params: { route: string };
}) {
  //console.log("route", route);
  // TODO: handle the other top-level routes that are not the category routes
  return RESOURCE_ROUTES.includes(route) ? (
    <>
      <div className="h-[100dvh] w-full">
        <div className="flex flex-col w-full h-full">
          <div>
            <LocationsNavbar />
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
      <header className="fixed top-0 inset-x-0 z-10 bg-amber-300" id="header">
        <nav className="flex items-center justify-between px-5 py-5 h-16 max-w-5xl mx-auto w-full">
          <div className="flex items-center space-x-3">
            <button
              className="hover:cursor-pointer text-gray-900 hover:text-gray-600 hover:brightness-125 inline-block transition"
              id="offCanvasMenuButton"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <a href="/" translate="no" className="text-[15px]">
              <span className="text-black font-extrabold ">YourPeer</span>NYC
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <div className="gtranslate_wrapper"></div>
            <button
              className="inline-flex items-center text-[13px] sm:text-xs font-medium text-black space-x-1"
              id="quickExitLink"
            >
              <span className="inline-block">Quick Exit</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M10.79 16.29C11.18 16.68 11.81 16.68 12.2 16.29L15.79 12.7C16.18 12.31 16.18 11.68 15.79 11.29L12.2 7.7C11.81 7.31 11.18 7.31 10.79 7.7C10.4 8.09 10.4 8.72 10.79 9.11L12.67 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13H12.67L10.79 14.88C10.4 15.27 10.41 15.91 10.79 16.29ZM19 3H5C3.89 3 3 3.9 3 5V8C3 8.55 3.45 9 4 9C4.55 9 5 8.55 5 8V6C5 5.45 5.45 5 6 5H18C18.55 5 19 5.45 19 6V18C19 18.55 18.55 19 18 19H6C5.45 19 5 18.55 5 18V16C5 15.45 4.55 15 4 15C3.45 15 3 15.45 3 16V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
                  fill="#212121"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>
      {staticPage}
      <Footer />
    </>
  ) : undefined;
}
