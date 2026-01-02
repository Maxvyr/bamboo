'use client';

import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import UploadZone from '@/components/UploadZone';
import LoadingState from '@/components/LoadingState';
import { AppStatus, GeneratedResult } from '@/types';
import { generateBangbooImage } from '@/services/api';
import { MOOD_OPTIONS, STYLE_OPTIONS } from '@/constants';
import { Download, RefreshCw, Sparkles, ChevronRight, AlertTriangle } from 'lucide-react';

export default function Home() {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>('default');
  const [selectedStyle, setSelectedStyle] = useState<string>('3d');
  const [referenceImageBase64, setReferenceImageBase64] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadReferenceImage = async () => {
      try {
        const response = await fetch('/prompt.png');
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          const match = base64data.match(/^data:(.+);base64,(.+)$/);
          if (match) {
            setReferenceImageBase64(match[2]);
          }
        };
        reader.readAsDataURL(blob);
      } catch (e) {
        console.error("Failed to load reference image", e);
      }
    };
    loadReferenceImage();
  }, []);

  const handleFileSelect = (file: File) => {
    setResult(null);
    setError(null);
    setStatus(AppStatus.IDLE);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setUserImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!userImage) return;

    try {
      setStatus(AppStatus.ANALYZING);
      setError(null);

      const match = userImage.match(/^data:(.+);base64,(.+)$/);
      if (!match) throw new Error("Invalid image data");
      const mimeType = match[1];
      const base64Data = match[2];

      const generatedImageUrl = await generateBangbooImage(
        base64Data,
        mimeType,
        selectedMood,
        selectedStyle,
        referenceImageBase64 || undefined
      );

      setResult({
        imageUrl: generatedImageUrl,
        promptUsed: "Direct Image-to-Image Generation with Style Reference"
      });

      setStatus(AppStatus.COMPLETED);

    } catch (err: unknown) {
      console.error(err);
      setStatus(AppStatus.ERROR);
      const errorMessage = err instanceof Error ? err.message : "Something went wrong during the process. Please try again.";
      setError(errorMessage);
    }
  };

  useEffect(() => {
    if (status === AppStatus.COMPLETED && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [status]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* CRT Overlay Effect */}
      <div className="fixed inset-0 crt-overlay z-40 pointer-events-none mix-blend-overlay opacity-30"></div>

      <Header />
      <LoadingState status={status} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col gap-12">

        {/* Intro Section */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white brand-font uppercase">
            Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5c00] to-orange-400">Bangboo</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Upload any photo and our AI will reconstruct it as a collectible character from the Hollows.
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left Column: Input & Controls */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <h3 className="text-lg font-bold text-gray-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs border border-gray-700">1</span>
                    Input Data
                 </h3>
                 {userImage && (
                    <button
                        onClick={() => setUserImage(null)}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                        Clear Image
                    </button>
                 )}
              </div>

              {!userImage ? (
                <UploadZone onFileSelect={handleFileSelect} />
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-gray-700 group">
                    <img
                        src={userImage}
                        alt="User Input"
                        className="w-full max-h-[400px] object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm p-3 border-t border-gray-700">
                        <p className="text-xs text-center text-gray-300 font-mono truncate">SOURCE_IMG_LOADED.JPG</p>
                    </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-200 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs border border-gray-700">2</span>
                Configuration
              </h3>

              <div className="space-y-4">
                {/* Mood Selection */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Mood</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {MOOD_OPTIONS.map((mood) => (
                      <button
                        key={mood.id}
                        onClick={() => setSelectedMood(mood.id)}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all duration-200 ${
                          selectedMood === mood.id
                            ? 'bg-[#ff5c00] border-[#ff5c00] text-white shadow-[0_0_15px_rgba(255,92,0,0.4)]'
                            : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600 hover:bg-gray-800'
                        }`}
                      >
                        <span className="text-2xl">{mood.icon}</span>
                        <span className="text-xs font-bold uppercase tracking-wide">{mood.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style Selection */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Render Style</label>
                  <div className="grid grid-cols-2 gap-3">
                    {STYLE_OPTIONS.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`p-3 rounded-xl border flex flex-row items-center justify-center gap-3 transition-all duration-200 ${
                          selectedStyle === style.id
                            ? 'bg-[#ff5c00] border-[#ff5c00] text-white shadow-[0_0_15px_rgba(255,92,0,0.4)]'
                            : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600 hover:bg-gray-800'
                        }`}
                      >
                        <span className="text-xl">{style.icon}</span>
                        <span className="text-sm font-bold uppercase tracking-wide">{style.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!userImage || status !== AppStatus.IDLE && status !== AppStatus.COMPLETED && status !== AppStatus.ERROR}
              className={`w-full py-4 rounded-xl font-bold text-lg brand-font uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 ${
                !userImage
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-[#ff5c00] hover:text-white shadow-lg shadow-white/10 hover:shadow-[#ff5c00]/40'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              Start Construction
              <ChevronRight className="w-5 h-5" />
            </button>

             {error && (
                <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-200">{error}</p>
                </div>
            )}
          </div>

          {/* Right Column: Result */}
          <div className="relative min-h-[500px] flex flex-col">
            <h3 className="text-lg font-bold text-gray-200 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs border border-gray-700">3</span>
                Output
            </h3>

            <div className="flex-1 bg-gray-900/50 border border-gray-800 rounded-3xl p-2 relative overflow-hidden group" ref={resultRef}>
                {!result ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 space-y-4">
                        <div className="w-20 h-20 border-2 border-gray-800 rounded-full border-dashed animate-[spin_10s_linear_infinite] opacity-50"></div>
                        <p className="font-mono text-sm tracking-widest uppercase">Waiting for input...</p>
                    </div>
                ) : (
                    <div className="relative w-full h-full flex flex-col">
                         <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                            <img
                                src={result.imageUrl}
                                alt="Generated Bangboo"
                                className="w-full h-auto object-contain"
                            />
                            {/* Stylized Badge */}
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                                <span className="text-xs font-bold text-[#ff5c00] uppercase tracking-widest brand-font">TYPE: EOUS</span>
                            </div>
                         </div>

                         <div className="mt-6 space-y-4 px-2 pb-4">
                             <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = result.imageUrl;
                                        link.download = 'my-bangboo.png';
                                        link.click();
                                    }}
                                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors border border-gray-700"
                                >
                                    <Download className="w-4 h-4" />
                                    Download
                                </button>
                                <button
                                    onClick={handleGenerate}
                                    className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl border border-gray-700 transition-colors"
                                    title="Regenerate with same settings"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                             </div>

                             <div className="bg-black/40 rounded-xl p-4 border border-gray-800/50">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Neural Prompt Analysis</p>
                                <p className="text-xs text-gray-400 font-mono line-clamp-3 hover:line-clamp-none transition-all cursor-help" title="Click to expand">
                                    {result.promptUsed}
                                </p>
                             </div>
                         </div>
                    </div>
                )}
            </div>

            {/* Decoration Elements */}
            <div className="absolute -z-10 top-20 -right-20 w-64 h-64 bg-[#ff5c00]/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-gray-900 mt-12 bg-black">
        <p className="mb-2">POWERED BY GOOGLE GEMINI</p>
        <p className="text-xs opacity-50">Unofficial fan tool. Zenless Zone Zero assets are property of HoYoverse.</p>
      </footer>
    </div>
  );
}
