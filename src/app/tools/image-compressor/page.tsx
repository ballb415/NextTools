"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ToolLayoutShell } from "@/components/tools/ToolLayoutShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  validateImageFile,
  generateCompressedFilename,
  MAX_IMAGE_SIZE_MB,
} from "@/config/imageCompressor";
import { compressImageClient, CompressionResult } from "@/lib/image/compressor";
import { formatBytes } from "@/lib/utils";
import {
  UploadCloud,
  Sliders,
  Image as ImageIcon,
  Download,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  EyeOff,
  Layers,
  ArrowRight,
  Maximize2,
  Trash2,
} from "lucide-react";

type ToolState = "EMPTY" | "DRAGGING" | "PROCESSING" | "SUCCESS" | "ERROR";

export default function ImageCompressorPage() {
  const [state, setState] = useState<ToolState>("EMPTY");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string>("");
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null);

  // Settings
  const [quality, setQuality] = useState<number>(80); // 10 to 100%
  const [maxDimension, setMaxDimension] = useState<number>(0); // 0 = original
  const [targetFormat, setTargetFormat] = useState<"original" | "image/jpeg" | "image/png" | "image/webp">("original");
  const [progress, setProgress] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeUrlsRef = useRef<string[]>([]);

  // Safely track and revoke created object URLs
  const trackUrl = useCallback((url: string) => {
    activeUrlsRef.current.push(url);
    return url;
  }, []);

  const clearUrls = useCallback(() => {
    activeUrlsRef.current.forEach((url) => {
      try {
        URL.revokeObjectURL(url);
      } catch {}
    });
    activeUrlsRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearUrls();
    };
  }, [clearUrls]);

  // Execute in-browser compression
  const runCompression = async (
    file: File,
    targetQuality: number,
    dimension: number,
    format: "original" | "image/jpeg" | "image/png" | "image/webp"
  ) => {
    setState("PROCESSING");
    setProgress(10);
    setErrorMessage("");

    try {
      const result = await compressImageClient(file, {
        quality: targetQuality / 100,
        maxWidthOrHeight: dimension > 0 ? dimension : undefined,
        outputFormat: format,
        onProgress: (p) => setProgress(Math.round(p)),
      });

      trackUrl(result.previewUrl);
      setCompressionResult(result);
      setState("SUCCESS");
    } catch (err) {
      console.error(err);
      setErrorMessage("เกิดข้อผิดพลาดในการบีบอัดรูปภาพ กรุณาลองใหม่อีกครั้ง");
      setState("ERROR");
    }
  };

  // Handle incoming file
  const handleFileSelect = (file: File | null) => {
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setErrorMessage(validation.error || "ไฟล์รูปภาพไม่ถูกต้อง");
      setState("ERROR");
      return;
    }

    clearUrls();
    setErrorMessage("");
    setSelectedFile(file);

    const origUrl = trackUrl(URL.createObjectURL(file));
    setOriginalPreviewUrl(origUrl);

    runCompression(file, quality, maxDimension, targetFormat);
  };

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (state !== "PROCESSING") {
      setState("DRAGGING");
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (state === "DRAGGING") {
      setState(selectedFile ? "SUCCESS" : "EMPTY");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    } else {
      setState(selectedFile ? "SUCCESS" : "EMPTY");
    }
  };

  // Reset to initial state
  const handleReset = () => {
    clearUrls();
    setSelectedFile(null);
    setCompressionResult(null);
    setOriginalPreviewUrl("");
    setErrorMessage("");
    setState("EMPTY");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Trigger download of compressed blob
  const handleDownload = () => {
    if (!compressionResult || !selectedFile) return;

    const downloadName = generateCompressedFilename(
      selectedFile.name,
      targetFormat === "original" ? undefined : targetFormat
    );

    const link = document.createElement("a");
    link.href = compressionResult.previewUrl;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ToolLayoutShell
      name="บีบอัดรูปภาพ"
      nameEn="Image Compressor"
      categoryName="Image Tools"
      description="ลดขนาดไฟล์รูปภาพ PNG, JPG, WebP ได้อย่างมีประสิทธิภาพสูงสุด โดยไม่ลดทอนความคมชัด ประมวลผลในเบราว์เซอร์ของคุณ 100% ไม่ส่งไฟล์ขึ้นเซิร์ฟเวอร์"
      iconName="Minimize2"
      creditCost={0}
      badge="ฟรียอดนิยม"
    >
      <div className="space-y-8">
        {/* Privacy Highlight Banner */}
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs font-thai text-emerald-800 shadow-xs">
          <EyeOff className="w-5 h-5 shrink-0" />
          <div>
            <strong className="font-semibold block text-text-primary">
              ประมวลผลในเบราว์เซอร์ 100% (Client-Side Only)
            </strong>
            <span>ไฟล์รูปภาพของคุณจะไม่ถูกอัปโหลดขึ้นเซิร์ฟเวอร์ ข้อมูลส่วนตัวของคุณปลอดภัยสูงสุด</span>
          </div>
        </div>

        {/* Upload Dropzone */}
        {state === "EMPTY" || state === "DRAGGING" || state === "ERROR" ? (
          <div className="space-y-4">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="คลิกหรือลากไฟล์รูปภาพมาวางที่นี่เพื่อบีบอัดรูปภาพ"
              className={`border-2 border-dashed rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-200 outline-none focus:ring-2 focus:ring-brand-charcoal ${
                state === "DRAGGING"
                  ? "border-brand-charcoal bg-black/[0.04] scale-[1.01]"
                  : "border-black/[0.1] hover:border-brand-charcoal bg-[#FAF9F6]/60 hover:bg-white shadow-xs"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              <div className="w-16 h-16 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-brand-charcoal mx-auto mb-4 transition-transform group-hover:scale-105 shadow-xs">
                <UploadCloud className="w-8 h-8" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-text-primary font-thai mb-1">
                ลากรูปภาพมาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์
              </h3>
              <p className="text-xs text-text-muted font-thai max-w-md mx-auto mb-4 leading-relaxed">
                รองรับไฟล์ <strong>JPG, JPEG, PNG, WebP</strong> ขนาดไฟล์สูงสุด <strong>{MAX_IMAGE_SIZE_MB} MB</strong>
              </p>

              <Button variant="yellow" size="md" className="font-thai">
                เลือกรูปภาพจากเครื่อง
              </Button>
            </div>

            {/* Error message alert */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-thai flex items-center gap-2.5 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        ) : null}

        {/* Processing State */}
        {state === "PROCESSING" && (
          <div className="bg-[#FAF9F6] border border-black/[0.06] rounded-3xl p-12 text-center space-y-4 animate-fade-in shadow-xs">
            <div className="w-12 h-12 rounded-full border-4 border-brand-charcoal border-t-transparent animate-spin mx-auto" />
            <h3 className="text-base font-bold text-text-primary font-thai">
              กำลังบีบอัดรูปภาพในเบราว์เซอร์...
            </h3>
            <p className="text-xs text-text-muted font-thai">
              กำลังประมวลผลด้วย Web Worker เพื่อความเร็วสูงสุด ({progress}%)
            </p>
            <div className="w-48 bg-white h-2 rounded-full mx-auto overflow-hidden border border-black/[0.06]">
              <div
                className="bg-brand-charcoal h-full transition-all duration-200"
                style={{ width: `${Math.max(15, progress)}%` }}
              />
            </div>
          </div>
        )}

        {/* Success / Interactive Compression Editor State */}
        {state === "SUCCESS" && compressionResult && selectedFile && (
          <div className="space-y-6 animate-fade-in">
            {/* Header Result Bar */}
            <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-black/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center text-brand-charcoal shrink-0 shadow-xs">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary font-thai truncate max-w-xs sm:max-w-md">
                    {selectedFile.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <span className="text-text-muted">
                      ต้นฉบับ: {formatBytes(compressionResult.originalSize)}
                    </span>
                    <span className="text-text-muted">→</span>
                    <span className="font-bold text-brand-charcoal font-english">
                      ผลลัพธ์: {formatBytes(compressionResult.compressedSize)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <Badge
                  variant={compressionResult.reductionPercentage > 0 ? "success" : "muted"}
                  size="md"
                >
                  {compressionResult.reductionPercentage > 0
                    ? `ประหยัดพื้นที่ ${compressionResult.reductionPercentage}%`
                    : "ขนาดคงเดิม"}
                </Badge>
                <button
                  onClick={handleReset}
                  className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors text-xs flex items-center gap-1 font-thai"
                  title="เปลี่ยนรูปภาพ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Compression Settings Controls */}
            <div className="bg-[#FAF9F6] border border-black/[0.06] rounded-2xl p-6 space-y-6 shadow-xs">
              {/* Quality Slider */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-thai">
                  <label htmlFor="quality-slider" className="font-semibold text-text-primary flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-brand-charcoal" />
                    <span>ระดับคุณภาพรูปภาพ (Quality):</span>
                  </label>
                  <span className="font-bold text-brand-charcoal font-english text-sm">
                    {quality}%
                  </span>
                </div>
                <input
                  id="quality-slider"
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={quality}
                  onChange={(e) => {
                    const newQ = Number(e.target.value);
                    setQuality(newQ);
                  }}
                  className="w-full accent-brand-charcoal h-2 bg-white rounded-lg cursor-pointer border border-black/[0.06]"
                />
                <div className="flex justify-between text-[11px] text-text-muted font-thai">
                  <span>ไฟล์เล็กที่สุด (10%)</span>
                  <span>แนะนำ (80%)</span>
                  <span>คมชัดสูงสุด (100%)</span>
                </div>
              </div>

              {/* Format & Dimension Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/[0.06]">
                {/* Max Dimension */}
                <div>
                  <label className="block text-xs font-semibold text-text-secondary font-thai mb-2">
                    ปรับขนาดความละเอียดสูงสุด (Max Dimension):
                  </label>
                  <select
                    value={maxDimension}
                    onChange={(e) => setMaxDimension(Number(e.target.value))}
                    className="w-full bg-white border border-black/[0.08] rounded-xl text-xs text-text-primary p-2.5 font-thai focus:outline-none focus:border-brand-charcoal shadow-xs"
                  >
                    <option value={0}>คงขนาดเดิม (Original Dimension)</option>
                    <option value={1920}>Full HD (สูงสุด 1920px)</option>
                    <option value={1280}>HD (สูงสุด 1280px)</option>
                    <option value={800}>Web Optimized (สูงสุด 800px)</option>
                  </select>
                </div>

                {/* Output Format */}
                <div>
                  <label className="block text-xs font-semibold text-text-secondary font-thai mb-2">
                    สกุลไฟล์ปลายทาง (Output Format):
                  </label>
                  <select
                    value={targetFormat}
                    onChange={(e) =>
                      setTargetFormat(e.target.value as "original" | "image/jpeg" | "image/png" | "image/webp")
                    }
                    className="w-full bg-white border border-black/[0.08] rounded-xl text-xs text-text-primary p-2.5 font-thai focus:outline-none focus:border-brand-charcoal shadow-xs"
                  >
                    <option value="original">คงสกุลไฟล์เดิม (Original Format)</option>
                    <option value="image/webp">WEBP (แนะนำ ขนาดเล็กพิเศษ)</option>
                    <option value="image/jpeg">JPG / JPEG (มาตรฐานสากล)</option>
                    <option value="image/png">PNG (ภาพกราฟิก / โลโก้)</option>
                  </select>
                </div>
              </div>

              {/* Re-compress Action Button */}
              <div className="pt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => runCompression(selectedFile, quality, maxDimension, targetFormat)}
                  leftIcon={<RefreshCw className="w-3.5 h-3.5 text-brand-charcoal" />}
                  className="font-thai text-xs"
                >
                  อัปเดตการบีบอัดตามการตั้งค่าใหม่
                </Button>
              </div>
            </div>

            {/* Live Image Preview */}
            <div className="bg-[#FAF9F6] border border-black/[0.06] rounded-2xl p-4 sm:p-6 space-y-3 shadow-xs">
              <span className="text-xs font-bold text-text-secondary font-thai flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-brand-charcoal" />
                <span>ตัวอย่างรูปภาพที่บีบอัดแล้ว (Live Preview):</span>
              </span>
              <div className="relative aspect-video max-h-[360px] w-full bg-white rounded-xl overflow-hidden flex items-center justify-center border border-black/[0.06] shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={compressionResult.previewUrl}
                  alt="Compressed preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="yellow"
                size="lg"
                onClick={handleDownload}
                className="w-full sm:w-auto font-thai shadow-pill"
                rightIcon={<Download className="w-4 h-4" />}
              >
                ดาวน์โหลดรูปภาพ ({formatBytes(compressionResult.compressedSize)})
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleReset}
                className="w-full sm:w-auto font-thai"
              >
                เลือกรูปภาพใหม่
              </Button>
            </div>
          </div>
        )}

        {/* Feature Specs Footnote */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-black/[0.06] text-xs font-thai text-text-secondary">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-charcoal shrink-0" />
            <span>ประมวลผลบนเครื่องของคุณ 100%</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-charcoal shrink-0" />
            <span>ปรับระดับคุณภาพและความละเอียดได้อิสระ</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>ฟรี ไม่มีลายน้ำ ไม่จำกัดจำนวนครั้ง</span>
          </div>
        </div>
      </div>
    </ToolLayoutShell>
  );
}
