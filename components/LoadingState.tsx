import React from 'react';
import { AppStatus } from '../types';
import { Loader2, BrainCircuit, Paintbrush } from 'lucide-react';

interface LoadingStateProps {
  status: AppStatus;
}

const LoadingState: React.FC<LoadingStateProps> = ({ status }) => {
  if (status === AppStatus.IDLE || status === AppStatus.COMPLETED || status === AppStatus.ERROR) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Spinning Rings */}
        <div className="absolute inset-0 border-t-4 border-[#ff5c00] border-r-4 border-r-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-b-4 border-white/20 border-l-4 border-l-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
        
        {/* Icon Center */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-[#ff5c00]/10 to-transparent"></div>
             {status === AppStatus.ANALYZING ? (
                <BrainCircuit className="w-16 h-16 text-[#ff5c00] animate-pulse" />
             ) : (
                <Paintbrush className="w-16 h-16 text-[#ff5c00] animate-bounce" />
             )}
        </div>
      </div>

      <div className="mt-8 text-center space-y-2">
        <h3 className="text-2xl font-bold brand-font text-white uppercase tracking-wider">
            {status === AppStatus.ANALYZING ? 'Analyzing Subject' : 'Constructing Bangboo'}
        </h3>
        <p className="text-gray-400 font-mono text-sm animate-pulse">
            {status === AppStatus.ANALYZING 
                ? 'Extracting features • Calculating topology • Mapping style' 
                : 'Rendering geometry • Applying textures • Final polish'}
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
