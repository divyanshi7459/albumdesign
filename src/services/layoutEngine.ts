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
  WeddingStyle,
  WeddingEvent,
  LayoutArchetype,
  PhotoShape,
} from "../types/album";
import { STYLE_THEMES } from "../assets/indianWeddingAssets";

// Sanskrit & Poetic Indian Wedding Headings
const EVENT_HEADINGS: Record<WeddingEvent, { titles: string[]; subtitles: string[]; quotes: string[] }> = {
  Haldi: {
    titles: ["Haldi Ke Rang", "The Golden Glow", "Pithi Ceremonials", "Auspicious Radiance", "Sunlit Blessings"],
    subtitles: ["Joyous Morning Festivities", "Smiles, Laughter & Turmeric Love", "The Golden Dawn of Forever"],
    quotes: ["Dipped in turmeric gold, blessed by loved ones with joyful hearts.", "Yellow hues of laughter, love, and sacred beginnings."],
  },
  Mehendi: {
    titles: ["Mehendi Hai Rachne Wali", "Henna Impressions", "Scent of Myrtle", "Intricate Tales", "The Mehendi Soirée"],
    subtitles: ["Drawn with Love & Prayers", "Darkening Colors of Lifelong Love", "A Festivity of Music & Henna"],
    quotes: ["May the deep color of henna whisper stories of unending love.", "Intricate patterns carrying prayers of harmony and devotion."],
  },
  Sangeet: {
    titles: ["Sangeet Raat", "Rhythms of Love", "The Grand Gala", "Celebration of Stars", "Dhol & Beats"],
    subtitles: ["An Evening of Dance & Music", "Two Families Dancing as One", "Melodies Under the Moonlight"],
    quotes: ["When hearts beat together, the entire cosmos sings in harmony.", "Footsteps that mirror joy, a night of unbridled euphoria."],
  },
  Wedding: {
    titles: ["Shubh Vivah", "The Royal Vows", "Sacred Knot", "Anand Karaj", "The Royal Wedding"],
    subtitles: ["Two Souls Bound in Sacred Eternity", "A Royal Symphony of Vedic Rituals", "The Grand Union"],
    quotes: ["With each sacred vow, two hearts become an unbreakable promise.", "Under the mandap of flowers, a sacred journey begins."],
  },
  Pheras: {
    titles: ["Saat Phere", "Around the Holy Agni", "Sacred Vows", "Seven Steps of Eternity", "Agni Sakshi"],
    subtitles: ["Seven Steps to Togetherness", "In the Sacred Presence of Fire", "The Eternal Circle of Love"],
    quotes: ["Seven steps together, for life, happiness, duty, and eternal friendship.", "Witnessed by the eternal flame, bound by devotion."],
  },
  Reception: {
    titles: ["The Grand Reception", "Evening of Elegance", "Royalty Unveiled", "Celebration of Forever", "A Toast to Love"],
    subtitles: ["Black-Tie Celebration with Dear Ones", "A Toast to the Newlyweds", "Dancing into Eternity"],
    quotes: ["Here's to love, laughter, and a happily ever after that inspires generations.", "The beginning of an extraordinary chapter in grand elegance."],
  },
  "Couple Portraits": {
    titles: ["Eternally Yours", "Gaze of Love", "Royal Portraits", "In Your Eyes", "The Golden Hour"],
    subtitles: ["Timeless Editorial Romance", "Stolen Moments in Royal Solitude", "Forever Captured"],
    quotes: ["In your eyes, I found my sanctuary and the love of a lifetime.", "A quiet whisper amidst royal celebrations."],
  },
  Family: {
    titles: ["Roots of Blessing", "The Royal Kinship", "Generations of Love", "Two Families, One Heart", "Parivaar"],
    subtitles: ["Surrounded by Pillars of Strength", "Elders' Blessings & Warm Embraces", "Ties That Bind Forever"],
    quotes: ["A wedding unites not just two souls, but two lineages in timeless bond.", "Blessed by elders, cherished by siblings, loved unconditionally."],
  },
  Bride: {
    titles: ["The Royal Bride", "Dressed in Radiance", "Dulhan", "Grace & Splendor", "The Queen of the Day"],
    subtitles: ["Adorned in Heritage and Dreams", "A Vision in Vermillion and Zari", "Walking Towards Her Destiny"],
    quotes: ["Stepping forward with grace, her eyes reflecting the dawn of new dreams.", "A queen draped in timeless heritage and sacred joy."],
  },
  Groom: {
    titles: ["The Royal Groom", "The Maharaja", "Dulhe Raja", "Chivalry & Grace", "A Man of Promise"],
    subtitles: ["Awaited at the Mandap with Dignity", "Crowned with Tradition and Valour", "Ready to Cherish Forever"],
    quotes: ["Standing proud, heart pledged to protect and cherish for all lifetimes.", "A king ready to welcome his queen into an eternal home."],
  },
  "Pre-Wedding": {
    titles: ["Prelude to Forever", "Destination Romance", "Before the Vows", "Love in Bloom", "Chapter One"],
    subtitles: ["Candid Moments of Pure Anticipation", "Chasing Sunsets Together", "Whispers of Tomorrow"],
    quotes: ["Before the world gathered to celebrate, two hearts already knew.", "Every road we walked led straight into each other's arms."],
  },
  "Final Page": {
    titles: ["And They Lived Happily Ever After", "An Eternal Beginning", "Samapan", "The Legacy Begins", "Always & Forever"],
    subtitles: ["Memories Sealed in Gold", "Hand in Hand Into the Sunset", "An Everlasting Love Story"],
    quotes: ["This is not the end of a wedding, but the sacred beginning of an eternal story.", "Etched forever in gold, bound by love, blessed by gods."],
  },
};

