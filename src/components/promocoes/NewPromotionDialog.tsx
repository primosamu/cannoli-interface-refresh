
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
import BasicInfoTab from "./NewPromotionDialog/BasicInfoTab";
import ProductsTab from "./NewPromotionDialog/ProductsTab";
import ClientsTab from "./NewPromotionDialog/ClientsTab";
import ConditionsTab from "./NewPromotionDialog/ConditionsTab";
import { Promotion, PromotionType } from "@/types/promotion";

// Form schema for new promotion - simplified
const promotionFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  description: z.string().optional(),
  type: z.string(),
  discountValue: z.coerce.number().min(0),
  discountType: z.string(),
  startDate: z.string(),
  startTime: z.string().default("00:00"),
  endDate: z.string(),
  endTime: z.string().default("23:59"),
  isAccumulative: z.boolean().default(false),
  customerGroups: z.array(z.string()).optional(),
  productCodes: z.array(z.string()).default([]),
  paymentMethods: z.array(z.string()).optional(),
  minOrderValue: z.coerce.number().optional(),
  maxOrderValue: z.coerce.number().optional(),
  buyQuantity: z.coerce.number().optional(),
  getQuantity: z.coerce.number().optional(),
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
  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(promotionFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "product_discount",
      discountValue: 0,
      discountType: "percentage",
      startDate: new Date().toISOString().split('T')[0],
      startTime: "00:00",
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endTime: "23:59",
      isAccumulative: false,
      customerGroups: [],
      productCodes: [],
      paymentMethods: [],
    }
  });

  const handleClientSelection = (selection: {
    type: 'segment' | 'manual';
    data: string[] | string;
  }) => {
    console.log("Seleção de clientes para promoção:", selection);
    // Aqui você pode implementar a lógica para usar a seleção de clientes
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Promoção</DialogTitle>
          <DialogDescription>
            Crie uma nova promoção para atrair mais clientes e aumentar suas vendas.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onCreatePromotion)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
                <TabsTrigger value="products">Produtos</TabsTrigger>
                <TabsTrigger value="clients">Clientes</TabsTrigger>
                <TabsTrigger value="conditions">Condições e Regras</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic">
                <BasicInfoTab form={form} />
              </TabsContent>
              
              <TabsContent value="products">
                <ProductsTab />
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
            
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
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
  );
};

export default NewPromotionDialog;
