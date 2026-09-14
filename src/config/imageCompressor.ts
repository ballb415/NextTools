/**
 * Image Compressor Configuration & Validation Helpers
 */

export const MAX_IMAGE_SIZE_MB = 20;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
export const DEFAULT_QUALITY = 0.8;

export const SUPPORTED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

export const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"] as const;

export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
  format?: string;
}

/**
 * Validates file type, extension, and file size for image compression.
 */
export function validateImageFile(file: File | { name: string; size: number; type: string }): ImageValidationResult {
  if (!file) {
    return { isValid: false, error: "กรุณาเลือกไฟล์รูปภาพ" };
  }

  // Check file size
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return {
      isValid: false,
      error: `ไฟล์ใหญ่เกินไป รองรับสูงสุด ${MAX_IMAGE_SIZE_MB} MB (ไฟล์ปัจจุบัน ${(file.size / (1024 * 1024)).toFixed(1)} MB)`,
    };
  }

  if (file.size === 0) {
    return { isValid: false, error: "ไฟล์รูปภาพว่างเปล่าหรือไม่ถูกต้อง" };
  }

  // Check MIME type
  const mimeType = file.type?.toLowerCase();
  const fileName = file.name?.toLowerCase() || "";
  const extension = fileName.lastIndexOf(".") !== -1 ? fileName.substring(fileName.lastIndexOf(".")) : "";

  const isMimeSupported = SUPPORTED_MIME_TYPES.includes(mimeType as typeof SUPPORTED_MIME_TYPES[number]);
  const isExtSupported = SUPPORTED_EXTENSIONS.includes(extension as typeof SUPPORTED_EXTENSIONS[number]);

  if (!isMimeSupported && !isExtSupported) {
    return {
      isValid: false,
      error: "ไฟล์ประเภทนี้ยังไม่รองรับ (รองรับเฉพาะ JPG, PNG, WebP)",
    };
  }

  let detectedFormat = "JPG";
  if (mimeType.includes("png") || extension === ".png") detectedFormat = "PNG";
  else if (mimeType.includes("webp") || extension === ".webp") detectedFormat = "WEBP";

  return {
    isValid: true,
    format: detectedFormat,
  };
}

/**
 * Generates a clean filename for the compressed download.
 * E.g. "photo.png" -> "photo-compressed.png" or "photo-compressed.webp"
 */
export function generateCompressedFilename(
  originalName: string,
  targetFormat?: string
): string {
  const lastDotIndex = originalName.lastIndexOf(".");
  const baseName = lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
  const originalExt = lastDotIndex !== -1 ? originalName.substring(lastDotIndex).toLowerCase() : ".jpg";

  let finalExt = originalExt;
  if (targetFormat) {
    const cleanFmt = targetFormat.toLowerCase().replace(".", "");
    if (cleanFmt.includes("jpeg") || cleanFmt.includes("jpg")) finalExt = ".jpg";
    else if (cleanFmt.includes("png")) finalExt = ".png";
    else if (cleanFmt.includes("webp")) finalExt = ".webp";
  }

  return `${baseName}-compressed${finalExt}`;
}