export class LayoutEngine {
  private static seedCounter = Math.floor(Math.random() * 10000);

  // Generate random seed
  public static getNextSeed(): number {
    this.seedCounter += 137;
    return this.seedCounter;
  }

  // Pseudorandom generator using seed
  private static seededRandom(seed: number): () => number {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  // Generate a complete layout for an album spread
  public static generateSpread(params: {
    spreadNumber?: number;
    event?: WeddingEvent;
    style?: WeddingStyle;
    photoCount?: number;
    archetype?: LayoutArchetype;
    seed?: number;
    canvasWidth?: number; // default 2400 (spread 12x24)
    canvasHeight?: number; // default 1200
  }): AlbumSpread {
    const seed = params.seed ?? this.getNextSeed();
    const rng = this.seededRandom(seed);

    const event: WeddingEvent = params.event || "Wedding";
    const style: WeddingStyle = params.style || "Royal Indian Wedding";
    const theme = STYLE_THEMES[style] || STYLE_THEMES["Royal Indian Wedding"];

    // Default dimensions for a 12x24" double-page spread
    const W = params.canvasWidth || 2400;
    const H = params.canvasHeight || 1200;
    const creaseX = W / 2; // Center spine crease at 1200

    // Photo count determination
    let photoCount = params.photoCount;
    if (!photoCount || photoCount <= 0) {
      // Pick suitable count based on event
      if (event === "Wedding" || event === "Pheras") {
        photoCount = [3, 4, 5][Math.floor(rng() * 3)];
      } else if (event === "Haldi" || event === "Mehendi") {
        photoCount = [4, 5, 6][Math.floor(rng() * 3)];
      } else if (event === "Bride" || event === "Groom" || event === "Couple Portraits") {
        photoCount = [1, 2, 3][Math.floor(rng() * 3)];
      } else if (event === "Reception") {
        photoCount = [3, 4, 6][Math.floor(rng() * 3)];
      } else {
        photoCount = 3;
      }
    }

    // Archetype selection
    const availableArchetypes: LayoutArchetype[] = [
      "central-hero",
      "asymmetric-editorial",
      "cinematic-strip",
      "overlapping-stack",
      "triangle-balance",
      "quad-grid",
      "five-photo-feature",
      "royal-jharokha",
      "full-bleed-split",
      "diagonal-dynamic",
      "magazine-editorial",
      "layered-cards",
    ];
    const archetype: LayoutArchetype =
      params.archetype || availableArchetypes[Math.floor(rng() * availableArchetypes.length)];

    // Content texts
    const headingGroup = EVENT_HEADINGS[event] || EVENT_HEADINGS["Wedding"];
    const titleText = headingGroup.titles[Math.floor(rng() * headingGroup.titles.length)];
    const subtitleText = headingGroup.subtitles[Math.floor(rng() * headingGroup.subtitles.length)];
    const quoteText = headingGroup.quotes[Math.floor(rng() * headingGroup.quotes.length)];

    const layers: AlbumLayer[] = [];

    // 1. BACKGROUND LAYER
    const bgTypes: ("solid" | "gradient" | "pattern")[] = ["gradient", "pattern", "solid"];
    const chosenBgType = bgTypes[Math.floor(rng() * bgTypes.length)];
    const bgPatterns = [
      "ivory-paper",
      "cream-silk",
      "velvet-maroon",
      "royal-navy",
      "marble",
      "subtle-fabric",
      "pastel-blush",
      "traditional-mandala-texture",
    ] as const;
    const chosenPattern = bgPatterns[Math.floor(rng() * bgPatterns.length)];

    const backgroundLayer: BackgroundLayer = {
      id: "bg-0",
      name: "Spread Canvas Background",
      type: "background",
      x: 0,
      y: 0,
      width: W,
      height: H,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      isLocked: true,
      isHidden: false,
      bgType: chosenBgType,
      color1: theme.backgroundColor,
      color2: chosenBgType === "gradient" ? theme.backgroundSecondary : undefined,
      gradientAngle: Math.floor(rng() * 4) * 45,
      patternName: chosenBgType === "pattern" ? chosenPattern : undefined,
    };
    layers.push(backgroundLayer);

    // 2. OUTER BORDER / FRAME LAYER
    const borders = [
      "royal-gold",
      "ornate-filigree",
      "floral-vine",
      "geometric-jaali",
      "minimal-line",
      "double-line",
      "jharokha-frame",
    ] as const;
    const borderPreset = borders[Math.floor(rng() * borders.length)];

    const borderLayer: BorderLayer = {
      id: "border-1",
      name: `Border: ${borderPreset}`,
      type: "border",
      x: 40,
      y: 40,
      width: W - 80,
      height: H - 80,
      rotation: 0,
      opacity: 0.85,
      zIndex: 1,
      isLocked: false,
      isHidden: false,
      borderPreset,
      color: theme.accentGold,
      strokeWidth: 2.5,
      inset: 20,
    };
    layers.push(borderLayer);

    // 3. PHOTO PLACEHOLDERS (CRITICAL: PHOTO AREAS MUST REMAIN EMPTY)
    const placeholders = this.generatePlaceholders({
      count: photoCount,
      archetype,
      W,
      H,
      creaseX,
      theme,
      rng,
    });
    layers.push(...placeholders);

    // 4. EDITORIAL TYPOGRAPHY
    const textLayers = this.generateTypography({
      title: titleText,
      subtitle: subtitleText,
      quote: quoteText,
      archetype,
      W,
      H,
      creaseX,
      theme,
      rng,
    });
    layers.push(...textLayers);

    // 5. INDIAN WEDDING MOTIFS & ORNAMENTS
    const motifLayers = this.generateMotifs({
      archetype,
      W,
      H,
      creaseX,
      theme,
      rng,
    });
    layers.push(...motifLayers);

    // 6. FLORAL / LUXURY ACCENTS (Tasteful density)
    if (rng() > 0.35) {
      const accentLayer: LuxuryAccentLayer = {
        id: `luxury-accent-ribbon`,
        name: "Gold Filigree Divider",
        type: "luxury-accent",
        x: creaseX - 150,
        y: H - 110,
        width: 300,
        height: 40,
        rotation: 0,
        opacity: 0.9,
        zIndex: 15,
        isLocked: false,
        isHidden: false,
        accentType: "ornamental-divider",
        color: theme.accentGold,
      };
      layers.push(accentLayer);
    }

    return {
      id: `spread-${Date.now()}-${Math.floor(rng() * 1000)}`,
      spreadNumber: params.spreadNumber || 1,
      title: `${event} - ${titleText}`,
      event,
      style,
      photoCount,
      layoutArchetype: archetype,
      layers,
      status: "pending",
      comments: [],
      seed,
    };
  }

  // Generate Photo Placeholders (EMPTY outlines with subtle icons - strictly NO stock people!)
  private static generatePlaceholders(params: {
    count: number;
    archetype: LayoutArchetype;
    W: number;
    H: number;
    creaseX: number;
    theme: any;
    rng: () => number;
  }): PhotoPlaceholderLayer[] {
    const { count, archetype, W, H, creaseX, theme, rng } = params;
    const list: PhotoPlaceholderLayer[] = [];

    // Helper to create empty photo placeholder
    const makePlaceholder = (
      index: number,
      x: number,
      y: number,
      w: number,
      h: number,
      shape: PhotoShape = "portrait",
      rot = 0,
      cornerRadius = 6,
    ): PhotoPlaceholderLayer => ({
      id: `photo-${index + 1}`,
      name: `Photo Frame ${index + 1} (${shape})`,
      type: "photo-placeholder",
      x: Math.round(x),
      y: Math.round(y),
      width: Math.round(w),
      height: Math.round(h),
      rotation: rot,
      opacity: 1,
      zIndex: 10 + index,
      isLocked: false,
      isHidden: false,
      shape,
      cornerRadius,
      borderWidth: 3,
      borderColor: theme.accentGold,
      innerShadow: true,
      imageSrc: undefined, // NO stock couple or stock people - strictly empty!
      crop: {
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
        fitMode: "cover",
      },
    });

    const pad = 80;
    const safeW = W - pad * 2;
    const safeH = H - pad * 2;

    switch (count) {
      case 1: {
        // Hero Photo (Centered or Asymmetric Royal Frame)
        if (archetype === "central-hero" || archetype === "royal-jharokha") {
          list.push(makePlaceholder(0, creaseX - 420, pad + 60, 840, safeH - 120, "arch-jharokha", 0, 16));
        } else {
          list.push(makePlaceholder(0, pad + 100, pad + 40, safeW - 200, safeH - 80, "cinematic-wide", 0, 8));
        }
        break;
      }

      case 2: {
        // 2-Photo Spreads (Left page hero + Right page balance OR Side-by-side Arch)
        if (archetype === "full-bleed-split") {
          list.push(makePlaceholder(0, pad + 40, pad + 40, creaseX - pad - 80, safeH - 80, "portrait", 0, 8));
          list.push(makePlaceholder(1, creaseX + 40, pad + 40, creaseX - pad - 80, safeH - 80, "portrait", 0, 8));
        } else {
          // Asymmetric Editorial: One landscape + One dramatic vertical
          list.push(makePlaceholder(0, pad + 60, pad + 80, 520, 780, "portrait", 0, 12));
          list.push(makePlaceholder(1, creaseX + 60, pad + 120, 920, 680, "landscape", 0, 8));
        }
        break;
      }

      case 3: {
        // 3-Photo Arrangements
        if (archetype === "central-hero" || rng() > 0.5) {
          // One large hero on left, two stacked on right page
          list.push(makePlaceholder(0, pad + 60, pad + 60, 880, safeH - 120, "portrait", 0, 8));
          list.push(makePlaceholder(1, creaseX + 80, pad + 60, 920, 420, "landscape", 0, 8));
          list.push(makePlaceholder(2, creaseX + 80, pad + 520, 920, 420, "landscape", 0, 8));
        } else if (archetype === "cinematic-strip") {
          // 3 vertical panoramic strips
          const stripW = 640;
          const stripH = safeH - 100;
          list.push(makePlaceholder(0, pad + 60, pad + 50, stripW, stripH, "portrait", 0, 6));
          list.push(makePlaceholder(1, creaseX - stripW / 2, pad + 50, stripW, stripH, "portrait", 0, 6));
          list.push(makePlaceholder(2, W - pad - 60 - stripW, pad + 50, stripW, stripH, "portrait", 0, 6));
        } else {
          // Triangle balance: 2 on left, 1 big on right
          list.push(makePlaceholder(0, pad + 60, pad + 60, 840, 420, "landscape", 0, 8));
          list.push(makePlaceholder(1, pad + 60, pad + 520, 840, 420, "landscape", 0, 8));
          list.push(makePlaceholder(2, creaseX + 60, pad + 60, 920, safeH - 120, "arch-jharokha", 0, 16));
        }
        break;
      }

      case 4: {
        // 4-Photo Spreads
        if (archetype === "quad-grid") {
          // 2x2 symmetrical luxury editorial grid
          const cardW = 460;
          const cardH = 420;
          list.push(makePlaceholder(0, pad + 60, pad + 60, cardW, cardH, "rectangle", 0, 6));
          list.push(makePlaceholder(1, pad + 60, pad + 510, cardW, cardH, "rectangle", 0, 6));
          list.push(makePlaceholder(2, creaseX + 100, pad + 60, cardW, cardH, "rectangle", 0, 6));
          list.push(makePlaceholder(3, creaseX + 100, pad + 510, cardW, cardH, "rectangle", 0, 6));
        } else if (archetype === "overlapping-stack") {
          // 1 prominent portrait + 3 dynamic overlapping cards
          list.push(makePlaceholder(0, pad + 60, pad + 60, 860, safeH - 120, "portrait", 0, 12));
          list.push(makePlaceholder(1, creaseX + 60, pad + 60, 420, 420, "square", -3, 8));
          list.push(makePlaceholder(2, creaseX + 510, pad + 100, 420, 420, "square", 3, 8));
          list.push(makePlaceholder(3, creaseX + 280, pad + 500, 520, 380, "landscape", 0, 8));
        } else {
          // 1 full-height on left, 3 horizontal strips on right
          list.push(makePlaceholder(0, pad + 60, pad + 60, 880, safeH - 120, "portrait", 0, 8));
          const rightH = (safeH - 160) / 3;
          list.push(makePlaceholder(1, creaseX + 80, pad + 60, 900, rightH, "landscape", 0, 6));
          list.push(makePlaceholder(2, creaseX + 80, pad + 60 + rightH + 20, 900, rightH, "landscape", 0, 6));
          list.push(makePlaceholder(3, creaseX + 80, pad + 60 + (rightH + 20) * 2, 900, rightH, "landscape", 0, 6));
        }
        break;
      }

      case 5: {
        // 5-Photo Feature (1 central dominant + 4 surrounding satellite frames)
        list.push(makePlaceholder(0, pad + 60, pad + 60, 780, safeH - 120, "arch-jharokha", 0, 16));
        // Right side 4 grid
        const cellW = 440;
        const cellH = 410;
        list.push(makePlaceholder(1, creaseX + 70, pad + 60, cellW, cellH, "rectangle", 0, 6));
        list.push(makePlaceholder(2, creaseX + 530, pad + 60, cellW, cellH, "rectangle", 0, 6));
        list.push(makePlaceholder(3, creaseX + 70, pad + 490, cellW, cellH, "rectangle", 0, 6));
        list.push(makePlaceholder(4, creaseX + 530, pad + 490, cellW, cellH, "rectangle", 0, 6));
        break;
      }

      case 6: {
        // 6-Photo Magazine Collage (3 on left spread, 3 on right spread)
        const cellW = 450;
        const cellH = 390;
        // Left spread (1 tall + 2 horizontal)
        list.push(makePlaceholder(0, pad + 50, pad + 70, 420, safeH - 140, "portrait", 0, 8));
        list.push(makePlaceholder(1, pad + 490, pad + 70, cellW, cellH, "landscape", 0, 6));
        list.push(makePlaceholder(2, pad + 490, pad + 480, cellW, cellH, "landscape", 0, 6));
        // Right spread (2 horizontal + 1 tall)
        list.push(makePlaceholder(3, creaseX + 60, pad + 70, cellW, cellH, "landscape", 0, 6));
        list.push(makePlaceholder(4, creaseX + 60, pad + 480, cellW, cellH, "landscape", 0, 6));
        list.push(makePlaceholder(5, creaseX + 530, pad + 70, 420, safeH - 140, "portrait", 0, 8));
        break;
      }

      case 8: {
        // 8-Photo Editorial Storybook Grid (4 per page)
        const cellW = 440;
        const cellH = 390;
        // Left 4
        list.push(makePlaceholder(0, pad + 50, pad + 70, cellW, cellH, "rectangle", 0, 6));
        list.push(makePlaceholder(1, pad + 510, pad + 70, cellW, cellH, "rectangle", 0, 6));
        list.push(makePlaceholder(2, pad + 50, pad + 480, cellW, cellH, "rectangle", 0, 6));
        list.push(makePlaceholder(3, pad + 510, pad + 480, cellW, cellH, "rectangle", 0, 6));
        // Right 4
        list.push(makePlaceholder(4, creaseX + 60, pad + 70, cellW, cellH, "rectangle", 0, 6));
        list.push(makePlaceholder(5, creaseX + 520, pad + 70, cellW, cellH, "rectangle", 0, 6));
        list.push(makePlaceholder(6, creaseX + 60, pad + 480, cellW, cellH, "rectangle", 0, 6));
        list.push(makePlaceholder(7, creaseX + 520, pad + 480, cellW, cellH, "rectangle", 0, 6));
        break;
      }

      default: {
        // 10+ photos documentary spread
        const cols = 5;
        const rows = 2;
        const w = 390;
        const h = 390;
        let pIndex = 0;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (pIndex >= count) break;
            const x = pad + 40 + c * (w + 24);
            const y = pad + 80 + r * (h + 30);
            list.push(makePlaceholder(pIndex, x, y, w, h, "square", 0, 6));
            pIndex++;
          }
        }
        break;
      }
    }

