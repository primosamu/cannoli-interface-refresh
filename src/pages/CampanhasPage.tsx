
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampanhasMensageria from "@/components/campanhas/CampanhasMensageria";
import ChannelConfigurationForm from "@/components/campanhas/ChannelConfigurationForm";
import CampanhasTrafegoPago from "@/components/campanhas/CampanhasTrafegoPago";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const CampanhasPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<string>("campanhas");

  useEffect(() => {
    // Process URL parameter to set active tab
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Update URL with the selected tab
    if (value === "campanhas") {
      navigate("/campanhas", { replace: true });
    } else {
      navigate(`/campanhas?tab=${value}`, { replace: true });
    }
  };

  return (
    <div className="container mx-auto space-y-6 py-4 px-2 sm:px-4">
      <Tabs 
        defaultValue="campanhas" 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList 
          className={
            isMobile 
              ? "w-full grid grid-cols-3 mb-4 bg-cannoli-cream/50 p-1 rounded-lg border border-cannoli-yellow/30" 
              : "bg-cannoli-cream/50 p-1 rounded-lg border border-cannoli-yellow/30"
          }
        >
          <TabsTrigger 
            value="campanhas" 
            className={`
              ${isMobile ? "text-xs py-2" : "px-4 py-2"} 
              data-[state=active]:bg-cannoli-yellow data-[state=active]:text-cannoli-brown
              transition-all duration-200
            `}
          >
            Mensageria
          </TabsTrigger>
          <TabsTrigger 
            value="trafego-pago" 
            className={`
              ${isMobile ? "text-xs py-2" : "px-4 py-2"} 
              data-[state=active]:bg-cannoli-yellow data-[state=active]:text-cannoli-brown
              transition-all duration-200
            `}
          >
            Tráfego Pago
          </TabsTrigger>
          <TabsTrigger 
            value="configuracoes" 
            className={`
              ${isMobile ? "text-xs py-2" : "px-4 py-2"}
              data-[state=active]:bg-cannoli-yellow data-[state=active]:text-cannoli-brown
              transition-all duration-200
            `}
          >
            Configurações
          </TabsTrigger>
        </TabsList>
        <TabsContent value="campanhas">
          <Card className="cannoli-card p-3 sm:p-4 overflow-x-auto">
            <CampanhasMensageria />
          </Card>
        </TabsContent>
        <TabsContent value="trafego-pago">
          <Card className="cannoli-card p-3 sm:p-4 overflow-x-auto">
            <CampanhasTrafegoPago />
          </Card>
        </TabsContent>
        <TabsContent value="configuracoes">
          <Card className="cannoli-card p-3 sm:p-4 overflow-x-auto">
            <ChannelConfigurationForm />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampanhasPage;
