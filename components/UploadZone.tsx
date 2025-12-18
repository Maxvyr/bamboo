import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect, disabled }) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (disabled) return;
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        onFileSelect(e.dataTransfer.files[0]);
      }
    },
    [onFileSelect, disabled]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`relative group border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
        disabled
          ? 'border-gray-700 bg-gray-900/50 cursor-not-allowed opacity-50'
          : 'border-gray-600 bg-gray-900/50 hover:border-[#ff5c00] hover:bg-[#ff5c00]/5 cursor-pointer'
      }`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className={`p-4 rounded-full transition-colors duration-300 ${disabled ? 'bg-gray-800' : 'bg-gray-800 group-hover:bg-[#ff5c00]/20'}`}>
          <Upload className={`w-8 h-8 ${disabled ? 'text-gray-600' : 'text-gray-400 group-hover:text-[#ff5c00]'}`} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white brand-font mb-2">Upload Source Image</h3>
          <p className="text-sm text-gray-400 max-w-xs mx-auto">
            Drop your photo here, or click to browse. We'll extract the style and create your custom Bangboo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
