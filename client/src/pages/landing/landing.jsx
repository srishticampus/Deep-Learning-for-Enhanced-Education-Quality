import React, { useEffect } from "react";
import { LandingNavbar } from "../../components/ui/landingNavbar/landingNavbar";
import { LandingHeader } from "../../components/landing/header";
import { HowItWorks } from "../../components/landing/howItWorks";
import { ExploreOpportunities } from "../../components/landing/explore";
import { CallToAction } from "../../components/landing/callToAction";
import { Footer } from "../../components/landing/footer";
import { UserNavbar } from "../../components/user/navbar/userNavbar";
import { useUserLoggedin } from "../../hooks/useLoggedIn";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const isLoggedIn = useUserLoggedin();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/user/home/')
    }
  }, [isLoggedIn])
    
  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-blue-50 tw-to-white">
      <LandingNavbar />
      <LandingHeader />
      <HowItWorks />
      <ExploreOpportunities />
      <CallToAction />
      <Footer />
    </div>
  );
};
export default Landing;
