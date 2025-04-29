
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import CampanhasMensageria from "@/components/campanhas/CampanhasMensageria";
import CampanhasTrafegoPago from "@/components/campanhas/CampanhasTrafegoPago";

const CampanhasPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("mensageria");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam && (tabParam === "mensageria" || tabParam === "trafego-pago")) {
      setActiveTab(tabParam);
    } else if (!tabParam) {
      // Default to mensageria if no tab is specified
      setActiveTab("mensageria");
    }
  }, [location.search]);

  return (
    <div className="space-y-6">
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          {activeTab === "mensageria" && <CampanhasMensageria />}
          {activeTab === "trafego-pago" && <CampanhasTrafegoPago />}
        </CardContent>
      </Card>
    </div>
  );
};

export default CampanhasPage;
