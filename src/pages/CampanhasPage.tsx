
import { Card } from "@/components/ui/card";
import CampanhasMensageria from "@/components/campanhas/CampanhasMensageria";
import CampanhasTrafegoPago from "@/components/campanhas/CampanhasTrafegoPago";
import { useLocation } from "react-router-dom";

const CampanhasPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tabParam = params.get("tab");
  
  // Determine which component to show based on the tab parameter
  const showTrafegoPago = tabParam === "trafego-pago";

  return (
    <div className="space-y-6">
      <Card className="bg-white/50 backdrop-blur-sm p-4">
        {showTrafegoPago ? <CampanhasTrafegoPago /> : <CampanhasMensageria />}
      </Card>
    </div>
  );
};

export default CampanhasPage;
