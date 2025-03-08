import React from "react";
import { Settings, UserCircle, ClipboardList } from "lucide-react";
import { StepCard } from "./stepCard";
import settingsImg from "../../assets/png/settings.png";
import shoppingImg from "../../assets/png/shopping.png";
import userImg from "../../assets/png/user.png";
export const HowItWorks = () => {
  const steps = [
    {
      icon: settingsImg,
      title: "Register Your Account",
      description:
        "Create your free account in minutes. Use your email or social profiles to get started quickly.",
    },
    {
      icon: userImg,
      title: "Upload Your Resume",
      description:
        "Showcase your skills, experience, and career interests to attract the right opportunities.",
    },
    {
      icon: shoppingImg,
      title: "Search and Apply",
      description:
        "Explore personalized job listings tailored to your preferences and apply with a single click.",
    },
  ];

  return (
    <section className="tw-py-16 tw-px-4 tw-bg-gradient-to-b tw-from-white tw-to-gray-50">
      <div className="tw-max-w-6xl tw-mx-auto">
        <div className="tw-text-center tw-mb-16">
          <h2 className="tw-text-4xl tw-font-bold text-[#3B4B7C] tw-mb-4">
            How it Works
          </h2>
          <p className="tw-text-gray-600 tw-text-lg">
            Find the perfect job in just a few steps.
          </p>
        </div>

        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
