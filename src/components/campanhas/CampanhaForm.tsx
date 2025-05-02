
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Campaign, CampaignChannel } from "@/types/campaign";
import { supabase } from "@/integrations/supabase/client";

import {
  CustomersSegmentsLoader,
  PredefinedCampaignsLoader,
  CampanhaFormActions,
  CampanhaFormContent,
  CampanhaFormHeader,
  CampanhaFormProvider,
} from "./CampanhaFormSections";
import { FormValues } from "./CampanhaFormSections/CampanhaFormProvider";

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
  
  // Update preview channel when selectedChannel changes or when campaignToEdit is loaded
  useEffect(() => {
    if (selectedChannel) {
      setPreviewChannel(selectedChannel as CampaignChannel);
    } else if (campaignToEdit) {
      setPreviewChannel(campaignToEdit.channel);
    }
  }, [selectedChannel, campaignToEdit]);
  
  // Handle channel change
  const handleChannelChange = (value: string) => {
    setPreviewChannel(value as CampaignChannel);
  };

  // Prepare default values based on params
  const getDefaultValues = (
    segments: any[],
    predefinedCampaigns: any
  ): Partial<FormValues> => {
    if (campaignToEdit) {
      const defaultValues: Partial<FormValues> = {
        name: campaignToEdit.name,
        channel: campaignToEdit.channel,
        whatsappType: campaignToEdit.whatsappType,
        segmentId: campaignToEdit.segment.id,
        content: campaignToEdit.content,
        incentiveType: campaignToEdit.incentive.type,
        couponId: campaignToEdit.incentive.couponId,
        imageUrl: campaignToEdit.imageUrl,
        saveAsTemplate: false,
        contactSource: "segment",
      };
      
      if (campaignToEdit.scheduledAt) {
        setIsScheduled(true);
        const scheduledDate = new Date(campaignToEdit.scheduledAt);
        defaultValues.scheduleDate = scheduledDate;
        defaultValues.scheduleTime = format(scheduledDate, "HH:mm");
      }
      
      return defaultValues;
    }
    
    if (predefinedCampaignId && predefinedCampaigns[predefinedCampaignId]) {
      const template = predefinedCampaigns[predefinedCampaignId];
      return {
        name: template.name || "",
        channel: template.channel || "whatsapp",
        whatsappType: template.whatsappType || "marketing",
        segmentId: template.segment?.id || "",
        content: template.content || "",
        incentiveType: template.incentive?.type || "none",
        couponId: template.incentive?.couponId || undefined,
        imageUrl: template.imageUrl || "",
        saveAsTemplate: false,
      };
    }
    
    if (selectedChannel) {
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
      
      return {
        name: defaultName,
        channel: selectedChannel as CampaignChannel,
        whatsappType: selectedChannel === "whatsapp" ? "marketing" : undefined,
        segmentId: segments.length > 0 ? segments[0].id : "",
        content: defaultContent,
        incentiveType: "none",
        saveAsTemplate: false,
      };
    }
    
    return {};
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSaving(true);
    
    try {
      // Find selected segment
      const queryClient = useQueryClient();
      const segments = queryClient.getQueryData<any[]>(['customer_segments']) || [];
      const selectedSegment = segments.find(seg => seg.id === data.segmentId);
      
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
        coupon_id: data.incentiveType === "coupon" ? data.couponId || `cpn-${Date.now()}` : null,
        loyalty_points: data.incentiveType === "loyalty" ? 10 : null,
        channel: data.channel,
        whatsapp_type: data.channel === "whatsapp" ? data.whatsappType : null,
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
          })() : null,
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
          whatsapp_type: data.channel === "whatsapp" ? data.whatsappType : null,
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

  return (
    <CustomersSegmentsLoader>
      {(customerSegments, loadingSegments) => {
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
          <PredefinedCampaignsLoader customerSegments={customerSegments}>
            {(predefinedCampaigns) => (
              <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                  <CampanhaFormHeader 
                    isEditing={!!campaignToEdit}
                    isPredefined={!!predefinedCampaignId}
                  />
                  
                  <ScrollArea className="max-h-[calc(90vh-180px)] px-6">
                    <CampanhaFormProvider 
                      defaultValues={getDefaultValues(customerSegments, predefinedCampaigns)}
                      onSubmit={onSubmit}
                    >
                      <CampanhaFormContent 
                        isScheduled={isScheduled}
                        setIsScheduled={setIsScheduled}
                        previewChannel={previewChannel}
                        handleChannelChange={handleChannelChange}
                        customerSegments={customerSegments}
                      />
                    </CampanhaFormProvider>
                  </ScrollArea>
                  
                  <CampanhaFormActions 
                    isSaving={isSaving}
                    isScheduled={isScheduled}
                    onCancel={() => onOpenChange(false)}
                    onSubmit={() => {
                      const submitter = document.querySelector("form");
                      if (submitter) {
                        submitter.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                      }
                    }}
                  />
                </DialogContent>
              </Dialog>
            )}
          </PredefinedCampaignsLoader>
        );
      }}
    </CustomersSegmentsLoader>
  );
};

export default CampanhaForm;
