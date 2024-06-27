export function Footer() {
  return (
    <div className="mx-auto max-w-5xl px-5 flex flex-col pt-11">
      <div>
        <div className="lg:flex">
          <div className="lg:flex-1">
            <h3 className="text-white font-semibold mb-5 text-left">Company</h3>
            <div className="grid grid-cols-2 gap-y-2 gap-x-5 ">
              <div>
                <a
                  href="{% url 'about-us' %}"
                  className="text-gray-300 text-base font-normal"
                >
                  About
                </a>
              </div>
              <div>
                <a
                  href="{% url 'terms-of-use' %}"
                  className="text-gray-300 text-base font-normal"
                >
                  Terms
                </a>
              </div>
              <div>
                <a
                  href="{% url 'contact-us' %}"
                  className="text-gray-300 text-base font-normal"
                >
                  Contact
                </a>
              </div>
              <div>
                <a
                  href="{% url 'privacy-policy' %}"
                  className="text-gray-300 text-base font-normal"
                >
                  Privacy
                </a>
              </div>
              <div>
                <a
                  href="{% url 'donate' %}"
                  className="text-gray-300 text-base font-normal"
                >
                  Donate
                </a>
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
                  <a
                    href="{% url 'map' %}"
                    className="text-gray-300 text-base font-normal"
                  >
                    All locations
                  </a>
                </div>
                <div>
                  <a
                    href="{% url 'shelters-housing' %}"
                    className="text-gray-300 text-base font-normal"
                  >
                    Shelter & Housing
                  </a>
                </div>
                <div>
                  <a
                    href="{% url 'food' %}"
                    className="text-gray-300 text-base font-normal"
                  >
                    Food
                  </a>
                </div>
                <div>
                  <a
                    href="{% url 'clothing' %}"
                    className="text-gray-300 text-base font-normal"
                  >
                    Clothing
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 flex-1">
                <div>
                  <a
                    href="{% url 'personal-care' %}"
                    className="text-gray-300 text-base font-normal"
                  >
                    Personal Care
                  </a>
                </div>
                <div>
                  <a
                    href="{% url 'health' %}"
                    className="text-gray-300 text-base font-normal"
                  >
                    Health Care
                  </a>
                </div>
                <div>
                  <a
                    href="{% url 'other-services' %}"
                    className="text-gray-300 text-base font-normal"
                  >
                    Other Services
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <h3 className="text-white font-semibold mb-5 text-left">Social</h3>
            <div className="flex gap-x-5">
              <div className="flex flex-col gap-y-2 flex-1">
                <div>
                  <a
                    href="https://www.tiktok.com/@YourPeer.NYC"
                    target="_blank"
                    className="text-gray-300 text-base font-normal"
                  >
                    Tiktok
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.instagram.com/YourPeer.NYC"
                    target="_blank"
                    className="text-gray-300 text-base font-normal"
                  >
                    Instagram
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.facebook.com/yourpeer.nyc"
                    target="_blank"
                    className="text-gray-300 text-base font-normal"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-14 pb-4">
          <p className="text-center text-gray-200">&copy; Streetlives, Inc.</p>
        </div>
      </div>
    </div>
  );
}
