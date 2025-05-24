
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { PromotionFormValues } from "../NewPromotionDialog";

interface DiscountConfigTabProps {
  form: UseFormReturn<PromotionFormValues>;
}

const DiscountConfigTab: React.FC<DiscountConfigTabProps> = ({ form }) => {
  const promotionType = form.watch("type");

  const promotionMechanics = [
    {
      id: "product_discount",
      name: "Desconto em Produtos",
      description: "Aplica desconto específico em produtos selecionados",
      category: "básico"
    },
    {
      id: "order_value_discount", 
      name: "Desconto por Valor de Compra",
      description: "Desconto baseado no valor total do pedido",
      category: "básico"
    },
    {
      id: "buy_x_get_y",
      name: "Compre X Ganhe Y",
      description: "Compre uma quantidade e ganhe outra quantidade grátis",
      category: "avançado"
    },
    {
      id: "combo_discount",
      name: "Desconto em Combos",
      description: "Desconto quando produtos específicos são comprados juntos",
      category: "avançado"
    },
    {
      id: "time_limited",
      name: "Tempo Limitado",
      description: "Promoção válida apenas em horários específicos",
      category: "temporal"
    },
    {
      id: "coupon",
      name: "Cupom de Desconto",
      description: "Desconto ativado por código de cupom",
      category: "cupom"
    },
    {
      id: "loyalty_points",
      name: "Pontos de Fidelidade",
      description: "Desconto baseado em pontos de fidelidade",
      category: "fidelidade"
    }
  ];

  const getMechanicByCategory = (category: string) => {
    return promotionMechanics.filter(m => m.category === category);
  };

  return (
    <div className="space-y-6">
      {/* Tipo de Promoção */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Mecânica da Promoção</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Escolha a mecânica que melhor se adequa ao seu objetivo promocional
          </p>
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Promoção</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a mecânica de promoção" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <div className="p-2">
                    <div className="mb-2">
                      <p className="text-xs font-medium text-muted-foreground mb-1">MECÂNICAS BÁSICAS</p>
                      {getMechanicByCategory("básico").map((mechanic) => (
                        <SelectItem key={mechanic.id} value={mechanic.id}>
                          <div>
                            <div className="font-medium">{mechanic.name}</div>
                            <div className="text-xs text-muted-foreground">{mechanic.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                    <div className="mb-2">
                      <p className="text-xs font-medium text-muted-foreground mb-1">MECÂNICAS AVANÇADAS</p>
                      {getMechanicByCategory("avançado").map((mechanic) => (
                        <SelectItem key={mechanic.id} value={mechanic.id}>
                          <div>
                            <div className="font-medium">{mechanic.name}</div>
                            <div className="text-xs text-muted-foreground">{mechanic.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                    <div className="mb-2">
                      <p className="text-xs font-medium text-muted-foreground mb-1">OUTRAS MECÂNICAS</p>
                      {getMechanicByCategory("temporal").concat(getMechanicByCategory("cupom"), getMechanicByCategory("fidelidade")).map((mechanic) => (
                        <SelectItem key={mechanic.id} value={mechanic.id}>
                          <div>
                            <div className="font-medium">{mechanic.name}</div>
                            <div className="text-xs text-muted-foreground">{mechanic.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  </div>
                </SelectContent>
              </Select>
              <FormDescription>
                A mecânica escolhida determinará as configurações disponíveis abaixo
              </FormDescription>
            </FormItem>
          )}
        />
      </div>

      {/* Configuração de Desconto */}
      <div className="space-y-4 p-4 border rounded-lg bg-muted/10">
        <h4 className="text-md font-semibold">Configuração de Desconto</h4>
        
        {promotionType === "buy_x_get_y" ? (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="buyQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compre (quantidade)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} min={1} placeholder="Ex: 3" />
                  </FormControl>
                  <FormDescription>Quantidade mínima para ativar a promoção</FormDescription>
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
                    <Input type="number" {...field} min={1} placeholder="Ex: 1" />
                  </FormControl>
                  <FormDescription>Quantidade que o cliente ganha grátis</FormDescription>
                </FormItem>
              )}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor do Desconto</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      min={0} 
                      step={promotionType === "percentage" ? "1" : "0.01"}
                      placeholder={promotionType === "percentage" ? "Ex: 20" : "Ex: 10.00"}
                    />
                  </FormControl>
                  <FormDescription>
                    {form.watch("discountType") === "percentage" 
                      ? "Valor em porcentagem (sem o símbolo %)" 
                      : "Valor em reais (R$)"
                    }
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Desconto</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Como calcular o desconto" />
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
                          <div className="font-medium">Valor Fixo (R$)</div>
                          <div className="text-xs text-muted-foreground">Ex: R$ 10,00 de desconto</div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        )}
      </div>

      {/* Configurações Especiais por Tipo */}
      {promotionType === "order_value_discount" && (
        <div className="space-y-4 p-4 border rounded-lg bg-blue-50/50">
          <h4 className="text-md font-semibold">Condições de Valor do Pedido</h4>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="minOrderValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor mínimo do pedido (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} min={0} step="0.01" placeholder="Ex: 50.00" />
                  </FormControl>
                  <FormDescription>Valor mínimo para ativar a promoção</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxOrderValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor máximo do pedido (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} min={0} step="0.01" placeholder="Ex: 200.00" />
                  </FormControl>
                  <FormDescription>Valor máximo para aplicar a promoção (opcional)</FormDescription>
                </FormItem>
              )}
            />
          </div>
        </div>
      )}

      {/* Configurações de Acumulação */}
      <div className="space-y-4 p-4 border rounded-lg bg-green-50/50">
        <h4 className="text-md font-semibold">Configurações Avançadas</h4>
        
        <FormField
          control={form.control}
          name="isAccumulative"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Promoção Acumulativa</FormLabel>
                <FormDescription>
                  Permite que esta promoção seja combinada com outras promoções ativas
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {promotionType === "combo_discount" && (
          <div className="mt-4">
            <FormLabel className="text-sm font-medium">Tipo de Combo</FormLabel>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                Combo Fixo (produtos específicos)
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                Combo Flexível (categorias)
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountConfigTab;
