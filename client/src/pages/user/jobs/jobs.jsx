import { Footer } from "../../../components/landing/footer";
import { CompanyJobs } from "../../../components/user/jobs/jobs";
import { LandingNavbar } from "../../../components/ui/landingNavbar/landingNavbar";
import { useUserLoggedin } from "../../../hooks/useLoggedIn";
import { UserNavbar } from "../../../components/user/navbar/userNavbar";
import { useState } from "react";
import { UserViewJobDetails } from "../../../components/user/jobs/userViewJobDetails";

export const Jobs = () => {
  const isLoggedIn = useUserLoggedin();
  const [jobId, setJobId] = useState("");
  const clickOnJob = (id) => {
    setJobId(id);
  };
  console.log((jobId,"data"));
  
  return (
    <div>
      {isLoggedIn ? <UserNavbar /> : <LandingNavbar />}
      {jobId ? (
        <UserViewJobDetails jobId={jobId} />
      ) : (
        <CompanyJobs clickOnJob={clickOnJob} />
      )}
      <Footer />
    </div>
  );
};
