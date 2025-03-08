import React, { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { ApplicationBtnContainer } from "../../../components/admin/applicationButtons/applicationBtnContainer";
import { axiosInstance, BACKEND_URL } from "../../../apis/axiosInstance";
import { ViewApplicationDetails } from "./applicationDetails";
import { APPLICATION_STATUS } from "../../../constants/constants";

export const ViewApplications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [applicationDetials, setApplicationDetails] = useState(null);
  const [applications, setApplications] = useState([]);
  const [activeType, setActiveType] = useState(APPLICATION_STATUS.PENDING);
  const [triggerRerender, setTriggerRerender] = useState(false);

  const rerenderComponent = () => {
    setTriggerRerender(!triggerRerender);
  };
  const changeActivetype = (newType) => {
    setActiveType(newType);
  };
  useEffect(() => {
    fetchApplications();
  }, [triggerRerender]);

  const fetchApplications = async () => {
    try {
      const response = await axiosInstance.get("/all-applied-jobs/");

      if (response.status === 200) {
        setApplications(response.data?.reverse() || []);

        if (applicationDetials) {
          const updatedDetails = response.data.find(
            (app) => app.id === applicationDetials.id
          );
          setApplicationDetails(updatedDetails);
        }
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
  const makeApplicationDetailsEmpty = () => {
    setApplicationDetails(null);
  };

  const filterApplications = applications.filter((app) => {
    return (
      app?.user_details?.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) && activeType === app.status
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filterApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApps = filterApplications.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (applicationDetials) {
    return (
      <ViewApplicationDetails
        makeApplicationDetailsEmpty={makeApplicationDetailsEmpty}
        rerenderComponent={rerenderComponent}
        applicationDetials={applicationDetials}
      />
    );
  }

  return (
    <>
      <h1 className="tw-text-2xl tw-m-5 tw-font-bold tw-text-gray-800">
        Applications
      </h1>

      <ApplicationBtnContainer
        activeType={activeType}
        changeActivetype={changeActivetype}
      />

      <div className="tw-max-w-7xl tw-mx-auto tw-p-6">
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800">
            View Applications
          </h1>
          <div className="tw-relative">
            <Search className="tw-w-5 tw-h-5 tw-text-gray-400 tw-absolute tw-left-3 tw-top-1/2 tw-transform -tw-translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidates here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="tw-pl-10 tw-pr-4 tw-py-2 tw-w-80 tw-rounded-full tw-border tw-border-gray-300 focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            />
          </div>
        </div>

        <div className="tw-bg-white tw-rounded-xl tw-shadow-sm tw-overflow-hidden">
          <table className="tw-w-full">
            <thead>
              <tr className="tw-bg-gray-50">
                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-lexiBlue-600">
                  S NO
                </th>
                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-lexiBlue-600">
                  Candidate Name
                </th>
                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-lexiBlue-600">
                  Postion
                </th>
                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-lexiBlue-600">
                  Company
                </th>
                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-lexiBlue-600">
                  Status
                </th>
                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-lexiBlue-600">
                  View More
                </th>
              </tr>
            </thead>
            <tbody className="tw-divide-y tw-divide-gray-200">
              {currentApps?.length>0? currentApps.map((app, index) => (
                <tr key={index} className="hover:tw-bg-gray-50">
                  <td className="tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">
                    {startIndex + index + 1}
                  </td>
                  <td className="tw-px-6 tw-py-4 tw-flex ">
                    {app?.user_details?.username}
                  </td>
                  <td className="tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">
                    {app?.job_details?.job_title}
                  </td>
                  <td className="tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">
                    {app?.job_details?.company?.company_name}
                  </td>
                  <td className="tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">
                    <span
                      className={`tw-px-3 tw-py-1 tw-rounded-full tw-text-sm
                      ${
                        app?.status === "Hired"
                          ? "tw-bg-green-50 tw-text-green-600"
                          : app?.status === "Rejected"
                          ? "tw-bg-red-50 tw-text-red-600"
                          : app?.status === "pending"
                          ? "tw-bg-yellow-50 tw-text-yellow-600"
                          : "tw-bg-yellow-50 tw-text-black"
                      }`}
                    >
                      {app?.status === APPLICATION_STATUS.PENDING && "Pending"}
                      {app?.status === APPLICATION_STATUS.TECHNIAL_INTERVIEW &&
                        "Interview Scheduled"}
                      {app?.status ===
                        APPLICATION_STATUS.TECHNIAL_INTERVIEW_COMPLETED &&
                        "Interview Completed"}
                      {app?.status === APPLICATION_STATUS.HIRED && "Hired"}
                      {app?.status === APPLICATION_STATUS.REJECTED &&
                        "Rejected"}
                    </span>
                  </td>
                  <td className="tw-px-6 tw-py-4">
                    <button
                      className="tw-text-sm tw-text-lexiBlue-600 hover:tw-underline"
                      onClick={() => {
                        setApplicationDetails(app);
                      }}
                    >
                      View More
                    </button>
                  </td>
                </tr>
              )):<p>No Applications Found</p>}
            </tbody>
          </table>

          <div className="tw-flex tw-justify-between tw-items-center tw-px-6 tw-py-4 tw-bg-gray-50">
            <div className="tw-flex tw-items-center tw-gap-2">
              <span className="tw-text-sm tw-text-gray-600">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="tw-rounded-md tw-border tw-border-gray-300 tw-text-sm"
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
              </select>
              <span className="tw-text-sm tw-text-gray-600">per page</span>
            </div>

            <div className="tw-flex tw-items-center tw-gap-2">
              <span className="tw-text-sm tw-text-gray-600">
                {startIndex + 1}-{Math.min(endIndex, filterApplications.length)}{" "}
                of {filterApplications.length}
              </span>
              <div className="tw-flex tw-gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="tw-p-2 tw-rounded-md tw-text-gray-600 hover:tw-bg-gray-100 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                >
                  <ChevronLeft className="tw-w-5 tw-h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`tw-px-3 tw-py-1 tw-rounded-md tw-text-sm
                    ${
                      currentPage === page
                        ? "tw-bg-blue-600 tw-text-white"
                        : "tw-text-gray-600 hover:tw-bg-gray-100"
                    }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="tw-p-2 tw-rounded-md tw-text-gray-600 hover:tw-bg-gray-100 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                >
                  <ChevronRight className="tw-w-5 tw-h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
