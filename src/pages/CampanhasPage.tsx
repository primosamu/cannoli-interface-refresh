
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import CampanhasMensageria from "@/components/campanhas/CampanhasMensageria";
import CampanhasTrafegoPago from "@/components/campanhas/CampanhasTrafegoPago";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CampanhasPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("mensageria");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam && (tabParam === "mensageria" || tabParam === "trafego-pago")) {
      setActiveTab(tabParam);
    } else if (!tabParam) {
      // Default to mensageria if no tab is specified
      setActiveTab("mensageria");
    }
  }, [location.search]);

  return (
    <div className="space-y-6">
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="mensageria">Mensageria</TabsTrigger>
              <TabsTrigger value="trafego-pago">Tráfego Pago</TabsTrigger>
            </TabsList>
            <TabsContent value="mensageria" className="p-4">
              <CampanhasMensageria />
            </TabsContent>
            <TabsContent value="trafego-pago" className="p-4">
              <CampanhasTrafegoPago />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampanhasPage;
