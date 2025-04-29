
import React from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const AudienceSegmentationInfo = () => {
  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <h4 className="font-medium mb-2 flex items-center gap-2">
        <Users className="h-5 w-5" />
        Segmentação de público
      </h4>
      <p className="text-sm text-muted-foreground">
        Segmente seus clientes por comportamento, região, valor de compra, frequência e muito mais para 
        criar campanhas direcionadas e relevantes.
      </p>
      <Button variant="link" className="p-0 h-auto mt-2">
        Saiba mais sobre segmentação
      </Button>
    </div>
  );
};

export default AudienceSegmentationInfo;
