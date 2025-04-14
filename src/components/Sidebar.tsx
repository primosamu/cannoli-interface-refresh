
import { 
  BookOpen,
  Home,
  Users,
  Gift,
  Award,
  ChevronDown,
  Package,
  FileText,
  PlusCircle,
  HelpCircle,
  Menu,
  X
} from "lucide-react";
import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  {
    icon: BookOpen,
    label: "Cardápios",
    submenu: [
      { icon: FileText, label: "Catálogos", path: "/catalogo" },
      { icon: Package, label: "Produtos", path: "/mercadoria" },
      { icon: PlusCircle, label: "Complementos", path: "/complementos" },
      { icon: HelpCircle, label: "Perguntas", path: "/perguntas" },
    ],
  },
  { icon: Users, label: "Clientes", path: "/membros" },
  { icon: Gift, label: "Cupons", path: "/cupons" },
  { icon: Award, label: "Fidelidade", path: "/fidelidade" },
];

const Sidebar = () => {
  const { state, toggleSidebar } = useSidebar();

  return (
    <ShadcnSidebar collapsible="icon">
      <div className="flex items-center justify-between p-4">
        {state === 'expanded' && (
          <h1 className="text-xl font-bold text-green-600">Cannoli</h1>
        )}
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
                          {item.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.label}>
                              <SidebarMenuSubButton asChild>
                                <Link to={subItem.path}>
                                  <subItem.icon className="w-4 h-4" />
                                  <span>{subItem.label}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild tooltip={state === 'collapsed' ? item.label : undefined}>
                      <Link to={item.path} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
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
