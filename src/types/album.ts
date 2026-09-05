export type WeddingStyle =
  | "Royal Indian Wedding"
  | "Luxury Wedding"
  | "Traditional Wedding"
  | "Modern Wedding"
  | "Minimal Wedding"
  | "Floral Wedding"
  | "Cinematic Wedding"
  | "Black & Gold"
  | "Red & Gold"
  | "Maroon & Cream"
  | "Pastel"
  | "Rajasthani Royal"
  | "Punjabi"
  | "South Indian"
  | "Engagement"
  | "Haldi"
  | "Mehendi"
  | "Sangeet"
  | "Reception"
  | "Pre-Wedding";

export type WeddingEvent =
  | "Haldi"
  | "Mehendi"
  | "Sangeet"
  | "Wedding"
  | "Pheras"
  | "Reception"
  | "Couple Portraits"
  | "Family"
  | "Bride"
  | "Groom"
  | "Pre-Wedding"
  | "Final Page";

export type LayoutArchetype =
  | "central-hero"
  | "asymmetric-editorial"
  | "cinematic-strip"
  | "overlapping-stack"
  | "triangle-balance"
  | "quad-grid"
  | "five-photo-feature"
  | "eight-photo-collage"
  | "royal-jharokha"
  | "full-bleed-split"
  | "diagonal-dynamic"
  | "minimal-monochrome"
  | "magazine-editorial"
  | "layered-cards";

export type PhotoShape =
  | "rectangle"
  | "portrait"
  | "landscape"
  | "square"
  | "circle"
  | "rounded"
  | "cinematic-wide"
  | "arch-jharokha"
  | "diamond"
  | "oval";

export type MotifType =
  | "mandala"
  | "peacock"
  | "lotus"
  | "paisley"
  | "kalash"
  | "diya"
  | "elephant"
  | "floral-jaali"
  | "rajasthani-corner"
  | "south-temple"
  | "punjabi-ornament";

export type BorderPreset =
  | "royal-gold"
  | "ornate-filigree"
  | "floral-vine"
  | "geometric-jaali"
  | "minimal-line"
  | "double-line"
  | "corner-ornament"
  | "jharokha-frame"
  | "palace-arch";

export type FloralType =
  | "rose-corner"
  | "lotus-cluster"
  | "jasmine-garland"
  | "marigold-accent"
  | "vine-border"
  | "floral-bouquet";

export type LuxuryAccentType =
  | "gold-foil-splash"
  | "ornamental-divider"
  | "mandap-pillar"
  | "royal-crest"
  | "metallic-corner"
  | "sparkle-glow";

export type BackgroundPattern =
  | "ivory-paper"
  | "cream-silk"
  | "velvet-maroon"
  | "royal-navy"
  | "marble"
  | "subtle-fabric"
  | "pastel-blush"
  | "traditional-mandala-texture"
  | "dark-emerald"
  | "pure-black-gold";

export type LayerType =
  | "photo-placeholder"
  | "text"
  | "motif"
  | "border"
  | "floral"
  | "luxury-accent"
  | "background";

export interface CropSettings {
  zoom: number; // 1 to 3
  offsetX: number; // percentage or px
  offsetY: number;
  fitMode: "cover" | "contain";
}

export interface BaseLayer {
  id: string;
  name: string;
  type: LayerType;
  x: number; // in pixels relative to canvas width
  y: number; // in pixels relative to canvas height
  width: number;
  height: number;
  rotation: number; // degrees
  opacity: number; // 0 to 1
  zIndex: number;
  isLocked: boolean;
  isHidden: boolean;
}

export interface PhotoPlaceholderLayer extends BaseLayer {
  type: "photo-placeholder";
  shape: PhotoShape;
  cornerRadius: number;
  borderWidth: number;
  borderColor: string;
  imageSrc?: string; // Empty initially - NO stock people!
  crop: CropSettings;
  innerShadow?: boolean;
  aspectRatioLabel?: string;
}

