
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";
import { PromotionFormValues } from "../NewPromotionDialog";

interface ScheduleTabProps {
  form: UseFormReturn<PromotionFormValues>;
}

const ScheduleTab: React.FC<ScheduleTabProps> = ({ form }) => {
  const promotionType = form.watch("type");
  const [useSpecificDays, setUseSpecificDays] = useState(false);
  const [useSpecificHours, setUseSpecificHours] = useState(promotionType === "happy_hour");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<{ start: string; end: string }[]>([
    { start: "17:00", end: "19:00" }
  ]);

  const daysOfWeek = [
    { value: "monday", label: "Seg", fullLabel: "Segunda-feira" },
    { value: "tuesday", label: "Ter", fullLabel: "Terça-feira" },
    { value: "wednesday", label: "Qua", fullLabel: "Quarta-feira" },
    { value: "thursday", label: "Qui", fullLabel: "Quinta-feira" },
    { value: "friday", label: "Sex", fullLabel: "Sexta-feira" },
    { value: "saturday", label: "Sáb", fullLabel: "Sábado" },
    { value: "sunday", label: "Dom", fullLabel: "Domingo" }
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

  // Se não for happy_hour, não mostrar esta aba
  if (promotionType !== "happy_hour") {
    return (
      <div className="text-center py-8">
        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Configurações de horário</h3>
        <p className="text-muted-foreground">
          Esta configuração está disponível apenas para promoções do tipo "Happy Hour / Horário Especial"
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Clock className="h-8 w-8 mx-auto text-primary" />
        <h3 className="text-lg font-semibold">Configure os horários da promoção</h3>
        <p className="text-sm text-muted-foreground">
          Defina quando sua promoção estará ativa durante a semana
        </p>
      </div>

      {/* Dias da Semana */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Dias da semana</CardTitle>
            <Switch
              id="specific-days"
              checked={useSpecificDays}
              onCheckedChange={setUseSpecificDays}
            />
          </div>
        </CardHeader>
        <CardContent>
          {!useSpecificDays ? (
            <p className="text-sm text-muted-foreground">
              A promoção funcionará todos os dias da semana
            </p>
          ) : (
            <div className="space-y-3">
              <FormLabel className="text-sm">Selecione os dias:</FormLabel>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map((day) => (
                  <Badge
                    key={day.value}
                    variant={selectedDays.includes(day.value) ? "default" : "outline"}
                    className="cursor-pointer px-3 py-2"
                    onClick={() => handleDayToggle(day.value)}
                  >
                    {day.label}
                  </Badge>
                ))}
              </div>
              {selectedDays.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Selecionados: {selectedDays.map(day => 
                    daysOfWeek.find(d => d.value === day)?.fullLabel
                  ).join(", ")}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Horários */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Horários específicos</CardTitle>
            <Switch
              id="specific-hours"
              checked={useSpecificHours}
              onCheckedChange={setUseSpecificHours}
            />
          </div>
        </CardHeader>
        <CardContent>
          {!useSpecificHours ? (
            <p className="text-sm text-muted-foreground">
              A promoção funcionará o dia todo (24 horas)
            </p>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm">Horários de funcionamento:</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={addTimeSlot}>
                  + Adicionar horário
                </Button>
              </div>
              
              <div className="space-y-3">
                {timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="time"
                      value={slot.start}
                      onChange={(e) => updateTimeSlot(index, 'start', e.target.value)}
                      className="w-28"
                    />
                    <span className="text-sm text-muted-foreground">até</span>
                    <Input
                      type="time"
                      value={slot.end}
                      onChange={(e) => updateTimeSlot(index, 'end', e.target.value)}
                      className="w-28"
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
              
              <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded-lg">
                <strong>Dica:</strong> Você pode adicionar múltiplos horários. Por exemplo: 
                11h às 14h (almoço) e 18h às 22h (jantar).
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleTab;
