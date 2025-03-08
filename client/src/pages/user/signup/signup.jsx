import { Footer } from "../../../components/landing/footer";
import { LandingNavbar } from "../../../components/ui/landingNavbar/landingNavbar";
import { SignUpForm } from "../../../components/user/signupForm/signupForm";

export const Signup = () => {
  return (
    <div>
      <LandingNavbar />
      <SignUpForm />
      <Footer />
    </div>
  );
};
