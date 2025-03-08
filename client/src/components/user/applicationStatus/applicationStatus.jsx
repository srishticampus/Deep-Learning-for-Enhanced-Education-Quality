import React, { useEffect, useState } from "react";
import { MapPin, Briefcase, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { APPLICATION_STATUS, LEXI_USER_ID } from "../../../constants/constants";
import { axiosInstance, BACKEND_URL } from "../../../apis/axiosInstance";
import { PlaceholderImgURL } from "../../../utils/placeholderImg";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { ApplicationStatus } from "../../../pages/user/applicationStatus/applicationStatus";
export const Applications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [fixedApplications, setFixedApplications] = useState([]);
  const [searchedItem, setSearchedItem] = useState("");
  const handleSearch = (e) => {
    setSearchedItem(e.target.value);
  };
  const handleClick = (id) => {
    navigate(`/user/interview-preview/${id}`);
  };

  useEffect(() => {
    const id = localStorage.getItem(LEXI_USER_ID) || null;
    if (id) {
      getMyApplications(id);
    }
  }, []);

  useEffect(() => {
    if (searchedItem) {
      const filteredApplications = fixedApplications.filter((application) => {
        return application?.job_details?.job_title
          ?.toLowerCase()
          .includes(searchedItem.toLowerCase());
      });
      setApplications(filteredApplications);
    } else {
      setApplications(fixedApplications);
    }
  }, [searchedItem]);

  const getMyApplications = async (id) => {
    try {
      const res = await axiosInstance.get(`user-applied-job/${id}/`);
      if (res.status === 200) {
        const data = res.data?.reverse() || [];
        setApplications(data);
        setFixedApplications(data);
      }
    } catch (error) {
      console.log("Error ON GET application DATA", error);
    }
  };
  return (
    <div className="tw-min-h-screen tw-bg-gray-50">
      {/* Header */}
      <header className="tw-bg-blue-50 tw-py-4">
        <h1 className="tw-text-center tw-text-2xl tw-font-semibold tw-text-gray-800">
          Application Status
        </h1>
      </header>

      <div className="tw-bg-gray-50 tw-py-4 tw-flex tw-justify-between tw-px-5">
        {/* Breadcrumb */}
        <div className="tw-container tw-mx-auto tw-px-4 tw-py-4">
          <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-600">
            <span
              onClick={() => navigate("/user/home")}
              className="tw-cursor-pointer"
            >
              Home
            </span>
            <span>›</span>
            <span className="tw-text-gray-800">Application Status</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="tw-container tw-mx-auto tw-px-4 tw-w-80">
          <div className="tw-relative">
            <Search className="tw-absolute tw-left-3 tw-top-1/2 tw-h-5 tw-w-5 tw-transform tw-text-gray-400 -tw-translate-y-1/2" />
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search jobs..."
              className="tw-w-full tw-rounded-full tw-border tw-border-gray-200 tw-py-2 tw-pl-10 tw-pr-4 tw-outline-none focus:tw-border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="tw-container tw-mx-auto tw-px-4 tw-py-8 ">
        {applications.map((application, i) => {
          const companyImg = application?.job_details?.company?.company_logo;
          const url = companyImg
            ? `${BACKEND_URL}${companyImg}`
            : PlaceholderImgURL;

          return (
            <div
              className="tw-rounded-xl tw-bg-white tw-p-6 tw-shadow-sm tw-mt-5"
              key={i}
            >
              <div className="tw-grid tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-3">
                {/* Job Details */}
                <div className="tw-space-y-4">
                  <div className="tw-flex tw-items-center tw-gap-4">
                    <img src={url} alt="Google" className="tw-h-8 tw-w-auto" />
                    <div>
                      <h2 className="tw-text-xl tw-font-semibold">
                        {application?.job_details?.job_title}
                      </h2>
                      <p className="tw-text-sm tw-text-gray-600">
                        {application?.job_details?.company?.company_name}
                      </p>
                    </div>
                  </div>
                  <p className="tw-text-sm tw-text-gray-600">
                    {application?.job_details?.required_skills}
                  </p>
                  <div className="tw-space-y-2">
                    <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-600">
                      <MapPin className="tw-h-4 tw-w-4" />
                      <span>
                        Location: {application?.job_details?.location}
                      </span>
                    </div>
                    <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-600">
                      <Briefcase className="tw-h-4 tw-w-4" />
                      <span>
                        Experience: {application?.job_details?.experience}
                      </span>
                    </div>
                    {/* <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-600">
                      <Clock className="tw-h-4 tw-w-4" />
                      <span>Applied on 12/12/2024</span>
                    </div> */}
                  </div>
                </div>

                {/* Resume Status */}
                {application?.status === APPLICATION_STATUS.PENDING && (
                  <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2">
                    <h3 className="tw-font-medium">Application Status</h3>
                    {/* <p className="tw-text-sm tw-text-gray-600">12/01/2025</p> */}
                    <span className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-yellow-100 tw-px-3 tw-py-1 tw-text-sm tw-text-yellow-700">
                      <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-yellow-500"></span>
                      {capitalizeFirstLetter(application?.status)}
                    </span>
                  </div>
                )}

                {application?.status ===
                  APPLICATION_STATUS.TECHNIAL_INTERVIEW && (
                  <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2">
                    <h3 className="tw-font-medium">Application Status</h3>
                    <span className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-blue-100 tw-px-3 tw-py-1 tw-text-sm tw-text-black">
                      <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-lexiBlue-500"></span>
                      Interview Scheduled
                    </span>
                  </div>
                )}

                {application?.status ===
                  APPLICATION_STATUS.TECHNIAL_INTERVIEW_COMPLETED && (
                  <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2">
                    <h3 className="tw-font-medium">Application Status</h3>
                    <span className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-blue-100 tw-px-3 tw-py-1 tw-text-sm tw-text-black">
                      <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-lexiBlue-500"></span>
                      Interview Completed
                    </span>
                  </div>
                )}

                {application?.status === APPLICATION_STATUS.HIRED && (
                  <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2">
                    <h3 className="tw-font-medium">Application Status</h3>
                    <span className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-blue-100 tw-px-3 tw-py-1 tw-text-sm tw-text-black">
                      <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-green-500"></span>
                      {capitalizeFirstLetter(application?.status)}
                    </span>
                  </div>
                )}
                {application?.status === APPLICATION_STATUS.REJECTED && (
                  <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2">
                    <h3 className="tw-font-medium">Application Status</h3>
                    <span className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-red-100 tw-px-3 tw-py-1 tw-text-sm tw-text-black">
                      <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-red-500"></span>
                      {capitalizeFirstLetter(application?.status)}
                    </span>
                  </div>
                )}

                {/* Interview Rounds */}
                <div className="tw-grid tw-grid-cols-1 tw-gap-4">
                  <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-p-4 tw-text-center">
                    <h3 className="tw-font-medium tw-mt-5 ">
                      Interview Status
                    </h3>
                    <p className="tw-mt-2 tw-text-sm tw-text-gray-600"></p>

                    {application?.status === APPLICATION_STATUS.PENDING && (
                      <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2">
                        <span className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-green-100 tw-px-3 tw-py-1 tw-text-sm tw-text-black">
                          <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-green-500"></span>
                          Your resume under review.
                        </span>
                      </div>
                    )}

                    {application?.status ===
                      APPLICATION_STATUS.TECHNIAL_INTERVIEW && (
                      <button
                        onClick={() => {
                          handleClick(application.id);
                        }}
                        className="tw-bg-lexiBlue-500 tw-text-white tw-rounded-full tw-px-10 tw-py-2 tw-mt-3"
                      >
                        Attend
                      </button>
                    )}

                    {application?.status ===
                      APPLICATION_STATUS.TECHNIAL_INTERVIEW_COMPLETED && (
                      <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2">
                        <span className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-green-100 tw-px-3 tw-py-1 tw-text-sm tw-text-black">
                          <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-green-500"></span>
                          Interview Completed.
                        </span>

                        <p>Score: {application.score}</p>
                      </div>
                    )}
                    {application?.status === APPLICATION_STATUS.REJECTED && (
                      <div className="tw-cursor-pointer tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2">
                        <span
                          onClick={() => {
                            navigate("/user/jobs");
                          }}
                          className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-red-100 tw-px-3 tw-py-1 tw-text-sm tw-text-black"
                        >
                          <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-red-500"></span>
                          Try other oppurtunies.
                        </span>
                      </div>
                    )}
                    {application?.status === APPLICATION_STATUS.HIRED && (
                      <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2">
                        <span className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-green-100 tw-px-3 tw-py-1 tw-text-sm tw-text-black">
                          <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-green-500"></span>
                          Interview Completed.
                        </span>

                        <p>Score: {application.score}</p>
                      </div>
                    )}
                  </div>
                  {/* <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-p-4 tw-text-center">
                    <h3 className="tw-font-medium">HR Round</h3>
                    <p className="tw-mt-2 tw-text-sm tw-text-gray-600">
                      Not Scheduled Yet
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
