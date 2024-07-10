"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { getUrlToNextOrPreviousPage } from "../navigation";

export function LocationsContainerPager({
  resultCount,
  numberOfPages,
  currentPage,
}: {
  resultCount: number;
  numberOfPages: number;
  currentPage: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams() || new Map();
  const hasPreviousPage = currentPage > 0;
  const hasNextPage = currentPage < numberOfPages;

  return (
    <div className="p-6 border-t border-neutral-100 mb-14 md:mb-0">
      <div className="flex items-center justify-between">
        <a
          className={`text-dark inline-flex space-x-1 disabled:text-muted ${
            !hasPreviousPage ? "text-muted cursor-not-allowed" : ""
          }`}
          href={
            hasPreviousPage
              ? getUrlToNextOrPreviousPage(pathname, searchParams, false)
              : undefined
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span>Previous</span>
        </a>
        <div className="text-dark font-medium">
          <span> {currentPage + 1} </span> of <span>{numberOfPages + 1}</span>
        </div>
        <a
          className={`inline-flex space-x-1 disabled:text-muted ${
            hasNextPage ? "text-dark" : "text-muted cursor-not-allowed"
          }`}
          href={
            hasNextPage
              ? getUrlToNextOrPreviousPage(pathname, searchParams, true)
              : undefined
          }
        >
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
