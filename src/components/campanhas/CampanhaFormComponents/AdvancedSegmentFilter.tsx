import { useState, useEffect } from "react";
import { Filter, X, Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

// Define filter field types
type FieldType = "text" | "number" | "date" | "boolean" | "select";

interface FieldDefinition {
  id: string;
  name: string;
  type: FieldType;
  options?: { value: string; label: string }[];
}

// Available filter operators by field type
const operatorsByType: Record<FieldType, { value: string; label: string }[]> = {
  text: [
    { value: "equals", label: "é igual a" },
    { value: "not_equals", label: "não é igual a" },
    { value: "contains", label: "contém" },
    { value: "not_contains", label: "não contém" },
    { value: "starts_with", label: "começa com" },
    { value: "ends_with", label: "termina com" },
  ],
  number: [
    { value: "equals", label: "=" },
    { value: "not_equals", label: "!=" },
    { value: "greater_than", label: ">" },
    { value: "less_than", label: "<" },
    { value: "greater_than_equals", label: ">=" },
    { value: "less_than_equals", label: "<=" },
  ],
  date: [
    { value: "equals", label: "é igual a" },
    { value: "not_equals", label: "não é igual a" },
    { value: "before", label: "antes de" },
    { value: "after", label: "depois de" },
    { value: "between", label: "entre" },
  ],
  boolean: [
    { value: "equals", label: "é" },
    { value: "not_equals", label: "não é" },
  ],
  select: [
    { value: "equals", label: "é" },
    { value: "not_equals", label: "não é" },
  ],
};

// Available fields for client segmentation
const availableFields: FieldDefinition[] = [
  { id: "name", name: "Nome", type: "text" },
  { id: "cpf", name: "CPF", type: "text" },
  { id: "email", name: "Email", type: "text" },
  { id: "phone", name: "Telefone", type: "text" },
  { id: "orderCount", name: "Número de pedidos", type: "number" },
  { id: "lastOrderDate", name: "Data do último pedido", type: "date" },
  { id: "totalSpent", name: "Total gasto", type: "number" },
  { id: "isActive", name: "Cliente ativo", type: "boolean" },
  { 
    id: "tag", 
    name: "Tag", 
    type: "select", 
    options: [
      { value: "vip", label: "VIP" },
      { value: "recorrente", label: "Recorrente" },
      { value: "novo", label: "Novo" },
      { value: "inativo", label: "Inativo" },
    ]
  },
  { id: "registrationDate", name: "Data de cadastro", type: "date" },
  { id: "birthday", name: "Aniversário", type: "date" },
];

interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string | number | boolean | null;
  // Fix: Update secondValue to include boolean type since it's being used for boolean fields
  secondValue?: string | number | boolean | null;
}

interface FilterGroup {
  id: string;
  type: "AND" | "OR";
  conditions: FilterCondition[];
}

export interface AdvancedSegmentFilterProps {
  onChange: (groups: FilterGroup[]) => void;
  initialFilters?: FilterGroup[];
  onSaveSegment?: (name: string, description: string) => void;
}

