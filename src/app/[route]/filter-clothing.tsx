import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import classNames from "classnames";
import { CLOTHING_PARAM_CASUAL_VALUE, CLOTHING_PARAM, CLOTHING_PARAM_PROFESSIONAL_VALUE, REQUIREMENT_PARAM, parseRequirementParam, REQUIREMENT_PARAM_NO_REQUIREMENTS_VALUE, REQUIREMENT_PARAM_REFERRAL_LETTER_VALUE, REQUIREMENT_PARAM_REGISTERED_CLIENT_VALUE } from "../common";
import { getUrlWithNewFilterParameter, getUrlWithNewRequirementTypeFilterParameterAddedOrRemoved, getUrlWithoutFilterParameter } from "../navigation";
import { ChangeEvent } from "react";
import { RequirementFieldset } from "./requirements-fieldset";

export default function FilterClothing() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const clothingParam = searchParams.get(CLOTHING_PARAM);
  const commonClasses = [
    "text-xs",
    "relative",
    "flex-1",
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "cursor-pointer",
    "border",
    "py-2",
    "px-5",
    "focus:outline-none",
    "text-center",
  ];
  //rounded-l-lg
  //rounded-r-lg
  const selectedClasses = ["bg-primary", "border-black"];
  const notSelectedClasses = [
    "bg-white",
    "border-gray-300",
  ];

  function handleIsAnyClick() {
    router.push(
      getUrlWithoutFilterParameter(pathname, searchParams, CLOTHING_PARAM)
    );
  }

  function handleIsCasualClick() {
    router.push(
      getUrlWithNewFilterParameter(
        pathname,
        searchParams,
        CLOTHING_PARAM,
        CLOTHING_PARAM_CASUAL_VALUE
      )
    );
  }

  function handleIsProfessionalClick() {
    router.push(
      getUrlWithNewFilterParameter(
        pathname,
        searchParams,
        CLOTHING_PARAM,
        CLOTHING_PARAM_PROFESSIONAL_VALUE
      )
    );
  }

  return (
    <>
      <fieldset className="mt-6">
        <legend className="text-xs font-semibold leading-6 text-dark">
          Clothing type
        </legend>
        <div className="mt-2 flex w-full">
          <label
            className={classNames.call(
              null,
              commonClasses
                .concat("rounded-l-lg")
                .concat(!clothingParam ? selectedClasses : notSelectedClasses)
            )}
          >
            <input
              type="radio"
              id="filter_shelter_type_any"
              name="accommodation-type"
              value={!clothingParam ? "true" : undefined}
              className="sr-only"
              aria-labelledby="accommodationType-0-label"
              aria-describedby="accommodationType-0-description-0 accommodationType-0-description-1"
              onClick={handleIsAnyClick}
            />
            Any
          </label>
          <label
            className={classNames.call(
              null,
              commonClasses.concat(
                clothingParam == CLOTHING_PARAM_CASUAL_VALUE
                  ? selectedClasses
                  : notSelectedClasses
              )
            )}
          >
            <input
              type="radio"
              id="filter_clothing_casual"
              name="filter_clothing_casual"
              value={
                clothingParam == CLOTHING_PARAM_CASUAL_VALUE
                  ? "true"
                  : undefined
              }
              className="sr-only"
              onClick={handleIsCasualClick}
            />
            Casual
          </label>
          <label
            className={classNames.call(
              null,
              commonClasses
                .concat("rounded-r-lg")
                .concat(
                  clothingParam == CLOTHING_PARAM_PROFESSIONAL_VALUE
                    ? selectedClasses
                    : notSelectedClasses
                )
            )}
          >
            <input
              type="radio"
              id="filter_clothing_professional"
              name="filter_clothing_professional"
              value={
                clothingParam == CLOTHING_PARAM_PROFESSIONAL_VALUE
                  ? "true"
                  : undefined
              }
              className="sr-only"
              onClick={handleIsProfessionalClick}
            />
            Professional
          </label>
        </div>
      </fieldset>
      <RequirementFieldset />
    </>
  );
}

