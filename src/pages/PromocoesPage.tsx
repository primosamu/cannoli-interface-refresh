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
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, Ticket, PercentIcon, Clock, Calendar, ChevronRight, DollarSign, Users, ShoppingBag, ArrowUpDown, X, PencilLine, LineChart, Filter, CreditCard, TagIcon, Package } from "lucide-react";

// Types for our promotion system
type PromotionType = 
  | "product_discount" 
  | "time_limited" 
  | "order_value_discount" 
  | "coupon" 
  | "loyalty_points"
  | "combo_discount"
  | "buy_x_get_y";

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
    buyQuantity?: number;
    getQuantity?: number;
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
      paymentMethods: ["credit_card", "debit_card"],
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
      customerGroups: ["families", "new_customers"],
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
  {
    id: "promo4",
    name: "Compre 2 Pizzas, Ganhe 1 Refrigerante",
    description: "Na compra de 2 pizzas grandes, ganhe 1 refrigerante de 2L",
    type: "buy_x_get_y",
    discountValue: 100,
    discountType: "percentage",
    startDate: new Date(Date.now()).toISOString(),
    endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    conditions: {
      products: ["pizza-grande"],
      categories: ["pizzas"],
      usageCount: 52,
      buyQuantity: 2,
      getQuantity: 1,
    },
    isAccumulative: false,
    priority: 2,
    statistics: {
      usageCount: 52,
      revenue: 6240.00,
      discountTotal: 780.00,
      averageOrderValue: 120.00,
    },
  },
];

// Mock data for customer groups, products, payment methods, etc.
const mockCustomerGroups = [
  { id: "families", name: "Famílias" },
  { id: "new_customers", name: "Novos Clientes" },
  { id: "vip", name: "VIP" },
  { id: "regular", name: "Clientes Frequentes" },
];

const mockProducts = [
  { id: "pizza-grande", name: "Pizza Grande" },
  { id: "combo-familia", name: "Combo Família" },
  { id: "combo-festa", name: "Combo Festa" },
  { id: "refrigerante-2l", name: "Refrigerante 2L" },
  { id: "sobremesa", name: "Sobremesa" },
];

const mockCategories = [
  { id: "pizzas", name: "Pizzas" },
  { id: "combos", name: "Combos" },
  { id: "bebidas", name: "Bebidas" },
  { id: "sobremesas", name: "Sobremesas" },
];

const mockPaymentMethods = [
  { id: "credit_card", name: "Cartão de Crédito" },
  { id: "debit_card", name: "Cartão de Débito" },
  { id: "cash", name: "Dinheiro" },
  { id: "pix", name: "PIX" },
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
    case "buy_x_get_y":
      return <Package className="h-5 w-5" />;
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

// Form schema for new promotion
const promotionFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  description: z.string().optional(),
  type: z.string(),
  discountValue: z.coerce.number().min(0),
  discountType: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  isAccumulative: z.boolean().default(false),
  customerGroups: z.array(z.string()).optional(),
  products: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  paymentMethods: z.array(z.string()).optional(),
  minOrderValue: z.coerce.number().optional(),
  maxOrderValue: z.coerce.number().optional(),
  buyQuantity: z.coerce.number().optional(),
  getQuantity: z.coerce.number().optional(),
});

type PromotionFormValues = z.infer<typeof promotionFormSchema>;

