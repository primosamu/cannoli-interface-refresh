
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Ticket, PercentIcon, Clock, Calendar, ChevronRight, DollarSign, Users, ShoppingBag, ArrowUpDown, X, PencilLine, LineChart } from "lucide-react";

// Types for our promotion system
type PromotionType = 
  | "product_discount" 
  | "time_limited" 
  | "order_value_discount" 
  | "coupon" 
  | "loyalty_points"
  | "combo_discount";

type PromotionStatus = "active" | "scheduled" | "expired" | "draft";

interface Promotion {
  id: string;
  name: string;
  description: string;
  type: PromotionType;
  discountValue: number;
  discountType: "percentage" | "fixed";
  startDate: string;
  endDate: string;
  status: PromotionStatus;
  conditions: {
    minOrderValue?: number;
    maxOrderValue?: number;
    customerGroups?: string[];
    paymentMethods?: string[];
    products?: string[];
    categories?: string[];
    usageLimit?: number;
    usageCount: number;
  };
  isAccumulative: boolean;
  priority: number;
  statistics: {
    usageCount: number;
    revenue: number;
    discountTotal: number;
    averageOrderValue: number;
  };
}

// Mock data for promotions
const mockPromotions: Promotion[] = [
  {
    id: "promo1",
    name: "Happy Hour - 15% OFF",
    description: "Desconto de 15% em todos os pratos entre 15h e 18h",
    type: "time_limited",
    discountValue: 15,
    discountType: "percentage",
    startDate: new Date(Date.now()).toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    conditions: {
      usageCount: 43,
    },
    isAccumulative: false,
    priority: 1,
    statistics: {
      usageCount: 43,
      revenue: 3452.75,
      discountTotal: 517.91,
      averageOrderValue: 80.29,
    },
  },
  {
    id: "promo2",
    name: "Combo Família",
    description: "20% de desconto em combos para família",
    type: "combo_discount",
    discountValue: 20,
    discountType: "percentage",
    startDate: new Date(Date.now()).toISOString(),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    conditions: {
      products: ["combo-familia", "combo-festa"],
      usageCount: 78,
    },
    isAccumulative: false,
    priority: 2,
    statistics: {
      usageCount: 78,
      revenue: 7820.50,
      discountTotal: 1564.10,
      averageOrderValue: 100.26,
    },
  },
  {
    id: "promo3",
    name: "Pedido acima de R$100",
    description: "Ganhe R$10 de desconto em pedidos acima de R$100",
    type: "order_value_discount",
    discountValue: 10,
    discountType: "fixed",
    startDate: new Date(Date.now()).toISOString(),
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    conditions: {
      minOrderValue: 100,
      usageCount: 126,
    },
    isAccumulative: true,
    priority: 3,
    statistics: {
      usageCount: 126,
      revenue: 15120.00,
      discountTotal: 1260.00,
      averageOrderValue: 120.00,
    },
  },
];

