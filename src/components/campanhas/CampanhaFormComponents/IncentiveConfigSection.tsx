
import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Gift, Percent, DollarSign, Star } from "lucide-react";

interface IncentiveConfigSectionProps {
  form: UseFormReturn<any>;
}

const IncentiveConfigSection: React.FC<IncentiveConfigSectionProps> = ({ form }) => {
  const incentiveType = form.watch("incentiveType");

  const renderCouponConfig = () => (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Gift className="h-4 w-4" />
          Configuração do Cupom
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="couponName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Cupom</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Volta pra Casa" {...field} />
                </FormControl>
                <FormDescription>Nome amigável do cupom</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="couponCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código do Cupom</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: VOLTA20" {...field} />
                </FormControl>
                <FormDescription>Código que o cliente usará</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="couponDiscount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor do Desconto</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="20" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="couponDiscountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Desconto</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="percentage">Percentual (%)</SelectItem>
                    <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="couponMinOrderValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Mínimo (R$)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="50.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="couponMaxUsage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Limite de Uso</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormDescription>Quantas vezes pode ser usado</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="couponExpirationDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Validade (dias)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="30" {...field} />
                </FormControl>
                <FormDescription>Dias até expirar</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderLoyaltyConfig = () => (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Star className="h-4 w-4" />
          Configuração de Pontos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="loyaltyPointsPerReal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pontos por Real</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1" {...field} />
                </FormControl>
                <FormDescription>Ex: 1 ponto a cada R$ 1,00</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="loyaltyPointValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor do Ponto (R$)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.01" {...field} />
                </FormControl>
                <FormDescription>Quanto vale cada ponto</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="loyaltyMinimumPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mínimo para Resgate</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormDescription>Pontos mínimos para usar</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="loyaltyBonusMultiplier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Multiplicador de Bônus</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="2.0" {...field} />
                </FormControl>
                <FormDescription>Ex: 2x pontos em promoções</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="loyaltyExpirationDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiração dos Pontos (dias)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="365" {...field} />
                </FormControl>
                <FormDescription>Deixe vazio para não expirar</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Exemplo:</strong> Com 1 ponto por real e valor de R$ 0,01 por ponto, 
            um pedido de R$ 50,00 ganha 50 pontos = R$ 0,50 de desconto futuro.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderCashbackConfig = () => (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <DollarSign className="h-4 w-4" />
          Configuração de Cashback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="cashbackPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Percentual de Cashback</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="5.0" {...field} />
                </FormControl>
                <FormDescription>% do valor do pedido</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cashbackMinOrderValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Mínimo (R$)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="30.00" {...field} />
                </FormControl>
                <FormDescription>Pedido mínimo para cashback</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cashbackMaxValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cashback Máximo (R$)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="20.00" {...field} />
                </FormControl>
                <FormDescription>Valor máximo por pedido</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="cashbackCreditDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dias para Creditar</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="7" {...field} />
                </FormControl>
                <FormDescription>Tempo para aparecer na conta</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cashbackExpirationDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Validade do Cashback (dias)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="90" {...field} />
                </FormControl>
                <FormDescription>Tempo para usar o valor</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            <strong>Exemplo:</strong> Cashback de 5% em pedidos acima de R$ 30,00, 
            máximo R$ 20,00, creditado em 7 dias, válido por 90 dias.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4 border rounded-md p-4">
      <h3 className="text-lg font-medium">Incentivo da Campanha</h3>
      
      <FormField
        control={form.control}
        name="incentiveType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Incentivo</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de incentivo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">Nenhum (apenas informativo)</SelectItem>
                <SelectItem value="coupon">
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4" />
                    Cupom de Desconto
                  </div>
                </SelectItem>
                <SelectItem value="loyalty">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Pontos de Fidelidade
                  </div>
                </SelectItem>
                <SelectItem value="cashback">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Cashback
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Escolha o tipo de recompensa que os clientes receberão
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {incentiveType === "coupon" && renderCouponConfig()}
      {incentiveType === "loyalty" && renderLoyaltyConfig()}
      {incentiveType === "cashback" && renderCashbackConfig()}

      {incentiveType && incentiveType !== "none" && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-yellow-100">
              <Percent className="h-3 w-3 mr-1" />
              Dica
            </Badge>
          </div>
          <p className="text-sm text-yellow-700 mt-2">
            {incentiveType === "coupon" && "O cupom será gerado automaticamente com as configurações definidas."}
            {incentiveType === "loyalty" && "Os pontos serão creditados automaticamente após a compra do cliente."}
            {incentiveType === "cashback" && "O cashback será creditado na conta do cliente após o período definido."}
          </p>
        </div>
      )}
    </div>
  );
};

export default IncentiveConfigSection;
