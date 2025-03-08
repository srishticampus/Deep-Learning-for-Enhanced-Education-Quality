import { Footer } from "../../../components/landing/footer";
import { LandingNavbar } from "../../../components/ui/landingNavbar/landingNavbar";
import { SigninForm } from "../../../components/admin/signInForm/signinForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {  LEXI_ISADMIN_LOGGED_IN } from "../../../constants/constants";

export const AdminSignIn = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem(LEXI_ISADMIN_LOGGED_IN) || null;
    
    if (isAdminLoggedIn) {
      navigate("/admin");
    }
  }, [])
  return (
    <div>
      <LandingNavbar />
      <SigninForm />
      <Footer />
    </div>
  );
};
