
import React, { useState } from "react";
import { Upload, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGroupSelector from "./ProductGroupSelector";

const ProductCodeSelector = () => {
  const [manualCodes, setManualCodes] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setManualCodes(content);
      };
      reader.readAsText(files[0]);
    }
  };

  const handleProductGroupSelection = (selection: {
    type: 'group' | 'manual';
    data: string[] | string;
  }) => {
    console.log("Seleção de produtos:", selection);
    // Aqui você pode implementar a lógica para usar a seleção
  };

  const manualCodesList = manualCodes.split('\n').map(line => line.trim()).filter(line => line);

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
        <Info className="h-4 w-4 text-blue-500 mt-0.5" />
        <span className="text-sm text-blue-700">
          Selecione grupos de produtos ou informe códigos específicos.
        </span>
      </div>

      <Tabs defaultValue="groups" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="groups">Grupos e Códigos</TabsTrigger>
          <TabsTrigger value="manual">Importação Manual</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="space-y-4">
          <ProductGroupSelector onSelectionChange={handleProductGroupSelection} />
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
              onChange={(e) => setManualCodes(e.target.value)}
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
                  Códigos inseridos ({manualCodesList.length})
                </Label>
                <Button variant="ghost" size="sm" onClick={() => setManualCodes("")}>
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
    </div>
  );
};

export default ProductCodeSelector;
