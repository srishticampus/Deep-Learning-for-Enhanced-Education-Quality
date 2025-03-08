import { Footer } from "../../landing/footer";
import { UserNavbar } from "../navbar/userNavbar";
import { ProfileData } from "./profileData";

export const UserProfile = () => {
  return (
    <div>
      <UserNavbar />
      <div className="tw-min-h-96 tw-flex tw-items-center">
        <ProfileData />
      </div>
      <Footer />
    </div>
  );
};
