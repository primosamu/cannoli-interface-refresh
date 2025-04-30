import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Facebook, Globe, TrendingUp, Plus, BarChart, Send, Store, ChevronRight } from "lucide-react";
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
import { BrandTiktok } from "lucide-react";

const CampanhasTrafegoPago = () => {
  const { toast } = useToast();
  const [isNewCampaignDialogOpen, setIsNewCampaignDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<AdPlatform | null>(null);
  const [isCreateAdDialogOpen, setIsCreateAdDialogOpen] = useState(false);
  
  const handleCreateAd = (platform: AdPlatform) => {
    setSelectedPlatform(platform);
    setIsCreateAdDialogOpen(true);
  };

  const handleNewCampaign = () => {
    setIsNewCampaignDialogOpen(true);
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
          
          <Button variant="outline" className="w-full mt-4">
            Gerenciar Google Meu Negócio
          </Button>
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
    </div>
  );
};

interface PlatformCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  stats: { label: string; value: string }[];
  onCreateAd: () => void;
  bgColorClass: string;
}

const PlatformCard = ({ title, icon, description, stats, onCreateAd, bgColorClass }: PlatformCardProps) => {
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
        <Button variant="outline" className="w-full mt-4" onClick={onCreateAd}>
          Criar Anúncio
        </Button>
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
                                <BrandTiktok className="h-5 w-5" />;
                              
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

export default CampanhasTrafegoPago;
