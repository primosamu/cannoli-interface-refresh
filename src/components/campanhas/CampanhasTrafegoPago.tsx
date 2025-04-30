import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Facebook, Globe, TrendingUp, Plus, BarChart, Send, Store, ChevronRight, Eye, FileText, Save, Folder } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AdCampaignType, AdCreative, AdPlatform } from "@/types/campaign";

const CampanhasTrafegoPago = () => {
  const { toast } = useToast();
  const [isNewCampaignDialogOpen, setIsNewCampaignDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<AdPlatform | null>(null);
  const [isCreateAdDialogOpen, setIsCreateAdDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [previewPlatform, setPreviewPlatform] = useState<AdPlatform | null>(null);
  const [previewType, setPreviewType] = useState<string>("");
  
  const handleCreateAd = (platform: AdPlatform) => {
    setSelectedPlatform(platform);
    setIsCreateAdDialogOpen(true);
  };

  const handleNewCampaign = () => {
    setIsNewCampaignDialogOpen(true);
  };
  
  const handlePreviewAd = (platform: AdPlatform) => {
    setPreviewPlatform(platform);
    
    // Set default preview type based on platform
    switch (platform) {
      case "meta":
        setPreviewType("feed");
        break;
      case "google":
        setPreviewType("search");
        break;
      case "tiktok":
        setPreviewType("feed");
        break;
      default:
        setPreviewType("feed");
    }
    
    setIsPreviewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Criação e gestão de anúncios pagos</h3>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleCreateAd("meta")}>
            <Plus className="h-4 w-4 mr-2" />
            Criar Anúncio
          </Button>
          <Button onClick={handleNewCampaign}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Campanha
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <PlatformCard
          title="Meta Ads"
          icon={<Facebook className="h-5 w-5 text-blue-600" />}
          description="Anuncie no Facebook, Instagram e WhatsApp"
          stats={[
            { label: "ROI médio", value: "3.5x" },
            { label: "CPC médio", value: "R$ 0,45" }
          ]}
          onCreateAd={() => handleCreateAd("meta")}
          onPreviewAd={() => handlePreviewAd("meta")}
          bgColorClass="bg-blue-100"
        />

        <PlatformCard
          title="Google Ads"
          icon={<Globe className="h-5 w-5 text-red-600" />}
          description="Anuncie no Google Search, Display e YouTube"
          stats={[
            { label: "ROI médio", value: "4.2x" },
            { label: "CPC médio", value: "R$ 0,85" }
          ]}
          onCreateAd={() => handleCreateAd("google")}
          onPreviewAd={() => handlePreviewAd("google")}
          bgColorClass="bg-red-100"
        />

        <PlatformCard
          title="TikTok Ads"
          icon={<Target className="h-5 w-5 text-black" />}
          description="Anuncie no TikTok com vídeos engajantes"
          stats={[
            { label: "Engajamento médio", value: "5.7%" },
            { label: "CPM médio", value: "R$ 3,20" }
          ]}
          onCreateAd={() => handleCreateAd("tiktok")}
          onPreviewAd={() => handlePreviewAd("tiktok")}
          bgColorClass="bg-gray-100"
        />
      </div>

      {/* Google My Business Section */}
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-full">
              <Store className="h-5 w-5 text-green-600" />
            </div>
            Google Meu Negócio
          </CardTitle>
          <CardDescription>
            Gerencie sua presença local e promova seu negócio no Google Maps e na Pesquisa Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
              <div>
                <h4 className="font-medium">Atualizar Informações do Negócio</h4>
                <p className="text-sm text-muted-foreground">Mantenha seu perfil atualizado com horários, fotos e informações de contato</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
              <div>
                <h4 className="font-medium">Gerenciar Avaliações</h4>
                <p className="text-sm text-muted-foreground">Responda a avaliações e melhore sua reputação online</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
              <div>
                <h4 className="font-medium">Posts e Promoções</h4>
                <p className="text-sm text-muted-foreground">Crie posts e promoções para destacar seu negócio nas buscas locais</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="flex mt-4 space-x-2">
            <Button variant="outline" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              Visualizar Perfil
            </Button>
            <Button variant="outline" className="flex-1">
              Gerenciar GMB
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Section */}
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="bg-purple-100 p-2 rounded-full">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            Relatórios de Desempenho
          </CardTitle>
          <CardDescription>
            Acompanhe o desempenho das suas campanhas de anúncios pagos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
              <div>
                <h4 className="font-medium">Desempenho por plataforma</h4>
                <p className="text-sm text-muted-foreground">Compare o desempenho em todas as plataformas de anúncios</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
              <div>
                <h4 className="font-medium">Análise de conversões</h4>
                <p className="text-sm text-muted-foreground">Veja quantas conversões cada campanha está gerando</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
              <div>
                <h4 className="font-medium">ROI por campanha</h4>
                <p className="text-sm text-muted-foreground">Analise o retorno sobre investimento de suas campanhas</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            <FileText className="h-4 w-4 mr-2" />
            Ver todos os relatórios
          </Button>
        </CardContent>
      </Card>

      {/* Saved Campaigns Section */}
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="bg-amber-100 p-2 rounded-full">
              <Folder className="h-5 w-5 text-amber-600" />
            </div>
            Campanhas Salvas
          </CardTitle>
          <CardDescription>
            Acesse suas campanhas salvas e modelos de anúncios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
              <div>
                <h4 className="font-medium">Black Friday 2024</h4>
                <p className="text-sm text-muted-foreground">Campanha integrada - Meta, Google</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Rascunho</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
              <div>
                <h4 className="font-medium">Lançamento de Verão</h4>
                <p className="text-sm text-muted-foreground">Campanha TikTok</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Agendada</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
              <div>
                <h4 className="font-medium">Promoção Mensal</h4>
                <p className="text-sm text-muted-foreground">Campanha integrada - Meta, Google, TikTok</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Ativa</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="flex mt-4 space-x-2">
            <Button variant="outline" className="flex-1">
              <Folder className="h-4 w-4 mr-2" />
              Ver todas as campanhas
            </Button>
            <Button variant="outline" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Modelos salvos
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          Analytics e Otimização
        </h4>
        <p className="text-sm text-muted-foreground">
          Acompanhe o desempenho de suas campanhas em tempo real, visualize métricas como CTR, 
          conversões e ROI para otimizar seus anúncios e aumentar o retorno sobre investimento.
        </p>
        <Button variant="link" className="p-0 h-auto mt-2">
          Ver painel de análise
        </Button>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 border">
        <h4 className="font-medium">Campanhas ativas</h4>
        <p className="text-sm text-muted-foreground">Você ainda não possui campanhas de tráfego pago ativas. Crie sua primeira campanha agora!</p>
      </div>

      {/* Create Ad Dialog */}
      <CreateAdDialog 
        open={isCreateAdDialogOpen} 
        onOpenChange={setIsCreateAdDialogOpen}
        platform={selectedPlatform}
      />

      {/* New Campaign Dialog */}
      <NewCampaignDialog
        open={isNewCampaignDialogOpen}
        onOpenChange={setIsNewCampaignDialogOpen}
      />
      
      {/* Ad Preview Dialog */}
      <AdPreviewDialog
        open={isPreviewDialogOpen}
        onOpenChange={setIsPreviewDialogOpen}
        platform={previewPlatform}
        previewType={previewType}
        setPreviewType={setPreviewType}
      />
    </div>
  );
};

