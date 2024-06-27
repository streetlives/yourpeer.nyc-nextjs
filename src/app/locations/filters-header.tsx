import { CATEGORIES, Category, CATEGORY_DESCRIPTION_MAP, CATEGORY_ICON_SRC_MAP, CATEGORY_TO_ROUTE_MAP, getIconPath, LOCATION_ROUTE, SearchParams, SHOW_ADVANCED_FILTERS_PARAM } from "../categories"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";

function getUrlWithFilterPopup(
  currentCategory: Category,
  searchParams: SearchParams
): string {
  const searchParamsList: string[][] = [];
  Object.entries(searchParams).forEach(([k, v]) => {
    if(v){
      if (Array.isArray(v)) {
        v.forEach((w) => {
          searchParamsList.push([k, w]);
        });
      } else {
        searchParamsList.push([k, v]);
      }
    }
  })
  const currentUrlSearchParams = new URLSearchParams(searchParamsList);

  currentUrlSearchParams.set(SHOW_ADVANCED_FILTERS_PARAM, 'yes');

  const newSearchParamsStr = currentUrlSearchParams.toString();
  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";

  return `/${
    currentCategory === null
      ? LOCATION_ROUTE
      : CATEGORY_TO_ROUTE_MAP[currentCategory]
  }${query}`;
}

export default function FiltersHeader({
  category: currentCategory,
  searchParams,
}: {
  category: Category;
  searchParams: SearchParams;
}) {
  const commonClassNames = [
    "inline-flex",
    "flex-shrink-0",
    "overflow-hidden",
    "items-center",
    "space-x-2",
    "text-dark",
    "rounded-full",
    "text-xs",
    "py-1",
    "px-3",
    "transition",
    "location_filter",
  ];
  return (
    <div className="sticky top-0 w-full inset-x-0 bg-white z-10">
      <h1 className="flex gap-2 py-3 px-4  flex-nowrap lg:flex-wrap items-center overflow-x-auto border-b border-dotted border-neutral-200 scrollbar-hide">
        {CATEGORIES.filter(
          (thisCategory) =>
            currentCategory === thisCategory || currentCategory === null
        ).map((thisCategory) => (
          <Link
            key={thisCategory}
            className={classNames(
              commonClassNames,
              currentCategory === thisCategory
                ? { "bg-primary": true }
                : { "bg-neutral-100": true }
            )}
            href={
              currentCategory === thisCategory
                ? LOCATION_ROUTE
                : CATEGORY_TO_ROUTE_MAP[thisCategory]
            }
          >
            <img
              src={getIconPath(CATEGORY_ICON_SRC_MAP[thisCategory])}
              className="w-4 h-4"
              alt=""
            />
            <span className="leading-3 truncate">
              {CATEGORY_DESCRIPTION_MAP[thisCategory]}
            </span>
          </Link>
        ))}

        <Link
          className="inline-flex flex-shrink-0 overflow-hidden items-center space-x-2 text-dark bg-gray-300 rounded-full text-xs py-1 px-3"
          href={getUrlWithFilterPopup(currentCategory, searchParams)}
        >
          <img src="/img/icons/filters.svg" className="w-4 h-4" alt="" />
          <span className="leading-3 truncate">All Filters</span>
        </Link>
      </h1>
    </div>
  );
}