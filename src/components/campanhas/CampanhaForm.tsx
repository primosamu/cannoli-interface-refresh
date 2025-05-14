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
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Campaign, CampaignChannel, CampaignExecutionType, CampaignTriggerType, CustomerSegment, FrequencySettings } from "@/types/campaign";
import { format } from "date-fns";
import {
  BasicInfoSection,
  ScheduleSection,
  SaveAsTemplateSection,
  MessageComposerSection,
} from "./CampanhaFormComponents";
import CouponSelectionEnhanced from "./CampanhaFormComponents/CouponSelectionEnhanced";
import MultiChannelPreview from "./CampanhaFormComponents/MultiChannelPreview";
import { Plus } from "lucide-react";

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
    },
    executionType: "one-time"
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
    },
    executionType: "one-time"
  },
  "terca-da-pizza": {
    name: "Terça da Pizza",
    channel: "whatsapp",
    whatsappType: "marketing",
    content: "Olá, {{nome}}! Hoje é TERÇA DA PIZZA! 🍕 Todas as pizzas com 30% de desconto. Válido apenas hoje para delivery ou retirada. Faça seu pedido pelo WhatsApp ou pelo nosso app. Bom apetite!",
    segment: customerSegments[0],
    incentive: {
      type: "none"
    },
    executionType: "one-time"
  },
  "quinta-do-hamburguer": {
    name: "Quinta do Hambúrguer",
    channel: "whatsapp",
    whatsappType: "marketing",
    content: "Olá, {{nome}}! Hoje é QUINTA DO HAMBÚRGUER! 🍔 Todos os hambúrgueres com 25% de desconto. Válido apenas hoje para delivery ou retirada. Faça seu pedido pelo WhatsApp ou pelo nosso app. Bom apetite!",
    segment: customerSegments[0],
    incentive: {
      type: "none"
    },
    executionType: "one-time"
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
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    executionType: "one-time"
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
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    executionType: "one-time"
  }
];

// Keep track of recent campaigns
let recentCampaigns = [...recentCampaignsMock];

// Function to get recent campaigns (used by other components)
export const getRecentCampaigns = () => recentCampaigns;

