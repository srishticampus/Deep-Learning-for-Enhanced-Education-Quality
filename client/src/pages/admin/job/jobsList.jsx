import React, { useEffect, useState } from "react";
import { JobCard } from "../../../components/admin/jobCard/jobCard";
import { Search } from "lucide-react";
import { axiosInstance } from "../../../apis/axiosInstance";

export const JobsList = ({ clickOnJob }) => {
  const [searchedItem, setSearchedItem] = useState("");
  const [jobs, setJobs] = useState([]);
  const [fixedJobs, setFixedJobs] = useState([]);

  const searching = (newValue) => {
    setSearchedItem(newValue);
  };
  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const res = await axiosInstance.get(`jobs/`);
      if (res.status === 200) {
        const data = res.data?.reverse() || [];
        setJobs(data);
        setFixedJobs(data);
      }
    } catch (error) {
      console.log("Error ON GET USER DATA", error);
      return false;
    }
  };
  useEffect(() => {
    if (searchedItem) {
      const filteredJobs = fixedJobs.filter((job) => {
        return job.job_title
          ?.toLowerCase()
          .includes(searchedItem.toLowerCase());
      });
      setJobs(filteredJobs);
    } else {
      setJobs(fixedJobs);
    }
  }, [searchedItem]);

  return (
    <section className="tw-py-16 tw-px-4 tw-bg-gradient-to-b from-[#F8FAFF] tw-to-white">
      <div className="tw-max-w-6xl tw-mx-auto">
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800">
            View Jobs
          </h1>
          <div className="tw-relative">
            <Search className="tw-w-5 tw-h-5 tw-text-gray-400 tw-absolute tw-left-3 tw-top-1/2 tw-transform -tw-translate-y-1/2" />
            <input
              onChange={(e) => searching(e.target.value)}
              type="text"
              placeholder="Search jobs here..."
              className="tw-pl-10 tw-pr-4 tw-py-2 tw-w-80 tw-rounded-full tw-border tw-border-gray-300 focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            />
          </div>
        </div>

        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
          {jobs.map((job, index) => (
            <JobCard key={index} {...job} clickOnJob={clickOnJob} />
          ))}
        </div>
      </div>
    </section>
  );
};
