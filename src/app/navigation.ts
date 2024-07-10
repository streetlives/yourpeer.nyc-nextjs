import { ReadonlyURLSearchParams } from "next/navigation";
import {
  AGE_PARAM,
  AMENITIES_PARAM,
  AMENITIES_PARAM_SUBCATEGORY_AND_CANONICAL_ORDERING,
  AmenitiesSubCategory,
  CATEGORY_TO_ROUTE_MAP,
  CategoryNotNull,
  FILTERS_THAT_APPLY_TO_ALL_CATEGORIES,
  getParsedAmenities,
  LOCATION_ROUTE,
  PAGE_PARAM,
  parsePageParam,
  parsePathnameToCategoryAndSubCategory,
  parseRequirementParam,
  PERSONAL_CARE_CATEGORY,
  REQUIREMENT_PARAM,
  REQUIREMENT_PARAM_CANONICAL_ORDERING,
  RequirementValue,
  SearchParams,
  UrlParamName,
} from "./common";
import { assert } from "console";

// Change category
export function getUrlWithNewCategory(
  newCategory: CategoryNotNull,
  searchParams: ReadonlyURLSearchParams | Map<string, string>,
): string {
  const currentUrlSearchParams = new URLSearchParams(
    Array.from(searchParams.entries()).filter(([k, v]) =>
      FILTERS_THAT_APPLY_TO_ALL_CATEGORIES.includes(k),
    ),
  );

  const newSearchParamsStr = currentUrlSearchParams.toString();
  // always delete the current page
  currentUrlSearchParams.delete(PAGE_PARAM);
  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";
  return `/${CATEGORY_TO_ROUTE_MAP[newCategory]}${query}`;
}

function getSearchParamsList(
  searchParams: ReadonlyURLSearchParams | SearchParams | Map<string, string>,
): string[][] {
  return searchParams instanceof ReadonlyURLSearchParams
    ? Array.from(searchParams.entries())
    : (Object.entries(searchParams)
        .filter(([k, v]) => v !== undefined)
        .flatMap(([k, v]) =>
          Array.isArray(v) ? v.map((w) => [k, w]) : [[k, v]],
        ) as string[][]);
}

// Add filter parameter
export function getUrlWithNewFilterParameter(
  pathname: string | null,
  searchParams: ReadonlyURLSearchParams | SearchParams | Map<string, string>,
  urlParamName: UrlParamName,
  urlParamValue: string = "yes",
): string {
  if (!pathname) {
    throw new Error("Expected pathname to not be null");
  }
  const searchParamsList: string[][] = getSearchParamsList(searchParams);

  const currentUrlSearchParams = new URLSearchParams(searchParamsList);

  currentUrlSearchParams.set(urlParamName, urlParamValue);

  const newSearchParamsStr = currentUrlSearchParams.toString();
  // always delete the current page
  currentUrlSearchParams.delete(PAGE_PARAM);

  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";
  return `${pathname}${query}`;
}

export function getUrlWithoutFilterParameter(
  pathname: string | null,
  searchParams: ReadonlyURLSearchParams | SearchParams | Map<string, string>,
  urlParamName: UrlParamName,
): string {
  if (!pathname) {
    throw new Error("Expected pathname to not be null");
  }
  const searchParamsList: string[][] = getSearchParamsList(searchParams);

  const currentUrlSearchParams = new URLSearchParams(searchParamsList);

  currentUrlSearchParams.delete(urlParamName);

  const newSearchParamsStr = currentUrlSearchParams.toString();
  // always delete the current page
  currentUrlSearchParams.delete(PAGE_PARAM);

  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";
  return `${pathname}${query}`;
}

// Clear all filter parameters
export function getUrlWithoutFilterParameters(): string {
  return `/${LOCATION_ROUTE}`;
}

export function getUrlWithNewRequirementTypeFilterParameterAddedOrRemoved(
  pathname: string | null,
  searchParams: ReadonlyURLSearchParams | SearchParams | Map<string, string>,
  newRequirementTypeToAddOrRemove: RequirementValue,
  addRequirementType: boolean,
): string {
  if (!pathname) {
    throw new Error("Expected pathname to not be null");
  }
  const searchParamsList: string[][] = getSearchParamsList(searchParams);

  const currentUrlSearchParams = new URLSearchParams(searchParamsList);

  const currentRequirementValue = currentUrlSearchParams.get(REQUIREMENT_PARAM);

  const parsedRequirements: RequirementValue[] = parseRequirementParam(
    currentRequirementValue,
  );

  const newParsedRequirements = addRequirementType
    ? !parsedRequirements.includes(newRequirementTypeToAddOrRemove)
      ? parsedRequirements
          .concat(newRequirementTypeToAddOrRemove)
          .sort(
            (a, b) =>
              REQUIREMENT_PARAM_CANONICAL_ORDERING.indexOf(a) -
              REQUIREMENT_PARAM_CANONICAL_ORDERING.indexOf(b),
          )
      : parsedRequirements
    : parsedRequirements.filter(
        (requirement) => requirement !== newRequirementTypeToAddOrRemove,
      );

  if (newParsedRequirements.length) {
    const serializedNewParsedRequirements = newParsedRequirements.join(" ");

    currentUrlSearchParams.set(
      REQUIREMENT_PARAM,
      serializedNewParsedRequirements,
    );
  } else {
    currentUrlSearchParams.delete(REQUIREMENT_PARAM);
  }

  // always delete the current page
  currentUrlSearchParams.delete(PAGE_PARAM);
  const newSearchParamsStr = currentUrlSearchParams.toString();

  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";
  return `${pathname}${query}`;
}

