import React, { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { ApplicationBtnContainer } from "../../../components/admin/applicationButtons/applicationBtnContainer";
import { axiosInstance, BACKEND_URL } from "../../../apis/axiosInstance";

export const CandidatesList = ({title = "View Candidates"}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPdfModal, setShowPdfModal] = useState(false);

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users/");
      console.log('respo ', res)

      if (res.status === 200) {
        const allCandiates = res.data?.reverse() || [];
        setCandidates(allCandiates);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = filteredCandidates.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="tw-max-w-7xl tw-mx-auto tw-p-6">
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800">
            {title}
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
                  Profile
                </th>
                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-lexiBlue-600">
                  Name
                </th>
                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-lexiBlue-600">
                  Phone Number
                </th>
                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-lexiBlue-600">
                  Email ID
                </th>
                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-lexiBlue-600">
                  Resume
                </th>
              </tr>
            </thead>
            <tbody className="tw-divide-y tw-divide-gray-200">
              {currentCandidates.map((candidate, index) => (
                <tr key={index} className="hover:tw-bg-gray-50">
                  <td className="tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">
                    {startIndex + index + 1}
                  </td>
                  <td className="tw-px-6 tw-py-4">
                    <img
                      src={`${BACKEND_URL}${candidate.profile_image}`}
                      alt={candidate.username}
                      className="tw-w-10 tw-h-10 tw-rounded-full tw-object-cover"
                    />
                  </td>
                  <td className="tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">
                    {candidate?.username}
                  </td>
                  <td className="tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">
                    {candidate?.phone_number}
                  </td>
                  <td className="tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">
                    {candidate?.email}
                  </td>
                  <td className="tw-px-6 tw-py-4">
                    <a
                      className="tw-flex tw-items-center tw-gap-1 tw-text-blue-600 hover:tw-text-blue-700"
                      href={`${BACKEND_URL}${candidate?.resume}`}
                      target="_blank"
                    >
                      <FileText className="tw-w-4 tw-h-4" />

                      <span className="tw-text-sm">View Resume </span>
                    </a>
                  </td>
                </tr>
              ))}
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
                {startIndex + 1}-{Math.min(endIndex, filteredCandidates.length)}{" "}
                of {filteredCandidates.length}
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

        {/* PDF Modal */}
        {showPdfModal && (
          <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center">
            <div className="tw-bg-white tw-rounded-xl tw-p-6 tw-w-11/12 tw-h-5/6">
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                <h2 className="tw-text-xl tw-font-semibold tw-text-gray-800">
                  Resume Preview
                </h2>
                <button
                  onClick={() => setShowPdfModal(false)}
                  className="tw-text-gray-500 hover:tw-text-gray-700"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
