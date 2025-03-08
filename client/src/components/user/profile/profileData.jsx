import React, { useState } from "react";
import { Pencil, Phone, Mail, FileText, Briefcase, Clock } from "lucide-react";
import { EditProfile } from "./editProfile";
import { useUserData } from "../../../hooks/useUserData";
import { BACKEND_URL } from "../../../apis/axiosInstance";

export const ProfileData = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [profileData, setProfileData] = useState({
  //   name: "Ashika A S",
  //   email: "ashika.as@gmail.com",
  //   phone: "+91 1234567890",
  //   skills: ["UI Design", "UX Design", "Product Design"],
  //   experience: "2+ Years",
  //   resume: "resume.pdf",
  // });

  const profileData = useUserData();
  console.log("prof dat", profileData);
  const handleEditProfile = (updatedData) => {
    setProfileData(updatedData);
    setIsEditModalOpen(false);
  };

  return (
    <div className="tw-max-w-4xl tw-mx-auto tw-p-6">
      <div className="tw-bg-white tw-rounded-2xl tw-shadow-sm tw-p-8">
        <div className="tw-flex tw-justify-between tw-items-start">
          <div className="tw-flex tw-gap-6 tw-items-center">
            <div className="tw-relative">
              <img
                className="tw-w-24 tw-h-24 tw-rounded-full tw-object-cover"
                src={`${BACKEND_URL}/${profileData?.profile_image}`}
                alt="profile photo"
              />

              {/* <div className="tw-absolute tw-bottom-0 tw-right-0 tw-bg-blue-600 tw-text-white tw-p-1 tw-rounded-full">
                <Pencil className="tw-w-4 tw-h-4" />
              </div> */}
            </div>

            <div>
              <div className="tw-flex tw-items-center tw-gap-3">
                <h1 className="tw-text-2xl tw-font-semibold tw-text-gray-900">
                  {profileData?.username}
                </h1>
                {/* <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="tw-p-2 tw-text-gray-500 hover:tw-text-gray-700 hover:tw-bg-gray-100 tw-rounded-full tw-transition-colors"
                >
                  <Pencil className="tw-w-4 tw-h-4" />
                </button> */}
              </div>

              <div className="tw-flex tw-flex-col tw-gap-2 tw-mt-3">
                <div className="tw-flex tw-items-center tw-gap-2 tw-text-gray-600">
                  <Phone className="tw-w-4 tw-h-4" />
                  <span>{profileData?.phone_number}</span>
                </div>
                <div className="tw-flex tw-items-center tw-gap-2 tw-text-gray-600">
                  <Mail className="tw-w-4 tw-h-4" />
                  <span>{profileData?.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="tw-bg-gray-50 tw-p-4 tw-ms-10 tw-rounded-xl">
            <h2 className="tw-font-medium tw-text-gray-900 tw-mb-4">
              Personal Info
            </h2>
            <div className="tw-space-y-3">
              <div className="tw-flex tw-items-center tw-gap-2 tw-text-gray-600">
                <FileText className="tw-w-4 tw-h-4" />
                <a
                  target="_blank"
                  href={`${BACKEND_URL}/${profileData?.resume}`}
                  className="tw-text-blue-600 hover:tw-underline"
                >
                  <span>Resume: </span>
                  Resume.pdf
                </a>
              </div>
              <div className="tw-flex tw-items-center tw-gap-2 tw-text-gray-600">
                <Briefcase className="tw-w-4 tw-h-4" />
                <span>Skills: {profileData?.skills}</span>
              </div>
        
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditProfile
          profileData={profileData}
          onSave={handleEditProfile}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};
