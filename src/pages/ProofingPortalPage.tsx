import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Share2,
  Eye,
  Sparkles,
  Download,
  ShieldCheck,
  Send,
  Lock,
} from "lucide-react";
import { useAlbumStore } from "../store/useAlbumStore";
import { ProofStatus } from "../types/album";
import { FlipbookModal } from "../components/Modals/FlipbookModal";

export const ProofingPortalPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    projects,
    updateSpreadStatus,
    addCommentToSpread,
    toggleCommentResolved,
  } = useAlbumStore();

  const project = projects.find((p) => p.id === id) || projects[0];
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState<number>(0);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState<boolean>(false);
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("Ananya (Bride)");
  const [isPinModeActive, setIsPinModeActive] = useState(false);
  const [pinCoords, setPinCoords] = useState<{ x: number; y: number } | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0d0e12] text-white flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-2xl font-bold">Album Not Found</h1>
          <p className="text-zinc-400 text-xs">The requested client proofing link has expired or does not exist.</p>
          <Link to="/" className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const currentSpread = project.spreads[currentSpreadIndex] || project.spreads[0];
  const totalSpreads = project.spreads.length;

  const handleSpreadClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPinModeActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPinCoords({ x, y });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addCommentToSpread(currentSpread.id, {
      author: commentAuthor,
      text: commentText,
      x: pinCoords?.x,
      y: pinCoords?.y,
    });
    setCommentText("");
    setPinCoords(null);
    setIsPinModeActive(false);
  };

  const handleStatusChange = (status: ProofStatus) => {
    updateSpreadStatus(currentSpread.id, status);
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Client Proofing Bar */}
      <header className="h-16 bg-[#10121a] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-sm text-white">{project.coupleNames}</h1>
              <span className="text-[10px] px-2 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 uppercase">
                Client Review
              </span>
            </div>
            <div className="text-[11px] text-zinc-400">
              {project.name} • Spread {currentSpreadIndex + 1} of {totalSpreads}
            </div>
          </div>
        </div>

        {/* Center Navigation */}
        <div className="flex items-center gap-2">
          <button
            disabled={currentSpreadIndex === 0}
            onClick={() => setCurrentSpreadIndex((prev) => Math.max(0, prev - 1))}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-semibold text-zinc-300 px-2">
            {currentSpreadIndex + 1} / {totalSpreads}
          </span>
          <button
            disabled={currentSpreadIndex === totalSpreads - 1}
            onClick={() => setCurrentSpreadIndex((prev) => Math.min(totalSpreads - 1, prev + 1))}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFlipbookOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 text-xs font-semibold border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>3D Flipbook</span>
          </button>

          <Link
            to="/studio"
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-xs font-bold border border-amber-500/30 transition-colors"
          >
            Open in Studio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-start">
        {/* Left / Center: The Spread Canvas */}
        <div className="flex-1 w-full space-y-4">
          {/* Status & Feedback Controls */}
          <div className="p-3.5 rounded-2xl bg-[#13151f] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">Page Status:</span>
              {currentSpread.status === "approved" && (
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approved by Client
                </span>
              )}
              {currentSpread.status === "needs-revision" && (
                <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Changes Requested
                </span>
              )}
              {currentSpread.status === "pending" && (
                <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  Pending Review
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPinModeActive(!isPinModeActive)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isPinModeActive
                    ? "bg-rose-500 text-white border-rose-400 animate-pulse"
                    : "bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isPinModeActive ? "Click on canvas to place pin" : "Pin Feedback Note"}</span>
              </button>

              <button
                onClick={() => handleStatusChange("approved")}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-bold border border-emerald-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approve This Spread</span>
              </button>

              <button
                onClick={() => handleStatusChange("needs-revision")}
                className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 font-bold border border-rose-500/40 transition-colors cursor-pointer"
              >
                Request Revision
              </button>
            </div>
          </div>

          {/* 2:1 Panoramic Canvas Viewport */}
          <div
            onClick={handleSpreadClick}
            className={`relative aspect-[2/1] w-full rounded-2xl bg-[#14080c] border-2 border-amber-500/40 shadow-2xl overflow-hidden select-none ${
              isPinModeActive ? "cursor-crosshair" : "cursor-default"
            }`}
          >
            {/* Texture background */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5b842_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />

            {/* Crease line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 border-l border-dashed border-amber-400/40 pointer-events-none flex flex-col justify-between py-2 items-center z-10">
              <span className="text-[8px] bg-black/80 px-1 py-0.5 rounded text-amber-300 font-mono">
                Center Crease
              </span>
            </div>

            {/* Outer border decoration */}
            <div className="absolute inset-3 border-2 border-amber-400/40 rounded pointer-events-none" />

            {/* Photo Placeholders rendering */}
            {currentSpread.layers
              .filter((l): l is import("../types/album").PhotoPlaceholderLayer => l.type === "photo-placeholder")
              .map((layer) => (
                <div
                  key={layer.id}
                  style={{
                    left: `${(layer.x / 7200) * 100}%`,
                    top: `${(layer.y / 3600) * 100}%`,
                    width: `${(layer.width / 7200) * 100}%`,
                    height: `${(layer.height / 3600) * 100}%`,
                    transform: `rotate(${layer.rotation || 0}deg)`,
                  }}
                  className="absolute rounded border border-dashed border-amber-400/60 bg-[#120509]/85 flex flex-col items-center justify-center p-2 text-center"
                >
                  <span className="font-serif font-bold text-[11px] text-amber-200">
                    {layer.name}
                  </span>
                  <span className="text-[9px] text-zinc-400">Photo Frame</span>
                </div>
              ))}

            {/* Text layers */}
            {currentSpread.layers
              .filter((l): l is import("../types/album").TextLayer => l.type === "text")
              .map((layer) => (
                <div
                  key={layer.id}
                  style={{
                    left: `${(layer.x / 7200) * 100}%`,
                    top: `${(layer.y / 3600) * 100}%`,
                    color: layer.color || "#E5B842",
                  }}
                  className="absolute font-serif font-bold text-xs tracking-wider uppercase pointer-events-none z-10"
                >
                  {layer.text}
                </div>
              ))}

            {/* Placed Comment Pins */}
            {(currentSpread.comments || []).map((cmt, cIdx) => (
              <div
                key={cmt.id}
                style={{
                  left: cmt.x !== undefined ? `${cmt.x}%` : `${30 + cIdx * 15}%`,
                  top: cmt.y !== undefined ? `${cmt.y}%` : "40%",
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group"
              >
                <div
                  className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shadow-xl border-2 border-white ${
                    cmt.resolved ? "bg-emerald-500 text-black" : "bg-rose-500 text-white animate-bounce"
                  }`}
                >
                  {cIdx + 1}
                </div>
                {/* Tooltip on hover */}
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded bg-black/95 text-white text-[11px] border border-white/20 shadow-2xl z-40">
                  <div className="font-bold text-amber-300">{cmt.author}</div>
                  <div className="text-zinc-300 mt-0.5">{cmt.text}</div>
                </div>
              </div>
            ))}

            {/* Active Placement Pin */}
            {pinCoords && (
              <div
                style={{ left: `${pinCoords.x}%`, top: `${pinCoords.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-amber-400 text-black font-bold text-xs flex items-center justify-center border-2 border-white animate-ping"
              >
                !
              </div>
            )}
          </div>

          {/* Filmstrip Bottom Thumbnails */}
          <div className="p-3 rounded-2xl bg-[#13151f] border border-white/10 flex items-center gap-3 overflow-x-auto">
            {project.spreads.map((sp, idx) => (
              <button
                key={sp.id}
                onClick={() => setCurrentSpreadIndex(idx)}
                className={`shrink-0 w-28 aspect-[2/1] rounded-lg p-1 text-left relative transition-all border ${
                  currentSpreadIndex === idx
                    ? "border-amber-400 bg-amber-500/20"
                    : "border-white/10 bg-black/40 hover:border-white/20"
                }`}
              >
                <div className="text-[9px] font-bold text-amber-300 truncate">
                  Spread {idx + 1}
                </div>
                <div className="text-[8px] text-zinc-400 truncate">{sp.event}</div>
                {sp.status === "approved" && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
                )}
                {sp.status === "needs-revision" && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Comments & Revision Feed */}
        <div className="w-full lg:w-80 bg-[#13151f] border border-white/10 rounded-2xl p-5 space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-serif font-bold text-sm text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>Spread Feedback</span>
            </h3>
            <span className="text-[10px] text-zinc-400 font-mono">
              {(currentSpread.comments || []).length} Notes
            </span>
          </div>

          {/* Pin form */}
          <form onSubmit={handleAddComment} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                placeholder="Ananya (Bride)"
                className="w-full px-3 py-1.5 rounded-lg bg-[#0b0c11] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                Feedback / Revision Request
              </label>
              <textarea
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="e.g. Please swap the top right photo with photo #142..."
                className="w-full px-3 py-1.5 rounded-lg bg-[#0b0c11] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Feedback Note</span>
            </button>
          </form>

          {/* Comment list */}
          <div className="space-y-2.5 pt-2 max-h-64 overflow-y-auto">
            {(currentSpread.comments || []).length === 0 ? (
              <div className="text-center py-6 text-zinc-500 text-xs">
                No feedback notes yet. Click "Pin Feedback Note" to leave specific comments for your photographer.
              </div>
            ) : (
              (currentSpread.comments || []).map((c, idx) => (
                <div
                  key={c.id}
                  className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                    c.resolved
                      ? "bg-emerald-500/10 border-emerald-500/20 text-zinc-400"
                      : "bg-[#0b0c11] border-white/10 text-zinc-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300">
                      #{idx + 1} {c.author}
                    </span>
                    <button
                      onClick={() => toggleCommentResolved(currentSpread.id, c.id)}
                      className="text-[10px] text-zinc-400 hover:text-emerald-300 underline cursor-pointer"
                    >
                      {c.resolved ? "Mark Unresolved" : "Mark Resolved"}
                    </button>
                  </div>
                  <p className="text-xs leading-relaxed">{c.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* 3D Flipbook Modal */}
      <FlipbookModal
        isOpen={isFlipbookOpen}
        onClose={() => setIsFlipbookOpen(false)}
        spreads={project.spreads}
        albumTitle={project.name}
      />
    </div>
  );
};
