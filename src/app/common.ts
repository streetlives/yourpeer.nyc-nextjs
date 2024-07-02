export const CATEGORIES = [
  "shelters-housing",
  "food",
  "clothing",
  "personal-care",
  "health-care",
  "other",
] as const

export type CategoryNotNull = typeof CATEGORIES[number]

export type Category = CategoryNotNull | null;

export const CATEGORY_TO_ROUTE_MAP: Record<CategoryNotNull, string> = {
  "health-care": "health-care",
  other: "other-services",
  "shelters-housing": "shelters-housing",
  food: "food",
  clothing: "clothing",
  "personal-care": "personal-care",
};

export const CATEGORY_DESCRIPTION_MAP: Record<CategoryNotNull, string> = {
  "health-care": "Health",
  other: "Other",
  "shelters-housing": "Shelter & Housing",
  food: "Food",
  clothing: "Clothing",
  "personal-care": "Personal Care",
};

export const CATEGORY_ICON_SRC_MAP: Record<CategoryNotNull, string> = {
  "health-care": "health",
  other: "dots",
  "shelters-housing": "shelter-icon",
  food: "food-icon",
  clothing: "clothing",
  "personal-care": "personal-care",
};

export function getIconPath(iconName: string): string {
  return `/img/icons/${iconName}.svg`;
}

export const LOCATION_ROUTE = 'locations'

export const SEARCH_PARAM = 'search'
export const AGE_PARAM = 'age'
export const OPEN_PARAM = 'open'
export const SHELTER_PARAM = 'shelter'
export const SHELTER_PARAM_SINGLE_VALUE = 'single'
export const SHELTER_PARAM_FAMILY_VALUE = 'family'
export type ShelterValues =
  | typeof SHELTER_PARAM_SINGLE_VALUE
  | typeof SHELTER_PARAM_FAMILY_VALUE; 
export const SHOW_ADVANCED_FILTERS_PARAM = 'adv'

export const URL_PARAM_NAMES = [
  SEARCH_PARAM,
  AGE_PARAM,
  OPEN_PARAM,
  SHELTER_PARAM,
  SHOW_ADVANCED_FILTERS_PARAM
] as const

export type UrlParamName = typeof URL_PARAM_NAMES[number]

export type SearchParams =  { [key: string]: string | string[] | undefined }

export interface YourPeerSearchParams {
  [SEARCH_PARAM]: string | null;
  [AGE_PARAM]: number | null;
  [OPEN_PARAM]: boolean | null;
  [SHELTER_PARAM]: ShelterValues | null;
  [SHOW_ADVANCED_FILTERS_PARAM]: boolean;
}

export function parseSearchParams(
  searchParams: SearchParams
): YourPeerSearchParams {
  // TODO: validate searchParams with Joi
  // TODO: return 400 on validation error
  return {
    [SEARCH_PARAM]:
      typeof searchParams[SEARCH_PARAM] === "string"
        ? (searchParams[SEARCH_PARAM] as string)
        : null,
    [AGE_PARAM]:
      typeof searchParams[AGE_PARAM] === "string" &&
      !isNaN(parseInt(searchParams[AGE_PARAM] as string, 10))
        ? parseInt(searchParams[AGE_PARAM] as string, 10)
        : null,
    [OPEN_PARAM]: typeof searchParams[OPEN_PARAM] === "string" ? true : null,
    [SHELTER_PARAM]:
      (typeof searchParams[SHELTER_PARAM] === "string" &&
        searchParams[SHELTER_PARAM] === SHELTER_PARAM_SINGLE_VALUE) ||
      searchParams[SHELTER_PARAM] === SHELTER_PARAM_FAMILY_VALUE
        ? (searchParams[SHELTER_PARAM] as ShelterValues)
        : null,
    [SHOW_ADVANCED_FILTERS_PARAM]: !!searchParams[SHOW_ADVANCED_FILTERS_PARAM],
  };
}


// TODO: this should get exported by the streetlives-api REST API or a shared types library, rather than being embedded here
export interface SimplifiedLocationData {
  id: string;
  name: string | null;
  description: string | null;
  transportation: string | null;
  position: {
    coordinates: [number, number];
  };
  additional_info: string | null;
  slug: string;
  last_validated_at: Date;
  createdAt: Date;
  updatedAt: Date;
  organization_id: string;
  closed: boolean;
}

