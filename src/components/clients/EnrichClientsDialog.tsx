
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface EnrichClientsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EnrichClientsDialog = ({ open, onOpenChange }: EnrichClientsDialogProps) => {
  const { toast } = useToast();
  const clientsWithoutPhone: number = 5; // Explicitly typed as number

  const handleEnrichClientsData = () => {
    toast({
      title: "Enriquecimento iniciado",
      description: `Iniciado o processo de enriquecimento de ${clientsWithoutPhone} clientes.`
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleEnrichClientsData} disabled={clientsWithoutPhone === 0}>
            Enriquecer {clientsWithoutPhone} cadastros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnrichClientsDialog;
