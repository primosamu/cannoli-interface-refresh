
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Store } from "@/types/store";
import { StoreFormDialog } from "./StoreFormDialog";
import { toast } from "sonner";

const mockStores: Store[] = [
  {
    id: "1",
    name: "Loja Exemplo",
    taxId: "00.000.000/0001-00",
    locations: "Rua Exemplo, 123",
    status: "Ativa",
    brandId: "1",
    economicGroupId: "1",
  },
];

const StoreList = () => {
  const [stores, setStores] = useState<Store[]>(mockStores);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState<Store | undefined>(undefined);
  
  const handleCreateOrUpdate = (store: Partial<Store>) => {
    if (store.id) {
      // Update existing store
      setStores(prevStores => 
        prevStores.map(s => s.id === store.id ? { ...s, ...store } as Store : s)
      );
    } else {
      // Create new store
      const newStore = {
        ...store,
        id: `${stores.length + 1}`, // mock ID generation
      } as Store;
      
      setStores(prevStores => [...prevStores, newStore]);
    }
  };

  const handleEdit = (store: Store) => {
    setCurrentStore(store);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stores.map((store) => (
              <TableRow key={store.id}>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.taxId}</TableCell>
                <TableCell>{store.locations}</TableCell>
                <TableCell>
                  <Badge 
                    variant={store.status === "Ativa" ? "default" : "secondary"}
                  >
                    {store.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(store)}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <StoreFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreateOrUpdate}
        store={currentStore}
      />
    </>
  );
};

export default StoreList;
