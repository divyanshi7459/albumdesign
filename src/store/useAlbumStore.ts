import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Project,
  AlbumSpread,
  AlbumLayer,
  UserProfile,
  CanvasDimensions,
  WeddingStyle,
  WeddingEvent,
  ProofStatus,
  ProofComment,
  LayoutArchetype,
} from "../types/album";
import { LayoutEngine } from "../services/layoutEngine";

export const DEFAULT_DIMENSIONS: CanvasDimensions = {
  presetName: "12 × 24 inch (Panoramic Spread)",
  widthInch: 24,
  heightInch: 12,
  widthPx: 7200,
  heightPx: 3600,
  dpi: 300,
  unit: "inch",
  bleedInch: 0.25,
  safeAreaInch: 0.5,
};

// Seed initial demo projects
const createInitialProjects = (): Project[] => {
  const spreads1: AlbumSpread[] = [
    LayoutEngine.generateSpread({ spreadNumber: 1, event: "Wedding", style: "Royal Indian Wedding", photoCount: 3, archetype: "central-hero" }),
    LayoutEngine.generateSpread({ spreadNumber: 2, event: "Haldi", style: "Haldi", photoCount: 4, archetype: "quad-grid" }),
    LayoutEngine.generateSpread({ spreadNumber: 3, event: "Mehendi", style: "Mehendi", photoCount: 5, archetype: "five-photo-feature" }),
    LayoutEngine.generateSpread({ spreadNumber: 4, event: "Sangeet", style: "Sangeet", photoCount: 6, archetype: "asymmetric-editorial" }),
    LayoutEngine.generateSpread({ spreadNumber: 5, event: "Reception", style: "Reception", photoCount: 2, archetype: "royal-jharokha" }),
  ];

  const spreads2: AlbumSpread[] = [
    LayoutEngine.generateSpread({ spreadNumber: 1, event: "Wedding", style: "Rajasthani Royal", photoCount: 2, archetype: "royal-jharokha" }),
    LayoutEngine.generateSpread({ spreadNumber: 2, event: "Couple Portraits", style: "Rajasthani Royal", photoCount: 4, archetype: "layered-cards" }),
    LayoutEngine.generateSpread({ spreadNumber: 3, event: "Sangeet", style: "Rajasthani Royal", photoCount: 5, archetype: "asymmetric-editorial" }),
  ];

  const spreads3: AlbumSpread[] = [
    LayoutEngine.generateSpread({ spreadNumber: 1, event: "Wedding", style: "Pastel", photoCount: 3, archetype: "central-hero" }),
    LayoutEngine.generateSpread({ spreadNumber: 2, event: "Pre-Wedding", style: "Pastel", photoCount: 4, archetype: "cinematic-strip" }),
  ];

  const project1: Project = {
    id: "proj-aarav-ananya",
    name: "Aarav & Ananya - Shubh Vivah",
    coupleNames: "Aarav & Ananya",
    weddingDate: "December 14, 2026",
    style: "Royal Indian Wedding",
    event: "Wedding",
    dimensions: { ...DEFAULT_DIMENSIONS },
    spreads: spreads1,
    lastModified: Date.now() - 1000 * 60 * 45, // 45 mins ago
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    status: "in-review",
    clientEmail: "ananya.verma@example.com",
  };

  const project2: Project = {
    id: "proj-kabir-rhea",
    name: "Kabir & Rhea - Royal Jaipur Celebration",
    coupleNames: "Kabir & Rhea",
    weddingDate: "November 28, 2026",
    style: "Rajasthani Royal",
    event: "Wedding",
    dimensions: { ...DEFAULT_DIMENSIONS },
    spreads: spreads2,
    lastModified: Date.now() - 1000 * 60 * 60 * 4, // 4 hours ago
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    status: "approved",
    clientEmail: "rhea.kapoor@example.com",
  };

  const project3: Project = {
    id: "proj-dev-ishita",
    name: "Dev & Ishita - Pastel Heritage Romance",
    coupleNames: "Dev & Ishita",
    weddingDate: "January 18, 2027",
    style: "Pastel",
    event: "Pre-Wedding",
    dimensions: { ...DEFAULT_DIMENSIONS },
    spreads: spreads3,
    lastModified: Date.now() - 1000 * 60 * 60 * 26, // 1 day ago
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
    status: "draft",
    clientEmail: "ishita.sharma@example.com",
  };

  return [project1, project2, project3];
};

