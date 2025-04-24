
import { EntityRelationship } from "@/types/entities";

interface EntityRelationshipsProps {
  relationships: EntityRelationship[];
}

const EntityRelationships = ({ relationships }: EntityRelationshipsProps) => {
  if (relationships.length === 0) return null;

  return (
    <div>
      <h4 className="font-medium mb-2">Relacionamentos</h4>
      <div className="grid gap-2">
        {relationships.map((rel, index) => (
          <div key={index} className="text-sm">
            <span className="font-medium">{rel.label}</span>
            <span className="text-muted-foreground"> - {rel.type} com {rel.entity}</span>
            {rel.required && <span className="text-destructive ml-1">*</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntityRelationships;
