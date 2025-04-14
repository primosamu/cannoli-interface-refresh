
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WhatsappPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">WhatsApp</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Integração com WhatsApp</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página WhatsApp</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsappPage;
