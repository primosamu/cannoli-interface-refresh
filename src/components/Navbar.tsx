
import { Bell, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const getPageTitle = (pathname: string, search: string) => {
  // Special case for Campanhas with tabs
  if (pathname === "/campanhas") {
    const params = new URLSearchParams(search);
    const tab = params.get("tab");
    if (tab === "mensageria") return "Campanhas de Mensageria";
    if (tab === "trafego-pago") return "Campanhas de Tráfego Pago";
    return "Campanhas";
  }

  const titles: { [key: string]: string } = {
    "/": "Home",
    "/minha-conta": "Minha Conta",
    "/membros": "Membros",
    "/cupons": "Cupons",
    "/mercadoria": "Mercadoria",
    "/catalogo": "Catálogo",
    "/imagens": "Imagens",
    "/aplicativos": "Aplicativos",
    "/canais-de-vendas": "Canais de Vendas",
    "/relatorios": "Relatórios",
    "/configuracoes": "Configurações",
    "/grupos-economicos": "Grupos Econômicos",
    "/marcas": "Marcas",
    "/lojas": "Lojas",
    "/auth": "Autenticação"
  };
  return titles[pathname] || "Dashboard";
};

const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const pageTitle = getPageTitle(location.pathname, location.search);

  const getUserInitials = () => {
    if (!user) return "?";
    
    // Check if it's a Supabase User with metadata
    if ('user_metadata' in user) {
      const firstName = user.user_metadata?.first_name || '';
      const lastName = user.user_metadata?.last_name || '';
      
      if (firstName && lastName) {
        return `${firstName[0]}${lastName[0]}`.toUpperCase();
      }
    }
    
    // Fallback to email
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    
    return "U";
  };

  return (
    <nav className="border-b bg-white/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">{pageTitle}</h2>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/minha-conta">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/configuracoes">Configurações</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild>
              <Link to="/auth">Entrar</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
