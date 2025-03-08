import React, { useEffect, useState } from "react";
import {
  Edit,
  Trash2,
  Twitter,
  Terminal,
  PhoneCall,
  Mail,
  SquareChartGantt,
  Ban,
  MoveLeft,
} from "lucide-react";
import { axiosInstance, BACKEND_URL } from "../../../apis/axiosInstance";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { successToast } from "../../../utils/showToast";
import { ScheduleInterview } from "../../../components/ui/scheduleInterview/scheduleInterview";
import { APPLICATION_STATUS } from "../../../constants/constants";
import { ApplicationStatus } from "../../user/applicationStatus/applicationStatus";

export const ViewApplicationDetails = ({
  makeApplicationDetailsEmpty,
  applicationDetials,
  rerenderComponent,
}) => {
  const [isSceduleInterviewOpen, setisSceduleInterviewOpen] = useState(false);
  const userDatails = applicationDetials?.user_details || {};
  const jobDetails = applicationDetials?.job_details || {};

  const submitInterview = (data) => {
    scheduleTechnicalInterview();
  };
  const onClose = () => {
    setisSceduleInterviewOpen(false);
  };

  const scheduleTechnicalInterview = async () => {
    try {
      const response = await axiosInstance.post(`/update-application-status/`, {
        application_id: applicationDetials?.id,
        status: APPLICATION_STATUS.TECHNIAL_INTERVIEW,
      });
      if (response.status === 200) {
        successToast("Interview Scheduled Successfully");
      }
    } catch (error) {
      console.error("Error scheduling interview:", error);
    } finally {
      onClose();
      rerenderComponent();
    }
  };

  const rejectCandidate = async () => {
    try {
      const response = await axiosInstance.post(`/update-application-status/`, {
        application_id: applicationDetials?.id,
        status: APPLICATION_STATUS.REJECTED,
      });
      if (response.status === 200) {
        successToast("Candidate rejected");
      }
    } catch (error) {
      console.error("Error reject candidate:", error);
    } finally {
      onClose();
      rerenderComponent();
    }
  };
  const hireCandidate = async () => {
    try {
      const response = await axiosInstance.post(`/update-application-status/`, {
        application_id: applicationDetials?.id,
        status: APPLICATION_STATUS.HIRED,
      });
      if (response.status === 200) {
        successToast("Candidate hired.");
      }
    } catch (error) {
      console.error("Error reject candidate:", error);
    } finally {
      onClose();
      rerenderComponent();
    }
  };

  return (
    <>
      <div className="tw-max-w-6xl tw-mx-auto tw-p-6">
        {/* Header Section */}
        <div className="tw-bg-blue-50 tw-rounded-xl tw-p-6 tw-mb-6">
          <div className="tw-flex tw-justify-between tw-items-start tw-mb-4">
            <div>
              <span
                className="tw-cursor-pointer"
                onClick={makeApplicationDetailsEmpty}
              >
                <MoveLeft />
              </span>
              <h1 className="tw-mt-3 tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-2">
                Applicant Name: {userDatails?.username}
              </h1>
              <div className="tw-flex tw-flex-wrap tw-gap-4 tw-text-gray-600">
                <div className="tw-flex tw-items-center tw-gap-1">
                  <Mail className="tw-w-4 tw-h-4" />
                  <span>{userDatails?.email}</span>
                </div>
                <div className="tw-flex tw-items-center tw-gap-1">
                  <PhoneCall className="tw-w-4 tw-h-4" />
                  <span>{userDatails?.phone_number}</span>
                </div>
                <div className="tw-flex tw-items-center tw-gap-1">
                  <span>Skills: </span>
                  <span>{userDatails?.skills}</span>
                </div>
              </div>
              <div className="tw-flex tw-flex-wrap tw-gap-4 tw-mt-3 ">
                <div className="tw-flex tw-items-center tw-gap-1 tw-text-gray-600">
                  <span>Applied at: </span>
                  <span>{applicationDetials?.applied_at}</span>
                </div>

                <div className="tw-text-lexiBlue-500 tw-flex tw-items-center tw-gap-1">
                  <SquareChartGantt className="tw-w-4 tw-h-4" />
                  <a
                    href={`${BACKEND_URL}${userDatails?.resume}`}
                    target="_blank"
                  >
                    View Resume
                  </a>
                </div>
                <div className="tw-flex tw-items-center tw-gap-1 tw-text-gray-600">
                  <span>Status: </span>
                  <span>
                    {capitalizeFirstLetter(applicationDetials?.status)}
                  </span>
                </div>
                {applicationDetials?.score != -1 && (
                  <div className="tw-flex tw-items-center tw-gap-1 tw-text-gray-600">
                    <span>Score: </span>
                    <span>{applicationDetials?.score}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="tw-flex tw-gap-2">
              {applicationDetials.status == APPLICATION_STATUS.PENDING && (
                <button
                  onClick={() => scheduleTechnicalInterview()}
                  className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-text-blue-600 tw-bg-white tw-rounded-lg tw-border tw-border-blue-600 hover:tw-bg-blue-50"
                >
                  Schedule an Interview
                </button>
              )}
              {applicationDetials.status ==
                APPLICATION_STATUS.TECHNIAL_INTERVIEW_COMPLETED && (
                <button
                  onClick={() => hireCandidate()}
                  className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-text-green-600 tw-bg-white tw-rounded-lg tw-border tw-border-green-600 hover:tw-bg-blue-50"
                >
                  Hired
                </button>
              )}
              {applicationDetials.status != APPLICATION_STATUS.REJECTED &&
                applicationDetials.status != APPLICATION_STATUS.HIRED && (
                  <button
                    onClick={rejectCandidate}
                    className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-bg-red-500  tw-text-white tw-rounded-lg tw-border tw-border-red-600 hover:tw-bg-red-400"
                  >
                    <Ban className="tw-w-4 tw-h-4" />
                    Reject
                  </button>
                )}
            </div>
          </div>
        </div>

        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-6 ">
          {/* Left Column - Job Info */}
          <div className="md:tw-col-span-2 tw-space-y-6">
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
                    Industry type
                  </label>
                  <p className="tw-font-medium">
                    {jobDetails?.company?.industry_type}
                  </p>
                </div>
                <div>
                  <label className="tw-text-sm tw-text-gray-500">
                    About Company
                  </label>
                  <p className="tw-font-medium">
                    {jobDetails?.company?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Job Details */}
          <div className="md:tw-col-span-2 tw-space-y-6">
            <div className="tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-sm">
              <h2 className="tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-4">
                Job Details
              </h2>

              <div className="tw-mb-6">
                <label className="tw-text-sm tw-text-gray-500">Job Title</label>
                <p className="tw-font-medium">{jobDetails.job_title}</p>
              </div>
              <div className="tw-mb-6">
                <label className="tw-text-sm tw-text-gray-500">Location</label>
                <p className="tw-font-medium">{jobDetails.location}</p>
              </div>
              <div className="tw-mb-6">
                <label className="tw-text-sm tw-text-gray-500">
                  Salary Range
                </label>
                <p className="tw-font-medium">{jobDetails.salary_range}</p>
              </div>
              <div className="tw-mb-6">
                <label className="tw-text-sm tw-text-gray-500">
                  Application deadline
                </label>
                <p className="tw-font-medium">
                  {jobDetails.application_deadline}
                </p>
              </div>
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
                <label className="tw-text-sm tw-text-gray-500">
                  Experience
                </label>
                <p className="tw-font-medium">{jobDetails.experience}</p>
              </div>

              <div className="tw-mb-5">
                <label className="tw-text-sm tw-text-gray-500">
                  Job Description
                </label>
                <p className="tw-text-gray-600 tw-mb-6">
                  {jobDetails?.job_description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSceduleInterviewOpen && (
        <ScheduleInterview
          interviewType="Technical Interview"
          onClose={onClose}
          onSubmit={submitInterview}
        />
      )}
    </>
  );
};
