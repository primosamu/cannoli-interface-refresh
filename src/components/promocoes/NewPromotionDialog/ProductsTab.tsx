
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

// Mock client segments
const clientSegments = [
  { id: "all", name: "TODOS" },
  { id: "vip", name: "Clientes VIP" },
  { id: "novos", name: "Clientes Novos" },
  { id: "recorrentes", name: "Clientes Recorrentes" },
  { id: "inativos", name: "Clientes Inativos" },
  { id: "aniversariantes", name: "Aniversariantes" },
];

interface ProductsTabProps {
  onSelectionChange?: (selection: {
    products?: {
      type: 'codes' | 'segments';
      condition: 'equal' | 'different';
      data: string[];
    };
    clients?: {
      type: 'codes' | 'segments';
      condition: 'equal' | 'different';
      data: string[];
    };
  }) => void;
}

const ProductsTab: React.FC<ProductsTabProps> = ({ onSelectionChange }) => {
  const [activeMainTab, setActiveMainTab] = useState("products");
  
  // Product states
  const [productActiveTab, setProductActiveTab] = useState("codes");
  const [productCodeCondition, setProductCodeCondition] = useState<"equal" | "different">("equal");
  const [productSegmentCondition, setProductSegmentCondition] = useState<"equal" | "different">("equal");
  const [productManualCodes, setProductManualCodes] = useState("");
  const [productSelectedFile, setProductSelectedFile] = useState<File | null>(null);
  const [productSelectedSegments, setProductSelectedSegments] = useState<string[]>([]);

  // Client states
  const [clientActiveTab, setClientActiveTab] = useState("codes");
  const [clientCodeCondition, setClientCodeCondition] = useState<"equal" | "different">("equal");
  const [clientSegmentCondition, setClientSegmentCondition] = useState<"equal" | "different">("equal");
  const [clientManualCodes, setClientManualCodes] = useState("");
  const [clientSelectedFile, setClientSelectedFile] = useState<File | null>(null);
  const [clientSelectedSegments, setClientSelectedSegments] = useState<string[]>([]);

  const notifyChange = () => {
    const productCodes = productManualCodes.split('\n').map(line => line.trim()).filter(line => line);
    const clientCodes = clientManualCodes.split('\n').map(line => line.trim()).filter(line => line);

    onSelectionChange?.({
      products: {
        type: productActiveTab === "codes" ? "codes" : "segments",
        condition: productActiveTab === "codes" ? productCodeCondition : productSegmentCondition,
        data: productActiveTab === "codes" ? productCodes : productSelectedSegments
      },
      clients: {
        type: clientActiveTab === "codes" ? "codes" : "segments",
        condition: clientActiveTab === "codes" ? clientCodeCondition : clientSegmentCondition,
        data: clientActiveTab === "codes" ? clientCodes : clientSelectedSegments
      }
    });
  };

  // Product handlers
  const handleProductFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setProductSelectedFile(files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setProductManualCodes(content);
        notifyChange();
      };
      reader.readAsText(files[0]);
    }
  };

  const handleProductManualCodesChange = (value: string) => {
    setProductManualCodes(value);
    notifyChange();
  };

  const handleProductSegmentToggle = (segmentId: string) => {
    let newSelectedSegments: string[];
    
    if (segmentId === "all") {
      newSelectedSegments = productSelectedSegments.includes("all") ? [] : ["all"];
    } else {
      const withoutAll = productSelectedSegments.filter(id => id !== "all");
      if (withoutAll.includes(segmentId)) {
        newSelectedSegments = withoutAll.filter(id => id !== segmentId);
      } else {
        newSelectedSegments = [...withoutAll, segmentId];
      }
    }
    
    setProductSelectedSegments(newSelectedSegments);
    notifyChange();
  };

  // Client handlers
  const handleClientFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setClientSelectedFile(files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setClientManualCodes(content);
        notifyChange();
      };
      reader.readAsText(files[0]);
    }
  };

  const handleClientManualCodesChange = (value: string) => {
    setClientManualCodes(value);
    notifyChange();
  };

  const handleClientSegmentToggle = (segmentId: string) => {
    let newSelectedSegments: string[];
    
    if (segmentId === "all") {
      newSelectedSegments = clientSelectedSegments.includes("all") ? [] : ["all"];
    } else {
      const withoutAll = clientSelectedSegments.filter(id => id !== "all");
      if (withoutAll.includes(segmentId)) {
        newSelectedSegments = withoutAll.filter(id => id !== segmentId);
      } else {
        newSelectedSegments = [...withoutAll, segmentId];
      }
    }
    
    setClientSelectedSegments(newSelectedSegments);
    notifyChange();
  };

  const clearProductCodes = () => {
    setProductManualCodes("");
    setProductSelectedFile(null);
    notifyChange();
  };

  const clearProductSegments = () => {
    setProductSelectedSegments([]);
    notifyChange();
  };

  const clearClientCodes = () => {
    setClientManualCodes("");
    setClientSelectedFile(null);
    notifyChange();
  };

  const clearClientSegments = () => {
    setClientSelectedSegments([]);
    notifyChange();
  };

  const productManualCodesList = productManualCodes.split('\n').map(line => line.trim()).filter(line => line);
  const clientManualCodesList = clientManualCodes.split('\n').map(line => line.trim()).filter(line => line);

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
        <Info className="h-4 w-4 text-blue-500 mt-0.5" />
        <span className="text-sm text-blue-700">
          Configure quais produtos e clientes serão incluídos ou excluídos da promoção.
        </span>
      </div>

      <Tabs value={activeMainTab} onValueChange={setActiveMainTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <Tabs value={productActiveTab} onValueChange={setProductActiveTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="codes">Códigos de Produtos</TabsTrigger>
              <TabsTrigger value="segments">Segmentos de Produtos</TabsTrigger>
            </TabsList>

            <TabsContent value="codes" className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Condição</Label>
                <Select value={productCodeCondition} onValueChange={(value: "equal" | "different") => setProductCodeCondition(value)}>
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
                      onChange={handleProductFileUpload}
                    />
                  </Button>
                  {productSelectedFile && (
                    <p className="text-sm text-green-600 mt-2">
                      Arquivo: {productSelectedFile.name}
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
                  value={productManualCodes}
                  onChange={(e) => handleProductManualCodesChange(e.target.value)}
                  className="mt-1 h-32 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Um código por linha
                </p>
              </div>

              {productManualCodesList.length > 0 && (
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium">
                      Códigos {productCodeCondition === "equal" ? "incluídos" : "excluídos"} ({productManualCodesList.length})
                    </Label>
                    <Button variant="ghost" size="sm" onClick={clearProductCodes}>
                      <X className="h-4 w-4 mr-1" />
                      Limpar
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {productManualCodesList.map((code, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {code}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="segments" className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Condição</Label>
                <Select value={productSegmentCondition} onValueChange={(value: "equal" | "different") => setProductSegmentCondition(value)}>
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
                        productSelectedSegments.includes(segment.id) ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => handleProductSegmentToggle(segment.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={productSelectedSegments.includes(segment.id)}
                            onChange={() => {}}
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

              {productSelectedSegments.length > 0 && (
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium">
                      Segmentos {productSegmentCondition === "equal" ? "incluídos" : "excluídos"} ({productSelectedSegments.length})
                    </Label>
                    <Button variant="ghost" size="sm" onClick={clearProductSegments}>
                      <X className="h-4 w-4 mr-1" />
                      Limpar
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {productSelectedSegments.map((segmentId) => {
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
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Tabs value={clientActiveTab} onValueChange={setClientActiveTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="codes">CPF/Telefone</TabsTrigger>
              <TabsTrigger value="segments">Segmentos de Clientes</TabsTrigger>
            </TabsList>

            <TabsContent value="codes" className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Condição</Label>
                <Select value={clientCodeCondition} onValueChange={(value: "equal" | "different") => setClientCodeCondition(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equal">IGUAL - Aplicar apenas nos CPF/telefones informados</SelectItem>
                    <SelectItem value="different">DIFERENTE DE - Aplicar em todos exceto os CPF/telefones informados</SelectItem>
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
                      onChange={handleClientFileUpload}
                    />
                  </Button>
                  {clientSelectedFile && (
                    <p className="text-sm text-green-600 mt-2">
                      Arquivo: {clientSelectedFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Ou digite os CPF/telefones manualmente:</Label>
                <Textarea
                  placeholder="12345678901
11999999999
98765432109"
                  value={clientManualCodes}
                  onChange={(e) => handleClientManualCodesChange(e.target.value)}
                  className="mt-1 h-32 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Um CPF ou telefone por linha
                </p>
              </div>

              {clientManualCodesList.length > 0 && (
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium">
                      CPF/Telefones {clientCodeCondition === "equal" ? "incluídos" : "excluídos"} ({clientManualCodesList.length})
                    </Label>
                    <Button variant="ghost" size="sm" onClick={clearClientCodes}>
                      <X className="h-4 w-4 mr-1" />
                      Limpar
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {clientManualCodesList.map((code, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {code}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="segments" className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Condição</Label>
                <Select value={clientSegmentCondition} onValueChange={(value: "equal" | "different") => setClientSegmentCondition(value)}>
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
                  {clientSegments.map((segment) => (
                    <Card
                      key={segment.id}
                      className={`cursor-pointer transition-all hover:bg-slate-50 ${
                        clientSelectedSegments.includes(segment.id) ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => handleClientSegmentToggle(segment.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={clientSelectedSegments.includes(segment.id)}
                            onChange={() => {}}
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

              {clientSelectedSegments.length > 0 && (
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium">
                      Segmentos {clientSegmentCondition === "equal" ? "incluídos" : "excluídos"} ({clientSelectedSegments.length})
                    </Label>
                    <Button variant="ghost" size="sm" onClick={clearClientSegments}>
                      <X className="h-4 w-4 mr-1" />
                      Limpar
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {clientSelectedSegments.map((segmentId) => {
                      const segment = clientSegments.find(s => s.id === segmentId);
                      return (
                        <Badge key={segmentId} variant="secondary" className="text-xs">
                          {segment?.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsTab;
