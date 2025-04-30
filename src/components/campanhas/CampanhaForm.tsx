import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, MessageSquare, Mail, Phone, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Campaign, CampaignChannel, CustomerSegment, WhatsAppMessageType } from "@/types/campaign";

// Mock customer segments
const customerSegments: CustomerSegment[] = [
  {
    id: "seg-1",
    name: "Todos os clientes",
    description: "Todos os clientes cadastrados",
    customerCount: 2500
  },
  {
    id: "seg-2",
    name: "Clientes VIP",
    description: "Clientes com alto valor de compra",
    customerCount: 350
  },
  {
    id: "seg-3",
    name: "Clientes inativos",
    description: "Clientes sem compras nos últimos 30 dias",
    customerCount: 1200
  },
  {
    id: "seg-4",
    name: "Novos clientes",
    description: "Clientes que fizeram a primeira compra nos últimos 15 dias",
    customerCount: 180
  },
  {
    id: "seg-5",
    name: "Aniversariantes do mês",
    description: "Clientes que fazem aniversário este mês",
    customerCount: 75
  }
];

// Mock predefined campaigns
const predefinedCampaignTemplates: Record<string, Partial<Campaign>> = {
  "sentimos-sua-falta": {
    name: "Sentimos sua falta",
    channel: "whatsapp",
    whatsappType: "marketing",
    content: "Olá, {{nome}}! Sentimos sua falta no restaurante. Já faz um tempo desde sua última visita e gostaríamos de te ver novamente. Que tal aproveitar um cupom de 15% de desconto na sua próxima refeição? Válido por 7 dias. Esperamos você!",
    segment: customerSegments[2],
    incentive: {
      type: "coupon",
      couponId: "auto-generated"
    }
  },
  "volte-para-nos": {
    name: "Volte para nós",
    channel: "whatsapp",
    whatsappType: "marketing",
    content: "Olá, {{nome}}! Estamos com saudades! Como incentivo para você voltar a nos visitar, preparamos um cupom especial de 20% de desconto em qualquer prato do cardápio. Válido por 5 dias. Esperamos você em breve!",
    segment: customerSegments[2],
    incentive: {
      type: "coupon",
      couponId: "auto-generated"
    }
  },
  "terca-da-pizza": {
    name: "Terça da Pizza",
    channel: "whatsapp",
    whatsappType: "marketing",
    content: "Olá, {{nome}}! Hoje é TERÇA DA PIZZA! 🍕 Todas as pizzas com 30% de desconto. Válido apenas hoje para delivery ou retirada. Faça seu pedido pelo WhatsApp ou pelo nosso app. Bom apetite!",
    segment: customerSegments[0],
    incentive: {
      type: "none"
    }
  },
  "quinta-do-hamburguer": {
    name: "Quinta do Hambúrguer",
    channel: "whatsapp",
    whatsappType: "marketing",
    content: "Olá, {{nome}}! Hoje é QUINTA DO HAMBÚRGUER! 🍔 Todos os hambúrgueres com 25% de desconto. Válido apenas hoje para delivery ou retirada. Faça seu pedido pelo WhatsApp ou pelo nosso app. Bom apetite!",
    segment: customerSegments[0],
    incentive: {
      type: "none"
    }
  }
};

