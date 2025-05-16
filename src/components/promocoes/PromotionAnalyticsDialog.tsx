
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
import { X } from "lucide-react";
import { Promotion } from "@/types/promotion";

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Análise de Resultados</DialogTitle>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Uso da Promoção</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{promotion.statistics.usageCount}</div>
                  <p className="text-sm text-muted-foreground">Total de usos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Receita Gerada</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">R$ {promotion.statistics.revenue.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">Valor total de vendas</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total de Descontos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">R$ {promotion.statistics.discountTotal.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">Valor aplicado em descontos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Ticket Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">R$ {promotion.statistics.averageOrderValue.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">Valor médio por pedido</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Recomendações:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Esta promoção está gerando bons resultados e vale a pena continuar</li>
                <li>Considere estender o período de validade desta promoção</li>
                <li>Divulgue mais esta promoção nos seus canais de comunicação</li>
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
          >
            Exportar Relatório
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PromotionAnalyticsDialog;
