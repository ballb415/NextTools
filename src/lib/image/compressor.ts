import imageCompression from "browser-image-compression";

export interface CompressImageOptions {
  quality: number; // 0.1 to 1.0
  maxWidthOrHeight?: number;
  outputFormat?: "original" | "image/jpeg" | "image/png" | "image/webp";
  onProgress?: (progress: number) => void;
}

export interface CompressionResult {
  compressedFile: File;
  compressedSize: number;
  originalSize: number;
  reductionPercentage: number;
  previewUrl: string;
  width?: number;
  height?: number;
}

/**
 * Compresses an image file directly inside the browser using Web Workers.
 * The original image is NEVER sent to any server.
 */
export async function compressImageClient(
  file: File,
  options: CompressImageOptions
): Promise<CompressionResult> {
  const quality = Math.max(0.1, Math.min(1.0, options.quality));

  // Determine target MIME type
  let targetFileType: string | undefined = undefined;
  if (options.outputFormat && options.outputFormat !== "original") {
    targetFileType = options.outputFormat;
  }

  // Calculate target maxSizeMB proportionally to quality
  const originalSizeMB = file.size / (1024 * 1024);
  const targetMaxSizeMB = Math.max(0.01, originalSizeMB * quality);

  const compressionOptions = {
    maxSizeMB: targetMaxSizeMB,
    maxWidthOrHeight: options.maxWidthOrHeight || undefined,
    initialQuality: quality,
    useWebWorker: true,
    fileType: targetFileType,
    onProgress: options.onProgress,
  };

  try {
    const compressedBlob = await imageCompression(file, compressionOptions);

    const compressedFile = new File(
      [compressedBlob],
      file.name,
      { type: compressedBlob.type || file.type }
    );

    const reductionPercentage = Math.max(
      0,
      Math.round(((file.size - compressedFile.size) / file.size) * 100)
    );

    const previewUrl = URL.createObjectURL(compressedFile);

    return {
      compressedFile,
      compressedSize: compressedFile.size,
      originalSize: file.size,
      reductionPercentage,
      previewUrl,
    };
  } catch (error) {
    console.error("Client-side image compression failed:", error);
    throw new Error("เกิดข้อผิดพลาดในการบีบอัดรูปภาพ กรุณาลองใหม่อีกครั้ง");
  }
}
