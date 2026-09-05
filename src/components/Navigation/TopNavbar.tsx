import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlbumSpread } from "../../types/album";
import {
  Download,
  BookOpen,
  Eye,
  Share2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileCode,
  FileImage,
  Layers,
  CheckCircle2,
  Home,
  LayoutGrid,
} from "lucide-react";

interface TopNavbarProps {
  spreads: AlbumSpread[];
  currentSpreadIndex: number;
  onSelectSpread: (index: number) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onFitScreen: () => void;
  onExportPNG: (targetDpi: 72 | 150 | 300, transparent?: boolean) => void;
  onExportSVG: () => void;
  onExportJSON: () => void;
  onOpenFlipbook: () => void;
  onOpenProofing: () => void;
  onOpenStorybook: () => void;
  projectName?: string;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  spreads,
  currentSpreadIndex,
  onSelectSpread,
  zoom,
  onZoomChange,
  onFitScreen,
  onExportPNG,
  onExportSVG,
  onExportJSON,
  onOpenFlipbook,
  onOpenProofing,
  onOpenStorybook,
  projectName,
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const currentSpread = spreads[currentSpreadIndex];

  return (
    <header className="h-14 bg-[#14161b] border-b border-white/10 px-4 flex items-center justify-between select-none z-30 text-zinc-200">
      {/* 1. BRAND & TITLE */}
      <div className="flex items-center gap-3">
        {/* Navigation Quick Links */}
        <div className="flex items-center gap-1.5 mr-1">
          <Link
            to="/"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Return to Public Website"
          >
            <Home className="w-4 h-4" />
          </Link>
          <Link
            to="/dashboard"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Studio Projects Dashboard"
          >
            <LayoutGrid className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 flex items-center justify-center shadow-md shadow-amber-500/20">
            <Sparkles className="w-4 h-4 text-black fill-black" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-serif font-bold text-sm tracking-wide text-amber-200">
                ALBUM DESIGN STUDIO
              </span>
              <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono text-[9px] uppercase font-semibold">
                Pro
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-sans leading-none block mt-0.5 truncate max-w-[200px]">
              {projectName || "Indian Wedding Photo Album Generator"}
            </span>
          </div>
        </div>

        <div className="h-5 w-px bg-white/15 mx-1" />

        {/* SPREAD PAGINATION SELECTOR */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-md p-1">
          <button
            onClick={() => onSelectSpread(Math.max(0, currentSpreadIndex - 1))}
            disabled={currentSpreadIndex === 0}
            className="p-1 hover:bg-white/10 rounded disabled:opacity-30 disabled:hover:bg-transparent"
            title="Previous Spread"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <select
            value={currentSpreadIndex}
            onChange={(e) => onSelectSpread(Number(e.target.value))}
            className="bg-transparent text-xs text-zinc-200 px-1 py-0.5 font-medium focus:outline-none cursor-pointer"
          >
            {spreads.map((s, idx) => (
              <option key={s.id} value={idx} className="bg-[#181a20]">
                Spread {idx + 1} ({s.event})
              </option>
            ))}
          </select>

          <button
            onClick={() => onSelectSpread(Math.min(spreads.length - 1, currentSpreadIndex + 1))}
            disabled={currentSpreadIndex === spreads.length - 1}
            className="p-1 hover:bg-white/10 rounded disabled:opacity-30 disabled:hover:bg-transparent"
            title="Next Spread"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. ZOOM & WORKSPACE TOOLS */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-white/5 border border-white/10 rounded-md px-1.5 py-1 text-xs text-zinc-300">
          <button
            onClick={() => onZoomChange(Math.max(0.15, zoom - 0.05))}
            className="p-1 hover:bg-white/10 rounded"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="w-12 text-center font-mono text-[11px]">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => onZoomChange(Math.min(1.5, zoom + 0.05))}
            className="p-1 hover:bg-white/10 rounded"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <div className="h-3 w-px bg-white/15 mx-1" />
          <button
            onClick={onFitScreen}
            className="p-1 hover:bg-white/10 rounded text-[11px]"
            title="Fit to Screen"
          >
            Fit
          </button>
        </div>
      </div>

      {/* 3. PRO VIEW MODES & EXPORT CONTROLS */}
      <div className="flex items-center gap-2">
        {/* Storybook Full Album Button */}
        <button
          onClick={onOpenStorybook}
          className="px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Full Album ({spreads.length})</span>
        </button>

        {/* 3D Flipbook Preview */}
        <button
          onClick={onOpenFlipbook}
          className="px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>3D Flipbook</span>
        </button>

        {/* Client Proofing Portal */}
        <button
          onClick={onOpenProofing}
          className="px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Client Proofing</span>
        </button>

        {/* Export & Download Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs flex items-center gap-1.5 shadow-[0_2px_12px_rgba(245,158,11,0.25)] transition-colors"
          >
            <Download className="w-3.5 h-3.5 fill-black" />
            <span>Export Print</span>
          </button>

          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-lg bg-[#181a20] border border-white/15 shadow-2xl p-1.5 z-50 text-xs">
              <div className="px-2 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                High-Resolution Export (300 DPI)
              </div>

              <button
                onClick={() => {
                  setShowExportMenu(false);
                  onExportPNG(300);
                }}
                className="w-full px-2.5 py-2 rounded hover:bg-white/10 flex items-center gap-2.5 text-left text-zinc-200"
              >
                <FileImage className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="font-medium">Download Print PNG (300 DPI)</div>
                  <div className="text-[10px] text-zinc-400">7200 × 3600 px (12×24" print ready)</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowExportMenu(false);
                  onExportPNG(72);
                }}
                className="w-full px-2.5 py-2 rounded hover:bg-white/10 flex items-center gap-2.5 text-left text-zinc-200"
              >
                <FileImage className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="font-medium">Download Web Preview PNG (72 DPI)</div>
                  <div className="text-[10px] text-zinc-400">Fast client mockup sharing</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowExportMenu(false);
                  onExportPNG(300, true);
                }}
                className="w-full px-2.5 py-2 rounded hover:bg-white/10 flex items-center gap-2.5 text-left text-zinc-200"
              >
                <Layers className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="font-medium">Transparent PNG</div>
                  <div className="text-[10px] text-zinc-400">Photoshop composite overlay</div>
                </div>
              </button>

              <div className="my-1 h-px bg-white/10" />

              <div className="px-2 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Vector & Metadata Hand-off
              </div>

              <button
                onClick={() => {
                  setShowExportMenu(false);
                  onExportSVG();
                }}
                className="w-full px-2.5 py-2 rounded hover:bg-white/10 flex items-center gap-2.5 text-left text-zinc-200"
              >
                <FileCode className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-medium">Download Vector SVG</div>
                  <div className="text-[10px] text-zinc-400">Adobe Illustrator / InDesign vector paths</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowExportMenu(false);
                  onExportJSON();
                }}
                className="w-full px-2.5 py-2 rounded hover:bg-white/10 flex items-center gap-2.5 text-left text-zinc-200"
              >
                <FileCode className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="font-medium">Download Layout JSON</div>
                  <div className="text-[10px] text-zinc-400">Coordinates & layer schema for PS scripts</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
