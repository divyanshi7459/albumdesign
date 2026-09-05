import { AlbumSpread, AlbumLayer, PhotoPlaceholderLayer, TextLayer, MotifLayer, BorderLayer, BackgroundLayer } from "../types/album";
import { MOTIF_SVGS } from "../assets/indianWeddingAssets";

export class ExportService {
  /**
   * Export album spread to high-resolution PNG using an offscreen HTML5 Canvas
   * @param spread AlbumSpread object
   * @param targetDpi 72 (preview) or 300 (print-ready)
   * @param transparent Whether background layer should be omitted
   */
  public static async exportToPNG(
    spread: AlbumSpread,
    targetDpi: 72 | 150 | 300 = 300,
    transparent = false
  ): Promise<string> {
    const baseW = 2400;
    const baseH = 1200;
    const scale = targetDpi / 100; // 3x for 300 DPI -> 7200 x 3600 px

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(baseW * scale);
    canvas.height = Math.round(baseH * scale);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not create canvas 2D context for export");
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.scale(scale, scale);

    // Sort layers by z-index
    const sortedLayers = [...spread.layers].sort((a, b) => a.zIndex - b.zIndex);

    for (const layer of sortedLayers) {
      if (layer.isHidden) continue;

      ctx.save();
      ctx.globalAlpha = layer.opacity;

      // Handle translation and rotation
      const cx = layer.x + layer.width / 2;
      const cy = layer.y + layer.height / 2;
      ctx.translate(cx, cy);
      if (layer.rotation) {
        ctx.rotate((layer.rotation * Math.PI) / 180);
      }
      ctx.translate(-cx, -cy);

      if (layer.type === "background" && !transparent) {
        this.renderBackground(ctx, layer as BackgroundLayer);
      } else if (layer.type === "border") {
        this.renderBorder(ctx, layer as BorderLayer);
      } else if (layer.type === "photo-placeholder") {
        await this.renderPhotoPlaceholder(ctx, layer as PhotoPlaceholderLayer);
      } else if (layer.type === "text") {
        this.renderText(ctx, layer as TextLayer);
      } else if (layer.type === "motif") {
        await this.renderMotif(ctx, layer as MotifLayer);
      }

      ctx.restore();
    }

    return canvas.toDataURL("image/png");
  }

  private static renderBackground(ctx: CanvasRenderingContext2D, layer: BackgroundLayer) {
    if (layer.bgType === "gradient" && layer.color2) {
      const grad = ctx.createLinearGradient(layer.x, layer.y, layer.x + layer.width, layer.y + layer.height);
      grad.addColorStop(0, layer.color1);
      grad.addColorStop(1, layer.color2);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = layer.color1;
    }
    ctx.fillRect(layer.x, layer.y, layer.width, layer.height);
  }

  private static renderBorder(ctx: CanvasRenderingContext2D, layer: BorderLayer) {
    ctx.strokeStyle = layer.color;
    ctx.lineWidth = layer.strokeWidth;
    ctx.strokeRect(layer.x + layer.inset, layer.y + layer.inset, layer.width - layer.inset * 2, layer.height - layer.inset * 2);

    if (layer.borderPreset === "double-line" || layer.borderPreset === "royal-gold") {
      ctx.lineWidth = 1;
      ctx.strokeRect(
        layer.x + layer.inset + 10,
        layer.y + layer.inset + 10,
        layer.width - layer.inset * 2 - 20,
        layer.height - layer.inset * 2 - 20
      );
    }
  }

  private static async renderPhotoPlaceholder(ctx: CanvasRenderingContext2D, layer: PhotoPlaceholderLayer) {
    const { x, y, width, height, cornerRadius, borderColor, borderWidth, imageSrc, shape } = layer;

    // Draw clipping path
    ctx.beginPath();
    if (shape === "circle") {
      const r = Math.min(width, height) / 2;
      ctx.arc(x + width / 2, y + height / 2, r, 0, Math.PI * 2);
    } else if (shape === "arch-jharokha") {
      // Jharokha scalloped arch
      const r = width / 2;
      ctx.moveTo(x, y + height);
      ctx.lineTo(x, y + r);
      ctx.arc(x + r, y + r, r, Math.PI, 0, false);
      ctx.lineTo(x + width, y + height);
      ctx.closePath();
    } else {
      ctx.roundRect(x, y, width, height, cornerRadius || 0);
    }

    if (imageSrc) {
      ctx.save();
      ctx.clip();
      try {
        const img = await this.loadImage(imageSrc);
        ctx.drawImage(img, x, y, width, height);
      } catch (err) {
        console.error("Failed to render photo in placeholder", err);
      }
      ctx.restore();
    } else {
      // Empty placeholder: sophisticated outline without stock people
      ctx.fillStyle = "rgba(230, 220, 200, 0.18)";
      ctx.fill();
    }

    // Border
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.stroke();
  }

  private static renderText(ctx: CanvasRenderingContext2D, layer: TextLayer) {
    ctx.fillStyle = layer.color;
    const fontStyle = layer.fontStyle || "normal";
    ctx.font = `${fontStyle} ${layer.fontWeight || "400"} ${layer.fontSize}px "${layer.fontFamily}", serif`;
    ctx.textAlign = layer.textAlign || "center";
    ctx.textBaseline = "middle";

    let textX = layer.x;
    if (layer.textAlign === "center") {
      textX = layer.x + layer.width / 2;
    } else if (layer.textAlign === "right") {
      textX = layer.x + layer.width;
    }

    const textToPrint = layer.textTransform === "uppercase" ? layer.text.toUpperCase() : layer.text;
    ctx.fillText(textToPrint, textX, layer.y + layer.height / 2);
  }

