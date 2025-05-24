
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PromotionFormValues } from "../NewPromotionDialog";

interface BasicInfoTabProps {
  form: UseFormReturn<PromotionFormValues>;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      {/* Status da Promoção */}
      <div className="flex items-center space-x-2 p-4 bg-muted/30 rounded-lg">
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-base">
                  Ativar esta promoção agora
                </FormLabel>
                <FormDescription>
                  Se desativado, a promoção ficará salva como rascunho
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>

      {/* Informações Básicas */}
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-medium mb-3">Informações da Promoção</h4>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Promoção *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: Happy Hour de Terça-feira" />
              </FormControl>
              <FormDescription>
                Um nome simples e claro para identificar sua promoção
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código da Promoção</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: HAPPYHOUR ou PIZZA20" />
              </FormControl>
              <FormDescription>
                Código único que aparecerá nos cupons e relatórios (opcional)
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Ex: Promoção especial de terça-feira com 30% de desconto em cervejas das 18h às 20h"
                  className="min-h-[80px]"
                />
              </FormControl>
              <FormDescription>
                Descreva a promoção de forma clara para seus clientes
              </FormDescription>
            </FormItem>
          )}
        />
      </div>

      {/* Período da Promoção */}
      <div className="space-y-4 p-4 border rounded-lg">
        <h4 className="text-base font-medium">Quando a promoção vai funcionar?</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FormLabel>Data de Início</FormLabel>
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
            <FormLabel>Data de Término</FormLabel>
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
      </div>
    </div>
  );
};

export default BasicInfoTab;
