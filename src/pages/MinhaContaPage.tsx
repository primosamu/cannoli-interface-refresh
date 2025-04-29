
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const MinhaContaPage = () => {
  const { user, updateProfile } = useAuth();
  const [firstName, setFirstName] = useState(user?.user_metadata?.first_name || "");
  const [lastName, setLastName] = useState(user?.user_metadata?.last_name || "");
  const [isLoading, setIsLoading] = useState(false);

  const getUserInitials = () => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    return user?.email?.[0].toUpperCase() || "U";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Minha Conta</h1>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Atualize suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="profile-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center mb-6">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="text-3xl">{getUserInitials()}</AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email || ""} disabled />
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Nome</Label>
                  <Input
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Sobrenome</Label>
                  <Input
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button form="profile-form" type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar alterações"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>Gerencie sua senha e configurações de segurança</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha atual</Label>
              <Input id="current-password" type="password" placeholder="••••••••" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova senha</Label>
              <Input id="new-password" type="password" placeholder="••••••••" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar senha</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" disabled />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled>
              Alterar senha
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MinhaContaPage;
