
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { X } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PromotionFormValues } from "../NewPromotionDialog";

interface ConditionsTabProps {
  form: UseFormReturn<PromotionFormValues>;
  mockCustomerGroups: Array<{ id: string; name: string }>;
  mockPaymentMethods: Array<{ id: string; name: string }>;
}

const ConditionsTab: React.FC<ConditionsTabProps> = ({ 
  form, 
  mockCustomerGroups, 
  mockPaymentMethods 
}) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="customerGroups"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grupos de Clientes</FormLabel>
            <Select 
              onValueChange={(value) => field.onChange([...field.value || [], value])}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione grupos de clientes" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {mockCustomerGroups.map(group => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {(field.value || []).map(groupId => {
                const group = mockCustomerGroups.find(g => g.id === groupId);
                return group ? (
                  <Badge key={groupId} variant="secondary" className="gap-1">
                    {group.name}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => field.onChange(field.value?.filter(id => id !== groupId))}
                    />
                  </Badge>
                ) : null;
              })}
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="paymentMethods"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Formas de Pagamento</FormLabel>
            <Select 
              onValueChange={(value) => field.onChange([...field.value || [], value])}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione formas de pagamento" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {mockPaymentMethods.map(method => (
                  <SelectItem key={method.id} value={method.id}>
                    {method.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {(field.value || []).map(methodId => {
                const method = mockPaymentMethods.find(m => m.id === methodId);
                return method ? (
                  <Badge key={methodId} variant="secondary" className="gap-1">
                    {method.name}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => field.onChange(field.value?.filter(id => id !== methodId))}
                    />
                  </Badge>
                ) : null;
              })}
            </div>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="isAccumulative"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Checkbox 
                checked={field.value} 
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Permitir acumular com outras promoções
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ConditionsTab;
