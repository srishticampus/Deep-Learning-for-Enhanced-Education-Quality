import { useEffect } from "react";
import { Footer } from "../../../components/landing/footer";
import { LandingNavbar } from "../../../components/ui/landingNavbar/landingNavbar";
import { AboutContent } from "../../../components/user/about/aboutContent";
import { AboutHeader } from "../../../components/user/about/aboutHeader";
import { WhyChooseUs } from "../../../components/user/about/whyChooseUs";
import { UserNavbar } from "../../../components/user/navbar/userNavbar";
import { useUserLoggedin } from "../../../hooks/useLoggedIn";

export const About = () => {
  const isLoggedIn = useUserLoggedin();

  return (
    <div>
      {isLoggedIn ? <UserNavbar /> : <LandingNavbar />}

      <AboutHeader />
      <AboutContent />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};
