
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampanhasMensageria from "@/components/campanhas/CampanhasMensageria";
import ChannelConfigurationForm from "@/components/campanhas/ChannelConfigurationForm";

const CampanhasPage = () => {
  const [activeTab, setActiveTab] = useState<string>("campanhas");

  return (
    <div className="container mx-auto space-y-6 py-4">
      <Tabs defaultValue="campanhas" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="campanhas">Campanhas</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações de Canais</TabsTrigger>
        </TabsList>
        <TabsContent value="campanhas">
          <Card className="bg-white/50 backdrop-blur-sm p-4">
            <CampanhasMensageria />
          </Card>
        </TabsContent>
        <TabsContent value="configuracoes">
          <Card className="bg-white/50 backdrop-blur-sm p-4">
            <ChannelConfigurationForm />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampanhasPage;
