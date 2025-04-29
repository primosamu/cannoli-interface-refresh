
import React from "react";
import { Calendar, BarChart2, Eye, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getRecentCampaigns } from "./CampanhaForm";
import { Campaign } from "@/types/campaign";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const MessageSendingReport = () => {
  const campaigns = getRecentCampaigns();
  
  // Generate aggregated statistics for all campaigns
  const stats = React.useMemo(() => {
    if (!campaigns.length) return null;
    
    const totalMessages = campaigns.reduce((sum, campaign) => sum + campaign.segment.customerCount, 0);
    const activeCampaigns = campaigns.filter(c => c.status === "active" || c.status === "completed").length;
    
    // Create channel distribution
    const channelDistribution = campaigns.reduce((acc: Record<string, number>, campaign) => {
      const channel = campaign.channel;
      acc[channel] = (acc[channel] || 0) + 1;
      return acc;
    }, {});
    
    // Generate overall delivery and engagement stats
    let totalSent = 0;
    let totalDelivered = 0;
    let totalOpened = 0;
    let totalEngaged = 0;
    
    campaigns.forEach(campaign => {
      // Use deterministic randomness based on campaign id
      const idSum = campaign.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const seed = idSum / 1000;
      
      const customerCount = campaign.segment.customerCount;
      const sent = Math.floor(customerCount * (0.95 + seed * 0.05));
      const delivered = Math.floor(sent * (0.85 + seed * 0.1));
      const opened = Math.floor(delivered * (0.4 + seed * 0.3));
      const engaged = Math.floor(opened * (0.2 + seed * 0.4));
      
      totalSent += sent;
      totalDelivered += delivered;
      totalOpened += opened;
      totalEngaged += engaged;
    });
    
    return {
      totalMessages,
      activeCampaigns,
      channelDistribution,
      totalSent,
      totalDelivered,
      totalOpened,
      totalEngaged,
      deliveryRate: totalSent > 0 ? (totalDelivered / totalSent * 100).toFixed(1) : "0",
      openRate: totalDelivered > 0 ? (totalOpened / totalDelivered * 100).toFixed(1) : "0",
      engagementRate: totalOpened > 0 ? (totalEngaged / totalOpened * 100).toFixed(1) : "0"
    };
  }, [campaigns]);
  
  if (!campaigns.length) {
    return null;
  }
  
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl">Relatório de Envios</CardTitle>
        <CardDescription>
          Visão geral sobre envios e desempenho das suas campanhas de mensageria
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {stats && (
          <>
            {/* Overall Stats */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="bg-slate-50 rounded-lg p-4 border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total de mensagens</p>
                    <h4 className="text-2xl font-semibold mt-1">{stats.totalMessages}</h4>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Em {campaigns.length} campanhas
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Campanhas ativas</p>
                    <h4 className="text-2xl font-semibold mt-1">{stats.activeCampaigns}</h4>
                  </div>
                  <div className="bg-green-500/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {stats.activeCampaigns > 0 ? 
                    `${((stats.activeCampaigns / campaigns.length) * 100).toFixed(0)}% das campanhas` :
                    "Nenhuma campanha ativa"
                  }
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Taxa de abertura média</p>
                    <h4 className="text-2xl font-semibold mt-1">{stats.openRate}%</h4>
                  </div>
                  <div className="bg-blue-500/10 p-2 rounded-full">
                    <Eye className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {stats.totalOpened} aberturas de {stats.totalDelivered} entregas
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Taxa de engajamento</p>
                    <h4 className="text-2xl font-semibold mt-1">{stats.engagementRate}%</h4>
                  </div>
                  <div className="bg-purple-500/10 p-2 rounded-full">
                    <BarChart2 className="h-5 w-5 text-purple-500" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {stats.totalEngaged} engajamentos de {stats.totalOpened} aberturas
                </p>
              </div>
            </div>
            
            {/* Delivery Funnel */}
            <div className="bg-slate-50 rounded-lg p-6 border">
              <h4 className="font-medium mb-4">Funil de entrega</h4>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Envios</span>
                    <span className="font-medium">{stats.totalSent} / {stats.totalMessages}</span>
                  </div>
                  <Progress value={(stats.totalSent / stats.totalMessages) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {((stats.totalSent / stats.totalMessages) * 100).toFixed(1)}% das mensagens planejadas foram enviadas
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Entregas</span>
                    <span className="font-medium">{stats.totalDelivered} / {stats.totalSent}</span>
                  </div>
                  <Progress value={(stats.totalDelivered / stats.totalSent) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {stats.deliveryRate}% das mensagens enviadas foram entregues
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Aberturas</span>
                    <span className="font-medium">{stats.totalOpened} / {stats.totalDelivered}</span>
                  </div>
                  <Progress value={(stats.totalOpened / stats.totalDelivered) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {stats.openRate}% das mensagens entregues foram abertas
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Engajamentos</span>
                    <span className="font-medium">{stats.totalEngaged} / {stats.totalOpened}</span>
                  </div>
                  <Progress value={(stats.totalEngaged / stats.totalOpened) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {stats.engagementRate}% das mensagens abertas geraram engajamento
                  </p>
                </div>
              </div>
            </div>
            
            {/* Channel Distribution */}
            <div className="bg-slate-50 rounded-lg p-6 border">
              <h4 className="font-medium mb-4">Distribuição por canal</h4>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {Object.entries(stats.channelDistribution).map(([channel, count]) => (
                  <div key={channel} className="bg-white p-4 rounded-md border">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        channel === 'whatsapp' ? 'bg-green-100' : 
                        channel === 'email' ? 'bg-purple-100' : 'bg-blue-100'
                      }`}>
                        {channel === 'whatsapp' && <MessageSquare className="h-4 w-4 text-green-600" />}
                        {channel === 'email' && <Mail className="h-4 w-4 text-purple-600" />}
                        {channel === 'sms' && <Phone className="h-4 w-4 text-blue-600" />}
                      </div>
                      <div>
                        <h5 className="font-medium capitalize">{channel}</h5>
                        <p className="text-sm text-muted-foreground">
                          {count} campanh{count === 1 ? 'a' : 'as'} ({((count / campaigns.length) * 100).toFixed(0)}%)
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Call to action */}
            <div className="flex justify-center pt-4">
              <Button>
                Ver relatório detalhado
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MessageSendingReport;
