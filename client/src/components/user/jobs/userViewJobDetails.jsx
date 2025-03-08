import React, { useEffect, useState } from "react";
import { MapPin, Briefcase, Calendar, Twitter } from "lucide-react";
import { axiosInstance, BACKEND_URL } from "../../../apis/axiosInstance";
import { LEXI_USER_ID } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../../utils/showToast";
import { PlaceholderImgURL } from "../../../utils/placeholderImg";
export const UserViewJobDetails = ({ jobId }) => {
  const [jobDetails, setJobDetails] = useState({});
  const [allAppliedJobs, setAllAppliedJobs] = useState([]);
  const [appliedAlready, setAppliedAlready] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (jobId) {
      getJobs();
      getAllAppliedJobs();
    }
  }, []);

  const getAllAppliedJobs = async () => {
    try {
      const res = await axiosInstance.get(`all-applied-jobs/`);
      if (res.status === 200) {
        const data = res.data || [];
        setAllAppliedJobs(data);
      }
    } catch (error) {
      console.log("error on get all applied jobs", error);
    }
  };

  useEffect(() => {
    appliedJobsFn();
  }, [allAppliedJobs]);

  const appliedJobsFn = () => {
    const userId = JSON.parse(localStorage.getItem(LEXI_USER_ID)) || null;
    if (userId) {
      const applied = allAppliedJobs.find(
        (job) => job.user == userId && job.job == jobId
      );
      if (applied) {
        setAppliedAlready(applied);
      }
    }
  };
  const getJobs = async () => {
    try {
      const res = await axiosInstance.get(`job/${jobId}/`);
      if (res.status === 200) {
        const data = res.data || {};
        setJobDetails(data);
      }
    } catch (error) {
      console.log("Error ON GET USER DATA", error);
      return false;
    }
  };
  const companyImg = jobDetails?.company?.company_logo;
  const url = companyImg ? `${BACKEND_URL}${companyImg}` : PlaceholderImgURL;

  const applyJob = async () => {
    const userid = JSON.parse(localStorage.getItem(LEXI_USER_ID)) || null;
    if (!userid) {
      navigate("/user/signin");
      errorToast("Please login again");
      return;
    }

    try {
      const res = await axiosInstance.post("apply-job/", {
        user_id: userid,
        job_id: jobId,
      });
      if (res.status === 201) {
        successToast("Job applied successfully");
      }
    } catch (error) {
      console.log("error on apply job", error);
      const status = error.response.status;
      if (status === 400) {
        errorToast("You have already applied for this job");
      } else {
        errorToast("Something went wrong");
      }
    } finally {
      getAllAppliedJobs();
    }
  };

  return (
    <div className="tw-max-w-6xl tw-mx-auto tw-p-6">
      {/* Header Section */}
      <div className="tw-bg-blue-50 tw-rounded-xl tw-p-6 tw-mb-6">
        <div className="tw-flex tw-justify-between tw-items-start">
          <div>
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-2">
              {jobDetails?.job_title}
            </h1>
            <div className="tw-flex tw-flex-wrap tw-gap-4 tw-text-gray-600">
              <div className="tw-flex tw-items-center tw-gap-1">
                <MapPin className="tw-w-4 tw-h-4" />
                <span>{jobDetails?.location}</span>
              </div>
              <div className="tw-flex tw-items-center tw-gap-1">
                <Briefcase className="tw-w-4 tw-h-4" />
                <span>{jobDetails?.salary_range}</span>
              </div>
              <div className="tw-flex tw-items-center tw-gap-1">
                <Calendar className="tw-w-4 tw-h-4" />
                <span>{jobDetails?.application_deadline}</span>
              </div>
            </div>
          </div>
          <div className=" tw-p-5">
            {appliedAlready ? (
              <button
                disabled
                className="tw-flex tw-items-center tw-justify-center tw-w-32 tw-h-10 tw-bg-blue-400 tw-cursor-not-allowed tw-text-white tw-rounded-lg "
              >
                Applied
              </button>
            ) : (
              <button
                onClick={applyJob}
                className="tw-flex tw-items-center tw-justify-center tw-w-32 tw-h-10 tw-bg-[#1DA1F2] tw-text-white tw-rounded-lg hover:tw-bg-[#1a8cd8]"
              >
                Apply Now
              </button>
            )}
          </div>
          <div className=" tw-p-5">
            <button className="tw-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-bg-[#1DA1F2] tw-text-white tw-rounded-lg hover:tw-bg-[#1a8cd8]">
              <img src={url} alt="company-logo" />
            </button>
          </div>
        </div>
      </div>

      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
        {/* Left Column - Job Info */}
        <div className="tw-space-y-6">
          <div className="tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-sm">
            <h2 className="tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-4">
              Company Details
            </h2>
            <div className="tw-space-y-4">
              <div>
                <label className="tw-text-sm tw-text-gray-500">
                  Company Name
                </label>
                <p className="tw-font-medium">
                  {jobDetails?.company?.company_name}
                </p>
              </div>
              <div>
                <label className="tw-text-sm tw-text-gray-500">
                  Company Phone
                </label>
                <p className="tw-font-medium">
                  {jobDetails?.company?.company_phone}
                </p>
              </div>
              <div>
                <label className="tw-text-sm tw-text-gray-500">Website</label>
                <p>
                  <a
                    target="_blank"
                    href={jobDetails?.company?.website_url}
                    className="tw-font-medium"
                  >
                    {jobDetails?.company?.website_url}
                  </a>
                </p>
              </div>
              <div>
                <label className="tw-text-sm tw-text-gray-500">
                  About Company
                </label>
                <p className=" ">
                  {jobDetails?.company?.description}
                </p>
              </div>
              <div>
                <label className="tw-text-sm tw-text-gray-500">
                  Industry type
                </label>
                <p className="tw-font-medium">
                  {jobDetails?.company?.industry_type}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Job Details */}
        <div className="md:tw-col-span-2 tw-space-y-6">
          <div className="tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-sm">
            <h2 className="tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-4">
              Job Description
            </h2>
            <p className="tw-text-gray-600 tw-mb-6">
              {jobDetails?.job_description}
            </p>

            <div className="tw-mb-6">
              <label className="tw-text-sm tw-text-gray-500">Skills</label>
              <p className="tw-font-medium">{jobDetails.required_skills}</p>
            </div>

            <div className="tw-mb-5">
              <label className="tw-text-sm tw-text-gray-500">Salary</label>
              <p className="tw-font-medium">{jobDetails.salary_range}</p>
            </div>

            <div className="tw-mb-5">
              <label className="tw-text-sm tw-text-gray-500">Job Type</label>
              <p className="tw-font-medium">{jobDetails.job_type}</p>
            </div>
            <div className="tw-mb-5">
              <label className="tw-text-sm tw-text-gray-500">Experience</label>
              <p className="tw-font-medium">{jobDetails.experience}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
