import { X } from "lucide-react";
import { useState } from "react";
import { errorToast } from "../../../utils/showToast";

export const ScheduleInterview = ({
  onClose,
  onSubmit,
  interviewType = "Technical",
}) => {
  const [data, setData] = useState({
    dateAndTime: "",
    duration: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.dateAndTime) {
      errorToast("Interview date and time is required");
      return;
    }

    if (!data.duration) {
      errorToast("Interview duration is required.");
      return;
    }
    onSubmit(data)
  };
  return (
    
      <div className="tw-h-screen tw-w-screen  tw-top-0 tw-left-0  tw-z-50 tw-fixed tw-flex tw-justify-center tw-align-center">
        <div className="tw-w-5/12 tw-mx-auto tw-rounded-md tw-shadow-md tw-p-6 tw-bg-white tw-absolute tw-top-10">
          <div className="tw-flex tw-justify-between">
            <h1 className="tw-text-2xl tw-font-bold ">{interviewType}</h1>
            <span className="tw-cursor-pointer" onClick={onClose}>
              <X />
            </span>
          </div>
          <form
            className="tw-flex tw-mt-5 tw-items-start  tw-flex-col "
            onSubmit={handleSubmit}
          >
            <label htmlFor="dateAndTime" className="tw-text-lg">
              Interview Date and time
            </label>
            <input
              type="datetime-local"
              name="dateAndTime"
              className="tw-px-3 tw-rounded-md tw-w-full tw-h-10"
              onChange={handleChanges}
              value={data.dateAndTime}
              min={new Date().toISOString().split("T")[0]}
            />

            <label htmlFor="duration" className=" tw-text-lg tw-mt-3">
              Interview duration (hour)
            </label>
            <input
              name="duration"
              type="number"
              className="tw-px-3 tw-rounded-md tw-w-full tw-h-10"
              placeholder="Interview duration eg: 1 hr"
              onChange={handleChanges}
              value={data.duration}
            />
            <div className="tw-flex tw-items-center tw-justify-center tw-w-full tw-mt-5">
              <button
                type="submit"
                className="tw-bg-lexiBlue-500 tw-text-white tw-border-none tw-rounded-full tw-px-5 tw-py-3"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    
  );
};
