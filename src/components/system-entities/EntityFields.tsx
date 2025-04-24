
import { EntityField } from "@/types/entities";

interface EntityFieldsProps {
  fields: EntityField[];
}

const EntityFields = ({ fields }: EntityFieldsProps) => {
  return (
    <div>
      <h4 className="font-medium mb-2">Campos</h4>
      <div className="grid gap-2">
        {fields.map((field) => (
          <div key={field.name} className="text-sm">
            <span className="font-medium">{field.label}</span>
            <span className="text-muted-foreground"> - {field.type}</span>
            {field.required && <span className="text-destructive ml-1">*</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntityFields;
