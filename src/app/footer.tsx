import Link from "next/link";
import { CATEGORY_TO_ROUTE_MAP, LOCATION_ROUTE } from "./common";

export function Footer() {
  return (
    <footer className="bg-black px-5 py-8">
      <div className="mx-auto max-w-5xl px-5 flex flex-col pt-11">
        <div>
          <div className="lg:flex">
            <div className="lg:flex-1">
              <h3 className="text-white font-semibold mb-5 text-left">
                Company
              </h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-5 ">
                <div>
                  <Link
                    href="/about-us"
                    className="text-gray-300 text-base font-normal"
                  >
                    About
                  </Link>
                </div>
                <div>
                  <Link
                    href="/terms-of-use"
                    className="text-gray-300 text-base font-normal"
                  >
                    Terms
                  </Link>
                </div>
                <div>
                  <Link
                    href="/contact-us"
                    className="text-gray-300 text-base font-normal"
                  >
                    Contact
                  </Link>
                </div>
                <div>
                  <Link
                    href="/privacy-policy"
                    className="text-gray-300 text-base font-normal"
                  >
                    Privacy
                  </Link>
                </div>
                <div>
                  <Link
                    href="/donate"
                    className="text-gray-300 text-base font-normal"
                  >
                    Donate
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:flex-1 mt-8 lg:mt-0">
              <h3 className="text-white font-semibold mb-5 text-left">
                Resources
              </h3>
              <div className="flex gap-x-5">
                <div className="flex flex-col gap-y-2 flex-1">
                  <div>
                    <Link
                      href={`/${LOCATION_ROUTE}`}
                      className="text-gray-300 text-base font-normal"
                    >
                      All locations
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={`/${CATEGORY_TO_ROUTE_MAP["shelters-housing"]}`}
                      className="text-gray-300 text-base font-normal"
                    >
                      Shelter & Housing
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={`/${CATEGORY_TO_ROUTE_MAP["food"]}`}
                      className="text-gray-300 text-base font-normal"
                    >
                      Food
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={`/${CATEGORY_TO_ROUTE_MAP["clothing"]}`}
                      className="text-gray-300 text-base font-normal"
                    >
                      Clothing
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 flex-1">
                  <div>
                    <Link
                      href={`/${CATEGORY_TO_ROUTE_MAP["personal-care"]}`}
                      className="text-gray-300 text-base font-normal"
                    >
                      Personal Care
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={`/${CATEGORY_TO_ROUTE_MAP["personal-care"]}`}
                      className="text-gray-300 text-base font-normal"
                    >
                      Health Care
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={`/${CATEGORY_TO_ROUTE_MAP["other"]}`}
                      className="text-gray-300 text-base font-normal"
                    >
                      Other Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <h3 className="text-white font-semibold mb-5 text-left">
                Social
              </h3>
              <div className="flex gap-x-5">
                <div className="flex flex-col gap-y-2 flex-1">
                  <div>
                    <Link
                      href="https://www.tiktok.com/@YourPeer.NYC"
                      target="_blank"
                      className="text-gray-300 text-base font-normal"
                    >
                      Tiktok
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="https://www.instagram.com/YourPeer.NYC"
                      target="_blank"
                      className="text-gray-300 text-base font-normal"
                    >
                      Instagram
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="https://www.facebook.com/yourpeer.nyc"
                      target="_blank"
                      className="text-gray-300 text-base font-normal"
                    >
                      Facebook
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-14 pb-4">
            <p className="text-center text-gray-200">
              &copy; Streetlives, Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
