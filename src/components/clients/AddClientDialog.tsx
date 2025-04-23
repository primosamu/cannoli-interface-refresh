
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AddClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddClientDialog = ({ open, onOpenChange }: AddClientDialogProps) => {
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Cliente adicionado",
      description: "O novo cliente foi adicionado com sucesso."
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientDialog;
