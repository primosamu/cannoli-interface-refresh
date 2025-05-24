
import React, { useState } from "react";
import { Info, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Mock product segments
const productSegments = [
  { id: "all", name: "TODOS" },
  { id: "bebidas", name: "Bebidas" },
  { id: "lanches", name: "Lanches" },
  { id: "sobremesas", name: "Sobremesas" },
  { id: "pratos-principais", name: "Pratos Principais" },
  { id: "entradas", name: "Entradas" },
];

interface ProductsTabProps {
  onSelectionChange?: (selection: {
    type: 'codes' | 'segments';
    condition: 'equal' | 'different';
    data: string[];
  }) => void;
}

const ProductsTab: React.FC<ProductsTabProps> = ({ onSelectionChange }) => {
  const [activeTab, setActiveTab] = useState("codes");
  const [codeCondition, setCodeCondition] = useState<"equal" | "different">("equal");
  const [segmentCondition, setSegmentCondition] = useState<"equal" | "different">("equal");
  const [manualCodes, setManualCodes] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setManualCodes(content);
        const codes = content.split('\n').map(line => line.trim()).filter(line => line);
        onSelectionChange?.({
          type: "codes",
          condition: codeCondition,
          data: codes
        });
      };
      reader.readAsText(files[0]);
    }
  };

  const handleManualCodesChange = (value: string) => {
    setManualCodes(value);
    const codes = value.split('\n').map(line => line.trim()).filter(line => line);
    onSelectionChange?.({
      type: "codes",
      condition: codeCondition,
      data: codes
    });
  };

  const handleSegmentToggle = (segmentId: string) => {
    let newSelectedSegments: string[];
    
    if (segmentId === "all") {
      // Se selecionou "TODOS", limpa outras seleções e seleciona apenas "all"
      newSelectedSegments = selectedSegments.includes("all") ? [] : ["all"];
    } else {
      // Remove "TODOS" se existir e toggle o segmento específico
      const withoutAll = selectedSegments.filter(id => id !== "all");
      if (withoutAll.includes(segmentId)) {
        newSelectedSegments = withoutAll.filter(id => id !== segmentId);
      } else {
        newSelectedSegments = [...withoutAll, segmentId];
      }
    }
    
    setSelectedSegments(newSelectedSegments);
    onSelectionChange?.({
      type: "segments",
      condition: segmentCondition,
      data: newSelectedSegments
    });
  };

  const clearCodes = () => {
    setManualCodes("");
    setSelectedFile(null);
    onSelectionChange?.({
      type: "codes",
      condition: codeCondition,
      data: []
    });
  };

  const clearSegments = () => {
    setSelectedSegments([]);
    onSelectionChange?.({
      type: "segments",
      condition: segmentCondition,
      data: []
    });
  };

  const manualCodesList = manualCodes.split('\n').map(line => line.trim()).filter(line => line);

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
        <Info className="h-4 w-4 text-blue-500 mt-0.5" />
        <span className="text-sm text-blue-700">
          Configure quais produtos serão incluídos ou excluídos da promoção usando códigos específicos ou segmentos.
        </span>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="codes">Códigos de Produtos</TabsTrigger>
          <TabsTrigger value="segments">Segmentos de Produtos</TabsTrigger>
        </TabsList>

        <TabsContent value="codes" className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Condição</Label>
              <Select value={codeCondition} onValueChange={(value: "equal" | "different") => setCodeCondition(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equal">IGUAL - Aplicar apenas nos códigos informados</SelectItem>
                  <SelectItem value="different">DIFERENTE DE - Aplicar em todos exceto os códigos informados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border-2 border-dashed rounded-md p-4">
              <div className="text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Arraste um arquivo CSV/TXT ou clique para fazer upload
                </p>
                <Button variant="outline" size="sm" className="relative">
                  Selecionar arquivo
                  <Input
                    type="file"
                    accept=".csv,.txt"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileUpload}
                  />
                </Button>
                {selectedFile && (
                  <p className="text-sm text-green-600 mt-2">
                    Arquivo: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Ou digite os códigos manualmente:</Label>
              <Textarea
                placeholder="PROD001
PROD002
PROD003"
                value={manualCodes}
                onChange={(e) => handleManualCodesChange(e.target.value)}
                className="mt-1 h-32 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Um código por linha
              </p>
            </div>

            {manualCodesList.length > 0 && (
              <div className="border rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-sm font-medium">
                    Códigos {codeCondition === "equal" ? "incluídos" : "excluídos"} ({manualCodesList.length})
                  </Label>
                  <Button variant="ghost" size="sm" onClick={clearCodes}>
                    <X className="h-4 w-4 mr-1" />
                    Limpar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {manualCodesList.map((code, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {code}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Condição</Label>
              <Select value={segmentCondition} onValueChange={(value: "equal" | "different") => setSegmentCondition(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equal">IGUAL - Aplicar apenas nos segmentos selecionados</SelectItem>
                  <SelectItem value="different">DIFERENTE DE - Aplicar em todos exceto os segmentos selecionados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Selecione os segmentos:</Label>
              <div className="space-y-2">
                {productSegments.map((segment) => (
                  <Card
                    key={segment.id}
                    className={`cursor-pointer transition-all hover:bg-slate-50 ${
                      selectedSegments.includes(segment.id) ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => handleSegmentToggle(segment.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedSegments.includes(segment.id)}
                          onChange={() => {}} // Controlled by card click
                        />
                        <Label className={`cursor-pointer ${segment.id === "all" ? "font-semibold" : ""}`}>
                          {segment.name}
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {selectedSegments.length > 0 && (
              <div className="border rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-sm font-medium">
                    Segmentos {segmentCondition === "equal" ? "incluídos" : "excluídos"} ({selectedSegments.length})
                  </Label>
                  <Button variant="ghost" size="sm" onClick={clearSegments}>
                    <X className="h-4 w-4 mr-1" />
                    Limpar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSegments.map((segmentId) => {
                    const segment = productSegments.find(s => s.id === segmentId);
                    return (
                      <Badge key={segmentId} variant="secondary" className="text-xs">
                        {segment?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsTab;
