"use client";

import { Category, CategoryNotNull, CATEGORY_TO_ROUTE_MAP, LOCATION_ROUTE, SHOW_ADVANCED_FILTERS_PARAM } from "../common";
import React, { ChangeEvent, useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import FilterHours from './filter-hours';
import { AGE_PARAM } from "../common";
import FilterHousing from "./filter-housing";
import { getUrlWithNewCategory, getUrlWithNewFilterParameter, getUrlWithoutFilterParameter } from "../navigation";
import FilterFood from "./filter-food";
import FilterClothing from "./filter-clothing";

function CategoryFilterLabel({
  labelCategory,
  currentCategory,
  imgSrc,
  activeImgSrc,
  labelText,
}: {
  labelCategory: CategoryNotNull;
  currentCategory: Category;
  imgSrc: string;
  activeImgSrc: string;
  labelText: string;
}) {
  const searchParams = useSearchParams();
  const isActive = labelCategory == currentCategory;
  const router = useRouter();

  function handleClick(){
    router.push(getUrlWithNewCategory(labelCategory, searchParams));
  }

  return (
    <label
      aria-labelledby="service-type-0-label"
      aria-describedby="service-type-0-description-0 service-type-0-description-1"
      className={classNames(
        "relative",
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "cursor-pointer",
        "border",
        "p-5",
        "focus:outline-none",
        "overflow-hidden",
        "rounded",
        isActive
          ? { "bg-primary": true, "border-black": true }
          : { "bg-white": true, "border-gray-300": true }
      )}
    >
      <input
        type="radio"
        className="sr-only"
        onClick={handleClick}
      />
      <img
        src={isActive ? activeImgSrc : imgSrc}
        className="max-h-8 w-8 h-8 object-contain"
        alt=""
      />
      <div className="text-center text-xs text-dark mt-3 truncate">
        {labelText}
      </div>
    </label>
  );
}

export default function FiltersPopup({
  category,
  numLocationResults,
}: {
  category: Category;
  numLocationResults: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [ageParam, setAgeParam] = useState<number>();

  useEffect(() => {
    if (searchParams.has(AGE_PARAM)) {
      const age = searchParams.get(AGE_PARAM);
      if (age) {
        setAgeParam(parseInt(age, 10));
      }
    }
  }, [searchParams]);

  function handleFilterFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (ageParam) {
      router.push(
        getUrlWithNewFilterParameter(
          pathname,
          searchParams,
          AGE_PARAM,
          ageParam.toString()
        )
      )
    }
  }

  function handleAgeInputBlur(e: React.FocusEvent<HTMLInputElement>) {
    router.push(
      getUrlWithNewFilterParameter(
        pathname,
        searchParams,
        AGE_PARAM,
        e.target.value
      )
    );
  }

  function handleAgeInputChange(e: ChangeEvent) {
    setAgeParam(parseInt((e.target as HTMLFormElement).value, 10));
  }

  return (
    <div
      id="filters_popup"
      className="bg-white fixed md:absolute inset-x-0 top-[49.6px] md:top-0 bottom-0 md:h-full z-40 flex flex-col md:overflow-hidden"
    >
      <div className="flex items-center p-4 justify-between">
        <div className="text-dark text-lg font-medium">Filters</div>
        <Link
          id="filters_popup_close_button"
          className="inline-block"
          href={getUrlWithoutFilterParameter(
            pathname,
            searchParams,
            SHOW_ADVANCED_FILTERS_PARAM
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>
      </div>
      <form
        className="flex-1 px-4 overflow-y-scroll scrollbar-hide py-5"
        id="filters_form"
        onSubmit={handleFilterFormSubmit}
      >
        <fieldset>
          <input
            type="hidden"
            name="is_advanced_filters"
            value=""
            id="is_advanced_filters"
          />
          <legend className="text-xs font-semibold leading-6 text-dark">
            Service type
          </legend>
          <div className="mt-2 grid gap-2 sm:gap-5 grid-cols-3">
            <CategoryFilterLabel
              currentCategory={category}
              labelCategory={"shelters-housing"}
              activeImgSrc="/img/icons/active-home-icon.svg"
              imgSrc="/img/icons/home-icon.svg"
              labelText="Shelter & Housing"
            />
            <CategoryFilterLabel
              currentCategory={category}
              labelCategory={"food"}
              activeImgSrc="/img/icons/active-food-icon.svg"
              imgSrc="/img/icons/food-icon-2.svg"
              labelText="Food"
            />
            <CategoryFilterLabel
              currentCategory={category}
              labelCategory={"clothing"}
              activeImgSrc="/img/icons/active-clothing-icon.svg"
              imgSrc="/img/icons/clothing-icon.svg"
              labelText="Clothing"
            />
            <CategoryFilterLabel
              currentCategory={category}
              labelCategory={"personal-care"}
              activeImgSrc="/img/icons/active-personal-care.svg"
              imgSrc="/img/icons/personal-care-2.svg"
              labelText="Personal Care"
            />
            <CategoryFilterLabel
              currentCategory={category}
              labelCategory={"health-care"}
              activeImgSrc="/img/icons/active-health-icon.svg"
              imgSrc="/img/icons/health-icon.svg"
              labelText="Health"
            />
            <CategoryFilterLabel
              currentCategory={category}
              labelCategory={"other"}
              activeImgSrc="/img/icons/active-dots-icon.svg"
              imgSrc="/img/icons/dots-icon.svg"
              labelText="Other"
            />
          </div>
        </fieldset>
        <fieldset className="mt-6">
          <legend className="text-xs font-semibold leading-6 text-dark">
            Age
          </legend>
          <div className="mt-2 flex w-full">
            <input
              type="number"
              style={{ width: "100%", borderRadius: ".25rem" }}
              id="age_filter"
              placeholder="Enter Age"
              min="0"
              max="120"
              aria-labelledby="age_filter-0-label"
              aria-describedby="age_filter-0-description-0"
              pattern="[0-9][0-9][0-9]"
              inputMode="numeric"
              value={ageParam ? ageParam.toString() : undefined}
              onBlur={handleAgeInputBlur}
              onChange={handleAgeInputChange}
            />
          </div>
        </fieldset>
        <FilterHours />
        {category === "shelters-housing" ? <FilterHousing /> : undefined}
        {category === "food" ? <FilterFood /> : undefined}
        {category === "clothing" ? <FilterClothing /> : undefined}
      </form>
      <div className="p-4 flex items-center gap-x-4">
        <Link
          className="outline-button block flex-1 flex-shrink-0"
          href={`/${LOCATION_ROUTE}`}
        >
          Clear all
        </Link>
        <Link
          href={getUrlWithoutFilterParameter(
            pathname,
            searchParams,
            SHOW_ADVANCED_FILTERS_PARAM
          )}
          className="primary-button flex-1 block flex-shrink-0 px-5 truncate"
        >
          show {numLocationResults} results
        </Link>
      </div>
    </div>
  );
}
