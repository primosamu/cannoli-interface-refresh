
import { Promotion } from "@/types/promotion";

// Mock data for promotions
export const mockPromotions: Promotion[] = [
  {
    id: "promo1",
    name: "Happy Hour - 15% OFF",
    description: "Desconto de 15% em todos os pratos entre 15h e 18h",
    type: "time_limited",
    discountValue: 15,
    discountType: "percentage",
    startDate: new Date(Date.now()).toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    conditions: {
      usageCount: 43,
      paymentMethods: ["credit_card", "debit_card"],
    },
    isAccumulative: false,
    priority: 1,
    statistics: {
      usageCount: 43,
      revenue: 3452.75,
      discountTotal: 517.91,
      averageOrderValue: 80.29,
    },
  },
  {
    id: "promo2",
    name: "Combo Família",
    description: "20% de desconto em combos para família",
    type: "combo_discount",
    discountValue: 20,
    discountType: "percentage",
    startDate: new Date(Date.now()).toISOString(),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    conditions: {
      products: ["combo-familia", "combo-festa"],
      usageCount: 78,
      customerGroups: ["families", "new_customers"],
    },
    isAccumulative: false,
    priority: 2,
    statistics: {
      usageCount: 78,
      revenue: 7820.50,
      discountTotal: 1564.10,
      averageOrderValue: 100.26,
    },
  },
  {
    id: "promo3",
    name: "Pedido acima de R$100",
    description: "Ganhe R$10 de desconto em pedidos acima de R$100",
    type: "order_value_discount",
    discountValue: 10,
    discountType: "fixed",
    startDate: new Date(Date.now()).toISOString(),
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    conditions: {
      minOrderValue: 100,
      usageCount: 126,
    },
    isAccumulative: true,
    priority: 3,
    statistics: {
      usageCount: 126,
      revenue: 15120.00,
      discountTotal: 1260.00,
      averageOrderValue: 120.00,
    },
  },
  {
    id: "promo4",
    name: "Compre 2 Pizzas, Ganhe 1 Refrigerante",
    description: "Na compra de 2 pizzas grandes, ganhe 1 refrigerante de 2L",
    type: "buy_x_get_y",
    discountValue: 100,
    discountType: "percentage",
    startDate: new Date(Date.now()).toISOString(),
    endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    conditions: {
      products: ["pizza-grande"],
      categories: ["pizzas"],
      usageCount: 52,
      buyQuantity: 2,
      getQuantity: 1,
    },
    isAccumulative: false,
    priority: 2,
    statistics: {
      usageCount: 52,
      revenue: 6240.00,
      discountTotal: 780.00,
      averageOrderValue: 120.00,
    },
  },
];

// Mock data for customer groups, products, payment methods, etc.
export const mockCustomerGroups = [
  { id: "families", name: "Famílias" },
  { id: "new_customers", name: "Novos Clientes" },
  { id: "vip", name: "VIP" },
  { id: "regular", name: "Clientes Frequentes" },
];

export const mockProducts = [
  { id: "pizza-grande", name: "Pizza Grande" },
  { id: "combo-familia", name: "Combo Família" },
  { id: "combo-festa", name: "Combo Festa" },
  { id: "refrigerante-2l", name: "Refrigerante 2L" },
  { id: "sobremesa", name: "Sobremesa" },
];

export const mockCategories = [
  { id: "pizzas", name: "Pizzas" },
  { id: "combos", name: "Combos" },
  { id: "bebidas", name: "Bebidas" },
  { id: "sobremesas", name: "Sobremesas" },
];

export const mockPaymentMethods = [
  { id: "credit_card", name: "Cartão de Crédito" },
  { id: "debit_card", name: "Cartão de Débito" },
  { id: "cash", name: "Dinheiro" },
  { id: "pix", name: "PIX" },
];
