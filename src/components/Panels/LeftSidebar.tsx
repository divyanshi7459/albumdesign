import React, { useState } from "react";
import {
  WeddingStyle,
  WeddingEvent,
  LayoutArchetype,
  BorderPreset,
  MotifType,
  FloralType,
  LuxuryAccentType,
  BackgroundPattern,
  AlbumSpread,
  AlbumLayer,
  ReferenceAnalysisResult,
} from "../../types/album";
import { STYLE_THEMES, MOTIF_SVGS, FLORAL_SVGS, LUXURY_ACCENT_SVGS } from "../../assets/indianWeddingAssets";
import {
  Sparkles,
  Layers,
  Palette,
  Sliders,
  Image as ImageIcon,
  Printer,
  Upload,
  RefreshCw,
  Copy,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

interface LeftSidebarProps {
  currentSpread: AlbumSpread;
  onGenerateNew: (params?: {
    style?: WeddingStyle;
    event?: WeddingEvent;
    photoCount?: number;
    archetype?: LayoutArchetype;
  }) => void;
  onRandomDesign: () => void;
  onRegenerateLayout: () => void;
  onSaveDesign: () => void;
  onDuplicateDesign: () => void;
  onResetCanvas: () => void;
  onAddLayer: (layer: AlbumLayer) => void;
  onUpdateBackground: (bgUpdate: { color1: string; color2?: string; patternName?: BackgroundPattern; bgType: "solid" | "gradient" | "pattern" }) => void;
  showBleed: boolean;
  onToggleBleed: (val: boolean) => void;
  showSafeArea: boolean;
  onToggleSafeArea: (val: boolean) => void;
  showCrease: boolean;
  onToggleCrease: (val: boolean) => void;
  showGrid: boolean;
  onToggleGrid: (val: boolean) => void;
  showRulers: boolean;
  onToggleRulers: (val: boolean) => void;
  previewMode: "rgb" | "cmyk" | "mono";
  onPreviewModeChange: (mode: "rgb" | "cmyk" | "mono") => void;
  onOpenStorybookGenerator: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  currentSpread,
  onGenerateNew,
  onRandomDesign,
  onRegenerateLayout,
  onSaveDesign,
  onDuplicateDesign,
  onResetCanvas,
  onAddLayer,
  onUpdateBackground,
  showBleed,
  onToggleBleed,
  showSafeArea,
  onToggleSafeArea,
  showCrease,
  onToggleCrease,
  showGrid,
  onToggleGrid,
  showRulers,
  onToggleRulers,
  previewMode,
  onPreviewModeChange,
  onOpenStorybookGenerator,
}) => {
  const [activeTab, setActiveTab] = useState<"ai" | "assets" | "canvas">("ai");

  // AI Controls State
  const [selectedStyle, setSelectedStyle] = useState<WeddingStyle>(currentSpread.style);
  const [selectedEvent, setSelectedEvent] = useState<WeddingEvent>(currentSpread.event);
  const [photoCount, setPhotoCount] = useState<number>(currentSpread.photoCount || 3);
  const [selectedArchetype, setSelectedArchetype] = useState<LayoutArchetype>(currentSpread.layoutArchetype || "central-hero");
  const [density, setDensity] = useState<"minimal" | "subtle" | "medium" | "ornate" | "royal">("medium");

  // Reference Image Analysis State
  const [referenceImg, setReferenceImg] = useState<string | null>(null);
  const [isAnalyzingRef, setIsAnalyzingRef] = useState(false);
  const [refAnalysis, setRefAnalysis] = useState<ReferenceAnalysisResult | null>(null);

  // Asset category sub-tab
  const [assetCategory, setAssetCategory] = useState<"backgrounds" | "borders" | "motifs" | "florals" | "accents">("motifs");

  // Canvas Settings State
  const [canvasPreset, setCanvasPreset] = useState("12x24");
  const [dpi, setDpi] = useState<72 | 150 | 300>(300);

  // Handle Reference Image Upload & AI analysis
  const handleRefUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setReferenceImg(base64);
      setIsAnalyzingRef(true);

      try {
        const res = await fetch("/api/ai/analyze-reference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64 }),
        });
        const data = await res.json();
        if (data.analysis) {
          setRefAnalysis(data.analysis);
          if (data.analysis.suggestedStyle) setSelectedStyle(data.analysis.suggestedStyle);
          if (data.analysis.suggestedEvent) setSelectedEvent(data.analysis.suggestedEvent);
        }
      } catch (err) {
        console.error("Analysis failed", err);
      } finally {
        setIsAnalyzingRef(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const currentTheme = STYLE_THEMES[selectedStyle] || STYLE_THEMES["Royal Indian Wedding"];

  return (
    <div className="w-80 h-full bg-[#181a20] border-r border-white/10 flex flex-col select-none text-zinc-300 z-20">
      {/* SIDEBAR NAVIGATION TABS */}
      <div className="flex border-b border-white/10 bg-[#14161b]">
        <button
          onClick={() => setActiveTab("ai")}
          className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === "ai"
              ? "border-amber-400 text-amber-300 bg-white/[0.02]"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>AI Design</span>
        </button>

        <button
          onClick={() => setActiveTab("assets")}
          className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === "assets"
              ? "border-amber-400 text-amber-300 bg-white/[0.02]"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>Asset Library</span>
        </button>

        <button
          onClick={() => setActiveTab("canvas")}
          className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === "canvas"
              ? "border-amber-400 text-amber-300 bg-white/[0.02]"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Printer className="w-3.5 h-3.5 text-amber-400" />
          <span>Print / Canvas</span>
        </button>
      </div>

      {/* TAB CONTENTS */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar text-xs">
        {/* ================= 1. AI DESIGN GENERATOR TAB ================= */}
        {activeTab === "ai" && (
          <div className="space-y-4">
            {/* Primary Action Button */}
            <button
              onClick={() =>
                onGenerateNew({
                  style: selectedStyle,
                  event: selectedEvent,
                  photoCount,
                  archetype: selectedArchetype,
                })
              }
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>Generate New Design</span>
            </button>

            {/* Quick Generator Sub-Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() =>
                  onGenerateNew({
                    style: selectedStyle,
                    event: selectedEvent,
                    photoCount,
                  })
                }
                className="py-2 px-2.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3 h-3 text-amber-400" />
                <span>Generate Another</span>
              </button>

              <button
                onClick={onRandomDesign}
                className="py-2 px-2.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Random Design</span>
              </button>
            </div>

            {/* Wedding Style System (20 Presets) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-semibold text-zinc-200">Wedding Style Preset</label>
                <span className="text-[10px] text-amber-400/80">20 Styles</span>
              </div>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value as WeddingStyle)}
                className="w-full bg-[#121418] border border-white/15 rounded-md px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-amber-400 text-xs"
              >
                {Object.keys(STYLE_THEMES).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              {/* Selected Style Palette Preview */}
              <div className="mt-2 p-2 rounded bg-black/25 border border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-zinc-400">Palette:</span>
                <div className="flex gap-1.5">
                  <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: currentTheme.primaryColor }} title="Primary" />
                  <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: currentTheme.secondaryColor }} title="Secondary" />
                  <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: currentTheme.accentGold }} title="Gold Accent" />
                  <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: currentTheme.backgroundColor }} title="Canvas Base" />
                </div>
              </div>
            </div>

            {/* Event Specific Selector */}
            <div>
              <label className="font-semibold text-zinc-200 block mb-1.5">Event Ceremony</label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value as WeddingEvent)}
                className="w-full bg-[#121418] border border-white/15 rounded-md px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-amber-400 text-xs"
              >
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
                  "Groom",
                  "Pre-Wedding",
                  "Final Page",
                ].map((ev) => (
                  <option key={ev} value={ev}>
                    {ev}
                  </option>
                ))}
              </select>
            </div>

            {/* Photo Placeholders Count (1, 2, 3, 4, 5, 6, 8, 10+) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-semibold text-zinc-200">Photo Count</label>
                <span className="text-[10px] text-zinc-400">Automatic re-composition</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setPhotoCount(num);
                      onGenerateNew({
                        style: selectedStyle,
                        event: selectedEvent,
                        photoCount: num,
                        archetype: selectedArchetype,
                      });
                    }}
                    className={`py-1.5 rounded font-medium transition-colors ${
                      photoCount === num
                        ? "bg-amber-500 text-black font-bold shadow-sm"
                        : "bg-white/5 hover:bg-white/10 text-zinc-300"
                    }`}
                  >
                    {num === 10 ? "10+" : num}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Archetype Selector */}
            <div>
              <label className="font-semibold text-zinc-200 block mb-1.5">Composition Archetype</label>
              <select
                value={selectedArchetype}
                onChange={(e) => setSelectedArchetype(e.target.value as LayoutArchetype)}
                className="w-full bg-[#121418] border border-white/15 rounded-md px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-amber-400 text-xs"
              >
                <option value="central-hero">Central Hero Frame + Support</option>
                <option value="asymmetric-editorial">Asymmetric Magazine Editorial</option>
                <option value="cinematic-strip">Cinematic Letterbox Strips</option>
                <option value="overlapping-stack">Overlapping Portrait Cards</option>
                <option value="triangle-balance">Triangular Optical Balance</option>
                <option value="quad-grid">2x2 Royal Quad Grid</option>
                <option value="five-photo-feature">5-Photo Feature with Hero</option>
                <option value="royal-jharokha">Palace Jharokha Scalloped Arch</option>
                <option value="full-bleed-split">Full-Bleed Hero + Spread Split</option>
                <option value="diagonal-dynamic">Diagonal Dynamic Action</option>
              </select>
            </div>

            {/* Decorative Density */}
            <div>
              <label className="font-semibold text-zinc-200 block mb-1.5">Ornament Density</label>
              <div className="grid grid-cols-5 gap-1 text-[10px]">
                {(["minimal", "subtle", "medium", "ornate", "royal"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDensity(d)}
                    className={`py-1.5 rounded capitalize transition-colors ${
                      density === d ? "bg-amber-500/20 text-amber-300 border border-amber-500/50" : "bg-white/5 text-zinc-400"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* REFERENCE IMAGE UPLOADER & AESTHETIC ANALYZER */}
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-zinc-200 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Reference Image Inspiration</span>
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 mb-2 leading-relaxed">
                Upload a sample album sheet. The AI only analyzes overall composition, balance, and color harmonies to create a completely ORIGINAL design. Never copied.
              </p>

              <label className="block w-full border border-dashed border-white/20 hover:border-amber-400/50 rounded-lg p-3 text-center cursor-pointer transition-colors bg-white/[0.02]">
                <Upload className="w-5 h-5 mx-auto mb-1 text-zinc-400" />
                <span className="text-[11px] text-zinc-300 font-medium block">
                  {referenceImg ? "Change Reference Image" : "Upload Reference Sheet"}
                </span>
                <span className="text-[9px] text-zinc-500">JPG or PNG</span>
                <input type="file" accept="image/*" onChange={handleRefUpload} className="hidden" />
              </label>

              {isAnalyzingRef && (
                <div className="mt-2 p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing composition & aesthetic mood...</span>
                </div>
              )}

              {refAnalysis && (
                <div className="mt-2 p-2.5 rounded bg-black/30 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Analysis Complete: {refAnalysis.mood}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-normal">{refAnalysis.compositionAdvice}</p>
                </div>
              )}
            </div>

            {/* FULL ALBUM STORYBOOK BUILDER CTA */}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={onOpenStorybookGenerator}
                className="w-full py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-amber-500/40 text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Generate Full Storybook (10-30 Spreads)</span>
              </button>
            </div>

            {/* Canvas Management Actions */}
            <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-zinc-400 text-[11px]">
              <button onClick={onSaveDesign} className="p-2 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center gap-1.5">
                <span>Save Design</span>
              </button>
              <button onClick={onDuplicateDesign} className="p-2 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center gap-1.5">
                <Copy className="w-3 h-3" />
                <span>Duplicate Spread</span>
              </button>
              <button onClick={onRegenerateLayout} className="p-2 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center gap-1.5">
                <RefreshCw className="w-3 h-3" />
                <span>Regenerate</span>
              </button>
              <button onClick={onResetCanvas} className="p-2 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 flex items-center justify-center gap-1.5">
                <RotateCcw className="w-3 h-3" />
                <span>Reset Canvas</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= 2. MODULAR ASSET LIBRARY TAB ================= */}
        {activeTab === "assets" && (
          <div className="space-y-4">
            {/* Sub-Category Pills */}
            <div className="flex flex-wrap gap-1 bg-[#121418] p-1 rounded-md border border-white/10">
              {(["motifs", "borders", "florals", "accents", "backgrounds"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setAssetCategory(cat)}
                  className={`flex-1 py-1 px-1.5 text-[10px] rounded capitalize transition-colors ${
                    assetCategory === cat ? "bg-amber-500 text-black font-semibold" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* MOTIFS */}
            {assetCategory === "motifs" && (
              <div>
                <p className="text-[10px] text-zinc-400 mb-2">Click any vector motif to add it as an editable layer on your spread:</p>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(MOTIF_SVGS) as MotifType[]).map((motif) => (
                    <button
                      key={motif}
                      onClick={() =>
                        onAddLayer({
                          id: `motif-${Date.now()}`,
                          name: `Motif: ${MOTIF_SVGS[motif].name}`,
                          type: "motif",
                          x: 1200 - 90,
                          y: 600 - 90,
                          width: 180,
                          height: 180,
                          rotation: 0,
                          opacity: 0.9,
                          zIndex: 15,
                          isLocked: false,
                          isHidden: false,
                          motifType: motif,
                          color: currentTheme.accentGold,
                          secondaryColor: currentTheme.primaryColor,
                        })
                      }
                      className="p-3 rounded-lg bg-black/30 border border-white/10 hover:border-amber-400/60 flex flex-col items-center gap-2 group transition-all"
                    >
                      <div className="w-14 h-14 text-amber-400 group-hover:scale-110 transition-transform">
                        <svg viewBox={MOTIF_SVGS[motif].viewBox} className="w-full h-full">
                          {MOTIF_SVGS[motif].render("#D4AF37", "#800020")}
                        </svg>
                      </div>
                      <span className="text-[10px] text-zinc-300 font-medium text-center">{MOTIF_SVGS[motif].name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* BORDERS */}
            {assetCategory === "borders" && (
              <div>
                <p className="text-[10px] text-zinc-400 mb-2">Select a traditional border frame preset:</p>
                <div className="space-y-2">
                  {(
                    [
                      { id: "royal-gold", name: "Royal 24K Gold Filigree", desc: "Double line with gold trim" },
                      { id: "ornate-filigree", name: "Traditional Ornate Border", desc: "Vedic ceremony frame" },
                      { id: "floral-vine", name: "Floral Botanical Vine", desc: "Handcrafted leaves & blossoms" },
                      { id: "geometric-jaali", name: "Mughal Lattice Jaali", desc: "Geometric Rajput architecture" },
                      { id: "minimal-line", name: "Modern Editorial Hairline", desc: "Sleek 1px gold hairline" },
                      { id: "jharokha-frame", name: "Palace Scalloped Jharokha", desc: "Heritage arched frame" },
                    ] as { id: BorderPreset; name: string; desc: string }[]
                  ).map((b) => (
                    <button
                      key={b.id}
                      onClick={() =>
                        onAddLayer({
                          id: `border-${Date.now()}`,
                          name: `Border: ${b.name}`,
                          type: "border",
                          x: 40,
                          y: 40,
                          width: 2320,
                          height: 1120,
                          rotation: 0,
                          opacity: 0.85,
                          zIndex: 1,
                          isLocked: false,
                          isHidden: false,
                          borderPreset: b.id,
                          color: currentTheme.accentGold,
                          strokeWidth: 2.5,
                          inset: 20,
                        })
                      }
                      className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 hover:border-amber-400 text-left transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-zinc-200">{b.name}</div>
                        <div className="text-[10px] text-zinc-400">{b.desc}</div>
                      </div>
                      <span className="text-[10px] text-amber-400">+ Add</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FLORALS */}
            {assetCategory === "florals" && (
              <div>
                <p className="text-[10px] text-zinc-400 mb-2">Indian botanical elements & garlands:</p>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(FLORAL_SVGS) as FloralType[]).map((floral) => (
                    <button
                      key={floral}
                      onClick={() =>
                        onAddLayer({
                          id: `floral-${Date.now()}`,
                          name: `Floral: ${FLORAL_SVGS[floral].name}`,
                          type: "floral",
                          x: 1200 - 80,
                          y: 600 - 80,
                          width: 160,
                          height: 160,
                          rotation: 0,
                          opacity: 0.9,
                          zIndex: 14,
                          isLocked: false,
                          isHidden: false,
                          floralType: floral,
                          color: currentTheme.primaryColor,
                          secondaryColor: currentTheme.accentGold,
                        })
                      }
                      className="p-3 rounded-lg bg-black/30 border border-white/10 hover:border-amber-400/60 flex flex-col items-center gap-2 group transition-all"
                    >
                      <div className="w-14 h-14 text-amber-400 group-hover:scale-110 transition-transform">
                        <svg viewBox={FLORAL_SVGS[floral].viewBox} className="w-full h-full">
                          {FLORAL_SVGS[floral].render("#9C4153", "#D4AF37")}
                        </svg>
                      </div>
                      <span className="text-[10px] text-zinc-300 font-medium text-center">{FLORAL_SVGS[floral].name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* LUXURY ACCENTS */}
            {assetCategory === "accents" && (
              <div>
                <p className="text-[10px] text-zinc-400 mb-2">Gold foil ribbons, crests & metallic embellishments:</p>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(LUXURY_ACCENT_SVGS) as LuxuryAccentType[]).map((accent) => (
                    <button
                      key={accent}
                      onClick={() =>
                        onAddLayer({
                          id: `accent-${Date.now()}`,
                          name: `Accent: ${LUXURY_ACCENT_SVGS[accent].name}`,
                          type: "luxury-accent",
                          x: 1200 - 100,
                          y: 600 - 50,
                          width: 200,
                          height: 100,
                          rotation: 0,
                          opacity: 0.9,
                          zIndex: 16,
                          isLocked: false,
                          isHidden: false,
                          accentType: accent,
                          color: currentTheme.accentGold,
                        })
                      }
                      className="p-3 rounded-lg bg-black/30 border border-white/10 hover:border-amber-400/60 flex flex-col items-center gap-2 group transition-all"
                    >
                      <div className="w-16 h-10 text-amber-400 group-hover:scale-110 transition-transform">
                        <svg viewBox={LUXURY_ACCENT_SVGS[accent].viewBox} className="w-full h-full">
                          {LUXURY_ACCENT_SVGS[accent].render("#D4AF37")}
                        </svg>
                      </div>
                      <span className="text-[10px] text-zinc-300 font-medium text-center">{LUXURY_ACCENT_SVGS[accent].name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* BACKGROUNDS */}
            {assetCategory === "backgrounds" && (
              <div>
                <p className="text-[10px] text-zinc-400 mb-2">Click to apply texture/palette to the spread:</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: "Ivory Handcrafted Paper", c1: "#FAF7EF", c2: "#F3ECE0", type: "gradient" as const },
                    { name: "Kashmiri Cream Silk", c1: "#FFFDF5", c2: "#F7F0DF", type: "gradient" as const },
                    { name: "Royal Velvet Maroon", c1: "#3D0B14", c2: "#1F0409", type: "gradient" as const },
                    { name: "Obsidian Black & Gold", c1: "#111111", c2: "#1C1710", type: "gradient" as const },
                    { name: "Imperial Indigo Navy", c1: "#0F1626", c2: "#1E2A44", type: "gradient" as const },
                    { name: "Marigold Haldi Sunshine", c1: "#FFFDF0", c2: "#FDF0BE", type: "gradient" as const },
                    { name: "Emerald Henna Wash", c1: "#122A1E", c2: "#0A1811", type: "gradient" as const },
                    { name: "Soft Pastel Rose", c1: "#FAF5F7", c2: "#F0E3E8", type: "gradient" as const },
                  ].map((bg, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        onUpdateBackground({
                          color1: bg.c1,
                          color2: bg.c2,
                          bgType: bg.type,
                        })
                      }
                      className="p-2.5 rounded-lg border border-white/10 hover:border-amber-400 flex flex-col gap-1.5 transition-colors text-left"
                    >
                      <div
                        className="w-full h-10 rounded border border-white/15"
                        style={{ background: `linear-gradient(135deg, ${bg.c1}, ${bg.c2})` }}
                      />
                      <span className="text-[10px] text-zinc-300 font-medium leading-tight">{bg.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 3. CANVAS & PRINT SETTINGS TAB ================= */}
        {activeTab === "canvas" && (
          <div className="space-y-4">
            <div>
              <label className="font-semibold text-zinc-200 block mb-1.5">Canvas Size Preset</label>
              <select
                value={canvasPreset}
                onChange={(e) => setCanvasPreset(e.target.value)}
                className="w-full bg-[#121418] border border-white/15 rounded-md px-2.5 py-2 text-zinc-200 text-xs"
              >
                <option value="12x24">12 × 24 inches (Standard Double Spread 2:1)</option>
                <option value="12x36">12 × 36 inches (Panoramic Spread 3:1)</option>
                <option value="24x36">24 × 36 inches (Grand Master Album 3:2)</option>
              </select>
            </div>

            {/* DPI Settings */}
            <div>
              <label className="font-semibold text-zinc-200 block mb-1.5">Print Resolution (DPI)</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[72, 150, 300].map((res) => (
                  <button
                    key={res}
                    onClick={() => setDpi(res as any)}
                    className={`py-1.5 rounded font-mono font-medium transition-colors ${
                      dpi === res ? "bg-amber-500 text-black font-bold" : "bg-white/5 text-zinc-400 hover:bg-white/10"
                    }`}
                  >
                    {res} DPI
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Physical Output Specifications */}
            <div className="p-3 rounded-lg bg-black/30 border border-white/10 space-y-1 text-[11px] font-mono">
              <div className="text-zinc-400 font-sans font-semibold mb-1">Physical Print Specs:</div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Spread Size:</span>
                <span className="text-zinc-200">12 × 24 inches</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Pixel Geometry:</span>
                <span className="text-amber-400">
                  {dpi === 300 ? "7200 × 3600 px" : dpi === 150 ? "3600 × 1800 px" : "2400 × 1200 px"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Bleed Margin:</span>
                <span className="text-cyan-400">0.25 in (75 px)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Safe Print Margin:</span>
                <span className="text-emerald-400">0.50 in (150 px)</span>
              </div>
            </div>

            {/* Overlays & Guides Toggles */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="font-semibold text-zinc-200 block mb-1">Print Overlays & Guides</label>

              <div className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                <span className="text-zinc-300">Spine Center Crease</span>
                <input
                  type="checkbox"
                  checked={showCrease}
                  onChange={(e) => onToggleCrease(e.target.checked)}
                  className="rounded border-zinc-700 text-amber-500 focus:ring-0"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                <span className="text-zinc-300">Safe Area (0.5")</span>
                <input
                  type="checkbox"
                  checked={showSafeArea}
                  onChange={(e) => onToggleSafeArea(e.target.checked)}
                  className="rounded border-zinc-700 text-amber-500 focus:ring-0"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                <span className="text-zinc-300">Bleed / Trim Line (0.25")</span>
                <input
                  type="checkbox"
                  checked={showBleed}
                  onChange={(e) => onToggleBleed(e.target.checked)}
                  className="rounded border-zinc-700 text-amber-500 focus:ring-0"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                <span className="text-zinc-300">Composition Grid</span>
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => onToggleGrid(e.target.checked)}
                  className="rounded border-zinc-700 text-amber-500 focus:ring-0"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                <span className="text-zinc-300">Rulers (Inches)</span>
                <input
                  type="checkbox"
                  checked={showRulers}
                  onChange={(e) => onToggleRulers(e.target.checked)}
                  className="rounded border-zinc-700 text-amber-500 focus:ring-0"
                />
              </div>
            </div>

            {/* Print Preview Modes (RGB, CMYK, Monochrome) */}
            <div className="pt-2 border-t border-white/10">
              <label className="font-semibold text-zinc-200 block mb-1.5">Print Proofing Simulation</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "rgb", label: "RGB Native" },
                  { id: "cmyk", label: "CMYK Sim" },
                  { id: "mono", label: "Monochrome" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onPreviewModeChange(m.id as any)}
                    className={`py-1.5 rounded text-[11px] font-medium transition-colors ${
                      previewMode === m.id ? "bg-amber-500 text-black font-semibold" : "bg-white/5 text-zinc-400 hover:bg-white/10"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
