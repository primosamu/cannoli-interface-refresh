
export interface Brand {
  id: string;
  name: string;
  logoUrl?: string;
  description?: string;
  taxId?: string;
  marketSector?: string;
  mainAddress?: string;
  contactPhone?: string;
  businessEmail?: string;
  website?: string;
  creationDate?: Date;
  status: 'Ativa' | 'Inativa';
  economicGroupId: string;
}
