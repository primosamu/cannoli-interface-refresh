
export interface EconomicGroup {
  id: string;
  name: string;
  taxId: string;
  legalName?: string;
  logoUrl?: string;
  headquartersAddress?: string;
  mainPhone?: string;
  corporateEmail?: string;
  website?: string;
  foundationDate?: Date;
  legalRepresentative?: string;
  mainActivities?: string;
  notes?: string;
  status: 'Ativo' | 'Inativo' | 'Em Auditoria';
}
