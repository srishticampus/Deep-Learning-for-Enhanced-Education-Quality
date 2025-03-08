import React, { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Building,
  Briefcase,
  BriefcaseConveyorBelt,
  Users,
  FileText,
  UserCog,
  LogOut,
  ChevronDown,
  ChevronRight,
  Plus,
  Eye,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { successToast } from "../../../utils/showToast";
import { LEXI_ISADMIN_LOGGED_IN } from "../../../constants/constants";
export const AdminSidebar = ({
  activeItem,
  activeSubItem,
  changeActiveItem,
  changeActiveSubItem,
}) => {
  const navigate = useNavigate();
  const [openDropdowns, setOpenDropdowns] = useState({
    company: false,
    jobs: false,
  });

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const handleLogout = () => {
    if (localStorage.getItem(LEXI_ISADMIN_LOGGED_IN)) {
      localStorage.removeItem(LEXI_ISADMIN_LOGGED_IN);
    }
    
    successToast("Logout successful");
    navigate("/admin/signin");
  };
  const menuItems = [
    { icon: LayoutDashboard, text: "Overview", active: true },
    {
      icon: Building2,
      text: "Company",

      hasDropdown: true,
      key: "company",
      subItems: [
        { icon: Building, text: "Add Company" },
        { icon: Eye, text: "View Company" },
      ],
    },
    {
      icon: Briefcase,
      text: "Jobs",
      hasDropdown: true,
      key: "jobs",
      subItems: [
        { icon: BriefcaseConveyorBelt, text: "Add Job" },
        { icon: Eye, text: "View Job" },
      ],
    },
    { icon: Users, text: "Candidates" },
    { icon: FileText, text: "Applications" },
  ];

  return (
    <div className="tw-w-64 tw-bg-white tw-border-r tw-border-gray-200 tw-flex tw-flex-col">
      <div className="tw-p-6">
        <div className="tw-flex tw-justify-center tw-items-center tw-gap-2">
          <Star className="tw-h-6 tw-w-6 tw-text-blue-600" />
          <span className="tw-text-xl tw-font-bold tw-text-gray-800">
            Lexsi{" "}
          </span>
        </div>
      </div>

      <nav className="tw-flex-1 tw-px-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              if (!item.hasDropdown) {
                changeActiveItem(item.text);
              }
            }}
          >
            <div
              onClick={() => item.hasDropdown && toggleDropdown(item.key)}
              className={`tw-flex tw-items-center tw-px-4 tw-py-3 tw-mb-1 tw-rounded-lg tw-cursor-pointer ${
                item.text === activeItem
                  ? "tw-bg-blue-50 tw-text-blue-600"
                  : "tw-text-gray-600 hover:tw-bg-gray-50"
              }
                ${item.hasDropdown ? "tw-justify-between" : ""}`}
            >
              <div className="tw-flex tw-items-center">
                <item.icon className="tw-w-5 tw-h-5 tw-mr-3" />
                <span className="tw-font-medium">{item.text}</span>
              </div>
              {item.hasDropdown &&
                (openDropdowns[item.key] ? (
                  <ChevronDown className="tw-w-4 tw-h-4" />
                ) : (
                  <ChevronRight className="tw-w-4 tw-h-4" />
                ))}
            </div>

            {item.hasDropdown && openDropdowns[item.key] && (
              <div className="tw-ml-7 tw-mb-2">
                {item.subItems.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    onClick={() => {
                      changeActiveSubItem(item.text, subItem.text);
                    }}
                    className={`tw-flex tw-items-center tw-px-4 tw-py-2  tw-rounded-lg tw-cursor-pointer tw-text-sm ${
                      subItem.text === activeSubItem
                        ? "tw-bg-blue-50 tw-text-blue-600"
                        : "tw-text-gray-600 hover:tw-bg-gray-50"
                    }`}
                  >
                    <subItem.icon className="tw-w-4 tw-h-4 tw-mr-3" />
                    <span>{subItem.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="tw-p-4 tw-border-t">
        <div
          onClick={handleLogout}
          className="tw-flex tw-items-center tw-px-4 tw-py-3 tw-text-gray-600 hover:tw-bg-gray-50 tw-rounded-lg tw-cursor-pointer"
        >
          <LogOut className="tw-w-5 tw-h-5 tw-mr-3" />
          <span className="tw-font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
};
