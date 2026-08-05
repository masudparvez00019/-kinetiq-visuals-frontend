"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon, Video, Check, Play } from "lucide-react";
import { mediaService } from "@/services/media.service";
import { getErrorMessage } from "@/lib/axios";

interface MediaUploaderProps {
  label: string;
  value: string | null | undefined;
  onChange: (url: string) => void;
  accept?: string;
  type?: "image" | "video" | "any";
  placeholder?: string;
}

export function MediaUploader({
  label,
  value,
  onChange,
  accept = "image/*,video/*",
  type = "any",
  placeholder = "Upload or drag & drop a file...",
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20MB

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    if (file.size > MAX_SIZE_BYTES) {
      setError(`File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the 20 MB limit.`);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const asset = await mediaService.upload(file);
      onChange(asset.url);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to upload media asset."));
    } finally {
      setUploading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // reset input value so re-selecting same file triggers onChange
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const isVideo = type === "video" || (value && (value.endsWith(".mp4") || value.endsWith(".webm") || value.includes("/video")));

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      {value ? (
        <div className="relative group rounded-xl border border-white/10 overflow-hidden bg-slate-900/60 p-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative w-16 h-12 rounded-lg bg-black/40 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
              {isVideo ? (
                <video src={value} className="w-full h-full object-cover" muted />
              ) : (
                <img src={value} alt="Media preview" className="w-full h-full object-cover" />
              )}
              {isVideo && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-white truncate max-w-[220px] sm:max-w-[300px]">
                {value}
              </span>
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3 h-3" /> Uploaded & Linked
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              disabled={uploading}
              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
              title="Remove media"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`relative cursor-pointer rounded-xl border border-dashed p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
            isDragOver
              ? "border-blue-500 bg-blue-500/10"
              : "border-white/15 bg-slate-900/40 hover:bg-slate-900/80 hover:border-white/30"
          }`}
        >
          {uploading ? (
            <div className="flex items-center gap-2 text-xs font-medium text-blue-400 py-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Uploading to server...
            </div>
          ) : (
            <>
              <div className="p-2.5 rounded-full bg-blue-500/10 text-blue-400">
                {type === "video" ? (
                  <Video className="w-5 h-5" />
                ) : (
                  <ImageIcon className="w-5 h-5" />
                )}
              </div>
              <p className="text-xs font-medium text-slate-300 text-center">
                {placeholder}
              </p>
              <span className="text-[10px] text-slate-500">
                Click to browse or drag file here (Max 20 MB)
              </span>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={onFileChange}
        className="hidden"
      />

      {error && (
        <span className="text-[11px] text-red-400 font-medium">{error}</span>
      )}
    </div>
  );
}