export interface ServiceData {
  id: string;
  name: string | null;
  description: string | null;
  url: string | null;
  email: string | null;
  interpretation_services: string | null;
  fees: string | null;
  additional_info: string | null;
  createdAt: Date;
  updatedAt: Date;
  organization_id: string | null;
  ServiceAtLocation: {
    id: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    location_id: string;
    service_id: string;
  };
  Eligibilities: {
    id: string;
    eligible_values: any[]; // TODO
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    parameter_id: string;
    service_id: string;
    EligibilityParameter: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
  ServiceTaxonomySpecificAttributes: any[]; // TODO
  Taxonomies: {
    id: string;
    name: TaxonomyCategory;
    parent_name: TaxonomyCategory | null;
    createdAt: Date;
    updatedAt: Date;
    parent_id: string | null;
    ServiceTaxonomy: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      service_id: string;
      taxonomy_id: string;
    };
  }[];
  RegularSchedules: [];
  HolidaySchedules: {
    id: string;
    closed: boolean;
    opens_at: string;
    closes_at: string;
    start_date: string | null;
    end_date: string | null;
    weekday: number | null;
    occasion: string | null;
    createdAt: Date;
    updatedAt: Date;
    location_id: string | null;
    service_id: string | null;
    service_at_location_id: string | null;
  }[];
  Languages: {
    id: string;
    language: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    ServiceLanguages: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      language_id: string;
      service_id: string;
    };
  }[];
  RequiredDocuments: {
    id: string;
    document: string;
    createdAt: Date;
    updatedAt: Date;
    service_id: string;
  }[];
  DocumentsInfo: {
    id: string;
    recertification_time: string;
    grace_period: string;
    additional_info: string;
    createdAt: Date;
    updatedAt: Date;
    service_id: string;
  };
  Phones: [];
  EventRelatedInfos: {
    id: string;
    event: string | null;
    information: string | null;
    createdAt: Date;
    updatedAt: Date;
    service_id: string | null;
  }[];
  ServiceAreas: {
    id: string;
    postal_codes: string[];
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    service_id: string;
  }[];
}

export interface AbstractDetailedLocationData {
  Organization: {
    id: string;
    name: string | null;
    description: string | null;
    email: string | null;
    url: string | null;
    createdAt: Date;
    updatedAt: Date;
    Phones: string[];
  };
  Phones: {
    id: string | null;
    number: string;
    extension: string | null;
    type: string | null;
    language: string | null;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    location_id: string | null;
    organization_id: string | null;
    service_id: string | null;
    service_at_location_id: string | null;
  }[];
  Services: ServiceData[];
}

export interface FullLocationData
  extends SimplifiedLocationData,
    AbstractDetailedLocationData {
  PhysicalAddresses: {
    id: string;
    address_1: string | null;
    city: string | null;
    region: string | null;
    state_province: string | null;
    postal_code: string | null;
    country: string | null;
    neighborhood: string | null;
    createdAt: Date;
    updatedAt: Date;
    location_suggestion_id: string | null;
    location_id: string;
  }[];
}

export interface LocationDetailData
  extends SimplifiedLocationData,
    AbstractDetailedLocationData {
  AccessibilityForDisabilities: any[]; // TODO
  metadata: any; //TODO
  EventRelatedInfos: any[]; // TODO
  additionalInfo: string | null;
  address: {
    street: string | null;
    city: string | null;
    region: string | null;
    state: string | null;
    postalCode: string | null;
    country: string | null;
    neighborhood: string | null;
  };
}

export interface Taxonomy {
  id: string;
  name: string;
  parent_name: string | null;
  createdAt: Date;
  updatedAt: Date;
  parent_id: string | null;
}

export interface TaxonomyResponse extends Taxonomy {
  children?: Taxonomy[]
}

export const TAXONOMY_CATEGORIES = [
  "Health",
  "Other service",
  "Shelter",
  "Food",
  "Clothing",
  "Personal Care",
] as const

export type TaxonomyCategory = typeof TAXONOMY_CATEGORIES[number]

export function setIntersection<T>(set1: Set<T>, set2: Set<T>): Set<T>{
  return new Set<T>(Array.from(set1).filter((x) => set2.has(x)));
}

export const CATEGORY_TO_TAXONOMY_NAME_MAP: Record<CategoryNotNull, TaxonomyCategory> = {
  "health-care": "Health",
  other: "Other service",
  "shelters-housing": "Shelter",
  food: "Food",
  clothing: "Clothing",
  "personal-care": "Personal Care",
};

export interface AgeEligibility {
  minAge: number | null
  maxAge: number | null
  // TODO: the toher properties for age eligibility
}

export interface YourPeerLegacyServiceData {
  name: string | null;
  description: string | null;
  category: TaxonomyCategory | null;
  subcategory: TaxonomyCategory | null;
  info: string[];
  closed: boolean;
  schedule: {};
  docs: string[] | null;
  referral_letter: boolean | null;
  eligibility: string[] | null;
  membership: boolean | null;
  age: AgeEligibility[] | null;
}

export interface YourPeerLegacyServiceDataWrapper {
  services : YourPeerLegacyServiceData[]
}

export interface YourPeerLegacyLocationData {
  id: string;
  location_name: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  state: string | null;
  zip: string | null;
  lat: number;
  lng: number;
  area: string | null;
  info: string[] | null;
  slug: string;
  last_updated: string;
  last_updated_date: Date;
  name: string | null;
  phone: string | null;
  url: string | null;
  accommodation_services: YourPeerLegacyServiceDataWrapper;
  food_services: YourPeerLegacyServiceDataWrapper;
  clothing_services: YourPeerLegacyServiceDataWrapper;
  personal_care_services: YourPeerLegacyServiceDataWrapper;
  health_services: YourPeerLegacyServiceDataWrapper;
  other_services: YourPeerLegacyServiceDataWrapper;
  closed: boolean;
}