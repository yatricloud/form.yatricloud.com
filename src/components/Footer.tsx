import React from 'react';
import { FooterProps } from '../types/survey';
import { Linkedin } from 'lucide-react';

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`w-full py-6 px-4 border-t border-github-border ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-400">
          © 2025 Yatri Cloud. All rights reserved.
        </p>
        {/* <a
          href="https://linkedin.com/company/yatri-cloud"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#0a66c2] hover:bg-[#0a66c2]/90 text-white rounded-lg transition-colors duration-300"
        >
          <Linkedin size={20} />
          <span>Follow on LinkedIn</span>
        </a> */}
      </div>
    </footer>
  );
};