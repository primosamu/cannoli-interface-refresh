
import { Card } from "@/components/ui/card";
import CampanhasMensageria from "@/components/campanhas/CampanhasMensageria";

const CampanhasPage = () => {
  return (
    <div className="container mx-auto space-y-6 py-4">
      <Card className="bg-white/50 backdrop-blur-sm p-4">
        <CampanhasMensageria />
      </Card>
    </div>
  );
};

export default CampanhasPage;
