import { ReadonlyURLSearchParams } from "next/navigation";
import { CATEGORY_SPECIFIC_FILTERS_MAP, CATEGORY_TO_ROUTE_MAP, CategoryNotNull, FILTERS_THAT_APPLY_TO_ALL_CATEGORIES, LOCATION_ROUTE, parseRequirementParam, REQUIREMENT_PARAM, REQUIREMENT_PARAM_CANONICAL_ORDERING, RequirementValue, SearchParams, UrlParamName } from "./common";

// Change category
export function getUrlWithNewCategory(
  newCategory: CategoryNotNull,
  searchParams: ReadonlyURLSearchParams
): string {
  const currentUrlSearchParams = new URLSearchParams(
    Array.from(
      searchParams
        .entries()
    ).filter(
      ([k, v]) =>
        CATEGORY_SPECIFIC_FILTERS_MAP[newCategory].includes(k) ||
        FILTERS_THAT_APPLY_TO_ALL_CATEGORIES.includes(k)
    )
  );

  const newSearchParamsStr = currentUrlSearchParams.toString();
  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";
  return `/${CATEGORY_TO_ROUTE_MAP[newCategory]}${query}`;
}

function getSearchParamsList(
  searchParams: ReadonlyURLSearchParams | SearchParams
):string[][]{
    return searchParams instanceof ReadonlyURLSearchParams
        ? Array.from(searchParams.entries())
        : Object.entries(searchParams)
            .filter(([k, v]) => v !== undefined)
            .flatMap(([k, v]) =>
                Array.isArray(v) ? v.map((w) => [k, w]) : [[k, v]]
            ) as string[][];
}

// Add filter parameter
export function getUrlWithNewFilterParameter(
  pathname: string,
  searchParams: ReadonlyURLSearchParams | SearchParams,
  urlParamName: UrlParamName,
  urlParamValue: string = 'yes'
): string {

  const searchParamsList: string[][] = getSearchParamsList(searchParams)

  const currentUrlSearchParams = new URLSearchParams(searchParamsList);

  currentUrlSearchParams.set(urlParamName, urlParamValue);

  const newSearchParamsStr = currentUrlSearchParams.toString();

  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";
  return `${pathname}${query}`;
}

export function getUrlWithoutFilterParameter(
  pathname: string,
  searchParams: ReadonlyURLSearchParams | SearchParams,
  urlParamName: UrlParamName,
): string {

  const searchParamsList: string[][] = getSearchParamsList(searchParams)

  const currentUrlSearchParams = new URLSearchParams(searchParamsList);

  currentUrlSearchParams.delete(urlParamName);

  const newSearchParamsStr = currentUrlSearchParams.toString();

  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";
  return `${pathname}${query}`;
}

// Clear all filter parameters
export function getUrlWithoutFilterParameters(): string {
    return `/${LOCATION_ROUTE}`
}

export function getUrlWithNewRequirementTypeFilterParameterAddedOrRemoved(
  pathname: string,
  searchParams: ReadonlyURLSearchParams | SearchParams,
  newRequirementTypeToAddOrRemove: RequirementValue,
  addRequirementType: boolean
): string {
  const searchParamsList: string[][] = getSearchParamsList(searchParams);

  const currentUrlSearchParams = new URLSearchParams(searchParamsList);

  const currentRequirementValue = currentUrlSearchParams.get(REQUIREMENT_PARAM);

  const parsedRequirements: RequirementValue[] = parseRequirementParam(
    currentRequirementValue
  );

  const newParsedRequirements = addRequirementType
    ? !parsedRequirements.includes(newRequirementTypeToAddOrRemove)
      ? parsedRequirements
          .concat(newRequirementTypeToAddOrRemove)
          .sort(
            (a, b) =>
              REQUIREMENT_PARAM_CANONICAL_ORDERING.indexOf(a) -
              REQUIREMENT_PARAM_CANONICAL_ORDERING.indexOf(b)
          )
      : parsedRequirements
    : parsedRequirements.filter(
        (requirement) => requirement !== newRequirementTypeToAddOrRemove
      );

  if(newParsedRequirements.length){
    const serializedNewParsedRequirements = newParsedRequirements.join(" ");

    currentUrlSearchParams.set(
      REQUIREMENT_PARAM,
      serializedNewParsedRequirements
    );
  }else{
    currentUrlSearchParams.delete(REQUIREMENT_PARAM);
  }

  const newSearchParamsStr = currentUrlSearchParams.toString();

  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";
  return `${pathname}${query}`;
}
