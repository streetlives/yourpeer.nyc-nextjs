// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

"use client";

import { ChangeEvent } from "react";
import {
  parseRequirementParam,
  REQUIREMENT_PARAM,
  REQUIREMENT_PARAM_NO_REQUIREMENTS_VALUE,
  REQUIREMENT_PARAM_REFERRAL_LETTER_VALUE,
  REQUIREMENT_PARAM_REGISTERED_CLIENT_VALUE,
} from "../common";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getUrlWithNewRequirementTypeFilterParameterAddedOrRemoved } from "../navigation";

export function RequirementFieldset() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() || new Map();

  const parsedRequirementParam = parseRequirementParam(
    searchParams.get(REQUIREMENT_PARAM),
  );

  function handleNoRequirementsChange(e: ChangeEvent) {
    router.push(
      getUrlWithNewRequirementTypeFilterParameterAddedOrRemoved(
        pathname,
        searchParams,
        REQUIREMENT_PARAM_NO_REQUIREMENTS_VALUE,
        (e.target as HTMLFormElement).checked,
      ),
    );
  }

  function handleReferralLetterChange(e: ChangeEvent) {
    router.push(
      getUrlWithNewRequirementTypeFilterParameterAddedOrRemoved(
        pathname,
        searchParams,
        REQUIREMENT_PARAM_REFERRAL_LETTER_VALUE,
        (e.target as HTMLFormElement).checked,
      ),
    );
  }

  function handleRegisteredClientChange(e: ChangeEvent) {
    router.push(
      getUrlWithNewRequirementTypeFilterParameterAddedOrRemoved(
        pathname,
        searchParams,
        REQUIREMENT_PARAM_REGISTERED_CLIENT_VALUE,
        (e.target as HTMLFormElement).checked,
      ),
    );
  }

  return (
    <fieldset className="mt-6">
      <legend className="text-xs font-semibold leading-6 text-dark">
        Requirement type
      </legend>
      <div className="mt-2 flex w-full flex-col space-y-4 ml-1">
        <label className="relative flex-1 flex space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="requirementType"
            aria-labelledby="requirementType-0-label"
            aria-describedby="requirementType-0-description-0 requirementType-0-description-1"
            className="w-5 h-5 text-primary !border-dark !border ring-dark focus:ring-dark"
            checked={parsedRequirementParam.includes(
              REQUIREMENT_PARAM_NO_REQUIREMENTS_VALUE,
            )}
            onChange={handleNoRequirementsChange}
          />
          <span className="text-xs text-dark mt-0.5">No requirements</span>
        </label>
        <label className="relative flex-1 flex space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="requirementType"
            aria-labelledby="requirementType-0-label"
            aria-describedby="requirementType-0-description-0 requirementType-0-description-1"
            className="w-5 h-5 text-primary !border-dark !border ring-dark focus:ring-dark"
            checked={parsedRequirementParam.includes(
              REQUIREMENT_PARAM_REFERRAL_LETTER_VALUE,
            )}
            onChange={handleReferralLetterChange}
          />
          <div className="text-xs text-dark mt-0.5">
            <div>Referral letter</div>
            <p className="text-gray-600">
              You must bring a letter from another service provider stating that
              you require this service.
            </p>
          </div>
        </label>
        <label className="relative flex-1 flex space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="requirementType"
            aria-labelledby="requirementType-0-label"
            aria-describedby="requirementType-0-description-0 requirementType-0-description-1"
            className="w-5 h-5 text-primary !border-dark !border ring-dark focus:ring-dark"
            checked={parsedRequirementParam.includes(
              REQUIREMENT_PARAM_REGISTERED_CLIENT_VALUE,
            )}
            onChange={handleRegisteredClientChange}
          />
          <div className="text-xs text-dark mt-0.5">
            <div>Registered client only</div>
            <p className="text-gray-600">
              You must be a registered client of their organization to access
              their services.
            </p>
          </div>
        </label>
      </div>
    </fieldset>
  );
}
