import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Printer,
  Layers,
  ShieldCheck,
  Palette,
  Layout,
  Share2,
  CheckCircle2,
  Maximize2,
  BookOpen,
  Image as ImageIcon,
  Sliders,
  Eye,
  MessageSquare,
  FileCode,
  Zap,
  Star,
  ChevronRight,
  Move,
  RotateCw,
  Crop,
} from "lucide-react";
import { Navbar } from "../components/Website/Navbar";
import { Footer } from "../components/Website/Footer";
import { useAlbumStore } from "../store/useAlbumStore";
import { WeddingStyle } from "../types/album";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { createProject, demoLogin } = useAlbumStore();

  // Active spread tab for album showcase
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<number>(0);
  // Selected style filter
  const [selectedShowcaseStyle, setSelectedShowcaseStyle] = useState<WeddingStyle>("Royal Indian Wedding");

  const handleStartDesigning = () => {
    navigate("/studio");
  };

  const handleCreateWithStyle = (style: WeddingStyle) => {
    createProject({
      name: `${style} Album`,
      coupleNames: "Aarav & Ananya",
      style,
      event: "Wedding",
      spreadCount: 5,
    });
    navigate("/studio");
  };

  const stylesShowcaseList: Array<{
    name: WeddingStyle;
    tagline: string;
    bgClass: string;
    borderClass: string;
    accentColor: string;
    secondaryColor: string;
    motif: string;
    description: string;
  }> = [
    {
      name: "Royal Indian Wedding",
      tagline: "Regal Heritage & 24K Gold",
      bgClass: "from-[#2b080f] via-[#1a0509] to-[#0d0204]",
      borderClass: "border-amber-500/40",
      accentColor: "#E5B842",
      secondaryColor: "#800020",
      motif: "Mandala & Jharokha",
      description: "Deep imperial crimson, 24K gold foil trim, and Vedic blessings for palace nuptials.",
    },
    {
      name: "Luxury Wedding",
      tagline: "Editorial Grandeur & Opulence",
      bgClass: "from-[#1b1713] via-[#120f0c] to-[#0a0807]",
      borderClass: "border-amber-400/35",
      accentColor: "#D4AF37",
      secondaryColor: "#2A241E",
      motif: "Gold Foil Filigree",
      description: "Refined metallic warm bronze, generous negative space, and haute couture layouts.",
    },
    {
      name: "Traditional Wedding",
      tagline: "Vedic Rituals & Sacred Blessings",
      bgClass: "from-[#240b0b] via-[#160707] to-[#0c0404]",
      borderClass: "border-rose-500/40",
      accentColor: "#FFD700",
      secondaryColor: "#990000",
      motif: "Kalash & Lotus",
      description: "Authentic vermillion, sacred agni accents, and traditional Sanskrit shlokas.",
    },
    {
      name: "Modern Wedding",
      tagline: "Minimalist Geometry & Clean Air",
      bgClass: "from-[#16171d] via-[#101116] to-[#0a0a0d]",
      borderClass: "border-blue-400/30",
      accentColor: "#E2E8F0",
      secondaryColor: "#3B82F6",
      motif: "Hairline Editorial",
      description: "Asymmetrical white space, crisp typography pairings, and clean modern grids.",
    },
    {
      name: "Minimal Wedding",
      tagline: "Subtle Restraint & Fine Focus",
      bgClass: "from-[#1c1c1f] via-[#141416] to-[#0d0d0e]",
      borderClass: "border-zinc-500/30",
      accentColor: "#F4F4F5",
      secondaryColor: "#71717A",
      motif: "Floating Frames",
      description: "Negative space championing emotional moments with timeless monochrome elegance.",
    },
    {
      name: "Floral Wedding",
      tagline: "Botanical Vines & Blossom Frames",
      bgClass: "from-[#1c1216] via-[#120b0e] to-[#0a0608]",
      borderClass: "border-pink-500/35",
      accentColor: "#F472B6",
      secondaryColor: "#BE185D",
      motif: "Rose & Marigold Vines",
      description: "Lush botanical borders, marigold and jasmine accents, and delicate garden palettes.",
    },
    {
      name: "Cinematic Wedding",
      tagline: "Widescreen Drama & 16:9 Strips",
      bgClass: "from-[#101217] via-[#0b0c10] to-[#060709]",
      borderClass: "border-indigo-400/35",
      accentColor: "#F59E0B",
      secondaryColor: "#312E81",
      motif: "Letterbox Panorama",
      description: "Dramatic full-bleed panoramic frames capturing sweeping ceremony landscapes.",
    },
    {
      name: "Black & Gold",
      tagline: "High-Contrast Ultra Luxury",
      bgClass: "from-[#121212] via-[#090909] to-[#000000]",
      borderClass: "border-amber-400/50",
      accentColor: "#F59E0B",
      secondaryColor: "#D97706",
      motif: "Gilded Geometric Jaali",
      description: "Jet-black velvet backgrounds crowned by pure 24K gold foil borders and crests.",
    },
    {
      name: "Red & Gold",
      tagline: "Timeless Auspicious Vivah",
      bgClass: "from-[#2f0808] via-[#1a0404] to-[#0f0202]",
      borderClass: "border-red-500/40",
      accentColor: "#FBBF24",
      secondaryColor: "#B91C1C",
      motif: "Peacock & Paisley",
      description: "Classic crimson silk canvas with radiant gold ornamental borders and motifs.",
    },
    {
      name: "Maroon & Cream",
      tagline: "Subtle Regal Warmth",
      bgClass: "from-[#21090d] via-[#150608] to-[#0c0305]",
      borderClass: "border-amber-200/35",
      accentColor: "#FEF3C7",
      secondaryColor: "#831843",
      motif: "Mughal Lattice Arch",
      description: "Soft antique ivory paper paired with deep burgundy and gold filigree arches.",
    },
    {
      name: "Pastel",
      tagline: "Daytime Whimsy & Peach Mist",
      bgClass: "from-[#1a141b] via-[#120d14] to-[#0b080d]",
      borderClass: "border-purple-300/30",
      accentColor: "#F5D0FE",
      secondaryColor: "#E879F9",
      motif: "Soft Petal Vines",
      description: "Ethereal blush, powder blue, and soft lilac tones perfect for daytime mandaps.",
    },
    {
      name: "Rajasthani Royal",
      tagline: "Haveli Arches & Jharokha Windows",
      bgClass: "from-[#261305] via-[#170a02] to-[#0c0501]",
      borderClass: "border-amber-500/45",
      accentColor: "#FBBF24",
      secondaryColor: "#C2410C",
      motif: "Jharokha Scalloped Arch",
      description: "Palatial sandstone motifs, Rajasthani jharokhas, and royal procession crests.",
    },
    {
      name: "Punjabi",
      tagline: "Vibrant Energy & Golden Phulkari",
      bgClass: "from-[#280c1d] via-[#190611] to-[#0d0309]",
      borderClass: "border-fuchsia-500/40",
      accentColor: "#FDE047",
      secondaryColor: "#A21CAF",
      motif: "Phulkari & Dhol",
      description: "Dynamic festivity, bright saffron and magenta accents, celebrating Anand Karaj.",
    },
    {
      name: "South Indian",
      tagline: "Temple Gopuram & Kanjeevaram",
      bgClass: "from-[#1e1503] via-[#130d01] to-[#080500]",
      borderClass: "border-yellow-500/45",
      accentColor: "#FACC15",
      secondaryColor: "#854D0E",
      motif: "Temple Gopuram Pillar",
      description: "Golden zari borders inspired by Kanjeevaram weaves, jasmine, and sacred brass lamps.",
    },
  ];

  // Coordinated Spreads preview data
  const showcaseSpreads = [
    {
      label: "Cover",
      event: "Royal Wedding Book Cover",
      desc: "Leather-finish debossed gold foil title, royal crest & couple portrait frame",
      photoFrames: [
        { label: "Central Royal Portrait", ratio: "3:4", x: "32%", y: "20%", w: "36%", h: "60%" },
      ],
      title: "AARAV & ANANYA",
      subtitle: "Shubh Vivah • December 2026",
      themeColor: "#E5B842",
    },
    {
      label: "Spread 01",
      event: "Haldi Ceremony",
      desc: "Sunlit yellow morning mood with quad-grid candids and blessing quote",
      photoFrames: [
        { label: "Pithi Ritual Hero", ratio: "4:3", x: "8%", y: "16%", w: "38%", h: "68%" },
        { label: "Turmeric Detail", ratio: "1:1", x: "54%", y: "16%", w: "18%", h: "32%" },
        { label: "Family Laughter", ratio: "1:1", x: "74%", y: "16%", w: "18%", h: "32%" },
        { label: "Petal Shower", ratio: "16:9", x: "54%", y: "52%", w: "38%", h: "32%" },
      ],
      title: "Haldi Ke Rang",
      subtitle: "Sunlit Blessings & Golden Joy",
      themeColor: "#F59E0B",
    },
    {
      label: "Spread 02",
      event: "Mehendi Soirée",
      desc: "Lush botanical floral vines with intricate henna closeup editorial placeholders",
      photoFrames: [
        { label: "Henna Application", ratio: "3:4", x: "6%", y: "18%", w: "22%", h: "64%" },
        { label: "Bride Portrait", ratio: "3:4", x: "30%", y: "18%", w: "22%", h: "64%" },
        { label: "Hands Detail", ratio: "1:1", x: "55%", y: "18%", w: "18%", h: "30%" },
        { label: "Feet Soles Detail", ratio: "1:1", x: "75%", y: "18%", w: "18%", h: "30%" },
        { label: "Dancing Celebration", ratio: "16:9", x: "55%", y: "52%", w: "38%", h: "30%" },
      ],
      title: "Mehendi Hai Rachne Wali",
      subtitle: "Intricate Tales of Forever",
      themeColor: "#10B981",
    },
    {
      label: "Spread 03",
      event: "Sangeet Gala Night",
      desc: "Dynamic asymmetric editorial collage capturing choreographies and stage energy",
      photoFrames: [
        { label: "Couple Stage Dance", ratio: "16:9", x: "7%", y: "18%", w: "40%", h: "48%" },
        { label: "Family Performance", ratio: "4:3", x: "7%", y: "68%", w: "40%", h: "24%" },
        { label: "Candid Cheering", ratio: "1:1", x: "52%", y: "18%", w: "20%", h: "34%" },
        { label: "DJ & Dhol Energy", ratio: "1:1", x: "74%", y: "18%", w: "20%", h: "34%" },
        { label: "Solo Bride Act", ratio: "3:4", x: "52%", y: "56%", w: "42%", h: "36%" },
      ],
      title: "Sangeet Raat",
      subtitle: "Rhythms of Love & Euphoria",
      themeColor: "#A855F7",
    },
    {
      label: "Spread 04",
      event: "Sacred Vivah & Saat Phere",
      desc: "Regal jharokha scalloped arch framing the holy agni vows with central crease safety",
      photoFrames: [
        { label: "Varmala Garland Exchange", ratio: "4:3", x: "6%", y: "18%", w: "40%", h: "64%" },
        { label: "Saat Phere Sacred Agni", ratio: "16:9", x: "52%", y: "18%", w: "42%", h: "34%" },
        { label: "Sindoor Blessing", ratio: "1:1", x: "52%", y: "56%", w: "20%", h: "34%" },
        { label: "Mangalsutra Moment", ratio: "1:1", x: "74%", y: "56%", w: "20%", h: "34%" },
      ],
      title: "Shubh Vivah • Saat Phere",
      subtitle: "Two Souls Bound in Sacred Eternity",
      themeColor: "#EF4444",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0e12] text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-black font-sans">
      {/* 1. TOP WEBSITE NAVBAR */}
      <Navbar />

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden border-b border-white/5">
        {/* Ambient atmospheric glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-6 space-y-8 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI-Powered Indian Wedding Album Design Platform</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                Design Stunning Indian Wedding Albums{" "}
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                  in Minutes.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Generate original professional album layouts, customize every element, and export print-ready designs. Built specifically for wedding photographers, album designers, and printing labs.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleStartDesigning}
                  className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold text-sm shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <Sparkles className="w-4 h-4 fill-black group-hover:rotate-12 transition-transform" />
                  <span>Start Designing Free</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <Link
                  to="/features"
                  className="px-6 py-4 rounded-xl bg-[#181a22] hover:bg-[#20232d] text-zinc-200 hover:text-white font-semibold text-sm border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>Explore Features</span>
                </Link>
              </div>

              {/* Live Metric / Guarantee */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>300 DPI Print Ready (12×24", 12×36")</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>100% Editable Layer System</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Zero Watermarks Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Studio Editor Mockup */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto rounded-2xl bg-[#14161f] border border-amber-500/30 shadow-[0_0_50px_rgba(217,119,6,0.15)] overflow-hidden">
                {/* Editor Header Bar Mockup */}
                <div className="px-4 py-2.5 bg-[#0f1016] border-b border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-zinc-400 font-mono text-[11px] ml-2">
                      Aarav & Ananya_Spread_04_Wedding.ads
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30">
                      300 DPI Print Mode
                    </span>
                    <span className="text-[10px] text-zinc-500">12 × 24 in</span>
                  </div>
                </div>

                {/* Editor Workspace Content */}
                <div className="p-4 bg-[#11131a] relative select-none">
                  {/* The 2:1 Spread Viewport */}
                  <div className="relative aspect-[2/1] w-full rounded-lg bg-[#18090e] border border-amber-500/40 shadow-2xl overflow-hidden">
                    {/* Background Pattern Layer */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5b842_1px,transparent_1px)] [background-size:16px_16px]" />

                    {/* Ornate Indian Vector Border Mockup */}
                    <div className="absolute inset-3 border-2 border-amber-400/50 rounded pointer-events-none" />
                    <div className="absolute inset-5 border border-amber-400/30 rounded pointer-events-none" />

                    {/* Center Spine Crease Line Indicator */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-amber-400/30 border-l border-dashed border-amber-400/60 z-20 pointer-events-none flex flex-col items-center justify-between py-2">
                      <span className="text-[8px] bg-black/80 px-1 py-0.5 rounded text-amber-300 font-mono">
                        Center Spine (Fold)
                      </span>
                      <span className="text-[8px] bg-black/80 px-1 py-0.5 rounded text-amber-300 font-mono">
                        Crease Safe Margin
                      </span>
                    </div>

                    {/* Left Spread: Empty Photo Placeholders with Elegant Geometry */}
                    {/* NO fake stock people inside photo placeholders! Clean abstract frames with dimensions & camera icon */}
                    <div className="absolute top-[15%] left-[6%] w-[38%] h-[70%] rounded-lg border-2 border-dashed border-amber-400/70 bg-[#120509]/80 flex flex-col items-center justify-center p-3 text-center transition-all group hover:border-amber-400">
                      <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-2">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <span className="font-serif font-bold text-xs text-amber-200">
                        Main Couple Portrait Frame
                      </span>
                      <span className="text-[10px] text-zinc-400 mt-0.5">
                        Empty Placeholder • 3:4 Ratio
                      </span>
                      <span className="text-[9px] text-amber-400/80 mt-1.5 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                        Drag Client Photo Here
                      </span>
                    </div>

                    {/* Right Spread: Secondary Photo Frames & Indian Typography */}
                    <div className="absolute top-[15%] left-[54%] w-[20%] h-[32%] rounded border border-dashed border-amber-400/60 bg-[#120509]/80 flex flex-col items-center justify-center text-center p-1.5">
                      <ImageIcon className="w-4 h-4 text-amber-400/70 mb-1" />
                      <span className="text-[9px] text-zinc-300 font-medium">Ritual Frame 1:1</span>
                      <span className="text-[8px] text-zinc-500">Empty Frame</span>
                    </div>

                    <div className="absolute top-[15%] left-[76%] w-[18%] h-[32%] rounded border border-dashed border-amber-400/60 bg-[#120509]/80 flex flex-col items-center justify-center text-center p-1.5">
                      <ImageIcon className="w-4 h-4 text-amber-400/70 mb-1" />
                      <span className="text-[9px] text-zinc-300 font-medium">Ritual Frame 1:1</span>
                      <span className="text-[8px] text-zinc-500">Empty Frame</span>
                    </div>

                    {/* Wide Letterbox Frame */}
                    <div className="absolute top-[52%] left-[54%] w-[40%] h-[33%] rounded border border-dashed border-amber-400/60 bg-[#120509]/80 flex flex-col items-center justify-center text-center p-2">
                      <ImageIcon className="w-4 h-4 text-amber-400/70 mb-1" />
                      <span className="text-[10px] text-zinc-200 font-serif">Varmala Garland Ceremony</span>
                      <span className="text-[8px] text-zinc-400">16:9 Cinematic Strip • Empty</span>
                    </div>

                    {/* Sanskrit & English Typography */}
                    <div className="absolute top-4 left-6 z-10">
                      <span className="font-serif text-[11px] tracking-widest text-amber-300 font-bold uppercase">
                        शुभ विवाह • SHUBH VIVAH
                      </span>
                    </div>

                    {/* Indian Mandala Motif Watermark in Corner */}
                    <div className="absolute bottom-3 right-4 opacity-40 pointer-events-none">
                      <svg width="48" height="48" viewBox="0 0 100 100" fill="none" stroke="#E5B842" strokeWidth="1.5">
                        <circle cx="50" cy="50" r="40" />
                        <circle cx="50" cy="50" r="20" strokeDasharray="3 3" />
                        <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" />
                      </svg>
                    </div>
                  </div>

                  {/* Active Tool Strip Mockup */}
                  <div className="mt-3 flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-amber-400 font-medium">
                        <Move className="w-3.5 h-3.5" /> Move & Resize
                      </span>
                      <span className="flex items-center gap-1">
                        <RotateCw className="w-3.5 h-3.5" /> 360° Rotate
                      </span>
                      <span className="flex items-center gap-1">
                        <Crop className="w-3.5 h-3.5" /> Smart Crop
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-zinc-500">Safe Margin: 0.5"</span>
                      <span>•</span>
                      <span className="text-amber-400">Bleed: 0.25"</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge Indicator */}
              <div className="absolute -bottom-6 -left-6 bg-[#161922] border border-amber-400/40 rounded-xl p-3 shadow-2xl flex items-center gap-3 backdrop-blur-md hidden sm:flex">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 font-bold text-xs">
                  300
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Direct Print Output</div>
                  <div className="text-[10px] text-zinc-400">7200 × 3600 px uncompressed</div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-[#161922] border border-amber-400/40 rounded-xl p-3 shadow-2xl flex items-center gap-3 backdrop-blur-md hidden sm:flex">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Photoshop Layer Stack</div>
                  <div className="text-[10px] text-zinc-400">Independent vector objects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST / VALUE SECTION */}
      <section className="py-16 bg-[#0f1015] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#14161f] border border-white/10 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-white mb-2">
                AI-Powered Layouts
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Generate original procedural compositions across 25+ layout archetypes with geometric crease awareness.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#14161f] border border-white/10 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-white mb-2">
                Editable Photo Placeholders
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Clean, outlined photo frames ready for client images. No stock faces, no flattened artwork.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#14161f] border border-white/10 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <Printer className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-white mb-2">
                Professional Print Export
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Full 300 DPI uncompressed PNG, vector SVG, and JSX layout JSON tailored for commercial printing labs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#14161f] border border-white/10 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-white mb-2">
                Layer-Based Editing
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Photoshop-style layer stack. Move, resize, rotate, lock, reorder, and tweak every motif independently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (4 STEPS) */}
      <section className="py-24 bg-[#0d0e12] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Streamlined Studio Workflow
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            How It Works in 4 Simple Steps
          </h2>
          <p className="text-zinc-400 text-sm max-w-2xl mx-auto mb-16">
            From empty spread to print-ready Indian wedding album in minutes without spending hours in generic photo software.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-[#13151d] border border-white/10 text-left space-y-4 hover:border-amber-400/40 transition-all">
              <div className="font-mono text-3xl font-bold text-amber-400/80">01</div>
              <h3 className="font-serif font-bold text-lg text-white">Choose Your Style</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Select from 14+ authentic Indian aesthetics including Royal Indian, Rajasthani, Pastel, Floral, and South Indian.
              </p>
              <div className="pt-2">
                <span className="text-[11px] text-amber-300 font-medium">14+ Traditional Themes →</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-[#13151d] border border-white/10 text-left space-y-4 hover:border-amber-400/40 transition-all">
              <div className="font-mono text-3xl font-bold text-amber-400/80">02</div>
              <h3 className="font-serif font-bold text-lg text-white">Generate Layout</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Select ceremony event (Haldi, Mehendi, Sangeet, Vivah) and desired photo count. AI generates balanced geometric spreads.
              </p>
              <div className="pt-2">
                <span className="text-[11px] text-amber-300 font-medium">25+ Composition Archetypes →</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-[#13151d] border border-white/10 text-left space-y-4 hover:border-amber-400/40 transition-all">
              <div className="font-mono text-3xl font-bold text-amber-400/80">03</div>
              <h3 className="font-serif font-bold text-lg text-white">Customize Your Album</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Fine-tune borders, mandalas, and text. Upload client photos and drag them directly into the placeholders.
              </p>
              <div className="pt-2">
                <span className="text-[11px] text-amber-300 font-medium">Live Canvas Drag & Drop →</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 rounded-2xl bg-[#13151d] border border-white/10 text-left space-y-4 hover:border-amber-400/40 transition-all">
              <div className="font-mono text-3xl font-bold text-amber-400/80">04</div>
              <h3 className="font-serif font-bold text-lg text-white">Export & Share</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Export 300 DPI print files or send an interactive client proofing link for direct approvals and feedback notes.
              </p>
              <div className="pt-2">
                <span className="text-[11px] text-amber-300 font-medium">Print & Client Proofing Link →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURE SECTION */}
      <section className="py-24 bg-[#0f1015] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Comprehensive Studio Suite
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              Engineered for the Indian Wedding Photography Industry
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Every tool and asset designed to handle the complexity, colors, and celebratory volume of modern multi-day Indian weddings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-[#14161f] border border-white/10 hover:border-amber-500/30 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-white">AI Album Generator</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Generate completely original wedding album compositions with mathematical spine fold protection, avoiding repetitive templates.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-[#14161f] border border-white/10 hover:border-amber-500/30 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-white">Editable Canvas</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Move, resize, rotate, and edit every element. 8 resize handles, angle rotation stems, and smart snap-to-crease alignment guides.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-[#14161f] border border-white/10 hover:border-amber-500/30 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-white">Indian Wedding Assets</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Rich modular library: Mandalas, Peacocks, Sacred Lotuses, Paisley/Kalka, Kalash, Diyas, Jali latticework, and Rajasthani palace arches.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-2xl bg-[#14161f] border border-white/10 hover:border-amber-500/30 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-white">Full Album Generator</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Generate 10, 20, 30, or 40 coordinated spreads in one click across Haldi, Mehendi, Sangeet, Vivah, Pheras, and Reception ceremonies.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-2xl bg-[#14161f] border border-white/10 hover:border-amber-500/30 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Printer className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-white">Print Ready (300 DPI)</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Preset for 12×24", 12×36", and 24×36" panoramic books. Strict 0.25" bleed, 0.5" safe area, and 50% center crease safety indicators.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-2xl bg-[#14161f] border border-white/10 hover:border-amber-500/30 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-white">Client Proofing Portal</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Generate private share links for the couple. Clients view the spreads, leave revision comments, and mark approved pages online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DESIGN STYLE SHOWCASE (14 DISTINCT CARDS) */}
      <section className="py-24 bg-[#0d0e12] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                Curated Design Aesthetics
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
                14 Indian Wedding Design Styles
              </h2>
              <p className="text-zinc-400 text-sm max-w-xl">
                Each style modifies backgrounds, color palettes, vector borders, typography, and decoration density to match your couple's vision.
              </p>
            </div>

            <button
              onClick={handleStartDesigning}
              className="px-5 py-2.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all self-start md:self-auto flex items-center gap-2"
            >
              <span>Explore All in Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stylesShowcaseList.map((st) => (
              <div
                key={st.name}
                className={`p-6 rounded-2xl bg-gradient-to-b ${st.bgClass} border ${st.borderClass} flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform duration-300 shadow-xl group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold"
                      style={{ backgroundColor: `${st.accentColor}20`, color: st.accentColor }}
                    >
                      {st.motif}
                    </span>
                    <div
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: st.accentColor }}
                    />
                  </div>

                  <h3 className="font-serif font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                    {st.name}
                  </h3>
                  <div className="text-xs font-medium text-zinc-300 mb-2">{st.tagline}</div>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                    {st.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-400">Theme Palette</span>
                  <button
                    onClick={() => handleCreateWithStyle(st.name)}
                    className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Design with this</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ALBUM GENERATION SHOWCASE (COHESIVE FULL ALBUM SPREADS) */}
      <section className="py-24 bg-[#0f1015] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Coordinated Visual Identity
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              One Cohesive Wedding Story, Diverse Compositions
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Explore how a single wedding album maintains royal theme continuity while shifting geometric compositions across different ceremonies.
            </p>
          </div>

          {/* Spread Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {showcaseSpreads.map((sp, idx) => (
              <button
                key={sp.label}
                onClick={() => setActiveShowcaseTab(idx)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeShowcaseTab === idx
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "bg-[#161821] text-zinc-400 hover:text-white border border-white/5 hover:border-white/15"
                }`}
              >
                {sp.label}: {sp.event}
              </button>
            ))}
          </div>

          {/* Interactive Spread Visualizer */}
          {(() => {
            const current = showcaseSpreads[activeShowcaseTab];
            return (
              <div className="max-w-5xl mx-auto p-6 rounded-2xl bg-[#14161f] border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-4 text-xs">
                  <div>
                    <span className="font-serif text-base font-bold text-white mr-2">
                      {current.title}
                    </span>
                    <span className="text-zinc-400">{current.subtitle}</span>
                  </div>
                  <div className="text-zinc-500 hidden sm:block">{current.desc}</div>
                </div>

                {/* 2:1 Spread Viewport */}
                <div className="relative aspect-[2/1] w-full rounded-xl bg-[#1a080d] border border-amber-500/30 shadow-2xl overflow-hidden select-none">
                  {/* Background overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e5b842_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />

                  {/* Outer border */}
                  <div className="absolute inset-3 border-2 border-amber-400/50 rounded pointer-events-none" />

                  {/* Crease line */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-amber-400/25 border-l border-dashed border-amber-400/50 z-20 pointer-events-none flex flex-col justify-between py-2 items-center">
                    <span className="text-[8px] bg-black/80 px-1 py-0.5 rounded text-amber-300 font-mono">
                      Spine Crease
                    </span>
                  </div>

                  {/* Placeholders */}
                  {current.photoFrames.map((frame, fIdx) => (
                    <div
                      key={fIdx}
                      style={{
                        left: frame.x,
                        top: frame.y,
                        width: frame.w,
                        height: frame.h,
                      }}
                      className="absolute rounded-lg border-2 border-dashed border-amber-400/60 bg-[#120509]/85 flex flex-col items-center justify-center p-2 text-center transition-all hover:border-amber-400"
                    >
                      <ImageIcon className="w-5 h-5 text-amber-400/80 mb-1" />
                      <span className="font-serif font-bold text-xs text-amber-200">
                        {frame.label}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono mt-0.5">
                        {frame.ratio} Ratio Placeholder
                      </span>
                    </div>
                  ))}

                  {/* Spread Title Overlay */}
                  <div className="absolute bottom-6 left-8 z-10">
                    <div className="font-serif text-sm font-bold text-amber-300 tracking-wider">
                      {current.title}
                    </div>
                    <div className="text-[10px] text-zinc-400">{current.subtitle}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Safe margins verified for center gutter fold</span>
                  </div>
                  <button
                    onClick={handleStartDesigning}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>Open Spread in Studio</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 8. PRINT QUALITY & LAB STANDARDS SECTION */}
      <section className="py-24 bg-[#0d0e12] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Visual Print Diagram */}
            <div className="lg:col-span-6 relative">
              <div className="p-6 rounded-2xl bg-[#14161f] border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-white text-sm">
                    Print Lab Geometry Specifications
                  </span>
                  <span className="px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 font-mono font-bold text-[11px] border border-amber-500/30">
                    300 DPI Native
                  </span>
                </div>

                {/* Print Layout Diagram */}
                <div className="relative aspect-[2/1] w-full rounded-lg bg-[#0b0c10] border-2 border-red-500/60 p-4 flex flex-col justify-between">
                  {/* Bleed Edge Indicator */}
                  <div className="absolute -top-3 left-4 text-[9px] font-mono text-red-400 bg-[#0d0e12] px-1">
                    Outer Bleed Boundary (0.25 in / 6.35 mm)
                  </div>

                  {/* Trim Line */}
                  <div className="absolute inset-2 border border-dashed border-amber-400/50 rounded pointer-events-none" />
                  <div className="absolute top-0 right-4 text-[9px] font-mono text-amber-400 bg-[#0d0e12] px-1">
                    Trim Line (12 × 24 in)
                  </div>

                  {/* Safe Area */}
                  <div className="absolute inset-5 border border-emerald-500/60 bg-emerald-500/5 rounded pointer-events-none flex items-center justify-center">
                    <span className="text-xs font-serif font-bold text-emerald-300 bg-black/60 px-3 py-1 rounded">
                      Safe Working Area (0.5 in Inset)
                    </span>
                  </div>

                  {/* Center Crease / Gutter */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-amber-500/10 border-x border-amber-400/40 flex items-center justify-center">
                    <span className="text-[8px] font-mono text-amber-300 -rotate-90 whitespace-nowrap">
                      Center Fold / Spine Gutter
                    </span>
                  </div>
                </div>

                {/* Specification Table */}
                <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
                  <div className="p-2.5 rounded-lg bg-[#0e1017] border border-white/5">
                    <div className="text-zinc-400 text-[10px]">12 × 24" Pixel Map</div>
                    <div className="font-mono font-bold text-white text-xs mt-0.5">7200 × 3600 px</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0e1017] border border-white/5">
                    <div className="text-zinc-400 text-[10px]">12 × 36" Pixel Map</div>
                    <div className="font-mono font-bold text-white text-xs mt-0.5">10800 × 3600 px</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0e1017] border border-white/5">
                    <div className="text-zinc-400 text-[10px]">Color Gamut</div>
                    <div className="font-mono font-bold text-amber-300 text-xs mt-0.5">sRGB / CMYK Proof</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Copy */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                Industrial Print Standard
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Flawless Print Quality for Professional Labs
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Whether you print with Canvera, Millers, ProDPI, Zoomin, or your local professional lab, Album Design Studio exports exact uncompressed 300 DPI files with active crease protection so heads and hands are never cut in the book fold.
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block">Standard Panoramic Dimensions:</strong>
                    <span className="text-zinc-400">
                      12 × 24 inch, 12 × 36 inch, 24 × 36 inch, and custom millimeter configurations.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block">Zero Watermarks, Zero Artifacts:</strong>
                    <span className="text-zinc-400">
                      Clean exports without branding overlays. Download high-res PNG, vector SVG, or layout JSON for Photoshop.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block">Gamut Proofing Simulator:</strong>
                    <span className="text-zinc-400">
                      Toggle CMYK print gamut softening and monochrome contrast checks inside the live editor before sending to the lab.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CLIENT PROOFING SECTION */}
      <section className="py-24 bg-[#0f1015] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Copy */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                Client Collaboration
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Effortless Client Proofing & Revisions
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Eliminate endless back-and-forth WhatsApp screenshots and confusing email chains. Send your couple an interactive proofing link where they can browse full spreads, leave timestamped feedback, and click to approve.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-[#14161f] border border-white/10 space-y-1">
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <div className="font-bold text-white">1. Share Private Link</div>
                  <div className="text-[11px] text-zinc-400">One-click secret preview link for clients.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#14161f] border border-white/10 space-y-1">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <div className="font-bold text-white">2. Pin Comments</div>
                  <div className="text-[11px] text-zinc-400">Couple leaves specific notes per spread.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#14161f] border border-white/10 space-y-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <div className="font-bold text-white">3. Page Approvals</div>
                  <div className="text-[11px] text-zinc-400">Track approved vs revision spreads.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#14161f] border border-white/10 space-y-1">
                  <Printer className="w-4 h-4 text-rose-400" />
                  <div className="font-bold text-white">4. Ready to Print</div>
                  <div className="text-[11px] text-zinc-400">Instant lab batch export once signed off.</div>
                </div>
              </div>
            </div>

            {/* Right: Client Proof UI Mockup */}
            <div className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-[#14161f] border border-white/15 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-white text-sm">
                      Proofing Portal • Aarav & Ananya
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-semibold text-[10px] border border-amber-500/30">
                    Client Review Active
                  </span>
                </div>

                {/* Spread Preview Card */}
                <div className="relative aspect-[2/1] w-full rounded-lg bg-[#18090e] border border-amber-400/40 p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] text-amber-300 font-serif">
                    <span>Spread 04 of 20</span>
                    <span>Saat Phere & Mandap Vows</span>
                  </div>

                  {/* Sample Feedback Pin */}
                  <div className="absolute top-[35%] left-[60%] z-20 flex items-center gap-1.5 animate-bounce">
                    <div className="w-5 h-5 rounded-full bg-rose-500 text-black font-bold text-[10px] flex items-center justify-center shadow-lg">
                      1
                    </div>
                    <div className="bg-black/90 border border-rose-500/40 px-2 py-1 rounded text-[10px] text-rose-200">
                      "Please swap with close-up varmala photo"
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <span className="font-serif text-amber-200/80 text-xs">
                      Double Page Panoramic Spread (24 × 12 in)
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span>Status: Revision Requested</span>
                    <span>Canvera Ready</span>
                  </div>
                </div>

                {/* Client Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve Spread
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
                      Request Changes
                    </button>
                  </div>
                  <span className="text-[11px] text-zinc-500">1 Comment Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA SECTION */}
      <section className="py-28 bg-gradient-to-b from-[#0d0e12] via-[#150a0f] to-[#0a0407] border-b border-white/10 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(#e5b842_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Elevate Your Wedding Studio Output?</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
            "Your Story. Your Photos. <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Your Album."
            </span>
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join thousands of professional Indian wedding photographers creating luxury heirloom albums in minutes. No credit card required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleStartDesigning}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold text-base shadow-2xl shadow-amber-500/30 hover:scale-105 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-black" />
              <span>Start Designing Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/pricing"
              className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-semibold text-sm border border-white/10 hover:border-white/20 transition-all"
            >
              View Studio Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <Footer />
    </div>
  );
};
