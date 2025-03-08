import React from 'react';

export const WhyChooseUs = () => {
  const reasons = [
    {
      number: '1',
      title: 'Personalized Job Matches:',
      description: 'We understand your unique skills and career goals, offering tailored recommendations to save you time and effort.'
    },
    {
      number: '2',
      title: 'Verified Listings:',
      description: 'Every job post is carefully screened to ensure reliability and relevance, so you can apply with confidence.'
    },
    {
      number: '3',
      title: 'Seamless Experience:',
      description: 'From an intuitive interface to real-time updates, we make job searching as smooth and efficient as possible.'
    },
    {
      number: '4',
      title: 'Comprehensive Features',
      description: 'Build your resume, track applications, and receive job alerts—all in one place.'
    },
    {
      number: '5',
      title: 'Trusted by Thousands:',
      description: 'Join a growing community of professionals who’ve successfully found jobs through our platform.'
    },
  ];

  return (
    <div className="tw-bg-gradient-to-b tw-from-gray-50 tw-to-white">
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-20">
        {/* Main Title */}
        <h2 className="tw-text-4xl lg:tw-text-5xl tw-font-bold tw-text-[#2B3674] tw-mb-16 tw-text-center">
          Why Choose Us?
        </h2>

        {/* Reasons Grid */}
        <div className="tw-space-y-16">
          {reasons.map((reason, index) => (
            <div key={index} className="tw-flex tw-flex-col md:tw-flex-row tw-items-start tw-gap-8">
              {/* Number */}
              <div className="tw-flex-shrink-0">
                <div className="tw-w-12 tw-h-12 tw-rounded-full tw-bg-blue-600 tw-flex tw-items-center tw-justify-center">
                  <span className="tw-text-xl tw-font-bold tw-text-white">{reason.number}</span>
                </div>
              </div>

              {/* Content */}
              <div className="tw-space-y-4">
                <h3 className="tw-text-2xl lg:tw-text-3xl tw-font-bold tw-text-[#2B3674]">
                  {reason.title}
                </h3>
                <p className="tw-text-lg tw-text-gray-700 tw-leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="tw-absolute tw-left-0 tw-transform tw--translate-x-1/2">
          <div className="tw-grid tw-grid-cols-3 tw-gap-2">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-blue-500 tw-opacity-20"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
