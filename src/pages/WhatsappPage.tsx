
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WhatsappPage = () => {
  const { toast } = useToast();
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    if (!whatsappNumber) {
      toast({
        title: "Número não informado",
        description: "Por favor, insira o número do WhatsApp para conectar.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Conectando WhatsApp",
      description: "Iniciando conexão com o WhatsApp Business API..."
    });
    
    // Simulação de conexão
    setTimeout(() => {
      setIsConnected(true);
      toast({
        title: "WhatsApp Conectado",
        description: "Sua conta foi conectada com sucesso ao WhatsApp Business API."
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">WhatsApp</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Integração com WhatsApp</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Conecte sua conta do WhatsApp Business para enviar mensagens automáticas aos seus clientes.
                </p>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="(00) 00000-0000" 
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    disabled={isConnected}
                  />
                  <Button onClick={handleConnect} disabled={isConnected}>
                    {isConnected ? "Conectado" : "Conectar"}
                  </Button>
                </div>
              </div>

              {isConnected && (
                <div className="rounded-md bg-muted p-4 flex items-center gap-4">
                  <div className="bg-green-500 rounded-full p-2">
                    <Smartphone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{whatsappNumber}</p>
                    <p className="text-sm text-muted-foreground">Conta conectada ao WhatsApp Business</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Envio de Mensagens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Configure mensagens automáticas para seus clientes.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium">Confirmação de Pedido</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium">Status de Entrega</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium">Promoções</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" disabled={!isConnected}>
                Configurar Mensagens Automáticas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WhatsappPage;
