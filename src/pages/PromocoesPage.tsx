
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Filter, Plus, PercentIcon } from "lucide-react";
import { Promotion } from "@/types/promotion";

// Import all the components
import PromotionCard from "@/components/promocoes/PromotionCard";
import PromotionFiltersDialog from "@/components/promocoes/PromotionFiltersDialog";
import PromotionAnalyticsDialog from "@/components/promocoes/PromotionAnalyticsDialog";
import NewPromotionDialog from "@/components/promocoes/NewPromotionDialog";
import ActiveFilters from "@/components/promocoes/ActiveFilters";
import EmptyPromotionState from "@/components/promocoes/EmptyPromotionState";
import { mockPromotions, mockCustomerGroups, mockProducts, mockCategories, mockPaymentMethods } from "@/components/promocoes/mockData";
import { PromotionFormValues } from "@/components/promocoes/NewPromotionDialog";

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
    // Combine start date and time
    const startDateTime = new Date(`${data.startDate}T${data.startTime || '00:00'}:00`);
    
    // Combine end date and time
    const endDateTime = new Date(`${data.endDate}T${data.endTime || '23:59'}:59`);
    
    const newPromotion: Promotion = {
      id: `promo${promotions.length + 1}`,
      name: data.name,
      description: data.description || "",
      type: data.type as any,
      discountValue: data.discountValue,
      discountType: data.discountType as "percentage" | "fixed",
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
      status: "active",
      conditions: {
        minOrderValue: data.minOrderValue,
        maxOrderValue: data.maxOrderValue,
        customerGroups: data.customerGroups,
        paymentMethods: data.paymentMethods,
        products: [...(data.products || []), ...(data.includeProducts || [])],
        categories: data.categories,
        usageCount: 0,
        buyQuantity: data.buyQuantity,
        getQuantity: data.getQuantity,
        excludeProducts: data.excludeProducts
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
                
                <ActiveFilters 
                  typeFilter={typeFilter}
                  productFilter={productFilter}
                  customerGroupFilter={customerGroupFilter}
                  paymentMethodFilter={paymentMethodFilter}
                  setTypeFilter={setTypeFilter}
                  setProductFilter={setProductFilter}
                  setCustomerGroupFilter={setCustomerGroupFilter}
                  setPaymentMethodFilter={setPaymentMethodFilter}
                  resetFilters={resetFilters}
                  mockProducts={mockProducts}
                  mockCategories={mockCategories}
                  mockCustomerGroups={mockCustomerGroups}
                  mockPaymentMethods={mockPaymentMethods}
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPromotions.length === 0 ? (
                  <EmptyPromotionState onNewPromotion={() => setIsNewPromotionDialogOpen(true)} />
                ) : (
                  filteredPromotions.map(promotion => (
                    <PromotionCard 
                      key={promotion.id}
                      promotion={promotion}
                      onShowAnalytics={handleShowAnalytics}
                      mockCustomerGroups={mockCustomerGroups}
                      mockProducts={mockProducts}
                      mockPaymentMethods={mockPaymentMethods}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Filters Dialog */}
      <PromotionFiltersDialog 
        open={isFiltersDialogOpen}
        onOpenChange={setIsFiltersDialogOpen}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        productFilter={productFilter}
        setProductFilter={setProductFilter}
        customerGroupFilter={customerGroupFilter}
        setCustomerGroupFilter={setCustomerGroupFilter}
        paymentMethodFilter={paymentMethodFilter}
        setPaymentMethodFilter={setPaymentMethodFilter}
        resetFilters={resetFilters}
        mockProducts={mockProducts}
        mockCategories={mockCategories}
        mockCustomerGroups={mockCustomerGroups}
        mockPaymentMethods={mockPaymentMethods}
      />
      
      {/* New Promotion Dialog */}
      <NewPromotionDialog 
        open={isNewPromotionDialogOpen}
        onOpenChange={setIsNewPromotionDialogOpen}
        onCreatePromotion={handleCreatePromotion}
        mockProducts={mockProducts}
        mockCategories={mockCategories}
        mockCustomerGroups={mockCustomerGroups}
        mockPaymentMethods={mockPaymentMethods}
      />
      
      {/* Analytics Dialog */}
      <PromotionAnalyticsDialog 
        open={isAnalyticsDialogOpen}
        onOpenChange={setIsAnalyticsDialogOpen}
        promotion={selectedPromotion}
      />
    </div>
  );
};

export default PromocoesPage;
