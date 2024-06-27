import type { Metadata } from 'next'
import { Footer } from './footer';
import Link from 'next/link';
 
export const metadata: Metadata = {
  title: "New York City Services & Resources For Unhoused People | YourPeer",
  description:
    "Find housing, food pantries, clothing assistance, personal care resources, healthcare services, and more resources for unhoused people in NYC verified by the community with YourPeer.",
};
 
export default function HomePage() {
  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-10 transition-colors"
        id="header"
      >
        <nav className="flex items-center justify-between px-5 py-5 h-16 max-w-5xl mx-auto w-full">
          <div className="flex items-center space-x-3">
            <button
              className="hover:cursor-pointer text-gray-900 hover:text-gray-600 hover:brightness-125 inline-block transition"
              id="offCanvasMenuButton"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <a href="/" translate="no" className="text-[15px]">
              <span className="text-black font-extrabold ">YourPeer</span>NYC
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <div className="gtranslate_wrapper"></div>
            <button
              className="inline-flex items-center text-[13px] sm:text-xs font-medium text-black space-x-1"
              id="quickExitLink"
            >
              <span className="inline-block">Quick Exit</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M10.79 16.29C11.18 16.68 11.81 16.68 12.2 16.29L15.79 12.7C16.18 12.31 16.18 11.68 15.79 11.29L12.2 7.7C11.81 7.31 11.18 7.31 10.79 7.7C10.4 8.09 10.4 8.72 10.79 9.11L12.67 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13H12.67L10.79 14.88C10.4 15.27 10.41 15.91 10.79 16.29ZM19 3H5C3.89 3 3 3.9 3 5V8C3 8.55 3.45 9 4 9C4.55 9 5 8.55 5 8V6C5 5.45 5.45 5 6 5H18C18.55 5 19 5.45 19 6V18C19 18.55 18.55 19 18 19H6C5.45 19 5 18.55 5 18V16C5 15.45 4.55 15 4 15C3.45 15 3 15.45 3 16V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
                  fill="#212121"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

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

      <footer className="bg-black px-5 py-8">
        <Footer />
      </footer>
    </>
  );
}
