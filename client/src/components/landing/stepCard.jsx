import React from "react";

export const StepCard = ({ icon, title, description }) => {
  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-text-center tw-p-6 tw-max-w-sm">
      <div className="tw-w-24 tw-h-24 tw-mb-6 tw-flex tw-items-center tw-justify-center">
        <img
          className="tw-w-16 tw-h-16 tw-text-blue-500"
          src={icon}
          alt="icon"
        />
      </div>
      <h3 className="tw-text-xl tw-font-semibold text-[#3B4B7C] tw-mb-3">
        {title}
      </h3>
      <p className="tw-text-gray-600 tw-leading-relaxed">{description}</p>
    </div>
  );
};
