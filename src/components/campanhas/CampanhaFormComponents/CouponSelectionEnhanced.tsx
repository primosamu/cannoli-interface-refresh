
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock coupon data
const mockCoupons = [
  { id: "cpn-1", code: "DESC15", discount: 15, discountType: "percentage" as const, description: "15% de desconto em todo cardápio" },
  { id: "cpn-2", code: "DESC20", discount: 20, discountType: "percentage" as const, description: "20% de desconto em pratos selecionados" },
  { id: "cpn-3", code: "DESC10", discount: 10, discountType: "percentage" as const, description: "10% de desconto em bebidas" },
  { id: "cpn-4", code: "FRETE", discount: 0, discountType: "percentage" as const, description: "Frete grátis" },
  { id: "cpn-5", code: "10REAIS", discount: 10, discountType: "fixed" as const, description: "R$10 de desconto em pedidos acima de R$50" },
];

const CouponSelectionEnhanced = () => {
  const form = useFormContext();
  const { toast } = useToast();
  
  const openCreateCoupon = () => {
    // In a real implementation, this would open a coupon creation form or navigate to coupon creation page
    toast({
      title: "Criar novo cupom",
      description: "Esta funcionalidade será implementada em breve."
    });
  };
  
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="incentiveType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Tipo de incentivo</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="incentive-none" />
                  <Label htmlFor="incentive-none">Nenhum</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="coupon" id="incentive-coupon" />
                  <Label htmlFor="incentive-coupon">Cupom de desconto</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="loyalty" id="incentive-loyalty" />
                  <Label htmlFor="incentive-loyalty">Pontos de fidelidade</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {form.watch("incentiveType") === "coupon" && (
        <div className="border rounded-md p-4 space-y-4">
          <FormField
            control={form.control}
            name="couponId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cupom</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cupom" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockCoupons.map((coupon) => (
                      <SelectItem key={coupon.id} value={coupon.id}>
                        <div className="flex flex-col">
                          <span>{coupon.code} - {coupon.description}</span>
                          <span className="text-xs text-muted-foreground">
                            {coupon.discountType === "percentage" 
                              ? `${coupon.discount}% de desconto` 
                              : `R$${coupon.discount.toFixed(2)} de desconto`}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Selecione um cupom de desconto para incluir na mensagem
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Selected coupon details */}
          {form.watch("couponId") && (
            <div className="p-3 bg-slate-50 rounded-md">
              <p className="text-sm font-medium mb-1">Cupom selecionado:</p>
              {(() => {
                const selectedCoupon = mockCoupons.find(c => c.id === form.watch("couponId"));
                return selectedCoupon ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{selectedCoupon.code}</Badge>
                      <span className="text-xs">{selectedCoupon.description}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {selectedCoupon.discountType === "percentage" 
                        ? `${selectedCoupon.discount}% de desconto` 
                        : `R$${selectedCoupon.discount.toFixed(2)} de desconto`}
                    </p>
                  </div>
                ) : null;
              })()}
            </div>
          )}
          
          <div className="pt-2">
            <Button 
              type="button"
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-blue-600"
              onClick={openCreateCoupon}
            >
              <Plus className="h-3.5 w-3.5" />
              Criar novo cupom
            </Button>
          </div>
        </div>
      )}
      
      {form.watch("incentiveType") === "loyalty" && (
        <div className="p-3 border rounded-md bg-blue-50">
          <p className="text-sm">Serão adicionados <strong>10 pontos</strong> de fidelidade para os clientes que receberem esta mensagem.</p>
        </div>
      )}
    </div>
  );
};

export default CouponSelectionEnhanced;
