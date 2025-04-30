
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, ChevronRight, MapPin, Search, Phone, Clock, StarIcon, Users, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function GoogleMyBusinessCard() {
  // Sample metrics
  const metrics = {
    views: 1240,
    searches: 720,
    directions: 85,
    calls: 32,
    website: 110
  };
  
  return (
    <Card className="border-t-4 border-t-red-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="bg-red-50 p-2 rounded-full">
              <Store className="h-5 w-5 text-red-600" />
            </div>
            Google Meu Negócio
          </CardTitle>
          <Button variant="outline" size="sm" className="text-xs">
            Conectar conta
          </Button>
        </div>
        <CardDescription>
          Gerencie sua presença local e promova seu restaurante no Google Maps e na Pesquisa Google
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
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
            
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
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
            
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
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
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="h-4 w-4 mr-2" />
                Ver perfil
              </Button>
              <Button variant="outline" size="sm" className="flex-1 ml-2">
                Relatório completo
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
