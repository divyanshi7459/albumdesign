import React, { useState } from "react";
import { AlbumSpread } from "../../types/album";
import { ChevronLeft, ChevronRight, X, Maximize2, Play, Pause, BookOpen } from "lucide-react";

interface FlipbookModalProps {
  spreads: AlbumSpread[];
  initialSpreadIndex: number;
  onClose: () => void;
}

export const FlipbookModal: React.FC<FlipbookModalProps> = ({ spreads, initialSpreadIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialSpreadIndex);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSpread = spreads[currentIndex];

  const handleNext = () => {
    if (currentIndex < spreads.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Auto-play slideshow
  React.useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev >= spreads.length - 1 ? 0 : prev + 1));
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, spreads.length]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-6 select-none animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="w-full max-w-6xl flex items-center justify-between text-zinc-300 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="font-serif text-base text-amber-200">Luxury 3D Album Flipbook Presentation</h3>
            <p className="text-xs text-zinc-400">
              Spread {currentIndex + 1} of {spreads.length} • {currentSpread.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isPlaying ? "bg-amber-500 text-black font-semibold" : "bg-white/10 hover:bg-white/15 text-zinc-300"
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? "Pause" : "Auto-Play"}</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main 3D Book Experience */}
      <div className="relative flex items-center justify-center my-auto w-full max-w-6xl perspective-[2000px]">
        {/* Left Flip Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute -left-4 z-30 p-3 rounded-full bg-black/70 border border-white/20 text-white hover:bg-amber-500 hover:text-black disabled:opacity-20 transition-all shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Physical Leather Wedding Album Simulation */}
        <div className="relative w-full aspect-[2/1] max-w-5xl rounded-lg p-4 bg-[#1e130c] shadow-[0_30px_100px_rgba(0,0,0,0.9)] border-2 border-[#5c3a21] flex items-center justify-center">
          {/* Gold Embossed Album Spine Stitching */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#140b06] border-r border-[#8d5b34]/40 rounded-l-lg" />

          {/* Open Double-Page Spread */}
          <div className="relative w-full h-full bg-[#faf7ef] rounded overflow-hidden shadow-2xl flex">
            {/* Center Spine Crease Fold Shadow */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 bg-gradient-to-r from-black/15 via-black/30 to-black/15 pointer-events-none z-30" />
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-black/40 z-30" />

            {/* Left Page (0 to 50%) */}
            <div className="relative w-1/2 h-full overflow-hidden border-r border-black/10 bg-[#faf7ef]">
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="font-serif text-2xl font-bold tracking-wide text-[#3D0B14]">
                  {currentSpread.event}
                </div>
                <div className="flex-1 my-4 border-2 border-dashed border-amber-600/30 rounded flex items-center justify-center bg-amber-500/5">
                  <span className="text-xs font-serif text-amber-800/60 italic">Royal Wedding Portrait</span>
                </div>
                <div className="text-[11px] font-serif text-zinc-600 italic">Page {currentIndex * 2 + 1}</div>
              </div>
            </div>

            {/* Right Page (50% to 100%) */}
            <div className="relative w-1/2 h-full overflow-hidden bg-[#faf7ef]">
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex-1 my-4 border-2 border-dashed border-amber-600/30 rounded flex items-center justify-center bg-amber-500/5">
                  <span className="text-xs font-serif text-amber-800/60 italic">Ceremonial Moments</span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-xs font-serif text-[#3D0B14] font-medium">{currentSpread.title}</div>
                  <div className="text-[11px] font-serif text-zinc-600 italic">Page {currentIndex * 2 + 2}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Flip Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex === spreads.length - 1}
          className="absolute -right-4 z-30 p-3 rounded-full bg-black/70 border border-white/20 text-white hover:bg-amber-500 hover:text-black disabled:opacity-20 transition-all shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Timeline Strip */}
      <div className="w-full max-w-4xl flex items-center justify-center gap-2 overflow-x-auto py-2">
        {spreads.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentIndex(idx)}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              idx === currentIndex
                ? "bg-amber-500 text-black font-semibold shadow-md"
                : "bg-white/10 text-zinc-400 hover:bg-white/15"
            }`}
          >
            Spread {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
