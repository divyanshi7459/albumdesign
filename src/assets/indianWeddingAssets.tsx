import React from "react";
import { MotifType, FloralType, LuxuryAccentType, BorderPreset, WeddingStyle, WeddingEvent } from "../types/album";

// Style Palettes for Indian Weddings
export interface StyleTheme {
  name: WeddingStyle;
  primaryColor: string;
  secondaryColor: string;
  accentGold: string;
  backgroundColor: string;
  backgroundSecondary: string;
  textColor: string;
  fontPrimary: string;
  fontSecondary: string;
  defaultBorder: BorderPreset;
  defaultMotif: MotifType;
  description: string;
}

export const STYLE_THEMES: Record<WeddingStyle, StyleTheme> = {
  "Royal Indian Wedding": {
    name: "Royal Indian Wedding",
    primaryColor: "#58111A", // Deep Crimson Maroon
    secondaryColor: "#1B2A47", // Royal Indigo
    accentGold: "#D4AF37", // Regal 24K Gold
    backgroundColor: "#FAF6EE", // Raw Silk Ivory
    backgroundSecondary: "#2A080C",
    textColor: "#2B1810",
    fontPrimary: "Cinzel",
    fontSecondary: "Playfair Display",
    defaultBorder: "royal-gold",
    defaultMotif: "mandala",
    description: "Opulent regal aesthetic inspired by Rajasthan palaces with 24k gold filigree.",
  },
  "Luxury Wedding": {
    name: "Luxury Wedding",
    primaryColor: "#1A1A1A",
    secondaryColor: "#C5A059",
    accentGold: "#E5C158",
    backgroundColor: "#FDFBF7",
    backgroundSecondary: "#141414",
    textColor: "#1F1F1F",
    fontPrimary: "Cormorant Garamond",
    fontSecondary: "Great Vibes",
    defaultBorder: "double-line",
    defaultMotif: "lotus",
    description: "Understated editorial luxury with generous negative space and champagne accents.",
  },
  "Traditional Wedding": {
    name: "Traditional Wedding",
    primaryColor: "#8B0000",
    secondaryColor: "#D4AF37",
    accentGold: "#F3C053",
    backgroundColor: "#FFFDF5",
    backgroundSecondary: "#4A0000",
    textColor: "#3A1010",
    fontPrimary: "Playfair Display",
    fontSecondary: "Great Vibes",
    defaultBorder: "ornate-filigree",
    defaultMotif: "kalash",
    description: "Vedic traditions with auspicious vermillion, turmeric and sacred motifs.",
  },
  "Modern Wedding": {
    name: "Modern Wedding",
    primaryColor: "#2C3E50",
    secondaryColor: "#7F8C8D",
    accentGold: "#D4AF37",
    backgroundColor: "#F8F9FA",
    backgroundSecondary: "#1E272E",
    textColor: "#2D3436",
    fontPrimary: "Plus Jakarta Sans",
    fontSecondary: "Playfair Display",
    defaultBorder: "minimal-line",
    defaultMotif: "floral-jaali",
    description: "Sleek contemporary layout with crisp typography and clean geometric dividers.",
  },
  "Minimal Wedding": {
    name: "Minimal Wedding",
    primaryColor: "#333333",
    secondaryColor: "#888888",
    accentGold: "#C5A059",
    backgroundColor: "#FFFFFF",
    backgroundSecondary: "#F5F5F5",
    textColor: "#222222",
    fontPrimary: "Plus Jakarta Sans",
    fontSecondary: "Cormorant Garamond",
    defaultBorder: "minimal-line",
    defaultMotif: "lotus",
    description: "Vast white space, fine hairlines, and quiet elegance highlighting emotional moments.",
  },
  "Floral Wedding": {
    name: "Floral Wedding",
    primaryColor: "#9C4153",
    secondaryColor: "#5B7065",
    accentGold: "#D8B26E",
    backgroundColor: "#FDF9F7",
    backgroundSecondary: "#381E24",
    textColor: "#3D2B2E",
    fontPrimary: "Playfair Display",
    fontSecondary: "Great Vibes",
    defaultBorder: "floral-vine",
    defaultMotif: "lotus",
    description: "Botanical elegance with hand-drawn rose clusters, jasmine garlands and soft tones.",
  },
  "Cinematic Wedding": {
    name: "Cinematic Wedding",
    primaryColor: "#0E1118",
    secondaryColor: "#232B3E",
    accentGold: "#E0B767",
    backgroundColor: "#121620",
    backgroundSecondary: "#080A0F",
    textColor: "#EDECE8",
    fontPrimary: "Cinzel",
    fontSecondary: "Cormorant Garamond",
    defaultBorder: "double-line",
    defaultMotif: "peacock",
    description: "Deep dramatic widescreen atmosphere inspired by grand cinematic film stills.",
  },
  "Black & Gold": {
    name: "Black & Gold",
    primaryColor: "#111111",
    secondaryColor: "#222222",
    accentGold: "#D4AF37",
    backgroundColor: "#0A0A0A",
    backgroundSecondary: "#1F1C18",
    textColor: "#EFE8DC",
    fontPrimary: "Cinzel",
    fontSecondary: "Great Vibes",
    defaultBorder: "royal-gold",
    defaultMotif: "mandala",
    description: "High-contrast luxury with rich obsidian canvas and shimmering metallic 24K gold.",
  },
  "Red & Gold": {
    name: "Red & Gold",
    primaryColor: "#800000",
    secondaryColor: "#A71930",
    accentGold: "#E5B842",
    backgroundColor: "#FFF9F0",
    backgroundSecondary: "#450009",
    textColor: "#3B0A11",
    fontPrimary: "Cinzel",
    fontSecondary: "Playfair Display",
    defaultBorder: "ornate-filigree",
    defaultMotif: "paisley",
    description: "The quintessential Indian bridal harmony of sindoor red and ceremonial gold.",
  },
  "Maroon & Cream": {
    name: "Maroon & Cream",
    primaryColor: "#4B0F1A",
    secondaryColor: "#701C2B",
    accentGold: "#C99E52",
    backgroundColor: "#FDF6EA",
    backgroundSecondary: "#300810",
    textColor: "#331218",
    fontPrimary: "Playfair Display",
    fontSecondary: "Cormorant Garamond",
    defaultBorder: "royal-gold",
    defaultMotif: "mandala",
    description: "Classic aristocratic palette with warm Kashmiri cream silk and antique maroon.",
  },
  "Pastel": {
    name: "Pastel",
    primaryColor: "#7E6B7A",
    secondaryColor: "#A38F9E",
    accentGold: "#D4B07B",
    backgroundColor: "#FAF7F5",
    backgroundSecondary: "#F0E9E6",
    textColor: "#453841",
    fontPrimary: "Cormorant Garamond",
    fontSecondary: "Great Vibes",
    defaultBorder: "floral-vine",
    defaultMotif: "lotus",
    description: "Soft blush pinks, dusty rose, sage green and champagne accents.",
  },
  "Rajasthani Royal": {
    name: "Rajasthani Royal",
    primaryColor: "#6B1D28",
    secondaryColor: "#1B3B48",
    accentGold: "#E2B755",
    backgroundColor: "#FCF6E9",
    backgroundSecondary: "#380D15",
    textColor: "#2B1519",
    fontPrimary: "Cinzel",
    fontSecondary: "Playfair Display",
    defaultBorder: "jharokha-frame",
    defaultMotif: "rajasthani-corner",
    description: "Udaipur & Jaipur palace heritage with scalloped jharokhas and royal elephant emblems.",
  },
  "Punjabi": {
    name: "Punjabi",
    primaryColor: "#931B2A",
    secondaryColor: "#D97724",
    accentGold: "#F5BF38",
    backgroundColor: "#FFFDF7",
    backgroundSecondary: "#450C14",
    textColor: "#381016",
    fontPrimary: "Cinzel",
    fontSecondary: "Playfair Display",
    defaultBorder: "ornate-filigree",
    defaultMotif: "punjabi-ornament",
    description: "Vibrant celebratory spirit with phulkari-inspired geometry and festive warmth.",
  },
  "South Indian": {
    name: "South Indian",
    primaryColor: "#5C1322",
    secondaryColor: "#1E3B2B",
    accentGold: "#E0A926",
    backgroundColor: "#FFFBF2",
    backgroundSecondary: "#360A13",
    textColor: "#2B161B",
    fontPrimary: "Playfair Display",
    fontSecondary: "Cormorant Garamond",
    defaultBorder: "palace-arch",
    defaultMotif: "south-temple",
    description: "Kanjeevaram gold zari motifs, temple gopuram silhouettes and pure jasmine accents.",
  },
  "Engagement": {
    name: "Engagement",
    primaryColor: "#324B66",
    secondaryColor: "#7D94B0",
    accentGold: "#CCA862",
    backgroundColor: "#F9FAFC",
    backgroundSecondary: "#1E2E40",
    textColor: "#1F2C3A",
    fontPrimary: "Cormorant Garamond",
    fontSecondary: "Great Vibes",
    defaultBorder: "double-line",
    defaultMotif: "peacock",
    description: "Romantic sapphire and rose champagne celebrating the eternal commitment.",
  },
  "Haldi": {
    name: "Haldi",
    primaryColor: "#B57600",
    secondaryColor: "#804A00",
    accentGold: "#F4B41A",
    backgroundColor: "#FFFDF0",
    backgroundSecondary: "#F5E296",
    textColor: "#422800",
    fontPrimary: "Playfair Display",
    fontSecondary: "Great Vibes",
    defaultBorder: "floral-vine",
    defaultMotif: "diya",
    description: "Bright auspicious marigold yellows, turmeric warmth and organic joy.",
  },
  "Mehendi": {
    name: "Mehendi",
    primaryColor: "#1E4B35",
    secondaryColor: "#3B6E52",
    accentGold: "#CFAD58",
    backgroundColor: "#F7FAF8",
    backgroundSecondary: "#123022",
    textColor: "#122A1E",
    fontPrimary: "Playfair Display",
    fontSecondary: "Great Vibes",
    defaultBorder: "geometric-jaali",
    defaultMotif: "paisley",
    description: "Deep henna greens, intricate Arabic & Indian buta patterns, and festive sparkle.",
  },
  "Sangeet": {
    name: "Sangeet",
    primaryColor: "#1D1035",
    secondaryColor: "#421869",
    accentGold: "#E5B842",
    backgroundColor: "#160C26",
    backgroundSecondary: "#0A0512",
    textColor: "#F3EEFB",
    fontPrimary: "Cinzel",
    fontSecondary: "Great Vibes",
    defaultBorder: "royal-gold",
    defaultMotif: "peacock",
    description: "Electric royal violet, disco sparkle, and dramatic musical celebration.",
  },
  "Reception": {
    name: "Reception",
    primaryColor: "#171B26",
    secondaryColor: "#333A4D",
    accentGold: "#D6AF57",
    backgroundColor: "#F8F9FA",
    backgroundSecondary: "#12151E",
    textColor: "#1E222D",
    fontPrimary: "Cinzel",
    fontSecondary: "Cormorant Garamond",
    defaultBorder: "double-line",
    defaultMotif: "mandala",
    description: "Black-tie evening glamour with refined typography and gold metallic highlights.",
  },
  "Pre-Wedding": {
    name: "Pre-Wedding",
    primaryColor: "#2F4858",
    secondaryColor: "#6B8E99",
    accentGold: "#CCA862",
    backgroundColor: "#FBFBFA",
    backgroundSecondary: "#1F2B33",
    textColor: "#28343C",
    fontPrimary: "Cormorant Garamond",
    fontSecondary: "Playfair Display",
    defaultBorder: "minimal-line",
    defaultMotif: "lotus",
    description: "Editorial destination photography layout with breezy negative space.",
  },
};

