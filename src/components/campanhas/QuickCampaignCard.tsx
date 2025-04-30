
import React from "react";
import { Card } from "@/components/ui/card";

interface QuickCampaignCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const QuickCampaignCard = ({ 
  title, 
  description, 
  icon, 
  onClick 
}: QuickCampaignCardProps) => {
  return (
    <Card 
      className="p-4 cursor-pointer hover:bg-slate-50 transition-colors border-slate-200"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="bg-slate-100 p-2 rounded-full flex-shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default QuickCampaignCard;
