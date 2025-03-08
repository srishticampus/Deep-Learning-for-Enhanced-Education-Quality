import { MoveRight } from "lucide-react";

export const SecondaryButton = ({ text = "Submit" }) => {
  return (
    <button className="tw-flex tw-space-x-5 tw-bg-white tw-text-black tw-px-6 tw-py-2 tw-rounded-full tw-hover:bg-blue-700 tw-transition-colors">
      <span>{text}</span> <MoveRight />
    </button>
  );
};
