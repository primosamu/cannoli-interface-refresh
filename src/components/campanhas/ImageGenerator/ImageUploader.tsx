
import { useState, useRef } from "react";
import { Upload, X, FileImage, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ImageCategory = "logo" | "restaurant" | "products" | "other";

interface CategoryImageMap {
  logo: File[];
  restaurant: File[];
  products: File[];
  other: File[];
}

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
  const [activeCategory, setActiveCategory] = useState<ImageCategory>("logo");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Group uploaded images by category
  const [categorizedImages, setCategorizedImages] = useState<CategoryImageMap>({
    logo: [],
    restaurant: [],
    products: [],
    other: []
  });
  
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
        handleFilesSelected(files);
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
        handleFilesSelected(files);
      }
    }
  };
  
  const handleFilesSelected = (files: File[]) => {
    // Add files to the current category
    const updatedCategorizedImages = {
      ...categorizedImages,
      [activeCategory]: [...categorizedImages[activeCategory], ...files]
    };
    
    setCategorizedImages(updatedCategorizedImages);
    
    // Combine all files for the parent component
    const allFiles = [
      ...updatedCategorizedImages.logo,
      ...updatedCategorizedImages.restaurant,
      ...updatedCategorizedImages.products,
      ...updatedCategorizedImages.other
    ];
    
    onImagesSelected(allFiles);
  };
  
  const handleRemoveImage = (category: ImageCategory, index: number) => {
    // Remove from category
    const updatedCategoryImages = [...categorizedImages[category]];
    updatedCategoryImages.splice(index, 1);
    
    const updatedCategorizedImages = {
      ...categorizedImages,
      [category]: updatedCategoryImages
    };
    
    setCategorizedImages(updatedCategorizedImages);
    
    // Find the global index to notify parent
    const allFiles = [
      ...categorizedImages.logo,
      ...categorizedImages.restaurant,
      ...categorizedImages.products,
      ...categorizedImages.other
    ];
    
    const globalIndex = allFiles.findIndex(file => file === categorizedImages[category][index]);
    if (globalIndex !== -1) {
      onRemoveImage(globalIndex);
    }
  };

  const categoryLabels: Record<ImageCategory, string> = {
    logo: "Logo",
    restaurant: "Fotos do Restaurante",
    products: "Fotos de Produtos",
    other: "Outras Imagens"
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as ImageCategory)}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="restaurant">Restaurante</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="other">Outras</TabsTrigger>
        </TabsList>
        
        {(Object.keys(categorizedImages) as ImageCategory[]).map((category) => (
          <TabsContent key={category} value={category}>
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
                  Arraste e solte {categoryLabels[category].toLowerCase()} aqui ou
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

            {categorizedImages[category].length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">{categoryLabels[category]} ({categorizedImages[category].length})</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {categorizedImages[category].map((file, index) => (
                    <ImagePreview 
                      key={`${category}-${index}`} 
                      file={file} 
                      onRemove={() => handleRemoveImage(category, index)} 
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
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