    return list;
  }

  // Generate Typography Layers
  private static generateTypography(params: {
    title: string;
    subtitle: string;
    quote: string;
    archetype: LayoutArchetype;
    W: number;
    H: number;
    creaseX: number;
    theme: any;
    rng: () => number;
  }): TextLayer[] {
    const { title, subtitle, quote, W, H, creaseX, theme } = params;
    const layers: TextLayer[] = [];

    // Title placement depends on archetype
    let titleX = creaseX + 80;
    let titleY = 100;
    let titleAlign: "left" | "center" | "right" = "left";

    if (params.archetype === "central-hero" || params.archetype === "royal-jharokha") {
      titleX = creaseX;
      titleY = 85;
      titleAlign = "center";
    } else if (params.archetype === "asymmetric-editorial") {
      titleX = creaseX + 120;
      titleY = 140;
      titleAlign = "left";
    }

    // 1. MAIN WEDDING TITLE
    layers.push({
      id: "title-header",
      name: "Main Heading",
      type: "text",
      text: title,
      x: titleX,
      y: titleY,
      width: 700,
      height: 80,
      rotation: 0,
      opacity: 1,
      zIndex: 20,
      isLocked: false,
      isHidden: false,
      fontFamily: theme.fontPrimary || "Cinzel",
      fontSize: 48,
      fontWeight: "700",
      letterSpacing: 2,
      lineHeight: 1.2,
      textAlign: titleAlign,
      color: theme.textColor,
      textTransform: "uppercase",
    });

    // 2. SUBTITLE (Script or Editorial)
    layers.push({
      id: "subtitle-text",
      name: "Poetic Subtitle",
      type: "text",
      text: subtitle,
      x: titleX,
      y: titleY + 65,
      width: 600,
      height: 45,
      rotation: 0,
      opacity: 0.85,
      zIndex: 21,
      isLocked: false,
      isHidden: false,
      fontFamily: theme.fontSecondary || "Great Vibes",
      fontSize: 32,
      fontWeight: "400",
      letterSpacing: 1,
      lineHeight: 1.4,
      textAlign: titleAlign,
      color: theme.accentGold,
    });

    // 3. BLESSING QUOTE
    layers.push({
      id: "quote-text",
      name: "Blessing Verse",
      type: "text",
      text: `“${quote}”`,
      x: creaseX,
      y: H - 85,
      width: 800,
      height: 40,
      rotation: 0,
      opacity: 0.75,
      zIndex: 22,
      isLocked: false,
      isHidden: false,
      fontFamily: "Cormorant Garamond",
      fontSize: 20,
      fontWeight: "400",
      fontStyle: "italic",
      letterSpacing: 0.5,
      lineHeight: 1.5,
      textAlign: "center",
      color: theme.textColor,
    });

    return layers;
  }

  // Generate Indian Wedding Motifs
  private static generateMotifs(params: {
    archetype: LayoutArchetype;
    W: number;
    H: number;
    creaseX: number;
    theme: any;
    rng: () => number;
  }): MotifLayer[] {
    const { W, H, creaseX, theme, rng } = params;
    const layers: MotifLayer[] = [];

    const motifType = theme.defaultMotif || "mandala";

    // Corner flourishes or center seal
    if (params.archetype === "central-hero" || params.archetype === "royal-jharokha") {
      // Elegant center top mandala
      layers.push({
        id: "motif-center-crest",
        name: "Top Imperial Crest",
        type: "motif",
        x: creaseX - 45,
        y: 35,
        width: 90,
        height: 90,
        rotation: 0,
        opacity: 0.9,
        zIndex: 12,
        isLocked: false,
        isHidden: false,
        motifType: "mandala",
        color: theme.accentGold,
        secondaryColor: theme.primaryColor,
      });
    } else {
      // Corner motifs
      layers.push({
        id: "motif-corner-tl",
        name: "Corner Flourish Top-Left",
        type: "motif",
        x: 60,
        y: 60,
        width: 100,
        height: 100,
        rotation: 0,
        opacity: 0.8,
        zIndex: 12,
        isLocked: false,
        isHidden: false,
        motifType,
        color: theme.accentGold,
        secondaryColor: theme.primaryColor,
      });

      layers.push({
        id: "motif-corner-br",
        name: "Corner Flourish Bottom-Right",
        type: "motif",
        x: W - 160,
        y: H - 160,
        width: 100,
        height: 100,
        rotation: 180,
        opacity: 0.8,
        zIndex: 12,
        isLocked: false,
        isHidden: false,
        motifType,
        color: theme.accentGold,
        secondaryColor: theme.primaryColor,
      });
    }

    return layers;
  }

  // Storybook Builder: Generates full wedding album (10, 20, 30 spreads)
  public static generateFullAlbum(params: {
    spreadCount: 10 | 20 | 30;
    style: WeddingStyle;
    albumTitle?: string;
  }): AlbumSpread[] {
    const { spreadCount, style } = params;

    // Sequence of Indian wedding events
    const sequence10: WeddingEvent[] = [
      "Haldi",
      "Mehendi",
      "Sangeet",
      "Wedding",
      "Pheras",
      "Reception",
      "Couple Portraits",
      "Family",
      "Bride",
      "Final Page",
    ];

    const sequence20: WeddingEvent[] = [
      "Pre-Wedding",
      "Pre-Wedding",
      "Haldi",
      "Haldi",
      "Mehendi",
      "Mehendi",
      "Sangeet",
      "Sangeet",
      "Wedding",
      "Wedding",
      "Pheras",
      "Pheras",
      "Reception",
      "Reception",
      "Couple Portraits",
      "Couple Portraits",
      "Bride",
      "Groom",
      "Family",
      "Final Page",
    ];

    const sequence30: WeddingEvent[] = [
      "Pre-Wedding",
      "Pre-Wedding",
      "Pre-Wedding",
      "Haldi",
      "Haldi",
      "Haldi",
      "Mehendi",
      "Mehendi",
      "Mehendi",
      "Sangeet",
      "Sangeet",
      "Sangeet",
      "Wedding",
      "Wedding",
      "Wedding",
      "Pheras",
      "Pheras",
      "Pheras",
      "Reception",
      "Reception",
      "Reception",
      "Couple Portraits",
      "Couple Portraits",
      "Couple Portraits",
      "Bride",
      "Bride",
      "Groom",
      "Groom",
      "Family",
      "Final Page",
    ];

    let events: WeddingEvent[] = sequence10;
    if (spreadCount === 20) events = sequence20;
    if (spreadCount === 30) events = sequence30;

    const spreads: AlbumSpread[] = [];
    const baseSeed = this.getNextSeed();

    events.forEach((event, idx) => {
      // Ensure variation in photo counts and archetypes while retaining style consistency!
      const photoCounts = [1, 2, 3, 4, 5, 6, 8];
      const count = photoCounts[(idx * 3 + 2) % photoCounts.length];

      const spread = this.generateSpread({
        spreadNumber: idx + 1,
        event,
        style,
        photoCount: count,
        seed: baseSeed + idx * 79,
      });
      spreads.push(spread);
    });

    return spreads;
  }
}
