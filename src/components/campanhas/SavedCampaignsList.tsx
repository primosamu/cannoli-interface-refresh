
import React, { useState } from "react";
import { MessageSquare, Mail, Phone, Eye, Bookmark } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CampanhaForm from "./CampanhaForm";
import { Campaign, CampaignStatus } from "@/types/campaign";

// Mock saved campaigns data - in a real app, this would come from a database
const mockSavedCampaigns: Campaign[] = [
  {
    id: "saved-1",
    name: "Promoção fidelidade semanal",
    segment: {
      id: "seg-1",
      name: "Clientes Premium",
      description: "Clientes com alto volume de compras",
      customerCount: 1250
    },
    incentive: {
      type: "coupon",
      couponId: "cpn-123",
      loyaltyPoints: 0
    },
    channel: "whatsapp",
    whatsappType: "marketing",
    content: "Olá, temos uma promoção exclusiva para você como cliente premium!",
    status: "draft",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "saved-2",
    name: "Modelo Agradecimento Cliente Novo",
    segment: {
      id: "seg-2",
      name: "Novos Clientes",
      description: "Clientes que fizeram a primeira compra",
      customerCount: 380
    },
    incentive: {
      type: "none"
    },
    channel: "email",
    content: "Agradecemos pela sua primeira compra! Esperamos que tenha tido uma ótima experiência.",
    status: "draft",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "saved-3",
    name: "Lembrete de carrinho abandonado",
    segment: {
      id: "seg-3",
      name: "Carrinho abandonado",
      description: "Clientes que abandonaram o carrinho",
      customerCount: 675
    },
    incentive: {
      type: "coupon",
      couponId: "cpn-456"
    },
    channel: "sms",
    content: "Você esqueceu itens no seu carrinho! Use o cupom VOLTA10 para 10% de desconto na finalização.",
    status: "draft",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const SavedCampaignsList = () => {
  const [savedCampaigns] = useState<Campaign[]>(mockSavedCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "whatsapp":
        return <MessageSquare className="h-4 w-4 text-green-600" />;
      case "email":
        return <Mail className="h-4 w-4 text-purple-600" />;
      case "sms":
        return <Phone className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };
  
  // Format date relative to now
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Hoje";
    } else if (diffDays === 1) {
      return "Ontem";
    } else {
      return `${diffDays} dias atrás`;
    }
  };
  
  // Handle campaign card click
  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowDetails(true);
  };
  
  // Handle edit button click
  const handleEditCampaign = () => {
    setShowDetails(false);
    setOpenEditForm(true);
  };

  return (
    <div className="bg-slate-50 rounded-lg p-4 border">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">Campanhas Salvas</h4>
        <Bookmark className="h-4 w-4 text-slate-400" />
      </div>
      
      {savedCampaigns.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Você ainda não tem campanhas salvas. Salve um modelo para usar novamente.
        </p>
      ) : (
        <div className="space-y-3 mt-3">
          {savedCampaigns.map(campaign => (
            <div 
              key={campaign.id} 
              className="bg-white p-3 rounded-md border flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => handleCampaignClick(campaign)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  {getChannelIcon(campaign.channel)}
                </div>
                <div>
                  <h5 className="text-sm font-medium">{campaign.name}</h5>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500">{formatDate(campaign.createdAt)}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">Modelo</span>
                    {campaign.channel === "whatsapp" && campaign.whatsappType && (
                      <>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                          {campaign.whatsappType === "marketing" ? "Marketing" : "Serviço"}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="bg-slate-100 text-slate-600">
                Modelo
              </Badge>
            </div>
          ))}
        </div>
      )}
      
      {/* Campaign Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes da Campanha Salva</DialogTitle>
            <DialogDescription>
              Modelo de campanha salvo para reutilização
            </DialogDescription>
          </DialogHeader>
          
          {selectedCampaign && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{selectedCampaign.name}</h3>
                  <Badge variant="outline" className="bg-slate-100 text-slate-600">Modelo</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Criada em {new Date(selectedCampaign.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Canal</h4>
                  <div className="flex items-center gap-2">
                    {getChannelIcon(selectedCampaign.channel)}
                    <span className="capitalize">
                      {selectedCampaign.channel} 
                      {selectedCampaign.channel === "whatsapp" && selectedCampaign.whatsappType && 
                        ` (${selectedCampaign.whatsappType === "marketing" ? "Marketing" : "Serviço"})`
                      }
                    </span>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Segmento Alvo</h4>
                  <div>
                    <span className="font-medium">{selectedCampaign.segment.name}</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedCampaign.segment.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-md">
                <h4 className="text-sm font-medium mb-1">Conteúdo da mensagem</h4>
                <p className="text-sm whitespace-pre-wrap">
                  {selectedCampaign.content}
                </p>
                {selectedCampaign.incentive?.type === "coupon" && (
                  <div className="mt-2 px-3 py-1 bg-green-50 border border-green-100 text-green-700 text-sm rounded">
                    Inclui cupom de desconto
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Fechar
                </Button>
                <Button onClick={handleEditCampaign}>
                  <Eye className="h-4 w-4 mr-2" />
                  Usar Modelo
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Campaign Form */}
      {selectedCampaign && (
        <CampanhaForm
          open={openEditForm}
          onOpenChange={setOpenEditForm}
          campaignToEdit={{...selectedCampaign, id: `new-${Date.now()}`}}
        />
      )}
    </div>
  );
};

export default SavedCampaignsList;
