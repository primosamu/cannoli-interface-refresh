
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdPlatform, CampaignTemplate } from "@/types/campaign";
import { Facebook, Globe, Target, ArrowRight } from "lucide-react";

interface CampaignTemplateCardProps {
  template: CampaignTemplate;
  onSelect: () => void;
}

export function CampaignTemplateCard({ template, onSelect }: CampaignTemplateCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer border-t-2 border-t-purple-400" onClick={onSelect}>
      <div className="aspect-[5/2] bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            {template.platforms.map((platform) => (
              <PlatformIcon key={platform} platform={platform} />
            ))}
          </div>
          <h3 className="font-medium text-sm">{template.name}</h3>
        </div>
      </div>
      
      <CardContent className="p-3">
        <p className="text-xs text-muted-foreground mb-3">{template.description}</p>
        
        <Button size="sm" variant="ghost" className="w-full justify-between text-xs font-normal">
          Usar este modelo
          <ArrowRight className="h-3 w-3 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

interface PlatformIconProps {
  platform: AdPlatform;
  size?: number;
}

export function PlatformIcon({ platform, size = 16 }: PlatformIconProps) {
  switch (platform) {
    case "meta":
      return (
        <div className="bg-blue-100 p-1 rounded-full">
          <Facebook className="text-blue-600" style={{ width: size, height: size }} />
        </div>
      );
    case "google":
      return (
        <div className="bg-red-100 p-1 rounded-full">
          <Globe className="text-red-600" style={{ width: size, height: size }} />
        </div>
      );
    case "tiktok":
      return (
        <div className="bg-slate-100 p-1 rounded-full">
          <Target className="text-black" style={{ width: size, height: size }} />
        </div>
      );
    default:
      return null;
  }
}
