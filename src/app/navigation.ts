import { ReadonlyURLSearchParams } from "next/navigation";
import { CATEGORY_TO_ROUTE_MAP, CategoryNotNull, LOCATION_ROUTE, UrlParamName } from "./common";

// Change category
export function getUrlWithNewCategory(
  newCategory: CategoryNotNull,
  searchParams: ReadonlyURLSearchParams
): string {
  const currentUrlSearchParams = new URLSearchParams(
    Array.from(searchParams.entries())
  );
  const newSearchParamsStr = currentUrlSearchParams.toString();
  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";
  return `/${CATEGORY_TO_ROUTE_MAP[newCategory]}${query}`;
}

// Add filter parameter
export function getUrlWithNewFilterParameter(
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  urlParamName: UrlParamName,
  urlParamValue: string = 'yes'
): string {
  const currentUrlSearchParams = new URLSearchParams(
    Array.from(searchParams.entries())
  );

  currentUrlSearchParams.set(urlParamName, urlParamValue);

  const newSearchParamsStr = currentUrlSearchParams.toString();

  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";
  return `${pathname}${query}`;
}

export function getUrlWithoutFilterParameter(
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  urlParamName: UrlParamName,
): string {
  const currentUrlSearchParams = new URLSearchParams(
    Array.from(searchParams.entries())
  );

  currentUrlSearchParams.delete(urlParamName);

  const newSearchParamsStr = currentUrlSearchParams.toString();

  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";
  return `${pathname}${query}`;
}


// Clear all filter parameters
export function getUrlWithoutFilterParameters(): string {
    return `/${LOCATION_ROUTE}`
}