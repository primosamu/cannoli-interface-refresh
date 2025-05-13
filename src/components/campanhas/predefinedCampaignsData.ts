
import { Campaign } from "@/types/campaign";
import { CustomerSegment } from "@/types/campaign";

// Mock customer segments
export const customerSegments: CustomerSegment[] = [
  {
    id: "seg-1",
    name: "Todos os clientes",
    description: "Todos os clientes cadastrados",
    customerCount: 2500
  },
  {
    id: "seg-2",
    name: "Clientes VIP",
    description: "Clientes com alto valor de compra",
    customerCount: 350
  },
  {
    id: "seg-3",
    name: "Clientes inativos",
    description: "Clientes sem compras nos últimos 30 dias",
    customerCount: 1200
  },
  {
    id: "seg-4",
    name: "Novos clientes",
    description: "Clientes que fizeram a primeira compra nos últimos 15 dias",
    customerCount: 180
  },
  {
    id: "seg-5",
    name: "Aniversariantes do mês",
    description: "Clientes que fazem aniversário este mês",
    customerCount: 75
  }
];

// Predefined campaign templates
export const predefinedCampaignTemplates: Record<string, Partial<Campaign>> = {
  "sentimos-sua-falta": {
    name: "Sentimos sua falta",
    channel: "whatsapp",
    whatsappType: "marketing",
    content: "Olá, {{nome}}! Sentimos sua falta no restaurante. Já faz um tempo desde sua última visita e gostaríamos de te ver novamente. Que tal aproveitar um cupom de 15% de desconto na sua próxima refeição? Válido por 7 dias. Esperamos você!",
    segment: customerSegments[2],
    incentive: {
      type: "coupon",
      couponId: "auto-generated"
    },
    executionType: "one-time"
  },
  "volte-para-nos": {
    name: "Volte para nós",
    channel: "whatsapp",
    whatsappType: "marketing",
    content: "Olá, {{nome}}! Estamos com saudades! Como incentivo para você voltar a nos visitar, preparamos um cupom especial de 20% de desconto em qualquer prato do cardápio. Válido por 5 dias. Esperamos você em breve!",
    segment: customerSegments[2],
    incentive: {
      type: "coupon",
      couponId: "auto-generated"
    },
    executionType: "one-time"
  },
  "terca-da-pizza": {
    name: "Terça da Pizza",
    channel: "whatsapp",
    whatsappType: "marketing",
    content: "Olá, {{nome}}! Hoje é TERÇA DA PIZZA! 🍕 Todas as pizzas com 30% de desconto. Válido apenas hoje para delivery ou retirada. Faça seu pedido pelo WhatsApp ou pelo nosso app. Bom apetite!",
    segment: customerSegments[0],
    incentive: {
      type: "none"
    },
    executionType: "one-time"
  },
  "quinta-do-hamburguer": {
    name: "Quinta do Hambúrguer",
    channel: "whatsapp",
    whatsappType: "marketing",
    content: "Olá, {{nome}}! Hoje é QUINTA DO HAMBÚRGUER! 🍔 Todos os hambúrgueres com 25% de desconto. Válido apenas hoje para delivery ou retirada. Faça seu pedido pelo WhatsApp ou pelo nosso app. Bom apetite!",
    segment: customerSegments[0],
    incentive: {
      type: "none"
    },
    executionType: "one-time"
  },
  "aniversariantes-do-mes": {
    name: "Aniversariantes do Mês",
    channel: "whatsapp",
    whatsappType: "marketing",
    content: "Olá, {{nome}}! Feliz Aniversário! 🎂 Para celebrar o seu dia especial, estamos te oferecendo uma sobremesa grátis. Visite-nos durante o mês do seu aniversário e aproveite este presente. Basta mostrar este cupom!",
    segment: customerSegments[4],
    incentive: {
      type: "coupon",
      couponId: "auto-generated"
    },
    executionType: "recurring",
    trigger: {
      type: "birthday",
      time: "12:00"
    },
    maxFrequency: {
      interval: 12,
      unit: "months"
    }
  },
  "recuperacao-clientes": {
    name: "Recuperação de Clientes",
    channel: "whatsapp",
    whatsappType: "marketing",
    content: "Olá, {{nome}}! Sentimos sua falta! Já faz algum tempo que não nos visita, e gostaríamos de te ver novamente. Que tal voltar com um desconto especial de 15% no seu próximo pedido? Válido por 7 dias.",
    segment: customerSegments[2],
    incentive: {
      type: "coupon",
      couponId: "auto-generated"
    },
    executionType: "recurring",
    trigger: {
      type: "client_inactivity",
      inactivityDays: 30
    },
    maxFrequency: {
      interval: 2,
      unit: "months"
    }
  }
};

// Recurring campaigns data for automation section
export const recurringCampaignsData = [
  {
    id: "aniversario",
    title: "Aniversário",
    description: "Parabenize seus clientes e ofereça um presente especial",
    badge: "Alta conversão",
    isActive: true
  },
  {
    id: "recuperacao",
    title: "Recuperação",
    description: "Recupere clientes inativos com ofertas especiais",
    badge: "Recomendado",
    isActive: true
  },
  {
    id: "novosPratos",
    title: "Novos Pratos",
    description: "Anuncie novidades no cardápio para clientes fiéis",
    badge: "Engajamento",
    isActive: false
  },
  {
    id: "boasVindas",
    title: "Boas-vindas",
    description: "Mensagem automática para novos clientes",
    badge: "Relacionamento",
    isActive: true
  }
];

// Data for predefined quick campaigns
export const quickCampaignsData = [
  {
    id: "promocao-fim-semana",
    title: "Promoção de Fim de Semana",
    description: "Divulgue promoções especiais para o fim de semana",
    badge: "Alta conversão"
  },
  {
    id: "feriado-especial",
    title: "Feriado Especial",
    description: "Divulgue horários e promoções para feriados",
    badge: "Ocasiões especiais"
  },
  {
    id: "novo-cardapio",
    title: "Novo Cardápio",
    description: "Anuncie mudanças e novidades no cardápio",
    badge: "Novidades"
  }
];
