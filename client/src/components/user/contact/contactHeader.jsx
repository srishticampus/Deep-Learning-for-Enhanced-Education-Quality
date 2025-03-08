import React from 'react';
import { Headphones, MessageCircle, Clock } from 'lucide-react';
import ContactHeaderImg from "../../../assets/png/contact-bg.png";
export const ContactHeader = () => {
  return (
    <div style={{backgroundImage: `url(${ContactHeaderImg})`}} className="tw-min-h-screen tw-bg-no-repeat tw-bg-cover tw-py-16 tw-px-4">
      <div className="tw-max-w-6xl tw-mt-32 tw-mx-auto tw-text-center">
        <h1 className="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-[#2B3674] tw-mb-4">
          Contact Us
        </h1>
        
        <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-blue-600 tw-mb-6">
          We're Here to Help!
        </h2>
        
        <p className="tw-text-lg tw-text-gray-700 tw-max-w-3xl tw-mx-auto tw-mb-12">
          We'd love to hear from you! Whether it's a query, feedback, or assistance, feel free to connect with us anytime.
          Our team is here to assist you every step of the way. Reach out and let us help you!
        </p>

       
      </div>
    </div>
  );
};
