
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight } from "lucide-react";

interface Metric {
  name: string;
  value: number;
  color: string;
}

interface CampaignReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  metrics: Metric[];
}

export function CampaignReportCard({ title, description, icon, metrics }: CampaignReportCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="bg-slate-100 p-2 rounded-full">
            {icon}
          </div>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>{metric.name}</span>
                <span className="font-medium">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className={`h-2 ${metric.color}`} />
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full text-sm" size="sm">
          <span>Ver relatório detalhado</span>
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