interface PlatformCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  stats: { label: string; value: string }[];
  onCreateAd: () => void;
  onPreviewAd: () => void;
  bgColorClass: string;
}

const PlatformCard = ({ title, icon, description, stats, onCreateAd, onPreviewAd, bgColorClass }: PlatformCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className={`${bgColorClass} p-2 rounded-full`}>
            {icon}
          </div>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {stats.map((stat, index) => (
            <div key={index} className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{stat.value}</span> {stat.label}
            </div>
          ))}
        </div>
        <div className="flex mt-4 space-x-2">
          <Button variant="outline" className="flex-1" onClick={onPreviewAd}>
            <Eye className="h-4 w-4 mr-2" />
            Visualizar
          </Button>
          <Button variant="outline" className="flex-1" onClick={onCreateAd}>
            <Plus className="h-4 w-4 mr-2" />
            Criar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface CreateAdDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platform: AdPlatform | null;
}

const adFormSchema = z.object({
  adName: z.string().min(2, {
    message: "Nome do anúncio deve ter pelo menos 2 caracteres.",
  }),
  adType: z.string({
    required_error: "Selecione um tipo de anúncio.",
  }),
  objective: z.string({
    required_error: "Selecione um objetivo.",
  }),
  headline: z.string().min(5, {
    message: "Título deve ter pelo menos 5 caracteres.",
  }),
  description: z.string().min(10, {
    message: "Descrição deve ter pelo menos 10 caracteres.",
  }),
  budget: z.coerce.number().positive({
    message: "O orçamento deve ser um número positivo.",
  }),
});

