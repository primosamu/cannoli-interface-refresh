
import { SystemEntity } from "@/types/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EntityFields from "./EntityFields";
import EntityRelationships from "./EntityRelationships";

interface EntityCardProps {
  entity: SystemEntity;
}

const EntityCard = ({ entity }: EntityCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg">{entity.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{entity.description}</p>
        
        <div className="space-y-4">
          <EntityFields fields={entity.fields} />
          <EntityRelationships relationships={entity.relationships} />
        </div>
      </CardContent>
    </Card>
  );
};

export default EntityCard;
