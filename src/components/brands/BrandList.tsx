
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
import { Brand } from "@/types/brand";

const mockBrands: Brand[] = [
  {
    id: "1",
    name: "Marca Exemplo",
    taxId: "00.000.000/0001-00",
    status: "Ativa",
    economicGroupId: "1",
    description: "Uma marca de exemplo",
  },
];

const BrandList = () => {
  return (
    <div className="relative w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockBrands.map((brand) => (
            <TableRow key={brand.id}>
              <TableCell>{brand.name}</TableCell>
              <TableCell>{brand.taxId}</TableCell>
              <TableCell>{brand.description}</TableCell>
              <TableCell>
                <Badge 
                  variant={brand.status === "Ativa" ? "default" : "secondary"}
                >
                  {brand.status}
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

export default BrandList;