// SVG Vector Graphics for Indian Wedding Motifs
export const MOTIF_SVGS: Record<MotifType, { name: string; viewBox: string; render: (color: string, sec?: string) => React.ReactNode }> = {
  mandala: {
    name: "Sacred Mandala",
    viewBox: "0 0 200 200",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="100" cy="100" r="92" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="82" strokeWidth="1" />
        <circle cx="100" cy="100" r="62" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="38" stroke={sec} strokeWidth="1.5" />
        <circle cx="100" cy="100" r="14" fill={sec} opacity="0.4" />
        <circle cx="100" cy="100" r="4" fill={color} />
        {/* 12 Petal Rosette */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <path d="M100,38 C90,60 90,75 100,86 C110,75 110,60 100,38 Z" fill={color} fillOpacity="0.12" />
            <path d="M100,18 C85,45 88,70 100,82 C112,70 115,45 100,18 Z" stroke={sec} strokeWidth="1" />
            <circle cx="100" cy="18" r="2.5" fill={sec} />
            <path d="M100,8 C94,14 106,14 100,8 Z" fill={color} />
          </g>
        ))}
      </g>
    ),
  },

  peacock: {
    name: "Royal Peacock (Mayur)",
    viewBox: "0 0 200 200",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Body & Head */}
        <path d="M90,75 C85,60 95,45 105,42 C115,40 120,48 116,58 C112,68 98,85 102,110 C106,130 120,145 140,155 C120,165 95,160 85,145 C75,130 78,110 84,95 Z" fill={color} fillOpacity="0.15" />
        {/* Beak & Eye */}
        <path d="M115,44 L128,46 L118,52" fill={sec} />
        <circle cx="110" cy="47" r="2" fill={sec} />
        {/* Royal Crest Feathers */}
        <path d="M108,40 Q112,25 118,22 M106,40 Q106,24 108,20 M104,41 Q98,26 95,24" stroke={sec} strokeWidth="1.4" />
        <circle cx="118" cy="22" r="2.5" fill={sec} />
        <circle cx="108" cy="20" r="2.5" fill={sec} />
        <circle cx="95" cy="24" r="2.5" fill={sec} />
        {/* Peacock Tail Feathers Plume */}
        <path d="M85,110 C60,105 35,120 28,148 C45,140 65,145 80,150" stroke={sec} strokeWidth="1.5" />
        <path d="M80,120 C50,125 30,150 35,175 C55,160 75,162 90,160" stroke={color} strokeWidth="1.5" />
        <path d="M86,135 C65,148 55,170 65,188 C80,175 95,170 102,162" stroke={sec} strokeWidth="1.5" />
        {/* Feather Eyes */}
        <circle cx="32" cy="142" r="6" stroke={sec} fill={color} fillOpacity="0.2" />
        <circle cx="32" cy="142" r="2.5" fill={sec} />
        <circle cx="42" cy="168" r="6" stroke={sec} fill={color} fillOpacity="0.2" />
        <circle cx="42" cy="168" r="2.5" fill={sec} />
        <circle cx="70" cy="182" r="6" stroke={sec} fill={color} fillOpacity="0.2" />
        <circle cx="70" cy="182" r="2.5" fill={sec} />
      </g>
    ),
  },

  lotus: {
    name: "Indian Lotus (Kamal)",
    viewBox: "0 0 200 200",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Center Petal */}
        <path d="M100,30 C90,65 92,110 100,140 C108,110 110,65 100,30 Z" fill={color} fillOpacity="0.18" />
        {/* Inner Flanking Petals */}
        <path d="M100,50 C80,75 75,115 95,142 C92,120 95,85 100,50 Z" stroke={sec} fill={sec} fillOpacity="0.12" />
        <path d="M100,50 C120,75 125,115 105,142 C108,120 105,85 100,50 Z" stroke={sec} fill={sec} fillOpacity="0.12" />
        {/* Outer Wide Petals */}
        <path d="M95,75 C60,95 55,130 85,146 C80,125 85,100 95,75 Z" />
        <path d="M105,75 C140,95 145,130 115,146 C120,125 115,100 105,75 Z" />
        {/* Spreading Base Leaves */}
        <path d="M85,138 C45,140 35,160 65,168 C80,165 92,152 98,145 Z" stroke={sec} />
        <path d="M115,138 C155,140 165,160 135,168 C120,165 108,152 102,145 Z" stroke={sec} />
        {/* Base Pod / Water Ripple */}
        <path d="M70,168 Q100,180 130,168 Q100,160 70,168 Z" fill={color} fillOpacity="0.25" />
        <circle cx="100" cy="148" r="3" fill={sec} />
      </g>
    ),
  },

  paisley: {
    name: "Ornate Paisley (Kalka)",
    viewBox: "0 0 200 200",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Main Kalka Contour */}
        <path d="M95,175 C55,175 35,140 38,105 C42,70 70,45 92,25 C98,20 108,15 112,22 C116,30 105,42 98,52 C85,72 82,95 95,115 C105,130 128,135 142,120 C155,108 152,90 142,80 C135,74 136,65 144,68 C158,75 168,95 165,120 C160,155 135,175 95,175 Z" fill={color} fillOpacity="0.1" />
        {/* Inner Filigree Core */}
        <path d="M92,150 C70,150 58,130 60,108 C62,85 80,68 95,55" stroke={sec} strokeWidth="1.3" />
        <circle cx="95" cy="115" r="14" stroke={sec} />
        <circle cx="95" cy="115" r="5" fill={sec} />
        {/* Radiating Decorative Dots */}
        {[30, 60, 90, 120, 150, 180, 210, 240, 270, 300].map((deg, i) => (
          <circle
            key={i}
            cx={95 + 22 * Math.cos((deg * Math.PI) / 180)}
            cy={115 + 22 * Math.sin((deg * Math.PI) / 180)}
            r="1.8"
            fill={color}
          />
        ))}
        {/* Feathered crest tip */}
        <path d="M110,22 Q130,18 140,28 Q132,38 120,32" stroke={sec} strokeWidth="1.2" />
      </g>
    ),
  },

  kalash: {
    name: "Mangal Kalash",
    viewBox: "0 0 200 200",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Coconut at Top */}
        <ellipse cx="100" cy="55" rx="18" ry="24" fill={color} fillOpacity="0.2" />
        <path d="M100,31 L100,20 M96,33 L90,24 M104,33 L110,24" stroke={sec} strokeWidth="1.5" />
        {/* Mango Leaves */}
        <path d="M85,75 C70,65 55,70 50,60 C65,58 78,65 88,72" fill={sec} fillOpacity="0.2" stroke={sec} />
        <path d="M115,75 C130,65 145,70 150,60 C135,58 122,65 112,72" fill={sec} fillOpacity="0.2" stroke={sec} />
        <path d="M92,72 C80,55 75,45 80,35 C88,48 94,60 96,70" stroke={sec} />
        <path d="M108,72 C120,55 125,45 120,35 C112,48 106,60 104,70" stroke={sec} />
        {/* Kalash Pot Rim & Body */}
        <rect x="75" y="74" width="50" height="10" rx="3" fill={sec} stroke={sec} />
        <path d="M78,84 C60,105 55,145 75,165 C85,172 115,172 125,165 C145,145 140,105 122,84 Z" fill={color} fillOpacity="0.14" />
        {/* Swastika / Sacred Mark on Pot */}
        <path d="M100,112 L100,138 M87,125 L113,125 M100,112 L110,112 M113,125 L113,135 M100,138 L90,138 M87,125 L87,115" stroke={sec} strokeWidth="1.8" />
        {/* Base */}
        <rect x="78" y="166" width="44" height="8" rx="2" fill={sec} />
      </g>
    ),
  },

  diya: {
    name: "Auspicious Diya",
    viewBox: "0 0 200 200",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Glowing Flame */}
        <path d="M100,35 C108,55 118,70 100,90 C82,70 92,55 100,35 Z" fill={sec} stroke={sec} strokeWidth="1.8" />
        <path d="M100,52 C104,65 108,75 100,85 C92,75 96,65 100,52 Z" fill="#FFF2B2" stroke="#FFF2B2" />
        {/* Diya Clay / Brass Vessel */}
        <path d="M50,92 C70,95 100,96 150,92 C158,110 148,135 125,145 C110,150 90,150 75,145 C52,135 42,110 50,92 Z" fill={color} fillOpacity="0.2" />
        {/* Ornate Rim Carving */}
        <path d="M48,92 Q100,102 152,92" stroke={sec} strokeWidth="2" />
        {/* Stand / Pedestal */}
        <path d="M92,148 L90,165 L70,175 L130,175 L110,165 L108,148" fill={sec} fillOpacity="0.3" stroke={sec} />
        {/* Radiating Light Aura */}
        {[0, 30, 60, 120, 150, 180].map((deg, i) => (
          <line
            key={i}
            x1={100 + 40 * Math.cos((deg * Math.PI) / 180 - Math.PI / 2)}
            y1={65 + 40 * Math.sin((deg * Math.PI) / 180 - Math.PI / 2)}
            x2={100 + 52 * Math.cos((deg * Math.PI) / 180 - Math.PI / 2)}
            y2={65 + 52 * Math.sin((deg * Math.PI) / 180 - Math.PI / 2)}
            stroke={sec}
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
        ))}
      </g>
    ),
  },

  elephant: {
    name: "Royal Ambari Elephant",
    viewBox: "0 0 200 200",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Elephant Silhouette */}
        <path d="M140,160 L140,135 C145,130 152,115 150,95 C146,75 130,60 105,58 C85,57 70,70 65,85 C60,95 62,115 55,130 C48,145 35,145 30,135 C28,130 32,125 36,128 C40,132 46,128 48,118 C52,98 55,80 75,68 C90,60 115,58 135,70 C155,82 158,105 155,125 L158,160 M90,160 L92,130 M115,160 L114,130" fill={color} fillOpacity="0.12" />
        {/* Tusk */}
        <path d="M48,118 C40,118 35,110 40,105 C48,108 55,115 54,118 Z" fill="#FFF8DC" stroke={sec} />
        {/* Ornate Howdah / Saddle Jhool */}
        <path d="M80,75 C95,70 120,70 135,75 L132,115 C118,122 98,122 82,115 Z" fill={sec} fillOpacity="0.25" stroke={sec} strokeWidth="1.5" />
        <circle cx="108" cy="95" r="8" stroke={color} fill={color} fillOpacity="0.4" />
        {/* Head Gear / Mukut */}
        <path d="M72,68 Q85,50 95,62" stroke={sec} strokeWidth="2" />
        <circle cx="85" cy="58" r="3" fill={sec} />
      </g>
    ),
  },

  "floral-jaali": {
    name: "Mughal Lattice Jaali",
    viewBox: "0 0 200 200",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.4">
        <rect x="15" y="15" width="170" height="170" rx="6" stroke={sec} strokeWidth="2" />
        {/* Interlocking 8-point stars */}
        <path d="M100,40 L115,65 L145,65 L125,85 L135,115 L100,95 L65,115 L75,85 L55,65 L85,65 Z" fill={color} fillOpacity="0.1" />
        <path d="M100,105 L115,130 L145,130 L125,150 L135,180 L100,160 L65,180 L75,150 L55,130 L85,130 Z" fill={color} fillOpacity="0.1" />
        <circle cx="100" cy="100" r="12" stroke={sec} strokeWidth="1.5" />
        <circle cx="100" cy="100" r="4" fill={sec} />
      </g>
    ),
  },

  "rajasthani-corner": {
    name: "Rajasthani Corner Arch",
    viewBox: "0 0 200 200",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
        <path d="M10,10 L190,10 L190,40 C140,40 120,60 120,110 L120,190 L90,190 C90,130 60,90 10,90 Z" fill={color} fillOpacity="0.08" />
        {/* Scalloped Cusps */}
        <path d="M10,90 C30,90 40,75 50,60 C65,40 85,30 110,30 L190,30" stroke={sec} strokeWidth="1.5" />
        <circle cx="65" cy="65" r="8" stroke={sec} fill={sec} fillOpacity="0.3" />
        <circle cx="65" cy="65" r="3" fill={color} />
        {/* Small Petal Accents */}
        <path d="M25,25 Q35,15 45,25 Q35,35 25,25 Z" fill={sec} />
      </g>
    ),
  },

  "south-temple": {
    name: "Temple Gopuram Crest",
    viewBox: "0 0 200 200",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Gopuram Kalasam Tiers */}
        <path d="M100,20 L100,35 M90,35 L110,35 M82,50 L118,50 M75,70 L125,70 M65,95 L135,95 M55,125 L145,125 M45,160 L155,160" stroke={sec} strokeWidth="2" />
        {/* Stepped Temple Silhouette */}
        <path d="M100,22 L112,50 L122,70 L130,95 L142,125 L152,160 L48,160 L58,125 L70,95 L78,70 L88,50 Z" fill={color} fillOpacity="0.12" />
        <circle cx="100" cy="20" r="4" fill={sec} />
        {/* Sacred Nandi / Floral Medallion */}
        <circle cx="100" cy="115" r="14" stroke={sec} fill={sec} fillOpacity="0.2" />
        <circle cx="100" cy="115" r="5" fill={color} />
      </g>
    ),
  },

  "punjabi-ornament": {
    name: "Phulkari Motif",
    viewBox: "0 0 200 200",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Diamond Geometric Phulkari Star */}
        <polygon points="100,25 125,75 175,100 125,125 100,175 75,125 25,100 75,75" fill={color} fillOpacity="0.15" stroke={sec} strokeWidth="2" />
        <polygon points="100,55 115,85 145,100 115,115 100,145 85,115 55,100 85,85" stroke={color} strokeWidth="1.4" />
        <circle cx="100" cy="100" r="10" fill={sec} />
        <circle cx="100" cy="100" r="4" fill="#FFFFFF" />
      </g>
    ),
  },
};

