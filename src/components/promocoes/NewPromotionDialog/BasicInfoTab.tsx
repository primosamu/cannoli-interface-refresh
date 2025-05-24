
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PromotionFormValues } from "../NewPromotionDialog";

interface BasicInfoTabProps {
  form: UseFormReturn<PromotionFormValues>;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nome da promoção" />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
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

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Descrição breve da promoção" />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        {form.watch("type") === "buy_x_get_y" ? (
          <>
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
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor do Desconto</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} min={0} />
                  </FormControl>
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
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormLabel>Data e Hora de Início</FormLabel>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <FormLabel>Data e Hora de Término</FormLabel>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      {form.watch("type") === "order_value_discount" && (
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="minOrderValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor mínimo do pedido (R$)</FormLabel>
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
                <FormLabel>Valor máximo do pedido (R$)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} min={0} step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default BasicInfoTab;
