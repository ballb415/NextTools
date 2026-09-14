import { describe, it, expect } from "vitest";
import {
  validateImageFile,
  generateCompressedFilename,
  MAX_IMAGE_SIZE_MB,
  MAX_IMAGE_SIZE_BYTES,
} from "@/config/imageCompressor";
import { formatBytes } from "@/lib/utils";

describe("Image Compressor Configuration & Validation Suite", () => {
  it("1. Accepts supported image formats (JPG, PNG, WebP)", () => {
    // JPG
    const jpgValidation = validateImageFile({
      name: "sample-photo.jpg",
      size: 2 * 1024 * 1024,
      type: "image/jpeg",
    });
    expect(jpgValidation.isValid).toBe(true);
    expect(jpgValidation.format).toBe("JPG");

    // PNG
    const pngValidation = validateImageFile({
      name: "icon.png",
      size: 500 * 1024,
      type: "image/png",
    });
    expect(pngValidation.isValid).toBe(true);
    expect(pngValidation.format).toBe("PNG");

    // WebP
    const webpValidation = validateImageFile({
      name: "banner.webp",
      size: 1.5 * 1024 * 1024,
      type: "image/webp",
    });
    expect(webpValidation.isValid).toBe(true);
    expect(webpValidation.format).toBe("WEBP");
  });

  it("2. Rejects unsupported file formats with Thai error message", () => {
    // PDF
    const pdfValidation = validateImageFile({
      name: "document.pdf",
      size: 1024 * 1024,
      type: "application/pdf",
    });
    expect(pdfValidation.isValid).toBe(false);
    expect(pdfValidation.error).toContain("ยังไม่รองรับ");

    // GIF
    const gifValidation = validateImageFile({
      name: "animation.gif",
      size: 1024 * 1024,
      type: "image/gif",
    });
    expect(gifValidation.isValid).toBe(false);
    expect(gifValidation.error).toContain("ยังไม่รองรับ");

    // Text file
    const txtValidation = validateImageFile({
      name: "notes.txt",
      size: 1024,
      type: "text/plain",
    });
    expect(txtValidation.isValid).toBe(false);
    expect(txtValidation.error).toContain("ยังไม่รองรับ");
  });

  it("3. Enforces maximum file size limit (20MB)", () => {
    // Exactly 20MB (Allowed)
    const exactMax = validateImageFile({
      name: "large-photo.jpg",
      size: MAX_IMAGE_SIZE_BYTES,
      type: "image/jpeg",
    });
    expect(exactMax.isValid).toBe(true);

    // Oversized (>20MB)
    const oversized = validateImageFile({
      name: "huge-photo.jpg",
      size: MAX_IMAGE_SIZE_BYTES + 1024,
      type: "image/jpeg",
    });
    expect(oversized.isValid).toBe(false);
    expect(oversized.error).toContain("ไฟล์ใหญ่เกินไป");
    expect(oversized.error).toContain(`${MAX_IMAGE_SIZE_MB} MB`);

    // Zero-byte file
    const zeroByte = validateImageFile({
      name: "empty.jpg",
      size: 0,
      type: "image/jpeg",
    });
    expect(zeroByte.isValid).toBe(false);
    expect(zeroByte.error).toContain("ว่างเปล่า");
  });

  it("4. Generates correct compressed filenames", () => {
    // Same format
    expect(generateCompressedFilename("photo.jpg")).toBe("photo-compressed.jpg");
    expect(generateCompressedFilename("my.logo.png")).toBe("my.logo-compressed.png");
    expect(generateCompressedFilename("banner.webp")).toBe("banner-compressed.webp");

    // Format conversion
    expect(generateCompressedFilename("photo.png", "image/webp")).toBe("photo-compressed.webp");
    expect(generateCompressedFilename("photo.png", "image/jpeg")).toBe("photo-compressed.jpg");
    expect(generateCompressedFilename("photo.webp", "image/png")).toBe("photo-compressed.png");
  });

  it("5. Formats byte sizes accurately for display", () => {
    expect(formatBytes(0)).toBe("0 Bytes");
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1.5 * 1024 * 1024)).toBe("1.5 MB");
    expect(formatBytes(20 * 1024 * 1024)).toBe("20 MB");
  });
});
