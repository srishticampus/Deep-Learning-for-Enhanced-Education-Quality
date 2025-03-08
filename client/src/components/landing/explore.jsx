import React from 'react';
import {JobCard} from './jobCard';

export const ExploreOpportunities = () => {
  const jobs = [
    {
      job_title: "MERN Developer",
      skills: "Python, Java, SQL, HTML",
      company: "Google",
      location: "Trivandrum, India",
      application_deadline: "20/06/2025",
      salary_range: "12000-48000",
      companyLogo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
    },
    {
      job_title: "Software Developer",
      skills: "Python, Java, SQL, HTML",
      company: "Twitter",
      location: "Trivandrum, India",
      application_deadline: "15/02/2025",
      salary_range: "43000-75000",
      companyLogo: "https://about.twitter.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png"
    },
    {
      job_title: "Python Developer",
      skills: "Python, Java, SQL, HTML",
      company: "Microsoft",
      location: "Trivandrum, India",
      application_deadline: "25/04/2025",
      salary_range: "12000-25000",
      companyLogo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31"
    }
  ];

  return (
    <section className="tw-py-16 tw-px-4 tw-bg-gradient-to-b from-[#F8FAFF] tw-to-white">
      <div className="tw-max-w-6xl tw-mx-auto">
        <div className="tw-text-center tw-mb-16">
          <h2 className="tw-text-4xl tw-font-bold text-[#3B4B7C] tw-mb-4">Explore Opportunities!</h2>
          <p className="tw-text-gray-600 tw-text-lg">Find jobs that match your skills, experience, and career goals.</p>
        </div>
        
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};
