
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, Phone, Plus, Filter, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CampanhasMensageria = () => {
  const { toast } = useToast();
  
  const handleCreateCampaign = (type: string) => {
    toast({
      title: "Criar campanha",
      description: `Iniciando criação de campanha de ${type}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Envio de mensagens para seus clientes</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Campanha
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              WhatsApp
            </CardTitle>
            <CardDescription>Envie mensagens diretas para o WhatsApp dos seus clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">98%</span> de taxa de abertura
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">45%</span> de taxa de conversão
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => handleCreateCampaign("WhatsApp")}>
              Criar Campanha
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              SMS
            </CardTitle>
            <CardDescription>Envie mensagens de texto para os celulares dos clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">92%</span> de taxa de abertura
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">12%</span> de taxa de conversão
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => handleCreateCampaign("SMS")}>
              Criar Campanha
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="bg-purple-100 p-2 rounded-full">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              Email
            </CardTitle>
            <CardDescription>Envie emails personalizados para seus clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">32%</span> de taxa de abertura
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">8%</span> de taxa de conversão
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => handleCreateCampaign("Email")}>
              Criar Campanha
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Segmentação de público
        </h4>
        <p className="text-sm text-muted-foreground">
          Segmente seus clientes por comportamento, região, valor de compra, frequência e muito mais para 
          criar campanhas direcionadas e relevantes.
        </p>
        <Button variant="link" className="p-0 h-auto mt-2">
          Saiba mais sobre segmentação
        </Button>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 border">
        <h4 className="font-medium">Campanhas recentes</h4>
        <p className="text-sm text-muted-foreground">Você ainda não possui campanhas de mensageria. Crie sua primeira campanha agora!</p>
      </div>
    </div>
  );
};

export default CampanhasMensageria;
