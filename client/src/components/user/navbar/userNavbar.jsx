import {  LogOut, Star } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IS_LEXI_USER_LOGGED_IN } from "../../../constants/constants";
import { useUserData } from "../../../hooks/useUserData";
import { BACKEND_URL } from "../../../apis/axiosInstance";
export const UserNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useUserData();
  const [expandDD, setExpandDD] = useState(false);
  let activePage = location.pathname.split("/")[2];

  const navigatePage = (page) => {
    navigate(`/user/${page}`);
  };

  const expandProfileDD = () => {
    setExpandDD(!expandDD);
  };
  return (
    <nav className="tw-container tw-mx-auto tw-px-16 tw-py-4">
      <div className="tw-flex tw-justify-between tw-items-center">
        <div
          className="tw-cursor-pointer tw-flex tw-items-center tw-space-x-2"
          onClick={() => navigatePage("home")}
        >
          <Star className="tw-h-6 tw-w-6 tw-text-blue-600" />
          <span className="tw-text-xl tw-font-bold tw-text-gray-800">
            Lexsi
          </span>
        </div>
        <div className="tw-cursor-pointer tw-font-medium tw-flex tw-container tw-space-x-5 tw-w-6/12 tw-justify-around">
          <div onClick={() => navigatePage("home")}>
            {" "}
            <span
              className={`${
                !activePage && "tw-text-lexiBlue-500 tw-underline"
              }`}
            >
              Home{" "}
            </span>
          </div>
          <div
            className="tw-cursor-pointer"
            onClick={() => {
              navigatePage("jobs");
            }}
          >
            <span
              className={`${
                activePage === "jobs" && "tw-text-lexiBlue-500 tw-underline"
              }`}
            >
              Jobs{" "}
            </span>
          </div>
          <div
            className="tw-cursor-pointer"
            onClick={() => {
              navigatePage("application-status");
            }}
          >
            <span
              className={`${
                activePage === "application-status" && "tw-text-lexiBlue-500 tw-underline"
              }`}
            >
              Application Status{" "}
            </span>
          </div>
          <div
            className="tw-cursor-pointer"
            onClick={() => {
              navigatePage("about");
            }}
          >
            {" "}
            <span
              className={`${
                activePage === "about" && "tw-text-lexiBlue-500 tw-underline"
              }`}
            >
              About{" "}
            </span>
          </div>
          <div
            className="tw-cursor-pointer"
            onClick={() => {
              navigatePage("contact");
            }}
          >
            {" "}
            <span
              className={`${
                activePage === "contact" && "tw-text-lexiBlue-500 tw-underline"
              }`}
            >
              Contact{" "}
            </span>
          </div>
        </div>
        <div
          className="tw-relative tw-inline-block tw-text-left"
          onClick={expandProfileDD}
        >
          {/* <Bell className="tw-mr-2" /> */}

          <div>
            <button
              type="button"
              className="tw-inline-flex tw-justify-between tw-items-center tw-min-w-40 tw-rounded-md tw-border tw-border-gray-300 tw-shadow-sm tw-px-4 tw-py-2 tw-bg-white tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-indigo-500"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={(e) => {
                e.currentTarget.setAttribute("aria-expanded", "true");
              }}
            >
              <img className="tw-w-10 tw-h-10" src={`${BACKEND_URL}/${userData?.profile_image}`} alt="profile photo"/>
              <span> Hi, {userData?.username} </span>
            </button>
          </div>
          {expandDD && (
            <div
              className="tw-origin-top-right tw-absolute tw-right-0 tw-mt-2 tw-w-40 tw-rounded-md tw-shadow-lg tw-bg-white tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="tw-py-1" role="none">
                <span
                  className="tw-cursor-pointer tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-100 hover:tw-text-gray-900"
                  role="menuitem"
                  onClick={() => navigatePage("profile")}
                >
                  Profile
                </span>
                <div
                  className="tw-flex tw-px-4 tw-cursor-pointer tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-100 hover:tw-text-gray-900"
                  role="menuitem"
                  onClick={() => {
                    console.log('test ')
                    localStorage.removeItem(IS_LEXI_USER_LOGGED_IN);
                    navigatePage("signin");
                  }}
                >
                  <LogOut size={16} className="tw-mr-2" />
                  Log out
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
