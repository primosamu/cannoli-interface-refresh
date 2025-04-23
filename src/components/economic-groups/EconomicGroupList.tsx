
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";  // Added this import
import { EconomicGroup } from "@/types/economic-group";

const mockGroups: EconomicGroup[] = [
  {
    id: "1",
    name: "Grupo Exemplo",
    taxId: "00.000.000/0001-00",
    status: "Ativo",
  },
];

const EconomicGroupList = () => {
  return (
    <div className="relative w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockGroups.map((group) => (
            <TableRow key={group.id}>
              <TableCell>{group.name}</TableCell>
              <TableCell>{group.taxId}</TableCell>
              <TableCell>
                <Badge 
                  variant={group.status === "Ativo" ? "default" : "secondary"}
                >
                  {group.status}
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

export default EconomicGroupList;
