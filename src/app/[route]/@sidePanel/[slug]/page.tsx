'use client';

import {
  CATEGORIES,
  CATEGORY_DESCRIPTION_MAP,
  CategoryNotNull,
  getIconPath,
  getServicesWrapper,
  LocationDetailData,
  YourPeerLegacyScheduleData,
  YourPeerLegacyServiceData,
  YourPeerLegacyServiceDataWrapper,
} from "../../../common";
import { fetchLocationsDetailData, map_gogetta_to_yourpeer } from "../../streetlives-api-service";
import customStreetViews from "./custom-streetviews";
import Service from "./service-component";

const moment = require('moment-strftime');

const GOOGLE_MAPS_API_KEY = (
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
).toString();

const CATEGORY_ICON_SRC_MAP: Record<CategoryNotNull, string> = {
  "health-care": "health-icon",
  other: "dots-con",
  "shelters-housing": "home-icon",
  food: "food-icon",
  clothing: "clothing-icon",
  "personal-care": "personal-care-icon",
};

function formatWebsiteUrl(url: string): string | undefined {
  if (url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "https://" + url;
    }
  }
  return url;
}

function LocationService({
  serviceInfo,
  name,
  icon,
}: {
  serviceInfo: YourPeerLegacyServiceDataWrapper;
  name: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-lg">
      <div className="px-3 py-3 flex items-center space-x-2 border-b border-gray-200">
        <img
          src={getIconPath(icon)}
          className="flex-shrink-0 max-h-6 w-6 h-6"
          alt=""
        />
        <h3 className="text-dark text-lg font-medium leading-3">{name}</h3>
      </div>
      <div className="flex flex-col divide-y divide-gray-200">
        {serviceInfo.services.map((service) => (
          <Service key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

export default async function LocationDetail({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const location = map_gogetta_to_yourpeer(
    await fetchLocationsDetailData(slug),
    true
  );
  const streetview =
    customStreetViews[slug] || `${location.lat},${location.lng}`;

  return (
    <div id="locationDetailsContainer">
      <div className="px-4 pb-4 shadow">
        <h1
          className="text-dark text-lg sm:text-xl font-medium mt-3"
          x-text="$store.currentLocation.name"
          translate="no"
          id="location_name"
        >
          {location.name}
        </h1>

        <div className="mt-1">
          <p
            className="text-xs text-gray-500 mb-1"
            translate="no"
            x-text="$store.currentLocation.location_name"
          >
            {location.location_name}
          </p>
          <p className="flex items-center gap-x-1 text-xs text-gray-500">
            <span translate="no" className="truncate">
              {location.area}
            </span>
            <span>•</span>
            <span className="text-green truncate">✓</span>
            <span className="text-green truncate">
              <span>
                Validated <span> {location.last_updated} </span>
              </span>
            </span>
          </p>
        </div>
      </div>
      {location.closed ? undefined : (
        <div>
          <div className="w-full max-h-72 h-72 bg-neutral-100 overflow-hidden relative hidden md:block">
            <img
              src={`https://maps.googleapis.com/maps/api/streetview?size=600x500&key=${GOOGLE_MAPS_API_KEY}&fov=100&location=${streetview}`}
              className="w-full h-full object-cover object-center cursor-pointer"
              loading="lazy"
            />
            <a
              href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=&viewpoint=${streetview}`}
              target="_blank"
              className="inline-block absolute bottom-4 right-4 z-0 bg-white shadow-sm rounded-full px-5 py-2 text-dark font-medium text-sm"
            >
              View Street View
            </a>
          </div>
        </div>
      )}
      <div className="px-4 mt-5 pb-4 bg-white">
        {location.closed ? (
          <div className="mb-3">
            <div className="flex space-x-1.5">
              <span className="text-danger">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>

              <div>
                <p className="text-dark mb-0.5 font-medium text-sm">Closed</p>
                {location.info?.map((info) => (
                  <p key={info} className="text-dark font-normal text-sm">
                    {info}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : undefined}
        <ul className="flex flex-col space-y-4">
          <li className="flex space-x-3">
            <img
              src="/img/icons/location.svg"
              className="flex-shrink-0 w-5 h-5 max-h-5"
              alt=""
            />
            <p className="text-dark text-sm ml-2">
              <span translate="no">{location.address}</span> <br />
              <span translate="no">{location.city}</span>,{" "}
              <span translate="no">{location.zip}</span> <br />
              {location.closed ? (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${location.address},${location.city},${location.zip}`}
                  target="_blank"
                  className="text-blue underline hover:no-underline"
                >
                  Get directions
                </a>
              ) : undefined}
            </p>
          </li>
          {!location.closed ? (
            <>
              {location.phone ? (
                <li translate="no" className="flex space-x-3">
                  <img
                    src="/img/icons/phone.svg"
                    className="flex-shrink-0 w-5 h-5 max-h-5"
                    alt=""
                  />
                  <p className="text-dark text-sm ml-2">
                    <a
                      href={`tel:${location.phone}`}
                      className="text-blue underline hover:no-underline"
                    >
                      {" "}
                      {location.phone}{" "}
                    </a>
                  </p>
                </li>
              ) : undefined}
              {location.email ? (
                <li translate="no" className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-dark w-5 h-5 max-h-5 flex-shrink-0"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                  <p className="text-dark text-sm ml-2">
                    <a
                      href={`mailto:${location.email}`}
                      className="text-blue underline hover:no-underline"
                    >
                      {location.email}
                    </a>
                  </p>
                </li>
              ) : undefined}
              {location.url ? (
                <li translate="no" class="flex space-x-3">
                  <img
                    src="/img/icons/cursor.svg"
                    className="flex-shrink-0 w-5 h-5 max-h-5"
                    alt=""
                  />
                  <p className="text-dark text-sm ml-2">
                    <a
                      href={formatWebsiteUrl(location.url)}
                      target="_blank"
                      className="text-blue underline hover:no-underline cursor-pointer"
                    >
                      {formatWebsiteUrl(location.url)}
                    </a>
                  </p>
                </li>
              ) : undefined}
            </>
          ) : undefined}
        </ul>
        <div className="mt-5 flex gap-4">
          <a
            href={`mailto:yourpeer@streetlives.nyc?subject=Feedback on YourPeer Location ${location.name}`}
            className="text-xs flex-1 flex items-center justify-center py-1 px-5 space-x-2 text-dark transition hover:text-black hover:border-black border border-gray-300 rounded-3xl bg-neutral-50"
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
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <span>Leave feedback</span>
          </a>
          <a
            href="#"
            id="reportIssueButton"
            className="text-xs flex-1 flex items-center justify-center py-1 px-5 space-x-2 text-dark transition hover:text-black hover:border-black border border-gray-300 rounded-3xl bg-neutral-50"
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
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <span>Report Issue</span>
          </a>
        </div>
      </div>
      {!location.closed ? (
        <div className="px-4 py-5 bg-neutral-50 flex flex-col gap-y-4">
          {CATEGORIES.map((serviceCategory) => {
            const servicesWrapper = getServicesWrapper(
              serviceCategory,
              location
            );
            return servicesWrapper?.services.length ? (
              <LocationService
                serviceInfo={servicesWrapper}
                name={CATEGORY_DESCRIPTION_MAP[serviceCategory]}
                icon={CATEGORY_ICON_SRC_MAP[serviceCategory]}
              />
            ) : undefined;
          })}
        </div>
      ) : undefined}
    </div>
  );
}