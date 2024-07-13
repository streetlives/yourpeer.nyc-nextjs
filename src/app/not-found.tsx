// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

import Link from "next/link";
import { LocationsNavbarCompanyRoutes } from "./[route]/locations-navbar";
import { Footer } from "./footer";
import { CATEGORY_TO_ROUTE_MAP, LOCATION_ROUTE } from "./common";

export default function CustomNotFoundPage() {
  return (
    <>
      <LocationsNavbarCompanyRoutes />
      <section className="bg-white flex-1 py-12 lg:py-20">
        <div className="px-5 max-w-lg mx-auto">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-black text-2xl md:text-4xl font-medium mb-6 text-center">
              Oops!
            </h1>
            <p className="text-dark text-center mb-6">
              We can’t seem to find the page you are looking for. Try these
              links instead:
            </p>
            <div className="flex flex-col justify-center items-center space-y-2">
              <Link href="/" className="text-blue hover:underline transition">
                Home
              </Link>
              <Link
                href={`/${LOCATION_ROUTE}`}
                className="text-blue hover:underline transition"
              >
                All locations
              </Link>
              <Link
                href={`/${CATEGORY_TO_ROUTE_MAP["shelters-housing"]}`}
                className="text-blue hover:underline transition"
              >
                Shelter & Housing
              </Link>
              <Link
                href={`/${CATEGORY_TO_ROUTE_MAP["food"]}`}
                className="text-blue hover:underline transition"
              >
                Food
              </Link>
              <Link
                href={`/${CATEGORY_TO_ROUTE_MAP["clothing"]}`}
                className="text-blue hover:underline transition"
              >
                Clothing
              </Link>
              <Link
                href={`/${CATEGORY_TO_ROUTE_MAP["personal-care"]}`}
                className="text-blue hover:underline transition"
              >
                Personal Care
              </Link>
              <Link
                href={`/${CATEGORY_TO_ROUTE_MAP["health-care"]}`}
                className="text-blue hover:underline transition"
              >
                Health
              </Link>
              <Link
                href={`/${CATEGORY_TO_ROUTE_MAP["other"]}`}
                className="text-blue hover:underline transition"
              >
                Other Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
