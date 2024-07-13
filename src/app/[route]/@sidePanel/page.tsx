// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

import {
  RESOURCE_ROUTES,
  RouteParams,
  SearchParams,
} from "../../../components/common";

import { notFound } from "next/navigation";
import {
  getSidePanelComponentData,
  SidePanelComponent,
} from "../../../components/side-panel-component";

export { generateMetadata } from "../../../components/metadata";

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
