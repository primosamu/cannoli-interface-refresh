
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Filter, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Client, ClientTag } from "@/types/client";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock segments for demonstration
const mockSegments = [
  { id: "1", name: "Todos os clientes" },
  { id: "2", name: "Clientes VIP" },
  { id: "3", name: "Clientes inativos" },
  { id: "4", name: "Novos clientes" },
  { id: "5", name: "Aniversariantes do mês" }
];

// Mock clients for demonstration
const mockClients: Client[] = [
  {
    id: "1",
    name: "João Silva",
    cpf: "123.456.789-00",
    phone: "",
    email: "joao@example.com",
    orderCount: 15,
    lastOrderDate: "2025-04-15",
    totalSpent: 1250.75,
    tags: ["vip", "recorrente"]
  },
  {
    id: "2",
    name: "Maria Oliveira",
    cpf: "987.654.321-00",
    phone: "",
    email: "maria@example.com",
    orderCount: 7,
    lastOrderDate: "2025-04-10",
    totalSpent: 580.25,
    tags: ["recorrente"]
  },
  {
    id: "3",
    name: "Pedro Santos",
    cpf: "456.789.123-00",
    phone: "",
    email: "pedro@example.com",
    orderCount: 3,
    lastOrderDate: "2025-04-05",
    totalSpent: 220.50,
    tags: ["novo"]
  },
  {
    id: "4",
    name: "Ana Souza",
    cpf: "321.654.987-00",
    phone: "",
    email: "ana@example.com",
    orderCount: 0,
    lastOrderDate: undefined,
    totalSpent: 0,
    tags: ["novo"]
  },
  {
    id: "5",
    name: "Carlos Pereira",
    cpf: "654.321.987-00",
    phone: "",
    email: "carlos@example.com",
    orderCount: 20,
    lastOrderDate: "2025-01-10",
    totalSpent: 1800.30,
    tags: ["inativo"]
  }
];

interface EnrichClientsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EnrichClientsDialog = ({ open, onOpenChange }: EnrichClientsDialogProps) => {
  const { toast } = useToast();
  const [selectedSegment, setSelectedSegment] = useState<string>("1"); // Default to "Todos os clientes"
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedTags, setSelectedTags] = useState<ClientTag[]>([]);

  // Filter clients by segment and tags
  useEffect(() => {
    let clients = [...mockClients];
    
    // Apply segment filter (in a real app, this would be a database query)
    if (selectedSegment !== "1") { // "1" is "Todos os clientes"
      if (selectedSegment === "2") { // VIP clients
        clients = clients.filter(client => client.tags.includes("vip"));
      } else if (selectedSegment === "3") { // Inactive clients
        clients = clients.filter(client => client.tags.includes("inativo"));
      } else if (selectedSegment === "4") { // New clients
        clients = clients.filter(client => client.tags.includes("novo"));
      }
      // More segment filters can be added here
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      clients = clients.filter(client => 
        selectedTags.some(tag => client.tags.includes(tag))
      );
    }

    // Filter out clients that already have a phone number
    clients = clients.filter(client => !client.phone);
    
    setFilteredClients(clients);
  }, [selectedSegment, selectedTags]);

  // Handle "Select All" checkbox
  useEffect(() => {
    if (selectAll) {
      setSelectedClients(filteredClients.map(client => client.id));
    } else if (selectedClients.length === filteredClients.length) {
      // If all were selected and select all is now false, deselect all
      setSelectedClients([]);
    }
  }, [selectAll, filteredClients]);

  const handleClientSelect = (clientId: string) => {
    setSelectedClients(prev => {
      if (prev.includes(clientId)) {
        return prev.filter(id => id !== clientId);
      } else {
        return [...prev, clientId];
      }
    });
  };

  const handleSegmentChange = (value: string) => {
    setSelectedSegment(value);
    setSelectedClients([]); // Reset selections when segment changes
    setSelectAll(false);
  };

  const handleTagToggle = (tag: ClientTag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
    setSelectedClients([]); // Reset selections when tags change
    setSelectAll(false);
  };

  const handleEnrichClientsData = () => {
    if (selectedClients.length === 0) {
      toast({
        title: "Nenhum cliente selecionado",
        description: "Selecione pelo menos um cliente para enriquecer."
      });
      return;
    }

    toast({
      title: "Enriquecimento iniciado",
      description: `Iniciado o processo de enriquecimento de ${selectedClients.length} clientes.`
    });
    onOpenChange(false);
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
  };

  const tagLabels: Record<ClientTag, string> = {
    vip: "VIP",
    novo: "Novo",
    recorrente: "Recorrente",
    inativo: "Inativo"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Enriquecer Cadastros</DialogTitle>
          <DialogDescription>
            Adicione dados faltantes aos seus clientes através de nossa API de enriquecimento.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>Clientes sem telefone: {filteredClients.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedSegment} onValueChange={handleSegmentChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecionar segmento" />
                </SelectTrigger>
                <SelectContent>
                  {mockSegments.map(segment => (
                    <SelectItem key={segment.id} value={segment.id}>
                      {segment.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Tags de cliente</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {(Object.keys(tagLabels) as ClientTag[]).map(tag => (
                    <DropdownMenuCheckboxItem
                      key={tag}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => handleTagToggle(tag)}
                    >
                      {tagLabels[tag]}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {filteredClients.length > 0 ? (
            <div className="border rounded-md">
              <div className="bg-muted/50 px-4 py-2 flex items-center">
                <div className="flex items-center">
                  <Checkbox 
                    id="selectAll"
                    checked={selectAll} 
                    onCheckedChange={handleSelectAllChange} 
                    className="mr-2" 
                  />
                  <label htmlFor="selectAll" className="text-sm font-medium">
                    Selecionar todos
                  </label>
                </div>
                <div className="ml-auto">
                  {selectedClients.length > 0 && (
                    <Badge variant="secondary">
                      {selectedClients.length} selecionado(s)
                    </Badge>
                  )}
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredClients.map(client => (
                  <div 
                    key={client.id} 
                    className="px-4 py-2 border-t flex items-center justify-between hover:bg-muted/20"
                  >
                    <div className="flex items-center">
                      <Checkbox 
                        id={`client-${client.id}`}
                        checked={selectedClients.includes(client.id)}
                        onCheckedChange={() => handleClientSelect(client.id)}
                        className="mr-2" 
                      />
                      <div>
                        <label 
                          htmlFor={`client-${client.id}`} 
                          className="text-sm font-medium cursor-pointer"
                        >
                          {client.name}
                        </label>
                        <div className="text-xs text-muted-foreground">{client.cpf}</div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {client.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tagLabels[tag]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 border rounded-md bg-muted/20">
              <p className="text-muted-foreground">Nenhum cliente encontrado com os filtros selecionados.</p>
            </div>
          )}
          
          <p className="text-sm text-muted-foreground">
            O processo de enriquecimento utilizará o CPF dos clientes para buscar os telefones faltantes através de nossa API parceira.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleEnrichClientsData} 
            disabled={selectedClients.length === 0}
          >
            Enriquecer {selectedClients.length} cadastro{selectedClients.length !== 1 ? 's' : ''}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnrichClientsDialog;
