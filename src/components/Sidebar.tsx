
import { 
  Home,
  User,
  Users,
  Gift,
  Package,
  BookOpen,
  Images,
  AppWindow,
  Share,
  BarChart,
  Settings,
  Menu,
  X
} from "lucide-react";
import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: User, label: "Minha Conta", path: "/minha-conta" },
  { icon: Users, label: "Membros", path: "/membros" },
  { icon: Gift, label: "Cupons", path: "/cupons" },
  { icon: Package, label: "Mercadoria", path: "/mercadoria" },
  { icon: BookOpen, label: "Catálogo", path: "/catalogo" },
  { icon: Images, label: "Imagens", path: "/imagens" },
  { icon: AppWindow, label: "Aplicativos", path: "/aplicativos" },
  { icon: Share, label: "Canais de Vendas", path: "/canais-de-vendas" },
  { icon: BarChart, label: "Relatórios", path: "/relatorios" },
  { icon: Settings, label: "Configurações", path: "/configuracoes" },
];

const Sidebar = () => {
  const { state, toggleSidebar } = useSidebar();

  return (
    <ShadcnSidebar collapsible="icon">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-purple-600">Cannoli</h1>
        <SidebarTrigger>
          {state === 'expanded' ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </SidebarTrigger>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <Link to={item.path} className="flex items-center gap-3 px-4 py-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  );
};

export default Sidebar;
