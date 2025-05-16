import { Promotion } from "@/types/promotion";

// Mockdata for promotions
export const mockPromotions: Promotion[] = [
  {
    id: "promo1",
    name: "Desconto de Verão",
    description: "Aproveite 15% de desconto em todos os produtos da categoria Verão",
    type: "product_discount", 
    discountType: "percentage",
    discountValue: 15,
    startDate: new Date(2025, 5, 1).toISOString(),
    endDate: new Date(2025, 8, 31).toISOString(),
    status: "active",
    conditions: {
      customerGroups: ["group1", "group2"],
      categories: ["cat3"],
      paymentMethods: ["pix", "credit_card"],
      usageCount: 0,
    },
    isAccumulative: false,
    priority: 1,
    statistics: {
      usageCount: 245,
      revenue: 8760.50,
      discountTotal: 1350.45,
      averageOrderValue: 35.75,
    },
  },
  {
    id: "promo2",
    name: "Compre 1 Ganhe 1",
    description: "Compre um hamburguer e ganhe outro grátis",
    type: "buy_x_get_y",
    discountType: "percentage",
    discountValue: 100,
    startDate: new Date(2025, 4, 15).toISOString(),
    endDate: new Date(2025, 4, 30).toISOString(),
    status: "active",
    conditions: {
      customerGroups: ["group1"],
      products: ["prod1", "prod2"],
      paymentMethods: ["cash"],
      usageCount: 0,
      buyQuantity: 1,
      getQuantity: 1,
    },
    isAccumulative: false,
    priority: 2,
    statistics: {
      usageCount: 125,
      revenue: 3125.00,
      discountTotal: 3125.00,
      averageOrderValue: 25.00,
    },
  },
  {
    id: "promo3",
    name: "Frete Grátis",
    description: "Frete grátis para compras acima de R$100",
    type: "order_value_discount",
    discountType: "fixed",
    discountValue: 15,
    startDate: new Date(2025, 0, 1).toISOString(),
    endDate: new Date(2025, 11, 31).toISOString(),
    status: "active",
    conditions: {
      minOrderValue: 100,
      paymentMethods: ["credit_card", "pix", "cash"],
      usageCount: 0,
    },
    isAccumulative: true,
    priority: 3,
    statistics: {
      usageCount: 478,
      revenue: 62140.00,
      discountTotal: 7170.00,
      averageOrderValue: 130.00,
    },
  },
  {
    id: "promo4",
    name: "Desconto de Aniversário",
    description: "20% de desconto para clientes aniversariantes",
    type: "time_limited",
    discountType: "percentage",
    discountValue: 20,
    startDate: new Date(2025, 0, 1).toISOString(),
    endDate: new Date(2025, 11, 31).toISOString(),
    status: "expired",
    conditions: {
      customerGroups: ["birthdate_clients"],
      usageCount: 0,
    },
    isAccumulative: false,
    priority: 1,
    statistics: {
      usageCount: 89,
      revenue: 5340.00,
      discountTotal: 1335.00,
      averageOrderValue: 60.00,
    },
  },
  {
    id: "promo5",
    name: "Black Friday",
    description: "Até 70% de desconto em produtos selecionados",
    type: "product_discount",
    discountType: "percentage",
    discountValue: 70,
    startDate: new Date(2025, 10, 25).toISOString(),
    endDate: new Date(2025, 10, 30).toISOString(),
    status: "scheduled",
    conditions: {
      products: ["prod5", "prod12", "prod18"],
      usageCount: 0,
    },
    isAccumulative: false,
    priority: 5,
    statistics: {
      usageCount: 0,
      revenue: 0,
      discountTotal: 0,
      averageOrderValue: 0,
    },
  },
  {
    id: "promo6",
    name: "Teste de Cupom",
    description: "Cupom de desconto para testes",
    type: "coupon",
    discountType: "fixed",
    discountValue: 25,
    startDate: new Date(2025, 3, 15).toISOString(),
    endDate: new Date(2025, 5, 15).toISOString(),
    status: "draft",
    conditions: {
      usageCount: 0,
    },
    isAccumulative: true,
    priority: 1,
    statistics: {
      usageCount: 0,
      revenue: 0,
      discountTotal: 0,
      averageOrderValue: 0,
    },
  }
];

// Mock data for customer groups
export const mockCustomerGroups = [
  { id: "group1", name: "Clientes VIP" },
  { id: "group2", name: "Clientes Novos" },
  { id: "birthdate_clients", name: "Aniversariantes" },
  { id: "recurrent", name: "Clientes Frequentes" },
  { id: "inactive", name: "Clientes Inativos" },
];

// Mock data for payment methods
export const mockPaymentMethods = [
  { id: "credit_card", name: "Cartão de Crédito" },
  { id: "debit_card", name: "Cartão de Débito" },
  { id: "pix", name: "PIX" },
  { id: "cash", name: "Dinheiro" },
  { id: "transfer", name: "Transferência Bancária" },
];

