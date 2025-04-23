
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ClientTag } from "@/types/client";

interface Client {
  id: string;
  name: string;
  cpf: string;
  phone?: string;
  email?: string;
  orderCount: number;
  lastOrderDate?: string;
  totalSpent: number;
  tags: ClientTag[];
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "João Silva",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
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
    phone: "(11) 91234-5678",
    email: "maria@example.com",
    orderCount: 7,
    lastOrderDate: "2025-04-10",
    totalSpent: 580.25,
    tags: ["recorrente"]
  }
];

const tagColors: Record<ClientTag, string> = {
  vip: "bg-amber-500",
  novo: "bg-green-500",
  recorrente: "bg-blue-500",
  inativo: "bg-gray-500"
};

interface ClientsTableProps {
  searchQuery: string;
}

const ClientsTable = ({ searchQuery }: ClientsTableProps) => {
  const { toast } = useToast();
  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.cpf.includes(searchQuery) ||
    client.phone?.includes(searchQuery) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContact = (client: Client, type: 'whatsapp' | 'email') => {
    if (type === 'whatsapp') {
      if (!client.phone) {
        toast({
          title: "Telefone não encontrado",
          description: "Este cliente não possui um telefone cadastrado.",
          variant: "destructive"
        });
        return;
      }
      window.open(`https://wa.me/${client.phone.replace(/\D/g, '')}`, '_blank');
    } else if (type === 'email') {
      if (!client.email) {
        toast({
          title: "Email não encontrado",
          description: "Este cliente não possui um email cadastrado.",
          variant: "destructive"
        });
        return;
      }
      window.open(`mailto:${client.email}`, '_blank');
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead className="text-right">Pedidos</TableHead>
            <TableHead>Último Pedido</TableHead>
            <TableHead className="text-right">Total Gasto</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.cpf}</TableCell>
              <TableCell>{client.phone || "-"}</TableCell>
              <TableCell className="text-right">{client.orderCount}</TableCell>
              <TableCell>{client.lastOrderDate || "-"}</TableCell>
              <TableCell className="text-right">
                {client.totalSpent.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {client.tags.map(tag => (
                    <Badge key={tag} className={`${tagColors[tag]} text-white`}>
                      {tag === 'vip' ? 'VIP' : 
                       tag === 'novo' ? 'Novo' :
                       tag === 'recorrente' ? 'Recorrente' : 'Inativo'}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  {client.phone && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleContact(client, 'whatsapp')}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  )}
                  {client.email && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleContact(client, 'email')}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientsTable;