  private static async renderMotif(ctx: CanvasRenderingContext2D, layer: MotifLayer) {
    // Generate SVG string from definition
    const motifDef = MOTIF_SVGS[layer.motifType];
    if (!motifDef) return;

    // Render simple vector box placeholder
    ctx.strokeStyle = layer.color;
    ctx.lineWidth = 2;
    ctx.strokeRect(layer.x, layer.y, layer.width, layer.height);
  }

  private static loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  /**
   * Export to Adobe Illustrator & Photoshop compatible vector SVG
   */
  public static exportToSVG(spread: AlbumSpread): string {
    const W = 2400;
    const H = 1200;

    let svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n`;
    svg += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">\n`;
    svg += `  <defs>\n`;
    svg += `    <style type="text/css">\n`;
    svg += `      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&amp;family=Playfair+Display:ital,wght@0,400;0,700;1,400&amp;family=Great+Vibes&amp;display=swap');\n`;
    svg += `      .spread-text { font-smooth: always; text-rendering: geometricPrecision; }\n`;
    svg += `    </style>\n`;
    svg += `  </defs>\n\n`;

    const sortedLayers = [...spread.layers].sort((a, b) => a.zIndex - b.zIndex);

    sortedLayers.forEach((layer) => {
      if (layer.isHidden) return;

      const transform = layer.rotation ? ` transform="rotate(${layer.rotation} ${layer.x + layer.width / 2} ${layer.y + layer.height / 2})"` : "";
      const opacity = layer.opacity < 1 ? ` opacity="${layer.opacity}"` : "";

      svg += `  <!-- Layer: ${layer.name} (${layer.type}) -->\n`;
      svg += `  <g id="${layer.id}"${transform}${opacity}>\n`;

      if (layer.type === "background") {
        const bg = layer as BackgroundLayer;
        svg += `    <rect x="${bg.x}" y="${bg.y}" width="${bg.width}" height="${bg.height}" fill="${bg.color1}" />\n`;
      } else if (layer.type === "border") {
        const b = layer as BorderLayer;
        svg += `    <rect x="${b.x + b.inset}" y="${b.y + b.inset}" width="${b.width - b.inset * 2}" height="${b.height - b.inset * 2}" fill="none" stroke="${b.color}" stroke-width="${b.strokeWidth}" />\n`;
      } else if (layer.type === "photo-placeholder") {
        const p = layer as PhotoPlaceholderLayer;
        svg += `    <rect x="${p.x}" y="${p.y}" width="${p.width}" height="${p.height}" rx="${p.cornerRadius || 0}" fill="rgba(240,230,210,0.15)" stroke="${p.borderColor}" stroke-width="${p.borderWidth}" stroke-dasharray="6,4" />\n`;
      } else if (layer.type === "text") {
        const t = layer as TextLayer;
        const anchor = t.textAlign === "center" ? "middle" : t.textAlign === "right" ? "end" : "start";
        const textX = t.textAlign === "center" ? t.x + t.width / 2 : t.textAlign === "right" ? t.x + t.width : t.x;
        svg += `    <text x="${textX}" y="${t.y + t.height / 2}" font-family="${t.fontFamily}" font-size="${t.fontSize}" font-weight="${t.fontWeight}" fill="${t.color}" text-anchor="${anchor}" dominant-baseline="central" class="spread-text">${t.text}</text>\n`;
      }

      svg += `  </g>\n\n`;
    });

    svg += `</svg>`;
    return svg;
  }

  /**
   * Export Layout JSON for Adobe Photoshop Scripts or Database Storage
   */
  public static exportToJSON(spread: AlbumSpread): string {
    const layoutExport = {
      format: "AlbumDesignStudio_LayoutJSON_v1",
      generator: "Album Design Studio Professional",
      dateCreated: new Date().toISOString(),
      canvas: {
        dimensions: {
          widthPx: 2400,
          heightPx: 1200,
          aspectRatio: "2:1",
          recommendedDpi: 300,
          physicalSpreadInch: "12 x 24 inches",
        },
        creaseSpineCenterPx: 1200,
        margins: {
          bleedPx: 50,
          safeAreaPx: 100,
        },
      },
      spreadMetadata: {
        id: spread.id,
        spreadNumber: spread.spreadNumber,
        title: spread.title,
        event: spread.event,
        style: spread.style,
        photoCount: spread.photoCount,
        layoutArchetype: spread.layoutArchetype,
        seed: spread.seed,
      },
      photoshopWorkflowInstructions: [
        "1. Create a 7200 x 3600 px document at 300 DPI (RGB or CMYK).",
        "2. Add vertical guide at center 3600 px for spine fold.",
        "3. Import each element geometry using coordinates mapped by factor 3x.",
        "4. Place photos inside the defined bounding box clipping masks.",
      ],
      elements: spread.layers.map((layer) => ({
        id: layer.id,
        name: layer.name,
        type: layer.type,
        geometry: {
          x: layer.x,
          y: layer.y,
          width: layer.width,
          height: layer.height,
          rotation: layer.rotation,
          zIndex: layer.zIndex,
        },
        style: {
          opacity: layer.opacity,
          isLocked: layer.isLocked,
          isHidden: layer.isHidden,
        },
        specificProperties: { ...layer },
      })),
    };

    return JSON.stringify(layoutExport, null, 2);
  }

  /**
   * Download helper
   */
  public static triggerDownload(content: string, filename: string, mimeType: string) {
    const blob = content.startsWith("data:")
      ? this.dataURItoBlob(content)
      : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private static dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}
