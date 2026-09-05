import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Lazy Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    service: "Album Design Studio Backend",
  });
});

// Analyze reference sheet
app.post("/api/ai/analyze-reference", async (req, res) => {
  try {
    const { imageBase64, mimeType = "image/jpeg" } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: "Missing imageBase64 in request body" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback heuristics when API key is missing
      return res.json({
        success: true,
        source: "local-heuristic",
        analysis: {
          mood: "Royal & Traditional Luxury",
          dominantPalette: ["#1B120C", "#D4AF37", "#800020", "#FFF8DC"],
          compositionAdvice: "Hero portrait on left spread with balanced 3-photo grid on right. Gold jharokha trim.",
          suggestedStyle: "Royal Indian Wedding",
          suggestedEvent: "Wedding",
          recommendedMotif: "mandala",
          recommendedBorder: "royal-gold",
          density: "medium",
          typographyStyle: "Serif & Elegant Script",
        },
      });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const prompt = `You are a master art director for luxury Indian wedding album design studios.
Analyze this Indian wedding album reference image strictly for abstract design principles:
1. Overall professional design language
2. Visual hierarchy & composition structure
3. Recommended color relationships (hex codes)
4. Decorative density (minimal, subtle, medium, ornate, royal)
5. Typography style pairing (e.g. Traditional Serif + Calligraphic, Modern Editorial)
6. Recommended Indian wedding event and style match

DO NOT reproduce, trace or copy any personal details or faces.
Return a JSON object with this exact structure:
{
  "mood": string,
  "suggestedStyle": string (choose from: "Royal Indian Wedding", "Luxury Wedding", "Traditional Wedding", "Modern Wedding", "Minimal Wedding", "Floral Wedding", "Cinematic Wedding", "Maroon & Cream", "Rajasthani Royal", "South Indian", "Haldi", "Mehendi", "Sangeet", "Reception"),
  "suggestedEvent": string (choose from: "Wedding", "Reception", "Sangeet", "Mehendi", "Haldi", "Pre-Wedding", "Couple Portraits"),
  "dominantPalette": [string, string, string, string] (4 hex colors),
  "density": "minimal" | "subtle" | "medium" | "ornate" | "royal",
  "recommendedBorder": "royal-gold" | "ornate" | "floral" | "jharokha" | "minimal-line" | "palace",
  "recommendedMotif": "mandala" | "peacock" | "lotus" | "paisley" | "kalash" | "elephant",
  "typographyStyle": string,
  "compositionAdvice": string
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: cleanBase64,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);

    return res.json({
      success: true,
      source: "gemini-ai",
      analysis: parsed,
    });
  } catch (error: any) {
    console.error("Reference analysis error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to analyze reference image",
      fallback: {
        mood: "Timeless Indian Luxury",
        suggestedStyle: "Royal Indian Wedding",
        suggestedEvent: "Wedding",
        dominantPalette: ["#3B0B14", "#C5A059", "#FBF7ED", "#7D1128"],
        density: "medium",
        recommendedBorder: "royal-gold",
        recommendedMotif: "mandala",
        typographyStyle: "Playfair Display & Great Vibes",
        compositionAdvice: "Double-page spread with central crease awareness, cinematic hero frame and supporting editorial portraits.",
      },
    });
  }
});

// AI Layout Enhancer / Generator
app.post("/api/ai/generate-story-concept", async (req, res) => {
  try {
    const { event, style, photoCount, pageTitle } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        success: true,
        source: "local-heuristic",
        concept: {
          title: pageTitle || `${event || "Royal"} Celebrations`,
          subtitle: "Moments etched in eternity",
          quote: "Two souls, one sacred journey under the stars.",
          recommendedLayoutType: "central-hero",
          frameStyle: "royal-gold-filigree",
        },
      });
    }

    const prompt = `You are a luxury Indian wedding album creative director.
Generate editorial copy and aesthetic guidance for an album spread with:
- Event: "${event || "Wedding"}"
- Style: "${style || "Royal Indian Wedding"}"
- Photo Count: ${photoCount || 3}
- Suggested Title: "${pageTitle || ""}"

Respond strictly with a JSON object:
{
  "title": string (an elegant, poetic, or Sanskrit/English heading suited for Indian weddings, e.g. "Anand Karaj", "The Golden Hour", "Saat Phere", "Mehendi Hai Rachne Wali", "The Royal Vows"),
  "subtitle": string (brief graceful caption),
  "quote": string (short 1-sentence poetic wedding blessing or romantic phrase),
  "recommendedLayoutType": "central-hero" | "asymmetric-editorial" | "cinematic-strip" | "overlapping-stack" | "royal-grid" | "magazine-spread",
  "frameStyle": string,
  "creativeTip": string
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, source: "gemini-ai", concept: parsed });
  } catch (error: any) {
    console.error("Story concept error:", error);
    return res.json({
      success: true,
      source: "local-fallback",
      concept: {
        title: "Subh Vivah",
        subtitle: "A Union Blessed by Tradition",
        quote: "Hand in hand, heart to heart, an eternal journey begins.",
        recommendedLayoutType: "central-hero",
        frameStyle: "royal-gold",
      },
    });
  }
});

// Setup Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Album Design Studio server running on http://localhost:${PORT}`);
  });
}

startServer();
