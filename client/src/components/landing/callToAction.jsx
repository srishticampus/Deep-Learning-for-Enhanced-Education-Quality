import React from "react";
import { Link } from "react-router-dom";

export const CallToAction = () => {
  return (
    <section className="tw-py-24 tw-px-4 tw-text-center">
      <div className="tw-max-w-4xl tw-mx-auto">
        <h2 className="tw-text-xl md:tw-text-xl  tw-text-gray-900 tw-mb-6">
          Unlock endless career opportunities, our platform connects you{" "}
          <span className="tw-font-bold">with top employers</span>, personalized
          job recommendations, and tools to help you stand out. Don't wait—your
          next{" "}
          <span className="tw-font-bold">
            big opportunity is just a click away!
          </span>
        </h2>

        <Link to='/user/about'>
          <button className="tw-mt-8 tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-py-3 tw-px-8 tw-rounded-lg tw-inline-flex tw-items-center group tw-transition-all tw-text-lg">
            Learn more
            <svg
              className="tw-w-5 tw-h-5 tw-ml-2 group-hover:tw-translate-x-1 tw-transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>
    </section>
  );
};
