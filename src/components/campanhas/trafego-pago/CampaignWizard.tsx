
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CampaignTemplate, AdPlatform } from "@/types/campaign";
import { MapPin, Camera, Calendar, DollarSign, Users, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { PlatformIcon } from "./CampaignTemplateCard";

interface CampaignWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: CampaignTemplate[];
}

export function CampaignWizard({ open, onOpenChange, templates }: CampaignWizardProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<CampaignTemplate | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<AdPlatform[]>([]);
  
  const totalSteps = 5;
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleCreateCampaign();
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSelectTemplate = (template: CampaignTemplate) => {
    setSelectedTemplate(template);
    setSelectedPlatforms(template.platforms);
    setStep(2);
  };
  
  const handleTogglePlatform = (platform: AdPlatform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };
  
  const handleCreateCampaign = () => {
    toast({
      title: "Campanha criada com sucesso!",
      description: "Você receberá um e-mail quando sua campanha começar a ser veiculada.",
    });
    
    setStep(1);
    setSelectedTemplate(null);
    setSelectedPlatforms([]);
    onOpenChange(false);
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <ObjectiveStep templates={templates} onSelectTemplate={handleSelectTemplate} />;
      case 2:
        return <PlatformsStep 
          selectedPlatforms={selectedPlatforms} 
          onTogglePlatform={handleTogglePlatform} 
          templateName={selectedTemplate?.name || ""} 
        />;
      case 3:
        return <RestaurantInfoStep />;
      case 4:
        return <BudgetStep />;
      case 5:
        return <ReviewStep 
          templateName={selectedTemplate?.name || ""} 
          platforms={selectedPlatforms}
        />;
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {step === 1 ? "Criar Nova Campanha" : 
             step === 5 ? "Revisar e Confirmar" : 
             `Etapa ${step} de ${totalSteps}`}
          </DialogTitle>
        </DialogHeader>
        
        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-1 rounded-full mb-6">
          <div 
            className="bg-purple-600 h-1 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
        
        {renderStepContent()}
        
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          ) : (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
          )}
          
          <Button onClick={handleNext} disabled={step === 2 && selectedPlatforms.length === 0}>
            {step === totalSteps ? (
              <>
                Criar Campanha
                <CheckCircle className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ObjectiveStepProps {
  templates: CampaignTemplate[];
  onSelectTemplate: (template: CampaignTemplate) => void;
}

function ObjectiveStep({ templates, onSelectTemplate }: ObjectiveStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Escolha o objetivo principal da sua campanha:
      </p>
      
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <div 
            key={template.id}
            className="border rounded-lg p-4 cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
            onClick={() => onSelectTemplate(template)}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                {template.type === "local_visitors" ? <MapPin className="h-4 w-4" /> :
                 template.type === "delivery_orders" ? <ArrowRight className="h-4 w-4" /> :
                 template.type === "new_dish" ? <Camera className="h-4 w-4" /> :
                 <Calendar className="h-4 w-4" />}
              </div>
              <h3 className="font-medium">{template.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {template.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface PlatformsStepProps {
  selectedPlatforms: AdPlatform[];
  onTogglePlatform: (platform: AdPlatform) => void;
  templateName: string;
}

function PlatformsStep({ selectedPlatforms, onTogglePlatform, templateName }: PlatformsStepProps) {
  const platforms: {id: AdPlatform, name: string, description: string}[] = [
    { id: "google", name: "Google Ads", description: "Busca Google, Google Maps e parceiros" },
    { id: "meta", name: "Meta Ads", description: "Facebook e Instagram" },
    { id: "tiktok", name: "TikTok Ads", description: "Vídeos no TikTok" }
  ];
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-1">Objetivo: {templateName}</h3>
        <p className="text-muted-foreground">
          Selecione as plataformas onde deseja veicular sua campanha:
        </p>
      </div>
      
      <div className="space-y-3">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          return (
            <div 
              key={platform.id}
              className={`border rounded-lg p-4 cursor-pointer ${isSelected ? 'border-2 border-purple-400 bg-purple-50' : 'hover:bg-slate-50'}`}
              onClick={() => onTogglePlatform(platform.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <PlatformIcon platform={platform.id} />
                  <div>
                    <h4 className="font-medium">{platform.name}</h4>
                    <p className="text-sm text-muted-foreground">{platform.description}</p>
                  </div>
                </div>
                
                <Checkbox checked={isSelected} />
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedPlatforms.length === 0 && (
        <p className="text-sm text-orange-600">Selecione pelo menos uma plataforma para continuar.</p>
      )}
    </div>
  );
}

function RestaurantInfoStep() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-medium mb-1">Informações do Restaurante</h3>
        <p className="text-muted-foreground mb-4">
          Preencha os dados do seu restaurante para criar os anúncios:
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="restaurant-name">Nome do restaurante</Label>
          <Input id="restaurant-name" placeholder="Ex: Cantina Italiana Roma" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cuisine-type">Tipo de culinária</Label>
          <Select defaultValue="italiana">
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="italiana">Italiana</SelectItem>
              <SelectItem value="japonesa">Japonesa</SelectItem>
              <SelectItem value="brasileira">Brasileira</SelectItem>
              <SelectItem value="mexicana">Mexicana</SelectItem>
              <SelectItem value="arabe">Árabe</SelectItem>
              <SelectItem value="outra">Outra</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="restaurant-address">Endereço completo</Label>
        <Input id="restaurant-address" placeholder="Ex: Av. Paulista, 123 - Bela Vista" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="restaurant-phone">Telefone</Label>
          <Input id="restaurant-phone" placeholder="(11) 99999-9999" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="restaurant-website">Site ou página (opcional)</Label>
          <Input id="restaurant-website" placeholder="www.seurestaurante.com.br" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="restaurant-description">Descrição do restaurante</Label>
        <Textarea 
          id="restaurant-description" 
          placeholder="Descreva seu restaurante em poucas palavras..."
          className="min-h-[80px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Serviços oferecidos</Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="delivery" />
            <label htmlFor="delivery" className="text-sm">Delivery</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="takeout" />
            <label htmlFor="takeout" className="text-sm">Retirada no local</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="table-service" defaultChecked />
            <label htmlFor="table-service" className="text-sm">Atendimento na mesa</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="reservations" />
            <label htmlFor="reservations" className="text-sm">Reservas</label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Fotos do restaurante e pratos (opcional)</Label>
        <div className="border-2 border-dashed rounded-md p-6 text-center">
          <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Arraste imagens ou clique para fazer upload
          </p>
          <Button variant="outline" size="sm" className="mt-2">
            Selecionar imagens
          </Button>
        </div>
      </div>
    </div>
  );
}

function BudgetStep() {
  const [budgetOption, setBudgetOption] = useState("50");
  const [dateRange, setDateRange] = useState("continuo");
  
  const audienceEstimate = () => {
    switch (budgetOption) {
      case "25": return "1.500 - 3.000";
      case "50": return "3.000 - 7.000";
      case "100": return "7.000 - 15.000";
      case "custom": return "Estimativa personalizada";
      default: return "3.000 - 7.000";
    }
  };
  
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-medium mb-1">Orçamento e Período</h3>
        <p className="text-muted-foreground mb-4">
          Defina quanto você deseja investir e por quanto tempo:
        </p>
      </div>
      
      <div className="space-y-3">
        <Label>Orçamento diário (R$)</Label>
        <div className="grid grid-cols-4 gap-3">
          {["25", "50", "100", "custom"].map((option) => {
            const isSelected = budgetOption === option;
            const label = option === "custom" ? "Outro" : `R$ ${option}`;
            
            return (
              <div 
                key={option}
                className={`border rounded-lg p-3 text-center cursor-pointer ${isSelected ? 'border-2 border-purple-400 bg-purple-50' : 'hover:bg-slate-50'}`}
                onClick={() => setBudgetOption(option)}
              >
                <span className={`font-medium ${isSelected ? 'text-purple-600' : ''}`}>{label}</span>
              </div>
            );
          })}
        </div>
        
        {budgetOption === "custom" && (
          <div className="pt-2">
            <Input type="number" placeholder="Digite o valor personalizado" />
          </div>
        )}
        
        <div className="bg-blue-50 p-3 rounded-md text-sm mt-2">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="font-medium">Alcance estimado: {audienceEstimate()} pessoas</span>
          </div>
          <p className="text-muted-foreground">
            Este é um alcance aproximado com base no seu orçamento e segmentação geográfica.
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <Label>Período da campanha</Label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "continuo", label: "Contínuo" },
            { id: "data", label: "Período específico" }
          ].map((option) => {
            const isSelected = dateRange === option.id;
            
            return (
              <div 
                key={option.id}
                className={`border rounded-lg p-3 text-center cursor-pointer ${isSelected ? 'border-2 border-purple-400 bg-purple-50' : 'hover:bg-slate-50'}`}
                onClick={() => setDateRange(option.id)}
              >
                <span className={`font-medium ${isSelected ? 'text-purple-600' : ''}`}>{option.label}</span>
              </div>
            );
          })}
        </div>
        
        {dateRange === "data" && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-2">
              <Label htmlFor="start-date">Data de início</Label>
              <Input type="date" id="start-date" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end-date">Data de término</Label>
              <Input type="date" id="end-date" />
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <Label>Segmentação geográfica</Label>
        <div className="rounded-lg border p-3">
          <div className="flex items-center mb-3">
            <MapPin className="h-4 w-4 text-purple-600 mr-2" />
            <span className="font-medium">Raio ao redor do restaurante</span>
          </div>
          
          <Tabs defaultValue="5km">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="3km">3 km</TabsTrigger>
              <TabsTrigger value="5km">5 km</TabsTrigger>
              <TabsTrigger value="10km">10 km</TabsTrigger>
              <TabsTrigger value="custom">Outro</TabsTrigger>
            </TabsList>
            <TabsContent value="custom" className="pt-2">
              <Input type="number" placeholder="Digite o raio em km" />
            </TabsContent>
          </Tabs>
          
          <p className="text-xs text-muted-foreground mt-2">
            Recomendamos um raio de 5km para restaurantes em áreas urbanas.
          </p>
        </div>
      </div>
    </div>
  );
}

interface ReviewStepProps {
  templateName: string;
  platforms: AdPlatform[];
}

function ReviewStep({ templateName, platforms }: ReviewStepProps) {
  const renderPlatformBadges = () => {
    return platforms.map(platform => {
      const colorClass = platform === "meta" ? "bg-blue-100 text-blue-800" : 
                         platform === "google" ? "bg-red-100 text-red-800" : 
                         "bg-slate-100 text-slate-800";
                         
      const label = platform === "meta" ? "Meta Ads" : 
                   platform === "google" ? "Google Ads" : 
                   "TikTok Ads";
                   
      return (
        <div key={platform} className={`text-xs px-2 py-1 rounded-full flex items-center ${colorClass}`}>
          <PlatformIcon platform={platform} size={12} />
          <span className="ml-1">{label}</span>
        </div>
      );
    });
  };
  
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-medium mb-1">Revisar Configurações</h3>
        <p className="text-muted-foreground mb-4">
          Revise as informações da sua campanha antes de criar:
        </p>
      </div>
      
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="border-b pb-3">
            <p className="text-sm text-muted-foreground">Objetivo</p>
            <p className="font-medium">{templateName}</p>
          </div>
          
          <div className="border-b pb-3">
            <p className="text-sm text-muted-foreground">Plataformas</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {renderPlatformBadges()}
            </div>
          </div>
          
          <div className="border-b pb-3">
            <p className="text-sm text-muted-foreground">Restaurante</p>
            <div className="flex items-center justify-between mt-1">
              <p className="font-medium">Cantina Italiana Roma</p>
              <Badge variant="outline" className="text-xs">Culinária Italiana</Badge>
            </div>
            <p className="text-sm">Av. Paulista, 123 - Bela Vista</p>
          </div>
          
          <div className="border-b pb-3 grid grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Orçamento diário</p>
              <p className="font-medium">R$ 50,00</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Período</p>
              <p className="font-medium">Contínuo</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Segmentação</p>
            <div className="flex items-center mt-1">
              <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
              <p className="font-medium">Raio de 5km do restaurante</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm">
        <p>
          Ao criar sua campanha, ela passará por uma revisão automática antes de começar a ser veiculada.
          Este processo normalmente leva de 1 a 24 horas.
        </p>
      </div>
    </div>
  );
}
