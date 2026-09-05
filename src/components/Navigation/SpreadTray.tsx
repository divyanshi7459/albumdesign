import React from "react";
import { AlbumSpread } from "../../types/album";
import { Plus, Copy, Trash2, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface SpreadTrayProps {
  spreads: AlbumSpread[];
  currentIndex: number;
  onSelectSpread: (index: number) => void;
  onAddSpread: () => void;
  onDuplicateSpread: (index: number) => void;
  onDeleteSpread: (index: number) => void;
}

export const SpreadTray: React.FC<SpreadTrayProps> = ({
  spreads,
  currentIndex,
  onSelectSpread,
  onAddSpread,
  onDuplicateSpread,
  onDeleteSpread,
}) => {
  const getStatusBadge = (status: AlbumSpread["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-3 h-3 text-emerald-400" title="Client Approved" />;
      case "needs-revision":
        return <AlertCircle className="w-3 h-3 text-rose-400" title="Needs Revision" />;
      default:
        return <Clock className="w-3 h-3 text-amber-400/70" title="Draft / Pending" />;
    }
  };

  return (
    <div className="h-24 bg-[#14161b] border-t border-white/10 px-4 flex items-center gap-3 overflow-x-auto select-none z-20 custom-scrollbar">
      <div className="flex items-center gap-2 pr-3 border-r border-white/10 shrink-0">
        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
          Spreads ({spreads.length})
        </span>
        <button
          onClick={onAddSpread}
          className="px-2 py-1 bg-white/5 hover:bg-white/10 text-amber-300 border border-white/10 rounded flex items-center gap-1 text-xs transition-colors"
          title="Add New Spread"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New</span>
        </button>
      </div>

      <div className="flex items-center gap-3 py-1">
        {spreads.map((spread, idx) => {
          const isSelected = idx === currentIndex;

          return (
            <div
              key={spread.id}
              onClick={() => onSelectSpread(idx)}
              className={`relative shrink-0 w-36 h-18 rounded-md border transition-all cursor-pointer group flex flex-col justify-between p-1.5 ${
                isSelected
                  ? "border-amber-400 bg-amber-500/10 shadow-[0_0_12px_rgba(245,158,11,0.2)] ring-1 ring-amber-400"
                  : "border-white/10 bg-[#181a20] hover:border-white/30"
              }`}
            >
              {/* Top Meta info */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400">
                  #{idx + 1}
                </span>
                <span className="text-[9px] px-1 rounded bg-black/40 text-amber-300/90 font-medium truncate max-w-[70px]">
                  {spread.event}
                </span>
                {getStatusBadge(spread.status)}
              </div>

              {/* Spread Miniature Preview (Abstract mini layout) */}
              <div className="relative w-full h-7 bg-black/40 rounded overflow-hidden flex items-center justify-center border border-white/5">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-rose-500/30" />
                <div className="flex gap-1 items-center px-1">
                  <div className="w-4 h-4 rounded-sm border border-amber-400/40 bg-white/5" />
                  <div className="w-6 h-4 rounded-sm border border-amber-400/40 bg-white/5" />
                  <div className="w-4 h-4 rounded-sm border border-amber-400/40 bg-white/5" />
                </div>
              </div>

              {/* Hover Actions (Duplicate / Delete) */}
              <div className="absolute top-1 right-1 hidden group-hover:flex items-center gap-1 bg-black/80 rounded p-0.5 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicateSpread(idx);
                  }}
                  className="p-0.5 hover:text-amber-400 text-zinc-400"
                  title="Duplicate Spread"
                >
                  <Copy className="w-2.5 h-2.5" />
                </button>
                {spreads.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSpread(idx);
                    }}
                    className="p-0.5 hover:text-rose-400 text-zinc-400"
                    title="Delete Spread"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