export interface PhotoAsset {
  id: string;
  url: string;
  name: string;
  dateAdded: number;
}

interface AlbumStoreState {
  // Auth
  user: UserProfile | null;
  isDemo: boolean;
  login: (name: string, email: string, role?: UserProfile["role"]) => void;
  demoLogin: () => void;
  logout: () => void;

  // Projects
  projects: Project[];
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
  createProject: (params: {
    name: string;
    coupleNames: string;
    style: WeddingStyle;
    event: WeddingEvent;
    spreadCount?: number;
    dimensions?: CanvasDimensions;
  }) => string;
  duplicateProject: (id: string) => string;
  deleteProject: (id: string) => void;
  updateProject: (id: string, partial: Partial<Project>) => void;
  importProjectJSON: (json: string) => string | null;

  // Active Studio Canvas State
  currentSpreadIndex: number;
  setCurrentSpreadIndex: (index: number) => void;
  selectedLayerId: string | null;
  setSelectedLayerId: (id: string | null) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  showBleed: boolean;
  setShowBleed: (v: boolean) => void;
  showSafeArea: boolean;
  setShowSafeArea: (v: boolean) => void;
  showCrease: boolean;
  setShowCrease: (v: boolean) => void;
  showGrid: boolean;
  setShowGrid: (v: boolean) => void;
  showRulers: boolean;
  setShowRulers: (v: boolean) => void;
  previewMode: "rgb" | "cmyk" | "mono";
  setPreviewMode: (mode: "rgb" | "cmyk" | "mono") => void;

  // Photo Library
  photoLibrary: PhotoAsset[];
  addPhotoToLibrary: (url: string, name: string) => void;
  removePhotoFromLibrary: (id: string) => void;

  // Active Spread Manipulations
  getActiveProject: () => Project | undefined;
  getActiveSpread: () => AlbumSpread | undefined;
  updateCurrentSpread: (updated: AlbumSpread) => void;
  addSpreadToActiveProject: (event?: WeddingEvent, style?: WeddingStyle) => void;
  duplicateCurrentSpread: (index?: number) => void;
  deleteSpreadFromActiveProject: (index: number) => void;

  // Layer Actions
  addLayerToCurrentSpread: (layer: AlbumLayer) => void;
  updateLayerInCurrentSpread: (layer: AlbumLayer) => void;
  deleteLayerFromCurrentSpread: (layerId: string) => void;
  duplicateLayerInCurrentSpread: (layerId: string) => void;
  reorderLayerInCurrentSpread: (layerId: string, direction: "up" | "down" | "top" | "bottom") => void;

  // Proofing
  updateSpreadStatus: (spreadId: string, status: ProofStatus) => void;
  addCommentToSpread: (spreadId: string, comment: { author: string; text: string; x?: number; y?: number }) => void;
  toggleCommentResolved: (spreadId: string, commentId: string) => void;
}

