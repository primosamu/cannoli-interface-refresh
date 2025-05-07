
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface CreateCampaignButtonProps {
  onClick: () => void;
}

const CreateCampaignButton: React.FC<CreateCampaignButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center my-8">
      <Button 
        size="lg"
        className="flex items-center gap-2 px-8 shadow-md"
        onClick={onClick}
      >
        <PlusCircle className="h-5 w-5" />
        Criar Nova Campanha
      </Button>
    </div>
  );
};

export default CreateCampaignButton;
