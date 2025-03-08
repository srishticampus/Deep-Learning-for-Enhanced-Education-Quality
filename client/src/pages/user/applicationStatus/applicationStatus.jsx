import { Applications } from "../../../components/user/applicationStatus/applicationStatus";
import { Footer } from "../../../components/landing/footer";
import { UserNavbar } from "../../../components/user/navbar/userNavbar";
export const ApplicationStatus = () => {
  return (
    <div>
      <UserNavbar />
      <Applications />
      <Footer />
    </div>
  );
};
