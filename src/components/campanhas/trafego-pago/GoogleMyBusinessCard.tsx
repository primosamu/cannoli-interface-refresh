
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, ChevronRight, MapPin, Search, Phone, Clock, StarIcon, Users, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export function GoogleMyBusinessCard() {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  
  // Sample metrics
  const metrics = {
    views: 1240,
    searches: 720,
    directions: 85,
    calls: 32,
    website: 110
  };
  
  const handleConnect = () => {
    // In a real implementation, this would initiate OAuth with Google
    toast({
      title: "Conectando com Google Meu Negócio",
      description: "Você será redirecionado para autenticação do Google em instantes.",
    });
    
    // Simulate successful connection
    setTimeout(() => {
      setIsConnected(true);
      setShowConnectDialog(false);
      toast({
        title: "Conectado com sucesso!",
        description: "Sua conta do Google Meu Negócio foi vinculada.",
      });
    }, 1500);
  };
  
  const handleCardClick = (type: string) => {
    toast({
      title: `Gerenciando ${type}`,
      description: "Esta funcionalidade estará disponível em breve.",
    });
  };
  
  return (
    <>
      <Card className="border-t-4 border-t-red-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="bg-red-50 p-2 rounded-full">
                <Store className="h-5 w-5 text-red-600" />
              </div>
              Google Meu Negócio
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => isConnected ? 
                toast({ title: "Conta já conectada", description: "Sua conta já está vinculada ao Google Meu Negócio" }) : 
                setShowConnectDialog(true)}
            >
              {isConnected ? "Conectado ✓" : "Conectar conta"}
            </Button>
          </div>
          <CardDescription>
            Gerencie sua presença local e promova seu restaurante no Google Maps e na Pesquisa Google
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div 
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer"
                onClick={() => handleCardClick("Informações do Negócio")}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-1.5 rounded-full">
                    <MapPin className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Informações do Negócio</h4>
                    <p className="text-sm text-muted-foreground">Endereço, horários, fotos e contato</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div 
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer"
                onClick={() => handleCardClick("Avaliações e Respostas")}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-1.5 rounded-full">
                    <Users className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Avaliações e Respostas</h4>
                    <p className="text-sm text-muted-foreground">Gerencie feedback de clientes</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div 
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer"
                onClick={() => handleCardClick("Posts e Promoções")}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-1.5 rounded-full">
                    <Store className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Posts e Promoções</h4>
                    <p className="text-sm text-muted-foreground">Anuncie ofertas e novidades</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-sm mb-2">Desempenho nos últimos 30 dias</h4>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Search className="h-3.5 w-3.5" />
                      <span>Buscas</span>
                    </div>
                    <span className="font-medium">{metrics.searches}</span>
                  </div>
                  <Progress value={72} className="h-1.5" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Eye className="h-3.5 w-3.5" />
                      <span>Visualizações</span>
                    </div>
                    <span className="font-medium">{metrics.views}</span>
                  </div>
                  <Progress value={100} className="h-1.5" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Rotas</span>
                    </div>
                    <span className="font-medium">{metrics.directions}</span>
                  </div>
                  <Progress value={35} className="h-1.5" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5" />
                      <span>Ligações</span>
                    </div>
                    <span className="font-medium">{metrics.calls}</span>
                  </div>
                  <Progress value={20} className="h-1.5" />
                </div>
              </div>
              
              <div className="flex mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setShowProfileDialog(true)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver perfil
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 ml-2"
                  onClick={() => setShowReportDialog(true)}
                >
                  Relatório completo
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Connect Dialog */}
      <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conectar ao Google Meu Negócio</DialogTitle>
            <DialogDescription>
              Conecte sua conta para gerenciar sua presença online e aproveitar os benefícios da integração com campanhas do Google Ads.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-slate-50 p-4 rounded-md mb-4">
              <h4 className="font-medium mb-2">Benefícios da integração:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Sincronização automática de informações do seu negócio</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Monitoramento de avaliações e interações com clientes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Campanhas locais otimizadas com informações do seu perfil</span>
                </li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConnectDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleConnect}
              className="bg-red-600 hover:bg-red-700"
            >
              Conectar com Google
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seu perfil no Google Meu Negócio</DialogTitle>
            <DialogDescription>
              Visualize como seu negócio aparece para os clientes no Google.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="border rounded-md p-4 text-center">
              <p className="text-muted-foreground mb-2">
                {isConnected ? 
                "Esta é uma prévia de como seu restaurante aparece nas pesquisas do Google." : 
                "Conecte sua conta do Google Meu Negócio para visualizar seu perfil."}
              </p>
              <div className="bg-slate-100 rounded-md h-48 flex items-center justify-center">
                <Store className="h-12 w-12 text-slate-400" />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowProfileDialog(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Relatório do Google Meu Negócio</DialogTitle>
            <DialogDescription>
              Análise completa do desempenho do seu perfil nos últimos 30 dias.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {isConnected ? (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-slate-50 p-4 rounded-md text-center">
                    <p className="text-sm text-muted-foreground">Visualizações</p>
                    <p className="text-2xl font-bold">{metrics.views}</p>
                    <p className="text-xs text-green-600">+12% vs mês anterior</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-md text-center">
                    <p className="text-sm text-muted-foreground">Rotas</p>
                    <p className="text-2xl font-bold">{metrics.directions}</p>
                    <p className="text-xs text-green-600">+8% vs mês anterior</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-md text-center">
                    <p className="text-sm text-muted-foreground">Ligações</p>
                    <p className="text-2xl font-bold">{metrics.calls}</p>
                    <p className="text-xs text-amber-600">+2% vs mês anterior</p>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-md">
                  <h4 className="font-medium mb-3">Avaliações recentes</h4>
                  <div className="space-y-3">
                    {[
                      { name: "João S.", rating: 5, text: "Adorei o atendimento e a comida estava deliciosa!" },
                      { name: "Maria L.", rating: 4, text: "Boa experiência, mas o tempo de espera poderia ser menor." }
                    ].map((review, i) => (
                      <div key={i} className="border-b pb-2 last:border-b-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{review.name}</p>
                          <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                              <span key={i} className={i < review.rating ? "text-amber-500" : "text-slate-300"}>★</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-6">
                <Store className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="font-medium mb-2">Conecte sua conta para ver o relatório completo</h3>
                <p className="text-muted-foreground mb-4">
                  Acesse insights detalhados sobre seu desempenho no Google.
                </p>
                <Button onClick={() => {
                  setShowReportDialog(false);
                  setShowConnectDialog(true);
                }}>
                  Conectar Agora
                </Button>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowReportDialog(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
