
export type ClientTag = "vip" | "novo" | "recorrente" | "inativo";

export interface Client {
  id: string;
  name: string;
  cpf: string;
  phone?: string;
  email?: string;
  orderCount: number;
  lastOrderDate?: string;
  totalSpent: number;
  tags: ClientTag[];
}
