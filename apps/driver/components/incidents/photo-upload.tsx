'use client';

import { Camera, Image as ImageIcon, X } from 'lucide-react';
import NextImage from 'next/image';
import { useRef, useState } from 'react';

interface PhotoUploadProps {
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
}

export function PhotoUpload({ onPhotosChange, maxPhotos = 5 }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || photos.length >= maxPhotos) return;

    setIsUploading(true);
    const newPhotos: string[] = [];

    for (let i = 0; i < Math.min(files.length, maxPhotos - photos.length); i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        // Compress and convert to base64
        const compressedPhoto = await compressImage(file);
        newPhotos.push(compressedPhoto);
      }
    }

    const updatedPhotos = [...photos, ...newPhotos];
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
    setIsUploading(false);
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions (max 800px width)
        const maxWidth = 800;
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // Draw and compress
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressedDataUrl);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
  };

  const openCamera = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const openGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Photos ({photos.length}/{maxPhotos})
      </label>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {photos.map((photo, index) => (
            <div key={index} className="relative h-20 w-full">
              <NextImage
                src={photo}
                alt={`Incident photo ${index + 1}`}
                className="object-cover rounded-lg border border-gray-200"
                fill
                sizes="(max-width: 768px) 33vw, 20vw"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Controls */}
      {photos.length < maxPhotos && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={openCamera}
              disabled={isUploading}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Camera className="w-4 h-4" />
              <span className="text-sm font-medium">Camera</span>
            </button>

            <button
              type="button"
              onClick={openGallery}
              disabled={isUploading}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Gallery</span>
            </button>
          </div>

          {isUploading && (
            <div className="flex items-center justify-center gap-2 py-2 text-sm text-gray-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              Processing photos...
            </div>
          )}
        </div>
      )}

      {/* Hidden File Inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      <p className="text-xs text-gray-500 mt-2">
        Take photos of the incident for documentation. Images will be compressed for faster upload.
      </p>
    </div>
  );
}
