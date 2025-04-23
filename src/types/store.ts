
export interface Store {
  id: string;
  name: string;
  taxId: string;
  locations: string;
  unitManager?: string;
  contactPhone?: string;
  contactEmail?: string;
  openingHours?: string;
  openingDate?: Date;
  status: 'Ativa' | 'Inativa';
  notes?: string;
  coverageArea?: string;
  brandId: string;
  economicGroupId: string;
}