export const AdvancedSegmentFilter = ({ 
  onChange, 
  initialFilters = [],
  onSaveSegment 
}: AdvancedSegmentFilterProps) => {
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>(
    initialFilters.length > 0 ? 
    initialFilters : 
    [{ id: "group-1", type: "AND", conditions: [] }]
  );
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [segmentDescription, setSegmentDescription] = useState("");
  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);
  const [secondDateValue, setSecondDateValue] = useState<Date | undefined>(undefined);
  const [activeCondition, setActiveCondition] = useState<{
    groupId: string;
    conditionId: string;
    isSecondDate: boolean;
  } | null>(null);

  useEffect(() => {
    onChange(filterGroups);
  }, [filterGroups, onChange]);

  const addGroup = () => {
    setFilterGroups([
      ...filterGroups, 
      { id: `group-${Date.now()}`, type: "OR", conditions: [] }
    ]);
  };

  const removeGroup = (groupId: string) => {
    setFilterGroups(filterGroups.filter(group => group.id !== groupId));
  };

  const toggleGroupType = (groupId: string) => {
    setFilterGroups(filterGroups.map(group => {
      if (group.id === groupId) {
        return { ...group, type: group.type === "AND" ? "OR" : "AND" };
      }
      return group;
    }));
  };

  const addCondition = (groupId: string) => {
    setFilterGroups(filterGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          conditions: [
            ...group.conditions, 
            { 
              id: `condition-${Date.now()}`, 
              field: availableFields[0].id, 
              operator: operatorsByType[availableFields[0].type][0].value,
              value: null
            }
          ]
        };
      }
      return group;
    }));
  };

  const removeCondition = (groupId: string, conditionId: string) => {
    setFilterGroups(filterGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          conditions: group.conditions.filter(condition => condition.id !== conditionId)
        };
      }
      return group;
    }));
  };

  const updateConditionField = (groupId: string, conditionId: string, field: string) => {
    setFilterGroups(filterGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          conditions: group.conditions.map(condition => {
            if (condition.id === conditionId) {
              const fieldDef = availableFields.find(f => f.id === field);
              if (!fieldDef) return condition;
              
              // Reset operator and value when field type changes
              return {
                ...condition,
                field,
                operator: operatorsByType[fieldDef.type][0].value,
                value: null,
                secondValue: undefined
              };
            }
            return condition;
          })
        };
      }
      return group;
    }));
  };

  const updateConditionOperator = (groupId: string, conditionId: string, operator: string) => {
    setFilterGroups(filterGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          conditions: group.conditions.map(condition => {
            if (condition.id === conditionId) {
              // Reset second value if no longer needed
              const needsSecondValue = operator === "between";
              return {
                ...condition,
                operator,
                secondValue: needsSecondValue ? condition.secondValue : undefined
              };
            }
            return condition;
          })
        };
      }
      return group;
    }));
  };

  const updateConditionValue = (
    groupId: string, 
    conditionId: string, 
    value: string | number | boolean | null,
    isSecondValue: boolean = false
  ) => {
    setFilterGroups(filterGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          conditions: group.conditions.map(condition => {
            if (condition.id === conditionId) {
              if (isSecondValue) {
                return { ...condition, secondValue: value };
              }
              return { ...condition, value };
            }
            return condition;
          })
        };
      }
      return group;
    }));
  };

  const openDatePicker = (
    groupId: string, 
    conditionId: string, 
    isSecondDate: boolean = false
  ) => {
    const group = filterGroups.find(g => g.id === groupId);
    if (!group) return;
    
    const condition = group.conditions.find(c => c.id === conditionId);
    if (!condition) return;
    
    if (isSecondDate && typeof condition.secondValue === 'string') {
      try {
        setSecondDateValue(new Date(condition.secondValue));
      } catch (e) {
        setSecondDateValue(undefined);
      }
    } else if (typeof condition.value === 'string') {
      try {
        setDateValue(new Date(condition.value));
      } catch (e) {
        setDateValue(undefined);
      }
    } else {
      if (isSecondDate) {
        setSecondDateValue(undefined);
      } else {
        setDateValue(undefined);
      }
    }
    
    setActiveCondition({
      groupId,
      conditionId,
      isSecondDate
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!activeCondition || !date) return;
    
    if (activeCondition.isSecondDate) {
      setSecondDateValue(date);
      updateConditionValue(
        activeCondition.groupId,
        activeCondition.conditionId,
        date.toISOString(),
        true
      );
    } else {
      setDateValue(date);
      updateConditionValue(
        activeCondition.groupId,
        activeCondition.conditionId,
        date.toISOString()
      );
    }
  };

  const handleSaveSegment = () => {
    if (onSaveSegment && segmentName) {
      onSaveSegment(segmentName, segmentDescription);
      setShowSaveDialog(false);
      setSegmentName("");
      setSegmentDescription("");
    }
  };

  const getFieldDefinition = (fieldId: string): FieldDefinition => {
    return availableFields.find(field => field.id === fieldId) || availableFields[0];
  };

  const getOperatorsForField = (fieldId: string) => {
    const field = getFieldDefinition(fieldId);
    return operatorsByType[field.type] || [];
  };

  const renderConditionValue = (condition: FilterCondition, group: FilterGroup) => {
    const field = getFieldDefinition(condition.field);
    
    switch (field.type) {
      case "boolean":
        return (
          <Select
            value={condition.value === null ? "" : String(condition.value)}
            onValueChange={(value) => updateConditionValue(
              group.id, 
              condition.id, 
              value === "true"
            )}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Sim</SelectItem>
              <SelectItem value="false">Não</SelectItem>
            </SelectContent>
          </Select>
        );
        
      case "select":
        return (
          <Select
            value={condition.value === null ? "" : String(condition.value)}
            onValueChange={(value) => updateConditionValue(
              group.id, 
              condition.id, 
              value
            )}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case "date":
        return (
          <div className="flex gap-2 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-[140px] justify-start text-left"
                  onClick={(e) => {
                    e.preventDefault();
                    openDatePicker(group.id, condition.id);
                  }}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {condition.value 
                    ? format(new Date(condition.value.toString()), "dd/MM/yyyy")
                    : <span className="text-muted-foreground">Selecione</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                <CalendarComponent
                  mode="single"
                  selected={dateValue}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            {condition.operator === "between" && (
              <>
                <span>e</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-[140px] justify-start text-left"
                      onClick={(e) => {
                        e.preventDefault();
                        openDatePicker(group.id, condition.id, true);
                      }}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {condition.secondValue 
                        ? format(new Date(condition.secondValue.toString()), "dd/MM/yyyy")
                        : <span className="text-muted-foreground">Selecione</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={secondDateValue}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </>
            )}
          </div>
        );
        
      case "number":
        return (
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              value={condition.value === null ? "" : condition.value.toString()}
              onChange={(e) => updateConditionValue(
                group.id, 
                condition.id, 
                e.target.value ? Number(e.target.value) : null
              )}
              className="w-[140px]"
            />
            
            {condition.operator === "between" && (
              <>
                <span>e</span>
                <Input
                  type="number"
                  value={condition.secondValue === undefined ? "" : condition.secondValue.toString()}
                  onChange={(e) => updateConditionValue(
                    group.id, 
                    condition.id, 
                    e.target.value ? Number(e.target.value) : null,
                    true
                  )}
                  className="w-[140px]"
                />
              </>
            )}
          </div>
        );
        
      default: // text
        return (
          <Input
            value={condition.value === null ? "" : condition.value.toString()}
            onChange={(e) => updateConditionValue(
              group.id, 
              condition.id, 
              e.target.value
            )}
            className="w-[140px]"
          />
        );
    }
  };
  
  const getConditionDescription = (condition: FilterCondition) => {
    const field = getFieldDefinition(condition.field);
    const operator = getOperatorsForField(condition.field).find(op => op.value === condition.operator);
    
    let valueText = "";
    
    if (field.type === "boolean") {
      valueText = condition.value === true ? "Sim" : "Não";
    } else if (field.type === "select") {
      valueText = field.options?.find(opt => opt.value === condition.value)?.label || String(condition.value);
    } else if (field.type === "date" && condition.value) {
      try {
        valueText = format(new Date(condition.value.toString()), "dd/MM/yyyy");
        if (condition.operator === "between" && condition.secondValue) {
          valueText += ` e ${format(new Date(condition.secondValue.toString()), "dd/MM/yyyy")}`;
        }
      } catch (e) {
        valueText = String(condition.value);
      }
    } else {
      valueText = condition.value !== null ? String(condition.value) : "";
    }
    
    return `${field.name} ${operator?.label || ""} ${valueText}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Segmentação Avançada</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSaveDialog(true)}
            disabled={!onSaveSegment || filterGroups.every(g => g.conditions.length === 0)}
          >
            Salvar segmento
          </Button>
        </div>
      </div>
      
      {filterGroups.map((group, groupIndex) => (
        <Card key={group.id} className="border mb-4">
          <CardHeader className="pb-2 pt-4 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={group.type === "AND" ? "default" : "secondary"}>
                  {groupIndex === 0 ? "Onde" : `${group.type === "AND" ? "E" : "OU"} onde`}
                </Badge>
                
                {groupIndex > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleGroupType(group.id)}
                    className="h-7 px-2 text-xs"
                  >
                    Alternar para {group.type === "AND" ? "OU" : "E"}
                  </Button>
                )}
              </div>
              
              {groupIndex > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeGroup(group.id)}
                  className="h-7 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-3.5 w-3.5 mr-1" />
                  Remover
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="px-4 py-0 space-y-2">
            {group.conditions.length === 0 ? (
              <div className="text-center py-3 text-sm text-muted-foreground">
                Adicione condições ao filtro
              </div>
            ) : (
              <div className="space-y-2 py-2">
                {group.conditions.map((condition) => (
                  <div 
                    key={condition.id} 
                    className="flex items-center gap-2 bg-muted/50 p-2 rounded-md"
                  >
                    <Select
                      value={condition.field}
                      onValueChange={(value) => updateConditionField(group.id, condition.id, value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Campo" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableFields.map(field => (
                          <SelectItem key={field.id} value={field.id}>{field.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select
                      value={condition.operator}
                      onValueChange={(value) => updateConditionOperator(group.id, condition.id, value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Operador" />
                      </SelectTrigger>
                      <SelectContent>
                        {getOperatorsForField(condition.field).map(op => (
                          <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {renderConditionValue(condition, group)}
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCondition(group.id, condition.id)}
                      className="h-7 w-7 rounded-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <Button
              variant="outline"
              size="sm"
              className="w-full my-2"
              onClick={() => addCondition(group.id)}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Adicionar condição
            </Button>
          </CardContent>
        </Card>
      ))}
      
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={addGroup}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4 mr-1" />
          {filterGroups.length > 0 ? "Adicionar grupo OU" : "Adicionar filtro"}
        </Button>
      </div>
      
      {filterGroups.some(group => group.conditions.length > 0) && (
        <Accordion type="single" collapsible className="border rounded-md">
          <AccordionItem value="summary">
            <AccordionTrigger className="px-4">
              Resumo do segmento
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-2 text-sm">
                {filterGroups.map((group, groupIndex) => (
                  <div key={group.id} className="space-y-1">
                    {group.conditions.length > 0 && (
                      <div>
                        <Badge variant={group.type === "AND" ? "default" : "secondary"} className="mb-1">
                          {groupIndex === 0 ? "Onde" : group.type === "AND" ? "E onde" : "OU onde"}
                        </Badge>
                        <div className="pl-4 space-y-0.5">
                          {group.conditions.map(condition => (
                            <div key={condition.id} className="flex items-center gap-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary inline-block mr-1" />
                              <span>{getConditionDescription(condition)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {/* Save Segment Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Salvar Segmento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="segment-name" className="text-sm font-medium">
                  Nome do segmento
                </label>
                <Input
                  id="segment-name"
                  value={segmentName}
                  onChange={(e) => setSegmentName(e.target.value)}
                  placeholder="Ex: Clientes VIP"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="segment-description" className="text-sm font-medium">
                  Descrição (opcional)
                </label>
                <Input
                  id="segment-description"
                  value={segmentDescription}
                  onChange={(e) => setSegmentDescription(e.target.value)}
                  placeholder="Ex: Clientes que gastaram mais de R$ 500"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveSegment} disabled={!segmentName}>
                Salvar
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdvancedSegmentFilter;
