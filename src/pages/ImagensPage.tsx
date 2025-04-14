
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ImagensPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Imagens</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Imagens</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Imagens</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImagensPage;
