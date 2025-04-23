
import { useState } from "react";
import { Search, Download, Upload, UserPlus, Plus, Filter, MessageSquare, Mail, Phone, Edit, Trash2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

type ClientTag = "vip" | "novo" | "recorrente" | "inativo";

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
  },
  {
    id: "3",
    name: "Pedro Santos",
    cpf: "456.789.123-00",
    orderCount: 1,
    lastOrderDate: "2025-03-25",
    totalSpent: 125.50,
    tags: ["novo"]
  },
  {
    id: "4",
    name: "Ana Ferreira",
    cpf: "789.123.456-00",
    phone: "(11) 97777-8888",
    orderCount: 0,
    totalSpent: 0,
    tags: ["inativo"]
  },
  {
    id: "5",
    name: "Lucas Costa",
    cpf: "321.654.987-00",
    email: "lucas@example.com",
    orderCount: 22,
    lastOrderDate: "2025-04-20",
    totalSpent: 1875.30,
    tags: ["vip", "recorrente"]
  }
];

const tagColors: Record<ClientTag, string> = {
  vip: "bg-amber-500",
  novo: "bg-green-500",
  recorrente: "bg-blue-500",
  inativo: "bg-gray-500"
};

const UsuariosPage = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isEnrichOpen, setIsEnrichOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.cpf.includes(searchQuery) ||
    client.phone?.includes(searchQuery) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClient = () => {
    if (selectedClient) {
      setClients(clients.filter(client => client.id !== selectedClient.id));
      toast({
        title: "Cliente excluído",
        description: `${selectedClient.name} foi removido com sucesso.`
      });
      setIsDeleteOpen(false);
      setSelectedClient(null);
    }
  };

  const clientsWithoutPhone = clients.filter(client => client.cpf && !client.phone).length;

  const handleContact = (client: Client, type: 'whatsapp' | 'sms' | 'email') => {
    if (type === 'whatsapp' || type === 'sms') {
      if (!client.phone) {
        toast({
          title: "Telefone não encontrado",
          description: "Este cliente não possui um telefone cadastrado.",
          variant: "destructive"
        });
        return;
      }
      
      if (type === 'whatsapp') {
        window.open(`https://wa.me/${client.phone.replace(/\D/g, '')}`, '_blank');
      } else {
        toast({
          title: "SMS",
          description: `Enviando SMS para ${client.phone}`,
        });
      }
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

  const handleDownloadTemplate = () => {
    toast({
      title: "Download iniciado",
      description: "O download da planilha modelo foi iniciado."
    });
  };

  const handleEnrichClientsData = () => {
    toast({
      title: "Enriquecimento iniciado",
      description: `Iniciado o processo de enriquecimento de ${clientsWithoutPhone} clientes.`
    });
    setIsEnrichOpen(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <div className="flex space-x-2">
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

      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
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
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

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
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
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
                            onClick={() => {
                              setSelectedClient(client);
                              setIsDetailsOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      Nenhum cliente encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal para adicionar cliente */}
      <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Cliente</DialogTitle>
            <DialogDescription>
              Preencha os dados do cliente abaixo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Nome
              </label>
              <Input id="name" className="col-span-3" placeholder="Nome completo" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="cpf" className="text-right text-sm font-medium">
                CPF
              </label>
              <Input id="cpf" className="col-span-3" placeholder="000.000.000-00" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right text-sm font-medium">
                Telefone
              </label>
              <Input id="phone" className="col-span-3" placeholder="(00) 00000-0000" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right text-sm font-medium">
                E-mail
              </label>
              <Input id="email" className="col-span-3" placeholder="exemplo@email.com" type="email" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddClientOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              toast({
                title: "Cliente adicionado",
                description: "O novo cliente foi adicionado com sucesso."
              });
              setIsAddClientOpen(false);
            }}>
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para importar planilha */}
      <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Importar Clientes</DialogTitle>
            <DialogDescription>
              Faça upload de uma planilha com os dados dos clientes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm mb-1">
                Arraste e solte o arquivo aqui ou
              </p>
              <Button variant="outline" size="sm">
                Selecionar Arquivo
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Formato suportado: Excel (.xlsx)
              </p>
            </div>
            <Button variant="outline" onClick={() => handleDownloadTemplate()}>
              <Download className="w-4 h-4 mr-2" /> Baixar Modelo de Planilha
            </Button>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsImportOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              toast({
                title: "Upload concluído",
                description: "A importação de clientes foi concluída com sucesso."
              });
              setIsImportOpen(false);
            }}>
              Importar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para enriquecimento de cadastro */}
      <Dialog open={isEnrichOpen} onOpenChange={setIsEnrichOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enriquecer Cadastros</DialogTitle>
            <DialogDescription>
              Adicione dados faltantes aos seus clientes através de nossa API de enriquecimento.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Clientes sem telefone</span>
              </div>
              <Badge variant="secondary">{clientsWithoutPhone}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              O processo de enriquecimento utilizará o CPF dos clientes para buscar os telefones faltantes através de nossa API parceira.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEnrichOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEnrichClientsData} disabled={clientsWithoutPhone === 0}>
              Enriquecer {clientsWithoutPhone} cadastros
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para detalhes do cliente */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Cliente</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Nome</p>
                  <p className="text-sm">{selectedClient.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">CPF</p>
                  <p className="text-sm">{selectedClient.cpf}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Telefone</p>
                  <p className="text-sm">{selectedClient.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">E-mail</p>
                  <p className="text-sm">{selectedClient.email || "-"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Últimos Pedidos</p>
                {selectedClient.orderCount > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Dados simulados de pedidos */}
                        <TableRow>
                          <TableCell>{selectedClient.lastOrderDate}</TableCell>
                          <TableCell>
                            {(selectedClient.totalSpent / selectedClient.orderCount).toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            })}
                          </TableCell>
                          <TableCell><Badge>Entregue</Badge></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Cliente ainda não realizou pedidos.</p>
                )}
              </div>
            </div>
          )}
          <div className="flex justify-between">
            <Button 
              variant="destructive"
              onClick={() => {
                setIsDetailsOpen(false);
                setIsDeleteOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" /> Excluir Cliente
            </Button>
            <Button onClick={() => setIsDetailsOpen(false)}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmação de exclusão */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Cliente</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o cliente
              {selectedClient ? ` ${selectedClient.name}` : ''} e todos os dados associados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteClient}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UsuariosPage;