export const useAlbumStore = create<AlbumStoreState>()(
  persist(
    (set, get) => ({
      // Auth defaults
      user: {
        id: "usr-demo-designer",
        name: "Vikram Singhania",
        email: "vikram@royalweddings.studio",
        role: "designer",
        companyName: "Royal Heritage Album Studio",
        isDemo: true,
      },
      isDemo: true,

      login: (name, email, role = "designer") => {
        set({
          user: {
            id: `usr-${Date.now()}`,
            name,
            email,
            role,
            companyName: `${name}'s Studio`,
            isDemo: false,
          },
          isDemo: false,
        });
      },

      demoLogin: () => {
        set({
          user: {
            id: "usr-demo-designer",
            name: "Vikram Singhania",
            email: "vikram@royalweddings.studio",
            role: "studio",
            companyName: "Royal Heritage Album Studio",
            isDemo: true,
          },
          isDemo: true,
        });
      },

      logout: () => {
        set({ user: null, isDemo: false });
      },

      // Projects
      projects: createInitialProjects(),
      activeProjectId: "proj-aarav-ananya",

      setActiveProjectId: (id: string) => {
        set({ activeProjectId: id, currentSpreadIndex: 0, selectedLayerId: null });
      },

      createProject: ({ name, coupleNames, style, event, spreadCount = 5, dimensions = DEFAULT_DIMENSIONS }) => {
        const id = `proj-${Date.now()}`;
        const spreads = LayoutEngine.generateFullAlbum({
          spreadCount,
          style,
          albumTitle: name,
        });

        const newProject: Project = {
          id,
          name,
          coupleNames,
          style,
          event,
          dimensions,
          spreads,
          lastModified: Date.now(),
          createdAt: Date.now(),
          status: "draft",
        };

        set((state) => ({
          projects: [newProject, ...state.projects],
          activeProjectId: id,
          currentSpreadIndex: 0,
          selectedLayerId: null,
        }));

        return id;
      },

      duplicateProject: (id: string) => {
        const source = get().projects.find((p) => p.id === id);
        if (!source) return "";

        const newId = `proj-${Date.now()}`;
        const duplicated: Project = {
          ...source,
          id: newId,
          name: `${source.name} (Copy)`,
          createdAt: Date.now(),
          lastModified: Date.now(),
          spreads: source.spreads.map((s, i) => ({
            ...s,
            id: `spread-${Date.now()}-${i}`,
            layers: s.layers.map((l) => ({ ...l, id: `${l.id}-copy` })),
          })),
        };

        set((state) => ({
          projects: [duplicated, ...state.projects],
          activeProjectId: newId,
          currentSpreadIndex: 0,
          selectedLayerId: null,
        }));

        return newId;
      },

      deleteProject: (id: string) => {
        set((state) => {
          const filtered = state.projects.filter((p) => p.id !== id);
          const nextActive = filtered.length > 0 ? filtered[0].id : "";
          return {
            projects: filtered,
            activeProjectId: state.activeProjectId === id ? nextActive : state.activeProjectId,
            currentSpreadIndex: 0,
            selectedLayerId: null,
          };
        });
      },

      updateProject: (id: string, partial: Partial<Project>) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...partial, lastModified: Date.now() } : p
          ),
        }));
      },

      importProjectJSON: (jsonString: string) => {
        try {
          const parsed = JSON.parse(jsonString);
          const id = `proj-import-${Date.now()}`;
          const importedProject: Project = {
            id,
            name: parsed.name || "Imported Indian Wedding Album",
            coupleNames: parsed.coupleNames || "Wedding Celebration",
            style: parsed.style || "Royal Indian Wedding",
            event: parsed.event || "Wedding",
            dimensions: parsed.dimensions || DEFAULT_DIMENSIONS,
            spreads: parsed.spreads || [
              LayoutEngine.generateSpread({ spreadNumber: 1, event: "Wedding", style: "Royal Indian Wedding" }),
            ],
            lastModified: Date.now(),
            createdAt: Date.now(),
            status: "draft",
          };

          set((state) => ({
            projects: [importedProject, ...state.projects],
            activeProjectId: id,
            currentSpreadIndex: 0,
            selectedLayerId: null,
          }));

          return id;
        } catch (e) {
          console.error("Failed to parse project JSON:", e);
          return null;
        }
      },

      // Studio Canvas Viewport
      currentSpreadIndex: 0,
      setCurrentSpreadIndex: (index: number) => set({ currentSpreadIndex: index, selectedLayerId: null }),
      selectedLayerId: null,
      setSelectedLayerId: (id: string | null) => set({ selectedLayerId: id }),
      zoom: 0.42,
      setZoom: (zoom: number) => set({ zoom }),
      showBleed: true,
      setShowBleed: (v: boolean) => set({ showBleed: v }),
      showSafeArea: true,
      setShowSafeArea: (v: boolean) => set({ showSafeArea: v }),
      showCrease: true,
      setShowCrease: (v: boolean) => set({ showCrease: v }),
      showGrid: false,
      setShowGrid: (v: boolean) => set({ showGrid: v }),
      showRulers: true,
      setShowRulers: (v: boolean) => set({ showRulers: v }),
      previewMode: "rgb",
      setPreviewMode: (mode: "rgb" | "cmyk" | "mono") => set({ previewMode: mode }),

      // Photo Library
      photoLibrary: [],
      addPhotoToLibrary: (url: string, name: string) => {
        set((state) => ({
          photoLibrary: [
            { id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`, url, name, dateAdded: Date.now() },
            ...state.photoLibrary,
          ],
        }));
      },
      removePhotoFromLibrary: (id: string) => {
        set((state) => ({
          photoLibrary: state.photoLibrary.filter((p) => p.id !== id),
        }));
      },

      // Helpers
      getActiveProject: () => {
        const { projects, activeProjectId } = get();
        return projects.find((p) => p.id === activeProjectId) || projects[0];
      },

      getActiveSpread: () => {
        const project = get().getActiveProject();
        if (!project || !project.spreads.length) return undefined;
        const idx = get().currentSpreadIndex;
        return project.spreads[idx] || project.spreads[0];
      },

      updateCurrentSpread: (updatedSpread: AlbumSpread) => {
        const { projects, activeProjectId, currentSpreadIndex } = get();
        set({
          projects: projects.map((p) => {
            if (p.id !== activeProjectId) return p;
            const nextSpreads = [...p.spreads];
            nextSpreads[currentSpreadIndex] = updatedSpread;
            return { ...p, spreads: nextSpreads, lastModified: Date.now() };
          }),
        });
      },

      addSpreadToActiveProject: (event = "Wedding", style) => {
        const project = get().getActiveProject();
        if (!project) return;
        const nextSpreadNumber = project.spreads.length + 1;
        const newSpread = LayoutEngine.generateSpread({
          spreadNumber: nextSpreadNumber,
          event,
          style: style || project.style,
          photoCount: 3,
        });

        get().updateProject(project.id, {
          spreads: [...project.spreads, newSpread],
        });
        set({ currentSpreadIndex: project.spreads.length, selectedLayerId: null });
      },

      duplicateCurrentSpread: (index) => {
        const project = get().getActiveProject();
        if (!project) return;
        const targetIdx = index !== undefined ? index : get().currentSpreadIndex;
        const toDup = project.spreads[targetIdx];
        if (!toDup) return;

        const duplicated: AlbumSpread = {
          ...toDup,
          id: `spread-${Date.now()}`,
          spreadNumber: project.spreads.length + 1,
          title: `${toDup.title} (Copy)`,
          layers: toDup.layers.map((l) => ({ ...l, id: `${l.id}-copy` })),
        };

        get().updateProject(project.id, {
          spreads: [...project.spreads, duplicated],
        });
        set({ currentSpreadIndex: project.spreads.length, selectedLayerId: null });
      },

      deleteSpreadFromActiveProject: (index: number) => {
        const project = get().getActiveProject();
        if (!project || project.spreads.length <= 1) return;

        const updatedSpreads = project.spreads
          .filter((_, i) => i !== index)
          .map((s, i) => ({ ...s, spreadNumber: i + 1 }));

        get().updateProject(project.id, { spreads: updatedSpreads });
        set({
          currentSpreadIndex: Math.max(0, Math.min(index, updatedSpreads.length - 1)),
          selectedLayerId: null,
        });
      },

      // Layer Actions
      addLayerToCurrentSpread: (layer: AlbumLayer) => {
        const spread = get().getActiveSpread();
        if (!spread) return;
        const maxZ = Math.max(...spread.layers.map((l) => l.zIndex), 0);
        const layerToAdd = { ...layer, zIndex: maxZ + 1 };
        get().updateCurrentSpread({
          ...spread,
          layers: [...spread.layers, layerToAdd],
        });
        set({ selectedLayerId: layerToAdd.id });
      },

      updateLayerInCurrentSpread: (layer: AlbumLayer) => {
        const spread = get().getActiveSpread();
        if (!spread) return;
        get().updateCurrentSpread({
          ...spread,
          layers: spread.layers.map((l) => (l.id === layer.id ? layer : l)),
        });
      },

      deleteLayerFromCurrentSpread: (layerId: string) => {
        const spread = get().getActiveSpread();
        if (!spread) return;
        get().updateCurrentSpread({
          ...spread,
          layers: spread.layers.filter((l) => l.id !== layerId),
        });
        if (get().selectedLayerId === layerId) {
          set({ selectedLayerId: null });
        }
      },

      duplicateLayerInCurrentSpread: (layerId: string) => {
        const spread = get().getActiveSpread();
        if (!spread) return;
        const source = spread.layers.find((l) => l.id === layerId);
        if (!source) return;

        const maxZ = Math.max(...spread.layers.map((l) => l.zIndex), 0);
        const duplicated: AlbumLayer = {
          ...source,
          id: `${source.type}-${Date.now()}`,
          name: `${source.name} (Copy)`,
          x: source.x + 40,
          y: source.y + 40,
          zIndex: maxZ + 1,
        };

        get().updateCurrentSpread({
          ...spread,
          layers: [...spread.layers, duplicated],
        });
        set({ selectedLayerId: duplicated.id });
      },

      reorderLayerInCurrentSpread: (layerId: string, direction: "up" | "down" | "top" | "bottom") => {
        const spread = get().getActiveSpread();
        if (!spread) return;
        const layers = [...spread.layers].sort((a, b) => a.zIndex - b.zIndex);
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

        get().updateCurrentSpread({ ...spread, layers });
      },

      // Proofing
      updateSpreadStatus: (spreadId: string, status: ProofStatus) => {
        const project = get().getActiveProject();
        if (!project) return;
        const updated = project.spreads.map((s) => (s.id === spreadId ? { ...s, status } : s));
        get().updateProject(project.id, { spreads: updated });
      },

      addCommentToSpread: (spreadId: string, comment: { author: string; text: string; x?: number; y?: number }) => {
        const project = get().getActiveProject();
        if (!project) return;
        const newComment: ProofComment = {
          id: `comment-${Date.now()}`,
          author: comment.author,
          date: new Date().toISOString(),
          text: comment.text,
          x: comment.x,
          y: comment.y,
          resolved: false,
        };

        const updated = project.spreads.map((s) => {
          if (s.id === spreadId) {
            return {
              ...s,
              status: "needs-revision" as ProofStatus,
              comments: [...(s.comments || []), newComment],
            };
          }
          return s;
        });

        get().updateProject(project.id, { spreads: updated });
      },

      toggleCommentResolved: (spreadId: string, commentId: string) => {
        const project = get().getActiveProject();
        if (!project) return;
        const updated = project.spreads.map((s) => {
          if (s.id === spreadId) {
            return {
              ...s,
              comments: s.comments.map((c) => (c.id === commentId ? { ...c, resolved: !c.resolved } : c)),
            };
          }
          return s;
        });
        get().updateProject(project.id, { spreads: updated });
      },
    }),
    {
      name: "album-design-studio-storage-v2",
      partialize: (state) => ({
        user: state.user,
        projects: state.projects,
        activeProjectId: state.activeProjectId,
        photoLibrary: state.photoLibrary,
      }),
    }
  )
);
