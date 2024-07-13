// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

import {
  Category,
  PAGE_PARAM,
  REQUIREMENT_PARAM,
  RouteParams,
  SHOW_ADVANCED_FILTERS_PARAM,
  SearchParams,
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

interface SidePanelComponentData {
  parsedSearchParams: YourPeerParsedRequestParams;
  category: Category;
  resultCount: number;
  numberOfPages: number;
  yourPeerLegacyLocationData: YourPeerLegacyLocationData[];
}

export async function getSidePanelComponentData({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: RouteParams;
}): Promise<SidePanelComponentData> {
  const category = parseCategoryFromRoute(params.route);
  // FIXME: the string composition in the next line is a bit ugly. I should clean up the type used in this interface
  const parsedSearchParams = parseRequest({ params, searchParams });
  const taxonomiesResults = await getTaxonomies(category, parsedSearchParams);
  const { locations, numberOfPages, resultCount } =
    await await getFullLocationData({
      ...parsedSearchParams,
      ...parsedSearchParams[REQUIREMENT_PARAM],
      ...taxonomiesResults,
    });
  const yourPeerLegacyLocationData = locations.map((location) =>
    map_gogetta_to_yourpeer(location, false),
  );
  return {
    parsedSearchParams,
    category,
    resultCount,
    numberOfPages,
    yourPeerLegacyLocationData,
  };
}

export function SidePanelComponent({
  searchParams,
  sidePanelComponentData: {
    parsedSearchParams,
    category,
    resultCount,
    numberOfPages,
    yourPeerLegacyLocationData,
  },
}: {
  searchParams: SearchParams;
  sidePanelComponentData: SidePanelComponentData;
}) {
  return (
    <div
      className="w-full h-full md:h-full flex flex-col"
      id="filters_and_list_screen"
    >
      {parsedSearchParams[SHOW_ADVANCED_FILTERS_PARAM] ? (
        <FiltersPopup category={category} numLocationResults={resultCount} />
      ) : undefined}
      <FiltersHeader category={category} searchParams={searchParams} />
      <LocationsContainer
        resultCount={resultCount}
        numberOfPages={numberOfPages}
        currentPage={parsedSearchParams[PAGE_PARAM]}
        category={category}
        yourPeerLegacyLocationData={yourPeerLegacyLocationData}
      />
    </div>
  );
}
