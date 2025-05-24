
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PromotionFormValues } from "../NewPromotionDialog";

interface DiscountConfigTabProps {
  form: UseFormReturn<PromotionFormValues>;
}

const DiscountConfigTab: React.FC<DiscountConfigTabProps> = ({ form }) => {
  const promotionType = form.watch("type");
  const discountType = form.watch("discountType");

  const getPromotionTitle = () => {
    switch (promotionType) {
      case "product_discount": return "Configure o desconto nos produtos";
      case "minimum_order": return "Configure o desconto por valor mínimo";
      case "free_delivery": return "Configure o frete grátis";
      case "combo_promotion": return "Configure o preço do combo";
      case "buy_x_get_y": return "Configure a oferta Compre X Ganhe Y";
      case "happy_hour": return "Configure o desconto do Happy Hour";
      case "loyalty_reward": return "Configure a recompensa de fidelidade";
      case "coupon_discount": return "Configure o cupom de desconto";
      default: return "Configure sua promoção";
    }
  };

  const getPromotionExample = () => {
    switch (promotionType) {
      case "product_discount": 
        return discountType === "percentage" 
          ? "Ex: 20% de desconto em todas as pizzas" 
          : "Ex: R$ 5,00 de desconto em hambúrgueres";
      case "minimum_order": 
        return "Ex: 10% de desconto em pedidos acima de R$ 50,00";
      case "free_delivery": 
        return "Ex: Frete grátis para pedidos acima de R$ 40,00";
      case "combo_promotion": 
        return "Ex: Pizza + Refrigerante por apenas R$ 35,00";
      case "buy_x_get_y": 
        return "Ex: Compre 2 cervejas e ganhe 1 grátis";
      case "happy_hour": 
        return "Ex: 30% de desconto das 17h às 19h";
      case "loyalty_reward": 
        return "Ex: 10% de cashback para clientes VIP";
      case "coupon_discount": 
        return "Ex: BEMVINDO15 dá 15% de desconto";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">{getPromotionTitle()}</h3>
        <p className="text-sm text-muted-foreground">{getPromotionExample()}</p>
      </div>

      {/* Configuração específica por tipo */}
      {promotionType === "buy_x_get_y" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Configuração Compre X Ganhe Y</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="buyQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade para comprar</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={1} placeholder="2" />
                    </FormControl>
                    <FormDescription>Quantos itens o cliente deve comprar</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="getQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade grátis</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={1} placeholder="1" />
                    </FormControl>
                    <FormDescription>Quantos itens o cliente ganha grátis</FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      ) : promotionType === "combo_promotion" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Preço do Combo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço final do combo (R$)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      min={0} 
                      step="0.01"
                      placeholder="35.00"
                    />
                  </FormControl>
                  <FormDescription>
                    Preço que o cliente pagará pelo combo completo
                  </FormDescription>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      ) : promotionType === "free_delivery" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Condição para Frete Grátis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="minOrderValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor mínimo do pedido (R$)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      min={0} 
                      step="0.01"
                      placeholder="40.00"
                    />
                  </FormControl>
                  <FormDescription>
                    Valor mínimo para o cliente ganhar frete grátis
                  </FormDescription>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Valor do Desconto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="discountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Como calcular o desconto?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha o tipo de desconto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="percentage">
                        <div>
                          <div className="font-medium">Porcentagem (%)</div>
                          <div className="text-xs text-muted-foreground">Ex: 20% de desconto</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="fixed">
                        <div>
                          <div className="font-medium">Valor em Reais (R$)</div>
                          <div className="text-xs text-muted-foreground">Ex: R$ 10,00 de desconto</div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {discountType === "percentage" ? "Desconto (%)" : "Desconto (R$)"}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      min={0} 
                      step={discountType === "percentage" ? "1" : "0.01"}
                      placeholder={discountType === "percentage" ? "20" : "10.00"}
                    />
                  </FormControl>
                  <FormDescription>
                    {discountType === "percentage" 
                      ? "Porcentagem de desconto (sem o símbolo %)" 
                      : "Valor em reais do desconto"
                    }
                  </FormDescription>
                </FormItem>
              )}
            />

            {(promotionType === "minimum_order" || promotionType === "coupon_discount") && (
              <FormField
                control={form.control}
                name="minOrderValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor mínimo do pedido (R$)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        min={0} 
                        step="0.01"
                        placeholder="50.00"
                      />
                    </FormControl>
                    <FormDescription>
                      Valor mínimo para ativar o desconto (opcional)
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Limitações simples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Limitações (Opcional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="usageLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantas vezes pode ser usada?</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      min={1} 
                      placeholder="100"
                    />
                  </FormControl>
                  <FormDescription>
                    Limite total de uso da promoção (deixe vazio para ilimitado)
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxUsagesPerCustomer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Máximo por cliente</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      min={1} 
                      placeholder="1"
                    />
                  </FormControl>
                  <FormDescription>
                    Quantas vezes cada cliente pode usar (deixe vazio para ilimitado)
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscountConfigTab;
