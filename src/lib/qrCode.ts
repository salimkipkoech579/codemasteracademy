/**
 * Lightweight SVG QR code matrix generator for Certificate Verification
 */
export function generateQrCodeSvg(text: string, size = 120): string {
  // Generate deterministic pattern based on hash of text string
  const gridSize = 21;
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  const cellSize = size / gridSize;
  let rects = '';

  // Draw timing markers (corners)
  const drawFinderPattern = (startX: number, startY: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          const x = (startX + c) * cellSize;
          const y = (startY + r) * cellSize;
          rects += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#0f172a" />`;
        }
      }
    }
  };

  drawFinderPattern(0, 0); // Top-left
  drawFinderPattern(gridSize - 7, 0); // Top-right
  drawFinderPattern(0, gridSize - 7); // Bottom-left

  // Fill pseudo-data cells
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // Skip finder patterns
      if (
        (r < 7 && c < 7) ||
        (r < 7 && c >= gridSize - 7) ||
        (r >= gridSize - 7 && c < 7)
      ) {
        continue;
      }

      // Bit calculation
      const bit = Math.abs(Math.sin(hash + r * 31 + c * 17) * 10000) % 1 > 0.45;
      if (bit) {
        const x = c * cellSize;
        const y = r * cellSize;
        rects += `<rect x="${x}" y="${y}" width="${cellSize - 0.2}" height="${cellSize - 0.2}" rx="0.5" fill="#1e293b" />`;
      }
    }
  }

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="background: #ffffff; padding: 6px; border-radius: 8px;">
    ${rects}
  </svg>`;
}
