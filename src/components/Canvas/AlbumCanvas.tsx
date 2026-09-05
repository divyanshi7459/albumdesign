import React, { useState, useRef, useEffect } from "react";
import {
  AlbumSpread,
  AlbumLayer,
  PhotoPlaceholderLayer,
  TextLayer,
  MotifLayer,
  BorderLayer,
  BackgroundLayer,
  LuxuryAccentLayer,
  FloralLayer,
} from "../../types/album";
import { MOTIF_SVGS, FLORAL_SVGS, LUXURY_ACCENT_SVGS } from "../../assets/indianWeddingAssets";
import { Image as ImageIcon, Upload, Move, RotateCw, ZoomIn, ZoomOut, Check, AlertTriangle } from "lucide-react";

interface AlbumCanvasProps {
  spread: AlbumSpread;
  selectedLayerId: string | null;
  onSelectLayer: (layerId: string | null) => void;
  onUpdateLayer: (updatedLayer: AlbumLayer) => void;
  onBatchUpdateLayers?: (layers: AlbumLayer[]) => void;
  showBleed: boolean;
  showSafeArea: boolean;
  showCrease: boolean;
  showGrid: boolean;
  showRulers: boolean;
  previewMode: "rgb" | "cmyk" | "mono";
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export const AlbumCanvas: React.FC<AlbumCanvasProps> = ({
  spread,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayer,
  showBleed,
  showSafeArea,
  showCrease,
  showGrid,
  showRulers,
  previewMode,
  zoom,
  onZoomChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  // Dragging / Resizing state
  const [activeDrag, setActiveDrag] = useState<{
    type: "move" | "resize" | "rotate";
    layerId: string;
    startX: number;
    startY: number;
    handle?: string;
    origX: number;
    origY: number;
    origW: number;
    origH: number;
    origRot: number;
  } | null>(null);

  // Mouse coords for rulers
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const canvasWidth = 2400;
  const canvasHeight = 1200;
  const creaseX = canvasWidth / 2;

  // Selected layer
  const selectedLayer = spread.layers.find((l) => l.id === selectedLayerId);

  // Handle Pan
  const handleMouseDownContainer = (e: React.MouseEvent) => {
    // Middle click or space key held down pans the canvas
    if (e.button === 1 || e.altKey || (e.target as HTMLElement).id === "canvas-viewport") {
      setIsPanning(true);
      setStartPan({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMoveContainer = (e: React.MouseEvent) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left - panOffset.x) / zoom;
      const relativeY = (e.clientY - rect.top - panOffset.y) / zoom;
      setMousePos({ x: Math.round(relativeX), y: Math.round(relativeY) });
    }

    // Handle Layer Drag / Resize
    if (activeDrag && selectedLayer) {
      const dx = (e.clientX - activeDrag.startX) / zoom;
      const dy = (e.clientY - activeDrag.startY) / zoom;

      if (activeDrag.type === "move") {
        let newX = activeDrag.origX + dx;
        let newY = activeDrag.origY + dy;

        // Snapping to crease or center
        if (Math.abs(newX + activeDrag.origW / 2 - creaseX) < 15) {
          newX = creaseX - activeDrag.origW / 2;
        }

        onUpdateLayer({
          ...selectedLayer,
          x: Math.round(newX),
          y: Math.round(newY),
        });
      } else if (activeDrag.type === "resize" && activeDrag.handle) {
        let newW = activeDrag.origW;
        let newH = activeDrag.origH;
        let newX = activeDrag.origX;
        let newY = activeDrag.origY;

        if (activeDrag.handle.includes("e")) newW = Math.max(50, activeDrag.origW + dx);
        if (activeDrag.handle.includes("s")) newH = Math.max(50, activeDrag.origH + dy);
        if (activeDrag.handle.includes("w")) {
          const diff = Math.min(dx, activeDrag.origW - 50);
          newW = activeDrag.origW - diff;
          newX = activeDrag.origX + diff;
        }
        if (activeDrag.handle.includes("n")) {
          const diff = Math.min(dy, activeDrag.origH - 50);
          newH = activeDrag.origH - diff;
          newY = activeDrag.origY + diff;
        }

        onUpdateLayer({
          ...selectedLayer,
          x: Math.round(newX),
          y: Math.round(newY),
          width: Math.round(newW),
          height: Math.round(newH),
        });
      } else if (activeDrag.type === "rotate") {
        const cx = activeDrag.origX + activeDrag.origW / 2;
        const cy = activeDrag.origY + activeDrag.origH / 2;
        const currentMouseX = (e.clientX - (containerRef.current?.getBoundingClientRect().left || 0) - panOffset.x) / zoom;
        const currentMouseY = (e.clientY - (containerRef.current?.getBoundingClientRect().top || 0) - panOffset.y) / zoom;
        const angle = Math.atan2(currentMouseY - cy, currentMouseX - cx) * (180 / Math.PI) + 90;

        onUpdateLayer({
          ...selectedLayer,
          rotation: Math.round(angle % 360),
        });
      }
    }
  };

  const handleMouseUpContainer = () => {
    setIsPanning(false);
    setActiveDrag(null);
  };

  // Image Upload handler directly to photo placeholder
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, layer: PhotoPlaceholderLayer) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onUpdateLayer({
            ...layer,
            imageSrc: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and Drop photo support
  const handleDropPhoto = (e: React.DragEvent, layer: PhotoPlaceholderLayer) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onUpdateLayer({
            ...layer,
            imageSrc: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Print Mode CSS filter
  const getFilterStyle = () => {
    if (previewMode === "cmyk") {
      // CMYK print simulation approximation: slightly subdued saturation, warmer paper tone
      return "contrast(0.96) saturate(0.88) brightness(0.98) sepia(0.04)";
    }
    if (previewMode === "mono") {
      return "grayscale(100%) contrast(1.05)";
    }
    return "none";
  };

  return (
    <div
      ref={containerRef}
      id="canvas-viewport"
      className="relative flex-1 h-full w-full bg-[#14161b] overflow-hidden select-none cursor-default"
      onMouseDown={handleMouseDownContainer}
      onMouseMove={handleMouseMoveContainer}
      onMouseUp={handleMouseUpContainer}
    >
      {/* CMYK Color Gamut warning banner */}
      {previewMode === "cmyk" && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs shadow-lg backdrop-blur-md">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>CMYK Print Simulation: Vibrant RGB highlights will soften slightly on matte/luster photo paper.</span>
        </div>
      )}

      {/* RULERS */}
      {showRulers && (
        <>
          {/* Top Ruler (Inches: 0 to 24") */}
          <div className="absolute top-0 left-6 right-0 h-6 bg-[#1a1c23] border-b border-white/10 z-30 flex text-[10px] text-zinc-400 overflow-hidden pointer-events-none">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="relative border-l border-white/20 h-full flex flex-col justify-between"
                style={{ width: `${(canvasWidth / 24) * zoom}px` }}
              >
                <span className="pl-1 text-[9px] font-mono">{i}"</span>
                <div className="flex justify-between px-0.5 pb-0.5">
                  <div className="h-1.5 w-px bg-white/20" />
                  <div className="h-1 w-px bg-white/15" />
                  <div className="h-1.5 w-px bg-white/20" />
                </div>
              </div>
            ))}
          </div>

          {/* Left Ruler (Inches: 0 to 12") */}
          <div className="absolute top-6 left-0 bottom-0 w-6 bg-[#1a1c23] border-r border-white/10 z-30 flex flex-col text-[10px] text-zinc-400 overflow-hidden pointer-events-none">
            {Array.from({ length: 13 }).map((_, i) => (
              <div
                key={i}
                className="relative border-t border-white/20 w-full flex items-start justify-between"
                style={{ height: `${(canvasHeight / 12) * zoom}px` }}
              >
                <span className="pt-0.5 pl-0.5 text-[9px] font-mono leading-none">{i}"</span>
                <div className="w-1.5 h-px bg-white/20 self-center" />
              </div>
            ))}
          </div>

          {/* Top-Left Corner Box */}
          <div className="absolute top-0 left-0 w-6 h-6 bg-[#181a20] border-r border-b border-white/10 z-40 text-[9px] flex items-center justify-center text-zinc-400 font-mono">
            IN
          </div>
        </>
      )}

      {/* CANVAS ARTBOARD CONTAINER */}
      <div
        className="absolute transition-transform ease-out"
        style={{
          transform: `translate(${panOffset.x + (showRulers ? 24 : 0)}px, ${panOffset.y + (showRulers ? 24 : 0)}px) scale(${zoom})`,
          transformOrigin: "0 0",
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          filter: getFilterStyle(),
        }}
      >
        {/* SPREAD BACKGROUND SHADOW & BOUNDARY */}
        <div
          className="relative w-full h-full shadow-[0_25px_70px_rgba(0,0,0,0.7)] bg-[#fbf9f5] overflow-hidden"
          onClick={() => onSelectLayer(null)}
        >
          {/* RENDER LAYERS BY Z-INDEX */}
          {[...spread.layers]
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((layer) => {
              if (layer.isHidden) return null;
              const isSelected = layer.id === selectedLayerId;

              return (
                <div
                  key={layer.id}
                  id={`layer-${layer.id}`}
                  className={`absolute transition-shadow ${isSelected ? "ring-2 ring-amber-400 ring-offset-1 ring-offset-black/50" : ""}`}
                  style={{
                    left: `${layer.x}px`,
                    top: `${layer.y}px`,
                    width: `${layer.width}px`,
                    height: `${layer.height}px`,
                    transform: layer.rotation ? `rotate(${layer.rotation}deg)` : undefined,
                    opacity: layer.opacity,
                    zIndex: layer.zIndex,
                    cursor: layer.isLocked ? "default" : "move",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectLayer(layer.id);
                  }}
                  onMouseDown={(e) => {
                    if (layer.isLocked) return;
                    e.stopPropagation();
                    onSelectLayer(layer.id);
                    setActiveDrag({
                      type: "move",
                      layerId: layer.id,
                      startX: e.clientX,
                      startY: e.clientY,
                      origX: layer.x,
                      origY: layer.y,
                      origW: layer.width,
                      origH: layer.height,
                      origRot: layer.rotation || 0,
                    });
                  }}
                >
                  {/* BACKGROUND LAYER */}
                  {layer.type === "background" && (
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundColor: (layer as BackgroundLayer).color1,
                        background:
                          (layer as BackgroundLayer).bgType === "gradient" && (layer as BackgroundLayer).color2
                            ? `linear-gradient(${(layer as BackgroundLayer).gradientAngle || 45}deg, ${(layer as BackgroundLayer).color1}, ${(layer as BackgroundLayer).color2})`
                            : (layer as BackgroundLayer).color1,
                      }}
                    />
                  )}

                  {/* BORDER LAYER */}
                  {layer.type === "border" && (
                    <div
                      className="w-full h-full pointer-events-none"
                      style={{
                        border: `${(layer as BorderLayer).strokeWidth}px solid ${(layer as BorderLayer).color}`,
                        boxSizing: "border-box",
                      }}
                    >
                      {((layer as BorderLayer).borderPreset === "double-line" ||
                        (layer as BorderLayer).borderPreset === "royal-gold") && (
                        <div
                          className="w-full h-full"
                          style={{
                            border: `1px solid ${(layer as BorderLayer).color}`,
                            margin: "-12px",
                            width: "calc(100% + 24px)",
                            height: "calc(100% + 24px)",
                          }}
                        />
                      )}
                    </div>
                  )}

                  {/* PHOTO PLACEHOLDER LAYER (EMPTY BY DEFAULT - NO STOCK PEOPLE!) */}
                  {layer.type === "photo-placeholder" && (
                    <PhotoPlaceholderItem
                      layer={layer as PhotoPlaceholderLayer}
                      isSelected={isSelected}
                      onUpload={(e) => handlePhotoUpload(e, layer as PhotoPlaceholderLayer)}
                      onDrop={(e) => handleDropPhoto(e, layer as PhotoPlaceholderLayer)}
                    />
                  )}

                  {/* TEXT LAYER */}
                  {layer.type === "text" && (
                    <div
                      className="w-full h-full flex items-center px-2 select-text"
                      style={{
                        fontFamily: (layer as TextLayer).fontFamily,
                        fontSize: `${(layer as TextLayer).fontSize}px`,
                        fontWeight: (layer as TextLayer).fontWeight,
                        fontStyle: (layer as TextLayer).fontStyle || "normal",
                        letterSpacing: `${(layer as TextLayer).letterSpacing}px`,
                        lineHeight: (layer as TextLayer).lineHeight,
                        color: (layer as TextLayer).color,
                        justifyContent:
                          (layer as TextLayer).textAlign === "center"
                            ? "center"
                            : (layer as TextLayer).textAlign === "right"
                            ? "flex-end"
                            : "flex-start",
                        textAlign: (layer as TextLayer).textAlign,
                        textTransform: (layer as TextLayer).textTransform,
                      }}
                    >
                      {(layer as TextLayer).text}
                    </div>
                  )}

                  {/* MOTIF LAYER */}
                  {layer.type === "motif" && (
                    <div className="w-full h-full">
                      {MOTIF_SVGS[(layer as MotifLayer).motifType] && (
                        <svg
                          viewBox={MOTIF_SVGS[(layer as MotifLayer).motifType].viewBox}
                          className="w-full h-full pointer-events-none"
                        >
                          {MOTIF_SVGS[(layer as MotifLayer).motifType].render(
                            (layer as MotifLayer).color,
                            (layer as MotifLayer).secondaryColor
                          )}
                        </svg>
                      )}
                    </div>
                  )}

                  {/* FLORAL LAYER */}
                  {layer.type === "floral" && (
                    <div className="w-full h-full">
                      {FLORAL_SVGS[(layer as FloralLayer).floralType] && (
                        <svg
                          viewBox={FLORAL_SVGS[(layer as FloralLayer).floralType].viewBox}
                          className="w-full h-full pointer-events-none"
                        >
                          {FLORAL_SVGS[(layer as FloralLayer).floralType].render(
                            (layer as FloralLayer).color,
                            (layer as FloralLayer).secondaryColor
                          )}
                        </svg>
                      )}
                    </div>
                  )}

                  {/* LUXURY ACCENT LAYER */}
                  {layer.type === "luxury-accent" && (
                    <div className="w-full h-full">
                      {LUXURY_ACCENT_SVGS[(layer as LuxuryAccentLayer).accentType] && (
                        <svg
                          viewBox={LUXURY_ACCENT_SVGS[(layer as LuxuryAccentLayer).accentType].viewBox}
                          className="w-full h-full pointer-events-none"
                        >
                          {LUXURY_ACCENT_SVGS[(layer as LuxuryAccentLayer).accentType].render(
                            (layer as LuxuryAccentLayer).color
                          )}
                        </svg>
                      )}
                    </div>
                  )}

                  {/* SELECTION RESIZE & ROTATION HANDLES */}
                  {isSelected && !layer.isLocked && (
                    <>
                      {/* 8 Resize handles */}
                      {["nw", "n", "ne", "e", "se", "s", "sw", "w"].map((handle) => {
                        const getPosClass = () => {
                          switch (handle) {
                            case "nw":
                              return "-top-1.5 -left-1.5 cursor-nwse-resize";
                            case "n":
                              return "-top-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize";
                            case "ne":
                              return "-top-1.5 -right-1.5 cursor-nesw-resize";
                            case "e":
                              return "top-1/2 -translate-y-1/2 -right-1.5 cursor-ew-resize";
                            case "se":
                              return "-bottom-1.5 -right-1.5 cursor-nwse-resize";
                            case "s":
                              return "-bottom-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize";
                            case "sw":
                              return "-bottom-1.5 -left-1.5 cursor-nesw-resize";
                            case "w":
                              return "top-1/2 -translate-y-1/2 -left-1.5 cursor-ew-resize";
                            default:
                              return "";
                          }
                        };

                        return (
                          <div
                            key={handle}
                            className={`absolute w-3 h-3 bg-amber-400 border border-black rounded-sm z-50 ${getPosClass()}`}
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              setActiveDrag({
                                type: "resize",
                                handle,
                                layerId: layer.id,
                                startX: e.clientX,
                                startY: e.clientY,
                                origX: layer.x,
                                origY: layer.y,
                                origW: layer.width,
                                origH: layer.height,
                                origRot: layer.rotation || 0,
                              });
                            }}
                          />
                        );
                      })}

                      {/* Top Rotation Stem & Handle */}
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center z-50">
                        <div
                          className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-black cursor-grab active:cursor-grabbing shadow-sm flex items-center justify-center"
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            setActiveDrag({
                              type: "rotate",
                              layerId: layer.id,
                              startX: e.clientX,
                              startY: e.clientY,
                              origX: layer.x,
                              origY: layer.y,
                              origW: layer.width,
                              origH: layer.height,
                              origRot: layer.rotation || 0,
                            });
                          }}
                        >
                          <RotateCw className="w-2 h-2 text-black" />
                        </div>
                        <div className="w-px h-3.5 bg-amber-400" />
                      </div>
                    </>
                  )}
                </div>
              );
            })}

          {/* OVERLAY GUIDES (Non-exportable, toggleable) */}
          {/* 1. Center Spine Crease */}
          {showCrease && (
            <div
              className="absolute top-0 bottom-0 w-px bg-rose-500/80 z-30 pointer-events-none shadow-[0_0_8px_rgba(244,63,94,0.5)]"
              style={{ left: `${creaseX}px` }}
            >
              <div className="absolute top-3 left-1.5 px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/40 text-[10px] text-rose-300 font-mono tracking-wider">
                SPINE CREASE (12" FOLD)
              </div>
              <div className="absolute inset-y-0 -left-3 w-6 bg-gradient-to-r from-black/5 via-black/15 to-transparent pointer-events-none" />
            </div>
          )}

          {/* 2. Safe Area Margin Guide (0.5 inch = 50px) */}
          {showSafeArea && (
            <div
              className="absolute inset-[60px] border border-dashed border-emerald-500/60 pointer-events-none z-30"
              style={{ boxSizing: "border-box" }}
            >
              <span className="absolute top-1 left-2 text-[9px] text-emerald-400 font-mono">
                SAFE PRINT MARGIN (0.5")
              </span>
            </div>
          )}

          {/* 3. Bleed Area Trim Guide (0.25 inch = 25px) */}
          {showBleed && (
            <div
              className="absolute inset-[30px] border border-dashed border-cyan-500/60 pointer-events-none z-30"
              style={{ boxSizing: "border-box" }}
            >
              <span className="absolute top-1 right-2 text-[9px] text-cyan-400 font-mono">
                TRIM / BLEED LINE (0.25")
              </span>
            </div>
          )}

          {/* 4. Composition Grid */}
          {showGrid && (
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 pointer-events-none z-20">
              {Array.from({ length: 72 }).map((_, i) => (
                <div key={i} className="border-r border-b border-black/[0.04]" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Photo Placeholder Sub-component (EMPTY OUTLINES, NO STOCK PEOPLE)
interface PhotoPlaceholderItemProps {
  layer: PhotoPlaceholderLayer;
  isSelected: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent) => void;
}

const PhotoPlaceholderItem: React.FC<PhotoPlaceholderItemProps> = ({ layer, onUpload, onDrop }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const getShapeClasses = () => {
    switch (layer.shape) {
      case "circle":
        return "rounded-full";
      case "arch-jharokha":
        return "rounded-t-full";
      default:
        return "rounded-sm";
    }
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden transition-all duration-200 group ${getShapeClasses()}`}
      style={{
        border: `${layer.borderWidth || 3}px solid ${layer.borderColor || "#D4AF37"}`,
        boxShadow: layer.innerShadow ? "inset 0 2px 10px rgba(0,0,0,0.12)" : undefined,
        backgroundColor: layer.imageSrc ? "transparent" : isDragOver ? "rgba(212,175,55,0.15)" : "rgba(235, 230, 220, 0.2)",
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        setIsDragOver(false);
        onDrop(e);
      }}
    >
      {layer.imageSrc ? (
        // Real user uploaded wedding photo
        <div className="w-full h-full relative group">
          <img
            src={layer.imageSrc}
            alt={layer.name}
            className="w-full h-full object-cover select-none pointer-events-none"
            style={{
              transform: `scale(${layer.crop?.zoom || 1}) translate(${layer.crop?.offsetX || 0}px, ${layer.crop?.offsetY || 0}px)`,
            }}
          />
          {/* Hover overlay to replace image */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded bg-amber-500 text-black font-semibold text-xs shadow hover:bg-amber-400 flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              Replace Photo
            </button>
          </div>
        </div>
      ) : (
        // EMPTY OUTLINED PLACEHOLDER - NO STOCK PEOPLE!
        <div
          className="w-full h-full flex flex-col items-center justify-center p-4 cursor-pointer text-zinc-500 hover:text-amber-700 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-12 h-12 rounded-full border border-dashed border-amber-500/50 bg-amber-500/10 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <ImageIcon className="w-6 h-6 text-amber-600/80" />
          </div>
          <span className="text-xs font-semibold text-zinc-700 tracking-wide font-sans">
            Drop Wedding Photo Here
          </span>
          <span className="text-[10px] text-zinc-400 mt-0.5">
            Click to Browse or Drag & Drop
          </span>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onUpload}
      />
    </div>
  );
};