export interface TextLayer extends BaseLayer {
  type: "text";
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  fontStyle?: "normal" | "italic";
  letterSpacing: number;
  lineHeight: number;
  textAlign: "left" | "center" | "right";
  color: string;
  textTransform?: "none" | "uppercase" | "capitalize";
}

export interface MotifLayer extends BaseLayer {
  type: "motif";
  motifType: MotifType;
  color: string;
  secondaryColor?: string;
  flipX?: boolean;
  flipY?: boolean;
}

export interface BorderLayer extends BaseLayer {
  type: "border";
  borderPreset: BorderPreset;
  color: string;
  strokeWidth: number;
  inset: number;
}

export interface FloralLayer extends BaseLayer {
  type: "floral";
  floralType: FloralType;
  color: string;
  secondaryColor?: string;
  flipX?: boolean;
}

export interface LuxuryAccentLayer extends BaseLayer {
  type: "luxury-accent";
  accentType: LuxuryAccentType;
  color: string;
}

export interface BackgroundLayer extends BaseLayer {
  type: "background";
  bgType: "solid" | "gradient" | "pattern";
  color1: string;
  color2?: string;
  gradientAngle?: number;
  patternName?: BackgroundPattern;
  customImageSrc?: string;
}

export type AlbumLayer =
  | PhotoPlaceholderLayer
  | TextLayer
  | MotifLayer
  | BorderLayer
  | FloralLayer
  | LuxuryAccentLayer
  | BackgroundLayer;

export interface CanvasDimensions {
  presetName: string;
  widthInch: number;
  heightInch: number;
  widthPx: number; // calculated at DPI
  heightPx: number;
  dpi: 72 | 150 | 300;
  unit: "inch" | "cm" | "mm" | "px";
  bleedInch: number; // usually 0.25 inch
  safeAreaInch: number; // usually 0.5 inch
}

export interface ProofComment {
  id: string;
  author: string;
  date: string;
  text: string;
  x?: number; // pin location on spread
  y?: number;
  resolved: boolean;
}

export type ProofStatus = "pending" | "approved" | "needs-revision";

export interface AlbumSpread {
  id: string;
  spreadNumber: number;
  title: string;
  event: WeddingEvent;
  style: WeddingStyle;
  photoCount: number;
  layoutArchetype: LayoutArchetype;
  layers: AlbumLayer[];
  status: ProofStatus;
  comments: ProofComment[];
  seed: number;
}

export interface GenerationHistoryItem {
  id: string;
  timestamp: number;
  spreadTitle: string;
  style: WeddingStyle;
  event: WeddingEvent;
  photoCount: number;
  spread: AlbumSpread;
}

export interface ReferenceAnalysisResult {
  mood: string;
  suggestedStyle: WeddingStyle;
  suggestedEvent: WeddingEvent;
  dominantPalette: string[];
  density: "minimal" | "subtle" | "medium" | "ornate" | "royal";
  recommendedBorder: BorderPreset;
  recommendedMotif: MotifType;
  typographyStyle: string;
  compositionAdvice: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "photographer" | "designer" | "studio" | "lab";
  companyName?: string;
  avatarUrl?: string;
  isDemo?: boolean;
}

export interface Project {
  id: string;
  name: string;
  coupleNames: string;
  weddingDate?: string;
  style: WeddingStyle;
  event: WeddingEvent;
  dimensions: CanvasDimensions;
  spreads: AlbumSpread[];
  lastModified: number;
  createdAt: number;
  status: "draft" | "in-review" | "approved" | "completed";
  clientEmail?: string;
  thumbnail?: string;
}

export interface AlbumTemplate {
  id: string;
  title: string;
  subtitle: string;
  category: "royal" | "traditional" | "modern" | "floral" | "regional" | "minimal";
  style: WeddingStyle;
  event: WeddingEvent;
  spreadCount: number;
  photoCountPerSpread: number;
  tags: string[];
  coverColor: string;
  accentColor: string;
  description: string;
  featured?: boolean;
}
