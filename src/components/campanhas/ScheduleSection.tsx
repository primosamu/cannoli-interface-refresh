
import React, { useState } from "react";
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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CampaignExecutionType } from "@/types/campaign";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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
  const [frequencyType, setFrequencyType] = useState<string>("immediate");
  
  return (
    <div className="space-y-4">
      {executionType === "one-time" && (
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
      
      {executionType === "recurring" && (
        <FormDescription className="text-sm text-muted-foreground">
          Campanhas recorrentes serão disparadas automaticamente conforme as condições configuradas.
        </FormDescription>
      )}
      
      {isScheduled && executionType === "one-time" && (
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
      
      {executionType === "recurring" && (
        <>
          <Separator className="my-2" />
          
          {/* Frequência de execução */}
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="triggerType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quando enviar</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        setFrequencyType(value);
                      }}
                      defaultValue={field.value || "immediate"}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="immediate" id="immediate" />
                        <label htmlFor="immediate" className="text-sm font-medium leading-none cursor-pointer">
                          Assim que o cliente se tornar elegível
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="scheduled" id="scheduled" />
                        <label htmlFor="scheduled" className="text-sm font-medium leading-none cursor-pointer">
                          Em dias e horários específicos
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            
            {/* Configuração de dia e hora para envios agendados recorrentes */}
            {frequencyType === "scheduled" && (
              <div className="pl-6 pt-2 space-y-4">
                <FormField
                  control={form.control}
                  name="recurringDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dias da semana</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => {
                            const days = field.value || [];
                            const isSelected = days.includes(index);
                            return (
                              <Button
                                key={day}
                                type="button"
                                variant={isSelected ? "default" : "outline"}
                                size="sm"
                                onClick={() => {
                                  const newDays = isSelected
                                    ? days.filter(d => d !== index)
                                    : [...days, index];
                                  field.onChange(newDays);
                                }}
                              >
                                {day}
                              </Button>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="recurringTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {/* Frequência máxima de envio */}
            <FormField
              control={form.control}
              name="maxFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequência máxima de envio</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1}
                        placeholder="Intervalo"
                        value={field.value?.interval || ""}
                        onChange={e => field.onChange({
                          ...field.value,
                          interval: parseInt(e.target.value) || 1
                        })}
                      />
                    </FormControl>
                    <FormControl>
                      <Select 
                        value={field.value?.unit || "weeks"} 
                        onValueChange={value => field.onChange({
                          ...field.value,
                          unit: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="days">Dias</SelectItem>
                          <SelectItem value="weeks">Semanas</SelectItem>
                          <SelectItem value="months">Meses</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormDescription>
                    Defina o intervalo mínimo entre envios para o mesmo cliente
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          
          {/* Período de vigência da campanha */}
          <div className="space-y-3 pt-2">
            <FormLabel>Período de vigência da campanha</FormLabel>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="campaignStartDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de início</FormLabel>
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
                name="campaignEndDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de término (opcional)</FormLabel>
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
                              <span>Sem data de término</span>
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
                          disabled={(date) => {
                            const startDate = form.getValues("campaignStartDate");
                            return startDate && date < startDate;
                          }}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <div className="flex items-center space-x-2 pt-2">
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
        </>
      )}
    </div>
  );
};

export default ScheduleSection;
