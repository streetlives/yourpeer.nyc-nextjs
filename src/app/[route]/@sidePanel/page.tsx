import { Metadata, ResolvingMetadata } from "next";
import {
  AGE_PARAM,
  AMENITIES_PARAM_LAUNDRY_VALUE,
  AMENITIES_PARAM_RESTROOM_VALUE,
  AMENITIES_PARAM_SHOWER_VALUE,
  AMENITIES_PARAM_TOILETRIES_VALUE,
  CATEGORY_TO_ROUTE_MAP,
  Category,
  FullLocationData,
  LOCATION_ROUTE,
  PAGE_PARAM,
  REQUIREMENT_PARAM,
  RESOURCE_ROUTES,
  RouteParams,
  SHOW_ADVANCED_FILTERS_PARAM,
  SearchParams,
  SubRouteParams,
  YourPeerLegacyLocationData,
  YourPeerParsedRequestParams,
  parseCategoryFromRoute,
  parseRequest,
} from "../../common";
import FiltersHeader from "../filters-header";
import FiltersPopup from "../filters-popup";
import LocationsContainer from "../locations-container";
import {
  getFullLocationData,
  getTaxonomies,
  map_gogetta_to_yourpeer,
} from "../streetlives-api-service";
import { notFound } from "next/navigation";
import {
  getSidePanelComponentData,
  SidePanelComponent,
} from "./side-panel-component";

export { generateMetadata } from "../metadata";

export default async function SidePanelPage({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: RouteParams;
}) {
  return RESOURCE_ROUTES.includes(params.route) ? (
    <SidePanelComponent
      searchParams={searchParams}
      sidePanelComponentData={await getSidePanelComponentData({
        searchParams,
        params,
      })}
    />
  ) : (
    notFound()
  );
}
