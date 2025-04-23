
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
import { Brand } from "@/types/brand";
import { BrandFormDialog } from "./BrandFormDialog";
import { toast } from "sonner";

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
  const [brands, setBrands] = useState<Brand[]>(mockBrands);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<Brand | undefined>(undefined);
  
  const handleCreateOrUpdate = (brand: Partial<Brand>) => {
    if (brand.id) {
      // Update existing brand
      setBrands(prevBrands => 
        prevBrands.map(b => b.id === brand.id ? { ...b, ...brand } as Brand : b)
      );
    } else {
      // Create new brand
      const newBrand = {
        ...brand,
        id: `${brands.length + 1}`, // mock ID generation
      } as Brand;
      
      setBrands(prevBrands => [...prevBrands, newBrand]);
    }
  };

  const handleEdit = (brand: Brand) => {
    setCurrentBrand(brand);
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
              <TableHead>Descrição</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.map((brand) => (
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
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(brand)}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <BrandFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreateOrUpdate}
        brand={currentBrand}
      />
    </>
  );
};

export default BrandList;
