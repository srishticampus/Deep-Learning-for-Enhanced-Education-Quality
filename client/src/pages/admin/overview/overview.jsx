import React, { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  Building2,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { CandidatesList } from "../candidates/viewCandidates";
import { axiosInstance } from "../../../apis/axiosInstance";

export const AdminOverview = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [applications, setAppications] = useState([]);

  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: users.length,
      change: "+12%",
      color: "blue",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      value: jobs.length,
      change: "+5%",
      color: "green",
    },
    {
      icon: Building2,
      label: "Companies",
      value: companies.length,
      change: "+8%",
      color: "purple",
    },
    {
      icon: FileText,
      label: "Applications",
      value: applications.length,
      change: "+15%",
      color: "orange",
    },
  ];

  useEffect(() => {
    getAllUsers();
    getAllJobs();
    getAllCompanies();
    getAllApplications();
  }, []);

  const getAllUsers = async () => {
    try {
      const res = await axiosInstance.get(`users/`);
      if (res.status === 200) {
        const data = res.data || [];
        setUsers(data.reverse());
      }
    } catch (error) {
      console.log("ERROR ON GET ALL USERS", error);
    }
  };
  const getAllJobs = async () => {
    try {
      const res = await axiosInstance.get(`jobs/`);
      if (res.status === 200) {
        const data = res.data || [];
        setJobs(data.reverse());
      }
    } catch (error) {
      console.log("ERROR ON GET ALL jobs", error);
    }
  };
  const getAllCompanies = async () => {
    try {
      const res = await axiosInstance.get(`companies/`);
      if (res.status === 200) {
        const data = res.data || [];
        setCompanies(data.reverse());
      }
    } catch (error) {
      console.log("ERROR ON GET ALL companies", error);
    }
  };
  const getAllApplications = async () => {
    try {
      const res = await axiosInstance.get(`all-applied-jobs/`);
      if (res.status === 200) {
        const data = res.data || [];
        setAppications(data.reverse());
      }
    } catch (error) {
      console.log("ERROR ON GET ALL applications", error);
    }
  };
  return (
    <div className="tw-p-8">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-8">
        <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800">
          Dashboard Overview
        </h1>
        <div className="tw-flex tw-items-center tw-gap-2"></div>
      </div>

      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6 tw-mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-sm"
          >
            <div className="tw-flex tw-justify-between tw-items-start">
              <div>
                <stat.icon
                  className={`tw-w-6 tw-h-6 tw-text-${stat.color}-500 tw-mb-4`}
                />
                <h3 className="tw-text-gray-500 tw-text-sm">{stat.label}</h3>
                <p className="tw-text-2xl tw-font-bold tw-text-gray-800">
                  {stat.value}
                </p>
              </div>
              {/* <div className="tw-flex tw-items-center tw-px-2 tw-py-1 tw-rounded-full tw-bg-green-50 tw-text-green-600 tw-text-sm">
                <TrendingUp className="tw-w-4 tw-h-4 tw-mr-1" />
                {stat.change}
              </div> */}
            </div>
          </div>
        ))}
      </div>
      <CandidatesList title="New Candidates" />

      {/* <div className="tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-sm">
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
          <h2 className="tw-text-xl tw-font-bold tw-text-gray-800">Recent Applications</h2>
          <button className="tw-text-blue-600 hover:tw-text-blue-700 tw-font-medium">View All</button>
        </div>

        <div className="tw-overflow-x-auto">
          <table className="tw-w-full">
            <thead>
              <tr className="tw-border-b tw-border-gray-200">
                <th className="tw-text-left tw-py-3 tw-px-4 tw-text-gray-600">Candidate</th>
                <th className="tw-text-left tw-py-3 tw-px-4 tw-text-gray-600">Position</th>
                <th className="tw-text-left tw-py-3 tw-px-4 tw-text-gray-600">Company</th>
                <th className="tw-text-left tw-py-3 tw-px-4 tw-text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app, index) => (
                <tr key={index} className="hover:tw-bg-gray-50">
                  <td className="tw-py-3 tw-px-4">
                    <div className="tw-flex tw-items-center">
                      <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-gray-200 tw-flex tw-items-center tw-justify-center tw-mr-3">
                        {app.name.charAt(0)}
                      </div>
                      <span className="tw-font-medium tw-text-gray-800">{app.name}</span>
                    </div>
                  </td>
                  <td className="tw-py-3 tw-px-4 tw-text-gray-600">{app.position}</td>
                  <td className="tw-py-3 tw-px-4 tw-text-gray-600">{app.company}</td>
                  <td className="tw-py-3 tw-px-4">
                    <span className={`tw-px-3 tw-py-1 tw-rounded-full tw-text-sm
                      ${app.status === 'Accepted' ? 'tw-bg-green-50 tw-text-green-600' :
                        app.status === 'Rejected' ? 'tw-bg-red-50 tw-text-red-600' :
                        'tw-bg-yellow-50 tw-text-yellow-600'
                      }`}>
                      {app.status}
                    </span>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};
