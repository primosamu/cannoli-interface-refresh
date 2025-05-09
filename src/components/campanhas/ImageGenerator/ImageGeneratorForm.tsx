
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { FileText, ArrowRight, Loader } from "lucide-react";
import ImageUploader from "./ImageUploader";
import PromptInput from "./PromptInput";
import ImageFormatSelector, { ImageFormat } from "./ImageFormatSelector";
import GeneratedImageGallery from "./GeneratedImageGallery";
import GenerationOptions from "./GenerationOptions";
import { GeneratedImage, ImageGenerationStatus } from "@/types/campaign";

// Mock function to simulate AI image generation
const mockGenerateImages = async (
  prompt: string, 
  formats: ImageFormat[],
  style: string,
  useRestaurantLogo: boolean,
  useRestaurantColors: boolean,
): Promise<GeneratedImage[]> => {
  // This is just a mock function - in a real app this would call your AI image generation API
  const selectedFormats = formats.filter(f => f.selected);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  return selectedFormats.map(format => {
    const id = `img-${Math.random().toString(36).substr(2, 9)}`;
    // Use placeholder image URLs based on dimensions
    const imageUrl = `https://via.placeholder.com/${format.width}x${format.height}?text=${encodeURIComponent(format.name)}`;
    
    return {
      id,
      url: imageUrl,
      prompt,
      format: format.name.toLowerCase() as any,
      width: format.width,
      height: format.height,
      platform: format.platform,
      createdAt: new Date().toISOString()
    };
  });
};

interface ImageGeneratorFormProps {
  onSaveImages?: (images: GeneratedImage[]) => void;
}