const CreateAdDialog = ({ open, onOpenChange, platform }: CreateAdDialogProps) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof adFormSchema>>({
    resolver: zodResolver(adFormSchema),
    defaultValues: {
      adName: "",
      headline: "",
      description: "",
      budget: 50,
    },
  });

  function onSubmit(values: z.infer<typeof adFormSchema>) {
    toast({
      title: "Anúncio criado com sucesso",
      description: `Plataforma: ${platform}, Nome: ${values.adName}`,
    });
    onOpenChange(false);
    form.reset();
  }

  // Platform-specific ad types
  let adTypes: {value: string, label: string}[] = [];
  let objectives: {value: string, label: string}[] = [];
  
  switch (platform) {
    case "meta":
      adTypes = [
        { value: "image", label: "Imagem" },
        { value: "video", label: "Vídeo" },
        { value: "carousel", label: "Carrossel" },
        { value: "collection", label: "Coleção" }
      ];
      objectives = [
        { value: "awareness", label: "Reconhecimento" },
        { value: "consideration", label: "Consideração" },
        { value: "conversions", label: "Conversões" }
      ];
      break;
    case "google":
      adTypes = [
        { value: "search", label: "Pesquisa" },
        { value: "display", label: "Display" },
        { value: "video", label: "Vídeo (YouTube)" },
        { value: "shopping", label: "Shopping" }
      ];
      objectives = [
        { value: "sales", label: "Vendas" },
        { value: "leads", label: "Leads" },
        { value: "website_traffic", label: "Tráfego para o site" },
        { value: "product_and_brand_consideration", label: "Consideração de produto e marca" },
        { value: "brand_awareness_reach", label: "Alcance e reconhecimento da marca" }
      ];
      break;
    case "tiktok":
      adTypes = [
        { value: "in_feed", label: "In-Feed" },
        { value: "top_view", label: "TopView" },
        { value: "branded_hashtag", label: "Hashtag de Marca" },
        { value: "branded_effect", label: "Efeito de Marca" }
      ];
      objectives = [
        { value: "reach", label: "Alcance" },
        { value: "video_views", label: "Visualizações de vídeo" },
        { value: "traffic", label: "Tráfego" },
        { value: "conversions", label: "Conversões" },
        { value: "app_installs", label: "Instalações de aplicativo" }
      ];
      break;
    default:
      adTypes = [];
      objectives = [];
  }
  
  const platformDisplayName = platform === "meta" ? "Meta" : platform === "google" ? "Google" : "TikTok";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar Anúncio - {platformDisplayName}</DialogTitle>
          <DialogDescription>
            Configure seu anúncio para a plataforma {platformDisplayName}. Preencha as informações básicas para começar.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="adName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do anúncio</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do seu anúncio" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este nome será usado para identificar seu anúncio.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="adType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de anúncio</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {adTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="objective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objetivo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o objetivo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {objectives.map((objective) => (
                          <SelectItem key={objective.value} value={objective.value}>
                            {objective.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do anúncio</FormLabel>
                  <FormControl>
                    <Input placeholder="Título atraente para seu anúncio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva seu produto ou serviço" 
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orçamento diário (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Valor máximo a ser gasto por dia.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Criar anúncio</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

// New Campaign Schema
const campaignFormSchema = z.object({
  name: z.string().min(2, {
    message: "Nome da campanha deve ter pelo menos 2 caracteres.",
  }),
  objective: z.string({
    required_error: "Selecione um objetivo.",
  }),
  platforms: z.array(z.string()).min(1, {
    message: "Selecione pelo menos uma plataforma.",
  }),
  budget: z.coerce.number().positive({
    message: "O orçamento deve ser um número positivo.",
  }),
  startDate: z.date(),
  endDate: z.date().optional(),
  targetAudience: z.string().min(2, {
    message: "Descreva seu público-alvo.",
  }),
});

interface NewCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewCampaignDialog = ({ open, onOpenChange }: NewCampaignDialogProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  
  const form = useForm<z.infer<typeof campaignFormSchema>>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: "",
      budget: 100,
      platforms: [],
      startDate: new Date(),
      targetAudience: "",
    },
  });

  function onSubmit(values: z.infer<typeof campaignFormSchema>) {
    toast({
      title: "Campanha criada com sucesso",
      description: `Nome: ${values.name}, Orçamento: R$${values.budget}`,
    });
    onOpenChange(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Nova Campanha de Tráfego Pago</DialogTitle>
          <DialogDescription>
            Configure sua campanha integrada entre múltiplas plataformas de anúncios.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="targeting">Segmentação</TabsTrigger>
            <TabsTrigger value="budget">Orçamento</TabsTrigger>
            <TabsTrigger value="creative">Criativos</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <TabsContent value="general" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da campanha</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da sua campanha" {...field} />
                      </FormControl>
                      <FormDescription>
                        Este nome será usado para identificar sua campanha.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="objective"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objetivo da campanha</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o objetivo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="awareness">Reconhecimento de marca</SelectItem>
                          <SelectItem value="traffic">Tráfego</SelectItem>
                          <SelectItem value="engagement">Engajamento</SelectItem>
                          <SelectItem value="leads">Geração de leads</SelectItem>
                          <SelectItem value="conversions">Conversões</SelectItem>
                          <SelectItem value="sales">Vendas</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Isso ajudará a otimizar sua campanha para os melhores resultados.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-2">
                  <Button type="button" onClick={() => setActiveTab("targeting")}>
                    Próximo
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="targeting" className="space-y-4">
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição do público-alvo</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva quem você quer alcançar com esta campanha" 
                          className="resize-none min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-2 flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("general")}>
                    Anterior
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("budget")}>
                    Próximo
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="budget" className="space-y-4">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Orçamento total da campanha (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Orçamento total para todas as plataformas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-2 flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("targeting")}>
                    Anterior
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("creative")}>
                    Próximo
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="creative" className="space-y-4">
                <FormField
                  control={form.control}
                  name="platforms"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Plataformas de anúncios</FormLabel>
                        <FormDescription>
                          Selecione as plataformas onde sua campanha será veiculada
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {["meta", "google", "tiktok"].map((platform) => (
                          <FormField
                            key={platform}
                            control={form.control}
                            name="platforms"
                            render={({ field }) => {
                              const platformLabel = 
                                platform === "meta" ? "Meta Ads" : 
                                platform === "google" ? "Google Ads" : "TikTok";
                              
                              const platformIcon = 
                                platform === "meta" ? <Facebook className="h-5 w-5" /> : 
                                platform === "google" ? <Globe className="h-5 w-5" /> : 
                                <Target className="h-5 w-5" />;
                              
                              return (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <input
                                      type="checkbox"
                                      className="h-4 w-4 mt-1"
                                      checked={field.value?.includes(platform)}
                                      onChange={(event) => {
                                        const checked = event.target.checked;
                                        const currentValue = [...(field.value || [])];
                                        
                                        if (checked) {
                                          field.onChange([...currentValue, platform]);
                                        } else {
                                          field.onChange(
                                            currentValue.filter((value) => value !== platform)
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <div className="flex items-center">
                                      {platformIcon}
                                      <FormLabel className="ml-2">
                                        {platformLabel}
                                      </FormLabel>
                                    </div>
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4 flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("budget")}>
                    Anterior
                  </Button>
                  <Button type="submit">Criar campanha</Button>
                </div>
              </TabsContent>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

interface AdPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platform: AdPlatform | null;
  previewType: string;
  setPreviewType: (type: string) => void;
}

const AdPreviewDialog = ({ open, onOpenChange, platform, previewType, setPreviewType }: AdPreviewDialogProps) => {
  if (!platform) return null;
  
  const platformDisplayName = platform === "meta" ? "Meta" : platform === "google" ? "Google" : "TikTok";
  
  // Preview type options based on platform
  let previewTypes: {value: string, label: string}[] = [];
  
  switch (platform) {
    case "meta":
      previewTypes = [
        { value: "feed", label: "Feed do Facebook" },
        { value: "instagram", label: "Feed do Instagram" },
        { value: "stories", label: "Stories" },
        { value: "reels", label: "Reels" }
      ];
      break;
    case "google":
      previewTypes = [
        { value: "search", label: "Pesquisa Google" },
        { value: "display", label: "Rede de Display" },
        { value: "youtube", label: "YouTube" },
        { value: "discovery", label: "Discovery" }
      ];
      break;
    case "tiktok":
      previewTypes = [
        { value: "feed", label: "Feed do TikTok" },
        { value: "topview", label: "TopView" },
        { value: "pangle", label: "Pangle" }
      ];
      break;
    default:
      previewTypes = [];
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Visualização de Anúncios - {platformDisplayName}</DialogTitle>
          <DialogDescription>
            Veja como seus anúncios aparecerão nos diferentes formatos da plataforma {platformDisplayName}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex gap-2 flex-wrap">
            {previewTypes.map((type) => (
              <Button
                key={type.value}
                variant={previewType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewType(type.value)}
              >
                {type.label}
              </Button>
            ))}
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-slate-100 p-2 text-sm font-medium border-b">
              {previewTypes.find(t => t.value === previewType)?.label || "Visualização"}
            </div>
            
            <div className="p-4">
              {platform === "meta" && (
                <div className="space-y-4">
                  {previewType === "feed" && (
                    <div className="bg-white border rounded-md p-3 max-w-md mx-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-full"></div>
                        <div>
                          <div className="font-medium">Nome da sua empresa</div>
                          <div className="text-xs text-slate-500">Patrocinado</div>
                        </div>
                      </div>
                      <div className="text-sm mb-2">Título atraente do seu anúncio que descreve seu produto ou serviço.</div>
                      <div className="aspect-video bg-slate-200 rounded flex items-center justify-center mb-2">
                        <span className="text-sm text-slate-500">Imagem/Vídeo do anúncio</span>
                      </div>
                      <div className="text-sm font-medium">Nome da sua empresa</div>
                      <div className="text-sm text-slate-700 mb-2">Descrição detalhada do seu produto ou serviço, destacando benefícios e chamada para ação.</div>
                      <button className="text-sm bg-blue-500 text-white w-full py-1.5 rounded font-medium">Botão de CTA</button>
                    </div>
                  )}
                  
                  {previewType === "instagram" && (
                    <div className="bg-white border rounded-md p-3 max-w-md mx-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <div className="font-medium">sua_empresa</div>
                        <div className="ml-auto text-xs text-blue-500">Patrocinado</div>
                      </div>
                      <div className="aspect-square bg-slate-200 rounded flex items-center justify-center mb-2">
                        <span className="text-sm text-slate-500">Imagem/Vídeo do anúncio</span>
                      </div>
                      <div className="flex items-center gap-3 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">sua_empresa</span> Texto do seu anúncio com chamada para ação e descrição do produto.
                      </div>
                      <button className="text-sm bg-blue-500 text-white w-full py-1.5 rounded font-medium mt-2">Comprar agora</button>
                    </div>
                  )}
                  
                  {(previewType === "stories" || previewType === "reels") && (
                    <div className="bg-gradient-to-b from-slate-200 to-slate-300 aspect-[9/16] w-64 mx-auto rounded-lg flex flex-col">
                      <div className="flex-1 flex items-center justify-center">
                        <span className="text-sm text-slate-500">Conteúdo do {previewType === "stories" ? "Story" : "Reel"}</span>
                      </div>
                      <div className="bg-white bg-opacity-80 p-3 rounded-b-lg">
                        <div className="text-sm font-medium mb-1">Título do anúncio</div>
                        <div className="text-xs mb-2">Breve descrição do produto ou serviço</div>
                        <button className="text-xs bg-blue-500 text-white w-full py-1.5 rounded font-medium">Saiba mais</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {platform === "google" && (
                <div className="space-y-4">
                  {previewType === "search" && (
                    <div className="max-w-2xl mx-auto">
                      <div className="mb-4">
                        <div className="w-full h-10 bg-white border rounded p-2 flex items-center">
                          <span className="text-sm text-slate-400">pesquisa relacionada ao seu negócio</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                      </div>
                      
                      <div className="border-b pb-2">
                        <div className="flex items-center text-xs text-green-700 mb-1">
                          <span>Anúncio</span>
                          <span className="mx-1">·</span>
                          <span>www.suaempresa.com.br</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                        <div className="text-blue-800 text-lg font-medium">Título Principal do Seu Anúncio | Frase Secundária</div>
                        <div className="text-slate-600 text-sm">
                          Descrição do seu anúncio que destaca os principais benefícios do seu produto ou serviço. Inclua uma chamada para ação clara.
                        </div>
                        <div className="mt-1 flex flex-wrap gap-2">
                          <div className="text-xs text-blue-800 border p-1 px-2 rounded-full">Link adicional 1</div>
                          <div className="text-xs text-blue-800 border p-1 px-2 rounded-full">Link adicional 2</div>
                          <div className="text-xs text-blue-800 border p-1 px-2 rounded-full">Link adicional 3</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {previewType === "display" && (
                    <div className="flex justify-center">
                      <div className="border rounded overflow-hidden w-[336px]">
                        <div className="aspect-[2/1] bg-slate-200 flex items-center justify-center">
                          <span className="text-sm text-slate-500">Banner do anúncio (336x168)</span>
                        </div>
                        <div className="p-2 bg-white">
                          <div className="text-sm font-medium mb-1 text-blue-700">Título do anúncio</div>
                          <div className="text-xs text-slate-600 mb-2">Breve descrição do seu produto ou serviço</div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-green-700">suaempresa.com</div>
                            <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded">CTA</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {previewType === "youtube" && (
                    <div className="max-w-xl mx-auto">
                      <div className="aspect-video bg-slate-800 rounded-t-lg flex items-center justify-center">
                        <span className="text-white">Vídeo do anúncio</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-b-lg border">
                        <div className="text-sm font-medium mb-1">Título do anúncio no YouTube</div>
                        <div className="flex items-center text-xs text-slate-500 mb-2">
                          <span>Nome da empresa</span>
                          <span className="mx-1">·</span>
                          <span>Anúncio</span>
                        </div>
                        <div className="text-xs mb-2">Descrição do anúncio que irá aparecer junto ao vídeo no YouTube</div>
                        <button className="text-xs bg-blue-500 text-white px-4 py-1 rounded">Saiba mais</button>
                      </div>
                    </div>
                  )}
                  
                  {previewType === "discovery" && (
                    <div className="max-w-md mx-auto">
                      <div className="border rounded overflow-hidden">
                        <div className="aspect-[4/3] bg-slate-200 flex items-center justify-center">
                          <span className="text-sm text-slate-500">Imagem principal</span>
                        </div>
                        <div className="p-3">
                          <div className="text-xs text-slate-500 mb-1">Nome da empresa · Anúncio</div>
                          <div className="text-base font-medium mb-1">Título do anúncio Discovery</div>
                          <div className="text-sm text-slate-700 mb-2">Descrição do produto ou serviço que aparecerá no anúncio Discovery do Google</div>
                          <div className="text-xs text-slate-500">www.suaempresa.com.br</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {platform === "tiktok" && (
                <div className="space-y-4">
                  {previewType === "feed" && (
                    <div className="bg-black text-white w-[250px] mx-auto rounded-lg overflow-hidden">
                      <div className="aspect-[9/16] bg-slate-800 flex items-center justify-center">
                        <span className="text-sm text-slate-400">Vídeo do TikTok</span>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                          <div>
                            <div className="text-sm font-medium">@sua_empresa</div>
                            <div className="text-xs text-slate-400">Nome da empresa</div>
                          </div>
                          <button className="ml-auto bg-[#FE2C55] text-white text-xs rounded px-4 py-1">Seguir</button>
                        </div>
                        <div className="text-sm mb-2">Descrição do seu vídeo com #hashtags e chamada para ação.</div>
                        <div className="flex items-center gap-2 text-xs">
                          <span>♫ Som original - Sua Empresa</span>
                          <span className="ml-auto">patrocinado</span>
                        </div>
                        <button className="mt-2 bg-white text-black text-sm w-full py-1.5 rounded font-medium">Saiba mais</button>
                      </div>
                    </div>
                  )}
                  
                  {previewType === "topview" && (
                    <div className="bg-black text-white w-[250px] mx-auto rounded-lg overflow-hidden">
                      <div className="aspect-[9/16] bg-slate-800 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-sm text-slate-400 block">Vídeo TopView</span>
                          <span className="text-xs text-slate-500 block">(Tela cheia ao abrir o app)</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                          <div>
                            <div className="text-sm font-medium">@sua_empresa</div>
                          </div>
                          <button className="ml-auto bg-[#FE2C55] text-white text-xs rounded px-4 py-1">Seguir</button>
                        </div>
                        <div className="text-sm mb-2">Descrição do seu TopView com #hashtags.</div>
                        <button className="mt-2 bg-white text-black text-sm w-full py-1.5 rounded font-medium">Saiba mais</button>
                      </div>
                    </div>
                  )}
                  
                  {previewType === "pangle" && (
                    <div className="bg-white border w-[300px] mx-auto rounded-lg overflow-hidden">
                      <div className="aspect-[16/9] bg-slate-200 flex items-center justify-center">
                        <span className="text-sm text-slate-500">Imagem/Vídeo do anúncio</span>
                      </div>
                      <div className="p-3">
                        <div className="text-xs text-slate-500 mb-1">Anúncio</div>
                        <div className="text-base font-medium mb-1">Título do anúncio Pangle</div>
                        <div className="text-sm text-slate-700 mb-2">Descrição curta do produto ou serviço</div>
                        <button className="text-sm bg-blue-500 text-white w-full py-1 rounded font-medium">Instalar agora</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="text-sm text-slate-500 bg-amber-50 border border-amber-200 rounded p-3">
            Esta é uma visualização aproximada de como seu anúncio pode aparecer. A aparência real pode variar dependendo dos dispositivos, plataformas e outros fatores.
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CampanhasTrafegoPago;
