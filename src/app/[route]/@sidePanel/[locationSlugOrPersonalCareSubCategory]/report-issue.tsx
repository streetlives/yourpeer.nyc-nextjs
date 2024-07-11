import { CATEGORIES, getServicesWrapper, LocationDetailData, YourPeerLegacyLocationData } from "@/app/common";

export function ReportCompletedView(){
    return (
      <div
        id="reportCompletedView"
        className="flex items-center flex-col justify-center w-2/3 mx-auto mt-10"
      >
        <div className="text-center text-dark font-medium text-base mb-2">
          Thank you so much!
        </div>
        <p className="text-sm tex-dark font-normal mb-4 text-center">
          You're helping everyone to get more reliable information and making it
          easier for people to get the help they need.
        </p>
        <div className="flex justify-center">
          <button className="primary-button">
            <span>Done</span>
          </button>
        </div>
      </div>
    );
}

export function ReportIssueForm({location}:{location:YourPeerLegacyLocationData}){
  return (
    <div className="w-full h-auto flex flex-col bg-white" id="reportContainer">
      <div className="px-5">
        <div id="reportView">
          <div id="stepOne">
            <div className="text-lg font-medium">
              Which parts of the information have an issue?
            </div>
            <div className="flex flex-col mt-4">
              <label className="relative flex-1 flex space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="issuePart"
                  value="Information about the location"
                  className="w-5 h-5 text-primary !border-dark !border ring-dark focus:ring-dark issue"
                />
                <span className="text-xs text-dark mt-0.5">
                  Information about the location
                </span>
              </label>
              {CATEGORIES.filter((serviceCategory) => {
                const servicesWrapper = getServicesWrapper(
                  serviceCategory,
                  location
                );
                return servicesWrapper.services.length;
              }).map((serviceCategory) => {
                const servicesWrapper = getServicesWrapper(
                  serviceCategory,
                  location
                );
                return (
                  <div>
                    {servicesWrapper.services.map((service) => (
                      <label
                        className="relative flex-1 flex space-x-2 cursor-pointer mt-3"
                        key={service.id}
                      >
                        <input
                          type="checkbox"
                          name="issuePart"
                          className="w-5 h-5 text-primary !border-dark !border ring-dark focus:ring-dark issue"
                        />
                        <span className="text-xs text-dark mt-0.5">
                          {" "}
                          {service.name}{" "}
                        </span>
                      </label>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
          <div id="StepTwo" className="mt-8">
            <label
              htmlFor="reportContent"
              className="text-base text-dark font-medium"
            >
              Please describe the issue below (Please don't enter any private
              information)
            </label>
            <div className="mt-4">
              <textarea
                id="reportContent"
                className="w-full focus:ring-primary resize-none border-neutral-500 rounded"
                rows={6}
                placeholder="..."
              ></textarea>
            </div>
          </div>
          <div className="py-5">
            <button
              className="primary-button mt-5 w-full block"
              id="reportActionButton"
              onClick={() => {}}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}