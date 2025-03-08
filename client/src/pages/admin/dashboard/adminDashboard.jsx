import React, { act, useState } from "react";
import { AdminSidebar } from "./sidebar";
import { AdminOverview } from "../overview/overview";
import { AddCompany } from "../company/addCompany";
import { ViewCompanies } from "../company/viewCompany";
import { AddJob } from "../job/addJob";
import { ViewJobs } from "../job/viewJobs";
import { CandidatesList } from "../candidates/viewCandidates";
import { ViewApplications } from "../viewApplications/viewApplications";

export const AdminDashboard = () => {
  const [activeItem, setActiveItem] = useState("Overview");
  const [activeSubItem, setActiveSubItem] = useState("");

  const changeActiveItem = (newItem) => {
    setActiveItem(newItem);
    setActiveSubItem("");
  };
  const changeActiveSubItem = (newItem, newSubItem) => {
    setActiveItem(newItem);
    setActiveSubItem(newSubItem);
  };
  const renderContent = () => {
    const actualPage = activeSubItem || activeItem;
    switch (actualPage) {
      case "Overview":
        return <AdminOverview />;
      case "Add Company":
        return <AddCompany changeActiveSubItem={changeActiveItem} />;
      case "View Company":
        return <ViewCompanies />;
      case "Add Job":
        return <AddJob changeActiveSubItem={changeActiveItem} />;
      case "View Job":
        return <ViewJobs />;
      case "Candidates":
        return <CandidatesList />;
      case "Applications":
        return <ViewApplications />;
      default:
        return <AdminOverview />;
    }
  };
  return (
    <div className="tw-flex tw-h-screen tw-bg-gray-50">
      <AdminSidebar
        activeItem={activeItem}
        activeSubItem={activeSubItem}
        changeActiveItem={changeActiveItem}
        changeActiveSubItem={changeActiveSubItem}
      />
      <div className="tw-flex-1 tw-overflow-x-hidden">{renderContent()}</div>
    </div>
  );
};
