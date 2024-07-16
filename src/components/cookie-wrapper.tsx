"use client";

import { useEffect } from "react";
import {
  LAST_SET_PARAMS_COOKIE_NAME,
  RouteParams,
  SearchParams,
  SubRouteParams,
} from "./common";
import { setCookie } from "./cookies";

export default function CookieWrapper({
  params,
  searchParams,
}: {
  params: RouteParams | SubRouteParams;
  searchParams: SearchParams;
}) {
  useEffect(() => {
    setCookie(
      LAST_SET_PARAMS_COOKIE_NAME,
      JSON.stringify({
        params,
        searchParams,
      }),
    );
  }, [params, searchParams]);
  return <></>;
}
