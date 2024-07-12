import { RESOURCE_ROUTES, RouteParams, SearchParams } from "../../common";

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
