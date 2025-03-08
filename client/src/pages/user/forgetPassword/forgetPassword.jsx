import { Footer } from "../../../components/landing/footer";
import { LandingNavbar } from "../../../components/ui/landingNavbar/landingNavbar";
import { ForgetPasswordForm } from "../../../components/user/forgetPassword/forgetPasswordForm";
import { SigninForm } from "../../../components/user/signInForm/signinForm";

export const ForgetPassword = () => {
  return (
    <div>
      <LandingNavbar />
      <ForgetPasswordForm />
      <Footer />
    </div>
  );
};
