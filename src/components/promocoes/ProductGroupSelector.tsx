
import React, { useState } from "react";
import { Search, Upload, Package, Info, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

// Mock product groups
const productGroups = [
  { id: "group-1", name: "Bebidas", description: "Todas as bebidas do cardápio", count: 25 },
  { id: "group-2", name: "Lanches", description: "Hambúrgueres e sanduíches", count: 18 },
  { id: "group-3", name: "Sobremesas", description: "Doces e sobremesas", count: 12 },
  { id: "group-4", name: "Pratos principais", description: "Pratos quentes e principais", count: 35 },
  { id: "group-5", name: "Entradas", description: "Aperitivos e entradas", count: 15 }
];

interface ProductGroupSelectorProps {
  onSelectionChange?: (selection: {
    type: 'group' | 'manual';
    data: string[] | string;
  }) => void;
}

const ProductGroupSelector: React.FC<ProductGroupSelectorProps> = ({ onSelectionChange }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [manualCodes, setManualCodes] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectionMode, setSelectionMode] = useState<"group" | "manual">("group");

  const filteredGroups = productGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGroupSelect = (groupId: string) => {
    setSelectedGroup(groupId);
    setSelectionMode("group");
    onSelectionChange?.({
      type: "group",
      data: groupId
    });
  };

  const handleManualCodesChange = (value: string) => {
    setManualCodes(value);
    setSelectionMode("manual");
    const codes = value.split('\n').map(line => line.trim()).filter(line => line);
    onSelectionChange?.({
      type: "manual",
      data: codes
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
        setManualCodes(content);
        const codes = content.split('\n').map(line => line.trim()).filter(line => line);
        onSelectionChange?.({
          type: "manual",
          data: codes
        });
      };
      reader.readAsText(files[0]);
    }
  };

  const clearSelection = () => {
    setSelectedGroup("");
    setManualCodes("");
    setSelectedFile(null);
    onSelectionChange?.({
      type: "group",
      data: ""
    });
  };

  const manualCodesList = manualCodes.split('\n').map(line => line.trim()).filter(line => line);

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
        <Info className="h-4 w-4 text-blue-500 mt-0.5" />
        <span className="text-sm text-blue-700">
          Selecione um grupo de produtos ou informe códigos específicos dos produtos.
        </span>
      </div>

      <Tabs defaultValue="group" onValueChange={(value) => setSelectionMode(value as "group" | "manual")}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="group">Grupos de Produtos</TabsTrigger>
          <TabsTrigger value="manual">Códigos de Produtos</TabsTrigger>
        </TabsList>

        <TabsContent value="group" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar grupos de produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                className={`cursor-pointer transition-all hover:bg-slate-50 ${
                  selectedGroup === group.id ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => handleGroupSelect(group.id)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                    <Badge variant="outline">{group.count} produtos</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={() => alert("Funcionalidade para criar novo grupo será implementada")}
          >
            <Plus className="h-4 w-4" />
            Criar Novo Grupo
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
            <Label className="text-sm font-medium">Ou cole a lista de códigos:</Label>
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
                  Códigos selecionados ({manualCodesList.length})
                </Label>
                <Button variant="ghost" size="sm" onClick={clearSelection}>
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
        </TabsContent>
      </Tabs>

      {(selectedGroup || manualCodesList.length > 0) && (
        <div className="bg-green-50 p-3 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">
                {selectionMode === "group" 
                  ? `Grupo: ${productGroups.find(g => g.id === selectedGroup)?.name}`
                  : `${manualCodesList.length} códigos selecionados manualmente`
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

export default ProductGroupSelector;
