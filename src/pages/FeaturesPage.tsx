import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Layers,
  Printer,
  BookOpen,
  Share2,
  Sliders,
  Palette,
  Shield,
  Eye,
  CheckCircle,
  Cpu,
  ArrowRight,
  Maximize2,
  Lock,
  FileCode,
  Zap,
} from "lucide-react";
import { Navbar } from "../components/Website/Navbar";
import { Footer } from "../components/Website/Footer";

export const FeaturesPage: React.FC = () => {
  const navigate = useNavigate();

  const featureDeepDives = [
    {
      id: "ai-layout-engine",
      badge: "Core AI Engine",
      title: "Procedural Geometric Layout Engine",
      subtitle: "Dynamic compositional balance without repetitive rigid templates",
      desc: "Our engine analyzes photo count, aspect ratios, and ceremony type to generate optically harmonious 2:1 panoramic double spreads. It mathematically respects the center crease gutter so subjects' faces and sacred rituals are never severed in book binding.",
      highlights: [
        "25+ compositional archetypes (Hero Portrait, Asymmetric Editorial, Cinematic Strip, Quad Grid, Royal Jharokha, and more)",
        "Center fold safety margin avoidance algorithms",
        "Golden ratio spacing with consistent padding between photo frames",
        "Deterministic seed generation for instant reproducible layout variations",
      ],
      icon: Sparkles,
      color: "text-amber-400",
      bgGradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    },
    {
      id: "editable-canvas",
      badge: "Professional Canvas",
      title: "Photoshop-Grade Layer & Transform Stack",
      subtitle: "Complete creative freedom over every single pixel and vector layer",
      desc: "Every motif, border, photo placeholder, text caption, and background element sits on an independent layer. Move, scale with 8 active bounding handles, rotate 360°, lock, hide, or duplicate with standard industry shortcuts.",
      highlights: [
        "8-handle live bounding box with aspect ratio lock and rotation stem",
        "Snap-to-spine crease alignment guides and auto-center markers",
        "Z-index stack reordering (Bring to Front, Send to Back, Step Up/Down)",
        "Live photo cropping, zoom, and border radius shaping",
      ],
      icon: Sliders,
      color: "text-blue-400",
      bgGradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    },
    {
      id: "indian-assets",
      badge: "Cultural Vector Assets",
      title: "Handcrafted Indian Wedding Vector Library",
      subtitle: "Authentic traditional motifs designed specifically for Vedic and regional ceremonies",
      desc: "Choose from an extensive library of scalable vector artwork including intricate mandalas, peacocks, sacred lotuses, paisley/kalka, kalash, diyas, jaali screens, and Rajasthani jharokha arches that scale infinitely without pixelation.",
      highlights: [
        "Scalable vector motifs with custom stroke, fill, and 24K gold foil tinting",
        "Authentic architectural borders (Mughal Arch, Scalloped Jharokha, Floral Vine)",
        "Traditional Sanskrit shloka typography (Shubh Vivah, Mangalam Bhagwan Vishnu, Saat Phere)",
        "Curated cultural palettes for Haldi, Mehendi, Sangeet, Phere, and Reception",
      ],
      icon: Palette,
      color: "text-rose-400",
      bgGradient: "from-rose-500/10 via-rose-500/5 to-transparent",
    },
    {
      id: "print-engine",
      badge: "Industrial Print Standards",
      title: "300 DPI Native CMYK Print Engine",
      subtitle: "Direct laboratory compatibility for Canvera, Millers, and premier labs",
      desc: "Never compromise on print resolution. Album Design Studio renders exact 300 DPI uncompressed files with 0.25\" outer bleed, 0.5\" inner safe areas, and active center crease gutter lines.",
      highlights: [
        "Pre-configured for 12×24\", 12×36\", 24×36\" panoramic spreads",
        "7200 × 3600 pixel uncompressed 300 DPI PNG & vector SVG downloads",
        "Color gamut simulator for soft-proofing CMYK color shifts before printing",
        "Adobe Photoshop JSX layout script export for advanced studio retouching",
      ],
      icon: Printer,
      color: "text-emerald-400",
      bgGradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    },
    {
      id: "storybook-builder",
      badge: "Batch Automation",
      title: "Full Storybook Album Generator",
      subtitle: "Generate 10 to 40 coordinated spreads in under 30 seconds",
      desc: "Select your client's wedding style and book length. The Storybook Builder automatically creates a chronological, ceremony-accurate sequence from Haldi and Mehendi through Sangeet, Mandap Phere, and Reception.",
      highlights: [
        "Chronological ceremony progression adhering to Indian wedding traditions",
        "Visual style consistency maintained across the entire book",
        "Procedural variety ensures no two consecutive spreads look identical",
        "Instant batch preview and re-generation per individual spread",
      ],
      icon: BookOpen,
      color: "text-purple-400",
      bgGradient: "from-purple-500/10 via-purple-500/5 to-transparent",
    },
    {
      id: "client-proofing",
      badge: "Client Collaboration",
      title: "Interactive Client Proofing Portal",
      subtitle: "Eliminate messy email threads and disorganized phone notes",
      desc: "Send your couples a private, password-protected web portal to review their album. Clients flip through realistic spreads, pinpoint specific revision requests, and sign off on final pages.",
      highlights: [
        "One-click private link generation with zero account creation required for clients",
        "Pinpoint feedback markers directly on specific photos or motifs",
        "Spread-by-spread approval status tracking (Pending, Approved, Needs Revision)",
        "3D realistic flipbook mode for emotional couple previews",
      ],
      icon: Share2,
      color: "text-amber-300",
      bgGradient: "from-amber-400/10 via-amber-400/5 to-transparent",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0e12] text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="py-20 bg-gradient-to-b from-[#141620] via-[#0f1016] to-[#0d0e12] border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Platform Capabilities</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Every Feature Built for{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              High-End Wedding Studios
            </span>
          </h1>

          <p className="text-zinc-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Engineered from the ground up to solve the specific design, cultural, and print lab challenges faced by Indian wedding photographers and album artists worldwide.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={() => navigate("/studio")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Studio Editor</span>
            </button>
            <Link
              to="/templates"
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-semibold text-sm border border-white/10 transition-colors"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Deep Dives */}
      <section className="py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {featureDeepDives.map((feat, idx) => {
          const IconComp = feat.icon;
          const isReversed = idx % 2 === 1;

          return (
            <div
              key={feat.id}
              className={`p-8 sm:p-12 rounded-3xl bg-[#13151e] border border-white/10 relative overflow-hidden flex flex-col ${
                isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-10 items-center justify-between shadow-2xl`}
            >
              {/* Background ambient glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feat.bgGradient} pointer-events-none opacity-40`}
              />

              {/* Text column */}
              <div className="lg:w-7/12 space-y-6 relative z-10 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  <IconComp className={`w-3.5 h-3.5 ${feat.color}`} />
                  <span>{feat.badge}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {feat.title}
                </h2>

                <p className="text-amber-300/90 text-sm font-medium">
                  {feat.subtitle}
                </p>

                <p className="text-zinc-300 text-sm leading-relaxed">
                  {feat.desc}
                </p>

                <div className="space-y-3 pt-2">
                  {feat.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-3 text-xs text-zinc-300">
                      <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3" />
                      </div>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphic / Visual Box */}
              <div className="lg:w-5/12 w-full relative z-10">
                <div className="aspect-[4/3] rounded-2xl bg-[#0b0c11] border border-white/10 p-6 flex flex-col justify-between shadow-inner relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-mono text-[11px] uppercase text-amber-400">
                      Module Status: Active
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5">ADS Engine v2.4</span>
                  </div>

                  <div className="my-auto flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shadow-xl group-hover:scale-110 transition-transform">
                      <IconComp className="w-8 h-8" />
                    </div>
                    <div className="font-serif font-bold text-base text-white">
                      {feat.title}
                    </div>
                    <div className="text-xs text-zinc-400 max-w-xs">
                      Fully integrated into Album Studio canvas & export pipeline.
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-zinc-500">Industry Calibrated</span>
                    <button
                      onClick={() => navigate("/studio")}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      <span>Try in Studio</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a0b0f] text-center border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="font-serif text-3xl font-bold text-white">
            Experience the Complete Studio Today
          </h2>
          <p className="text-zinc-400 text-sm">
            No steep learning curve. No clunky plugins. Start generating professional Indian wedding album spreads immediately.
          </p>
          <button
            onClick={() => navigate("/studio")}
            className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
          >
            Open Album Design Studio
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};
