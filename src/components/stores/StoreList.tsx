
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
  return (
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
          {mockStores.map((store) => (
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
                <Button variant="ghost" size="sm">
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StoreList;
