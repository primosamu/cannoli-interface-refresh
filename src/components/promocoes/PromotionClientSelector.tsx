
import React, { useState } from "react";
import { Search, Upload, Users, Info, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

// Mock customer segments
const customerSegments = [
  { id: "seg-1", name: "Todos os clientes", description: "Todos os clientes cadastrados", count: 2500 },
  { id: "seg-2", name: "Clientes VIP", description: "Clientes com alto valor de compra", count: 350 },
  { id: "seg-3", name: "Clientes inativos", description: "Clientes sem compras nos últimos 30 dias", count: 1200 },
  { id: "seg-4", name: "Novos clientes", description: "Primeira compra nos últimos 15 dias", count: 180 },
  { id: "seg-5", name: "Aniversariantes do mês", description: "Clientes que fazem aniversário este mês", count: 75 }
];

interface PromotionClientSelectorProps {
  onSelectionChange?: (selection: {
    type: 'segment' | 'manual';
    data: string[] | string;
  }) => void;
}

const PromotionClientSelector: React.FC<PromotionClientSelectorProps> = ({ onSelectionChange }) => {
  const [selectedSegment, setSelectedSegment] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [manualClients, setManualClients] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectionMode, setSelectionMode] = useState<"segment" | "manual">("segment");

  const filteredSegments = customerSegments.filter(segment =>
    segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    segment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSegmentSelect = (segmentId: string) => {
    setSelectedSegment(segmentId);
    setSelectionMode("segment");
    onSelectionChange?.({
      type: "segment",
      data: segmentId
    });
  };

  const handleManualClientsChange = (value: string) => {
    setManualClients(value);
    setSelectionMode("manual");
    const clients = value.split('\n').map(line => line.trim()).filter(line => line);
    onSelectionChange?.({
      type: "manual",
      data: clients
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setSelectionMode("manual");
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setManualClients(content);
        const clients = content.split('\n').map(line => line.trim()).filter(line => line);
        onSelectionChange?.({
          type: "manual",
          data: clients
        });
      };
      reader.readAsText(files[0]);
    }
  };

  const clearSelection = () => {
    setSelectedSegment("");
    setManualClients("");
    setSelectedFile(null);
    onSelectionChange?.({
      type: "segment",
      data: ""
    });
  };

  const manualClientsList = manualClients.split('\n').map(line => line.trim()).filter(line => line);

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
        <Info className="h-4 w-4 text-blue-500 mt-0.5" />
        <span className="text-sm text-blue-700">
          Selecione um segmento de clientes ou informe CPF/telefone específicos dos clientes que podem usar esta promoção.
        </span>
      </div>

      <Tabs defaultValue="segment" onValueChange={(value) => setSelectionMode(value as "segment" | "manual")}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="segment">Segmentos de Clientes</TabsTrigger>
          <TabsTrigger value="manual">CPF/Telefone</TabsTrigger>
        </TabsList>

        <TabsContent value="segment" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar segmentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredSegments.map((segment) => (
              <Card
                key={segment.id}
                className={`cursor-pointer transition-all hover:bg-slate-50 ${
                  selectedSegment === segment.id ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => handleSegmentSelect(segment.id)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{segment.name}</p>
                      <p className="text-sm text-muted-foreground">{segment.description}</p>
                    </div>
                    <Badge variant="outline">{segment.count} clientes</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={() => alert("Funcionalidade para criar nova segmentação será implementada")}
          >
            <Plus className="h-4 w-4" />
            Criar Nova Segmentação
          </Button>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
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
            <Label className="text-sm font-medium">Ou cole a lista de CPF/telefone:</Label>
            <Textarea
              placeholder="12345678901
11999999999
98765432109"
              value={manualClients}
              onChange={(e) => handleManualClientsChange(e.target.value)}
              className="mt-1 h-32 font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Um CPF ou telefone por linha
            </p>
          </div>

          {manualClientsList.length > 0 && (
            <div className="border rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium">
                  Clientes selecionados ({manualClientsList.length})
                </Label>
                <Button variant="ghost" size="sm" onClick={clearSelection}>
                  <X className="h-4 w-4 mr-1" />
                  Limpar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {manualClientsList.map((client, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {client}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {(selectedSegment || manualClientsList.length > 0) && (
        <div className="bg-green-50 p-3 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">
                {selectionMode === "segment" 
                  ? `Segmento: ${customerSegments.find(s => s.id === selectedSegment)?.name}`
                  : `${manualClientsList.length} clientes selecionados manualmente`
                }
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={clearSelection}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionClientSelector;
