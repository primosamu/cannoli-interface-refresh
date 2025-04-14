
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MembrosPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Membros</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Lista de Membros</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Membros</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MembrosPage;
