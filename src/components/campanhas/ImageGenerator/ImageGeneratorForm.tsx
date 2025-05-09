import { useState } from "react";
import { GeneratedImage, ImageGenerationFormat } from "@/types/campaign";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
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

// Custom icon since it doesn't exist in lucide-react
const ImageGeneratorIcon = () => (
  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
    <FileText size={24} />
  </div>
);

// Helper function to convert string format to ImageGenerationFormat type
const mapFormatToImageGenerationFormat = (format: string): ImageGenerationFormat => {
  // Map the format names to the expected ImageGenerationFormat values
  if (format.toLowerCase().includes('square')) return 'square';
  if (format.toLowerCase().includes('story')) return 'story';
  if (format.toLowerCase().includes('banner')) return 'banner';
  if (format.toLowerCase().includes('ad')) return 'ad';
  // Default to 'portrait' for other formats
  return 'portrait';
};

// Mock function to simulate image generation (will be replaced with real API call later)
const mockGenerateImages = async (
  files: File[], 
  prompt: string, 
  formats: ImageFormat[]
): Promise<GeneratedImage[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Create sample generated images
  return formats
    .filter(format => format.selected)
    .map((format, index) => ({
      id: `generated-${Date.now()}-${index}`,
      url: URL.createObjectURL(files[0] || new Blob()),
      format: mapFormatToImageGenerationFormat(format.name), // Use the helper function to convert
      width: format.width,
      height: format.height,
      platform: format.platform,
      prompt,
      createdAt: new Date().toISOString()
    }));
};

