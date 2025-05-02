
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
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Campaign, CampaignChannel, CustomerSegment, WhatsAppMessageType } from "@/types/campaign";
import { format } from "date-fns";
import { MessageSquare, Mail, Phone, Loader2 } from "lucide-react";
import {
  BasicInfoSection,
  MediaSection,
  ScheduleSection,
  SaveAsTemplateSection,
  MessageComposerSection,
  PreviewSection,
  ContactSelection
} from "./CampanhaFormComponents";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

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
  couponId: z.string().optional(),
  couponCode: z.string().optional(),
  imageUrl: z.string().optional(),
  scheduleDate: z.date().optional(),
  scheduleTime: z.string().optional(),
  saveAsTemplate: z.boolean().default(false),
  contactSource: z.enum(["segment", "file", "manual"]).default("segment"),
  contactFile: z.string().optional(),
  manualContacts: z.string().optional(),
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
  const queryClient = useQueryClient();
  const [isScheduled, setIsScheduled] = useState(false);
  const [previewChannel, setPreviewChannel] = useState<CampaignChannel>("whatsapp");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch customer segments from Supabase
  const { data: customerSegments = [], isLoading: loadingSegments } = useQuery({
    queryKey: ['customer_segments'],
    queryFn: async () => {
      // Try to fetch from Supabase
      const { data: segmentsData, error } = await supabase
        .from('segments')
        .select('*');
        
      if (error) {
        console.error("Error loading segments:", error);
        return [];
      }
      
      if (!segmentsData || segmentsData.length === 0) {
        // Return mock data if no segments found
        return [
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
      }
      
      // Convert Supabase data to our CustomerSegment type
      return segmentsData.map(seg => ({
        id: seg.id,
        name: seg.name,
        description: seg.description || "",
        customerCount: seg.customer_count || 0
      }));
    },
    initialData: []
  });

  // Fetch predefined campaign templates from Supabase
  const { data: predefinedCampaigns = {} } = useQuery({
    queryKey: ['predefined_campaigns'],
    queryFn: async () => {
      // Try to fetch from Supabase
      const { data: templatesData, error } = await supabase
        .from('campaign_templates')
        .select('*')
        .eq('type', 'predefined');
        
      if (error || !templatesData || templatesData.length === 0) {
        // Return mock data if no templates found
        return {
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
      }
      
      // Convert Supabase data to our format
      const templateMap: Record<string, Partial<Campaign>> = {};
      templatesData.forEach(template => {
        const key = template.id.toString();
        templateMap[key] = {
          name: template.name,
          channel: template.channel as CampaignChannel,
          whatsappType: template.whatsapp_type as WhatsAppMessageType,
          content: template.content || "",
          segment: customerSegments.find(seg => seg.id === template.segment_id) || customerSegments[0],
          incentive: {
            type: template.incentive_type || "none",
            couponId: template.coupon_id
          },
          imageUrl: template.image_url
        };
      });
      
      return templateMap;
    },
    enabled: customerSegments.length > 0
  });

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
      couponId: undefined,
      couponCode: "",
      imageUrl: "",
      saveAsTemplate: false,
      contactSource: "segment",
    },
  });

  // Update form values when predefinedCampaignId, campaignToEdit, selectedChannel, or campaignType changes
  useEffect(() => {
    if (predefinedCampaignId && predefinedCampaigns[predefinedCampaignId]) {
      const template = predefinedCampaigns[predefinedCampaignId];
      
      form.reset({
        name: template.name || "",
        channel: template.channel || "whatsapp",
        whatsappType: template.whatsappType || "marketing",
        segmentId: template.segment?.id || "",
        content: template.content || "",
        incentiveType: template.incentive?.type || "none",
        couponId: template.incentive?.couponId || undefined,
        couponCode: "",
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
        couponId: campaignToEdit.incentive.couponId || undefined,
        couponCode: "",
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
        segmentId: customerSegments[0]?.id || "",
        content: defaultContent,
        incentiveType: "none",
        couponId: undefined,
        couponCode: "",
        imageUrl: "",
        saveAsTemplate: false,
      });
      
      setPreviewChannel(selectedChannel as CampaignChannel);
    }
  }, [predefinedCampaignId, campaignToEdit, selectedChannel, campaignType, form, customerSegments, predefinedCampaigns]);

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
  const onSubmit = async (data: FormValues) => {
    setIsSaving(true);
    
    try {
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
      
      // Create campaign data for Supabase
      const campaignData = {
        name: data.name,
        segment_id: data.segmentId,
        incentive_type: data.incentiveType,
        coupon_id: data.incentiveType === "coupon" ? data.couponId || `cpn-${Date.now()}` : undefined,
        loyalty_points: data.incentiveType === "loyalty" ? 10 : undefined,
        channel: data.channel,
        whatsapp_type: data.channel === "whatsapp" ? data.whatsappType : undefined,
        content: data.content,
        image_url: data.imageUrl,
        status: isScheduled ? "scheduled" : "active",
        scheduled_at: isScheduled && data.scheduleDate ? 
          (() => {
            const date = new Date(data.scheduleDate);
            if (data.scheduleTime) {
              const [hours, minutes] = data.scheduleTime.split(':').map(Number);
              date.setHours(hours, minutes);
            }
            return date.toISOString();
          })() : undefined,
        type: "campaign", // Regular campaign, not template
        user_id: "system", // This will be replaced with the actual user ID when auth is implemented
      };
      
      // If editing an existing campaign
      if (campaignToEdit) {
        const { error } = await supabase
          .from('campaigns')
          .update(campaignData)
          .eq('id', campaignToEdit.id);
          
        if (error) throw error;
      } else {
        // Create a new campaign
        const { error } = await supabase
          .from('campaigns')
          .insert(campaignData);
          
        if (error) throw error;
      }
      
      // Invalidate cache to refresh data
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      
      // Save as template if selected
      if (data.saveAsTemplate) {
        const templateData = {
          name: data.name,
          channel: data.channel,
          whatsapp_type: data.channel === "whatsapp" ? data.whatsappType : undefined,
          content: data.content,
          image_url: data.imageUrl,
          incentive_type: data.incentiveType,
          segment_id: data.segmentId,
          type: "template",
          user_id: "system", // This will be replaced with the actual user ID when auth is implemented
        };
        
        const { error } = await supabase
          .from('campaign_templates')
          .insert(templateData);
          
        if (error) {
          console.error("Error saving template:", error);
          // Continue execution even if template save fails
        } else {
          queryClient.invalidateQueries({ queryKey: ['campaign_templates'] });
          
          toast({
            title: "Modelo salvo",
            description: "A campanha foi salva como modelo para uso futuro.",
          });
        }
      }
      
      // Show success toast
      toast({
        title: campaignToEdit ? "Campanha atualizada" : "Campanha criada",
        description: isScheduled 
          ? `A campanha foi ${campaignToEdit ? 'atualizada' : 'criada'} e será enviada na data agendada.` 
          : `A campanha foi ${campaignToEdit ? 'atualizada' : 'criada'} e está pronta para envio.`,
      });
      
      // Close dialog
      onOpenChange(false);
      
    } catch (error) {
      console.error("Error saving campaign:", error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar a campanha. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
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

  // Show loading state while fetching segments
  if (loadingSegments) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p>Carregando segmentos de clientes...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>
            {campaignToEdit ? "Editar Campanha" : predefinedCampaignId ? "Usar Modelo de Campanha" : "Nova Campanha"}
          </DialogTitle>
          <DialogDescription>
            {campaignToEdit 
              ? "Edite os detalhes da sua campanha de mensageria."
              : "Crie uma nova campanha para enviar mensagens aos seus clientes."}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-180px)] px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Basic Information Section */}
                  <BasicInfoSection 
                    customerSegments={customerSegments}
                    handleChannelChange={handleChannelChange}
                  />
                  
                  {/* Contact Selection Section */}
                  <ContactSelection />
                  
                  {/* Media Section */}
                  <MediaSection />
                  
                  {/* Schedule Section */}
                  <ScheduleSection 
                    isScheduled={isScheduled}
                    setIsScheduled={setIsScheduled}
                  />
                  
                  {/* Save As Template Section */}
                  <SaveAsTemplateSection />
                </div>
                
                <div className="space-y-6">
                  {/* Message Composer Section */}
                  <MessageComposerSection />
                  
                  {/* Preview Section */}
                  <PreviewSection previewChannel={previewChannel} />
                </div>
              </div>
            </form>
          </Form>
        </ScrollArea>
        
        <DialogFooter className="px-6 py-4 border-t">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={form.handleSubmit(onSubmit)} 
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              isScheduled ? "Agendar Campanha" : "Criar Campanha"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CampanhaForm;
