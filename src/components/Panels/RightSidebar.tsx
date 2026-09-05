import React, { useState } from "react";
import {
  AlbumLayer,
  PhotoPlaceholderLayer,
  TextLayer,
  MotifLayer,
  BorderLayer,
  BackgroundLayer,
  FloralLayer,
  LuxuryAccentLayer,
  PhotoShape,
} from "../../types/album";
import {
  Layers,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  ChevronUp,
  ChevronDown,
  Trash2,
  Copy,
  Sliders,
  Type,
  Image as ImageIcon,
  Square,
  Sparkles,
  Maximize2,
} from "lucide-react";

interface RightSidebarProps {
  layers: AlbumLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (layerId: string | null) => void;
  onUpdateLayer: (layer: AlbumLayer) => void;
  onDeleteLayer: (layerId: string) => void;
  onDuplicateLayer: (layerId: string) => void;
  onReorderLayer: (layerId: string, direction: "up" | "down" | "top" | "bottom") => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  layers,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayer,
  onDeleteLayer,
  onDuplicateLayer,
  onReorderLayer,
}) => {
  const [activeTab, setActiveTab] = useState<"layers" | "properties">("layers");

  const selectedLayer = layers.find((l) => l.id === selectedLayerId);

  // Sorted layers (descending by zIndex for Photoshop-style display: top layers on top)
  const displayLayers = [...layers].sort((a, b) => b.zIndex - a.zIndex);

  const getLayerIcon = (type: AlbumLayer["type"]) => {
    switch (type) {
      case "photo-placeholder":
        return <ImageIcon className="w-3.5 h-3.5 text-blue-400" />;
      case "text":
        return <Type className="w-3.5 h-3.5 text-amber-400" />;
      case "motif":
        return <Sparkles className="w-3.5 h-3.5 text-yellow-400" />;
      case "border":
        return <Square className="w-3.5 h-3.5 text-emerald-400" />;
      case "background":
        return <Layers className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-zinc-400" />;
    }
  };

  return (
    <div className="w-80 h-full bg-[#181a20] border-l border-white/10 flex flex-col select-none text-zinc-300 z-20 text-xs">
      {/* TABS */}
      <div className="flex border-b border-white/10 bg-[#14161b]">
        <button
          onClick={() => setActiveTab("layers")}
          className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 font-medium border-b-2 transition-colors ${
            activeTab === "layers"
              ? "border-amber-400 text-amber-300 bg-white/[0.02]"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>Layers ({layers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("properties")}
          className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 font-medium border-b-2 transition-colors ${
            activeTab === "properties"
              ? "border-amber-400 text-amber-300 bg-white/[0.02]"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span>Properties</span>
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
        {/* ================= 1. LAYERS PANEL ================= */}
        {activeTab === "layers" && (
          <div className="space-y-1.5">
            {/* Quick Actions Header */}
            {selectedLayer && (
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-zinc-400">
                <span className="truncate max-w-[140px] text-zinc-200 font-medium">
                  {selectedLayer.name}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onReorderLayer(selectedLayer.id, "top")}
                    title="Bring to Front"
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                  <button
                    onClick={() => onReorderLayer(selectedLayer.id, "bottom")}
                    title="Send to Back"
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                  <button
                    onClick={() => onDuplicateLayer(selectedLayer.id)}
                    title="Duplicate Layer"
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteLayer(selectedLayer.id)}
                    title="Delete Layer"
                    className="p-1 hover:bg-rose-500/20 text-rose-400 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Layer Item Stack */}
            {displayLayers.map((layer) => {
              const isSelected = layer.id === selectedLayerId;

              return (
                <div
                  key={layer.id}
                  onClick={() => onSelectLayer(layer.id)}
                  className={`group flex items-center justify-between px-2.5 py-2 rounded-md border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-amber-500/15 border-amber-400/80 text-amber-200"
                      : "bg-[#14161b] border-white/5 hover:border-white/20 text-zinc-300"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {getLayerIcon(layer.type)}
                    <span className="truncate font-medium text-[11px]">{layer.name}</span>
                  </div>

                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                    {/* Lock Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateLayer({ ...layer, isLocked: !layer.isLocked });
                      }}
                      className="p-1 hover:bg-white/10 rounded text-zinc-400 hover:text-zinc-200"
                    >
                      {layer.isLocked ? (
                        <Lock className="w-3 h-3 text-amber-400" />
                      ) : (
                        <Unlock className="w-3 h-3 text-zinc-500" />
                      )}
                    </button>

                    {/* Visibility Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateLayer({ ...layer, isHidden: !layer.isHidden });
                      }}
                      className="p-1 hover:bg-white/10 rounded text-zinc-400 hover:text-zinc-200"
                    >
                      {layer.isHidden ? (
                        <EyeOff className="w-3 h-3 text-rose-400" />
                      ) : (
                        <Eye className="w-3 h-3 text-zinc-400" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= 2. PROPERTIES PANEL ================= */}
        {activeTab === "properties" && (
          <div>
            {!selectedLayer ? (
              <div className="text-center py-12 text-zinc-500">
                <Sliders className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p>Select any element on the canvas to inspect and edit its properties.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Layer Name */}
                <div>
                  <label className="font-semibold text-zinc-200 block mb-1 text-[11px]">Layer Name</label>
                  <input
                    type="text"
                    value={selectedLayer.name}
                    onChange={(e) => onUpdateLayer({ ...selectedLayer, name: e.target.value })}
                    className="w-full bg-[#121418] border border-white/15 rounded px-2 py-1.5 text-zinc-200 text-xs"
                  />
                </div>

                {/* Transform Geometry (X, Y, W, H, Rotation, Opacity) */}
                <div className="p-3 rounded-lg bg-black/30 border border-white/10 space-y-2.5">
                  <div className="font-semibold text-zinc-200 text-[11px]">Transform & Position</div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-zinc-400 block mb-0.5">X (px)</span>
                      <input
                        type="number"
                        value={selectedLayer.x}
                        onChange={(e) => onUpdateLayer({ ...selectedLayer, x: Number(e.target.value) })}
                        className="w-full bg-[#121418] border border-white/15 rounded px-2 py-1 text-zinc-200 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 block mb-0.5">Y (px)</span>
                      <input
                        type="number"
                        value={selectedLayer.y}
                        onChange={(e) => onUpdateLayer({ ...selectedLayer, y: Number(e.target.value) })}
                        className="w-full bg-[#121418] border border-white/15 rounded px-2 py-1 text-zinc-200 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 block mb-0.5">Width (px)</span>
                      <input
                        type="number"
                        value={selectedLayer.width}
                        onChange={(e) => onUpdateLayer({ ...selectedLayer, width: Number(e.target.value) })}
                        className="w-full bg-[#121418] border border-white/15 rounded px-2 py-1 text-zinc-200 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 block mb-0.5">Height (px)</span>
                      <input
                        type="number"
                        value={selectedLayer.height}
                        onChange={(e) => onUpdateLayer({ ...selectedLayer, height: Number(e.target.value) })}
                        className="w-full bg-[#121418] border border-white/15 rounded px-2 py-1 text-zinc-200 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                      <span>Opacity</span>
                      <span>{Math.round(selectedLayer.opacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={selectedLayer.opacity}
                      onChange={(e) => onUpdateLayer({ ...selectedLayer, opacity: parseFloat(e.target.value) })}
                      className="w-full accent-amber-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                      <span>Rotation</span>
                      <span>{selectedLayer.rotation || 0}°</span>
                    </div>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={selectedLayer.rotation || 0}
                      onChange={(e) => onUpdateLayer({ ...selectedLayer, rotation: parseInt(e.target.value) })}
                      className="w-full accent-amber-400"
                    />
                  </div>
                </div>

                {/* TYPE-SPECIFIC CONTROLS */}

                {/* 1. PHOTO PLACEHOLDER CONTROLS */}
                {selectedLayer.type === "photo-placeholder" && (
                  <div className="p-3 rounded-lg bg-black/30 border border-white/10 space-y-2.5">
                    <div className="font-semibold text-zinc-200 text-[11px]">Photo Frame Properties</div>

                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1">Frame Shape</label>
                      <select
                        value={(selectedLayer as PhotoPlaceholderLayer).shape}
                        onChange={(e) =>
                          onUpdateLayer({
                            ...selectedLayer,
                            shape: e.target.value as PhotoShape,
                          } as PhotoPlaceholderLayer)
                        }
                        className="w-full bg-[#121418] border border-white/15 rounded px-2 py-1.5 text-zinc-200 text-xs"
                      >
                        <option value="portrait">Standard Portrait</option>
                        <option value="landscape">Standard Landscape</option>
                        <option value="square">Square 1:1</option>
                        <option value="circle">Circular Medallion</option>
                        <option value="arch-jharokha">Palace Arch (Jharokha)</option>
                        <option value="cinematic-wide">Cinematic Wide (21:9)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-zinc-400 block mb-0.5">Border Width</span>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={(selectedLayer as PhotoPlaceholderLayer).borderWidth || 0}
                          onChange={(e) =>
                            onUpdateLayer({
                              ...selectedLayer,
                              borderWidth: Number(e.target.value),
                            } as PhotoPlaceholderLayer)
                          }
                          className="w-full bg-[#121418] border border-white/15 rounded px-2 py-1 text-zinc-200 text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400 block mb-0.5">Border Color</span>
                        <input
                          type="color"
                          value={(selectedLayer as PhotoPlaceholderLayer).borderColor || "#D4AF37"}
                          onChange={(e) =>
                            onUpdateLayer({
                              ...selectedLayer,
                              borderColor: e.target.value,
                            } as PhotoPlaceholderLayer)
                          }
                          className="w-full h-8 bg-transparent cursor-pointer rounded"
                        />
                      </div>
                    </div>

                    {(selectedLayer as PhotoPlaceholderLayer).imageSrc && (
                      <div className="pt-2 border-t border-white/10">
                        <button
                          onClick={() =>
                            onUpdateLayer({
                              ...selectedLayer,
                              imageSrc: undefined,
                            } as PhotoPlaceholderLayer)
                          }
                          className="w-full py-1.5 px-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded text-xs transition-colors"
                        >
                          Remove Photo (Keep Empty Frame)
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. TEXT LAYER CONTROLS */}
                {selectedLayer.type === "text" && (
                  <div className="p-3 rounded-lg bg-black/30 border border-white/10 space-y-2.5">
                    <div className="font-semibold text-zinc-200 text-[11px]">Typography Editor</div>

                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1">Text Content</label>
                      <textarea
                        rows={2}
                        value={(selectedLayer as TextLayer).text}
                        onChange={(e) =>
                          onUpdateLayer({
                            ...selectedLayer,
                            text: e.target.value,
                          } as TextLayer)
                        }
                        className="w-full bg-[#121418] border border-white/15 rounded p-2 text-zinc-200 text-xs font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1">Font Family</label>
                      <select
                        value={(selectedLayer as TextLayer).fontFamily}
                        onChange={(e) =>
                          onUpdateLayer({
                            ...selectedLayer,
                            fontFamily: e.target.value,
                          } as TextLayer)
                        }
                        className="w-full bg-[#121418] border border-white/15 rounded px-2 py-1.5 text-zinc-200 text-xs"
                      >
                        <option value="Cinzel">Cinzel (Royal Serif)</option>
                        <option value="Playfair Display">Playfair Display (Editorial Serif)</option>
                        <option value="Great Vibes">Great Vibes (Calligraphic Script)</option>
                        <option value="Cormorant Garamond">Cormorant Garamond (Classical)</option>
                        <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Sans)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-zinc-400 block mb-0.5">Font Size</span>
                        <input
                          type="number"
                          min="10"
                          max="120"
                          value={(selectedLayer as TextLayer).fontSize}
                          onChange={(e) =>
                            onUpdateLayer({
                              ...selectedLayer,
                              fontSize: Number(e.target.value),
                            } as TextLayer)
                          }
                          className="w-full bg-[#121418] border border-white/15 rounded px-2 py-1 text-zinc-200 text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400 block mb-0.5">Text Color</span>
                        <input
                          type="color"
                          value={(selectedLayer as TextLayer).color}
                          onChange={(e) =>
                            onUpdateLayer({
                              ...selectedLayer,
                              color: e.target.value,
                            } as TextLayer)
                          }
                          className="w-full h-8 bg-transparent cursor-pointer rounded"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1 pt-1">
                      {(["left", "center", "right"] as const).map((align) => (
                        <button
                          key={align}
                          onClick={() =>
                            onUpdateLayer({
                              ...selectedLayer,
                              textAlign: align,
                            } as TextLayer)
                          }
                          className={`py-1 rounded capitalize transition-colors ${
                            (selectedLayer as TextLayer).textAlign === align
                              ? "bg-amber-500 text-black font-semibold"
                              : "bg-white/5 text-zinc-400 hover:bg-white/10"
                          }`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. MOTIF / ACCENT COLOR CONTROLS */}
                {(selectedLayer.type === "motif" || selectedLayer.type === "floral" || selectedLayer.type === "luxury-accent") && (
                  <div className="p-3 rounded-lg bg-black/30 border border-white/10 space-y-2.5">
                    <div className="font-semibold text-zinc-200 text-[11px]">Vector Accent Colors</div>

                    <div>
                      <span className="text-[10px] text-zinc-400 block mb-1">Primary Metallic Color</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={(selectedLayer as MotifLayer).color || "#D4AF37"}
                          onChange={(e) =>
                            onUpdateLayer({
                              ...selectedLayer,
                              color: e.target.value,
                            } as MotifLayer)
                          }
                          className="w-10 h-8 bg-transparent cursor-pointer rounded"
                        />
                        <div className="flex gap-1.5">
                          {["#D4AF37", "#E5C158", "#C5A059", "#800020", "#1B365D"].map((c) => (
                            <div
                              key={c}
                              onClick={() =>
                                onUpdateLayer({
                                  ...selectedLayer,
                                  color: c,
                                } as MotifLayer)
                              }
                              className="w-6 h-6 rounded-full border border-white/20 cursor-pointer"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
