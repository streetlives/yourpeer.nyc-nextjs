"use client";

import { useEffect } from "react";
import {
  COOKIE_NAME,
  RouteParams,
  SearchParams,
  SubRouteParams,
} from "./common";

export default function CookieWrapper({
  params,
  searchParams,
}: {
  params: RouteParams | SubRouteParams;
  searchParams: SearchParams;
}) {
  useEffect(() => {
    document.cookie = `${COOKIE_NAME} = ${JSON.stringify({
      params,
      searchParams,
    })}`;
  }, [params, searchParams]);
  return <></>;
}
