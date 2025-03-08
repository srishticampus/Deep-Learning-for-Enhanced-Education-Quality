import React from 'react';
import { ArrowRight } from 'lucide-react';

export const ApplicationButton = ({ title, subtitle, status, onClick }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'tw-bg-yellow-100 tw-text-yellow-800';
      case 'accepted':
        return 'tw-bg-green-100 tw-text-green-800';
      case 'rejected':
        return 'tw-bg-red-100 tw-text-red-800';
      default:
        return 'tw-bg-gray-100 tw-text-gray-800';
    }
  };

  return (
    <button 
      onClick={onClick}
      className="tw-group tw-flex tw-items-center tw-justify-between tw-w-full tw-p-4 tw-bg-white tw-rounded-xl tw-shadow-sm tw-border tw-border-gray-200 tw-hover:tw-shadow-md tw-hover:tw-border-blue-100 tw-transition-all tw-duration-200"
    >
      <div className="tw-flex tw-flex-col tw-items-start tw-gap-1">
        <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900">{title}</h3>
        <p className="tw-text-sm tw-text-gray-500">{subtitle}</p>
      </div>
      
      <div className="tw-flex tw-items-center tw-gap-3">
        {status && (
          <span className={`tw-px-3 tw-py-1 tw-text-xs tw-font-medium tw-rounded-full ${getStatusColor()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )}
        <ArrowRight className="tw-w-5 tw-h-5 tw-text-gray-400 tw-group-hover:tw-text-blue-500 tw-transition-colors" />
      </div>
    </button>
  );
};

