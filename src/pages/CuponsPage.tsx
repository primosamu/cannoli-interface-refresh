
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, Plus, X, Check, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Mock coupons data - will be replaced with API data later
const mockCoupons = [
  {
    id: "cpn-123",
    code: "DESCONTO10",
    discount: 10,
    discountType: "percentage",
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    usageCount: 45,
    maxUsage: 100,
    active: true,
  },
  {
    id: "cpn-456",
    code: "VOLTA20",
    discount: 20,
    discountType: "percentage",
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    usageCount: 28,
    maxUsage: 50,
    active: true,
  },
  {
    id: "cpn-789",
    code: "FIDELIDADE15",
    discount: 15,
    discountType: "percentage",
    expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    usageCount: 12,
    maxUsage: 200,
    active: true,
  },
  {
    id: "cpn-321",
    code: "DESC5REAIS",
    discount: 5,
    discountType: "fixed",
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    usageCount: 7,
    maxUsage: 50,
    active: true,
  },
];

const CuponsPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [coupons] = useState(mockCoupons);

  // Format expiry date to dd/mm/yyyy
  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  // Calculate days remaining until expiration
  const getDaysRemaining = (dateString: string) => {
    const expiryDate = new Date(dateString);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Copy coupon code to clipboard
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Código copiado",
      description: `O código ${code} foi copiado para a área de transferência.`
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cupons</h1>
        <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Novo Cupom
        </Button>
      </div>
      
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Cupons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {coupons.map(coupon => (
              <Card key={coupon.id} className="overflow-hidden">
                <div className="border-l-4 border-primary p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Tag className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{coupon.code}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0" 
                          onClick={() => handleCopyCode(coupon.code)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Válido até {formatExpiryDate(coupon.expiresAt)} 
                        <span className="text-xs ml-2">
                          ({getDaysRemaining(coupon.expiresAt)} dias restantes)
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="outline" className="font-medium">
                      {coupon.discountType === "percentage" 
                        ? `${coupon.discount}% OFF` 
                        : `R$ ${coupon.discount.toFixed(2)} OFF`}
                    </Badge>
                    <div className="text-sm">
                      Uso: {coupon.usageCount}/{coupon.maxUsage}
                    </div>
                    <Badge 
                      variant={coupon.active ? "default" : "secondary"}
                      className={coupon.active ? "bg-green-500" : "bg-gray-500"}
                    >
                      {coupon.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* New Coupon Dialog - Placeholder for future implementation */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Cupom</DialogTitle>
            <DialogDescription>
              Crie um novo cupom de desconto para suas campanhas.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-muted-foreground">
              Formulário de criação de cupom será implementado em breve.
              <br />
              (Será integrado com API externa)
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsDialogOpen(false)} disabled>
              Criar Cupom
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CuponsPage;
