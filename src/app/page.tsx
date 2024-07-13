// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

import type { Metadata } from "next";
import { Footer } from "./footer";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "New York City Services & Resources For Unhoused People | YourPeer",
  description:
    "Find housing, food pantries, clothing assistance, personal care resources, healthcare services, and more resources for unhoused people in NYC verified by the community with YourPeer.",
};

export default function HomePage() {
  return (
    <>
      <Navbar background={false} />

      <div
        className="w-full flex flex-col bg-center pt-16 bg-cover bg-no-repeat bg-amber-300"
        style={{ backgroundImage: "url(/img/home-banner.png)" }}
      >
        <div className="pt-8 pb-12 sm:pt-20 lg:pt-40 sm:pb-36 px-8 sm:px-12 flex flex-col justify-center items-center md:flex-1 max-w-2xl mx-auto">
          <h1
            className="customTranslation text-grey-900 font-extrabold text-3xl md:text-5xl text-center lg:leading-tight"
            data-text="Free support services validated by your peers"
          >
            Free support services validated by your peers
          </h1>
          <p className="text-base text-grey-900 text-center my-5 sm:my-6 font-semibold">
            Search through 2400+ free support services across NYC
          </p>
          <div className="w-full max-w-sm mx-auto flex justify-center">
            <Link href="/locations" className="primary-button ">
              Explore services
            </Link>
          </div>
        </div>
      </div>

      <section
        className="max-w-5xl mx-auto w-full px-4 lg:-mt-8 -mt-4 mb-8 "
        id="servicesList"
      >
        <ul
          className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 "
          style={{ gridAutoRows: "1fr" }}
        >
          <li>
            <Link
              href="/shelters-housing"
              className="flex h-24 sm:h-28 items-center justify-center flex-col px-5 py-4 lg:py-5 rounded sm:px-8 bg-white hover:bg-gray-100 transition shadow-service w-full"
            >
              <img
                src="/img/icons/services/house.svg"
                width="37"
                height="36"
                className="object-contain flex-shrink-0"
                alt=""
              />
              <div className="text-[13px] text-dark mt-2 font-semibold">
                Shelter & Housing
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/food"
              className="flex h-24 sm:h-28 items-center justify-center flex-col px-5 py-4 lg:py-5 rounded sm:px-8 bg-white hover:bg-gray-100 transition shadow-service w-full"
            >
              <img
                src="/img/icons/services/food.svg"
                width="37"
                height="36"
                className="object-contain flex-shrink-0"
                alt=""
              />
              <div className="text-[13px] text-dark mt-2 font-semibold">
                Food
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/clothing"
              className="flex h-24 sm:h-28 items-center justify-center flex-col px-5 py-4 lg:py-5 rounded sm:px-8 bg-white hover:bg-gray-100 transition shadow-service w-full"
            >
              <img
                src="/img/icons/services/clothing.svg"
                width="37"
                height="36"
                className="object-contain flex-shrink-0"
                alt=""
              />
              <div className="text-[13px] text-dark mt-2 font-semibold">
                Clothing
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/personal-care"
              className="flex h-24 sm:h-28 items-center justify-center flex-col px-5 py-4 lg:py-5 rounded sm:px-8 bg-white hover:bg-gray-100 transition shadow-service w-full"
            >
              <img
                src="/img/icons/services/pesonal-care.svg"
                width="37"
                height="36"
                className="object-contain flex-shrink-0"
                alt=""
              />
              <div className="text-[13px] text-dark mt-2 font-semibold">
                Personal care
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/health-care"
              className="flex h-24 sm:h-28 items-center justify-center flex-col px-5 py-4 lg:py-5 rounded sm:px-8 bg-white hover:bg-gray-100 transition shadow-service w-full"
            >
              <img
                src="/img/icons/services/health.svg"
                width="37"
                height="36"
                className="object-contain flex-shrink-0"
                alt=""
              />
              <div className="text-[13px] text-dark mt-2 font-semibold">
                Health
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/other-services"
              className="flex h-24 sm:h-28 items-center justify-center flex-col px-5 py-4 lg:py-5 rounded sm:px-8 bg-white hover:bg-gray-100 transition shadow-service w-full"
            >
              <img
                src="/img/icons/services/other.svg"
                width="37"
                height="36"
                className="object-contain flex-shrink-0"
                alt=""
              />
              <div className="text-[13px] text-dark mt-2 font-semibold">
                Other
              </div>
            </Link>
          </li>
        </ul>
      </section>

      <section
        id="Testimonial"
        className="max-w-5xl mx-auto w-full px-5 py-12 lg:py-16"
      >
        <ul className="w-full flex flex-col lg:flex-row gap-10">
          <li className="lg:flex-1">
            <figure className="px-6">
              <div className="flex items-center justify-center">
                <img
                  src="/img/avatar-n-1.jpg"
                  className="w-20 h-20 rounded-full object-cover object-center border-4 border-pink-200"
                  alt=""
                />
              </div>
              <blockquote className="mt-6 mb-3">
                <p className="text-gray-900 font-semibold text-xl text-center">
                  YourPeer offers hope
                </p>
              </blockquote>

              <figcaption
                className="text-base text-grey-700 text-center"
                translate="no"
              >
                Timantti
              </figcaption>
            </figure>
          </li>
          <li className="lg:flex-1">
            <figure className="px-6">
              <div className="flex items-center justify-center">
                <img
                  src="/img/avatar-3.png"
                  className="w-20 h-20 rounded-full object-cover object-center border-4 border-[#B3E5FC]"
                  alt=""
                />
              </div>
              <blockquote className="mt-6 mb-3">
                <p className="text-gray-900 font-semibold text-xl text-center">
                  Usually if I need something, I ask. But this is faster,
                  easier, better.
                </p>
              </blockquote>

              <figcaption
                className="text-base text-grey-700 text-center"
                translate="no"
              >
                Kenia
              </figcaption>
            </figure>
          </li>
          <li className="lg:flex-1">
            <figure className="px-6">
              <div className="flex items-center justify-center">
                <img
                  src="/img/avatar-1.jpg"
                  className="w-20 h-20 rounded-full object-cover object-center border-4 border-[#A5D6A7]"
                  alt=""
                />
              </div>
              <blockquote className="mt-6 mb-3">
                <p className="text-gray-900 font-semibold text-xl text-center">
                  I know this information is good. It’s from people like me.
                </p>
              </blockquote>

              <figcaption
                className="text-base text-grey-700 text-center"
                translate="no"
              >
                Jeffrey
              </figcaption>
            </figure>
          </li>
        </ul>
      </section>

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-center text-3xl text-gray-700 font-bold mb-9">
            Our Partners
          </h2>
          <div className="w-full  flex flex-wrap justify-center items-center">
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-1.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-2.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-3.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-4.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-5.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-6.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-7.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-8.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-9.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-10.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-11.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-12.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-13.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-14.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-15.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-16.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-17.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-18.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-19.png"
              alt="Logo"
            />
            <img
              className="object-cover object-center w-24 sm:w-36 h-24 sm:h-36 flex-shrink-0"
              src="/img/partnars-logo/logo-20.png"
              alt="Logo"
            />
          </div>

          <p className="text-sm text-gray-800 text-center mb-6 px-5 mt-8 md:mt-16">
            Food service information provided with the help of Hunter College
            NYC Food Policy Center.
          </p>

          <p className="text-sm text-gray-800 text-center mb-6 px-5">
            For more information, visit
            <a
              href="https://www.nycfoodpolicy.org/food/"
              className="text-blue-700 underline hover:no-underline"
            >
              https://www.nycfoodpolicy.org/food/
            </a>
          </p>
        </div>
      </section>

      <section className="py-12 bg-neutral-50">
        <div className="px-5 max-w-3xl mx-auto">
          <div className="flex flex-col items-center justify-center">
            <img
              src="/img/icons/unity-icon.svg"
              className="w-28 mx-auto object-contain mb-10"
              alt=""
            />
            <h2 className="text-3xl text-dark mb-8 text-center font-bold">
              You’re not alone in this journey
            </h2>
            <p className="text-center text-gray-800 text-sm px-2 mb-5">
              People rely on social services for many reasons. We’re building
              YourPeer so it&apos;s easier for you to find the right service.
            </p>
            <div>
              <Link href="/locations" className="primary-button">
                {" "}
                Explore services{" "}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
