
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampanhasMensageria from "@/components/campanhas/CampanhasMensageria";
import ChannelConfigurationForm from "@/components/campanhas/ChannelConfigurationForm";
import CampanhasTrafegoPago from "@/components/campanhas/CampanhasTrafegoPago";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const CampanhasPage = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<string>("campanhas");

  useEffect(() => {
    // Processar parâmetro da URL para definir aba ativa
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get("tab");
    
    if (tab === "trafego-pago") {
      setActiveTab("trafego-pago");
    } else if (tab === "configuracoes") {
      setActiveTab("configuracoes");
    } else {
      setActiveTab("campanhas");
    }
  }, [location]);

  return (
    <div className="container mx-auto space-y-6 py-4">
      <Tabs defaultValue="campanhas" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className={isMobile ? "w-full flex" : ""}>
          <TabsTrigger value="campanhas" className={isMobile ? "flex-1" : ""}>Mensageria</TabsTrigger>
          <TabsTrigger value="trafego-pago" className={isMobile ? "flex-1" : ""}>Tráfego Pago</TabsTrigger>
          <TabsTrigger value="configuracoes" className={isMobile ? "flex-1" : ""}>Configurações</TabsTrigger>
        </TabsList>
        <TabsContent value="campanhas">
          <Card className="bg-white/50 backdrop-blur-sm p-4 overflow-x-auto">
            <CampanhasMensageria />
          </Card>
        </TabsContent>
        <TabsContent value="trafego-pago">
          <Card className="bg-white/50 backdrop-blur-sm p-4 overflow-x-auto">
            <CampanhasTrafegoPago />
          </Card>
        </TabsContent>
        <TabsContent value="configuracoes">
          <Card className="bg-white/50 backdrop-blur-sm p-4 overflow-x-auto">
            <ChannelConfigurationForm />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampanhasPage;
