
import { 
  Home,
  BookOpen,
  Users,
  Gift,
  Award,
  ChevronDown,
  Package,
  FileText,
  PlusCircle,
  HelpCircle,
  Menu,
  X,
  Truck,
  MapPin,
  FileBarChart,
  Link as LinkIcon,
  ShoppingCart,
  MessageSquare,
  CreditCard,
  Settings,
  User,
  Image,
  Printer,
  Server,
  Key,
  Target,
  Mail,
  Phone,
  Ticket,
  PercentIcon
} from "lucide-react";

import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link as RouterLink } from "react-router-dom";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  {
    icon: Users,
    label: "Cadastros",
    submenu: [
      { icon: Users, label: "Grupos Econômicos", path: "/grupos-economicos" },
      { icon: FileText, label: "Marcas", path: "/marcas" },
      { icon: MapPin, label: "Lojas", path: "/lojas" },
      { icon: Package, label: "Produtos", path: "/mercadoria" },
      { icon: PlusCircle, label: "Complementos", path: "/complementos" },
      { icon: HelpCircle, label: "Perguntas", path: "/perguntas" },
    ],
  },
  { icon: Users, label: "Clientes", path: "/membros" },
  { icon: Gift, label: "Cupons", path: "/cupons" },
  { icon: PercentIcon, label: "Promoções", path: "/promocoes" },
  { 
    icon: Target, 
    label: "Campanhas", 
    submenu: [
      { icon: MessageSquare, label: "Mensageria", path: "/campanhas" },
      { icon: Target, label: "Tráfego Pago", path: "/campanhas?tab=trafego-pago" },
      { icon: Image, label: "Gerador de Imagens", path: "/campanhas?tab=gerador-imagens" },
      { icon: Settings, label: "Configurações", path: "/campanhas?tab=configuracoes" },
    ],
    path: "/campanhas" 
  },
  { icon: Award, label: "Fidelidade", path: "/fidelidade" },
  {
    icon: Truck,
    label: "Entrega",
    submenu: [
      { icon: MapPin, label: "Áreas de Entrega", path: "/areas-entrega" },
      { icon: Users, label: "Entregadores", path: "/entregadores" },
      { icon: FileBarChart, label: "Relatório de Entregas", path: "/relatorio-entregas" },
    ],
  },
  {
    icon: LinkIcon,
    label: "Integrações",
    submenu: [
      { icon: ShoppingCart, label: "Marketplaces", path: "/marketplaces" },
      { icon: MessageSquare, label: "WhatsApp", path: "/whatsapp" },
      { icon: CreditCard, label: "Pagamentos", path: "/pagamentos" },
    ],
  },
  {
    icon: Settings,
    label: "Configurações",
    submenu: [
      { icon: User, label: "Minha Conta", path: "/minha-conta" },
      { icon: Users, label: "Usuários", path: "/usuarios" },
      { icon: Image, label: "Imagens", path: "/imagens" },
      {
        icon: Printer,
        label: "Impressão de Pedidos",
        submenu: [
          { icon: MapPin, label: "Local de Preparo", path: "/local-preparo" },
          { icon: Server, label: "Cannoli Server", path: "/cannoli-server" },
        ],
      },
      { icon: Key, label: "Tokens", path: "/tokens" },
      { icon: Server, label: "Estrutura do Sistema", path: "/configuracoes" },
    ],
  },
];

const Sidebar = () => {
  const { state, toggleSidebar } = useSidebar();

  const renderSubmenu = (items: any[], parentPath = '') => {
    return items.map((subItem) => (
      <SidebarMenuSubItem key={subItem.label}>
        {subItem.submenu ? (
          <Collapsible>
            <CollapsibleTrigger asChild>
              <SidebarMenuSubButton>
                <subItem.icon className="w-4 h-4" />
                <span>{subItem.label}</span>
                <ChevronDown className="w-4 h-4 ml-auto" />
              </SidebarMenuSubButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {renderSubmenu(subItem.submenu, subItem.path)}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <SidebarMenuSubButton asChild>
            <RouterLink to={subItem.path}>
              <subItem.icon className="w-4 h-4" />
              <span>{subItem.label}</span>
            </RouterLink>
          </SidebarMenuSubButton>
        )}
      </SidebarMenuSubItem>
    ));
  };

  return (
    <ShadcnSidebar collapsible="icon">
      <div className="flex items-center justify-between p-4">
        {state === 'expanded' && (
          <h1 className="text-xl font-bold text-primary">Cannoli</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-slate-100"
        >
          {state === 'expanded' ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  {item.submenu ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={state === 'collapsed' ? item.label : undefined}>
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                          <ChevronDown className="w-4 h-4 ml-auto" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {renderSubmenu(item.submenu)}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild tooltip={state === 'collapsed' ? item.label : undefined}>
                      <RouterLink to={item.path} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  )}
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
