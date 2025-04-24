
export interface EntityField {
  name: string;
  type: string;
  required: boolean;
  label: string;
  message?: string;
  values?: string[];
}

export interface EntityRelationship {
  type: string;
  entity: string;
  foreignKey: string;
  required: boolean;
  label: string;
  message?: string;
}

export interface SystemEntity {
  name: string;
  description: string;
  fields: EntityField[];
  relationships: EntityRelationship[];
}
