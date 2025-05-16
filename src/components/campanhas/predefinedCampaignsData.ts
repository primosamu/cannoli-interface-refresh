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
  // Adding the missing campaign groups
  oneTime: PredefinedCampaign[];
  contextual: PredefinedCampaign[];
}

// Original predefined campaigns data - keep for backward compatibility
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
  ],
  // Add the missing campaign groups needed by CampanhasPage.tsx
  oneTime: [
    { 
      id: "aniversario-cliente",
      title: "Aniversário do Cliente", 
      description: "Enviada no aniversário do cliente",
      badge: "Especial",
      isActive: false,
      triggerType: "birthday"
    },
    { 
      id: "boas-vindas",
      title: "Boas Vindas", 
      description: "Para novos clientes cadastrados",
      badge: "Onboarding",
      isActive: false,
      triggerType: "manual"
    },
  ],
  contextual: [
    { 
      id: "carrinho-abandonado",
      title: "Carrinho Abandonado", 
      description: "Recuperação de carrinhos abandonados",
      badge: "Recuperação",
      isActive: false,
      triggerType: "manual"
    },
    { 
      id: "produto-visualizado",
      title: "Produto Visualizado", 
      description: "Incentivo para produtos visualizados",
      badge: "Conversão",
      isActive: false,
      triggerType: "manual"
    },
  ]
};

// Adding the recurring campaigns structure
export const recurringCampaigns = {
  automated: [
    { 
      id: "reengajamento-automatico",
      title: "Reengajamento Automático", 
      description: "Recupera clientes inativos automaticamente",
      badge: "Automação",
      isActive: true,
      triggerType: "client_inactivity",
      triggerConfig: {
        inactivityDays: 30
      }
    },
    { 
      id: "fidelidade-automatica",
      title: "Programa de Fidelidade", 
      description: "Recompensas automáticas por frequência",
      badge: "Automação",
      isActive: true,
      triggerType: "repeat_purchase",
      triggerConfig: {
        purchaseCount: 5
      }
    },
  ],
  recurring: [
    { 
      id: "promocao-mensal",
      title: "Promoção Mensal", 
      description: "Enviada todo início de mês",
      badge: "Recorrente",
      isActive: false,
      triggerType: "time_based"
    },
    { 
      id: "newsletter-semanal",
      title: "Newsletter Semanal", 
      description: "Enviada todas as segundas-feiras",
      badge: "Recorrente",
      isActive: false,
      triggerType: "time_based"
    },
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
  // Add the restaurant field needed by CampanhasPage.tsx
  restaurant: [
    { 
      id: "happy-hour",
      title: "Happy Hour", 
      description: "Promoção de bebidas em horário específico",
      badge: "Recorrente",
      isActive: false,
      triggerType: "time_based"
    },
    { 
      id: "cardapio-executivo",
      title: "Cardápio Executivo", 
      description: "Promoção especial para o almoço executivo",
      badge: "Diário",
      isActive: false,
      triggerType: "time_based"
    },
  ],
  delivery: [
    { 
      id: "delivery-rapido",
      title: "Delivery Rápido", 
      description: "Promoção para incentivar pedidos em horários de baixo movimento",
      badge: "WhatsApp/SMS",
      isActive: false,
      triggerType: "time_based"
    },
    { 
      id: "delivery-hora-do-almoco",
      title: "Delivery Hora do Almoço", 
      description: "Promoções especiais para entregas no horário de almoço",
      badge: "WhatsApp/SMS",
      isActive: false,
      triggerType: "time_based"
    },
    { 
      id: "combo-delivery",
      title: "Combo Delivery", 
      description: "Promoção de combos especiais exclusivos para delivery",
      badge: "WhatsApp/E-mail",
      isActive: false,
      triggerType: "manual"
    },
    { 
      id: "delivery-fidelidade",
      title: "Fidelidade no Delivery", 
      description: "Programa de pontos para clientes frequentes de delivery",
      badge: "E-mail/WhatsApp",
      isActive: false,
      triggerType: "repeat_purchase"
    }
  ],
  cardapio: [
    { 
      id: "novo-prato",
      title: "Novo Prato", 
      description: "Anuncio de novos pratos adicionados ao cardápio",
      badge: "WhatsApp/E-mail",
      isActive: false,
      triggerType: "manual"
    },
    { 
      id: "cardapio-sazonal",
      title: "Cardápio Sazonal", 
      description: "Divulgação de cardápio especial por temporada",
      badge: "E-mail/WhatsApp",
      isActive: false,
      triggerType: "time_based"
    },
    { 
      id: "sugestao-chef",
      title: "Sugestão do Chef", 
      description: "Destaque para a criação especial do chef da semana",
      badge: "WhatsApp/E-mail",
      isActive: false,
      triggerType: "time_based"
    }
  ],
  eventos: [
    { 
      id: "musica-ao-vivo",
      title: "Música ao Vivo", 
      description: "Divulgação de eventos com música ao vivo",
      badge: "E-mail/WhatsApp",
      isActive: false,
      triggerType: "manual"
    },
    { 
      id: "happy-hour",
      title: "Happy Hour", 
      description: "Promoção de happy hour com descontos em bebidas",
      badge: "WhatsApp/SMS",
      isActive: false,
      triggerType: "time_based"
    },
    { 
      id: "festival-gastronomico",
      title: "Festival Gastronômico", 
      description: "Divulgação de festival com menu degustação especial",
      badge: "E-mail",
      isActive: false,
      triggerType: "manual"
    },
    { 
      id: "aniversario-restaurante",
      title: "Aniversário do Restaurante", 
      description: "Comunicação sobre celebração de aniversário com ofertas especiais",
      badge: "E-mail/WhatsApp/SMS",
      isActive: false,
      triggerType: "manual"
    }
  ]
};
