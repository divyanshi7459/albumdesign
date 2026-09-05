import React, { useState } from "react";
import { WeddingStyle, AlbumSpread } from "../../types/album";
import { STYLE_THEMES } from "../../assets/indianWeddingAssets";
import { LayoutEngine } from "../../services/layoutEngine";
import { BookOpen, Sparkles, X, CheckCircle2 } from "lucide-react";

interface StorybookModalProps {
  onGenerateAlbum: (spreads: AlbumSpread[]) => void;
  onClose: () => void;
}

export const StorybookModal: React.FC<StorybookModalProps> = ({ onGenerateAlbum, onClose }) => {
  const [spreadCount, setSpreadCount] = useState<10 | 20 | 30>(10);
  const [style, setStyle] = useState<WeddingStyle>("Royal Indian Wedding");
  const [coupleNames, setCoupleNames] = useState("Aarav & Ananya");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedSpreads = LayoutEngine.generateFullAlbum({
        spreadCount,
        style,
        albumTitle: `${coupleNames} - Shubh Vivah`,
      });
      onGenerateAlbum(generatedSpreads);
      setIsGenerating(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 select-none animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#181a20] border border-white/15 rounded-xl shadow-2xl overflow-hidden text-zinc-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#14161b]">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-serif text-base text-zinc-100 font-bold">
                Generate Full Wedding Storybook Album
              </h3>
              <p className="text-xs text-zinc-400">
                Create a cohesive, print-ready multi-spread album across the entire wedding celebration.
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 text-xs">
          {/* Couple Names */}
          <div>
            <label className="font-semibold text-zinc-200 block mb-1.5">Couple's Names / Album Title</label>
            <input
              type="text"
              value={coupleNames}
              onChange={(e) => setCoupleNames(e.target.value)}
              placeholder="e.g. Aarav & Ananya"
              className="w-full bg-[#121418] border border-white/15 rounded-lg px-3 py-2 text-zinc-100 text-sm font-serif focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Spread Count (10, 20, 30) */}
          <div>
            <label className="font-semibold text-zinc-200 block mb-1.5">Album Volume Size</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { count: 10, pages: 20, desc: "Essential Highlights" },
                { count: 20, pages: 40, desc: "Classic Royal Album" },
                { count: 30, pages: 60, desc: "Grand Palace Masterpiece" },
              ].map((item) => (
                <button
                  key={item.count}
                  type="button"
                  onClick={() => setSpreadCount(item.count as any)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    spreadCount === item.count
                      ? "bg-amber-500/15 border-amber-400 text-amber-200 ring-1 ring-amber-400"
                      : "bg-[#14161b] border-white/10 hover:border-white/20 text-zinc-400"
                  }`}
                >
                  <div className="font-bold text-sm text-zinc-100">{item.count} Spreads</div>
                  <div className="text-[11px] text-amber-400">{item.pages} Pages (Double)</div>
                  <div className="text-[10px] text-zinc-500 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Wedding Style */}
          <div>
            <label className="font-semibold text-zinc-200 block mb-1.5">Album Design Aesthetic</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as WeddingStyle)}
              className="w-full bg-[#121418] border border-white/15 rounded-lg px-3 py-2 text-zinc-200 text-xs focus:outline-none focus:border-amber-400"
            >
              {Object.keys(STYLE_THEMES).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Event Sequence Preview */}
          <div className="p-3 rounded-lg bg-black/30 border border-white/10 space-y-1.5">
            <span className="font-semibold text-zinc-300 block text-[11px]">
              Coordinated Celebration Sequence:
            </span>
            <div className="flex flex-wrap gap-1.5 text-[10px]">
              {[
                "Haldi",
                "Mehendi",
                "Sangeet",
                "Wedding",
                "Pheras",
                "Reception",
                "Couple Portraits",
                "Family",
                "Bride",
                "Final Page",
              ].map((ev, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-amber-300">
                  {ev}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#14161b] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            <span>{isGenerating ? "Synthesizing Storybook..." : `Generate ${spreadCount}-Spread Storybook`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
