
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
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
    </div>
  );
};

export default ScheduleSection;
