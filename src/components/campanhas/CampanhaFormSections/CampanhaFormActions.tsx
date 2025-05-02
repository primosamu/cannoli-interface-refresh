
import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CampanhaFormActionsProps {
  isSaving: boolean;
  isScheduled: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const CampanhaFormActions: React.FC<CampanhaFormActionsProps> = ({
  isSaving,
  isScheduled,
  onCancel,
  onSubmit
}) => {
  return (
    <DialogFooter className="px-6 py-4 border-t">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
      <Button 
        onClick={onSubmit} 
        disabled={isSaving}
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Salvando...
          </>
        ) : (
          isScheduled ? "Agendar Campanha" : "Criar Campanha"
        )}
      </Button>
    </DialogFooter>
  );
};

export default CampanhaFormActions;
