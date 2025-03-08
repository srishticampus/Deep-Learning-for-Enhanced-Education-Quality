import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="tw-bg-lexiBlue-600 tw-text-white tw-py-8">
      <div className="tw-max-w-6xl tw-mx-auto tw-px-4">
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-8 tw-mb-12">
          {/* Logo and Description */}
          <div className="tw-col-span-1 md:tw-col-span-2">
            <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4">
              <Star className="tw-w-8 tw-h-8 tw-text-blue-400" />
              <span className="tw-text-2xl tw-font-bold">Lexsi</span>
            </div>
            <p className="tw-text-gray-300 tw-mb-6">
              Start your journey to success by exploring roles from top companies today!
            </p>
          </div>

          {/* Navigation Links */}
          <div className="tw-space-y-4">
            <Link to="/" className="tw-block hover:tw-text-blue-400 tw-transition-colors">Home</Link>
            <Link to="/user/jobs" className="tw-block hover:tw-text-blue-400 tw-transition-colors">Jobs</Link>
            <Link to="/user/about" className="tw-block hover:tw-text-blue-400 tw-transition-colors">About</Link>
            <Link to="/user/contact" className="tw-block hover:tw-text-blue-400 tw-transition-colors">Contact</Link>
          </div>

          {/* Legal Links */}
          <div className="tw-space-y-4">
            <a href="#" className="tw-block hover:tw-text-blue-400 tw-transition-colors">Terms of conditions</a>
            <a href="#" className="tw-block hover:tw-text-blue-400 tw-transition-colors">F&Q</a>
            <a href="#" className="tw-block hover:tw-text-blue-400 tw-transition-colors">Privacy policy</a>
          </div>
        </div>

        {/* Copyright and Navigation Arrows */}
        <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center tw-pt-2 tw-border-t tw-border-gray-700">
          <p className="tw-text-gray-400 tw-mb-4 md:tw-mb-0">Copy right © 2025. All rights received</p>
          
        </div>
      </div>
    </footer>
  );
};