// Mock recent campaigns
const recentCampaignsMock: Campaign[] = [
  {
    id: "camp-1",
    name: "Promoção de Fim de Semana",
    segment: customerSegments[0],
    incentive: {
      type: "coupon",
      couponId: "cpn-123"
    },
    channel: "whatsapp",
    whatsappType: "marketing",
    content: "Olá! Aproveite nossa promoção de fim de semana: 20% de desconto em todos os pratos!",
    status: "completed",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "camp-2",
    name: "Lançamento Novo Cardápio",
    segment: customerSegments[1],
    incentive: {
      type: "none"
    },
    channel: "email",
    content: "Prezado cliente VIP, temos o prazer de apresentar nosso novo cardápio com pratos exclusivos!",
    imageUrl: "https://example.com/menu.jpg",
    status: "active",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Keep track of recent campaigns
let recentCampaigns = [...recentCampaignsMock];

// Function to get recent campaigns (used by other components)
export const getRecentCampaigns = () => recentCampaigns;

// Form schema
const formSchema = z.object({
  name: z.string().min(3, {
    message: "O nome da campanha deve ter pelo menos 3 caracteres.",
  }),
  channel: z.enum(["whatsapp", "email", "sms"] as const),
  whatsappType: z.enum(["utility", "marketing"] as const).optional(),
  segmentId: z.string({
    required_error: "Por favor selecione um segmento de clientes.",
  }),
  content: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }),
  incentiveType: z.enum(["none", "coupon", "loyalty"] as const),
  imageUrl: z.string().optional(),
  scheduleDate: z.date().optional(),
  scheduleTime: z.string().optional(),
  saveAsTemplate: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface CampanhaFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  predefinedCampaignId?: string;
  campaignToEdit?: Campaign;
  selectedChannel?: string;
  campaignType?: string;
}

const CampanhaForm = ({
  open,
  onOpenChange,
  predefinedCampaignId,
  campaignToEdit,
  selectedChannel,
  campaignType
}: CampanhaFormProps) => {
  const { toast } = useToast();
  const [isScheduled, setIsScheduled] = useState(false);
  const [previewChannel, setPreviewChannel] = useState<CampaignChannel>("whatsapp");

  // Initialize form with default values or values from predefined campaign/edit
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      channel: "whatsapp",
      whatsappType: "marketing",
      segmentId: "",
      content: "",
      incentiveType: "none",
      imageUrl: "",
      saveAsTemplate: false,
    },
  });

  // Update form values when predefinedCampaignId, campaignToEdit, selectedChannel, or campaignType changes
  useEffect(() => {
    if (predefinedCampaignId && predefinedCampaignTemplates[predefinedCampaignId]) {
      const template = predefinedCampaignTemplates[predefinedCampaignId];
      
      form.reset({
        name: template.name || "",
        channel: template.channel || "whatsapp",
        whatsappType: template.whatsappType || "marketing",
        segmentId: template.segment?.id || "",
        content: template.content || "",
        incentiveType: template.incentive?.type || "none",
        imageUrl: template.imageUrl || "",
        saveAsTemplate: false,
      });
      
      setPreviewChannel(template.channel || "whatsapp");
    } else if (campaignToEdit) {
      form.reset({
        name: campaignToEdit.name,
        channel: campaignToEdit.channel,
        whatsappType: campaignToEdit.whatsappType || "marketing",
        segmentId: campaignToEdit.segment.id,
        content: campaignToEdit.content,
        incentiveType: campaignToEdit.incentive.type,
        imageUrl: campaignToEdit.imageUrl || "",
        saveAsTemplate: false,
      });
      
      setPreviewChannel(campaignToEdit.channel);
      
      if (campaignToEdit.scheduledAt) {
        setIsScheduled(true);
        const scheduledDate = new Date(campaignToEdit.scheduledAt);
        form.setValue("scheduleDate", scheduledDate);
        form.setValue("scheduleTime", format(scheduledDate, "HH:mm"));
      }
    } else if (selectedChannel) {
      // Set form values based on selected channel and campaign type
      let defaultContent = "";
      let defaultName = "";
      
      if (campaignType) {
        switch (campaignType) {
          case "promotion":
            defaultName = "Promoção Especial";
            defaultContent = "Olá! Temos uma promoção especial para você: [DETALHE DA PROMOÇÃO]. Válido até [DATA]. Aproveite!";
            break;
          case "news":
            defaultName = "Novidade no Cardápio";
            defaultContent = "Olá! Temos novidades no cardápio! Conheça nosso novo prato: [NOME DO PRATO]. Venha experimentar!";
            break;
          case "reminder":
            defaultName = "Lembrete de Reserva";
            defaultContent = "Olá! Apenas confirmando sua reserva para [DATA/HORA]. Estamos ansiosos para recebê-lo!";
            break;
          case "newsletter":
            defaultName = "Newsletter Semanal";
            defaultContent = "Olá! Confira as novidades da semana em nosso restaurante:\n\n- [NOVIDADE 1]\n- [NOVIDADE 2]\n- [NOVIDADE 3]\n\nEsperamos você!";
            break;
          case "event":
            defaultName = "Evento Especial";
            defaultContent = "Olá! Convidamos você para nosso evento especial: [NOME DO EVENTO] no dia [DATA/HORA]. Não perca!";
            break;
          case "loyalty":
            defaultName = "Programa de Fidelidade";
            defaultContent = "Olá! Você já conhece nosso programa de fidelidade? A cada [X] pedidos, você ganha [BENEFÍCIO]. Participe!";
            break;
          case "urgent":
            defaultName = "Promoção Relâmpago";
            defaultContent = "HOJE! [NOME DA PROMOÇÃO] com [DESCONTO]% de desconto. Válido apenas hoje! Aproveite!";
            break;
          case "confirmation":
            defaultName = "Confirmação de Pedido";
            defaultContent = "Seu pedido #[NÚMERO] foi confirmado! Previsão de entrega: [TEMPO]. Obrigado pela preferência!";
            break;
          default:
            break;
        }
      }
      
      form.reset({
        name: defaultName,
        channel: selectedChannel as CampaignChannel,
        whatsappType: selectedChannel === "whatsapp" ? "marketing" : undefined,
        segmentId: customerSegments[0].id,
        content: defaultContent,
        incentiveType: "none",
        imageUrl: "",
        saveAsTemplate: false,
      });
      
      setPreviewChannel(selectedChannel as CampaignChannel);
    }
  }, [predefinedCampaignId, campaignToEdit, selectedChannel, campaignType, form]);

  // Helper function to safely replace placeholders in message content
  const getPreviewText = (content: string): string => {
    if (!content) return "";
    // Safely replace placeholders to prevent TypeScript errors
    return content.replace(/\{\{nome\}\}/g, "Cliente");
  };

  // Handle channel change
  const handleChannelChange = (value: string) => {
    form.setValue("channel", value as CampaignChannel);
    setPreviewChannel(value as CampaignChannel);
    
    // Reset WhatsApp type if channel is not WhatsApp
    if (value !== "whatsapp") {
      form.setValue("whatsappType", undefined);
    } else {
      form.setValue("whatsappType", "marketing");
    }
  };

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    // Find selected segment
    const selectedSegment = customerSegments.find(seg => seg.id === data.segmentId);
    
    if (!selectedSegment) {
      toast({
        title: "Erro",
        description: "Segmento de clientes não encontrado.",
        variant: "destructive",
      });
      return;
    }
    
    // Create campaign object
    const newCampaign: Campaign = {
      id: campaignToEdit?.id || `camp-${Date.now()}`,
      name: data.name,
      segment: selectedSegment,
      incentive: {
        type: data.incentiveType,
        couponId: data.incentiveType === "coupon" ? `cpn-${Date.now()}` : undefined,
        loyaltyPoints: data.incentiveType === "loyalty" ? 10 : undefined,
      },
      channel: data.channel,
      whatsappType: data.channel === "whatsapp" ? data.whatsappType : undefined,
      content: data.content,
      imageUrl: data.imageUrl,
      status: isScheduled ? "scheduled" : "active",
      createdAt: campaignToEdit?.createdAt || new Date().toISOString(),
      scheduledAt: isScheduled && data.scheduleDate ? 
        (() => {
          const date = new Date(data.scheduleDate);
          if (data.scheduleTime) {
            const [hours, minutes] = data.scheduleTime.split(':').map(Number);
            date.setHours(hours, minutes);
          }
          return date.toISOString();
        })() : undefined,
    };
    
    // Save campaign
    if (campaignToEdit) {
      // Update existing campaign
      recentCampaigns = recentCampaigns.map(camp => 
        camp.id === campaignToEdit.id ? newCampaign : camp
      );
    } else {
      // Add new campaign to recent campaigns
      recentCampaigns = [newCampaign, ...recentCampaigns];
    }
    
    // Dispatch event to notify other components
    window.dispatchEvent(
      new CustomEvent("recentCampaignsUpdated", { detail: recentCampaigns })
    );
    
    // Show success toast
    toast({
      title: campaignToEdit ? "Campanha atualizada" : "Campanha criada",
      description: isScheduled 
        ? `A campanha foi ${campaignToEdit ? 'atualizada' : 'criada'} e será enviada na data agendada.` 
        : `A campanha foi ${campaignToEdit ? 'atualizada' : 'criada'} e está pronta para envio.`,
    });
    
    // Save as template if selected
    if (data.saveAsTemplate) {
      toast({
        title: "Modelo salvo",
        description: "A campanha foi salva como modelo para uso futuro.",
      });
    }
    
    // Close dialog
    onOpenChange(false);
  };

  // Get channel icon
  const getChannelIcon = (channel: CampaignChannel) => {
    switch (channel) {
      case "whatsapp":
        return <MessageSquare className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "sms":
        return <Phone className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {campaignToEdit ? "Editar Campanha" : predefinedCampaignId ? "Usar Modelo de Campanha" : "Nova Campanha"}
          </DialogTitle>
          <DialogDescription>
            {campaignToEdit 
              ? "Edite os detalhes da sua campanha de mensageria."
              : "Crie uma nova campanha para enviar mensagens aos seus clientes."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* Campaign Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Campanha</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Promoção de Fim de Semana" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Channel Selection */}
                <FormField
                  control={form.control}
                  name="channel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Canal de Envio</FormLabel>
                      <FormControl>
                        <Tabs 
                          value={field.value} 
                          onValueChange={handleChannelChange}
                          className="w-full"
                        >
                          <TabsList className="grid grid-cols-3 w-full">
                            <TabsTrigger value="whatsapp" className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" /> WhatsApp
                            </TabsTrigger>
                            <TabsTrigger value="email" className="flex items-center gap-1">
                              <Mail className="h-4 w-4" /> E-mail
                            </TabsTrigger>
                            <TabsTrigger value="sms" className="flex items-center gap-1">
                              <Phone className="h-4 w-4" /> SMS
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* WhatsApp Type (only if WhatsApp is selected) */}
                {form.watch("channel") === "whatsapp" && (
                  <FormField
                    control={form.control}
                    name="whatsappType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Mensagem WhatsApp</FormLabel>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo de mensagem" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="utility">Serviço/Utilidade</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Mensagens de serviço são para informações úteis como confirmações e lembretes.
                          Mensagens de marketing são para promoções e divulgações.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                {/* Customer Segment */}
                <FormField
                  control={form.control}
                  name="segmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Segmento de Clientes</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um segmento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {customerSegments.map(segment => (
                            <SelectItem key={segment.id} value={segment.id}>
                              {segment.name} ({segment.customerCount} clientes)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Incentive Type */}
                <FormField
                  control={form.control}
                  name="incentiveType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Incentivo</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um tipo de incentivo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">Sem incentivo</SelectItem>
                          <SelectItem value="coupon">Cupom de desconto</SelectItem>
                          <SelectItem value="loyalty">Pontos de fidelidade</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Image URL (optional) */}
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagem (opcional)</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input placeholder="URL da imagem" {...field} />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon"
                            onClick={() => {
                              // In a real app, this would open a media library
                              toast({
                                title: "Biblioteca de mídia",
                                description: "A biblioteca de mídia seria aberta aqui.",
                              });
                            }}
                          >
                            <ImageIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Adicione uma imagem para sua campanha (apenas WhatsApp e E-mail)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Schedule */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="schedule"
                      checked={isScheduled}
                      onCheckedChange={setIsScheduled}
                    />
                    <label
                      htmlFor="schedule"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Agendar envio
                    </label>
                  </div>
                  
                  {isScheduled && (
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="scheduleDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Data</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: ptBR })
                                    ) : (
                                      <span>Selecione uma data</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="scheduleTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hora</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
                
                {/* Save as Template */}
                <FormField
                  control={form.control}
                  name="saveAsTemplate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Salvar como modelo</FormLabel>
                        <FormDescription>
                          Salve esta campanha como modelo para uso futuro
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-6">
                {/* Message Content */}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conteúdo da Mensagem</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Digite sua mensagem aqui..." 
                          className="min-h-[200px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Use {{nome}} para inserir o nome do cliente
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Message Preview */}
                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    {getChannelIcon(previewChannel)}
                    <h4 className="text-sm font-medium">Pré-visualização</h4>
                  </div>
                  
                  <div className={cn(
                    "p-3 rounded-lg max-w-[300px] text-sm",
                    previewChannel === "whatsapp" ? "bg-green-50 border border-green-100" :
                    previewChannel === "email" ? "bg-purple-50 border border-purple-100" :
                    "bg-blue-50 border border-blue-100"
                  )}>
                    {/* This is where the error was occurring - using a completely different approach */}
                    <div className="whitespace-pre-wrap">
                      {getPreviewText(form.watch("content") || "")}
                    </div>
                    
                    {form.watch("imageUrl") && (previewChannel === "whatsapp" || previewChannel === "email") && (
                      <div className="mt-2 p-1 bg-gray-100 rounded text-xs text-center text-gray-500">
                        [Imagem: {form.watch("imageUrl")}]
                      </div>
                    )}
                    
                    {form.watch("incentiveType") === "coupon" && (
                      <div className="mt-2 p-1 bg-green-100 rounded text-xs text-center text-green-700">
                        [Cupom de desconto será gerado automaticamente]
                      </div>
                    )}
                    
                    {form.watch("incentiveType") === "loyalty" && (
                      <div className="mt-2 p-1 bg-purple-100 rounded text-xs text-center text-purple-700">
                        [10 pontos de fidelidade serão adicionados]
                      </div>
                    )}
                  </div>
                  
                  {previewChannel === "sms" && form.watch("content").length > 160 && (
                    <p className="text-xs text-red-500">
                      Atenção: Sua mensagem tem {form.watch("content").length} caracteres. 
                      Mensagens SMS com mais de 160 caracteres podem ser divididas em múltiplas partes.
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {isScheduled ? "Agendar Campanha" : "Criar Campanha"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CampanhaForm;
