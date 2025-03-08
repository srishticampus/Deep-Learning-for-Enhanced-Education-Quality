import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  Trash2,
  SquarePen,
} from "lucide-react";
import { axiosInstance, BACKEND_URL } from "../../../apis/axiosInstance";
import axios from "axios";
import { successToast } from "../../../utils/showToast";

export const ViewCompanies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    try {
      const res = await axiosInstance.get(`companies/`);
      if (res.status === 200) {
        const data = res.data || [];
        setCompanies(data.reverse());
      }
    } catch (error) {
      console.log("Error ON GET USER DATA", error);
      return false;
    }
  };

  // Filter companies based on search term
  const filteredCandidates = companies.filter(
    (company) =>
      company.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.company_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = filteredCandidates.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePdfClick = (pdf) => {
    setSelectedPdf(pdf);
    setShowPdfModal(true);
  };

  const deleteCompany = async (id) => {
    try {
      const res = await axiosInstance.delete(`/delete-company/${id}/`);
      if (res.status === 200) {
        successToast("Company deleted successfully");
        getCompanies();
      }
    } catch (error) {
      console.log("Error on delete company", error);
    }
  }
  return (
    <>
      <div className="tw-max-w-7xl tw-mx-auto tw-mt-5 tw-p-6">
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800">
            View Companies
          </h1>
          <div className="tw-relative">
            <Search className="tw-w-5 tw-h-5 tw-text-gray-400 tw-absolute tw-left-3 tw-top-1/2 tw-transform -tw-translate-y-1/2" />
            <input
              type="text"
              placeholder="Search companies here..."
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
                  Name
                </th>
                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-lexiBlue-600">
                  Logo
                </th>
                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-lexiBlue-600">
                  City
                </th>
                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-lexiBlue-600">
                  Contact Info
                </th>
                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-lexiBlue-600">
                  Website (URL)
                </th>
              
                <th className="tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-lexiBlue-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="tw-divide-y tw-divide-gray-200">
              {currentCandidates.map((company, index) => (
                <tr key={company.id} className="hover:tw-bg-gray-50">
                  <td className="tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">
                    {startIndex + index + 1}
                  </td>
                  <td className="tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">
                    {company.company_name}
                  </td>
                  <td className="tw-px-6 tw-py-4">
                    <img
                      src={`${BACKEND_URL}/${company.company_logo}`}
                      alt={company.company_name}
                      className="tw-w-10 tw-h-10 tw-rounded-full tw-object-cover"
                    />
                  </td>

                  <td className="tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">
                    {company.city}
                  </td>
                  <td className="tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">
                    {company.company_phone}
                  </td>
                  <td className="tw-px-6 tw-py-4">
                    <a
                      href={company.website_url}
                      target="_blank"
                      className="tw-text-sm tw-text-lexiBlue-600"
                    >
                      {company.website_url}
                    </a>
                  </td>
              
                  <td className="tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">
                    <div className="tw-flex">
                    {/* <span className="tw-text-lexiBlue-500  tw-cursor-pointer">
                        <SquarePen />
                      </span> */}
                      <span className="tw-text-red-500 tw-ms-3" onClick={() => {
                        deleteCompany(company.id);
                      }}>
                        <Trash2 />
                      </span>
                    </div>
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
              <iframe
                src={`/dummy-path/${selectedPdf}`}
                className="tw-w-full tw-h-full tw-rounded-lg"
                title="Resume Preview"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
