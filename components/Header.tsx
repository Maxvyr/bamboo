import React from 'react';
import { Bot, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex items-center justify-between border-b border-gray-800 bg-[#09090b]/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#ff5c00] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,92,0,0.3)]">
          <Bot className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white brand-font leading-none">
            BANGBOO<span className="text-[#ff5c00]">.FACTORY</span>
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">
            Neural Construction Protocol
          </p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-mono text-gray-400">SYSTEM ONLINE</span>
      </div>
    </header>
  );
};

export default Header;
