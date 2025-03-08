import React, { useState } from 'react';
import { APPLICATION_STATUS } from '../../../constants/constants';

export const ApplicationBtnContainer = ({activeType, changeActivetype}) => {
  
  return (
    <div className="tw-min-h-20 tw-bg-gray-50 tw-flex tw-items-center tw-justify-center tw-p-6">
      <div className="tw-bg-white tw-rounded-full tw-p-2 tw-flex tw-gap-2 tw-shadow-sm">
        <button
          onClick={() => changeActivetype(APPLICATION_STATUS.PENDING)}
          className={`tw-px-6 tw-py-3 tw-rounded-full tw-text-base ${
            activeType === APPLICATION_STATUS.PENDING
              ? 'tw-bg-blue-600 tw-text-white'
              : 'tw-text-gray-600 hover:tw-bg-gray-100'
          } tw-transition-all tw-duration-200`}
        >
          Pending
        </button>
        <button
          onClick={() => changeActivetype(APPLICATION_STATUS.TECHNIAL_INTERVIEW)}
          className={`tw-px-6 tw-py-3 tw-rounded-full tw-text-base ${
            activeType === APPLICATION_STATUS.TECHNIAL_INTERVIEW
              ? 'tw-bg-blue-600 tw-text-white'
              : 'tw-text-gray-600 hover:tw-bg-gray-100'
          } tw-transition-all tw-duration-200`}
        >
          Shortlisted
        </button>
        <button
          onClick={() => changeActivetype(APPLICATION_STATUS.TECHNIAL_INTERVIEW_COMPLETED)}
          className={`tw-px-6 tw-py-3 tw-rounded-full tw-text-base ${
            activeType === APPLICATION_STATUS.TECHNIAL_INTERVIEW_COMPLETED
              ? 'tw-bg-blue-600 tw-text-white'
              : 'tw-text-gray-600 hover:tw-bg-gray-100'
          } tw-transition-all tw-duration-200`}
        >
          Interview Completed
        </button>
        <button
          onClick={() => changeActivetype(APPLICATION_STATUS.HIRED)}
          className={`tw-px-6 tw-py-3 tw-rounded-full tw-text-base ${
            activeType === APPLICATION_STATUS.HIRED
              ? 'tw-bg-blue-600 tw-text-white'
              : 'tw-text-gray-600 hover:tw-bg-gray-100'
          } tw-transition-all tw-duration-200`}
        >
          Hired
        </button>
        <button
          onClick={() => changeActivetype(APPLICATION_STATUS.REJECTED)}
          className={`tw-px-6 tw-py-3 tw-rounded-full tw-text-base ${
            activeType === APPLICATION_STATUS.REJECTED
              ? 'tw-bg-blue-600 tw-text-white'
              : 'tw-text-gray-600 hover:tw-bg-gray-100'
          } tw-transition-all tw-duration-200`}
        >
          Rejected
        </button>
      </div>
    </div>
  );
}
