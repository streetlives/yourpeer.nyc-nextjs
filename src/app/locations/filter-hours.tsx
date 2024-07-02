import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import classNames from "classnames";
import { OPEN_PARAM } from "../common";

function getNewUrlWithOpenParam(
  isOpen: boolean,
  pathname: string,
  searchParams: ReadonlyURLSearchParams
) {
  const currentUrlSearchParams = new URLSearchParams(
    Array.from(searchParams.entries())
  );

  if (isOpen) {
    currentUrlSearchParams.set(OPEN_PARAM, "yes");
  } else {
    currentUrlSearchParams.delete(OPEN_PARAM);
  }

  const newSearchParamsStr = currentUrlSearchParams.toString();

  const query = newSearchParamsStr ? `?${newSearchParamsStr}` : "";
  return `${pathname}${query}`;
}

export default function FilterHours() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isOpenNow = !!searchParams.get(OPEN_PARAM);
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
  ];
  const selectedClasses = ["bg-primary", "border-black"];
  const notSelectedClasses = [
    "bg-white",
    "border-gray-300",
  ];

  function handleIsOpenNowClick() {
    router.push(getNewUrlWithOpenParam(true, pathname, searchParams));
  }

  function handleIsNotOpenNowClick() {
    router.push(getNewUrlWithOpenParam(false, pathname, searchParams));
  }

  return (
    <fieldset className="mt-6" id="filter_hours">
      <legend className="text-xs font-semibold leading-6 text-dark">
        Opening hours
      </legend>
      <div className="mt-2 flex w-full">
        <label
          className={classNames.call(
            null,
            commonClasses
              .concat("rounded-l-lg")
              .concat(isOpenNow ? notSelectedClasses : selectedClasses)
          )}
        >
          <input
            type="radio"
            id="filter_not_open_now"
            name="not_open_now"
            value={!isOpenNow ? "true" : undefined}
            className="sr-only"
            aria-labelledby="openingHours-0-label"
            aria-describedby="openingHours-0-description-0 openingHours-0-description-1"
            onClick={handleIsNotOpenNowClick}
          />
          Any
        </label>
        <label
          className={classNames.call(
            null,
            commonClasses
              .concat("rounded-r-lg")
              .concat(isOpenNow ? selectedClasses : notSelectedClasses)
          )}
        >
          <input
            id="filter_open_now"
            type="radio"
            name="open_now"
            value={isOpenNow ? "true" : undefined}
            className="sr-only"
            aria-labelledby="openingHours-0-label"
            aria-describedby="openingHours-0-description-0 openingHours-0-description-1"
            onClick={handleIsOpenNowClick}
          />
          Open now
        </label>
      </div>
    </fieldset>
  );
}
