import type { MetadataRoute } from "next";
import { getSimplifiedLocationData } from "./[route]/streetlives-api-service";
import {
  AMENITIES_PARAM_SUBCATEGORY_AND_CANONICAL_ORDERING,
  CATEGORY_TO_ROUTE_MAP,
  COMPANY_ROUTES,
  LOCATION_ROUTE,
  PERSONAL_CARE_CATEGORY,
  RESOURCE_ROUTES,
} from "./common";

const ROOT_DOMAIN = "https://yourpeer.nyc";
const DEFAULT_CHANGE_FREQUENCY = "daily";
const DEFAULT_SITEMAP_PROPERTIES = {
  changeFrequency: DEFAULT_CHANGE_FREQUENCY,
  priority: 0.5,
} as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const simplifiedLocationData = await getSimplifiedLocationData({
    taxonomies: null,
    taxonomySpecificAttributes: null,
  });

  return [
    {
      url: ROOT_DOMAIN,
      ...DEFAULT_SITEMAP_PROPERTIES,
    },
  ]
    .concat(
      RESOURCE_ROUTES.concat(COMPANY_ROUTES).map((topLevelRoute) => ({
        url: `${ROOT_DOMAIN}/${topLevelRoute}`,
        ...DEFAULT_SITEMAP_PROPERTIES,
      })),
    )
    .concat(
      AMENITIES_PARAM_SUBCATEGORY_AND_CANONICAL_ORDERING.map(
        (amenitySubCategory) => ({
          url: `${ROOT_DOMAIN}/${CATEGORY_TO_ROUTE_MAP[PERSONAL_CARE_CATEGORY]}/${amenitySubCategory}`,
          ...DEFAULT_SITEMAP_PROPERTIES,
        }),
      ),
    )
    .concat(
      simplifiedLocationData.map((d) => ({
        url: `${ROOT_DOMAIN}/${LOCATION_ROUTE}/${d.slug}`,
        ...DEFAULT_SITEMAP_PROPERTIES,
      })),
    );
}
