import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import classNames from "classnames";
import {
  CLOTHING_PARAM_CASUAL_VALUE,
  CLOTHING_PARAM,
  CLOTHING_PARAM_PROFESSIONAL_VALUE,
  REQUIREMENT_PARAM,
  parseRequirementParam,
  REQUIREMENT_PARAM_NO_REQUIREMENTS_VALUE,
  REQUIREMENT_PARAM_REFERRAL_LETTER_VALUE,
  REQUIREMENT_PARAM_REGISTERED_CLIENT_VALUE,
  AMENITIES_PARAM,
  AmenitiesSubCategory,
  AMENITIES_PARAM_LAUNDRY_VALUE,
  AMENITIES_PARAM_TOILETRIES_VALUE,
  getParsedAmenities,
  PERSONAL_CARE_CATEGORY,
  PersonalCareValue,
  AMENITIES_PARAM_RESTROOM_VALUE,
  AMENITIES_PARAM_SHOWER_VALUE,
  parsePathnameToCategoryAndSubCategory,
} from "../common";
import {
  getUrlWithNewFilterParameter,
  getUrlWithNewPersonalCareServiceSubCategoryAndFilterParameterAddedOrRemoved,
  getUrlWithNewRequirementTypeFilterParameterAddedOrRemoved,
  getUrlWithoutFilterParameter,
} from "../navigation";
import { ChangeEvent } from "react";
import { RequirementFieldset } from "./requirements-fieldset";

// TODO: route should get a type enum
export default function FilterPersonalCare() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() || new Map();
  if (!pathname) {
    throw new Error("Expected pathname to not be null");
  }
  const personalCareParam = searchParams.get(PERSONAL_CARE_CATEGORY);
  const [category, amenitiesSubCategory] =
    parsePathnameToCategoryAndSubCategory(pathname);
  const parsedAmenities = getParsedAmenities(
    amenitiesSubCategory,
    personalCareParam,
  );

  function handleToiletriesChange(e: ChangeEvent) {
    router.push(
      getUrlWithNewPersonalCareServiceSubCategoryAndFilterParameterAddedOrRemoved(
        pathname,
        searchParams,
        AMENITIES_PARAM_TOILETRIES_VALUE,
        (e.target as HTMLFormElement).checked,
      ),
    );
  }

  function handleRestroomsChange(e: ChangeEvent) {
    router.push(
      getUrlWithNewPersonalCareServiceSubCategoryAndFilterParameterAddedOrRemoved(
        pathname,
        searchParams,
        AMENITIES_PARAM_RESTROOM_VALUE,
        (e.target as HTMLFormElement).checked,
      ),
    );
  }

  function handleShowerChange(e: ChangeEvent) {
    router.push(
      getUrlWithNewPersonalCareServiceSubCategoryAndFilterParameterAddedOrRemoved(
        pathname,
        searchParams,
        AMENITIES_PARAM_SHOWER_VALUE,
        (e.target as HTMLFormElement).checked,
      ),
    );
  }

  function handleLaundryChange(e: ChangeEvent) {
    router.push(
      getUrlWithNewPersonalCareServiceSubCategoryAndFilterParameterAddedOrRemoved(
        pathname,
        searchParams,
        AMENITIES_PARAM_LAUNDRY_VALUE,
        (e.target as HTMLFormElement).checked,
      ),
    );
  }

  function PersonalCareLabel({
    amenitiesSubCategory,
    onChange,
    label,
    subLabel,
  }: {
    amenitiesSubCategory: AmenitiesSubCategory;
    onChange: (e: ChangeEvent) => void;
    label: string;
    subLabel?: string;
  }) {
    return (
      <label className="relative flex-1 flex space-x-2 cursor-pointer">
        <input
          type="checkbox"
          className="w-5 h-5 text-primary !border-dark !border ring-dark focus:ring-dark"
          checked={parsedAmenities.includes(amenitiesSubCategory)}
          onChange={onChange}
        />
        <span className="text-xs text-dark mt-0.5">{label}</span>
        {subLabel ? <p className="text-gray-600">{subLabel}</p> : undefined}
      </label>
    );
  }

  return (
    <>
      <fieldset className="mt-6">
        <legend className="text-xs font-semibold leading-6 text-dark">
          Amenities
        </legend>
        <div className="mt-2 flex w-full flex-col space-y-4 ml-1">
          <PersonalCareLabel
            amenitiesSubCategory={AMENITIES_PARAM_TOILETRIES_VALUE}
            label="Toiletries"
            onChange={handleToiletriesChange}
          />
          <PersonalCareLabel
            amenitiesSubCategory={AMENITIES_PARAM_RESTROOM_VALUE}
            label="Restrooms"
            onChange={handleRestroomsChange}
          />
          <PersonalCareLabel
            amenitiesSubCategory={AMENITIES_PARAM_SHOWER_VALUE}
            label="Shower"
            onChange={handleShowerChange}
          />
          <PersonalCareLabel
            amenitiesSubCategory={AMENITIES_PARAM_LAUNDRY_VALUE}
            label="Laundry"
            onChange={handleLaundryChange}
          />
        </div>
      </fieldset>
      <RequirementFieldset />
    </>
  );
}