const ImageGeneratorForm = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [prompt, setPrompt] = useState("");
  const [formats, setFormats] = useState<ImageFormat[]>([
    { id: "instagram-feed", name: "Instagram Feed", width: 1080, height: 1080, platform: "Instagram", selected: false },
    { id: "instagram-story", name: "Instagram Story", width: 1080, height: 1920, platform: "Instagram", selected: false },
    { id: "facebook-feed", name: "Facebook Feed", width: 1200, height: 630, platform: "Facebook", selected: false },
    { id: "whatsapp-status", name: "WhatsApp Status", width: 720, height: 1280, platform: "WhatsApp", selected: false },
    { id: "twitter-post", name: "Twitter Post", width: 1200, height: 675, platform: "Twitter", selected: false },
    { id: "youtube-thumbnail", name: "YouTube Thumbnail", width: 1280, height: 720, platform: "YouTube", selected: false },
    { id: "google-ads", name: "Google Ads", width: 300, height: 250, platform: "Google", selected: false },
    { id: "banner-site", name: "Banner Site", width: 728, height: 90, platform: "Web", selected: false },
  ]);
  
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [generationStatus, setGenerationStatus] = useState<"idle" | "generating" | "complete" | "error">("idle");
  const [savedImages, setSavedImages] = useState<GeneratedImage[]>([]);
  
  // Style and generation options
  const [useRestaurantLogo, setUseRestaurantLogo] = useState<boolean>(false);
  const [useRestaurantColors, setUseRestaurantColors] = useState<boolean>(false);
  const [style, setStyle] = useState<string>("realistic");
  
  const handleImagesSelected = (files: File[]) => {
    setUploadedImages(files);
  };
  
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
  };
  
  const handlePromptChange = (value: string) => {
    setPrompt(value);
  };
  
  const handleFormatToggle = (id: string) => {
    const updatedFormats = [...formats];
    const index = updatedFormats.findIndex(format => format.id === id);
    if (index !== -1) {
      updatedFormats[index].selected = !updatedFormats[index].selected;
      setFormats(updatedFormats);
    }
  };
  
  const handleSelectAll = () => {
    const allSelected = formats.every(format => format.selected);
    const updatedFormats = formats.map(format => ({
      ...format,
      selected: !allSelected
    }));
    setFormats(updatedFormats);
  };
  
  const handleUnselectAll = () => {
    const updatedFormats = formats.map(format => ({
      ...format,
      selected: false
    }));
    setFormats(updatedFormats);
  };
  
  const handleGenerateImages = async () => {
    // Basic validation
    const selectedFormats = formats.filter(f => f.selected);
    
    if (selectedFormats.length === 0) {
      toast("Selecione pelo menos um formato de imagem");
      return;
    }
    
    if (!prompt.trim()) {
      toast("Por favor, insira uma descrição para a imagem");
      return;
    }
    
    if (uploadedImages.length === 0) {
      toast("Por favor, faça o upload de pelo menos uma imagem");
      return;
    }
    
    try {
      setGenerationStatus("generating");
      
      // Call API to generate images (mocked for now)
      const images = await mockGenerateImages(
        uploadedImages,
        prompt,
        formats
      );
      
      setGeneratedImages(images);
      setGenerationStatus("complete");
      setActiveTab("resultado");
      
    } catch (error) {
      console.error("Error generating images:", error);
      setGenerationStatus("error");
      toast("Erro ao gerar imagens");
    }
  };
  
  const handleSaveImage = (image: GeneratedImage) => {
    setSavedImages(prev => [...prev, image]);
  };
  
  const handleDeleteGeneratedImage = (imageId: string) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== imageId));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <ImageGeneratorIcon />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gerador de Imagens</h2>
          <p className="text-muted-foreground">
            Crie imagens otimizadas para suas campanhas de marketing em diferentes plataformas.
          </p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col gap-2">
        <TabsList className="max-w-md">
          <TabsTrigger value="upload">1. Upload de Materiais</TabsTrigger>
          <TabsTrigger value="formato">2. Formatos e Descrição</TabsTrigger>
          <TabsTrigger value="resultado" disabled={generatedImages.length === 0}>
            3. Resultado
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload de Materiais</CardTitle>
              <CardDescription>
                Faça upload das imagens para usar como base na criação das suas campanhas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUploader 
                onImagesSelected={handleImagesSelected}
                uploadedImages={uploadedImages}
                onRemoveImage={handleRemoveImage}
              />
              
              {uploadedImages.length > 0 && (
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setActiveTab("formato")} className="flex items-center">
                    Próximo 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="formato" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Formatos e Descrição</CardTitle>
              <CardDescription>
                Selecione os formatos de imagem desejados e adicione uma descrição
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-4">Formatos de Imagem</h3>
                <ImageFormatSelector 
                  formats={formats}
                  onFormatToggle={handleFormatToggle}
                  onSelectAll={handleSelectAll}
                  onUnselectAll={handleUnselectAll}
                />
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-4">Descrição</h3>
                <PromptInput 
                  value={prompt}
                  onChange={handlePromptChange}
                />
              </div>
              
              <GenerationOptions 
                useRestaurantLogo={useRestaurantLogo}
                setUseRestaurantLogo={setUseRestaurantLogo}
                useRestaurantColors={useRestaurantColors}
                setUseRestaurantColors={setUseRestaurantColors}
                style={style}
                setStyle={setStyle}
              />
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setActiveTab("upload")}>
                  Voltar
                </Button>
                <Button 
                  onClick={handleGenerateImages}
                  disabled={generationStatus === "generating"}
                  className="flex items-center"
                >
                  {generationStatus === "generating" ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Gerando...
                    </>
                  ) : "Gerar Imagens"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resultado" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Imagens Geradas</CardTitle>
              <CardDescription>
                Visualize, baixe ou salve as imagens geradas para usar nas suas campanhas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GeneratedImageGallery 
                images={generatedImages}
                onSaveImage={handleSaveImage}
                onDeleteImage={handleDeleteGeneratedImage}
              />
              
              <div className="flex justify-end space-x-2 pt-6">
                <Button variant="outline" onClick={() => setActiveTab("formato")}>
                  Voltar
                </Button>
                <Button
                  onClick={() => {
                    setGenerationStatus("idle");
                    setActiveTab("upload");
                    setUploadedImages([]);
                    setGeneratedImages([]);
                    setPrompt("");
                    setFormats(formats.map(f => ({ ...f, selected: false })));
                  }}
                >
                  Novo Processo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageGeneratorForm;