const ImageGeneratorForm = ({ onSaveImages }: ImageGeneratorFormProps) => {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [prompt, setPrompt] = useState("");
  const [generationStatus, setGenerationStatus] = useState<ImageGenerationStatus>("idle");
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [useRestaurantLogo, setUseRestaurantLogo] = useState(false);
  const [useRestaurantColors, setUseRestaurantColors] = useState(false);
  const [style, setStyle] = useState("realistic");
  const [savedImages, setSavedImages] = useState<GeneratedImage[]>([]);
  
  // Predefined image formats
  const [formats, setFormats] = useState<ImageFormat[]>([
    // Meta/Instagram formats
    { id: "instagram-square", name: "Instagram Square", width: 1080, height: 1080, platform: "Instagram", selected: true },
    { id: "instagram-portrait", name: "Instagram Portrait", width: 1080, height: 1350, platform: "Instagram", selected: false },
    { id: "instagram-story", name: "Instagram Story", width: 1080, height: 1920, platform: "Instagram", selected: false },
    { id: "facebook-post", name: "Facebook Post", width: 1200, height: 630, platform: "Facebook", selected: false },
    { id: "facebook-cover", name: "Facebook Cover", width: 1640, height: 924, platform: "Facebook", selected: false },
    
    // WhatsApp formats
    { id: "whatsapp-standard", name: "WhatsApp", width: 800, height: 800, platform: "WhatsApp", selected: false },
    { id: "whatsapp-status", name: "WhatsApp Status", width: 720, height: 1280, platform: "WhatsApp", selected: false },
    
    // Email formats
    { id: "email-banner", name: "Email Banner", width: 600, height: 200, platform: "Email", selected: false },
    { id: "email-header", name: "Email Header", width: 600, height: 300, platform: "Email", selected: false },
    
    // Google Ads formats
    { id: "google-display-1", name: "Google Rectangle", width: 300, height: 250, platform: "Google Ads", selected: false },
    { id: "google-display-2", name: "Google Leaderboard", width: 728, height: 90, platform: "Google Ads", selected: false },
    { id: "google-display-3", name: "Google Large", width: 336, height: 280, platform: "Google Ads", selected: false },
  ]);

  const handleImagesSelected = (files: File[]) => {
    setUploadedImages(prev => [...prev, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleFormatToggle = (id: string) => {
    setFormats(prev => 
      prev.map(format => 
        format.id === id ? { ...format, selected: !format.selected } : format
      )
    );
  };

  const handleSelectAllFormats = () => {
    setFormats(prev => prev.map(format => ({ ...format, selected: true })));
  };

  const handleUnselectAllFormats = () => {
    setFormats(prev => prev.map(format => ({ ...format, selected: false })));
  };

  const handleGenerateImages = async () => {
    const selectedFormats = formats.filter(f => f.selected);
    
    if (selectedFormats.length === 0) {
      toast("Selecione pelo menos um formato de imagem");
      return;
    }
    
    if (!prompt.trim()) {
      toast("Por favor, insira uma descrição para a imagem");
      return;
    }
    
    try {
      setGenerationStatus("generating");
      
      const newImages = await mockGenerateImages(
        prompt,
        selectedFormats,
        style,
        useRestaurantLogo,
        useRestaurantColors
      );
      
      setGeneratedImages(newImages);
      setGenerationStatus("complete");
      setActiveTab("preview");
      
      toast("Imagens geradas com sucesso", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Error generating images:", error);
      setGenerationStatus("error");
      toast("Erro ao gerar imagens", {
        duration: 5000,
      });
    }
  };

  const handleSaveImage = (image: GeneratedImage) => {
    setSavedImages(prev => {
      const newSaved = [...prev, image];
      // If parent component provided a callback, call it
      if (onSaveImages) {
        onSaveImages(newSaved);
      }
      return newSaved;
    });
  };

  const handleDeleteImage = (imageId: string) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== imageId));
    setSavedImages(prev => prev.filter(img => img.id !== imageId));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ImageGeneratorIcon />
          <div>
            <CardTitle>Gerador de Imagens</CardTitle>
            <CardDescription>
              Crie imagens personalizadas para suas campanhas de marketing
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <CardContent>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upload">1. Materiais</TabsTrigger>
            <TabsTrigger value="prompt">2. Configuração</TabsTrigger>
            <TabsTrigger value="preview">3. Visualização</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Upload de Materiais</h3>
              <p className="text-sm text-muted-foreground">
                Faça upload de imagens que serão usadas como referência para a geração da nova imagem.
                Você pode enviar fotos do restaurante, pratos, logo, entre outros.
              </p>
              
              <ImageUploader 
                onImagesSelected={handleImagesSelected} 
                uploadedImages={uploadedImages}
                onRemoveImage={handleRemoveImage}
              />
            </div>
            
            <div className="flex justify-end mt-4">
              <Button
                type="button"
                onClick={() => setActiveTab("prompt")}
                className="flex items-center gap-1"
              >
                Próximo
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="prompt" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <PromptInput 
                  value={prompt}
                  onChange={setPrompt}
                  productType="pizza"
                  campaignType="promotion"
                />
                
                <GenerationOptions
                  useRestaurantLogo={useRestaurantLogo}
                  setUseRestaurantLogo={setUseRestaurantLogo}
                  useRestaurantColors={useRestaurantColors}
                  setUseRestaurantColors={setUseRestaurantColors}
                  style={style}
                  setStyle={setStyle}
                />
              </div>
              
              <ImageFormatSelector
                formats={formats}
                onFormatToggle={handleFormatToggle}
                onSelectAll={handleSelectAllFormats}
                onUnselectAll={handleUnselectAllFormats}
              />
            </div>
            
            <div className="flex justify-between mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab("upload")}
              >
                Voltar
              </Button>
              
              <Button
                type="button"
                onClick={handleGenerateImages}
                disabled={generationStatus === "generating"}
              >
                {generationStatus === "generating" ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                    Gerando...
                  </>
                ) : "Gerar Imagens"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <GeneratedImageGallery
              images={generatedImages}
              onSaveImage={handleSaveImage}
              onDeleteImage={handleDeleteImage}
            />
            
            <div className="flex justify-between mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab("prompt")}
              >
                Voltar
              </Button>
              
              <Button
                type="button"
                onClick={handleGenerateImages}
                disabled={generationStatus === "generating"}
              >
                {generationStatus === "generating" ? "Gerando..." : "Gerar Novamente"}
              </Button>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="border-t bg-muted/50 flex justify-between">
        <p className="text-xs text-muted-foreground">
          Imagens salvas: {savedImages.length}
        </p>
        {savedImages.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => window.location.href = "/imagens"}>
            Ver na Galeria
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

// Create a custom ImageGeneratorIcon since it doesn't exist in lucide-react
const ImageGeneratorIcon = () => (
  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
    <FileText size={24} />
  </div>
);

export default ImageGeneratorForm;
