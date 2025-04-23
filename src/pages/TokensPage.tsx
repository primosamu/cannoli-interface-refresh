
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, Copy, RefreshCw, Eye, EyeOff } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface Token {
  id: string;
  name: string;
  token: string;
  createdAt: string;
  lastUsed?: string;
}

const TokensPage = () => {
  const { toast } = useToast();
  const [tokens, setTokens] = useState<Token[]>([
    {
      id: "1",
      name: "API Cliente",
      token: "clt_5f9b3d2e7c8f6a4b2d1e0c8a7b5f3d2e",
      createdAt: "2025-03-15",
      lastUsed: "2025-04-22"
    },
    {
      id: "2",
      name: "Enriquecimento de Dados",
      token: "enr_7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p",
      createdAt: "2025-04-01",
      lastUsed: "2025-04-20"
    },
    {
      id: "3",
      name: "Integração WhatsApp",
      token: "wpp_3d2e1f0g9h8i7j6k5l4m3n2o1p0q9r8",
      createdAt: "2025-02-10",
      lastUsed: "2025-04-15"
    }
  ]);
  
  const [newTokenName, setNewTokenName] = useState("");
  const [showToken, setShowToken] = useState<Record<string, boolean>>({});

  const handleCreateToken = () => {
    if (!newTokenName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, forneça um nome para o token.",
        variant: "destructive"
      });
      return;
    }

    const randomToken = `tok_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    
    const newToken: Token = {
      id: (tokens.length + 1).toString(),
      name: newTokenName,
      token: randomToken,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setTokens([...tokens, newToken]);
    setNewTokenName("");
    
    toast({
      title: "Token criado",
      description: `Token "${newTokenName}" foi criado com sucesso.`
    });
  };

  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    toast({
      title: "Token copiado",
      description: "O token foi copiado para a área de transferência."
    });
  };

  const handleRegenerateToken = (id: string) => {
    const randomToken = `tok_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    
    setTokens(tokens.map(token => 
      token.id === id 
        ? { 
            ...token, 
            token: randomToken, 
            createdAt: new Date().toISOString().split('T')[0]
          } 
        : token
    ));
    
    toast({
      title: "Token regenerado",
      description: "O token foi regenerado com sucesso."
    });
  };

  const toggleTokenVisibility = (id: string) => {
    setShowToken({
      ...showToken,
      [id]: !showToken[id]
    });
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Tokens</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Tokens</CardTitle>
          <CardDescription>Crie e gerencie tokens de acesso à API para integração com outros sistemas.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Nome do token"
                  value={newTokenName}
                  onChange={(e) => setNewTokenName(e.target.value)}
                />
              </div>
              <Button onClick={handleCreateToken}>
                <Key className="h-4 w-4 mr-2" /> Criar Token
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Token</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead>Último Uso</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokens.map((token) => (
                    <TableRow key={token.id}>
                      <TableCell className="font-medium">{token.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="px-1 py-0.5 bg-muted rounded text-sm font-mono">
                            {showToken[token.id] ? token.token : token.token.substring(0, 8) + "•••••••••••••••"}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => toggleTokenVisibility(token.id)}
                          >
                            {showToken[token.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{token.createdAt}</TableCell>
                      <TableCell>{token.lastUsed || "-"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyToken(token.token)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRegenerateToken(token.id)}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokensPage;
