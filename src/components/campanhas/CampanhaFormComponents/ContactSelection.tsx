
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Upload, Users, File, Info, Check } from "lucide-react";
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage, 
  FormDescription 
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CustomerSegment } from "@/types/campaign";

// Mock customer segments - this will be replaced with API data later
const customerSegments: CustomerSegment[] = [
  {
    id: "seg-1",
    name: "Todos os clientes",
    description: "Todos os clientes cadastrados",
    customerCount: 2500
  },
  {
    id: "seg-2",
    name: "Clientes VIP",
    description: "Clientes com alto valor de compra",
    customerCount: 350
  },
  {
    id: "seg-3",
    name: "Clientes inativos",
    description: "Clientes sem compras nos últimos 30 dias",
    customerCount: 1200
  },
  {
    id: "seg-4",
    name: "Novos clientes",
    description: "Clientes que fizeram a primeira compra nos últimos 15 dias",
    customerCount: 180
  },
  {
    id: "seg-5",
    name: "Aniversariantes do mês",
    description: "Clientes que fazem aniversário este mês",
    customerCount: 75
  }
];

const ContactSelection = () => {
  const form = useFormContext();
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [contactMode, setContactMode] = useState<"segment" | "upload" | "manual">("segment");
  const [manualContacts, setManualContacts] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const selectedSegmentId = form.watch("segmentId");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleConfirmContacts = () => {
    if (contactMode === "manual" && manualContacts) {
      form.setValue("contactSource", "manual");
      form.setValue("manualContacts", manualContacts);
    } else if (contactMode === "upload" && selectedFile) {
      form.setValue("contactSource", "file");
      form.setValue("contactFile", selectedFile.name);
      // Note: In a real implementation, you would handle the file upload to server here
    } else if (contactMode === "segment" && selectedSegmentId) {
      form.setValue("contactSource", "segment");
      // Already have segmentId selected
    }
    
    setShowContactDialog(false);
  };

  // Get currently selected segment name
  const getSelectedSegmentName = () => {
    const segment = customerSegments.find(seg => seg.id === selectedSegmentId);
    return segment ? segment.name : "Nenhum segmento selecionado";
  };

  // Get contact source info text
  const getContactSourceInfo = () => {
    const source = form.watch("contactSource");
    
    if (source === "segment") {
      return `Segmento: ${getSelectedSegmentName()}`;
    } else if (source === "file" && form.watch("contactFile")) {
      return `Arquivo: ${form.watch("contactFile")}`;
    } else if (source === "manual") {
      const count = form.watch("manualContacts")?.split("\n").filter(line => line.trim()).length || 0;
      return `Contatos manuais: ${count} contatos`;
    }
    
    return "Nenhuma fonte selecionada";
  };

  return (
    <FormItem className="space-y-3">
      <FormLabel>Destinatários</FormLabel>
      <FormControl>
        <div className="border rounded-md p-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-500" />
              <span>{getContactSourceInfo()}</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowContactDialog(true)}>
              {form.watch("contactSource") ? "Alterar" : "Selecionar"}
            </Button>
          </div>
          
          {form.watch("contactSource") === "segment" && (
            <div className="mt-2 text-sm text-slate-500">
              <Badge variant="outline">{customerSegments.find(seg => seg.id === selectedSegmentId)?.customerCount || 0} destinatários</Badge>
            </div>
          )}
        </div>
      </FormControl>
      <FormMessage />

      {/* Dialog for contact selection */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Selecionar destinatários</DialogTitle>
          </DialogHeader>
          
          <Tabs value={contactMode} onValueChange={(value) => setContactMode(value as "segment" | "upload" | "manual")}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="segment">Segmento</TabsTrigger>
              <TabsTrigger value="upload">Importar</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>
            
            <TabsContent value="segment" className="space-y-4">
              <FormDescription>
                Selecione um segmento de clientes pré-definido
              </FormDescription>
              
              <div className="space-y-2">
                <RadioGroup value={selectedSegmentId} onValueChange={(value) => form.setValue("segmentId", value)}>
                  {customerSegments.map((segment) => (
                    <div key={segment.id} className="relative">
                      <RadioGroupItem
                        value={segment.id}
                        id={segment.id}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={segment.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between w-full p-3 cursor-pointer rounded-md border bg-white peer-data-[state=checked]:border-primary transition-all hover:bg-slate-50"
                      >
                        <div>
                          <p className="font-medium">{segment.name}</p>
                          <p className="text-xs text-slate-500">{segment.description}</p>
                        </div>
                        <Badge variant="outline" className="mt-1 sm:mt-0">
                          {segment.customerCount} contatos
                        </Badge>
                        <div className="absolute right-3 top-3 opacity-0 peer-data-[state=checked]:opacity-100 text-primary">
                          <Check className="h-4 w-4" />
                        </div>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="space-y-4">
              <FormDescription>
                Importe um arquivo CSV ou Excel com seus contatos
              </FormDescription>
              
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Arraste um arquivo CSV ou Excel ou clique para fazer upload
                </p>
                <Button variant="outline" size="sm" className="mt-2 relative">
                  Selecionar arquivo
                  <Input
                    type="file" 
                    accept=".csv,.xlsx,.xls"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileUpload}
                  />
                </Button>
                
                {selectedFile && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <File className="h-4 w-4 text-slate-500" />
                    <span className="text-sm">{selectedFile.name}</span>
                  </div>
                )}
              </div>
              
              <div className="bg-blue-50 p-2 rounded-md flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                <span className="text-xs text-blue-700">
                  O arquivo deve conter colunas para nome e telefone/email. Você poderá mapear as colunas na próxima etapa.
                </span>
              </div>
            </TabsContent>
            
            <TabsContent value="manual" className="space-y-4">
              <FormDescription>
                Insira os contatos manualmente. Um contato por linha no formato "Nome, Email/WhatsApp"
              </FormDescription>
              
              <Textarea
                placeholder="João Silva, joao@email.com
Maria Santos, 5511999998888
Carlos Oliveira, carlos@email.com"
                value={manualContacts}
                onChange={(e) => setManualContacts(e.target.value)}
                className="h-[150px] font-mono text-sm"
              />
              
              <div className="bg-blue-50 p-2 rounded-md flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                <span className="text-xs text-blue-700">
                  Para mensagens de WhatsApp, inclua o número com código do país (ex: 5511999998888).
                </span>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowContactDialog(false)}>Cancelar</Button>
            <Button onClick={handleConfirmContacts}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormItem>
  );
};

export default ContactSelection;
