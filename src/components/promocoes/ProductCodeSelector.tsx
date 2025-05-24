
import React, { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Info } from "lucide-react";
import { useFormContext } from "react-hook-form";

const ProductCodeSelector = () => {
  const form = useFormContext();
  const [manualCodes, setManualCodes] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      // Simular leitura do arquivo
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const codes = content.split('\n').map(line => line.trim()).filter(line => line);
        form.setValue("productCodes", codes);
      };
      reader.readAsText(files[0]);
    }
  };

  const handleManualCodesChange = (value: string) => {
    setManualCodes(value);
    const codes = value.split('\n').map(line => line.trim()).filter(line => line);
    form.setValue("productCodes", codes);
  };

  const removeCodes = () => {
    setManualCodes("");
    setSelectedFile(null);
    form.setValue("productCodes", []);
  };

  const productCodes = form.watch("productCodes") || [];

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="productCodes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Códigos dos Produtos</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span className="text-sm text-blue-700">
                    Informe os códigos dos produtos que receberão a promoção. Você pode fazer upload de um arquivo CSV/TXT ou colar a lista manualmente.
                  </span>
                </div>

                {/* Upload de arquivo */}
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

                {/* Entrada manual */}
                <div>
                  <FormLabel className="text-sm font-medium">Ou cole a lista de códigos:</FormLabel>
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

                {/* Lista de códigos selecionados */}
                {productCodes.length > 0 && (
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <FormLabel className="text-sm font-medium">
                        Códigos selecionados ({productCodes.length})
                      </FormLabel>
                      <Button variant="ghost" size="sm" onClick={removeCodes}>
                        <X className="h-4 w-4 mr-1" />
                        Limpar
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {productCodes.map((code, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {code}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductCodeSelector;
