export function DonationPage() {
  return (
    <section className="bg-white py-12 pt-28 lg:pt-32 lg:py-20 flex-1">
      <div className="px-5 max-w-xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-black text-2xl md:text-4xl font-medium mb-6 text-center">
            Donate
          </h1>
          <p className="text-dark text-center mb-6">
            Thank you for your interest in supporting us. We accept donations
            through our page on Open Collective.
          </p>
          <p className="text-dark text-center mb-6">
            Each $30 covers an hour&apos;s stipend for unhoused people or people
            with lived expertise to participate in Streetlives research or
            product testing.
          </p>
          <div className="">
            <a
              href="https://opencollective.com/streetlives"
              className="primary-button block w-full"
            >
              {" "}
              Donate Now{" "}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
