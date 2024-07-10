import { Metadata, ResolvingMetadata } from "next";
import {
  ABOUT_US_ROUTE,
  AMENITIES_PARAM_LAUNDRY_VALUE,
  AMENITIES_PARAM_RESTROOM_VALUE,
  AMENITIES_PARAM_SHOWER_VALUE,
  AMENITIES_PARAM_TOILETRIES_VALUE,
  CATEGORY_TO_ROUTE_MAP,
  CONTACT_US_ROUTE,
  DONATE_ROUTE,
  LOCATION_ROUTE,
  PAGE_PARAM,
  PRIVACY_POLICY_ROUTE,
  RouteParams,
  SubRouteParams,
  TERMS_OF_USE_ROUTE,
} from "../common";
import { fetchLocationsDetailData } from "./streetlives-api-service";

type Props = {
  params: RouteParams | SubRouteParams;
  searchParams: { [key: string]: string | string[] | undefined };
};

function attachSuffix(s: string): string {
  return `${s} | YourPeer`;
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  let title, description;
  switch (params.route) {
    case LOCATION_ROUTE:
      if ((params as SubRouteParams).locationSlugOrPersonalCareSubCategory) {
        try {
          let locationDetailsResponse = await fetchLocationsDetailData(
            (params as SubRouteParams).locationSlugOrPersonalCareSubCategory,
          );
          title = locationDetailsResponse.address.neighborhood;
          description = locationDetailsResponse.Organization.name
            ? attachSuffix(locationDetailsResponse.Organization.name)
            : "";
        } catch (e) {
          console.error("Error fetching data in metadata", e);
        }
      } else {
        title = attachSuffix("All Locations");
        description =
          "See all locations hosted on YourPeer offering essential resources, shelters, food pantries, and more in NYC.";
      }
      break;
    case CATEGORY_TO_ROUTE_MAP["health-care"]:
      title = attachSuffix(
        "Health Care Services & Centers For Unhoused People",
      );
      description =
        "Find health care services and centers for unhoused people in NYC. Take advantage of our support network and prioritize your health and well-being. ";
      break;
    case CATEGORY_TO_ROUTE_MAP["other"]:
      title = attachSuffix(
        "Other Resources & Services For Unhoused People In NYC",
      );
      description =
        "Discover information about all resources and services offered by locations hosted on YourPeer in NYC. ";
      break;
    case CATEGORY_TO_ROUTE_MAP["shelters-housing"]:
      title = attachSuffix("Shelters & Housing For Unhoused People In NYC");
      description =
        "Find safe accomodations options for unhoused individuals in NYC. Access our resources to help you find stable housing and support on your journey towards housing stability.";
      // TODO: single adults, families
      break;
    case CATEGORY_TO_ROUTE_MAP["food"]:
      title = attachSuffix("Food For Unhoused People In NYC");
      description =
        "Access food resources for unhoused individuals in NYC through YourPeer. Find various food programs to alleviate hunger and receive much-needed nourishment in times of need.";
      // TODO: pantry, soup kitchen
      break;
    case CATEGORY_TO_ROUTE_MAP["clothing"]:
      title = attachSuffix("Free Clothing For Unhoused People In NYC");
      description =
        "Find resources offering free clothing for unhoused individuals in NYC with YourPeer.  Explore our resources for a range of clothing options to meet your specific needs.";
      // TODO: casual, professional
      break;
    case CATEGORY_TO_ROUTE_MAP["personal-care"]:
      title = attachSuffix(
        "Personal Care Resources For Unhoused People In NYC",
      );
      description =
        "Find personal care resources for unhoused individuals in NYC through YourPeer. Discover a range of services and resources for additional support. ";
      switch (
        (params as SubRouteParams).locationSlugOrPersonalCareSubCategory
      ) {
        case AMENITIES_PARAM_LAUNDRY_VALUE:
          title = attachSuffix(
            "Free Laundry Services For Unhoused People In NYC",
          );
          description =
            "YourPeer connects unhoused individuals in NYC with free laundry services and locations. Explore our resources to find nearby laundry facilities.";
          break;
        case AMENITIES_PARAM_RESTROOM_VALUE:
          title = attachSuffix("Restrooms For Unhoused People In NYC");
          description =
            "YourPeer provides information on accessible restrooms in NYC for unhoused individuals. Discover safe and clean facilities to meet your restroom needs with our support.";
          break;
        case AMENITIES_PARAM_SHOWER_VALUE:
          title = attachSuffix("Showers For Unhoused People In NYC");
          description =
            "Find shower facilities for unhoused individuals in NYC at YourPeer. Access showers and hygiene resources  to help you stay clean and refreshed during challenging times.";
          break;
        case AMENITIES_PARAM_TOILETRIES_VALUE:
          title = attachSuffix("Toiletries For Unhoused People In NYC");
          description =
            "Find toiletries and hygiene essentials for unhoused individuals in NYC with YourPeer. Access resources to ensure you have the necessary items for personal care and well-being.";
          break;
      }
      break;
    case ABOUT_US_ROUTE:
      title = "About YourPeer";
      break;
    case CONTACT_US_ROUTE:
      title = attachSuffix("Feedback - Contact Us");
      break;
    case DONATE_ROUTE:
      title = attachSuffix("Donate");
      break;
    case TERMS_OF_USE_ROUTE:
      title = attachSuffix("Terms");
      break;
    case PRIVACY_POLICY_ROUTE:
      title = attachSuffix("Privacy");
      break;
    default:
      title = attachSuffix(
        "New York City Services & Resources For Unhoused People",
      );
  }
  // TODO: sitemap
  let canonicalPath = `/${params.route}${
    (params as SubRouteParams).locationSlugOrPersonalCareSubCategory
      ? `/${(params as SubRouteParams).locationSlugOrPersonalCareSubCategory}`
      : ""
  }${
    searchParams && searchParams[PAGE_PARAM]
      ? `?page=${searchParams[PAGE_PARAM]}`
      : ""
  }`;
  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
  };
}
