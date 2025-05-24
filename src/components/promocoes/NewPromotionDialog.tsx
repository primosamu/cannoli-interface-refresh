
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import PromotionTypeTab from "./NewPromotionDialog/PromotionTypeTab";
import BasicInfoTab from "./NewPromotionDialog/BasicInfoTab";
import DiscountConfigTab from "./NewPromotionDialog/DiscountConfigTab";
import ScheduleTab from "./NewPromotionDialog/ScheduleTab";
import ProductsTab from "./NewPromotionDialog/ProductsTab";
import ClientsTab from "./NewPromotionDialog/ClientsTab";
import ConditionsTab from "./NewPromotionDialog/ConditionsTab";

// Schema simplificado e mais focado
const promotionFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  code: z.string().optional(),
  description: z.string().optional(),
  type: z.string().min(1, { message: "Selecione um tipo de promoção" }),
  discountValue: z.coerce.number().min(0),
  discountType: z.string().default("percentage"),
  startDate: z.string(),
  startTime: z.string().default("00:00"),
  endDate: z.string(),
  endTime: z.string().default("23:59"),
  isActive: z.boolean().default(true),
  isAccumulative: z.boolean().default(false),
  customerGroups: z.array(z.string()).optional(),
  productCodes: z.array(z.string()).default([]),
  paymentMethods: z.array(z.string()).optional(),
  minOrderValue: z.coerce.number().optional(),
  maxOrderValue: z.coerce.number().optional(),
  buyQuantity: z.coerce.number().optional(),
  getQuantity: z.coerce.number().optional(),
  usageLimit: z.coerce.number().optional(),
  maxUsagesPerCustomer: z.coerce.number().optional(),
  scheduledDays: z.array(z.string()).optional(),
  timeSlots: z.array(z.object({
    start: z.string(),
    end: z.string()
  })).optional(),
});

export type PromotionFormValues = z.infer<typeof promotionFormSchema>;

interface NewPromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePromotion: (data: PromotionFormValues) => void;
  mockProducts: Array<{ id: string; name: string; category?: string }>;
  mockCategories: Array<{ id: string; name: string; parentId?: string }>;
  mockCustomerGroups: Array<{ id: string; name: string }>;
  mockPaymentMethods: Array<{ id: string; name: string }>;
}

const NewPromotionDialog: React.FC<NewPromotionDialogProps> = ({
  open,
  onOpenChange,
  onCreatePromotion,
  mockProducts,
  mockCategories,
  mockCustomerGroups,
  mockPaymentMethods
}) => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("type");
  
  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(promotionFormSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      type: "",
      discountValue: 0,
      discountType: "percentage",
      startDate: new Date().toISOString().split('T')[0],
      startTime: "00:00",
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endTime: "23:59",
      isActive: true,
      isAccumulative: false,
      customerGroups: [],
      productCodes: [],
      paymentMethods: [],
    }
  });

  const selectedType = form.watch("type");

  const handleProductSelection = (selection: {
    type: 'codes' | 'segments';
    condition: 'equal' | 'different';
    data: string[];
  }) => {
    console.log("Seleção de produtos para promoção:", selection);
  };

  const handleClientSelection = (selection: {
    type: 'codes' | 'segments';
    condition: 'equal' | 'different';
    data: string[];
  }) => {
    console.log("Seleção de clientes para promoção:", selection);
  };

  const handleSubmit = (data: PromotionFormValues) => {
    // Validação básica
    if (!data.type) {
      toast({
        title: "Erro",
        description: "Selecione um tipo de promoção",
        variant: "destructive"
      });
      setCurrentTab("type");
      return;
    }

    if (!data.name) {
      toast({
        title: "Erro", 
        description: "Preencha o nome da promoção",
        variant: "destructive"
      });
      setCurrentTab("basic");
      return;
    }

    onCreatePromotion(data);
  };

  const getTabsForPromotion = () => {
    if (!selectedType) return ["type"];
    
    const baseTabs = ["type", "basic", "discount"];
    
    if (selectedType === "happy_hour") {
      baseTabs.push("schedule");
    }
    
    if (["product_discount", "combo_promotion"].includes(selectedType)) {
      baseTabs.push("products");
    }
    
    if (["loyalty_reward", "coupon_discount"].includes(selectedType)) {
      baseTabs.push("clients");
    }
    
    baseTabs.push("conditions");
    
    return baseTabs;
  };

  const availableTabs = getTabsForPromotion();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Nova Promoção</DialogTitle>
          <DialogDescription>
            Vamos criar uma promoção que vai atrair mais clientes para seu restaurante!
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${availableTabs.length}, minmax(0, 1fr))` }}>
                {availableTabs.includes("type") && (
                  <TabsTrigger value="type">1. Tipo</TabsTrigger>
                )}
                {availableTabs.includes("basic") && (
                  <TabsTrigger value="basic" disabled={!selectedType}>
                    2. Informações
                  </TabsTrigger>
                )}
                {availableTabs.includes("discount") && (
                  <TabsTrigger value="discount" disabled={!selectedType}>
                    3. Desconto
                  </TabsTrigger>
                )}
                {availableTabs.includes("schedule") && (
                  <TabsTrigger value="schedule" disabled={!selectedType}>
                    4. Horários
                  </TabsTrigger>
                )}
                {availableTabs.includes("products") && (
                  <TabsTrigger value="products" disabled={!selectedType}>
                    {selectedType === "happy_hour" ? "5. Produtos" : "4. Produtos"}
                  </TabsTrigger>
                )}
                {availableTabs.includes("clients") && (
                  <TabsTrigger value="clients" disabled={!selectedType}>
                    4. Clientes
                  </TabsTrigger>
                )}
                {availableTabs.includes("conditions") && (
                  <TabsTrigger value="conditions" disabled={!selectedType}>
                    {availableTabs.length}. Condições
                  </TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="type">
                <PromotionTypeTab form={form} />
              </TabsContent>
              
              <TabsContent value="basic">
                <BasicInfoTab form={form} />
              </TabsContent>
              
              <TabsContent value="discount">
                <DiscountConfigTab form={form} />
              </TabsContent>
              
              <TabsContent value="schedule">
                <ScheduleTab form={form} />
              </TabsContent>
              
              <TabsContent value="products">
                <ProductsTab onSelectionChange={handleProductSelection} />
              </TabsContent>
              
              <TabsContent value="clients">
                <ClientsTab onSelectionChange={handleClientSelection} />
              </TabsContent>
              
              <TabsContent value="conditions">
                <ConditionsTab 
                  form={form}
                  mockCustomerGroups={mockCustomerGroups}
                  mockPaymentMethods={mockPaymentMethods}
                />
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)} 
                type="button"
              >
                Cancelar
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => {
                  const currentIndex = availableTabs.indexOf(currentTab);
                  if (currentIndex > 0) {
                    setCurrentTab(availableTabs[currentIndex - 1]);
                  }
                }}
                disabled={availableTabs.indexOf(currentTab) === 0}
              >
                Voltar
              </Button>
              {currentTab !== availableTabs[availableTabs.length - 1] ? (
                <Button 
                  type="button"
                  onClick={() => {
                    const currentIndex = availableTabs.indexOf(currentTab);
                    if (currentIndex < availableTabs.length - 1) {
                      setCurrentTab(availableTabs[currentIndex + 1]);
                    }
                  }}
                  disabled={currentTab === "type" && !selectedType}
                >
                  Próximo
                </Button>
              ) : (
                <Button type="submit">
                  Criar Promoção
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPromotionDialog;
