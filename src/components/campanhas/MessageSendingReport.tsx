
import React, { useState } from "react";
import { Calendar, BarChart2, Eye, Send, MessageSquare, Mail, Phone, Filter, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getRecentCampaigns } from "./CampanhaForm";
import { Campaign } from "@/types/campaign";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MessageSendingReport = () => {
  const campaigns = getRecentCampaigns();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("30days");
  
  // Filter campaigns by type
  const filteredCampaigns = React.useMemo(() => {
    if (activeTab === "all") return campaigns;
    return campaigns.filter(campaign => campaign.channel === activeTab);
  }, [campaigns, activeTab]);
  
  // Generate aggregated statistics for filtered campaigns
  const stats = React.useMemo(() => {
    if (!filteredCampaigns.length) return null;
    
    const totalMessages = filteredCampaigns.reduce((sum, campaign) => sum + campaign.segment.customerCount, 0);
    const activeCampaigns = filteredCampaigns.filter(c => c.status === "active" || c.status === "completed").length;
    
    // Create channel distribution
    const channelDistribution = filteredCampaigns.reduce((acc: Record<string, number>, campaign) => {
      const channel = campaign.channel;
      acc[channel] = (acc[channel] || 0) + 1;
      return acc;
    }, {});
    
    // Generate overall delivery and engagement stats
    let totalSent = 0;
    let totalDelivered = 0;
    let totalOpened = 0;
    let totalEngaged = 0;
    
    filteredCampaigns.forEach(campaign => {
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
  }, [filteredCampaigns]);
  
  if (!campaigns.length) {
    return null;
  }

  // Get channel-specific terminology
  const getChannelTerminology = (channel: string) => {
    switch(channel) {
      case "whatsapp":
        return {
          deliveredTerm: "Recebidos",
          openedTerm: "Visualizados",
          engagedTerm: "Respondidos",
        };
      case "email":
        return {
          deliveredTerm: "Entregues",
          openedTerm: "Abertos",
          engagedTerm: "Clicados",
        };
      case "sms":
        return {
          deliveredTerm: "Entregues",
          openedTerm: "Recebidos",
          engagedTerm: "Respondidos",
        };
      default:
        return {
          deliveredTerm: "Entregues",
          openedTerm: "Abertos/Visualizados",
          engagedTerm: "Engajamentos",
        };
    }
  };
  
  const terminology = getChannelTerminology(activeTab);
  
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <CardTitle className="text-xl">Relatório de Envios</CardTitle>
          <CardDescription>
            Visão geral sobre envios e desempenho das suas campanhas de mensageria
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Últimos 7 dias</SelectItem>
              <SelectItem value="15days">Últimos 15 dias</SelectItem>
              <SelectItem value="30days">Últimos 30 dias</SelectItem>
              <SelectItem value="90days">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className={isMobile ? "w-full grid grid-cols-4" : ""}>
            <TabsTrigger value="all" className={isMobile ? "text-xs" : ""}>Todos</TabsTrigger>
            <TabsTrigger value="whatsapp" className={isMobile ? "text-xs" : ""}>WhatsApp</TabsTrigger>
            <TabsTrigger value="email" className={isMobile ? "text-xs" : ""}>Email</TabsTrigger>
            <TabsTrigger value="sms" className={isMobile ? "text-xs" : ""}>SMS</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="space-y-6 mt-4">
          {stats && (
            <TabsContent value={activeTab}>
              {/* Overall Stats */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
                    Em {filteredCampaigns.length} campanhas {activeTab !== "all" ? `de ${activeTab}` : ""}
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
                      `${((stats.activeCampaigns / filteredCampaigns.length) * 100).toFixed(0)}% das campanhas` :
                      "Nenhuma campanha ativa"
                    }
                  </p>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4 border">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Taxa de {activeTab === "whatsapp" ? "visualização" : activeTab === "email" ? "abertura" : "recebimento"}</p>
                      <h4 className="text-2xl font-semibold mt-1">{stats.openRate}%</h4>
                    </div>
                    <div className="bg-blue-500/10 p-2 rounded-full">
                      <Eye className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {stats.totalOpened} {terminology.openedTerm} de {stats.totalDelivered} {terminology.deliveredTerm}
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
                    {stats.totalEngaged} {terminology.engagedTerm} de {stats.totalOpened} {terminology.openedTerm}
                  </p>
                </div>
              </div>
              
              {/* Delivery Funnel with Channel-specific terminology */}
              <div className="bg-slate-50 rounded-lg p-6 border">
                <h4 className="font-medium mb-4">Funil de entrega {activeTab !== "all" ? `- ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` : ""}</h4>
                
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
                      <span>{terminology.deliveredTerm}</span>
                      <span className="font-medium">{stats.totalDelivered} / {stats.totalSent}</span>
                    </div>
                    <Progress value={(stats.totalDelivered / stats.totalSent) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {stats.deliveryRate}% das mensagens enviadas foram {terminology.deliveredTerm.toLowerCase()}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{terminology.openedTerm}</span>
                      <span className="font-medium">{stats.totalOpened} / {stats.totalDelivered}</span>
                    </div>
                    <Progress value={(stats.totalOpened / stats.totalDelivered) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {stats.openRate}% das mensagens {terminology.deliveredTerm.toLowerCase()} foram {terminology.openedTerm.toLowerCase()}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{terminology.engagedTerm}</span>
                      <span className="font-medium">{stats.totalEngaged} / {stats.totalOpened}</span>
                    </div>
                    <Progress value={(stats.totalEngaged / stats.totalOpened) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {stats.engagementRate}% das mensagens {terminology.openedTerm.toLowerCase()} geraram {terminology.engagedTerm.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Channel Distribution - Only show in "All" tab */}
              {activeTab === "all" && (
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
                              {count} campanh{count === 1 ? 'a' : 'as'} ({((count / filteredCampaigns.length) * 100).toFixed(0)}%)
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Channel-specific metrics */}
              {activeTab === "whatsapp" && (
                <div className="bg-slate-50 rounded-lg p-6 border">
                  <h4 className="font-medium mb-4">Métricas específicas de WhatsApp</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-md border">
                      <h5 className="font-medium text-sm">Mensagens bloqueadas</h5>
                      <p className="text-2xl font-semibold mt-1">{Math.round(stats.totalSent * 0.03)}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(3).toFixed(1)}% das mensagens enviadas
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-md border">
                      <h5 className="font-medium text-sm">Templates reprovados</h5>
                      <p className="text-2xl font-semibold mt-1">{Math.round(filteredCampaigns.length * 0.1)}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Em revisão pela Meta
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-md border">
                      <h5 className="font-medium text-sm">Tempo médio de resposta</h5>
                      <p className="text-2xl font-semibold mt-1">3.2h</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Para mensagens respondidas
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "email" && (
                <div className="bg-slate-50 rounded-lg p-6 border">
                  <h4 className="font-medium mb-4">Métricas específicas de Email</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-md border">
                      <h5 className="font-medium text-sm">Taxa de rejeição</h5>
                      <p className="text-2xl font-semibold mt-1">{(8.2).toFixed(1)}%</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Emails que não puderam ser entregues
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-md border">
                      <h5 className="font-medium text-sm">Taxa de cliques</h5>
                      <p className="text-2xl font-semibold mt-1">{(12.7).toFixed(1)}%</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Dos emails abertos
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-md border">
                      <h5 className="font-medium text-sm">Cancelamentos</h5>
                      <p className="text-2xl font-semibold mt-1">{Math.round(stats.totalSent * 0.015)}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Solicitações de cancelamento
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "sms" && (
                <div className="bg-slate-50 rounded-lg p-6 border">
                  <h4 className="font-medium mb-4">Métricas específicas de SMS</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-md border">
                      <h5 className="font-medium text-sm">Taxa de entrega</h5>
                      <p className="text-2xl font-semibold mt-1">{(94.5).toFixed(1)}%</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        SMS entregues com sucesso
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-md border">
                      <h5 className="font-medium text-sm">Falhas de entrega</h5>
                      <p className="text-2xl font-semibold mt-1">{Math.round(stats.totalSent * 0.055)}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Por número inválido ou erro na operadora
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-md border">
                      <h5 className="font-medium text-sm">Taxa de resposta</h5>
                      <p className="text-2xl font-semibold mt-1">5.8%</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        SMS com resposta do cliente
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-md border">
                      <h5 className="font-medium text-sm">Tempo médio de entrega</h5>
                      <p className="text-2xl font-semibold mt-1">8.3s</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Do envio até o recebimento
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-md border">
                      <h5 className="font-medium text-sm">Detalhamento de operadoras</h5>
                      <p className="text-2xl font-semibold mt-1">4</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Principais operadoras utilizadas
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-md border">
                      <h5 className="font-medium text-sm">Status DND</h5>
                      <p className="text-2xl font-semibold mt-1">{Math.round(stats.totalSent * 0.025)}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Contatos em lista de não perturbe
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-md border">
                      <h5 className="font-medium text-sm">Taxa de conversão</h5>
                      <p className="text-2xl font-semibold mt-1">3.4%</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Resultaram em conversão de vendas
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-md border">
                      <h5 className="font-medium text-sm">Custo por SMS</h5>
                      <p className="text-2xl font-semibold mt-1">R$ 0.08</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Valor médio por mensagem
                      </p>
                    </div>
                  </div>
                  
                  {/* SMS Delivery Time Chart */}
                  <div className="mt-6">
                    <h5 className="font-medium text-sm mb-4">Desempenho de entrega por operadora</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-md border col-span-1">
                        <h6 className="text-sm font-medium">Operadoras</h6>
                        <div className="space-y-3 mt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Vivo</span>
                            <span className="text-sm font-medium">42%</span>
                          </div>
                          <Progress value={42} className="h-1.5" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Claro</span>
                            <span className="text-sm font-medium">28%</span>
                          </div>
                          <Progress value={28} className="h-1.5" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm">TIM</span>
                            <span className="text-sm font-medium">23%</span>
                          </div>
                          <Progress value={23} className="h-1.5" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Oi</span>
                            <span className="text-sm font-medium">7%</span>
                          </div>
                          <Progress value={7} className="h-1.5" />
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md border col-span-1">
                        <h6 className="text-sm font-medium">Taxa de entrega</h6>
                        <div className="space-y-3 mt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Vivo</span>
                            <span className="text-sm font-medium">96.8%</span>
                          </div>
                          <Progress value={96.8} className="h-1.5" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Claro</span>
                            <span className="text-sm font-medium">95.2%</span>
                          </div>
                          <Progress value={95.2} className="h-1.5" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm">TIM</span>
                            <span className="text-sm font-medium">93.7%</span>
                          </div>
                          <Progress value={93.7} className="h-1.5" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Oi</span>
                            <span className="text-sm font-medium">91.4%</span>
                          </div>
                          <Progress value={91.4} className="h-1.5" />
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md border col-span-1 sm:col-span-2">
                        <h6 className="text-sm font-medium">Status das mensagens</h6>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="text-sm font-medium">Entregues</p>
                              <p className="text-xs text-muted-foreground">94.5%</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            <div>
                              <p className="text-sm font-medium">Falhas</p>
                              <p className="text-xs text-muted-foreground">5.5%</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-amber-500" />
                            <div>
                              <p className="text-sm font-medium">Atrasos</p>
                              <p className="text-xs text-muted-foreground">2.3%</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Phone className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">Respostas</p>
                              <p className="text-xs text-muted-foreground">5.8%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Call to action */}
              <div className="flex justify-center pt-4">
                <Button>
                  Ver relatório detalhado
                </Button>
              </div>
            </TabsContent>
          )}
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default MessageSendingReport;

