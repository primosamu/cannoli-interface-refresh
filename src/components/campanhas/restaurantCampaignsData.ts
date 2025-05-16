
export const restaurantCampaigns = {
  promocoesSemanais: [
    { 
      id: "terca-da-pizza",
      title: "Terça da Pizza", 
      description: "Promoção especial de pizzas toda terça-feira",
      badge: "Recorrente"
    },
    { 
      id: "quinta-do-hamburguer",
      title: "Quinta do Hambúrguer", 
      description: "Descontos em hambúrgueres selecionados às quintas",
      badge: "Recorrente"
    },
    { 
      id: "sabado-feijoada",
      title: "Sábado da Feijoada", 
      description: "Feijoada completa com preço especial aos sábados",
      badge: "Recorrente"
    },
    { 
      id: "domingo-familia",
      title: "Domingo em Família", 
      description: "Descontos para refeições em grupo aos domingos",
      badge: "Recorrente" 
    }
  ],
  // Mantendo o campo restaurant para compatibilidade com CampanhasPage.tsx
  restaurant: [
    { 
      id: "happy-hour",
      title: "Happy Hour", 
      description: "Promoção de bebidas em horário específico",
      badge: "Recorrente"
    },
    { 
      id: "cardapio-executivo",
      title: "Cardápio Executivo", 
      description: "Promoção especial para o almoço executivo",
      badge: "Diário"
    },
    { 
      id: "festival-gastronomico",
      title: "Festival Gastronômico", 
      description: "Pratos especiais por tempo limitado",
      badge: "Sazonal"
    }
  ],
  delivery: [
    { 
      id: "delivery-rapido",
      title: "Delivery Rápido", 
      description: "Promoção para incentivar pedidos em horários de baixo movimento",
      badge: "WhatsApp/SMS"
    },
    { 
      id: "delivery-hora-do-almoco",
      title: "Delivery Hora do Almoço", 
      description: "Promoções especiais para entregas no horário de almoço",
      badge: "WhatsApp/SMS"
    },
    { 
      id: "combo-delivery",
      title: "Combo Delivery", 
      description: "Promoção de combos especiais exclusivos para delivery",
      badge: "WhatsApp/E-mail"
    },
    { 
      id: "delivery-fidelidade",
      title: "Fidelidade no Delivery", 
      description: "Programa de pontos para clientes frequentes de delivery",
      badge: "E-mail/WhatsApp"
    }
  ],
  cardapio: [
    { 
      id: "novo-prato",
      title: "Novo Prato", 
      description: "Anuncio de novos pratos adicionados ao cardápio",
      badge: "WhatsApp/E-mail"
    },
    { 
      id: "cardapio-sazonal",
      title: "Cardápio Sazonal", 
      description: "Divulgação de cardápio especial por temporada",
      badge: "E-mail/WhatsApp"
    },
    { 
      id: "sugestao-chef",
      title: "Sugestão do Chef", 
      description: "Destaque para a criação especial do chef da semana",
      badge: "WhatsApp/E-mail"
    }
  ],
  eventos: [
    { 
      id: "musica-ao-vivo",
      title: "Música ao Vivo", 
      description: "Divulgação de eventos com música ao vivo",
      badge: "E-mail/WhatsApp"
    },
    { 
      id: "happy-hour",
      title: "Happy Hour", 
      description: "Promoção de happy hour com descontos em bebidas",
      badge: "WhatsApp/SMS"
    },
    { 
      id: "festival-gastronomico",
      title: "Festival Gastronômico", 
      description: "Divulgação de festival com menu degustação especial",
      badge: "E-mail"
    },
    { 
      id: "aniversario-restaurante",
      title: "Aniversário do Restaurante", 
      description: "Comunicação sobre celebração de aniversário com ofertas especiais",
      badge: "E-mail/WhatsApp/SMS"
    }
  ]
};