// Mock data for categories - estrutura hierárquica de 5 níveis
export const mockCategories = [
  // Nível 1
  { id: "cat1", name: "Alimentos" },
  { id: "cat2", name: "Bebidas" },
  { id: "cat3", name: "Sobremesas" },
  
  // Nível 2 (filhos de "Alimentos")
  { id: "cat1-1", name: "Lanches Rápidos", parentId: "cat1" },
  { id: "cat1-2", name: "Pratos Principais", parentId: "cat1" },
  { id: "cat1-3", name: "Entradas", parentId: "cat1" },
  
  // Nível 2 (filhos de "Bebidas")
  { id: "cat2-1", name: "Bebidas Alcoólicas", parentId: "cat2" },
  { id: "cat2-2", name: "Bebidas Não-Alcoólicas", parentId: "cat2" },
  
  // Nível 2 (filhos de "Sobremesas")
  { id: "cat3-1", name: "Doces", parentId: "cat3" },
  { id: "cat3-2", name: "Gelados", parentId: "cat3" },
  
  // Nível 3 (filhos de "Lanches Rápidos")
  { id: "cat1-1-1", name: "Hambúrgueres", parentId: "cat1-1" },
  { id: "cat1-1-2", name: "Sanduíches", parentId: "cat1-1" },
  { id: "cat1-1-3", name: "Pizzas", parentId: "cat1-1" },
  
  // Nível 3 (filhos de "Bebidas Alcoólicas")
  { id: "cat2-1-1", name: "Cervejas", parentId: "cat2-1" },
  { id: "cat2-1-2", name: "Vinhos", parentId: "cat2-1" },
  
  // Nível 3 (filhos de "Bebidas Não-Alcoólicas")
  { id: "cat2-2-1", name: "Refrigerantes", parentId: "cat2-2" },
  { id: "cat2-2-2", name: "Sucos", parentId: "cat2-2" },
  
  // Nível 4 (filhos de "Hambúrgueres")
  { id: "cat1-1-1-1", name: "Hambúrgueres Clássicos", parentId: "cat1-1-1" },
  { id: "cat1-1-1-2", name: "Hambúrgueres Gourmet", parentId: "cat1-1-1" },
  
  // Nível 4 (filhos de "Cervejas")
  { id: "cat2-1-1-1", name: "Cervejas Nacionais", parentId: "cat2-1-1" },
  { id: "cat2-1-1-2", name: "Cervejas Importadas", parentId: "cat2-1-1" },
  
  // Nível 5 (filhos de "Hambúrgueres Gourmet")
  { id: "cat1-1-1-2-1", name: "Angus", parentId: "cat1-1-1-2" },
  { id: "cat1-1-1-2-2", name: "Vegetarianos", parentId: "cat1-1-1-2" },
  
  // Nível 5 (filhos de "Cervejas Importadas")
  { id: "cat2-1-1-2-1", name: "Alemãs", parentId: "cat2-1-1-2" },
  { id: "cat2-1-1-2-2", name: "Belgas", parentId: "cat2-1-1-2" },
];

// Mock data for products com categorias associadas
export const mockProducts = [
  { id: "prod1", name: "X-Tudo", category: "cat1-1-1-1" },
  { id: "prod2", name: "X-Salada", category: "cat1-1-1-1" },
  { id: "prod3", name: "Hambúrguer Angus Premium", category: "cat1-1-1-2-1" },
  { id: "prod4", name: "Hambúrguer Vegetariano", category: "cat1-1-1-2-2" },
  { id: "prod5", name: "Coca-Cola 350ml", category: "cat2-2-1" },
  { id: "prod6", name: "Suco de Laranja", category: "cat2-2-2" },
  { id: "prod7", name: "Brahma", category: "cat2-1-1-1" },
  { id: "prod8", name: "Heineken", category: "cat2-1-1-2-1" },
  { id: "prod9", name: "Stella Artois", category: "cat2-1-1-2-2" },
  { id: "prod10", name: "Mousse de Chocolate", category: "cat3-1" },
  { id: "prod11", name: "Sorvete de Creme", category: "cat3-2" },
  { id: "prod12", name: "Sanduíche de Frango", category: "cat1-1-2" },
  { id: "prod13", name: "Pizza Margherita", category: "cat1-1-3" },
  { id: "prod14", name: "Vinho Tinto", category: "cat2-1-2" },
  { id: "prod15", name: "Água Mineral", category: "cat2-2-2" },
  { id: "prod16", name: "Batata Frita", category: "cat1-3" },
  { id: "prod17", name: "Isca de Frango", category: "cat1-3" },
  { id: "prod18", name: "Sundae", category: "cat3-2" },
];
