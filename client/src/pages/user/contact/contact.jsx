import { Footer } from "../../../components/landing/footer";
import { LandingNavbar } from "../../../components/ui/landingNavbar/landingNavbar";
import { ContactForm } from "../../../components/user/contact/contactForm";
import { ContactHeader } from "../../../components/user/contact/contactHeader";
import { UserNavbar } from "../../../components/user/navbar/userNavbar";
import { useUserLoggedin } from "../../../hooks/useLoggedIn";
import { UserHome } from "../home/userHome";

export const Contact = () => {
  const isLoggedIn = useUserLoggedin();
  return (
    <div>
      {isLoggedIn ? <UserNavbar /> : <LandingNavbar />}

      <ContactHeader />
      <ContactForm />
      <Footer />
    </div>
  );
};
