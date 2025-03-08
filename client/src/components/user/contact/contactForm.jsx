import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comments: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted Succesfully");
    setFormData({
      name: "",
      email: "",
      comments: "",
    });

    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="tw-max-w-6xl tw-mx-auto tw-px-4 tw-py-16 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-12">
      {/* Form Section */}
      <div className="tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-8">
        <h2 className="tw-text-2xl tw-font-bold tw-text-[#2B3674] tw-mb-6">
          Get in Touch
        </h2>
        <form onSubmit={handleSubmit} className="tw-space-y-6">
          <div>
            <label
              htmlFor="name"
              className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-transition-colors"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1"
            >
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-transition-colors"
              required
            />
          </div>

          <div>
            <label
              htmlFor="comments"
              className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1"
            >
              Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="4"
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-transition-colors"
              required
            ></textarea>
          </div>

          <div className="tw-flex tw-justify-center">
            <button
              type="submit"
              className="tw-mx-auto tw-w-4/12  tw-bg-blue-600 tw-text-white tw-py-3 tw-px-6 tw-rounded-full tw-font-semibold hover:tw-bg-blue-700 tw-transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Contact Information Section */}
      <div className="tw-space-y-20">
        <div className="tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-6 tw-flex tw-items-center tw-gap-4">
          <div className="tw-bg-blue-50 tw-p-3 tw-rounded-full">
            <Phone className="tw-w-6 tw-h-6 tw-text-blue-600" />
          </div>
          <div>
            <p className="tw-text-lg tw-font-semibold tw-text-[#2B3674]">
              +91 1234123423
            </p>
            <p className="tw-text-gray-600">
              Available Monday to Friday,
              <br />9 AM - 6 PM
            </p>
          </div>
        </div>

        <div className="tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-6 tw-flex tw-items-center tw-gap-4">
          <div className="tw-bg-blue-50 tw-p-3 tw-rounded-full">
            <Mail className="tw-w-6 tw-h-6 tw-text-blue-600" />
          </div>
          <div>
            <p className="tw-text-lg tw-font-semibold tw-text-[#2B3674]">
              lexsi.job@gmail.com
            </p>
            <p className="tw-text-gray-600">
              We will respond within 24 hours on weekdays.
            </p>
          </div>
        </div>

        <div className="tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-6 tw-flex tw-items-center tw-gap-4">
          <div className="tw-bg-blue-50 tw-p-3 tw-rounded-full">
            <MapPin className="tw-w-6 tw-h-6 tw-text-blue-600" />
          </div>
          <div>
            <p className="tw-text-lg tw-font-semibold tw-text-[#2B3674]">
              Lexsi Headquarters
            </p>
            <p className="tw-text-gray-600">1234 Avenue, Suite 567</p>
          </div>
        </div>
      </div>
    </div>
  );
};
