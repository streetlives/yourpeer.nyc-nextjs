import { cookies } from "next/headers";
import {
  LAST_SET_PARAMS_COOKIE_NAME,
  RouteParams,
  SearchParams,
  SubRouteParams,
} from "./common";

export interface PreviousParams {
  searchParams: SearchParams;
  params: RouteParams | SubRouteParams;
}

export function usePreviousParams(): PreviousParams | null {
  const cookie = cookies().get(LAST_SET_PARAMS_COOKIE_NAME);
  console.log("cookie", cookie);
  if (cookie && cookie.value) {
    return JSON.parse(cookie.value) as unknown as PreviousParams;
  } else {
    return null;
  }
}