export function getUrlWithNewPersonalCareServiceSubCategoryAndFilterParameterAddedOrRemoved(
  pathname: string | null,
  searchParams: ReadonlyURLSearchParams | SearchParams | Map<string, string>,
  newAmenityToAddOrRemove: AmenitiesSubCategory,
  addAmenity: boolean,
): string {
  if (!pathname) {
    throw new Error("Expected pathname to not be null");
  }
  const searchParamsList: string[][] = getSearchParamsList(searchParams);

  const currentUrlSearchParams = new URLSearchParams(searchParamsList);

  const currentAmenitiesSubCategoryFromQueryParam =
    currentUrlSearchParams.get(AMENITIES_PARAM);

  const [category, amenitiesSubCategory] =
    parsePathnameToCategoryAndSubCategory(pathname);

  const parsedAmenitiesFromQueryParam = getParsedAmenities(
    amenitiesSubCategory,
    currentAmenitiesSubCategoryFromQueryParam,
  );

  const newParsedAmenities = addAmenity
    ? !parsedAmenitiesFromQueryParam.includes(newAmenityToAddOrRemove)
      ? parsedAmenitiesFromQueryParam.concat(newAmenityToAddOrRemove)
      : parsedAmenitiesFromQueryParam
    : parsedAmenitiesFromQueryParam.filter(
        (amenity) => amenity !== newAmenityToAddOrRemove,
      );

  // mutate the query params, and get the new path
  let newPath;
  if (newParsedAmenities.length) {
    // special serialization logic:
    // 1. sort the parsed amenities by the canonical ordering
    // 2. the first element becomes the path component
    // 3. the remaining elements go into the query params
    const [amenitySubCategory, ...newAmenitiesQueryParams] =
      newParsedAmenities.sort(
        (a, b) =>
          AMENITIES_PARAM_SUBCATEGORY_AND_CANONICAL_ORDERING.indexOf(a) -
          AMENITIES_PARAM_SUBCATEGORY_AND_CANONICAL_ORDERING.indexOf(b),
      );
    newPath = `/${PERSONAL_CARE_CATEGORY}/${amenitySubCategory}`;

    if (newAmenitiesQueryParams.length) {
      const serializedNewParsedAmenitiesQueryParam =
        newAmenitiesQueryParams.join(" ");
      currentUrlSearchParams.set(
        AMENITIES_PARAM,
        serializedNewParsedAmenitiesQueryParam,
      );
    } else {
      currentUrlSearchParams.delete(AMENITIES_PARAM);
    }
  } else {
    // no more amenities parameter
    // just back to the personal care category.
    currentUrlSearchParams.delete(AMENITIES_PARAM);
    newPath = `/${PERSONAL_CARE_CATEGORY}`;
  }

  // always delete the current page
  currentUrlSearchParams.delete(PAGE_PARAM);

  const newSearchParamsStr = currentUrlSearchParams.toString();

  console.log(
    "newPath, currentUrlSearchParams",
    newPath,
    currentUrlSearchParams,
  );

  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";
  return `${newPath}${query}`;
}

export function getUrlToNextOrPreviousPage(
  pathname: string | null,
  searchParams: ReadonlyURLSearchParams | SearchParams | Map<string, string>,
  nextPage: boolean,
) {
  if (!pathname) {
    throw new Error("Expected pathname to not be null");
  }
  const searchParamsList: string[][] = getSearchParamsList(searchParams);

  const currentUrlSearchParams = new URLSearchParams(searchParamsList);

  const currentPageValueStr = currentUrlSearchParams.get(PAGE_PARAM);
  const currentPageValue = parsePageParam(currentPageValueStr);

  let newPageValue;
  if (nextPage) {
    newPageValue = currentPageValue + 1;
  } else {
    if (currentPageValue > 0) {
      newPageValue = currentPageValue - 1;
    } else {
      throw new Error("Cannot get previous page when current page is 0");
    }
  }

  if (newPageValue > 0) {
    currentUrlSearchParams.set(PAGE_PARAM, (newPageValue + 1).toString());
  } else {
    currentUrlSearchParams.delete(PAGE_PARAM);
  }

  const newSearchParamsStr = currentUrlSearchParams.toString();

  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";
  return `${pathname}${query}`;
}
