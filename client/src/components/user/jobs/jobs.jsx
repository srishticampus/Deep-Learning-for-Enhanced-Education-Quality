import React, { useEffect, useState } from "react";
import { JobCard } from "../../landing/jobCard";
import { axiosInstance } from "../../../apis/axiosInstance";

export const CompanyJobs = ({ clickOnJob }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const res = await axiosInstance.get(`jobs/`);
      if (res.status === 200) {
        const data = res.data || [];
        setJobs(data.reverse());
      }
    } catch (error) {
      console.log("Error ON GET USER DATA", error);
      return false;
    }
  };

  return (
    <section className="tw-py-16 tw-px-4 tw-bg-lexiBlue-100 tw-min-h-screen">
      <div className="tw-text-center tw-mb-16 tw-bg-#f3f8ff">
        <h2 className="tw-text-4xl tw-font-bold text-[#3B4B7C] tw-mb-4">
          Job Vacancies!
        </h2>
      </div>
      <div className="tw-max-w-7xl tw-mx-auto">
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} clickOnJob={clickOnJob} />
          ))}
        </div>
      </div>
    </section>
  );
};
