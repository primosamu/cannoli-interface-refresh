
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
import { Promotion } from "@/types/promotion";
import { Separator } from "@/components/ui/separator";

interface PromotionAnalyticsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promotion: Promotion | null;
}

const PromotionAnalyticsDialog: React.FC<PromotionAnalyticsDialogProps> = ({
  open,
  onOpenChange,
  promotion
}) => {
  const { toast } = useToast();

  // Calculate additional metrics (these would normally come from the backend)
  const calculateMetrics = (promotion: Promotion | null) => {
    if (!promotion) return null;
    
    // Mock data for demonstration purposes
    const uniqueCustomers = Math.floor(promotion.statistics.usageCount * 0.7);
    const itemsPerOrder = promotion.statistics.averageOrderValue > 50 ? 3.2 : 2.4;
    
    return {
      uniqueCustomers,
      itemsPerOrder: itemsPerOrder.toFixed(1)
    };
  };

  const additionalMetrics = promotion ? calculateMetrics(promotion) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Métricas da Promoção
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            {promotion && `Análise detalhada para: ${promotion.name}`}
          </DialogDescription>
        </DialogHeader>
        
        {promotion && (
          <div className="py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Uso da Promoção</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{promotion.statistics.usageCount}</div>
                  <p className="text-xs text-muted-foreground">Total de usos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Receita Gerada</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {promotion.statistics.revenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Valor total de vendas</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total de Descontos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {promotion.statistics.discountTotal.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Valor aplicado em descontos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {promotion.statistics.averageOrderValue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Valor médio por pedido</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Clientes Únicos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{additionalMetrics?.uniqueCustomers}</div>
                  <p className="text-xs text-muted-foreground">Número de clientes distintos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Itens por Venda</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{additionalMetrics?.itemsPerOrder}</div>
                  <p className="text-xs text-muted-foreground">Média de itens por pedido</p>
                </CardContent>
              </Card>
            </div>
            
            <Separator className="my-6" />
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Insights:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Esta promoção está gerando bons resultados e vale a pena continuar</li>
                <li>Clientes estão comprando em média {additionalMetrics?.itemsPerOrder} itens por pedido</li>
                <li>A taxa de conversão é de {((promotion.statistics.usageCount / (additionalMetrics?.uniqueCustomers || 1)) * 100).toFixed(1)}% (usos por cliente)</li>
                <li>O valor do desconto representa {((promotion.statistics.discountTotal / promotion.statistics.revenue) * 100).toFixed(1)}% da receita total</li>
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

export default PromotionAnalyticsDialog;