// Helper function to get the appropriate icon for a promotion type
const getPromotionIcon = (type: PromotionType) => {
  switch (type) {
    case "product_discount":
      return <ShoppingBag className="h-5 w-5" />;
    case "time_limited":
      return <Clock className="h-5 w-5" />;
    case "order_value_discount":
      return <DollarSign className="h-5 w-5" />;
    case "coupon":
      return <Ticket className="h-5 w-5" />;
    case "loyalty_points":
      return <Users className="h-5 w-5" />;
    case "combo_discount":
      return <ShoppingBag className="h-5 w-5" />;
    default:
      return <PercentIcon className="h-5 w-5" />;
  }
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

// Helper to calculate days remaining
const getDaysRemaining = (dateString: string) => {
  const endDate = new Date(dateString);
  const today = new Date();
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

const PromocoesPage = () => {
  const { toast } = useToast();
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [isNewPromotionDialogOpen, setIsNewPromotionDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todas");
  const [isAnalyticsDialogOpen, setIsAnalyticsDialogOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

  // Filter promotions based on active tab
  const filteredPromotions = promotions.filter(promo => {
    if (activeTab === "todas") return true;
    if (activeTab === "ativas" && promo.status === "active") return true;
    if (activeTab === "agendadas" && promo.status === "scheduled") return true;
    if (activeTab === "expiradas" && promo.status === "expired") return true;
    if (activeTab === "rascunhos" && promo.status === "draft") return true;
    return false;
  });

  const handleShowAnalytics = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setIsAnalyticsDialogOpen(true);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Promoções</h1>
          <p className="text-muted-foreground">Gerencie suas promoções e descontos</p>
        </div>
        <Button onClick={() => setIsNewPromotionDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Nova Promoção
        </Button>
      </div>
      
      <Tabs defaultValue="todas" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="ativas">Ativas</TabsTrigger>
          <TabsTrigger value="agendadas">Agendadas</TabsTrigger>
          <TabsTrigger value="expiradas">Expiradas</TabsTrigger>
          <TabsTrigger value="rascunhos">Rascunhos</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-4">
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Gerenciamento de Promoções</CardTitle>
              <CardDescription>
                {activeTab === "todas" && "Todas as promoções disponíveis"}
                {activeTab === "ativas" && "Promoções atualmente ativas"}
                {activeTab === "agendadas" && "Promoções agendadas para iniciar futuramente"}
                {activeTab === "expiradas" && "Promoções que já expiraram"}
                {activeTab === "rascunhos" && "Rascunhos de promoções não publicadas"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPromotions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <PercentIcon className="mx-auto h-12 w-12 opacity-20 mb-2" />
                    <p>Nenhuma promoção encontrada nesta categoria</p>
                    <Button variant="outline" onClick={() => setIsNewPromotionDialogOpen(true)} className="mt-4">
                      Criar nova promoção
                    </Button>
                  </div>
                ) : (
                  filteredPromotions.map(promotion => (
                    <Card key={promotion.id} className="overflow-hidden">
                      <div className="border-l-4 border-primary p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              {getPromotionIcon(promotion.type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{promotion.name}</h3>
                                <Badge 
                                  variant={promotion.status === "active" ? "default" : 
                                          promotion.status === "scheduled" ? "outline" : 
                                          promotion.status === "expired" ? "secondary" : "destructive"}
                                  className={promotion.status === "active" ? "bg-green-500" : ""}
                                >
                                  {promotion.status === "active" ? "Ativa" : 
                                   promotion.status === "scheduled" ? "Agendada" : 
                                   promotion.status === "expired" ? "Expirada" : "Rascunho"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{promotion.description}</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <span className="text-xs text-muted-foreground">
                                  Válida: {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  ({getDaysRemaining(promotion.endDate)} dias restantes)
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="outline" className="font-medium">
                              {promotion.discountType === "percentage" 
                                ? `${promotion.discountValue}% OFF` 
                                : `R$ ${promotion.discountValue.toFixed(2)} OFF`}
                            </Badge>
                            <div className="text-sm">
                              Uso: {promotion.conditions.usageCount} vezes
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleShowAnalytics(promotion)}>
                                <LineChart className="mr-1 h-4 w-4" /> Análise
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => toast({
                                title: "Edição em breve",
                                description: "Esta funcionalidade será implementada em breve."
                              })}>
                                <PencilLine className="mr-1 h-4 w-4" /> Editar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* New Promotion Dialog - Placeholder for future implementation */}
      <Dialog open={isNewPromotionDialogOpen} onOpenChange={setIsNewPromotionDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nova Promoção</DialogTitle>
            <DialogDescription>
              Crie uma nova promoção para atrair mais clientes e aumentar suas vendas.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input id="name" placeholder="Nome da promoção" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Input id="description" placeholder="Descrição breve" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promo-type" className="text-right">
                Tipo
              </Label>
              <Select>
                <SelectTrigger id="promo-type" className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo de promoção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product_discount">Desconto em produtos</SelectItem>
                  <SelectItem value="time_limited">Tempo limitado</SelectItem>
                  <SelectItem value="order_value_discount">Desconto por valor de compra</SelectItem>
                  <SelectItem value="combo_discount">Desconto em combos</SelectItem>
                  <SelectItem value="coupon">Cupom de desconto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount-value" className="text-right">
                Valor
              </Label>
              <div className="col-span-3 flex gap-2 items-center">
                <Input id="discount-value" placeholder="Valor do desconto" className="flex-1" />
                <Select defaultValue="percentage">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Tipo de desconto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Porcentagem</SelectItem>
                    <SelectItem value="fixed">Valor fixo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start-date" className="text-right">
                Período
              </Label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                <Input id="start-date" type="date" />
                <Input id="end-date" type="date" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right">
                <Label>Configurações</Label>
              </div>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="active" />
                  <label
                    htmlFor="active"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Ativar promoção imediatamente
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="accumulative" />
                  <label
                    htmlFor="accumulative"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Permitir acumular com outras promoções
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewPromotionDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              toast({
                title: "Promoção criada",
                description: "Sua promoção foi criada com sucesso!",
              });
              setIsNewPromotionDialogOpen(false);
            }}>
              Salvar promoção
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Analytics Dialog */}
      <Dialog open={isAnalyticsDialogOpen} onOpenChange={setIsAnalyticsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Análise de Resultados</DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsAnalyticsDialogOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              {selectedPromotion && `Análise detalhada para: ${selectedPromotion.name}`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPromotion && (
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Uso da Promoção</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{selectedPromotion.statistics.usageCount}</div>
                    <p className="text-sm text-muted-foreground">Total de usos</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Receita Gerada</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">R$ {selectedPromotion.statistics.revenue.toFixed(2)}</div>
                    <p className="text-sm text-muted-foreground">Valor total de vendas</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total de Descontos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">R$ {selectedPromotion.statistics.discountTotal.toFixed(2)}</div>
                    <p className="text-sm text-muted-foreground">Valor aplicado em descontos</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Ticket Médio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">R$ {selectedPromotion.statistics.averageOrderValue.toFixed(2)}</div>
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
            <Button variant="outline" onClick={() => setIsAnalyticsDialogOpen(false)}>
              Fechar
            </Button>
            <Button 
              onClick={() => {
                toast({
                  title: "Relatório detalhado",
                  description: "Relatório completo será enviado para seu e-mail."
                });
                setIsAnalyticsDialogOpen(false);
              }}
            >
              Exportar Relatório
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromocoesPage;
