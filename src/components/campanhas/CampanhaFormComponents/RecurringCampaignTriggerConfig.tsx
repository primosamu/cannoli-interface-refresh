
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CampaignTriggerType } from "@/types/campaign";

interface RecurringCampaignTriggerConfigProps {
  triggerType: CampaignTriggerType;
}

const RecurringCampaignTriggerConfig: React.FC<RecurringCampaignTriggerConfigProps> = ({
  triggerType,
}) => {
  const form = useFormContext();
  
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="triggerType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Gatilho</FormLabel>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                // Reset trigger config values when changing trigger type
                form.setValue("inactivityDays", undefined);
                form.setValue("purchaseCount", undefined);
                form.setValue("weekday", undefined);
                form.setValue("monthDay", undefined);
                form.setValue("triggerTime", undefined);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de gatilho" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="client_inactivity">Inatividade do cliente</SelectItem>
                <SelectItem value="first_purchase">Primeira compra</SelectItem>
                <SelectItem value="repeat_purchase">Repetição de compra</SelectItem>
                <SelectItem value="birthday">Aniversário</SelectItem>
                <SelectItem value="time_based">Baseado em tempo</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Selecione o evento que vai disparar a campanha automaticamente
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {triggerType === "client_inactivity" && (
        <FormField
          control={form.control}
          name="inactivityDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dias de Inatividade</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} onChange={e => field.onChange(parseInt(e.target.value) || '')} />
              </FormControl>
              <FormDescription>
                Número de dias sem pedidos para disparar a campanha
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {triggerType === "repeat_purchase" && (
        <FormField
          control={form.control}
          name="purchaseCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Compras</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} onChange={e => field.onChange(parseInt(e.target.value) || '')} />
              </FormControl>
              <FormDescription>
                Quantidade de compras para disparar a campanha
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {triggerType === "time_based" && (
        <>
          <FormField
            control={form.control}
            name="weekday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dia da Semana</FormLabel>
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(parseInt(value))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o dia da semana" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Domingo</SelectItem>
                    <SelectItem value="1">Segunda-feira</SelectItem>
                    <SelectItem value="2">Terça-feira</SelectItem>
                    <SelectItem value="3">Quarta-feira</SelectItem>
                    <SelectItem value="4">Quinta-feira</SelectItem>
                    <SelectItem value="5">Sexta-feira</SelectItem>
                    <SelectItem value="6">Sábado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="triggerTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormDescription>
                  Horário para disparar a campanha
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      {triggerType === "birthday" && (
        <>
          <FormField
            control={form.control}
            name="daysBeforeBirthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dias antes do aniversário</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="30" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                </FormControl>
                <FormDescription>
                  Quantos dias antes do aniversário enviar a mensagem (0 = no dia)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="triggerTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormDescription>
                  Horário para disparar a campanha
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
};

export default RecurringCampaignTriggerConfig;
