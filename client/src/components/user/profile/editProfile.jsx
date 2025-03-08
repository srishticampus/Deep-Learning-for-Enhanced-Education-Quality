import React, { useState } from 'react';
import { X } from 'lucide-react';

export const EditProfile = ({ profileData, onSave, onClose }) => {
  const [formData, setFormData] = useState(profileData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:  value
    }));
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-bg-black/50 tw-flex tw-items-center tw-justify-center tw-z-50">
      <div className="tw-bg-white tw-rounded-2xl tw-p-6 tw-w-full tw-max-w-md">
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
          <h2 className="tw-text-xl tw-font-semibold tw-text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="tw-p-2 tw-text-gray-500 hover:tw-text-gray-700 hover:tw-bg-gray-100 tw-rounded-full tw-transition-colors"
          >
            <X className="tw-w-5 tw-h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="tw-space-y-4">
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.username}
              onChange={handleChange}
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            />
          </div>

          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            />
          </div>

          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone_number}
              onChange={handleChange}
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            />
          </div>

          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
              Skills 
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500"
            />
          </div>


          <div className="tw-flex tw-gap-3 tw-mt-6">
            <button
              type="submit"
              className="tw-flex-1 tw-bg-blue-600 tw-text-white tw-py-2 tw-px-4 tw-rounded-lg hover:tw-bg-blue-700 tw-transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="tw-flex-1 tw-bg-gray-100 tw-text-gray-700 tw-py-2 tw-px-4 tw-rounded-lg hover:tw-bg-gray-200 tw-transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
