
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
  };
  return titles[pathname] || "Dashboard";
};

const Navbar = () => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname, location.search);

  return (
    <nav className="border-b bg-white/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">{pageTitle}</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
