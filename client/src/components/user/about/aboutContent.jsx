import React from "react";
import aboutSocial from "../../../assets/png/about-social.png";
import aboutVisionImg from "../../../assets/png/about-vision.png";
export const AboutContent = () => {
  return (
    <>
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-16">
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-12 tw-items-center">
          {/* Image Section */}
          <div className="tw-relative tw-rounded-[2.5rem] tw-overflow-hidden tw-shadow-xl">
            <img
              src={aboutSocial}
              alt="Team meeting discussing career opportunities"
              className="tw-w-full tw-h-[340px] tw-object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="tw-space-y-6">
            <h1 className="tw-text-4xl lg:tw-text-5xl tw-font-bold">
              <span className="tw-text-[#2B3674]">About Us – </span>
              <span className="tw-text-blue-600">
                Empowering Your Career Journey
              </span>
            </h1>

            <p className="tw-text-lg tw-text-gray-700 tw-leading-relaxed">
              At Lexsi, we are dedicated to connecting talented individuals with
              exceptional opportunities. Our platform is designed to simplify
              job searching by offering personalized recommendations, an
              intuitive interface, and tools to help you stand out. Whether
              you're just starting your career or looking to take the next big
              step, we're here to guide you every step of the way.
            </p>
          </div>
        </div>
      </div>

      <div className="tw-w-full tw-mx-auto tw-px-0 tw-py-16">
        <img src={aboutVisionImg} alt="about-vision" />
      </div>
    </>
  );
};
