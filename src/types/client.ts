
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

export interface ClientSegment {
  id: string;
  name: string;
  description: string;
  filters: ClientSegmentFilter[];
  clientCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientSegmentFilter {
  field: string;
  operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "in" | "notIn";
  value: string | number | boolean | string[] | number[];
}
