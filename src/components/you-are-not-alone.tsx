import Link from "next/link";
import { TranslatableText } from "./translatable-text";
import { LOCATION_ROUTE } from "./common";

export function YouAreNotAlone(){
  return (
    <section className="py-12 bg-neutral-50">
      <div className="px-5 max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <img
            src="/img/icons/unity-icon.svg"
            className="w-28 mx-auto object-contain mb-10"
            alt=""
          />
          <h2 className="text-4xl text-dark mb-10 text-center font-light">
            <TranslatableText text="You’re not alone in this journey" />
          </h2>
          <p className="text-center text-gray-800 text-sm px-2 mb-5">
            <TranslatableText text="People rely on social services for many reasons. Our information specialists all have lived experiences navigating the support system and apply their knowledge collecting the information you find here.  We’re building YourPeer so it's easier for you to find the right service." />
          </p>
          <div>
            <Link href={`/${LOCATION_ROUTE}`} className="primary-button">
              <TranslatableText text="Explore services" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}