import React, { useState } from "react";
import { X, Sparkles, BookOpen, Layers, Calendar, User, Palette } from "lucide-react";
import { WeddingStyle, WeddingEvent } from "../../types/album";
import { useAlbumStore, DEFAULT_DIMENSIONS } from "../../store/useAlbumStore";

interface NewAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (projectId: string) => void;
}

export const NewAlbumModal: React.FC<NewAlbumModalProps> = ({ isOpen, onClose, onCreated }) => {
  const { createProject } = useAlbumStore();

  const [coupleNames, setCoupleNames] = useState("Karan & Priya");
  const [albumTitle, setAlbumTitle] = useState("Karan & Priya - Shubh Vivah");
  const [style, setStyle] = useState<WeddingStyle>("Royal Indian Wedding");
  const [event, setEvent] = useState<WeddingEvent>("Wedding");
  const [spreadCount, setSpreadCount] = useState<number>(10);
  const [dimensionsName, setDimensionsName] = useState("12x24");

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const id = createProject({
      name: albumTitle,
      coupleNames,
      style,
      event,
      spreadCount,
      dimensions: {
        ...DEFAULT_DIMENSIONS,
        widthInch: dimensionsName === "12x36" ? 36 : 24,
        widthPx: dimensionsName === "12x36" ? 10800 : 7200,
        presetName: dimensionsName === "12x36" ? "12 × 36 inch (Extended Panoramic)" : "12 × 24 inch (Panoramic Spread)",
      },
    });
    onCreated(id);
  };

  const styleOptions: WeddingStyle[] = [
    "Royal Indian Wedding",
    "Rajasthani Royal",
    "Pastel",
    "Traditional Wedding",
    "Luxury Wedding",
    "Floral Wedding",
    "Cinematic Wedding",
    "Modern Wedding",
    "Black & Gold",
    "South Indian",
    "Punjabi",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#141620] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-white">
              Create New Wedding Album
            </h2>
            <p className="text-zinc-400 text-xs">
              Generate a coordinated set of print-ready double spreads
            </p>
          </div>
        </div>

        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Couple Names</label>
              <input
                type="text"
                required
                value={coupleNames}
                onChange={(e) => {
                  setCoupleNames(e.target.value);
                  if (albumTitle.includes("-")) {
                    setAlbumTitle(`${e.target.value} - Shubh Vivah`);
                  }
                }}
                placeholder="Aarav & Ananya"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0c11] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Album Project Title</label>
              <input
                type="text"
                required
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
                placeholder="Aarav & Ananya - Shubh Vivah"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0c11] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Wedding Aesthetic / Theme</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as WeddingStyle)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0c11] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
              >
                {styleOptions.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Initial Spread Count</label>
              <select
                value={spreadCount}
                onChange={(e) => setSpreadCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0c11] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
              >
                <option value={5}>5 Spreads (Highlights Mini-Album)</option>
                <option value={10}>10 Spreads (Standard Ceremony Book)</option>
                <option value={20}>20 Spreads (Full Multi-Day Wedding)</option>
                <option value={30}>30 Spreads (Grand Royal Heirloom Book)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">Book Print Size (300 DPI)</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDimensionsName("12x24")}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  dimensionsName === "12x24"
                    ? "bg-amber-500/15 border-amber-400 text-white"
                    : "bg-[#0b0c11] border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                <div className="font-bold text-amber-300">12 × 24 inch</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Panoramic Double Spread (7200 × 3600 px)</div>
              </button>

              <button
                type="button"
                onClick={() => setDimensionsName("12x36")}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  dimensionsName === "12x36"
                    ? "bg-amber-500/15 border-amber-400 text-white"
                    : "bg-[#0b0c11] border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                <div className="font-bold text-amber-300">12 × 36 inch</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Extended Wide Spread (10800 × 3600 px)</div>
              </button>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-bold text-xs shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>Generate & Open Studio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
