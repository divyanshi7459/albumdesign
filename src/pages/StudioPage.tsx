import React, { useState } from "react";
import {
  AlbumSpread,
  AlbumLayer,
  WeddingStyle,
  WeddingEvent,
  LayoutArchetype,
  BackgroundPattern,
  ProofStatus,
} from "../types/album";
import { LayoutEngine } from "../services/layoutEngine";
import { ExportService } from "../services/exportService";
import { TopNavbar } from "../components/Navigation/TopNavbar";
import { LeftSidebar } from "../components/Panels/LeftSidebar";
import { AlbumCanvas } from "../components/Canvas/AlbumCanvas";
import { RightSidebar } from "../components/Panels/RightSidebar";
import { SpreadTray } from "../components/Navigation/SpreadTray";
import { FlipbookModal } from "../components/Modals/FlipbookModal";
import { ClientProofingModal } from "../components/Modals/ClientProofingModal";
import { StorybookModal } from "../components/Modals/StorybookModal";
import { useAlbumStore } from "../store/useAlbumStore";

export const StudioPage: React.FC = () => {
  const {
    getActiveProject,
    getActiveSpread,
    currentSpreadIndex,
    setCurrentSpreadIndex,
    selectedLayerId,
    setSelectedLayerId,
    updateCurrentSpread,
    addLayerToCurrentSpread,
    updateLayerInCurrentSpread,
    deleteLayerFromCurrentSpread,
    duplicateLayerInCurrentSpread,
    reorderLayerInCurrentSpread,
    addSpreadToActiveProject,
    duplicateCurrentSpread,
    deleteSpreadFromActiveProject,
    updateSpreadStatus,
    addCommentToSpread,
    updateProject,
    zoom,
    setZoom,
    showBleed,
    setShowBleed,
    showSafeArea,
    setShowSafeArea,
    showCrease,
    setShowCrease,
    showGrid,
    setShowGrid,
    showRulers,
    setShowRulers,
    previewMode,
    setPreviewMode,
  } = useAlbumStore();

  const activeProject = getActiveProject();
  const currentSpread = getActiveSpread();
  const spreads = activeProject?.spreads || [];

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

  if (!activeProject || !currentSpread) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#14161b] text-white">
        <div className="text-center space-y-3">
          <h2 className="font-serif text-xl font-bold">Loading Album Workspace...</h2>
        </div>
      </div>
    );
  }

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

  // 4. RESET CANVAS
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

  // BACKGROUND PALETTE
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
    updateSpreadStatus(spreadId, status);
    showToast(`Spread marked as ${status === "approved" ? "Approved" : status === "needs-revision" ? "Needs Revision" : "Pending"}`);
  };

  const handleAddComment = (spreadId: string, text: string) => {
    addCommentToSpread(spreadId, {
      author: "Client (Ananya)",
      text,
    });
    showToast("Feedback note added to spread");
  };

  // STORYBOOK GENERATOR BATCH
  const handleGenerateStorybook = (generatedSpreads: AlbumSpread[]) => {
    updateProject(activeProject.id, { spreads: generatedSpreads });
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
        projectName={activeProject.name}
      />

      {/* 2. MAIN 3-PANEL WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar */}
        <LeftSidebar
          currentSpread={currentSpread}
          onGenerateNew={handleGenerateNew}
          onRandomDesign={handleRandomDesign}
          onRegenerateLayout={handleRegenerateLayout}
          onSaveDesign={() => showToast("Design saved to studio project")}
          onDuplicateDesign={() => duplicateCurrentSpread()}
          onResetCanvas={handleResetCanvas}
          onAddLayer={addLayerToCurrentSpread}
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

        {/* Center Canvas */}
        <AlbumCanvas
          spread={currentSpread}
          selectedLayerId={selectedLayerId}
          onSelectLayer={setSelectedLayerId}
          onUpdateLayer={updateLayerInCurrentSpread}
          showBleed={showBleed}
          showSafeArea={showSafeArea}
          showCrease={showCrease}
          showGrid={showGrid}
          showRulers={showRulers}
          previewMode={previewMode}
          zoom={zoom}
          onZoomChange={setZoom}
        />

        {/* Right Sidebar */}
        <RightSidebar
          layers={currentSpread.layers}
          selectedLayerId={selectedLayerId}
          onSelectLayer={setSelectedLayerId}
          onUpdateLayer={updateLayerInCurrentSpread}
          onDeleteLayer={deleteLayerFromCurrentSpread}
          onDuplicateLayer={duplicateLayerInCurrentSpread}
          onReorderLayer={reorderLayerInCurrentSpread}
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
        onAddSpread={() => addSpreadToActiveProject()}
        onDuplicateSpread={(idx) => duplicateCurrentSpread(idx)}
        onDeleteSpread={(idx) => deleteSpreadFromActiveProject(idx)}
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
          albumTitle={activeProject.name}
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
};
