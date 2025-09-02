import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 bg-slate-900 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <span>by Ousama Abou Khalil </span>
          </div>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>© 2025 Ousama Abou Khalil.</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;