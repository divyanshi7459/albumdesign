import React, { useState, useEffect } from "react";
import { AlbumSpread, AlbumLayer, WeddingStyle, WeddingEvent, LayoutArchetype, BackgroundPattern, ProofStatus } from "./types/album";
import { LayoutEngine } from "./services/layoutEngine";
import { ExportService } from "./services/exportService";
import { TopNavbar } from "./components/Navigation/TopNavbar";
import { LeftSidebar } from "./components/Panels/LeftSidebar";
import { AlbumCanvas } from "./components/Canvas/AlbumCanvas";
import { RightSidebar } from "./components/Panels/RightSidebar";
import { SpreadTray } from "./components/Navigation/SpreadTray";
import { FlipbookModal } from "./components/Modals/FlipbookModal";
import { ClientProofingModal } from "./components/Modals/ClientProofingModal";
import { StorybookModal } from "./components/Modals/StorybookModal";

export default function App() {
  // Initialize sample spreads across wedding celebration
  const [spreads, setSpreads] = useState<AlbumSpread[]>(() => [
    LayoutEngine.generateSpread({ spreadNumber: 1, event: "Wedding", style: "Royal Indian Wedding", photoCount: 3, archetype: "central-hero" }),
    LayoutEngine.generateSpread({ spreadNumber: 2, event: "Haldi", style: "Haldi", photoCount: 4, archetype: "quad-grid" }),
    LayoutEngine.generateSpread({ spreadNumber: 3, event: "Mehendi", style: "Mehendi", photoCount: 5, archetype: "five-photo-feature" }),
    LayoutEngine.generateSpread({ spreadNumber: 4, event: "Sangeet", style: "Sangeet", photoCount: 6, archetype: "asymmetric-editorial" }),
    LayoutEngine.generateSpread({ spreadNumber: 5, event: "Reception", style: "Reception", photoCount: 2, archetype: "royal-jharokha" }),
  ]);

  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);

  // Canvas Workspace & View Options
  const [zoom, setZoom] = useState(0.42);
  const [showBleed, setShowBleed] = useState(true);
  const [showSafeArea, setShowSafeArea] = useState(true);
  const [showCrease, setShowCrease] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [showRulers, setShowRulers] = useState(true);
  const [previewMode, setPreviewMode] = useState<"rgb" | "cmyk" | "mono">("rgb");

  // Modals
  const [showFlipbook, setShowFlipbook] = useState(false);
  const [showProofing, setShowProofing] = useState(false);
  const [showStorybook, setShowStorybook] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const currentSpread = spreads[currentSpreadIndex] || spreads[0];

  // Helper to update current spread in array
  const updateCurrentSpread = (updatedSpread: AlbumSpread) => {
    setSpreads((prev) => {
      const next = [...prev];
      next[currentSpreadIndex] = updatedSpread;
      return next;
    });
  };

  // 1. GENERATE NEW DESIGN / VARIATION
  const handleGenerateNew = (params?: {
    style?: WeddingStyle;
    event?: WeddingEvent;
    photoCount?: number;
    archetype?: LayoutArchetype;
  }) => {
    const newSpread = LayoutEngine.generateSpread({
      spreadNumber: currentSpread.spreadNumber,
      style: params?.style || currentSpread.style,
      event: params?.event || currentSpread.event,
      photoCount: params?.photoCount || currentSpread.photoCount,
      archetype: params?.archetype,
    });
    updateCurrentSpread(newSpread);
    setSelectedLayerId(null);
    showToast(`Generated original composition for ${newSpread.event} (${newSpread.style})`);
  };

  // 2. RANDOM DESIGN
  const handleRandomDesign = () => {
    const styles: WeddingStyle[] = [
      "Royal Indian Wedding",
      "Traditional Wedding",
      "Rajasthani Royal",
      "Pastel",
      "Modern Wedding",
      "Floral Wedding",
      "Black & Gold",
      "Red & Gold",
    ];
    const events: WeddingEvent[] = ["Wedding", "Haldi", "Mehendi", "Sangeet", "Reception", "Couple Portraits"];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    const randomCount = [1, 2, 3, 4, 5, 6][Math.floor(Math.random() * 6)];

    const newSpread = LayoutEngine.generateSpread({
      spreadNumber: currentSpread.spreadNumber,
      style: randomStyle,
      event: randomEvent,
      photoCount: randomCount,
    });
    updateCurrentSpread(newSpread);
    setSelectedLayerId(null);
    showToast(`Synthesized random ${randomStyle} layout with ${randomCount} photo frames`);
  };

  // 3. REGENERATE WITH NEW SEED
  const handleRegenerateLayout = () => {
    const newSpread = LayoutEngine.generateSpread({
      spreadNumber: currentSpread.spreadNumber,
      style: currentSpread.style,
      event: currentSpread.event,
      photoCount: currentSpread.photoCount,
      archetype: currentSpread.layoutArchetype,
      seed: LayoutEngine.getNextSeed(),
    });
    updateCurrentSpread(newSpread);
    setSelectedLayerId(null);
    showToast("Regenerated layout with fresh geometric variation");
  };

  // 4. DUPLICATE SPREAD
  const handleDuplicateSpread = (index: number = currentSpreadIndex) => {
    const toDup = spreads[index];
    const duplicated: AlbumSpread = {
      ...toDup,
      id: `spread-${Date.now()}`,
      spreadNumber: spreads.length + 1,
      title: `${toDup.title} (Copy)`,
      layers: toDup.layers.map((l) => ({ ...l, id: `${l.id}-copy` })),
    };
    setSpreads([...spreads, duplicated]);
    setCurrentSpreadIndex(spreads.length);
    showToast(`Duplicated Spread #${index + 1}`);
  };

  // 5. DELETE SPREAD
  const handleDeleteSpread = (index: number) => {
    if (spreads.length <= 1) return;
    const next = spreads.filter((_, i) => i !== index);
    setSpreads(next);
    setCurrentSpreadIndex(Math.max(0, index - 1));
    showToast(`Removed Spread #${index + 1}`);
  };

  // 6. ADD NEW SPREAD
  const handleAddSpread = () => {
    const newSpread = LayoutEngine.generateSpread({
      spreadNumber: spreads.length + 1,
      event: "Wedding",
      style: "Royal Indian Wedding",
      photoCount: 3,
    });
    setSpreads([...spreads, newSpread]);
    setCurrentSpreadIndex(spreads.length);
    showToast(`Created New Spread #${spreads.length + 1}`);
  };

  // 7. RESET CANVAS
  const handleResetCanvas = () => {
    const resetSpread = LayoutEngine.generateSpread({
      spreadNumber: currentSpread.spreadNumber,
      event: currentSpread.event,
      style: currentSpread.style,
      photoCount: 2,
    });
    updateCurrentSpread(resetSpread);
    setSelectedLayerId(null);
    showToast("Canvas reset to clean state");
  };

  // LAYER OPERATIONS
  const handleUpdateLayer = (updatedLayer: AlbumLayer) => {
    const updatedLayers = currentSpread.layers.map((l) => (l.id === updatedLayer.id ? updatedLayer : l));
    updateCurrentSpread({ ...currentSpread, layers: updatedLayers });
  };

  const handleAddLayer = (newLayer: AlbumLayer) => {
    const maxZ = Math.max(...currentSpread.layers.map((l) => l.zIndex), 0);
    const layerToAdd = { ...newLayer, zIndex: maxZ + 1 };
    updateCurrentSpread({ ...currentSpread, layers: [...currentSpread.layers, layerToAdd] });
    setSelectedLayerId(layerToAdd.id);
    showToast(`Added ${newLayer.name} to canvas`);
  };

  const handleDeleteLayer = (layerId: string) => {
    const nextLayers = currentSpread.layers.filter((l) => l.id !== layerId);
    updateCurrentSpread({ ...currentSpread, layers: nextLayers });
    if (selectedLayerId === layerId) setSelectedLayerId(null);
    showToast("Layer removed");
  };

  const handleDuplicateLayer = (layerId: string) => {
    const layer = currentSpread.layers.find((l) => l.id === layerId);
    if (!layer) return;
    const duplicated: AlbumLayer = {
      ...layer,
      id: `${layer.type}-${Date.now()}`,
      name: `${layer.name} (Copy)`,
      x: layer.x + 30,
      y: layer.y + 30,
      zIndex: Math.max(...currentSpread.layers.map((l) => l.zIndex), 0) + 1,
    };
    updateCurrentSpread({ ...currentSpread, layers: [...currentSpread.layers, duplicated] });
    setSelectedLayerId(duplicated.id);
    showToast(`Duplicated ${layer.name}`);
  };

  const handleReorderLayer = (layerId: string, direction: "up" | "down" | "top" | "bottom") => {
    const layers = [...currentSpread.layers].sort((a, b) => a.zIndex - b.zIndex);
    const idx = layers.findIndex((l) => l.id === layerId);
    if (idx === -1) return;

    if (direction === "up" && idx < layers.length - 1) {
      const tempZ = layers[idx].zIndex;
      layers[idx].zIndex = layers[idx + 1].zIndex;
      layers[idx + 1].zIndex = tempZ;
    } else if (direction === "down" && idx > 0) {
      const tempZ = layers[idx].zIndex;
      layers[idx].zIndex = layers[idx - 1].zIndex;
      layers[idx - 1].zIndex = tempZ;
    } else if (direction === "top") {
      layers[idx].zIndex = Math.max(...layers.map((l) => l.zIndex)) + 1;
    } else if (direction === "bottom") {
      layers[idx].zIndex = Math.min(...layers.map((l) => l.zIndex)) - 1;
    }

    updateCurrentSpread({ ...currentSpread, layers });
  };

  const handleUpdateBackground = (bgUpdate: {
    color1: string;
    color2?: string;
    patternName?: BackgroundPattern;
    bgType: "solid" | "gradient" | "pattern";
  }) => {
    const layers = currentSpread.layers.map((l) => {
      if (l.type === "background") {
        return {
          ...l,
          color1: bgUpdate.color1,
          color2: bgUpdate.color2,
          patternName: bgUpdate.patternName,
          bgType: bgUpdate.bgType,
        };
      }
      return l;
    });
    updateCurrentSpread({ ...currentSpread, layers: layers as any });
    showToast("Updated spread background palette");
  };

  // HIGH-RES EXPORT HANDLERS
  const handleExportPNG = async (targetDpi: 72 | 150 | 300 = 300, transparent = false) => {
    try {
      showToast(`Rendering ${targetDpi} DPI ${transparent ? "transparent " : ""}export...`);
      const dataUrl = await ExportService.exportToPNG(currentSpread, targetDpi, transparent);
      const filename = `${currentSpread.event.toLowerCase()}_spread_${currentSpread.spreadNumber}_${targetDpi}dpi.png`;
      ExportService.triggerDownload(dataUrl, filename, "image/png");
      showToast(`Exported ${filename} (${targetDpi === 300 ? "7200×3600 px" : "Preview"})`);
    } catch (err) {
      console.error(err);
      showToast("Export failed. Please check browser canvas limits.");
    }
  };

  const handleExportSVG = () => {
    const svgString = ExportService.exportToSVG(currentSpread);
    const filename = `${currentSpread.event.toLowerCase()}_spread_${currentSpread.spreadNumber}.svg`;
    ExportService.triggerDownload(svgString, filename, "image/svg+xml");
    showToast(`Exported vector ${filename} for Illustrator/InDesign`);
  };

  const handleExportJSON = () => {
    const jsonString = ExportService.exportToJSON(currentSpread);
    const filename = `${currentSpread.event.toLowerCase()}_spread_${currentSpread.spreadNumber}_layout.json`;
    ExportService.triggerDownload(jsonString, filename, "application/json");
    showToast(`Exported ${filename} layout metadata for Photoshop`);
  };

  // CLIENT PROOFING HANDLERS
  const handleUpdateSpreadStatus = (spreadId: string, status: ProofStatus) => {
    setSpreads((prev) =>
      prev.map((s) => (s.id === spreadId ? { ...s, status } : s))
    );
    showToast(`Spread marked as ${status === "approved" ? "Approved" : status === "needs-revision" ? "Needs Revision" : "Pending"}`);
  };

  const handleAddComment = (spreadId: string, text: string) => {
    setSpreads((prev) =>
      prev.map((s) => {
        if (s.id === spreadId) {
          const newComment = {
            id: `comm-${Date.now()}`,
            author: "Client (Ananya)",
            text,
            date: new Date().toISOString(),
            resolved: false,
          };
          return {
            ...s,
            comments: [...(s.comments || []), newComment],
            status: "needs-revision" as ProofStatus,
          };
        }
        return s;
      })
    );
    showToast("Feedback note added to spread");
  };

  // STORYBOOK GENERATOR BATCH
  const handleGenerateStorybook = (generatedSpreads: AlbumSpread[]) => {
    setSpreads(generatedSpreads);
    setCurrentSpreadIndex(0);
    setSelectedLayerId(null);
    showToast(`Successfully created ${generatedSpreads.length}-spread cohesive wedding storybook!`);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#14161b] text-zinc-100 font-sans select-none">
      {/* 1. TOP NAVBAR */}
      <TopNavbar
        spreads={spreads}
        currentSpreadIndex={currentSpreadIndex}
        onSelectSpread={(idx) => {
          setCurrentSpreadIndex(idx);
          setSelectedLayerId(null);
        }}
        zoom={zoom}
        onZoomChange={setZoom}
        onFitScreen={() => setZoom(0.42)}
        onExportPNG={handleExportPNG}
        onExportSVG={handleExportSVG}
        onExportJSON={handleExportJSON}
        onOpenFlipbook={() => setShowFlipbook(true)}
        onOpenProofing={() => setShowProofing(true)}
        onOpenStorybook={() => setShowStorybook(true)}
      />

      {/* 2. MAIN 3-PANEL WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar: AI Controls, Asset Library, Print Settings */}
        <LeftSidebar
          currentSpread={currentSpread}
          onGenerateNew={handleGenerateNew}
          onRandomDesign={handleRandomDesign}
          onRegenerateLayout={handleRegenerateLayout}
          onSaveDesign={() => showToast("Design saved to local project state")}
          onDuplicateDesign={() => handleDuplicateSpread()}
          onResetCanvas={handleResetCanvas}
          onAddLayer={handleAddLayer}
          onUpdateBackground={handleUpdateBackground}
          showBleed={showBleed}
          onToggleBleed={setShowBleed}
          showSafeArea={showSafeArea}
          onToggleSafeArea={setShowSafeArea}
          showCrease={showCrease}
          onToggleCrease={setShowCrease}
          showGrid={showGrid}
          onToggleGrid={setShowGrid}
          showRulers={showRulers}
          onToggleRulers={setShowRulers}
          previewMode={previewMode}
          onPreviewModeChange={setPreviewMode}
          onOpenStorybookGenerator={() => setShowStorybook(true)}
        />

        {/* Center Canvas Area: 2:1 Spread Viewport with Guides & Live Edit */}
        <AlbumCanvas
          spread={currentSpread}
          selectedLayerId={selectedLayerId}
          onSelectLayer={setSelectedLayerId}
          onUpdateLayer={handleUpdateLayer}
          showBleed={showBleed}
          showSafeArea={showSafeArea}
          showCrease={showCrease}
          showGrid={showGrid}
          showRulers={showRulers}
          previewMode={previewMode}
          zoom={zoom}
          onZoomChange={setZoom}
        />

        {/* Right Sidebar: Layer Stack & Contextual Properties */}
        <RightSidebar
          layers={currentSpread.layers}
          selectedLayerId={selectedLayerId}
          onSelectLayer={setSelectedLayerId}
          onUpdateLayer={handleUpdateLayer}
          onDeleteLayer={handleDeleteLayer}
          onDuplicateLayer={handleDuplicateLayer}
          onReorderLayer={handleReorderLayer}
        />
      </div>

      {/* 3. BOTTOM SPREAD THUMBNAIL TRAY */}
      <SpreadTray
        spreads={spreads}
        currentIndex={currentSpreadIndex}
        onSelectSpread={(idx) => {
          setCurrentSpreadIndex(idx);
          setSelectedLayerId(null);
        }}
        onAddSpread={handleAddSpread}
        onDuplicateSpread={handleDuplicateSpread}
        onDeleteSpread={handleDeleteSpread}
      />

      {/* TOAST POPUP */}
      {toastMessage && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-black/90 border border-amber-500/40 text-amber-200 text-xs shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODAL 1: 3D ALBUM FLIPBOOK */}
      {showFlipbook && (
        <FlipbookModal
          spreads={spreads}
          initialSpreadIndex={currentSpreadIndex}
          onClose={() => setShowFlipbook(false)}
        />
      )}

      {/* MODAL 2: CLIENT PROOFING & APPROVAL PORTAL */}
      {showProofing && (
        <ClientProofingModal
          spreads={spreads}
          currentSpreadIndex={currentSpreadIndex}
          onSelectSpread={(idx) => setCurrentSpreadIndex(idx)}
          onUpdateSpreadStatus={handleUpdateSpreadStatus}
          onAddComment={handleAddComment}
          onClose={() => setShowProofing(false)}
        />
      )}

      {/* MODAL 3: FULL STORYBOOK GENERATOR */}
      {showStorybook && (
        <StorybookModal
          onGenerateAlbum={handleGenerateStorybook}
          onClose={() => setShowStorybook(false)}
        />
      )}
    </div>
  );
}
