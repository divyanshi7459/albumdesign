import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  BookOpen,
  Filter,
  ArrowRight,
  Layers,
  CheckCircle2,
  Eye,
  Sliders,
} from "lucide-react";
import { Navbar } from "../components/Website/Navbar";
import { Footer } from "../components/Website/Footer";
import { useAlbumStore } from "../store/useAlbumStore";
import { WeddingStyle, WeddingEvent } from "../types/album";

interface TemplateItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  style: WeddingStyle;
  event: WeddingEvent;
  spreads: number;
  bgGradient: string;
  accentColor: string;
  motif: string;
  description: string;
  featured?: boolean;
}

export const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { createProject } = useAlbumStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Templates" },
    { id: "royal", label: "Royal & Heritage" },
    { id: "rajasthani", label: "Rajasthani Haveli" },
    { id: "modern", label: "Modern Minimal" },
    { id: "pastel", label: "Pastel & Floral" },
    { id: "south-indian", label: "South Indian Temple" },
    { id: "punjabi", label: "Punjabi Festivity" },
  ];

  const templates: TemplateItem[] = [
    {
      id: "tpl-udaipur-royal",
      title: "Udaipur Royal Palace Vivah",
      subtitle: "Imperial Crimson & 24K Gold Foil",
      category: "royal",
      style: "Royal Indian Wedding",
      event: "Wedding",
      spreads: 20,
      bgGradient: "from-[#2b080f] via-[#1a0509] to-[#0c0204]",
      accentColor: "#E5B842",
      motif: "Mandala & Jharokha",
      description: "Designed for grand palace nuptials with gold foil borders, Vedic shlokas, and panoramic mandap heroes.",
      featured: true,
    },
    {
      id: "tpl-jaipur-haveli",
      title: "Jaipur Jharokha Legacy",
      subtitle: "Sandstone Haveli & Scalloped Arches",
      category: "rajasthani",
      style: "Rajasthani Royal",
      event: "Wedding",
      spreads: 25,
      bgGradient: "from-[#261305] via-[#170a02] to-[#0c0501]",
      accentColor: "#FBBF24",
      motif: "Jharokha Scalloped Arch",
      description: "Features ornate Rajasthani window arches, royal procession crests, and warm heritage palettes.",
      featured: true,
    },
    {
      id: "tpl-blush-pastel",
      title: "Blush Blossom Pastel Dream",
      subtitle: "Ethereal Daytime Mandap Romance",
      category: "pastel",
      style: "Pastel",
      event: "Pre-Wedding",
      spreads: 15,
      bgGradient: "from-[#1a141b] via-[#120d14] to-[#0b080d]",
      accentColor: "#F5D0FE",
      motif: "Soft Petal Vines",
      description: "Gentle blush, champagne, and soft lilac tones crafted for scenic outdoor and sundowner ceremonies.",
    },
    {
      id: "tpl-kanjeevaram-temple",
      title: "Kanjeevaram Temple Heritage",
      subtitle: "Gopuram Zari & Auspicious Brass",
      category: "south-indian",
      style: "South Indian",
      event: "Wedding",
      spreads: 20,
      bgGradient: "from-[#1e1503] via-[#130d01] to-[#080500]",
      accentColor: "#FACC15",
      motif: "Temple Gopuram Pillar",
      description: "Golden zari borders inspired by temple architecture, deep marigold touches, and traditional silk motifs.",
      featured: true,
    },
    {
      id: "tpl-editorial-modern",
      title: "Vogue Noir & Fine Minimal",
      subtitle: "High-Fashion Monochromatic Restraint",
      category: "modern",
      style: "Modern Wedding",
      event: "Reception",
      spreads: 18,
      bgGradient: "from-[#16171d] via-[#101116] to-[#0a0a0d]",
      accentColor: "#E2E8F0",
      motif: "Hairline Editorial",
      description: "Spacious negative space, clean typography, and asymmetrical editorial photo grids for chic modern couples.",
    },
    {
      id: "tpl-sangeet-gala",
      title: "Midnight Sangeet & Euphoria",
      subtitle: "Dynamic Choreography Collages",
      category: "royal",
      style: "Cinematic Wedding",
      event: "Sangeet",
      spreads: 15,
      bgGradient: "from-[#101217] via-[#0b0c10] to-[#060709]",
      accentColor: "#F59E0B",
      motif: "Widescreen 16:9 Letterbox",
      description: "High-contrast dynamic grids capturing fast-paced dances, stage performances, and DJ energy.",
    },
    {
      id: "tpl-phulkari-anand-karaj",
      title: "Phulkari Anand Karaj",
      subtitle: "Festive Saffron & Sangeet Joy",
      category: "punjabi",
      style: "Punjabi",
      event: "Wedding",
      spreads: 20,
      bgGradient: "from-[#280c1d] via-[#190611] to-[#0d0309]",
      accentColor: "#FDE047",
      motif: "Phulkari Geometric Zari",
      description: "Vibrant and celebratory design commemorating Gurdwara weddings with rich magenta and saffron borders.",
    },
    {
      id: "tpl-black-gold-royalty",
      title: "Black Velvet & 24K Gold",
      subtitle: "Opulent High-End Cocktail & Gala",
      category: "royal",
      style: "Black & Gold",
      event: "Reception",
      spreads: 15,
      bgGradient: "from-[#121212] via-[#090909] to-[#000000]",
      accentColor: "#F59E0B",
      motif: "Gilded Jaali Filigree",
      description: "Ultra-luxurious jet black velvet spread layouts with gleaming 24K gold foil corner filigree and borders.",
    },
  ];

  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  const handleUseTemplate = (tpl: TemplateItem) => {
    createProject({
      name: `${tpl.title}`,
      coupleNames: "Aarav & Ananya",
      style: tpl.style,
      event: tpl.event,
      spreadCount: tpl.spreads,
    });
    navigate("/studio");
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <Navbar />

      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-[#141620] via-[#0f1016] to-[#0d0e12] border-b border-white/5 relative">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curated Album Suites</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Indian Wedding Album Templates
          </h1>

          <p className="text-zinc-300 text-base max-w-2xl mx-auto leading-relaxed">
            Ready-to-use cohesive album collections. Open any template directly in the studio, customize layouts, drop in your photos, and export at 300 DPI.
          </p>

          {/* Categories bar */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-bold"
                    : "bg-[#161822] text-zinc-400 hover:text-white border border-white/5 hover:border-white/15"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className={`rounded-2xl bg-gradient-to-b ${tpl.bgGradient} border border-white/10 hover:border-amber-400/40 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between group`}
            >
              {/* Card visual mockup */}
              <div className="p-6 relative">
                {tpl.featured && (
                  <div className="absolute top-4 right-4 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider">
                    Featured
                  </div>
                )}

                {/* 2:1 Spread Mockup inside card */}
                <div className="aspect-[2/1] w-full rounded-xl bg-[#0a0507] border border-amber-400/30 p-3 relative flex items-center justify-center overflow-hidden mb-5 group-hover:scale-[1.02] transition-transform">
                  <div className="absolute inset-1.5 border border-amber-400/40 rounded pointer-events-none" />
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-amber-400/20 border-l border-dashed border-amber-400/40 pointer-events-none" />

                  <div className="flex flex-col items-center justify-center text-center space-y-1 z-10">
                    <span
                      className="text-[9px] uppercase tracking-widest font-mono font-bold"
                      style={{ color: tpl.accentColor }}
                    >
                      {tpl.motif}
                    </span>
                    <span className="font-serif font-bold text-xs text-white">
                      {tpl.title}
                    </span>
                    <span className="text-[9px] text-zinc-400">
                      {tpl.spreads} Coordinated Spreads • 300 DPI
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: tpl.accentColor }}
                    />
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider text-[10px]">
                      {tpl.style}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-white group-hover:text-amber-300 transition-colors">
                    {tpl.title}
                  </h3>

                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">
                    {tpl.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 bg-black/40 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-mono">
                  {tpl.spreads} Spreads
                </span>
                <button
                  onClick={() => handleUseTemplate(tpl)}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/10 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-black" />
                  <span>Use This Template</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
