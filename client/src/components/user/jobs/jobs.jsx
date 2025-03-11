import React, { useEffect, useState } from "react";
import { JobCard } from "../../landing/jobCard";
import { axiosInstance } from "../../../apis/axiosInstance";

export const CompanyJobs = ({ clickOnJob }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchQuery, jobs]);

  const getJobs = async () => {
    try {
      const res = await axiosInstance.get(`jobs/`);
      if (res.status === 200) {
        const today = new Date();
        const data = res.data || [];

        const validJobs = data
          .filter((job) => new Date(job.application_deadline) > today)
          .reverse();

        setJobs(validJobs);
        setFilteredJobs(validJobs); // Initialize filtered jobs with all jobs
      }
    } catch (error) {
      console.log("Error ON GET JOB DATA", error);
    }
  };

  const filterJobs = () => {
    if (!searchQuery) {
      setFilteredJobs(jobs);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    const filtered = jobs.filter(
      (job) => job.job_title.toLowerCase().includes(lowerCaseQuery)
      // job.required_skills.some((skill) =>
      //   skill.toLowerCase().includes(lowerCaseQuery)
      // )
    );

    setFilteredJobs(filtered);
  };

  return (
    <section className="tw-py-16 tw-px-4 tw-bg-lexiBlue-100 tw-min-h-screen">
      <div className="tw-text-center tw-mb-8">
        <h2 className="tw-text-4xl tw-font-bold text-[#3B4B7C] tw-mb-4">
          Job Vacancies!
        </h2>
      </div>

      {/* Search Input */}
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          {" "}
          <input
            type="text"
            className="form-control tw-mb-6 tw-p-2 tw-rounded tw-border tw-border-gray-300"
            placeholder="Search by job title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-4"></div>
      </div>

      <div className="tw-max-w-7xl tw-mx-auto">
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <JobCard key={index} job={job} clickOnJob={clickOnJob} />
            ))
          ) : (
            <p className="tw-text-center tw-text-gray-600">
              No matching jobs available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
