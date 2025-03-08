import LikeIcon from "../../assets/svg/like.svg";
import StartIcon from "../../assets/svg/star.svg";
import VerifyIcon from "../../assets/svg/verify.svg";
import { PrimaryButton } from "../../components/ui/buttons/primaryBtn";
import { SecondaryButton } from "../../components/ui/buttons/secondaryBtn";
import headerGirl from "../../assets/png/header-girl.png";
import { Link } from "react-router-dom";

export const LandingHeader = () => {
  return (
    <div className="tw-container tw-mx-auto tw-px-16 tw-py-16">
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-12 tw-items-center">
        <div>
          <div className="tw-inline-block tw-border-2 tw-border-spacing-1 tw-border-lexiBlue-500 tw-px-4 tw-py-2 tw-text-lexiBlue-800 tw-rounded-full tw-mb-6">
            <span className="tw-flex  tw-font-medium tw-space-x-5">
              <img src={StartIcon} alt="star icon" />
              <span>Your Career Starts Here!</span>
            </span>
          </div>
          <h1 className="tw-text-5xl tw-font-bold tw-text-lexiBlue-800 tw-mb-6">
            Find Your Dream
            <br />
            <span className="tw-text-blue-600">Job Today</span>
          </h1>
          <p className="tw-text-gray-600 tw-text-lg tw-mb-8">
            Explore thousands of job opportunities from trusted employers.
            Whether you're starting your journey or looking for the next big
            step, we've got you covered.
          </p>

          {/* Button container  */}
          <div className="tw-space-x-4 tw-p-2 tw-rounded-lg  tw-flex tw-items-center">
            <Link to='/user/signup'>
              <PrimaryButton text="Register Now" />
            </Link>
            <Link to='/user/about'>
              <SecondaryButton text="Learn More" />
            </Link>
          </div>
        </div>

        <div className="tw-relative">
          <div className="tw-flex tw-justify-center">
            <img
              src={headerGirl}
              alt="Professional woman working"
              className="tw-rounded-2xl  tw-w-8/12"
            />
          </div>

          {/* Floating Cards */}
          <div className="tw-absolute -tw-top-4 -tw-left-4 tw-bg-white tw-p-2 tw-rounded-lg tw-shadow-lg">
            <div className="tw-flex tw-items-center tw-space-x-2">
              <span className="tw-h-10 tw-w-10 p-3 tw-rounded-full  tw-items-center tw-flex tw-justify-center tw-bg-lexiBlue-500">
                <img className=" tw-h-6 tw-w-6 " src={VerifyIcon} alt="like" />
              </span>
              <span className="tw-text-sm tw-font-medium">
                Fast, Easy and Free to Register!
              </span>
            </div>
          </div>
          <div className="tw-absolute tw-top-60 tw-left-4 tw-bg-white tw-p-2 tw-rounded-lg tw-shadow-lg">
            <div className="tw-flex tw-items-center tw-space-x-2">
              <span className="tw-h-8 tw-w-10 p-3 tw-rounded-full  tw-items-center tw-flex tw-justify-center tw-bg-lexiBlue-500">
                <img className=" tw-h-5 tw-w-5 " src={StartIcon} alt="like" />
              </span>
              <span className="tw-text-sm tw-font-medium">
                Search Thousands of Verified Listings
              </span>
            </div>
          </div>

          <div className="tw-absolute -tw-bottom-4 -tw-right-4 tw-bg-white tw-p-2 tw-rounded-lg tw-shadow-lg">
            <div className="tw-flex tw-items-center tw-space-x-2">
              <span className="tw-h-10 tw-w-10 p-3 tw-rounded-full  tw-items-center tw-flex tw-justify-center tw-bg-lexiBlue-500">
                <img className=" tw-h-6 tw-w-6 " src={LikeIcon} alt="like" />
              </span>
              <span className="tw-text-sm tw-font-medium">
                Trusted by Thousands of Job Seekers!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
