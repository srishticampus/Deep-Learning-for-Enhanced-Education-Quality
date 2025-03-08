import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../../apis/axiosInstance";
import { successToast, errorToast } from "../../../utils/showToast";
export const AddJob = ({ changeActiveSubItem }) => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
    const {
      jobTitle,
      companyId,
      requiredSkills,
      experience,
      location,
      jobType,
      salaryRange,
      jobDescription,
      applicationDeadline,
    } = data;
    console.log("com id", companyId);

    const formDataObj = {
      job_title: jobTitle,
      required_skills: requiredSkills,
      experience,
      location,
      job_type: jobType,
      salary_range: salaryRange,
      job_description: jobDescription,
      application_deadline: applicationDeadline,
      company_name: companyId,
    };
    sendDataToServer(formDataObj);
  };

  const sendDataToServer = async (formData) => {
    try {
      const response = await axiosInstance.post("addjob/", formData);

      if (response.status === 201) {
        successToast("Job added successfully");
        changeActiveSubItem("View Job");
      }
    } catch (error) {
      console.log("ERROR ON add job", error);
      const newErrors = error?.response?.data || {};
      for (let key in newErrors) {
        errorToast(newErrors[key]);
        return;
      }
    }
  };

  // Sample companies data - replace with actual data from your backend
  // const companies = [
  //   { id: 1, name: "dasda" },
  //   { id: 2, name: "Innovation Inc" },
  //   { id: 3, name: "Digital Solutions" },
  //   { id: 4, name: "Future Systems" },
  // ];

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
    "Remote",
  ];

  return (
    <div className="tw-max-w-4xl tw-mx-auto tw-p-6">
      <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-8">
        Add Job
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="tw-space-y-6">
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
          {/* Job Title */}
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
              Job Title
            </label>
            <input
            type="form-control"
              {...register("jobTitle", { 
                required: "Job title is required",
                validate: (value) =>
                  /^[A-Za-z\s]+$/.test(value) || "Job title cannot contain numbers or special characters"
              })}
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"

            />
            {errors.jobTitle && (
              <p className="tw-mt-1 tw-text-sm tw-text-red-600">
                {errors.jobTitle.message}
              </p>
            )}
          </div>

          {/* Company Name (Dropdown) */}
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
              Company Name
            </label>
            <select
              {...register("companyId", { required: "Company is required" })}
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.company_name}
                </option>
              ))}
            </select>
            {errors.companyId && (
              <p className="tw-mt-1 tw-text-sm tw-text-red-600">
                {errors.companyId.message}
              </p>
            )}
          </div>

          {/* Required Skills */}
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
              Required Skills
            </label>
            <input
              type="text"
              {...register("requiredSkills", {
                required: "Required skills are required",
              })}
              placeholder="e.g., JavaScript, React, Node.js"
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            />
            {errors.requiredSkills && (
              <p className="tw-mt-1 tw-text-sm tw-text-red-600">
                {errors.requiredSkills.message}
              </p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
              Experience
            </label>
            <input
              type="number"
              {...register("experience", {
                required: "Experience is required",
              })}
              placeholder="e.g., 2-3 years"
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            />
            {errors.experience && (
              <p className="tw-mt-1 tw-text-sm tw-text-red-600">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
              Location
            </label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              placeholder="e.g., New York, Remote"
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            />
            {errors.location && (
              <p className="tw-mt-1 tw-text-sm tw-text-red-600">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Job Type */}
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
              Job Type
            </label>
            <select
              {...register("jobType", { required: "Job type is required" })}
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            >
              <option value="">Select Job Type</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.jobType && (
              <p className="tw-mt-1 tw-text-sm tw-text-red-600">
                {errors.jobType.message}
              </p>
            )}
          </div>

          {/* Salary Range */}
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
              Salary Range
            </label>
            <input
              type="text"
              {...register("salaryRange", {
                required: "Salary range is required",
              })}
              placeholder="e.g., 60,000 - 80,000"
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            />
            {errors.salaryRange && (
              <p className="tw-mt-1 tw-text-sm tw-text-red-600">
                {errors.salaryRange.message}
              </p>
            )}
          </div>

          {/* Application Deadline */}
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
              Application Deadline
            </label>
            <input
              type="date"
              {...register("applicationDeadline", {
                required: "Application deadline is required",
                validate: (value) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0)
                  const selectedDate = new Date(value);
                  return selectedDate >= today;
                },
              })}
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            />
            {errors.applicationDeadline && (
              <p className="tw-mt-1 tw-text-sm tw-text-red-600">
                {errors.applicationDeadline.message ||
                  "Application deadline must be today or future date"}
              </p>
            )}
          </div>
        </div>

        {/* Job Description - Full Width */}
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
            Job Description
          </label>
          <textarea
            {...register("jobDescription", {
              required: "Job description is required",
              minLength: {
                value: 30,
                message: "Job description must be at least 30 characters long",
              },
            })}
            rows={4}
            className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
          />
          {errors.jobDescription && (
            <p className="tw-mt-1 tw-text-sm tw-text-red-600">
              {errors.jobDescription.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="tw-flex tw-justify-center">
          <button
            type="submit"
            className="tw-px-6 tw-py-2 tw-bg-blue-600 tw-text-white tw-rounded-lg hover:tw-bg-blue-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-offset-2"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};
