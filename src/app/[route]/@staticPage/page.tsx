import { CompanyRoute } from "@/app/common";
import { AboutUsPage } from "./about-us";
import { ContactUsPage } from "./contact-us";
import { DonationPage } from "./dontate";
import { TermsPage } from "./terms";
import { PrivacyPage } from "./privacy";

export default async function StaticPage({
  params: { route },
}: {
  params: { route: string };
}) {
    const companyRoute: CompanyRoute = route as CompanyRoute;
    switch(companyRoute){
        case "about-us":
            return <AboutUsPage />;
        case "contact-us":
            return <ContactUsPage />;
        case "donate":
            return <DonationPage />;
        case "terms-of-use":
            return <TermsPage />;
        case "privacy-policy":
            return <PrivacyPage />;
    }
}