import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import classNames from "classnames";
import { SHELTER_PARAM, SHELTER_PARAM_SINGLE_VALUE, SHELTER_PARAM_FAMILY_VALUE, ShelterValues } from "../categories";

function getNewUrlWithShelterParam(
  shelterType: ShelterValues | null,
  pathname: string,
  searchParams: ReadonlyURLSearchParams
) {
  const currentUrlSearchParams = new URLSearchParams(
    Array.from(searchParams.entries())
  );

  if (shelterType) {
    currentUrlSearchParams.set(SHELTER_PARAM, shelterType);
  } else {
    currentUrlSearchParams.delete(SHELTER_PARAM);
  }

  const newSearchParamsStr = currentUrlSearchParams.toString();

  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";
  return `${pathname}${query}`;
}

export default function FilterHousing() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shelterParam = searchParams.get(SHELTER_PARAM);
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
    router.push(getNewUrlWithShelterParam(null, pathname, searchParams));
  }

  function handleIsSingleAdultClick() {
    router.push(getNewUrlWithShelterParam(SHELTER_PARAM_SINGLE_VALUE, pathname, searchParams));
  }

  function handleIsFamiliesClick() {
    router.push(getNewUrlWithShelterParam(SHELTER_PARAM_FAMILY_VALUE, pathname, searchParams));
  }

  return (
    <fieldset className="mt-6">
      <legend className="text-xs font-semibold leading-6 text-dark">
        Shelter & Housing type
      </legend>
      <div className="mt-2 flex w-full">
        <label
          className={classNames.call(
            null,
            commonClasses
              .concat("rounded-l-lg")
              .concat(!shelterParam ? selectedClasses : notSelectedClasses)
          )}
        >
          <input
            type="radio"
            id="filter_shelter_type_any"
            name="accommodation-type"
            value={!shelterParam ? "true" : undefined}
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
              shelterParam == SHELTER_PARAM_SINGLE_VALUE
                ? selectedClasses
                : notSelectedClasses
            )
          )}
        >
          <input
            type="radio"
            id="filter_shelter_type_single_adult"
            name="accom"
            value={
              shelterParam == SHELTER_PARAM_SINGLE_VALUE ? "true" : undefined
            }
            className="sr-only"
            aria-labelledby="accommodationType-0-label"
            aria-describedby="accommodationType-0-description-0 accommodationType-0-description-1"
            onClick={handleIsSingleAdultClick}
          />
          Single Adult
        </label>
        <label
          className={classNames.call(
            null,
            commonClasses
              .concat("rounded-r-lg")
              .concat(
                shelterParam == SHELTER_PARAM_FAMILY_VALUE
                  ? selectedClasses
                  : notSelectedClasses
              )
          )}
        >
          <input
            type="radio"
            id="filter_shelter_type_families"
            name="accommodationType"
            value={
              shelterParam == SHELTER_PARAM_FAMILY_VALUE ? "true" : undefined
            }
            className="sr-only"
            aria-labelledby="accommodationType-0-label"
            aria-describedby="accommodationType-0-description-0 accommodationType-0-description-1"
            onClick={handleIsFamiliesClick}
          />
          Families
        </label>
      </div>
    </fieldset>
  );
}

