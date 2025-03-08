import React, { useEffect, useState } from "react";
import {
  MapPin,
  Briefcase,
  Calendar,
  Edit,
  Trash2,
  MoveLeft,
} from "lucide-react";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import { successToast } from "../../../utils/showToast";
export const ViewJobDetails = ({ jobId }) => {
  const [jobDetails, setJobDetails] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (jobId) {
      getJobs();
    }
  }, []);

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

  const deleteJob = async (id) => {
    try {
      const res = await axiosInstance.delete(`/delete-job/${id}/`);
      if (res.status === 200) {
        successToast("Company deleted successfully");
        navigate(-1);
      }
    } catch (error) {
      console.log("Error on delete job", error);
    }
  };

  const backClick =()=>{
    setJobId("");  }
  return (
    <div className="tw-max-w-6xl tw-mx-auto tw-p-6">
      {/* Header Section */}
      <div className="tw-bg-blue-50 tw-rounded-xl tw-p-6 tw-mb-6">
        <div className="tw-flex tw-justify-between tw-items-start tw-mb-4">
          <div>
            <div
              onClick={backClick}
            >
              {" "}
              <MoveLeft />
            </div>
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
          <div className="tw-flex tw-gap-2">
            {/* <button className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-text-blue-600 tw-bg-white tw-rounded-lg tw-border tw-border-blue-600 hover:tw-bg-blue-50">
              <Edit className="tw-w-4 tw-h-4" />
              Edit
            </button> */}
            <button
              onClick={() => {
                deleteJob(jobId);
              }}
              className="tw-cursor-pointer tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-bg-red-500  tw-text-white tw-rounded-lg tw-border tw-border-red-600 hover:tw-bg-red-400"
            >
              <Trash2 className="tw-w-4 tw-h-4" />
              Delete
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
                <p className="tw-text-gray-800">
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
