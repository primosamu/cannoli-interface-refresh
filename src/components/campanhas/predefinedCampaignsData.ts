
export const predefinedCampaigns = {
  recuperacao: [
    { 
      id: "sentimos-sua-falta",
      title: "Sentimos sua falta", 
      description: "Recupera clientes que não pedem há X dias",
      badge: "Reativação"
    },
    { 
      id: "volte-para-nos",
      title: "Volte para nós", 
      description: "Enviada 7 dias após a campanha 'Sentimos sua falta'",
      badge: "Reativação"
    },
    { 
      id: "nos-de-outra-chance",
      title: "Nos dê outra chance", 
      description: "Enviada 15 dias após a campanha inicial",
      badge: "Reativação"
    },
    { 
      id: "ultima-chance",
      title: "Última chance", 
      description: "Enviada 30 dias após a campanha inicial",
      badge: "Reativação" 
    }
  ],
  fidelizacao: [
    { 
      id: "primeiro-pedido",
      title: "Obrigado pelo primeiro pedido", 
      description: "Para clientes que realizaram o primeiro pedido",
      badge: "Primeiros Passos"
    },
    { 
      id: "segundo-pedido",
      title: "Recompensa pelo segundo pedido", 
      description: "Para clientes que realizaram o segundo pedido",
      badge: "Engajamento"
    },
    { 
      id: "cliente-vip",
      title: "Cliente VIP", 
      description: "Para clientes que realizaram o terceiro pedido",
      badge: "Fidelidade"
    },
    { 
      id: "clube-clientes",
      title: "Clube de clientes frequentes", 
      description: "Para clientes que realizaram 5 ou mais pedidos",
      badge: "VIP"
    }
  ],
  padroesConsumo: [
    { 
      id: "experimente-jantar",
      title: "Experimente nosso jantar", 
      description: "Para clientes que só almoçam",
      badge: "Cross-selling"
    },
    { 
      id: "experimente-almoco",
      title: "Experimente nosso almoço", 
      description: "Para clientes que só jantam",
      badge: "Cross-selling"
    },
    { 
      id: "menu-fds",
      title: "Menu especial de final de semana", 
      description: "Para clientes que só frequentam em dias da semana",
      badge: "Cross-selling"
    },
    { 
      id: "promo-semana",
      title: "Promoções dos dias da semana", 
      description: "Para clientes que só frequentam nos finais de semana",
      badge: "Cross-selling"
    },
    { 
      id: "visite-restaurante",
      title: "Visite nosso restaurante", 
      description: "Para clientes que só pedem no delivery",
      badge: "Cross-selling"
    },
    { 
      id: "experimente-delivery",
      title: "Experimente nosso delivery", 
      description: "Para clientes que só vão à loja física",
      badge: "Cross-selling"
    }
  ],
  migracaoCanal: [
    { 
      id: "mude-app",
      title: "Mude para nosso app", 
      description: "Para clientes que só pedem por marketplaces como iFood",
      badge: "Migração"
    },
    { 
      id: "peca-whatsapp",
      title: "Peça pelo nosso WhatsApp", 
      description: "Para clientes de marketplaces",
      badge: "Migração"
    }
  ]
};
