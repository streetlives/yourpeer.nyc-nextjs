// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Link from "next/link";

interface OffCanvasMenuProps {
  open: boolean;
  onClose: () => void;
}

const OffCanvasMenu = ({ open, onClose }: OffCanvasMenuProps) => {
  const [nestedNav, setNestedNav] = useState(false);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full sm:pr-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen sm:max-w-xs transform transition duration-500 ease-in-out data-[closed]:-translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-auto bg-amber-300 pb-6 pt-4 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="items-start justify-start hidden sm:flex">
                    <div className="flex h-7 items-center">
                      <button
                        type="button"
                        className="text-gray-900"
                        onClick={() => {
                          if (nestedNav) setNestedNav(false);
                          else onClose();
                        }}
                      >
                        <span className="sr-only">Close panel</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex sm:hidden relative items-center justify-between mx-auto w-full">
                    <div className="flex items-center space-x-2">
                      <button
                        className="hover:cursor-pointer text-gray-900 hover:text-gray-600 hover:brightness-125 inline-block transition"
                        onClick={onClose}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M19.0005 11H7.83047L12.7105 6.12C13.1005 5.73 13.1005 5.09 12.7105 4.7C12.3205 4.31 11.6905 4.31 11.3005 4.7L4.71047 11.29C4.32047 11.68 4.32047 12.31 4.71047 12.7L11.3005 19.29C11.6905 19.68 12.3205 19.68 12.7105 19.29C13.1005 18.9 13.1005 18.27 12.7105 17.88L7.83047 13H19.0005C19.5505 13 20.0005 12.55 20.0005 12C20.0005 11.45 19.5505 11 19.0005 11Z"
                            fill="#212121"
                          />
                        </svg>
                      </button>
                      <a href="/" translate="no" className="text-[15]">
                        <span className="text-black font-[900]">YourPeer</span>
                        NYC
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
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
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6 flex flex-col">
                  <div className="flex-1">
                    {nestedNav ? (
                      <div
                        className="pt-16 flex flex-col items-center sm:items-start space-y-6 bg-amber-300 absolute inset-x-0 px-6 inset-y-0"
                        id="servicesNav"
                      >
                        <Link
                          href="/locations"
                          className="text-xl text-dark hover:text-gray-800 transition"
                        >
                          All Services
                        </Link>
                        <Link
                          href={"/shelters-housing"}
                          className="text-xl text-dark hover:text-gray-800 transition inline-flex space-x-1 items-center"
                        >
                          Shelter & Housing
                        </Link>
                        <Link
                          href="/food"
                          className="text-xl text-dark hover:text-gray-800 transition"
                        >
                          Food
                        </Link>
                        <Link
                          href="/clothing"
                          className="text-xl text-dark hover:text-gray-800 transition"
                        >
                          Clothing
                        </Link>
                        <Link
                          href={"/personal-care"}
                          className="text-xl text-dark hover:text-gray-800 transition"
                        >
                          Personal Care
                        </Link>
                        <Link
                          href={"/health-care"}
                          className="text-xl text-dark hover:text-gray-800 transition"
                        >
                          Health Care
                        </Link>
                        <Link
                          href={"/other-services"}
                          className="text-xl text-dark hover:text-gray-800 transition"
                        >
                          Other Services
                        </Link>
                      </div>
                    ) : (
                      <div
                        className="pt-16 flex flex-col items-center sm:items-start space-y-6"
                        id="main_menu"
                      >
                        <Link
                          href="/"
                          className="customTranslation text-xl text-dark hover:text-gray-800 transition"
                          data-text="Home"
                        >
                          Home
                        </Link>
                        <button
                          className="text-xl text-dark hover:text-gray-800 transition inline-flex space-x-1 items-center"
                          id="exploreServiceButton"
                          onClick={() => setNestedNav(true)}
                        >
                          <span>Explore services</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M5 13H16.17L11.29 17.88C10.9 18.27 10.9 18.91 11.29 19.3C11.68 19.69 12.31 19.69 12.7 19.3L19.29 12.71C19.68 12.32 19.68 11.69 19.29 11.3L12.71 4.7C12.32 4.31 11.69 4.31 11.3 4.7C10.91 5.09 10.91 5.72 11.3 6.11L16.17 11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13Z"
                              fill="#212121"
                            />
                          </svg>
                        </button>
                        <Link
                          href={"/about-us"}
                          className="text-xl text-dark hover:text-gray-800 transition"
                        >
                          About
                        </Link>
                        <Link
                          href="/donate"
                          className="text-xl text-dark hover:text-gray-800 transition"
                        >
                          Donate
                        </Link>
                        <Link
                          href="/contact-us"
                          className="text-xl text-dark hover:text-gray-800 transition"
                        >
                          Contact Us
                        </Link>
                        <Link
                          href={"/privacy-policy"}
                          className="text-xl text-dark hover:text-gray-800 transition"
                        >
                          Privacy
                        </Link>
                        <Link
                          href={"/terms-of-use"}
                          className="text-xl text-dark hover:text-gray-800 transition"
                        >
                          Terms
                        </Link>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-center sm:justify-start space-x-4 py-10">
                      <a
                        href="https://www.tiktok.com/@YourPeer.NYC"
                        target="_blank"
                        className="text-white block flex-shrink-0"
                      >
                        <svg
                          fill="#000000"
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          //   xml:space="preserve"
                          stroke="#000000"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"></path>
                          </g>
                        </svg>
                      </a>
                      <a
                        href="https://www.instagram.com/YourPeer.NYC"
                        target="_blank"
                        className="text-white block flex-shrink-0"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#000000"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                              fill="#0F0F0F"
                            ></path>
                            <path
                              d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                              fill="#0F0F0F"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                              fill="#0F0F0F"
                            ></path>
                          </g>
                        </svg>
                      </a>
                      <a
                        href="https://www.facebook.com/yourpeer.nyc"
                        target="_blank"
                        className="text-white block flex-shrink-0"
                      >
                        <svg
                          fill="#000000"
                          viewBox="0 0 24 24"
                          className="w-7 h-7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"></path>{" "}
                          </g>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default OffCanvasMenu;
