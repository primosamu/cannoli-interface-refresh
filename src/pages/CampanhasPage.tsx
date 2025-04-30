
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampanhasMensageria from "@/components/campanhas/CampanhasMensageria";
import CampanhasTrafegoPago from "@/components/campanhas/CampanhasTrafegoPago";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CampanhasPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const tabParam = params.get("tab") || "mensageria";
  const [activeTab, setActiveTab] = useState(tabParam);
  
  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`?tab=${value}`, { replace: true });
  };
  
  // Update tab state when URL changes
  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  return (
    <div className="space-y-6">
      <Card className="bg-white/50 backdrop-blur-sm p-4">
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="space-y-4"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto">
            <TabsTrigger value="mensageria">Campanhas de Mensageria</TabsTrigger>
            <TabsTrigger value="trafego-pago">Tráfego Pago</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mensageria" className="space-y-4">
            <CampanhasMensageria />
          </TabsContent>
          
          <TabsContent value="trafego-pago" className="space-y-4">
            <CampanhasTrafegoPago />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default CampanhasPage;
