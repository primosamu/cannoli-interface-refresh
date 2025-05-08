import { CampaignTriggerType } from "@/types/campaign";

interface PredefinedCampaign {
  id: string;
  title: string;
  description: string;
  badge: string;
  isActive?: boolean;
  triggerType: CampaignTriggerType;
  triggerConfig?: {
    inactivityDays?: number;
    purchaseCount?: number;
  };
}

interface PredefinedCampaignGroups {
  recuperacao: PredefinedCampaign[];
  fidelizacao: PredefinedCampaign[];
  padroesConsumo: PredefinedCampaign[];
  migracaoCanal: PredefinedCampaign[];
}

export const predefinedCampaigns: PredefinedCampaignGroups = {
  recuperacao: [
    { 
      id: "sentimos-sua-falta",
      title: "Sentimos sua falta", 
      description: "Recupera clientes que não pedem há X dias",
      badge: "Reativação",
      isActive: false,
      triggerType: "client_inactivity",
      triggerConfig: {
        inactivityDays: 30
      }
    },
    { 
      id: "volte-para-nos",
      title: "Volte para nós", 
      description: "Enviada 7 dias após a campanha 'Sentimos sua falta'",
      badge: "Reativação",
      isActive: false,
      triggerType: "client_inactivity",
      triggerConfig: {
        inactivityDays: 37
      }
    },
    { 
      id: "nos-de-outra-chance",
      title: "Nos dê outra chance", 
      description: "Enviada 15 dias após a campanha inicial",
      badge: "Reativação",
      isActive: false,
      triggerType: "client_inactivity",
      triggerConfig: {
        inactivityDays: 45
      }
    },
    { 
      id: "ultima-chance",
      title: "Última chance", 
      description: "Enviada 30 dias após a campanha inicial",
      badge: "Reativação", 
      isActive: false,
      triggerType: "client_inactivity",
      triggerConfig: {
        inactivityDays: 60
      }
    }
  ],
  fidelizacao: [
    { 
      id: "primeiro-pedido",
      title: "Obrigado pelo primeiro pedido", 
      description: "Para clientes que realizaram o primeiro pedido",
      badge: "Primeiros Passos",
      isActive: false,
      triggerType: "first_purchase"
    },
    { 
      id: "segundo-pedido",
      title: "Recompensa pelo segundo pedido", 
      description: "Para clientes que realizaram o segundo pedido",
      badge: "Engajamento",
      isActive: false,
      triggerType: "repeat_purchase",
      triggerConfig: {
        purchaseCount: 2
      }
    },
    { 
      id: "cliente-vip",
      title: "Cliente VIP", 
      description: "Para clientes que realizaram o terceiro pedido",
      badge: "Fidelidade",
      isActive: false,
      triggerType: "repeat_purchase",
      triggerConfig: {
        purchaseCount: 3
      }
    },
    { 
      id: "clube-clientes",
      title: "Clube de clientes frequentes", 
      description: "Para clientes que realizaram 5 ou mais pedidos",
      badge: "VIP",
      isActive: false,
      triggerType: "repeat_purchase",
      triggerConfig: {
        purchaseCount: 5
      }
    }
  ],
  padroesConsumo: [
    { 
      id: "experimente-jantar",
      title: "Experimente nosso jantar", 
      description: "Para clientes que só almoçam",
      badge: "Cross-selling",
      isActive: false,
      triggerType: "manual"
    },
    { 
      id: "experimente-almoco",
      title: "Experimente nosso almoço", 
      description: "Para clientes que só jantam",
      badge: "Cross-selling",
      isActive: false,
      triggerType: "manual"
    },
    { 
      id: "menu-fds",
      title: "Menu especial de final de semana", 
      description: "Para clientes que só frequentam em dias da semana",
      badge: "Cross-selling",
      isActive: false,
      triggerType: "manual"
    },
    { 
      id: "promo-semana",
      title: "Promoções dos dias da semana", 
      description: "Para clientes que só frequentam nos finais de semana",
      badge: "Cross-selling",
      isActive: false,
      triggerType: "manual"
    },
    { 
      id: "visite-restaurante",
      title: "Visite nosso restaurante", 
      description: "Para clientes que só pedem no delivery",
      badge: "Cross-selling",
      isActive: false,
      triggerType: "manual"
    },
    { 
      id: "experimente-delivery",
      title: "Experimente nosso delivery", 
      description: "Para clientes que só vão à loja física",
      badge: "Cross-selling",
      isActive: false,
      triggerType: "manual"
    }
  ],
  migracaoCanal: [
    { 
      id: "mude-app",
      title: "Mude para nosso app", 
      description: "Para clientes que só pedem por marketplaces como iFood",
      badge: "Migração",
      isActive: false,
      triggerType: "manual"
    },
    { 
      id: "peca-whatsapp",
      title: "Peça pelo nosso WhatsApp", 
      description: "Para clientes de marketplaces",
      badge: "Migração",
      isActive: false,
      triggerType: "manual"
    }
  ]
};

export const restaurantCampaigns = {
  promocoesSemanais: [
    { 
      id: "terca-da-pizza",
      title: "Terça da Pizza", 
      description: "Promoção especial de pizzas toda terça-feira",
      badge: "Recorrente",
      isActive: false,
      triggerType: "time_based",
      triggerConfig: {
        weekday: 2 // Tuesday (0 = Sunday, 1 = Monday, etc.)
      }
    },
    { 
      id: "quinta-do-hamburguer",
      title: "Quinta do Hambúrguer", 
      description: "Descontos em hambúrgueres selecionados às quintas",
      badge: "Recorrente",
      isActive: false,
      triggerType: "time_based",
      triggerConfig: {
        weekday: 4 // Thursday
      }
    },
    { 
      id: "sabado-feijoada",
      title: "Sábado da Feijoada", 
      description: "Feijoada completa com preço especial aos sábados",
      badge: "Recorrente",
      isActive: false,
      triggerType: "time_based",
      triggerConfig: {
        weekday: 6 // Saturday
      }
    },
    { 
      id: "domingo-familia",
      title: "Domingo em Família", 
      description: "Descontos para refeições em grupo aos domingos",
      badge: "Recorrente", 
      isActive: false,
      triggerType: "time_based",
      triggerConfig: {
        weekday: 0 // Sunday
      }
    }
  ],
  // ... keep existing code (for other campaign groups)
};
