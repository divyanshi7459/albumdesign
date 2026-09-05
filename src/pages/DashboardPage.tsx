import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Sparkles,
  Plus,
  Upload,
  Layers,
  Printer,
  Share2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Copy,
  Trash2,
  Download,
  Search,
  Filter,
  Eye,
  ExternalLink,
  User,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useAlbumStore } from "../store/useAlbumStore";
import { NewAlbumModal } from "../components/Dashboard/NewAlbumModal";
import { ImportModal } from "../components/Dashboard/ImportModal";
import { Project } from "../types/album";
import { Navbar } from "../components/Website/Navbar";
import { Footer } from "../components/Website/Footer";

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    projects,
    setActiveProjectId,
    duplicateProject,
    deleteProject,
    demoLogin,
    logout,
  } = useAlbumStore();

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.coupleNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.style.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "in-review") return matchesSearch && p.status === "in-review";
    if (selectedFilter === "approved") return matchesSearch && p.status === "approved";
    if (selectedFilter === "draft") return matchesSearch && p.status === "draft";
    return matchesSearch;
  });

  const handleOpenStudio = (projectId: string) => {
    setActiveProjectId(projectId);
    navigate("/studio");
  };

  const handleOpenProof = (projectId: string) => {
    setActiveProjectId(projectId);
    navigate(`/proof/${projectId}`);
  };

  const handleExportJSON = (p: Project) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(p, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${p.name.replace(/\s+/g, "_")}.ads.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Metrics
  const totalSpreadsCount = projects.reduce((acc, p) => acc + p.spreads.length, 0);
  const inReviewCount = projects.filter((p) => p.status === "in-review").length;
  const approvedCount = projects.filter((p) => p.status === "approved").length;

  return (
    <div className="min-h-screen bg-[#0d0e12] text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Studio Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#141620] border border-white/10 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center border border-amber-300/40 shadow-lg shadow-amber-500/20 text-black font-bold font-serif text-xl">
              {user?.name?.[0] || "V"}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl font-bold text-white">
                  {user?.companyName || "Royal Heritage Album Studio"}
                </h1>
                {user?.isDemo && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase tracking-wider">
                    Demo Studio Mode
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Director: {user?.name || "Vikram Singhania"} • {user?.email || "vikram@royalweddings.studio"}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-blue-400" />
              <span>Import Project</span>
            </button>

            <button
              onClick={() => setIsNewModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>New Wedding Album</span>
            </button>
          </div>
        </div>

        {/* Studio Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#13151f] border border-white/5 space-y-1 text-left">
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              Total Wedding Albums
            </div>
            <div className="font-serif text-3xl font-bold text-white">{projects.length}</div>
            <div className="text-[10px] text-zinc-500">Active studio projects</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#13151f] border border-white/5 space-y-1 text-left">
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              Total Double Spreads
            </div>
            <div className="font-serif text-3xl font-bold text-amber-400">{totalSpreadsCount}</div>
            <div className="text-[10px] text-zinc-500">300 DPI panoramic layouts</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#13151f] border border-white/5 space-y-1 text-left">
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              Client Review Active
            </div>
            <div className="font-serif text-3xl font-bold text-blue-400">{inReviewCount}</div>
            <div className="text-[10px] text-zinc-500">Waiting for couple sign-off</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#13151f] border border-white/5 space-y-1 text-left">
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              Approved & Ready
            </div>
            <div className="font-serif text-3xl font-bold text-emerald-400">{approvedCount}</div>
            <div className="text-[10px] text-zinc-500">Canvera & Millers ready</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search albums, couples, styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141620] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
            {["all", "in-review", "approved", "draft"].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                  selectedFilter === f
                    ? "bg-amber-500 text-black font-bold"
                    : "bg-[#141620] text-zinc-400 hover:text-white border border-white/5"
                }`}
              >
                {f === "all" ? "All Albums" : f.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => {
            const firstSpread = proj.spreads[0];

            return (
              <div
                key={proj.id}
                className="rounded-2xl bg-[#141620] border border-white/10 hover:border-amber-400/40 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between group text-left"
              >
                {/* 2:1 Spread Miniature View */}
                <div
                  onClick={() => handleOpenStudio(proj.id)}
                  className="p-4 cursor-pointer relative bg-[#0d0f16] group-hover:bg-[#10121b] transition-colors"
                >
                  <div className="aspect-[2/1] w-full rounded-xl bg-[#17080d] border border-amber-500/30 p-2 relative flex items-center justify-center overflow-hidden shadow-inner">
                    {/* Spine crease line */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 border-l border-dashed border-amber-400/40 pointer-events-none" />

                    {/* Miniature Placeholder outlines */}
                    <div className="absolute top-[20%] left-[10%] w-[35%] h-[60%] rounded border border-dashed border-amber-400/60 flex items-center justify-center text-[9px] text-amber-200">
                      Hero 3:4
                    </div>
                    <div className="absolute top-[20%] left-[55%] w-[35%] h-[60%] rounded border border-dashed border-amber-400/60 flex items-center justify-center text-[9px] text-amber-200">
                      Ritual 3:4
                    </div>

                    <div className="absolute bottom-2 left-3 text-[9px] font-serif font-bold text-amber-300/80">
                      {proj.coupleNames}
                    </div>

                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-zinc-400 text-[9px] font-mono">
                      {proj.dimensions.presetName.split(" ")[0]}
                    </div>
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {proj.style}
                      </span>

                      {/* Status badge */}
                      {proj.status === "in-review" && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Client Review
                        </span>
                      )}
                      {proj.status === "approved" && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      )}
                      {proj.status === "draft" && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-500/20 text-zinc-300 border border-zinc-500/30">
                          Draft
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => handleOpenStudio(proj.id)}
                      className="font-serif font-bold text-lg text-white group-hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      {proj.name}
                    </h3>

                    <div className="text-xs text-zinc-400 mt-1">
                      {proj.weddingDate || "Winter Wedding Season"}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-500 pt-2 font-mono">
                      <span>{proj.spreads.length} Spreads</span>
                      <span>•</span>
                      <span>300 DPI</span>
                      <span>•</span>
                      <span>{proj.event}</span>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenStudio(proj.id)}
                      className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Edit in Studio</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenProof(proj.id)}
                        title="Open Client Proofing Portal"
                        className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Share2 className="w-4 h-4 text-blue-400" />
                      </button>

                      <button
                        onClick={() => handleExportJSON(proj)}
                        title="Download JSON Project Backup"
                        className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Download className="w-4 h-4 text-emerald-400" />
                      </button>

                      <button
                        onClick={() => duplicateProject(proj.id)}
                        title="Duplicate Album"
                        className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      {projects.length > 1 && (
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${proj.name}?`)) {
                              deleteProject(proj.id);
                            }
                          }}
                          title="Delete Album"
                          className="p-2 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-white/5 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modals */}
      <NewAlbumModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onCreated={(id) => {
          setIsNewModalOpen(false);
          setActiveProjectId(id);
          navigate("/studio");
        }}
      />

      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImported={(id) => {
          setIsImportModalOpen(false);
          setActiveProjectId(id);
          navigate("/studio");
        }}
      />

      <Footer />
    </div>
  );
};
