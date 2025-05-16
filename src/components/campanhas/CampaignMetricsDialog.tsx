
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { X, Download, BarChart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CampaignMetrics {
  usageCount: number;
  revenue: number;
  discountTotal: number;
  averageOrderValue: number;
  uniqueCustomers?: number;
  itemsPerOrder?: number;
}

interface CampaignItem {
  id: string;
  title: string;
  description: string;
  metrics?: CampaignMetrics;
  badge: string;
}

interface CampaignMetricsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: CampaignItem | null;
}

const CampaignMetricsDialog: React.FC<CampaignMetricsDialogProps> = ({
  open,
  onOpenChange,
  campaign
}) => {
  const { toast } = useToast();

  // Generate mock metrics if none are provided
  const metrics = campaign?.metrics || {
    usageCount: Math.floor(Math.random() * 300) + 50,
    revenue: Math.floor(Math.random() * 5000) + 1000,
    discountTotal: Math.floor(Math.random() * 1000) + 200,
    averageOrderValue: Math.floor(Math.random() * 60) + 20,
    uniqueCustomers: Math.floor(Math.random() * 200) + 40,
    itemsPerOrder: parseFloat((Math.random() * 2 + 1.5).toFixed(1))
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Métricas da Campanha
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            {campaign && `Análise detalhada para: ${campaign.title}`}
          </DialogDescription>
        </DialogHeader>
        
        {campaign && (
          <div className="py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Uso da Campanha</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.usageCount}</div>
                  <p className="text-xs text-muted-foreground">Total de usos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Receita Gerada</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {metrics.revenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Valor total de vendas</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total de Descontos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {metrics.discountTotal.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Valor aplicado em descontos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {metrics.averageOrderValue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Valor médio por pedido</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Clientes Únicos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.uniqueCustomers}</div>
                  <p className="text-xs text-muted-foreground">Número de clientes distintos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Itens por Venda</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.itemsPerOrder}</div>
                  <p className="text-xs text-muted-foreground">Média de itens por pedido</p>
                </CardContent>
              </Card>
            </div>
            
            <Separator className="my-6" />
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Insights:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Esta campanha está gerando bons resultados e vale a pena continuar</li>
                <li>Clientes estão comprando em média {metrics.itemsPerOrder} itens por pedido</li>
                <li>A taxa de conversão é de {((metrics.usageCount / (metrics.uniqueCustomers || 1)) * 100).toFixed(1)}% (usos por cliente)</li>
                <li>O valor do desconto representa {((metrics.discountTotal / metrics.revenue) * 100).toFixed(1)}% da receita total</li>
              </ul>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button 
            onClick={() => {
              toast({
                title: "Relatório detalhado",
                description: "Relatório completo será enviado para seu e-mail."
              });
              onOpenChange(false);
            }}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignMetricsDialog;
