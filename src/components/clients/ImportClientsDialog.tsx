
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImportClientsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownloadTemplate: () => void;
}

const ImportClientsDialog = ({ open, onOpenChange, onDownloadTemplate }: ImportClientsDialogProps) => {
  const { toast } = useToast();

  const handleImport = () => {
    toast({
      title: "Upload concluído",
      description: "A importação de clientes foi concluída com sucesso."
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={onDownloadTemplate}>
            <Download className="w-4 h-4 mr-2" /> Baixar Modelo de Planilha
          </Button>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleImport}>
            Importar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportClientsDialog;
