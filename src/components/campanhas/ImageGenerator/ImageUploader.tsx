
import { useState, useRef } from "react";
import { Upload, X, FileImage, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void;
  uploadedImages: File[];
  onRemoveImage: (index: number) => void;
}

const ImageUploader = ({
  onImagesSelected,
  uploadedImages,
  onRemoveImage,
}: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith("image/")
      );
      
      if (files.length > 0) {
        onImagesSelected(files);
      } else {
        toast("Apenas arquivos de imagem são permitidos.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(file => 
        file.type.startsWith("image/")
      );
      
      if (files.length > 0) {
        onImagesSelected(files);
      }
    }
  };

  const checkImageQuality = (file: File): Promise<{ isLowQuality: boolean, width: number, height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Consider an image low quality if under 500px in either dimension
        const isLowQuality = img.width < 500 || img.height < 500;
        resolve({ isLowQuality, width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  return (
    <div className="space-y-4">
      <div 
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-200"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="py-8 flex flex-col items-center">
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 mb-1">
            Arraste e solte imagens aqui ou
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            Selecionar Arquivos
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {uploadedImages.map((file, index) => (
            <ImagePreview 
              key={index} 
              file={file} 
              onRemove={() => onRemoveImage(index)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
}

const ImagePreview = ({ file, onRemove }: ImagePreviewProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLowQuality, setIsLowQuality] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useState(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    // Check image quality
    const img = new Image();
    img.onload = () => {
      const lowQuality = img.width < 500 || img.height < 500;
      setIsLowQuality(lowQuality);
      setDimensions({ width: img.width, height: img.height });
    };
    img.src = url;

    return () => URL.revokeObjectURL(url);
  });

  return (
    <div className="relative group">
      <div className="aspect-square rounded-md overflow-hidden border bg-gray-50 relative">
        <img 
          src={imageUrl} 
          alt={file.name} 
          className="w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1 right-1 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="h-3 w-3 text-white" />
        </button>
        
        {isLowQuality && (
          <div className="absolute bottom-0 left-0 right-0 bg-yellow-500/80 text-white text-xs p-1 flex items-center justify-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            Baixa qualidade
          </div>
        )}
      </div>
      <div className="mt-1">
        <p className="text-xs truncate text-gray-600" title={file.name}>{file.name}</p>
        <p className="text-xs text-gray-400">{dimensions.width}x{dimensions.height}px</p>
      </div>
    </div>
  );
};

export default ImageUploader;
