
import { useState } from "react";
import { Search, Download, Upload, UserPlus, Plus, Filter, MessageSquare, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ClientsTable from "./ClientsTable";
import AddClientDialog from "./AddClientDialog";
import ImportClientsDialog from "./ImportClientsDialog";
import EnrichClientsDialog from "./EnrichClientsDialog";
import { useToast } from "@/hooks/use-toast";

const ClientManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isEnrichOpen, setIsEnrichOpen] = useState(false);

  const handleDownloadTemplate = () => {
    toast({
      title: "Download iniciado",
      description: "O download da planilha modelo foi iniciado."
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nome, CPF, telefone ou e-mail..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 ml-4">
          <Button variant="outline" onClick={() => setIsImportOpen(true)}>
            <Upload className="w-4 h-4 mr-2" /> Importar
          </Button>
          <Button variant="outline" onClick={handleDownloadTemplate}>
            <Download className="w-4 h-4 mr-2" /> Exportar
          </Button>
          <Button onClick={() => setIsEnrichOpen(true)}>
            <Users className="w-4 h-4 mr-2" /> Enriquecer Cadastros
          </Button>
          <Button onClick={() => setIsAddClientOpen(true)}>
            <UserPlus className="w-4 h-4 mr-2" /> Adicionar Cliente
          </Button>
        </div>
      </div>

      <ClientsTable searchQuery={searchQuery} />

      <AddClientDialog 
        open={isAddClientOpen} 
        onOpenChange={setIsAddClientOpen} 
      />
      
      <ImportClientsDialog 
        open={isImportOpen} 
        onOpenChange={setIsImportOpen} 
        onDownloadTemplate={handleDownloadTemplate} 
      />
      
      <EnrichClientsDialog 
        open={isEnrichOpen} 
        onOpenChange={setIsEnrichOpen} 
      />
    </div>
  );
};

export default ClientManagement;
