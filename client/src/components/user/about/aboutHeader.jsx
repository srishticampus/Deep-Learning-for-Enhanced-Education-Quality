import headerGirl from "../../../assets/png/young-man.png";
import blueStar from "../../../assets/png/blue-star.png";

export const AboutHeader = () => {
  return (
    <div className="tw-container tw-mx-auto tw-px-16 tw-py-16">
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-12 tw-items-center">
        <div>
          <div className="tw-inline-block  tw-py-2 tw-text-lexiBlue-800 tw-rounded-full tw-mb-6">
            <span className="tw-flex tw-text-2xl  tw-font-medium tw-space-x-5">
              About Us
            </span>
          </div>
          <h1 className="tw-text-4xl tw-font-bold tw-text-blue-600 tw-mb-6">
            "Your Trusted Partner in Career
            <br />
            <span className="tw-text-blue-600">Growth"</span>
          </h1>
          <p className="tw-text-gray-600 tw-text-lg tw-mb-8">
            To empower individuals by simplifying the job search process and
            providing personalized tools to achieve career success, while
            fostering a reliable and efficient ecosystem for employers and job
            seekers alike.
          </p>

         
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

          <div className="tw-absolute -tw-top-10 tw-left-96 tw-bg-white tw-p-2 tw-rounded-lg ">
            <img src={blueStar} alt="bluestar" />
          </div>

          <div className="tw-absolute -tw-bottom-4 -tw-right-4 tw-bg-white tw-p-2 tw-rounded-lg">
            <img src={blueStar} alt="bluestar" />
          </div>
        </div>
      </div>
    </div>
  );
};
