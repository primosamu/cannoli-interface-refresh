import { useState } from "react";
import { Check, Download, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { GeneratedImage } from "@/types/campaign";

interface GeneratedImageGalleryProps {
  images: GeneratedImage[];
  onSaveImage: (image: GeneratedImage) => void;
  onDeleteImage: (imageId: string) => void;
}

const GeneratedImageGallery = ({
  images,
  onSaveImage,
  onDeleteImage
}: GeneratedImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [savedImages, setSavedImages] = useState<Set<string>>(new Set());

  const handleSaveImage = (image: GeneratedImage) => {
    onSaveImage(image);
    setSavedImages(prev => new Set(prev).add(image.id));
    toast("Imagem salva com sucesso");
  };

  const handleDownloadImage = async (image: GeneratedImage) => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      
      const downloadLink = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      
      downloadLink.href = objectUrl;
      downloadLink.download = `campanha_${image.format}_${image.width}x${image.height}.png`;
      
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      URL.revokeObjectURL(objectUrl);
      
      toast("Download iniciado");
    } catch (error) {
      console.error("Erro ao fazer download da imagem:", error);
      toast("Erro ao fazer download da imagem");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Imagens Geradas</h3>
      
      {images.length === 0 ? (
        <div className="text-center py-8 border border-dashed rounded-md">
          <p className="text-gray-500">Nenhuma imagem foi gerada ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div 
              key={image.id} 
              className={`border rounded-md overflow-hidden cursor-pointer relative group ${
                selectedImage?.id === image.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedImage(image === selectedImage ? null : image)}
            >
              <div className="aspect-square">
                <img 
                  src={image.url} 
                  alt={`${image.format} ${image.width}x${image.height}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
              
              {selectedImage?.id === image.id && (
                <div className="absolute top-2 left-2">
                  <div className="bg-primary text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
              )}
              
              <div className="p-2 bg-white border-t">
                <p className="text-sm font-medium">{image.format}</p>
                <p className="text-xs text-gray-500">{image.width}x{image.height}</p>
                <p className="text-xs text-gray-400">{image.platform}</p>
              </div>
              
              <div className="absolute bottom-[52px] inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 bg-black/30 text-white rounded-full hover:bg-black/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveImage(image);
                  }}
                  disabled={savedImages.has(image.id)}
                >
                  {savedImages.has(image.id) ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 bg-black/30 text-white rounded-full hover:bg-black/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadImage(image);
                  }}
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 bg-black/30 text-white rounded-full hover:bg-black/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteImage(image.id);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedImage && (
        <div className="mt-4 border-t pt-4">
          <h4 className="font-medium mb-2">Imagem selecionada</h4>
          <div className="flex items-start gap-4">
            <div className="w-40 h-40 border rounded-md overflow-hidden">
              <img 
                src={selectedImage.url} 
                alt="Imagem selecionada" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2 flex-1">
              <p><span className="font-medium">Formato:</span> {selectedImage.format}</p>
              <p><span className="font-medium">Dimensões:</span> {selectedImage.width}x{selectedImage.height}px</p>
              <p><span className="font-medium">Plataforma:</span> {selectedImage.platform}</p>
              <p><span className="font-medium">Prompt:</span> {selectedImage.prompt}</p>
              
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSaveImage(selectedImage)}
                  disabled={savedImages.has(selectedImage.id)}
                >
                  <Save className="h-4 w-4 mr-1" />
                  {savedImages.has(selectedImage.id) ? "Salvo" : "Salvar"}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadImage(selectedImage)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratedImageGallery;