const PromocoesPage = () => {
  const { toast } = useToast();
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [isNewPromotionDialogOpen, setIsNewPromotionDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todas");
  const [isAnalyticsDialogOpen, setIsAnalyticsDialogOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  
  // Filter states
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [productFilter, setProductFilter] = useState<string>("all");
  const [customerGroupFilter, setCustomerGroupFilter] = useState<string>("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>("all");

  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(promotionFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "product_discount",
      discountValue: 0,
      discountType: "percentage",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isAccumulative: false,
      customerGroups: [],
      products: [],
      categories: [],
      paymentMethods: [],
    }
  });

  // Filter promotions based on active tab and filters
  const filteredPromotions = promotions.filter(promo => {
    // Filter by tab status
    if (activeTab === "todas") {} // No filter for "all"
    else if (activeTab === "ativas" && promo.status !== "active") return false;
    else if (activeTab === "agendadas" && promo.status !== "scheduled") return false;
    else if (activeTab === "expiradas" && promo.status !== "expired") return false;
    else if (activeTab === "rascunhos" && promo.status !== "draft") return false;
    
    // Filter by promotion type
    if (typeFilter !== "all" && promo.type !== typeFilter) return false;
    
    // Filter by product/category
    if (productFilter !== "all") {
      const hasProduct = promo.conditions.products?.includes(productFilter);
      const hasCategory = promo.conditions.categories?.includes(productFilter);
      if (!hasProduct && !hasCategory) return false;
    }
    
    // Filter by customer group
    if (customerGroupFilter !== "all") {
      if (!promo.conditions.customerGroups?.includes(customerGroupFilter)) return false;
    }
    
    // Filter by payment method
    if (paymentMethodFilter !== "all") {
      if (!promo.conditions.paymentMethods?.includes(paymentMethodFilter)) return false;
    }
    
    return true;
  });

  const handleShowAnalytics = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setIsAnalyticsDialogOpen(true);
  };

  const handleCreatePromotion = (data: PromotionFormValues) => {
    const newPromotion: Promotion = {
      id: `promo${promotions.length + 1}`,
      name: data.name,
      description: data.description || "",
      type: data.type as PromotionType,
      discountValue: data.discountValue,
      discountType: data.discountType as "percentage" | "fixed",
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      status: "active",
      conditions: {
        minOrderValue: data.minOrderValue,
        maxOrderValue: data.maxOrderValue,
        customerGroups: data.customerGroups,
        paymentMethods: data.paymentMethods,
        products: data.products,
        categories: data.categories,
        usageCount: 0,
        buyQuantity: data.buyQuantity,
        getQuantity: data.getQuantity,
      },
      isAccumulative: data.isAccumulative,
      priority: 1,
      statistics: {
        usageCount: 0,
        revenue: 0,
        discountTotal: 0,
        averageOrderValue: 0,
      },
    };
    
    setPromotions([...promotions, newPromotion]);
    setIsNewPromotionDialogOpen(false);
    
    toast({
      title: "Promoção criada",
      description: `A promoção "${data.name}" foi criada com sucesso!`,
    });
  };

  const resetFilters = () => {
    setTypeFilter("all");
    setProductFilter("all");
    setCustomerGroupFilter("all");
    setPaymentMethodFilter("all");
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Promoções</h1>
          <p className="text-muted-foreground">Gerencie suas promoções e descontos</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsFiltersDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" /> Filtros
          </Button>
          <Button onClick={() => setIsNewPromotionDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Nova Promoção
          </Button>
        </div>
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
                
                {(typeFilter !== "all" || productFilter !== "all" || customerGroupFilter !== "all" || paymentMethodFilter !== "all") && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span>Filtros ativos:</span>
                    {typeFilter !== "all" && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        Tipo: {typeFilter === "product_discount" ? "Desconto em produtos" : 
                               typeFilter === "time_limited" ? "Tempo limitado" :
                               typeFilter === "order_value_discount" ? "Desconto por valor" :
                               typeFilter === "combo_discount" ? "Desconto em combos" :
                               typeFilter === "buy_x_get_y" ? "Compre X Ganhe Y" :
                               typeFilter === "coupon" ? "Cupom" : "Pontos de fidelidade"}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setTypeFilter("all")} />
                      </Badge>
                    )}
                    {productFilter !== "all" && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        Produto/Categoria: {mockProducts.find(p => p.id === productFilter)?.name || 
                                           mockCategories.find(c => c.id === productFilter)?.name}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setProductFilter("all")} />
                      </Badge>
                    )}
                    {customerGroupFilter !== "all" && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        Grupo de Clientes: {mockCustomerGroups.find(g => g.id === customerGroupFilter)?.name}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setCustomerGroupFilter("all")} />
                      </Badge>
                    )}
                    {paymentMethodFilter !== "all" && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        Forma de Pagamento: {mockPaymentMethods.find(m => m.id === paymentMethodFilter)?.name}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setPaymentMethodFilter("all")} />
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="h-6 px-2 text-xs">
                      Limpar filtros
                    </Button>
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPromotions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <PercentIcon className="mx-auto h-12 w-12 opacity-20 mb-2" />
                    <p>Nenhuma promoção encontrada com os filtros selecionados</p>
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
                              
                              {/* Additional details section */}
                              <div className="mt-2 flex flex-wrap gap-2">
                                {promotion.type === "buy_x_get_y" && (
                                  <Badge variant="outline" className="text-xs">
                                    Compre {promotion.conditions.buyQuantity} e Ganhe {promotion.conditions.getQuantity}
                                  </Badge>
                                )}
                                {promotion.conditions.customerGroups && promotion.conditions.customerGroups.length > 0 && (
                                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {promotion.conditions.customerGroups.map(group => 
                                      mockCustomerGroups.find(g => g.id === group)?.name
                                    ).join(", ")}
                                  </Badge>
                                )}
                                {promotion.conditions.products && promotion.conditions.products.length > 0 && (
                                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                                    <ShoppingBag className="h-3 w-3" />
                                    {promotion.conditions.products.map(product => 
                                      mockProducts.find(p => p.id === product)?.name
                                    ).join(", ")}
                                  </Badge>
                                )}
                                {promotion.conditions.paymentMethods && promotion.conditions.paymentMethods.length > 0 && (
                                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                                    <CreditCard className="h-3 w-3" />
                                    {promotion.conditions.paymentMethods.map(method => 
                                      mockPaymentMethods.find(m => m.id === method)?.name
                                    ).join(", ")}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="outline" className="font-medium">
                              {promotion.type === "buy_x_get_y" 
                                ? `${promotion.conditions.getQuantity} grátis`
                                : promotion.discountType === "percentage" 
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
      
      {/* Filters Dialog */}
      <Dialog open={isFiltersDialogOpen} onOpenChange={setIsFiltersDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Filtrar Promoções</DialogTitle>
            <DialogDescription>
              Selecione os filtros para encontrar promoções específicas.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="filter-type" className="text-right">
                Tipo
              </Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="filter-type" className="col-span-3">
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="product_discount">Desconto em produtos</SelectItem>
                  <SelectItem value="time_limited">Tempo limitado</SelectItem>
                  <SelectItem value="order_value_discount">Desconto por valor</SelectItem>
                  <SelectItem value="combo_discount">Desconto em combos</SelectItem>
                  <SelectItem value="buy_x_get_y">Compre X Ganhe Y</SelectItem>
                  <SelectItem value="coupon">Cupom</SelectItem>
                  <SelectItem value="loyalty_points">Pontos de fidelidade</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="filter-product" className="text-right">
                Produto/Categoria
              </Label>
              <Select value={productFilter} onValueChange={setProductFilter}>
                <SelectTrigger id="filter-product" className="col-span-3">
                  <SelectValue placeholder="Todos os produtos/categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os produtos/categorias</SelectItem>
                  <div className="px-2 py-1.5 text-sm font-semibold">Produtos</div>
                  {mockProducts.map(product => (
                    <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                  ))}
                  <div className="px-2 py-1.5 text-sm font-semibold">Categorias</div>
                  {mockCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="filter-customer" className="text-right">
                Grupo de Clientes
              </Label>
              <Select value={customerGroupFilter} onValueChange={setCustomerGroupFilter}>
                <SelectTrigger id="filter-customer" className="col-span-3">
                  <SelectValue placeholder="Todos os grupos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os grupos</SelectItem>
                  {mockCustomerGroups.map(group => (
                    <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="filter-payment" className="text-right">
                Forma de Pagamento
              </Label>
              <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                <SelectTrigger id="filter-payment" className="col-span-3">
                  <SelectValue placeholder="Todas as formas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as formas</SelectItem>
                  {mockPaymentMethods.map(method => (
                    <SelectItem key={method.id} value={method.id}>{method.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={resetFilters}>
              Limpar Filtros
            </Button>
            <Button onClick={() => setIsFiltersDialogOpen(false)}>
              Aplicar Filtros
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* New Promotion Dialog */}
      <Dialog open={isNewPromotionDialogOpen} onOpenChange={setIsNewPromotionDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nova Promoção</DialogTitle>
            <DialogDescription>
              Crie uma nova promoção para atrair mais clientes e aumentar suas vendas.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreatePromotion)} className="space-y-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormControl>
                          <Input {...field} id="name" placeholder="Nome da promoção" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descrição
                  </Label>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormControl>
                          <Input {...field} id="description" placeholder="Descrição breve" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="promo-type" className="text-right">
                    Tipo
                  </Label>
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger id="promo-type">
                              <SelectValue placeholder="Selecione o tipo de promoção" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="product_discount">Desconto em produtos</SelectItem>
                            <SelectItem value="time_limited">Tempo limitado</SelectItem>
                            <SelectItem value="order_value_discount">Desconto por valor de compra</SelectItem>
                            <SelectItem value="combo_discount">Desconto em combos</SelectItem>
                            <SelectItem value="buy_x_get_y">Compre X Ganhe Y</SelectItem>
                            <SelectItem value="coupon">Cupom de desconto</SelectItem>
                            <SelectItem value="loyalty_points">Pontos de fidelidade</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                
                {form.watch("type") === "buy_x_get_y" ? (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                      Configuração
                    </Label>
                    <div className="col-span-3 grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="buyQuantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Compre (quantidade)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} min={1} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="getQuantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ganhe (quantidade)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} min={1} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="discount-value" className="text-right">
                      Desconto
                    </Label>
                    <div className="col-span-3 flex gap-2 items-center">
                      <FormField
                        control={form.control}
                        name="discountValue"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input 
                                id="discount-value" 
                                type="number"
                                placeholder="Valor do desconto" 
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="discountType"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-[130px]">
                                  <SelectValue placeholder="Tipo de desconto" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="percentage">Porcentagem</SelectItem>
                                <SelectItem value="fixed">Valor fixo</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start-date" className="text-right">
                    Período
                  </Label>
                  <div className="col-span-3 grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input id="start-date" type="date" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input id="end-date" type="date" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {(form.watch("type") === "order_value_discount") && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                      Valor do Pedido
                    </Label>
                    <div className="col-span-3 grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="minOrderValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valor mínimo (R$)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} min={0} step="0.01" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="maxOrderValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valor máximo (R$)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} min={0} step="0.01" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Produtos
                  </Label>
                  <div className="col-span-3 grid grid-cols-1 gap-2">
                    <FormField
                      control={form.control}
                      name="products"
                      render={({ field }) => (
                        <FormItem>
                          <Select 
                            onValueChange={(value) => field.onChange([...field.value || [], value])}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione produtos" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockProducts.map(product => (
                                <SelectItem key={product.id} value={product.id}>
                                  {product.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {(field.value || []).map(productId => {
                              const product = mockProducts.find(p => p.id === productId);
                              return product ? (
                                <Badge key={productId} variant="secondary" className="gap-1">
                                  {product.name}
                                  <X 
                                    className="h-3 w-3 cursor-pointer" 
                                    onClick={() => field.onChange(field.value?.filter(id => id !== productId))}
                                  />
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Categorias
                  </Label>
                  <div className="col-span-3 grid grid-cols-1 gap-2">
                    <FormField
                      control={form.control}
                      name="categories"
                      render={({ field }) => (
                        <FormItem>
                          <Select 
                            onValueChange={(value) => field.onChange([...field.value || [], value])}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione categorias" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockCategories.map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {(field.value || []).map(categoryId => {
                              const category = mockCategories.find(c => c.id === categoryId);
                              return category ? (
                                <Badge key={categoryId} variant="secondary" className="gap-1">
                                  {category.name}
                                  <X 
                                    className="h-3 w-3 cursor-pointer" 
                                    onClick={() => field.onChange(field.value?.filter(id => id !== categoryId))}
                                  />
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Grupos de Clientes
                  </Label>
                  <div className="col-span-3 grid grid-cols-1 gap-2">
                    <FormField
                      control={form.control}
                      name="customerGroups"
                      render={({ field }) => (
                        <FormItem>
                          <Select 
                            onValueChange={(value) => field.onChange([...field.value || [], value])}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione grupos de clientes" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockCustomerGroups.map(group => (
                                <SelectItem key={group.id} value={group.id}>
                                  {group.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {(field.value || []).map(groupId => {
                              const group = mockCustomerGroups.find(g => g.id === groupId);
                              return group ? (
                                <Badge key={groupId} variant="secondary" className="gap-1">
                                  {group.name}
                                  <X 
                                    className="h-3 w-3 cursor-pointer" 
                                    onClick={() => field.onChange(field.value?.filter(id => id !== groupId))}
                                  />
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Formas de Pagamento
                  </Label>
                  <div className="col-span-3 grid grid-cols-1 gap-2">
                    <FormField
                      control={form.control}
                      name="paymentMethods"
                      render={({ field }) => (
                        <FormItem>
                          <Select 
                            onValueChange={(value) => field.onChange([...field.value || [], value])}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione formas de pagamento" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockPaymentMethods.map(method => (
                                <SelectItem key={method.id} value={method.id}>
                                  {method.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {(field.value || []).map(methodId => {
                              const method = mockPaymentMethods.find(m => m.id === methodId);
                              return method ? (
                                <Badge key={methodId} variant="secondary" className="gap-1">
                                  {method.name}
                                  <X 
                                    className="h-3 w-3 cursor-pointer" 
                                    onClick={() => field.onChange(field.value?.filter(id => id !== methodId))}
                                  />
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right">
                    <Label>Configurações</Label>
                  </div>
                  <div className="col-span-3 space-y-2">
                    <FormField
                      control={form.control}
                      name="isAccumulative"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Permitir acumular com outras promoções
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewPromotionDialogOpen(false)} type="button">
                  Cancelar
                </Button>
                <Button type="submit">
                  Salvar promoção
                </Button>
              </DialogFooter>
            </form>
          </Form>
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
