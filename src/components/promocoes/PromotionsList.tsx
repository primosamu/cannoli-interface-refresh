
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PromotionCard from "./PromotionCard";
import EmptyPromotionState from "./EmptyPromotionState";
import ActiveFilters from "./ActiveFilters";
import { Promotion } from "@/types/promotion";

interface PromotionsListProps {
  promotions: Promotion[];
  activeTab: string;
  typeFilter: string;
  productFilter: string;
  customerGroupFilter: string;
  paymentMethodFilter: string;
  setTypeFilter: (filter: string) => void;
  setProductFilter: (filter: string) => void;
  setCustomerGroupFilter: (filter: string) => void;
  setPaymentMethodFilter: (filter: string) => void;
  resetFilters: () => void;
  onShowAnalytics: (promotion: Promotion) => void;
  onNewPromotion: () => void;
  mockProducts: Array<{ id: string; name: string; category?: string }>;
  mockCategories: Array<{ id: string; name: string; parentId?: string }>;
  mockCustomerGroups: Array<{ id: string; name: string }>;
  mockPaymentMethods: Array<{ id: string; name: string }>;
}

const PromotionsList: React.FC<PromotionsListProps> = ({
  promotions,
  activeTab,
  typeFilter,
  productFilter,
  customerGroupFilter,
  paymentMethodFilter,
  setTypeFilter,
  setProductFilter,
  setCustomerGroupFilter,
  setPaymentMethodFilter,
  resetFilters,
  onShowAnalytics,
  onNewPromotion,
  mockProducts,
  mockCategories,
  mockCustomerGroups,
  mockPaymentMethods
}) => {
  const getTabDescription = () => {
    switch (activeTab) {
      case "todas": return "Todas as promoções disponíveis";
      case "ativas": return "Promoções atualmente ativas";
      case "agendadas": return "Promoções agendadas para iniciar futuramente";
      case "expiradas": return "Promoções que já expiraram";
      case "rascunhos": return "Rascunhos de promoções não publicadas";
      default: return "";
    }
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Gerenciamento de Promoções</CardTitle>
        <CardDescription>
          {getTabDescription()}
          
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
          {promotions.length === 0 ? (
            <EmptyPromotionState onNewPromotion={onNewPromotion} />
          ) : (
            promotions.map(promotion => (
              <PromotionCard 
                key={promotion.id}
                promotion={promotion}
                onShowAnalytics={onShowAnalytics}
                mockCustomerGroups={mockCustomerGroups}
                mockProducts={mockProducts}
                mockPaymentMethods={mockPaymentMethods}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionsList;
