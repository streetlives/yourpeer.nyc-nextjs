'use client';

import { useState } from "react";
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

const moment = require('moment-strftime');

function renderSchedule(schedule: YourPeerLegacyScheduleData): string {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]

  function day_number_to_name(weekday: number): string{
    return weekdays[weekday - 1]
  }

  function format_hour(time:string): string{
    if(time === '23:59:00' || time === '00:00:00'){
      return "midnight"
    } 
    return moment(time, "hh:mm:ss").strftime("%-I %p")
  }

  function format_hours(opens: string, closes: string): string {
    return `${format_hour(opens)} to ${format_hour(closes)}`;
  }

  if (
    Object.keys(schedule).length === 7 &&
    Object.values(schedule).length === 7 &&
    Object.values(schedule)
      .flatMap((s) => s)
      .every(
        (schedule) =>
          schedule.opens_at === "00:00:00" && schedule.closes_at === "23:59:00"
      )
  ) {
    return "Open 24/7"
  }
  
  // hour range string -> list of weekdays
  const days_grouped_by_hours: Record<string, number[]> = {}
  Object.entries(schedule).forEach(([weekday, hours]) => {
    hours.forEach(hour => {
      const formattedHours = format_hours(
        hour.opens_at,
        hour.closes_at
      )
      if(!days_grouped_by_hours[formattedHours]){
        days_grouped_by_hours[formattedHours] = []
      }
      days_grouped_by_hours[formattedHours].push(parseInt(weekday, 10));
    })
  })

  const group_strings: string[] = Object.entries(days_grouped_by_hours).map(
    ([k, v]) =>
      `${v.map((weekday) => day_number_to_name(weekday)).join(" & ")}, ${k}`
  );

  return `Open ${group_strings.join(";")}`;
}

export default function Service({ service }: { service: YourPeerLegacyServiceData }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  console.log('isExpanded', isExpanded)
  const hasSomethingToShow =
    service.description || service.info || service.docs || service.schedule;

  function toggleIsExpanded(){
    setIsExpanded(!isExpanded);
  }
  return (
    <div
      key={service.id}
      className="flex items-start pl-3 pr-6 pt-2 pb-4 overflow-hidden relative"
    >
      {hasSomethingToShow && !service.closed ? (
        <button className="flex-shrink-0 collapseButton absolute left-3 top-2">
          <img
            src="/img/icons/arrow-down.svg"
            className="arrow w-7 h-7 object-contain max-h-7 transition -rotate-90"
            alt=""
          />
          <span className="absolute bg-transparent inset-y-0 left-0 -right-[500px]"></span>
        </button>
      ) : undefined}
      <div className="flex-1 pl-7">
        <h2
          className="text-dark text-base font-medium mt-0.5 cursor-pointer collapseButton relative"
          id="collapsible"
          onClick={toggleIsExpanded}
        >
          <span> {service.name} </span>
          {service.closed ? (
            <span className="text-danger">(Suspended)</span>
          ) : undefined}
        </h2>
        {hasSomethingToShow && isExpanded ? (
          <div className="collapseContent overflow-hidden">
            <div
              className={
                !service.closed || service.info || service.description
                  ? "py-2"
                  : undefined
              }
            >
              {!service.closed ? (
                <div>
                  <>
                    {service.description ? (
                      <p className="text-sm text-dark mb-4 have-links">
                        <ul>
                          {service.description.split("•").map((bullet) => (
                            <li key="bullet">{bullet}</li>
                          ))}
                        </ul>
                      </p>
                    ) : undefined}
                    <ul className="flex flex-col space-y-3">
                      {service.name ? (
                        <li className="flex items-start space-x-2">
                          <span className="text-success">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                          <p className="text-dark text-sm">
                            {renderSchedule(service.schedule)}
                          </p>
                        </li>
                      ) : undefined}
                    </ul>
                  </>
                </div>
              ) : undefined}
            </div>
          </div>
        ) : undefined}
      </div>
    </div>
  );
}