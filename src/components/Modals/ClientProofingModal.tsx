import React, { useState } from "react";
import { AlbumSpread, ProofComment, ProofStatus } from "../../types/album";
import { CheckCircle2, AlertCircle, MessageSquare, Copy, Check, X, Share2, Send } from "lucide-react";

interface ClientProofingModalProps {
  spreads: AlbumSpread[];
  currentSpreadIndex: number;
  onSelectSpread: (index: number) => void;
  onUpdateSpreadStatus: (spreadId: string, status: ProofStatus) => void;
  onAddComment: (spreadId: string, comment: string) => void;
  onClose: () => void;
}

export const ClientProofingModal: React.FC<ClientProofingModalProps> = ({
  spreads,
  currentSpreadIndex,
  onSelectSpread,
  onUpdateSpreadStatus,
  onAddComment,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [commentText, setCommentText] = useState("");

  const currentSpread = spreads[currentSpreadIndex];

  // Count approved spreads
  const approvedCount = spreads.filter((s) => s.status === "approved").length;
  const progressPercent = Math.round((approvedCount / spreads.length) * 100);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(currentSpread.id, commentText.trim());
    setCommentText("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 select-none animate-in fade-in duration-200">
      <div className="w-full max-w-5xl h-[85vh] bg-[#181a20] border border-white/15 rounded-xl shadow-2xl flex flex-col overflow-hidden text-zinc-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#14161b]">
          <div className="flex items-center gap-3">
            <Share2 className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-serif text-base text-zinc-100 font-bold">
                Client Proofing & Album Approval Portal
              </h3>
              <p className="text-xs text-zinc-400">
                Share with the bride, groom and family for feedback and print sign-off.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-xs font-medium flex items-center gap-1.5 transition-colors border border-white/10"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "Proofing Link Copied!" : "Copy Client Share Link"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3 bg-[#111317] border-b border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Overall Approval Progress:</span>
            <span className="font-semibold text-emerald-400">
              {approvedCount} of {spreads.length} Spreads Approved ({progressPercent}%)
            </span>
          </div>

          <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Body Split */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Spread Visual & Status controls */}
          <div className="flex-1 p-6 flex flex-col justify-between border-r border-white/10 overflow-y-auto">
            {/* Spread Meta & Switcher */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                  Spread {currentSpreadIndex + 1} • {currentSpread.event}
                </span>
                <h4 className="font-serif text-lg font-bold text-zinc-100">{currentSpread.title}</h4>
              </div>

              {/* Status Decision Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateSpreadStatus(currentSpread.id, "approved")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    currentSpread.status === "approved"
                      ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                      : "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve Spread</span>
                </button>

                <button
                  onClick={() => onUpdateSpreadStatus(currentSpread.id, "needs-revision")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    currentSpread.status === "needs-revision"
                      ? "bg-rose-500 text-black shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                      : "bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30"
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Request Revisions</span>
                </button>
              </div>
            </div>

            {/* Simulated Spread Preview Card */}
            <div className="relative w-full aspect-[2/1] bg-[#faf7ef] rounded-lg shadow-xl overflow-hidden my-auto border border-white/20 flex">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-rose-500/40 z-20" />
              <div className="w-1/2 h-full p-4 flex flex-col justify-between border-r border-black/10">
                <div className="font-serif text-sm font-bold text-[#3D0B14]">{currentSpread.event}</div>
                <div className="flex-1 my-2 border-2 border-dashed border-amber-600/30 rounded flex items-center justify-center bg-amber-500/5">
                  <span className="text-[10px] font-serif text-amber-800/60 italic">Photo Frame 1</span>
                </div>
              </div>
              <div className="w-1/2 h-full p-4 flex flex-col justify-between">
                <div className="flex-1 my-2 border-2 border-dashed border-amber-600/30 rounded flex items-center justify-center bg-amber-500/5">
                  <span className="text-[10px] font-serif text-amber-800/60 italic">Photo Frame 2</span>
                </div>
                <div className="text-right text-[10px] font-serif text-[#3D0B14]">{currentSpread.title}</div>
              </div>
            </div>

            {/* Spread Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto pt-4 border-t border-white/10">
              {spreads.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => onSelectSpread(idx)}
                  className={`px-3 py-1.5 rounded text-xs transition-colors shrink-0 flex items-center gap-1.5 ${
                    idx === currentSpreadIndex
                      ? "bg-amber-500 text-black font-semibold"
                      : "bg-white/5 hover:bg-white/10 text-zinc-300"
                  }`}
                >
                  <span>Spread {idx + 1}</span>
                  {s.status === "approved" && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  {s.status === "needs-revision" && <AlertCircle className="w-3 h-3 text-rose-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Client Comments & Revisions Feedback */}
          <div className="w-80 p-4 bg-[#14161b] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-white/10 mb-3">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <h5 className="font-semibold text-xs text-zinc-200">
                  Spread Feedback ({currentSpread.comments?.length || 0})
                </h5>
              </div>

              {/* Comments List */}
              <div className="space-y-2.5 max-h-[42vh] overflow-y-auto pr-1 custom-scrollbar">
                {(!currentSpread.comments || currentSpread.comments.length === 0) ? (
                  <div className="text-center py-8 text-zinc-500 text-xs">
                    <p>No revision requests yet on this spread.</p>
                  </div>
                ) : (
                  currentSpread.comments.map((c) => (
                    <div key={c.id} className="p-2.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-zinc-400">
                        <span className="font-semibold text-amber-300">{c.author}</span>
                        <span>{new Date(c.date || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                      <p className="text-xs text-zinc-200 leading-relaxed">{c.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Comment Input */}
            <form onSubmit={handlePostComment} className="pt-3 border-t border-white/10">
              <label className="text-[11px] font-medium text-zinc-300 block mb-1.5">
                Add Revision Note / Instruction:
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="e.g. Please swap the left photo with the high-angle garland shot..."
                  className="w-full bg-[#181a20] border border-white/15 rounded-lg p-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none font-sans"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="absolute bottom-2.5 right-2.5 p-1.5 rounded-md bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
