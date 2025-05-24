
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PromotionFormValues } from "../NewPromotionDialog";

interface BasicInfoTabProps {
  form: UseFormReturn<PromotionFormValues>;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ form }) => {
  const [useScheduledHours, setUseScheduledHours] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<{ start: string; end: string }[]>([
    { start: "08:00", end: "12:00" }
  ]);
  const [limitationType, setLimitationType] = useState<"none" | "occurrences" | "items">("none");

  const daysOfWeek = [
    { value: "monday", label: "Segunda" },
    { value: "tuesday", label: "Terça" },
    { value: "wednesday", label: "Quarta" },
    { value: "thursday", label: "Quinta" },
    { value: "friday", label: "Sexta" },
    { value: "saturday", label: "Sábado" },
    { value: "sunday", label: "Domingo" }
  ];

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const addTimeSlot = () => {
    setTimeSlots(prev => [...prev, { start: "08:00", end: "12:00" }]);
  };

  const removeTimeSlot = (index: number) => {
    setTimeSlots(prev => prev.filter((_, i) => i !== index));
  };

  const updateTimeSlot = (index: number, field: 'start' | 'end', value: string) => {
    setTimeSlots(prev => prev.map((slot, i) => 
      i === index ? { ...slot, [field]: value } : slot
    ));
  };

  const handleLimitationTypeChange = (value: string) => {
    if (value === "none" || value === "occurrences" || value === "items") {
      setLimitationType(value);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status da Promoção */}
      <div className="flex items-center space-x-2">
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
                <FormLabel>
                  Promoção Ativa
                </FormLabel>
                <FormDescription>
                  Ative ou desative esta promoção
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>

      {/* Informações Básicas */}
      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Promoção</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: Black Friday 2024" />
              </FormControl>
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
                <Input {...field} placeholder="Ex: BLACKFRIDAY2024" />
              </FormControl>
              <FormDescription>
                Código único para identificar a promoção no sistema
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
                  placeholder="Descrição detalhada da promoção"
                  className="min-h-[80px]"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Promoção</FormLabel>
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

      {/* Configuração de Desconto */}
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

      {/* Limitações da Promoção */}
      <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
        <h4 className="text-sm font-medium">Limitações da Promoção</h4>
        
        <div>
          <FormLabel className="text-sm font-medium mb-2 block">Limitar por:</FormLabel>
          <Select value={limitationType} onValueChange={handleLimitationTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de limitação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sem limitação</SelectItem>
              <SelectItem value="occurrences">Por Ocorrências</SelectItem>
              <SelectItem value="items">Por número de itens</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {limitationType === "occurrences" && (
          <div className="space-y-3">
            <FormDescription className="text-xs">
              Esta opção permite que você escolha quantos cupons poderão ser vendidos que participarão da promoção. 
              Exemplo: Os 50 primeiros clientes que comprarem o produto em promoção.
            </FormDescription>
            <FormField
              control={form.control}
              name="usageLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>N° de Ocorrências</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      min={1} 
                      placeholder="Ex: 50" 
                    />
                  </FormControl>
                  <FormDescription>
                    Quantidade limite de cupons que podem ser utilizados
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        )}

        {limitationType === "items" && (
          <div className="space-y-3">
            <FormDescription className="text-xs">
              Esta opção permite que você escolha quantos itens participarão da promoção. 
              Exemplo: Apenas os 50 primeiros produtos vendidos terão desconto.
            </FormDescription>
            <FormField
              control={form.control}
              name="itemLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade de Itens</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      min={1} 
                      placeholder="Ex: 50" 
                    />
                  </FormControl>
                  <FormDescription>
                    Quantidade limite de itens que podem ter desconto
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        )}
      </div>

      {/* Período da Promoção */}
      <div className="space-y-4">
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

        {/* Horários Escalonados */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="scheduled-hours"
              checked={useScheduledHours}
              onCheckedChange={setUseScheduledHours}
            />
            <label
              htmlFor="scheduled-hours"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Configurar horários específicos
            </label>
          </div>

          {useScheduledHours && (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
              <div>
                <FormLabel className="text-sm font-medium">Dias da Semana</FormLabel>
                <div className="flex flex-wrap gap-2 mt-2">
                  {daysOfWeek.map((day) => (
                    <Badge
                      key={day.value}
                      variant={selectedDays.includes(day.value) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleDayToggle(day.value)}
                    >
                      {day.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <FormLabel className="text-sm font-medium">Horários</FormLabel>
                  <Button type="button" variant="outline" size="sm" onClick={addTimeSlot}>
                    + Adicionar Horário
                  </Button>
                </div>
                <div className="space-y-2">
                  {timeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={slot.start}
                        onChange={(e) => updateTimeSlot(index, 'start', e.target.value)}
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">até</span>
                      <Input
                        type="time"
                        value={slot.end}
                        onChange={(e) => updateTimeSlot(index, 'end', e.target.value)}
                        className="w-24"
                      />
                      {timeSlots.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeTimeSlot(index)}
                        >
                          Remover
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Condições Especiais */}
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
