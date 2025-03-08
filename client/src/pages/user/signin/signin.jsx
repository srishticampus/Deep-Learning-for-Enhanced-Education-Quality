import { Footer } from "../../../components/landing/footer";
import { LandingNavbar } from "../../../components/ui/landingNavbar/landingNavbar";
import { SigninForm } from "../../../components/user/signInForm/signinForm";

export const SignIn = () => {
  return (
    <div>
      <LandingNavbar />
      <SigninForm />
      <Footer />
    </div>
  );
};
