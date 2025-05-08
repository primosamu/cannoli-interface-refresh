
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, RepeatIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CampaignExecutionType } from "@/types/campaign";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ScheduleSectionProps {
  isScheduled: boolean;
  setIsScheduled: (isScheduled: boolean) => void;
  executionType: CampaignExecutionType;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({ 
  isScheduled, 
  setIsScheduled,
  executionType 
}) => {
  const form = useFormContext();
  
  return (
    <div className="space-y-4">
      {/* Tipo de execução da campanha */}
      <FormField
        control={form.control}
        name="executionType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Tipo de execução</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="one-time" id="one-time" />
                  <label htmlFor="one-time" className="text-sm font-medium leading-none cursor-pointer">
                    Envio único
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recurring" id="recurring" />
                  <label htmlFor="recurring" className="text-sm font-medium leading-none cursor-pointer">
                    Recorrente (automação)
                  </label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormDescription>
              {field.value === "recurring" ? 
                "Campanhas recorrentes serão disparadas automaticamente quando os clientes atenderem aos critérios definidos no segmento." : 
                "Campanhas de envio único são disparadas manualmente ou em uma data específica."
              }
            </FormDescription>
          </FormItem>
        )}
      />
      
      {/* Configuração de agendamento para campanhas de envio único */}
      {form.watch("executionType") === "one-time" && (
        <div className="flex items-center space-x-2">
          <Switch
            id="schedule"
            checked={isScheduled}
            onCheckedChange={setIsScheduled}
          />
          <label
            htmlFor="schedule"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Agendar envio
          </label>
        </div>
      )}
      
      {/* Configuração para campanhas recorrentes */}
      {form.watch("executionType") === "recurring" && (
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label
                htmlFor="isActive"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ativar automação imediatamente
              </label>
            </div>
          )}
        />
      )}
      
      {/* Campos de data e hora para campanhas agendadas */}
      {isScheduled && form.watch("executionType") === "one-time" && (
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="scheduleDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="scheduleTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ScheduleSection;
