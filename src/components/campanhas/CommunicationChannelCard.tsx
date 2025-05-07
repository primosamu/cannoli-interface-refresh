
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { MessageSquare, Mail, Phone } from "lucide-react";

export interface QuickActionLink {
  label: string;
  onClick: () => void;
}

export interface CommunicationChannelCardProps {
  icon: string;
  title: string;
  description: string;
  onChannelSelect: () => void;
  quickActionLinks: QuickActionLink[];
}

const CommunicationChannelCard: React.FC<CommunicationChannelCardProps> = ({
  icon,
  title,
  description,
  onChannelSelect,
  quickActionLinks
}) => {
  const renderIcon = () => {
    switch (icon) {
      case "whatsapp":
        return <MessageSquare className="h-6 w-6 text-green-600" />;
      case "email":
        return <Mail className="h-6 w-6 text-purple-600" />;
      case "sms":
        return <Phone className="h-6 w-6 text-blue-600" />;
      default:
        return null;
    }
  };

  const getGradientClass = () => {
    switch (icon) {
      case "whatsapp":
        return 'bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100';
      case "email":
        return 'bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100';
      case "sms":
        return 'bg-gradient-to-r from-blue-50 to-sky-50 hover:from-blue-100 hover:to-sky-100';
      default:
        return 'bg-gradient-to-r from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100';
    }
  };

  return (
    <Card className={`border-none shadow-sm ${getGradientClass()} transition-all`}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header with icon and title */}
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={onChannelSelect}
          >
            <div className="flex items-center gap-3">
              <div className={`rounded-full p-2 ${
                icon === 'whatsapp' ? 'bg-green-100' :
                icon === 'email' ? 'bg-purple-100' : 'bg-blue-100'
              }`}>
                {renderIcon()}
              </div>
              <div>
                <h3 className="font-medium text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
          
          {/* Quick action links */}
          {quickActionLinks && quickActionLinks.length > 0 && (
            <div className="border-t pt-3 mt-3">
              <p className="text-xs text-muted-foreground mb-2">Ações rápidas</p>
              <div className="space-y-1">
                {quickActionLinks.map((link, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-sm px-2 hover:bg-white/50"
                    onClick={link.onClick}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationChannelCard;
