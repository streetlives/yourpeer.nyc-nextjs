import Link from "next/link";
import { TranslatableText } from "./translatable-text";

export default function QuickExitLink() {
  return (
    <Link
      href="https://www.google.com"
      id="quickExitLink"
      className="md:hidden flex-shrink-0 inline-flex ml-auto items-center text-[10px] sm:text-xs uppercase font-medium text-black space-x-1 truncate"
    >
      <span className="inline-block">
        <TranslatableText text="Quick Exit" />
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 flex-shrink-0"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  );
}
