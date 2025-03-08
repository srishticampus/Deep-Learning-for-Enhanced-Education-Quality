import React, { useState } from "react";
import { Eye, EyeOff, UserCircle, Plus } from "lucide-react";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { errorToast, successToast } from "../../../utils/showToast";
import { axiosInstance } from "../../../apis/axiosInstance";
import {
  IS_LEXI_USER_LOGGED_IN,
  LEXI_ISADMIN_LOGGED_IN,
  LEXI_USER_DATA,
  LEXI_USER_ID,
} from "../../../constants/constants";

export const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useAppNavigate();
  const navigateToSignup = () => {
    navigate("/user/signup");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    const myFormData = new FormData();
    const { email, password } = formData;
    myFormData.append("email", email);
    myFormData.append("password", password);
    sendDataToServer(myFormData);
  };

  const sendDataToServer = async (formData) => {
    try {
      const response = await axiosInstance.post("login/", formData);
      if (response.status === 200) {
        const userId = response.data?.user_id;
        if (getUserData(userId)) {
          localStorage.setItem(IS_LEXI_USER_LOGGED_IN, true);
          localStorage.setItem(LEXI_USER_ID, userId);

          if (localStorage.getItem(LEXI_ISADMIN_LOGGED_IN)) {
            localStorage.removeItem(LEXI_ISADMIN_LOGGED_IN);
          }
          successToast("Login successful");
          navigate("/user/home");
        }
      } else {
        errorToast("Login failed");
      }
    } catch (error) {
      console.log("ERROR ON SIGNIN", error);
      const newErrors = error?.response?.data || {};
      for (let key in newErrors) {
        errorToast(newErrors[key]);
        return;
      }
    }
  };

  const getUserData = async (userId) => {
    try {
      const res = await axiosInstance.get(`user/${userId}/`);
      if (res.status === 200) {
        console.log(res.data);
        localStorage.setItem(LEXI_USER_DATA, JSON.stringify(res.data));
        return true;
      }
    } catch (error) {
      console.log("Error ON GET USER DATA", error);
      return false;
    }
  };
  const validateFields = () => {
    const { email, password } = formData;
    if (!email || !password) {
      errorToast("All fields are required");
      return false;
    }
    return true;
  };

  return (
    <section className="tw-py-16 tw-px-4">
      <div className="tw-max-w-md tw-mx-auto">
        <h1 className="tw-text-4xl tw-font-bold text-[#2B3674] tw-text-center tw-mb-12">
          Sign In!
        </h1>

        <form onSubmit={handleSubmit} className="tw-space-y-6">
          {/* Profile Image Upload */}

          {/* Form Fields */}
          <div className="tw-space-y-4">
            <div>
              <label
                htmlFor="email"
                className="tw-block text-[#2B3674] tw-mb-1"
              >
                E-Mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="tw-w-full tw-px-4 tw-py-3 tw-rounded-lg tw-border tw-border-gray-300 focus:tw-border-blue-500 focus:tw-ring-2 focus:tw-ring-blue-200 tw-transition-colors"
                required
              />
            </div>

            <div className="tw-relative">
              <label
                htmlFor="password"
                className="tw-block text-[#2B3674] tw-mb-1"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="tw-w-full tw-px-4 tw-py-3 tw-rounded-lg tw-border tw-border-gray-300 focus:tw-border-blue-500 focus:tw-ring-2 focus:tw-ring-blue-200 tw-transition-colors"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="tw-absolute tw-right-3 tw-top-11 tw-text-gray-500 hover:tw-text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="tw-w-5 tw-h-5" />
                ) : (
                  <Eye className="tw-w-5 tw-h-5" />
                )}
              </button>
              <div
                className="tw-flex tw-justify-end tw-cursor-pointer"
                onClick={() => {
                  navigate("/user/forget-password");
                }}
              >
                <p className="tw-text-lexiBlue-500 tw-font-bold">
                  Forgot password?
                </p>
              </div>
            </div>
          </div>

          <div className="tw-flex tw-flex-col tw-items-center ">
            <button
              type="submit"
              className="tw-w-md tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-font-semibold tw-py-3 tw-px-6 tw-rounded-full tw-transition-colors"
            >
              Sign In
            </button>
            <p className="tw-mt-5">
              Don't have an account?{" "}
              <span
                className="tw-text-lexiBlue-500 tw-font-bold tw-cursor-pointer"
                onClick={navigateToSignup}
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
