import React from "react";
import { MapPin, Clock, Settings } from "lucide-react";
import { BACKEND_URL } from "../../../apis/axiosInstance";
import { PlaceholderImgURL } from "../../../utils/placeholderImg";

export const JobCard = (props) => {
  console.log('pros', props)
  const {
    job_title,
    id,
    required_skills,
    company,
    location,
    job_type,
    salary_range,
    clickOnJob,
  } = props;
  const imgPath = company?.company_logo;
  const companyLogo = imgPath ? `${BACKEND_URL}/${imgPath}` : PlaceholderImgURL;

  return (
    <div
      onClick={() => clickOnJob(id)}
      className="tw-bg-white tw-cursor-pointer tw-rounded-xl tw-p-6 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow"
    >
      <div className="tw-flex tw-justify-between tw-items-start tw-mb-4">
        <div>
          <h3 className="tw-text-xl tw-font-semibold text-[#3B4B7C] tw-mb-2">
            {job_title}
          </h3>
          <p className="tw-text-gray-600 tw-mb-2">{required_skills}</p>
        </div>
        <img
          src={companyLogo}
          alt={company}
          className="tw-w-8 tw-h-8 tw-object-contain"
        />
      </div>

      <div className="tw-space-y-3">
        <div className="tw-flex tw-items-center tw-text-gray-600">
          <MapPin className="tw-w-4 tw-h-4 tw-mr-2" />
          <span>{location}</span>
        </div>

        <div className="tw-flex tw-items-center tw-text-gray-600">
          <Clock className="tw-w-4 tw-h-4 tw-mr-2" />
          <span>{job_type} Job Type</span>
        </div>

        <div className="tw-flex tw-items-center tw-text-gray-600">
          <Settings className="tw-w-4 tw-h-4 tw-mr-2" />
          <span>Salary: {salary_range} </span>
        </div>
      </div>
    </div>
  );
};
