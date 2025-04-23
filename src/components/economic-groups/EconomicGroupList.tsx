
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
import { EconomicGroup } from "@/types/economic-group";
import { EconomicGroupFormDialog } from "./EconomicGroupFormDialog";
import { toast } from "sonner";

const mockGroups: EconomicGroup[] = [
  {
    id: "1",
    name: "Grupo Exemplo",
    taxId: "00.000.000/0001-00",
    status: "Ativo",
  },
];

const EconomicGroupList = () => {
  const [groups, setGroups] = useState<EconomicGroup[]>(mockGroups);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<EconomicGroup | undefined>(undefined);
  
  const handleCreateOrUpdate = (group: Partial<EconomicGroup>) => {
    if (group.id) {
      // Update existing group
      setGroups(prevGroups => 
        prevGroups.map(g => g.id === group.id ? { ...g, ...group } as EconomicGroup : g)
      );
    } else {
      // Create new group
      const newGroup = {
        ...group,
        id: `${groups.length + 1}`, // mock ID generation
      } as EconomicGroup;
      
      setGroups(prevGroups => [...prevGroups, newGroup]);
    }
  };

  const handleEdit = (group: EconomicGroup) => {
    setCurrentGroup(group);
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
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
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
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(group)}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <EconomicGroupFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreateOrUpdate}
        economicGroup={currentGroup}
      />
    </>
  );
};

export default EconomicGroupList;
