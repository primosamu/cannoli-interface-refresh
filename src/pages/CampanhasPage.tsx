
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Target } from "lucide-react";
import CampanhasMensageria from "@/components/campanhas/CampanhasMensageria";
import CampanhasTrafegoPago from "@/components/campanhas/CampanhasTrafegoPago";

const CampanhasPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("mensageria");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam && (tabParam === "mensageria" || tabParam === "trafego-pago")) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Campanhas</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Campanhas</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mensageria" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Mensageria</span>
              </TabsTrigger>
              <TabsTrigger value="trafego-pago" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>Tráfego Pago</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mensageria" className="space-y-4">
              <CampanhasMensageria />
            </TabsContent>
            
            <TabsContent value="trafego-pago" className="space-y-4">
              <CampanhasTrafegoPago />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampanhasPage;
