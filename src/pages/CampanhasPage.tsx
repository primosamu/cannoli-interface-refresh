
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams, useNavigate } from "react-router-dom";

// Import all the components
import CampanhasMensageria from "@/components/campanhas/CampanhasMensageria";
import CampanhasTrafegoPago from "@/components/campanhas/CampanhasTrafegoPago";
import CampaignMetricsDialog from "@/components/campanhas/CampaignMetricsDialog";
import CampanhaForm from "@/components/campanhas/CampanhaForm";
import ImageGeneratorForm from "@/components/campanhas/ImageGenerator/ImageGeneratorForm";

// Simple configuration component
const ConfiguracoesTab = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-medium mb-4">Configurações de Campanha</h2>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-medium">Configurações Gerais</h3>
            <div className="flex items-center justify-between border-b pb-2">
              <span>Notificar ao finalizar campanhas</span>
              <input type="checkbox" className="form-checkbox h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span>Email de relatórios</span>
              <input type="checkbox" className="form-checkbox h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span>Análise automática</span>
              <input type="checkbox" className="form-checkbox h-5 w-5" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Limites e Restrições</h3>
            <div className="flex items-center justify-between border-b pb-2">
              <span>Limite diário de mensagens</span>
              <input type="number" className="form-input w-24 rounded" defaultValue={1000} />
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span>Horário permitido</span>
              <div className="flex space-x-2">
                <select className="form-select rounded text-sm">
                  <option>08:00</option>
                  <option>09:00</option>
                  <option>10:00</option>
                </select>
                <span>até</span>
                <select className="form-select rounded text-sm">
                  <option>18:00</option>
                  <option>19:00</option>
                  <option>20:00</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <h3 className="font-medium mb-2">Integrações</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-md p-3 flex items-center justify-between">
              <span>WhatsApp Business</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Ativo</span>
            </div>
            <div className="border rounded-md p-3 flex items-center justify-between">
              <span>Email Marketing</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Ativo</span>
            </div>
            <div className="border rounded-md p-3 flex items-center justify-between">
              <span>SMS Gateway</span>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Configurar</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button>Salvar Configurações</Button>
        </div>
      </div>
    </div>
  );
};

const CampanhasPage = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState("mensageria");
  const [openForm, setOpenForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showMetricsDialog, setShowMetricsDialog] = useState(false);
  const [selectedMetricsCampaign, setSelectedMetricsCampaign] = useState(null);

  // Set the active tab based on URL parameter
  useEffect(() => {
    if (tabParam) {
      switch (tabParam) {
        case 'trafego-pago':
          setActiveTab('trafego');
          break;
        case 'gerador-imagens':
          setActiveTab('imagens');
          break;
        case 'configuracoes':
          setActiveTab('configuracoes');
          break;
        default:
          setActiveTab('mensageria');
      }
    } else {
      setActiveTab('mensageria');
    }
  }, [tabParam]);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    let tabParam = '';
    
    switch (value) {
      case 'trafego':
        tabParam = 'trafego-pago';
        break;
      case 'imagens':
        tabParam = 'gerador-imagens';
        break;
      case 'configuracoes':
        tabParam = 'configuracoes';
        break;
      default:
        tabParam = '';
    }
    
    if (tabParam) {
      navigate(`/campanhas?tab=${tabParam}`);
    } else {
      navigate('/campanhas');
    }
  };

  const handleOpenCustomCampaign = () => {
    setSelectedCampaign(null);
    setOpenForm(true); // Changed from setOpenCampaignForm to setOpenForm
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Campanhas</h1>
        <p className="text-muted-foreground">Crie e gerencie suas campanhas de marketing</p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList>
          <TabsTrigger value="mensageria">Campanhas de Mensageria</TabsTrigger>
          <TabsTrigger value="trafego">Tráfego Pago</TabsTrigger>
          <TabsTrigger value="imagens">Gerador de Imagens</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="mensageria" className="mt-6 space-y-8">
          <CampanhasMensageria />
        </TabsContent>

        <TabsContent value="trafego">
          <CampanhasTrafegoPago />
        </TabsContent>
        
        <TabsContent value="imagens">
          <ImageGeneratorForm />
        </TabsContent>
        
        <TabsContent value="configuracoes">
          <ConfiguracoesTab />
        </TabsContent>
      </Tabs>

      {/* Campaign Metrics Dialog */}
      <CampaignMetricsDialog
        open={showMetricsDialog}
        onOpenChange={setShowMetricsDialog}
        campaign={selectedMetricsCampaign}
      />
      
      {/* Create Campaign button (floating) */}
      <Button 
        className="fixed right-6 bottom-6 shadow-lg z-10"
        size="lg"
        onClick={handleOpenCustomCampaign} // Using the handler function
      >
        <Plus className="mr-2 h-5 w-5" />
        Nova Campanha
      </Button>
      
      {/* Campaign Form Dialog */}
      <CampanhaForm 
        open={openForm} 
        onOpenChange={setOpenForm} 
        campaignToEdit={selectedCampaign}
      />
    </div>
  );
};

export default CampanhasPage;