// Floral SVG renderers
export const FLORAL_SVGS: Record<FloralType, { name: string; viewBox: string; render: (color: string, sec?: string) => React.ReactNode }> = {
  "rose-corner": {
    name: "Regal Rose Corner",
    viewBox: "0 0 160 160",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
        <path d="M40,40 C35,25 50,15 65,22 C80,15 95,25 90,40 C105,48 102,68 90,75 C95,90 80,100 65,95 C50,102 38,88 42,75 C30,65 30,48 40,40 Z" fill={color} fillOpacity="0.25" />
        <circle cx="65" cy="58" r="8" stroke={sec} strokeWidth="2" />
        {/* Sprawling Leaves */}
        <path d="M85,40 Q120,30 135,15 Q125,45 95,50" fill={sec} fillOpacity="0.3" stroke={sec} />
        <path d="M45,75 Q30,110 15,125 Q45,115 50,85" fill={sec} fillOpacity="0.3" stroke={sec} />
      </g>
    ),
  },
  "lotus-cluster": {
    name: "Sacred Lotus Bouquet",
    viewBox: "0 0 160 160",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.4">
        <path d="M80,30 C70,55 72,90 80,110 C88,90 90,55 80,30 Z" fill={color} fillOpacity="0.3" />
        <path d="M80,50 C60,70 58,100 78,115" stroke={sec} />
        <path d="M80,50 C100,70 102,100 82,115" stroke={sec} />
        <circle cx="80" cy="115" r="4" fill={sec} />
      </g>
    ),
  },
  "jasmine-garland": {
    name: "Jasmine Mogra Garland",
    viewBox: "0 0 160 80",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.2">
        <path d="M10,40 Q80,75 150,40" stroke={sec} strokeWidth="2" strokeDasharray="4 4" />
        {[25, 50, 75, 100, 125].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${42 + Math.sin(i) * 5})`}>
            <circle cx="0" cy="0" r="6" fill="#FFFDF0" stroke={color} />
            <circle cx="0" cy="0" r="2" fill={sec} />
          </g>
        ))}
      </g>
    ),
  },
  "marigold-accent": {
    name: "Festive Genda (Marigold)",
    viewBox: "0 0 120 120",
    render: (color, sec = "#F5B014") => (
      <g fill="none" stroke={color} strokeWidth="1.4">
        <circle cx="60" cy="60" r="45" fill={sec} fillOpacity="0.4" stroke={sec} strokeWidth="2" />
        <circle cx="60" cy="60" r="30" stroke={color} strokeDasharray="3 3" />
        <circle cx="60" cy="60" r="15" fill={sec} />
        <circle cx="60" cy="60" r="5" fill={color} />
      </g>
    ),
  },
  "vine-border": {
    name: "Flowing Flora Vine",
    viewBox: "0 0 200 60",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.5">
        <path d="M10,30 Q60,10 100,30 T190,30" stroke={sec} strokeWidth="2" />
        <path d="M50,22 Q55,10 65,15 Q60,25 50,22 Z" fill={color} fillOpacity="0.4" />
        <path d="M140,22 Q145,10 155,15 Q150,25 140,22 Z" fill={color} fillOpacity="0.4" />
        <circle cx="100" cy="30" r="4" fill={sec} />
      </g>
    ),
  },
  "floral-bouquet": {
    name: "Bridal Flower Cascade",
    viewBox: "0 0 160 160",
    render: (color, sec = "#E5B842") => (
      <g fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="80" cy="70" r="28" fill={color} fillOpacity="0.2" stroke={sec} />
        <circle cx="58" cy="90" r="18" fill={sec} fillOpacity="0.25" />
        <circle cx="102" cy="90" r="18" fill={sec} fillOpacity="0.25" />
        <path d="M80,98 L80,140 M70,115 L60,130 M90,115 L100,130" stroke={sec} strokeWidth="2" />
      </g>
    ),
  },
};

// Luxury Vector Accents
export const LUXURY_ACCENT_SVGS: Record<LuxuryAccentType, { name: string; viewBox: string; render: (color: string) => React.ReactNode }> = {
  "gold-foil-splash": {
    name: "24K Gold Foil Accent",
    viewBox: "0 0 200 100",
    render: (color) => (
      <g fill={color} opacity="0.85">
        <circle cx="100" cy="50" r="8" />
        <circle cx="120" cy="42" r="4.5" />
        <circle cx="78" cy="56" r="5" />
        <circle cx="140" cy="48" r="3" />
        <circle cx="58" cy="45" r="3.5" />
        <path d="M90,50 Q100,20 110,50 Q100,80 90,50 Z" />
      </g>
    ),
  },
  "ornamental-divider": {
    name: "Filigree Ribbon Divider",
    viewBox: "0 0 300 40",
    render: (color) => (
      <g fill="none" stroke={color} strokeWidth="1.6">
        <line x1="15" y1="20" x2="115" y2="20" />
        <line x1="185" y1="20" x2="285" y2="20" />
        <circle cx="150" cy="20" r="8" fill={color} fillOpacity="0.2" />
        <circle cx="150" cy="20" r="3" fill={color} />
        <path d="M125,20 Q137,10 150,20 Q163,30 175,20" />
      </g>
    ),
  },
  "mandap-pillar": {
    name: "Mandap Arch Column",
    viewBox: "0 0 80 300",
    render: (color) => (
      <g fill="none" stroke={color} strokeWidth="1.5">
        <rect x="25" y="40" width="30" height="220" />
        <line x1="35" y1="40" x2="35" y2="260" strokeDasharray="3 3" />
        <line x1="45" y1="40" x2="45" y2="260" strokeDasharray="3 3" />
        {/* Capital & Base */}
        <path d="M15,40 L65,40 L55,20 L25,20 Z" fill={color} fillOpacity="0.3" />
        <path d="M15,260 L65,260 L55,280 L25,280 Z" fill={color} fillOpacity="0.3" />
      </g>
    ),
  },
  "royal-crest": {
    name: "Royal Monogram Seal",
    viewBox: "0 0 160 160",
    render: (color) => (
      <g fill="none" stroke={color} strokeWidth="1.8">
        <circle cx="80" cy="80" r="68" strokeWidth="2.5" />
        <circle cx="80" cy="80" r="60" strokeDasharray="4 3" />
        <path d="M80,30 L92,52 L116,55 L98,72 L103,96 L80,84 L57,96 L62,72 L44,55 L68,52 Z" fill={color} fillOpacity="0.2" />
      </g>
    ),
  },
  "metallic-corner": {
    name: "Palace Corner Bracket",
    viewBox: "0 0 120 120",
    render: (color) => (
      <g fill="none" stroke={color} strokeWidth="2">
        <path d="M10,110 L10,10 L110,10" />
        <path d="M22,90 L22,22 L90,22" strokeWidth="1" />
        <circle cx="22" cy="22" r="5" fill={color} />
        <path d="M10,10 L35,35" strokeWidth="1.5" />
      </g>
    ),
  },
  "sparkle-glow": {
    name: "Festive Sparkle Cluster",
    viewBox: "0 0 100 100",
    render: (color) => (
      <g fill={color}>
        <path d="M50,15 Q50,45 20,50 Q50,55 50,85 Q50,55 80,50 Q50,45 50,15 Z" opacity="0.8" />
        <circle cx="75" cy="25" r="3" />
        <circle cx="25" cy="75" r="2.5" />
      </g>
    ),
  },
};
