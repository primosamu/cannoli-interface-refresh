
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Promotion } from "@/types/promotion";

// Import all the components
import PromotionsPageHeader from "@/components/promocoes/PromotionsPageHeader";
import PromotionsList from "@/components/promocoes/PromotionsList";
import PromotionFiltersDialog from "@/components/promocoes/PromotionFiltersDialog";
import PromotionAnalyticsDialog from "@/components/promocoes/PromotionAnalyticsDialog";
import NewPromotionDialog from "@/components/promocoes/NewPromotionDialog";
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
      code: data.code, // novo campo código
      description: data.description || "",
      type: data.type as any,
      discountValue: data.discountValue,
      discountType: data.discountType as "percentage" | "fixed",
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
      status: data.isActive ? "active" : "draft", // status baseado no campo isActive
      isActive: data.isActive, // novo campo
      conditions: {
        minOrderValue: data.minOrderValue,
        maxOrderValue: data.maxOrderValue,
        customerGroups: data.customerGroups,
        paymentMethods: data.paymentMethods,
        products: data.productCodes || [],
        categories: [],
        usageCount: 0,
        buyQuantity: data.buyQuantity,
        getQuantity: data.getQuantity,
        excludeProducts: []
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
      <PromotionsPageHeader 
        onFiltersClick={() => setIsFiltersDialogOpen(true)}
        onNewPromotionClick={() => setIsNewPromotionDialogOpen(true)}
      />
      
      <Tabs defaultValue="todas" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="ativas">Ativas</TabsTrigger>
          <TabsTrigger value="agendadas">Agendadas</TabsTrigger>
          <TabsTrigger value="expiradas">Expiradas</TabsTrigger>
          <TabsTrigger value="rascunhos">Rascunhos</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-4">
          <PromotionsList 
            promotions={filteredPromotions}
            activeTab={activeTab}
            typeFilter={typeFilter}
            productFilter={productFilter}
            customerGroupFilter={customerGroupFilter}
            paymentMethodFilter={paymentMethodFilter}
            setTypeFilter={setTypeFilter}
            setProductFilter={setProductFilter}
            setCustomerGroupFilter={setCustomerGroupFilter}
            setPaymentMethodFilter={setPaymentMethodFilter}
            resetFilters={resetFilters}
            onShowAnalytics={handleShowAnalytics}
            onNewPromotion={() => setIsNewPromotionDialogOpen(true)}
            mockProducts={mockProducts}
            mockCategories={mockCategories}
            mockCustomerGroups={mockCustomerGroups}
            mockPaymentMethods={mockPaymentMethods}
          />
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