// Updated form schema to include maxFrequency
const formSchema = z.object({
  name: z.string().min(3, {
    message: "O nome da campanha deve ter pelo menos 3 caracteres.",
  }),
  description: z.string().min(5, {
    message: "A descrição deve ter pelo menos 5 caracteres.",
  }).optional(),
  channelWhatsapp: z.boolean().optional(),
  channelEmail: z.boolean().optional(),
  channelSms: z.boolean().optional(),
  whatsappType: z.enum(["utility", "marketing"] as const).optional(),
  segmentId: z.string({
    required_error: "Por favor selecione um segmento de clientes.",
  }),
  content: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }),
  incentiveType: z.enum(["none", "coupon", "loyalty"] as const),
  couponId: z.string().optional(),
  couponCode: z.string().optional(),
  imageUrl: z.string().optional(),
  scheduleDate: z.date().optional(),
  scheduleTime: z.string().optional(),
  saveAsTemplate: z.boolean().default(false),
  executionType: z.enum(["one-time", "recurring"] as const).default("one-time"),
  isActive: z.boolean().default(false),
  maxFrequency: z.object({
    interval: z.number().min(1).default(1),
    unit: z.enum(["days", "weeks", "months"] as const).default("weeks")
  }).optional(),
  triggerType: z.enum(["immediate", "scheduled"] as const).optional(),
  recurringDays: z.array(z.number()).optional(),
  recurringTime: z.string().optional(),
  campaignStartDate: z.date().optional(),
  campaignEndDate: z.date().optional()
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
  campaignType,
}: CampanhaFormProps) => {
  const { toast } = useToast();
  const [isScheduled, setIsScheduled] = useState(false);
  
  // Initialize form with default values or values from predefined campaign/edit
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      channelWhatsapp: true,
      channelEmail: false,
      channelSms: false,
      whatsappType: "marketing",
      segmentId: "",
      content: "",
      incentiveType: "none",
      couponId: undefined,
      couponCode: "",
      imageUrl: "",
      saveAsTemplate: false,
      executionType: "one-time",
      isActive: false
    },
  });

  // Update form values when predefinedCampaignId, campaignToEdit, selectedChannel changes
  useEffect(() => {
    if (predefinedCampaignId && predefinedCampaignTemplates[predefinedCampaignId]) {
      const template = predefinedCampaignTemplates[predefinedCampaignId];
      
      form.reset({
        name: template.name || "",
        description: template.description || "",
        channelWhatsapp: template.channel === "whatsapp",
        channelEmail: template.channel === "email",
        channelSms: template.channel === "sms",
        whatsappType: template.whatsappType || "marketing",
        segmentId: template.segment?.id || "",
        content: template.content || "",
        incentiveType: template.incentive?.type || "none",
        couponId: template.incentive?.couponId || undefined,
        couponCode: "",
        imageUrl: template.imageUrl || "",
        saveAsTemplate: false,
        executionType: template.executionType || "one-time",
        isActive: false
      });
    } else if (campaignToEdit) {
      form.reset({
        name: campaignToEdit.name,
        description: campaignToEdit.description || "",
        channelWhatsapp: campaignToEdit.channel === "whatsapp",
        channelEmail: campaignToEdit.channel === "email",
        channelSms: campaignToEdit.channel === "sms",
        whatsappType: campaignToEdit.whatsappType || "marketing",
        segmentId: campaignToEdit.segment.id,
        content: campaignToEdit.content,
        incentiveType: campaignToEdit.incentive.type,
        couponId: campaignToEdit.incentive.couponId || undefined,
        couponCode: "",
        imageUrl: campaignToEdit.imageUrl || "",
        saveAsTemplate: false,
        executionType: campaignToEdit.executionType || "one-time",
        isActive: campaignToEdit.isActive || false
      });
      
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
      let defaultDescription = "";
      
      if (campaignType) {
        switch (campaignType) {
          case "promotion":
            defaultName = "Promoção Especial";
            defaultDescription = "Detalhes da promoção";
            defaultContent = "Olá! Temos uma promoção especial para você: [DETALHE DA PROMOÇÃO]. Válido até [DATA]. Aproveite!";
            break;
          case "news":
            defaultName = "Novidade no Cardápio";
            defaultDescription = "Anúncio de novo prato";
            defaultContent = "Olá! Temos novidades no cardápio! Conheça nosso novo prato: [NOME DO PRATO]. Venha experimentar!";
            break;
          case "reminder":
            defaultName = "Lembrete de Reserva";
            defaultDescription = "Confirmação de reserva";
            defaultContent = "Olá! Apenas confirmando sua reserva para [DATA/HORA]. Estamos ansiosos para recebê-lo!";
            break;
          default:
            break;
        }
      }
      
      form.reset({
        name: defaultName,
        description: defaultDescription,
        channelWhatsapp: selectedChannel === "whatsapp",
        channelEmail: selectedChannel === "email",
        channelSms: selectedChannel === "sms",
        whatsappType: selectedChannel === "whatsapp" ? "marketing" : undefined,
        segmentId: customerSegments[0].id,
        content: defaultContent,
        incentiveType: "none",
        couponId: undefined,
        couponCode: "",
        imageUrl: "",
        saveAsTemplate: false,
        executionType: "one-time",
        isActive: false
      });
    } else {
      // Default new form values
      form.reset({
        name: "",
        description: "",
        channelWhatsapp: true,
        channelEmail: false,
        channelSms: false,
        whatsappType: "marketing",
        segmentId: customerSegments[0].id,
        content: "",
        incentiveType: "none",
        couponId: undefined,
        couponCode: "",
        imageUrl: "",
        saveAsTemplate: false,
        executionType: "one-time",
        isActive: false
      });
    }
  }, [predefinedCampaignId, campaignToEdit, selectedChannel, campaignType, form]);
  
  // Watch for channel changes to update WhatsApp type
  useEffect(() => {
    const subscription = form.watch(({ channelWhatsapp }) => {
      if (channelWhatsapp === false) {
        form.setValue("whatsappType", undefined);
      } else if (!form.getValues("whatsappType")) {
        form.setValue("whatsappType", "marketing");
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    // Validate that at least one channel is selected
    if (!data.channelWhatsapp && !data.channelEmail && !data.channelSms) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um canal de envio.",
        variant: "destructive",
      });
      return;
    }
    
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
    
    // Determine primary channel
    let primaryChannel: CampaignChannel = "whatsapp";
    if (data.channelWhatsapp) {
      primaryChannel = "whatsapp";
    } else if (data.channelEmail) {
      primaryChannel = "email";
    } else if (data.channelSms) {
      primaryChannel = "sms";
    }
    
    // Create campaign object
    const newCampaign: Campaign = {
      id: campaignToEdit?.id || `camp-${Date.now()}`,
      name: data.name,
      description: data.description,
      segment: selectedSegment,
      incentive: {
        type: data.incentiveType,
        couponId: data.incentiveType === "coupon" ? data.couponId || `cpn-${Date.now()}` : undefined,
        loyaltyPoints: data.incentiveType === "loyalty" ? 10 : undefined,
      },
      channel: primaryChannel,
      whatsappType: data.channelWhatsapp ? data.whatsappType : undefined,
      content: data.content,
      imageUrl: data.imageUrl,
      status: data.executionType === "recurring" ? (data.isActive ? "active" : "paused") : (isScheduled ? "scheduled" : "active"),
      createdAt: campaignToEdit?.createdAt || new Date().toISOString(),
      executionType: data.executionType,
      isActive: data.isActive,
      scheduledAt: data.executionType === "one-time" && isScheduled && data.scheduleDate ? 
        (() => {
          const date = new Date(data.scheduleDate);
          if (data.scheduleTime) {
            const [hours, minutes] = data.scheduleTime.split(':').map(Number);
            date.setHours(hours, minutes);
          }
          return date.toISOString();
        })() : undefined,
      // Set default maxFrequency
      maxFrequency: {
        interval: 1,
        unit: "weeks"
      }
    };
    
    // If custom maxFrequency is defined, use it
    if (data.maxFrequency) {
      newCampaign.maxFrequency = {
        interval: data.maxFrequency.interval,
        unit: data.maxFrequency.unit
      };
    }
    
    // Store multi-channel info in campaign object
    (newCampaign as any).multiChannel = {
      whatsapp: data.channelWhatsapp,
      email: data.channelEmail,
      sms: data.channelSms
    };
    
    // If custom coupon code was provided
    if (data.incentiveType === "coupon" && data.couponCode) {
      (newCampaign as any).couponCode = data.couponCode;
    }
    
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
    if (data.executionType === "recurring") {
      toast({
        title: campaignToEdit ? "Automação atualizada" : "Automação criada",
        description: data.isActive 
          ? `A automação foi ${campaignToEdit ? 'atualizada' : 'criada'} e está ativada.` 
          : `A automação foi ${campaignToEdit ? 'atualizada' : 'criada'} mas está desativada.`,
      });
    } else {
      toast({
        title: campaignToEdit ? "Campanha atualizada" : "Campanha criada",
        description: isScheduled 
          ? `A campanha foi ${campaignToEdit ? 'atualizada' : 'criada'} e será enviada na data agendada.` 
          : `A campanha foi ${campaignToEdit ? 'atualizada' : 'criada'} e está pronta para envio.`,
      });
    }
    
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

  // Get dialog title based on form type
  const getDialogTitle = () => {
    if (campaignToEdit) {
      return "Editar Campanha";
    }
    
    if (predefinedCampaignId) {
      return "Usar Modelo de Campanha";
    }
    
    return "Nova Campanha";
  };

  // Get form action button text
  const getSubmitButtonText = () => {
    const executionType = form.getValues("executionType");
    
    if (executionType === "recurring") {
      return campaignToEdit 
        ? "Atualizar Automação" 
        : form.getValues("isActive") 
          ? "Salvar e Ativar" 
          : "Salvar Automação";
    }
    
    return isScheduled 
      ? "Agendar Campanha" 
      : campaignToEdit 
        ? "Atualizar Campanha" 
        : "Criar Campanha";
  };

  // Handle creating a new segmentation
  const handleCreateNewSegmentation = () => {
    toast({
      title: "Criar nova segmentação",
      description: "Esta funcionalidade será implementada em breve.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>
            Configure sua campanha para enviar mensagens aos seus clientes.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-180px)] px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Basic Information Section with description field */}
                  <div className="space-y-4 border rounded-md p-4">
                    <h3 className="text-lg font-medium">Informações Básicas</h3>
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título da Campanha</FormLabel>
                          <FormControl>
                            <input
                              className="w-full px-3 py-2 border rounded-md"
                              placeholder="Digite o título da campanha"
                              {...field}
                            />
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
                          <FormLabel>Subtítulo/Descrição</FormLabel>
                          <FormControl>
                            <input
                              className="w-full px-3 py-2 border rounded-md"
                              placeholder="Digite uma breve descrição da campanha"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Um breve texto explicativo sobre sua campanha
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <FormLabel>Segmento de Clientes</FormLabel>
                        <Button
                          onClick={handleCreateNewSegmentation}
                          size="sm"
                          variant="ghost"
                          className="flex items-center gap-1 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                        >
                          <Plus className="h-4 w-4" />
                          Criar Nova Segmentação
                        </Button>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="segmentId"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <select
                                className="w-full px-3 py-2 border rounded-md"
                                {...field}
                              >
                                <option value="">Selecione um segmento</option>
                                {customerSegments.map((segment) => (
                                  <option key={segment.id} value={segment.id}>
                                    {segment.name} ({segment.customerCount} clientes)
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormDescription>
                              Selecione qual grupo de clientes receberá esta campanha
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Canal de Envio</FormLabel>
                      <div className="flex flex-wrap gap-4">
                        <FormField
                          control={form.control}
                          name="channelWhatsapp"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  className="h-4 w-4"
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">WhatsApp</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="channelEmail"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  className="h-4 w-4"
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Email</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="channelSms"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  className="h-4 w-4"
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">SMS</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormDescription>
                        Selecione quais canais serão utilizados para envio
                      </FormDescription>
                    </div>
                    
                    {form.watch("channelWhatsapp") && (
                      <FormField
                        control={form.control}
                        name="whatsappType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de Mensagem WhatsApp</FormLabel>
                            <FormControl>
                              <select
                                className="w-full px-3 py-2 border rounded-md"
                                {...field}
                              >
                                <option value="utility">Utilitária</option>
                                <option value="marketing">Marketing</option>
                              </select>
                            </FormControl>
                            <FormDescription>
                              Utilitárias: transacionais e urgentes. Marketing: promocionais.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  
                  {/* Schedule Section */}
                  <ScheduleSection 
                    isScheduled={isScheduled}
                    setIsScheduled={setIsScheduled}
                    executionType={form.watch("executionType")}
                  />
                  
                  {/* Enhanced Coupon Selection */}
                  <CouponSelectionEnhanced />
                  
                  {/* Save As Template Section */}
                  <SaveAsTemplateSection />
                </div>
                
                <div className="space-y-6">
                  {/* Message Composer Section with integrated image upload */}
                  <MessageComposerSection />
                  
                  {/* Multi-channel Preview */}
                  <MultiChannelPreview />
                </div>
              </div>
            </form>
          </Form>
        </ScrollArea>
        
        <DialogFooter className="px-6 py-4 border-t">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>
            {getSubmitButtonText()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CampanhaForm;
