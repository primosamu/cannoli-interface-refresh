import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import MinhaContaPage from "@/pages/MinhaContaPage";
import MembrosPage from "@/pages/MembrosPage";
import CuponsPage from "@/pages/CuponsPage";
import MercadoriaPage from "@/pages/MercadoriaPage";
import CatalogoPage from "@/pages/CatalogoPage";
import ImagensPage from "@/pages/ImagensPage";
import AplicativosPage from "@/pages/AplicativosPage";
import CanaisVendasPage from "@/pages/CanaisVendasPage";
import RelatoriosPage from "@/pages/RelatoriosPage";
import ConfiguracoesPage from "@/pages/ConfiguracoesPage";
import ComplementosPage from "@/pages/ComplementosPage";
import PerguntasPage from "@/pages/PerguntasPage";
import CampanhasPage from "@/pages/CampanhasPage";
import FidelidadePage from "@/pages/FidelidadePage";
import AreasEntregaPage from "@/pages/AreasEntregaPage";
import EntregadoresPage from "@/pages/EntregadoresPage";
import RelatorioEntregasPage from "@/pages/RelatorioEntregasPage";
import MarketplacesPage from "@/pages/MarketplacesPage";
import WhatsappPage from "@/pages/WhatsappPage";
import PagamentosPage from "@/pages/PagamentosPage";
import UsuariosPage from "@/pages/UsuariosPage";
import LocalPreparoPage from "@/pages/LocalPreparoPage";
import CannaliServerPage from "@/pages/CannaliServerPage";
import TokensPage from "@/pages/TokensPage";
import GruposEconomicosPage from "@/pages/GruposEconomicosPage";
import MarcasPage from "@/pages/MarcasPage";
import LojasPage from "@/pages/LojasPage";
import AuthPage from "@/pages/AuthPage";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import PromocoesPage from "@/pages/PromocoesPage";
import Analytics from "@/pages/Analytics";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><DashboardLayout><Index /></DashboardLayout></ProtectedRoute>} />
        <Route path="/campanhas" element={<ProtectedRoute><DashboardLayout><CampanhasPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/cupons" element={<ProtectedRoute><DashboardLayout><CuponsPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/promocoes" element={<ProtectedRoute><DashboardLayout><PromocoesPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/lojas" element={<ProtectedRoute><DashboardLayout><LojasPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/grupos-economicos" element={<ProtectedRoute><DashboardLayout><GruposEconomicosPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/marcas" element={<ProtectedRoute><DashboardLayout><MarcasPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/mercadoria" element={<ProtectedRoute><DashboardLayout><MercadoriaPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/membros" element={<ProtectedRoute><DashboardLayout><MembrosPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/complementos" element={<ProtectedRoute><DashboardLayout><ComplementosPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/perguntas" element={<ProtectedRoute><DashboardLayout><PerguntasPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/fidelidade" element={<ProtectedRoute><DashboardLayout><FidelidadePage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/areas-entrega" element={<ProtectedRoute><DashboardLayout><AreasEntregaPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/entregadores" element={<ProtectedRoute><DashboardLayout><EntregadoresPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/relatorio-entregas" element={<ProtectedRoute><DashboardLayout><RelatorioEntregasPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/marketplaces" element={<ProtectedRoute><DashboardLayout><MarketplacesPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/whatsapp" element={<ProtectedRoute><DashboardLayout><WhatsappPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/pagamentos" element={<ProtectedRoute><DashboardLayout><PagamentosPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/minha-conta" element={<ProtectedRoute><DashboardLayout><MinhaContaPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/usuarios" element={<ProtectedRoute><DashboardLayout><UsuariosPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/imagens" element={<ProtectedRoute><DashboardLayout><ImagensPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/local-preparo" element={<ProtectedRoute><DashboardLayout><LocalPreparoPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/cannoli-server" element={<ProtectedRoute><DashboardLayout><CannaliServerPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/tokens" element={<ProtectedRoute><DashboardLayout><TokensPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><DashboardLayout><Analytics /></DashboardLayout></ProtectedRoute>} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/canais-vendas" element={<ProtectedRoute><DashboardLayout><CanaisVendasPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/aplicativos" element={<ProtectedRoute><DashboardLayout><AplicativosPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/configuracoes" element={<ProtectedRoute><DashboardLayout><ConfiguracoesPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/relatorios" element={<ProtectedRoute><DashboardLayout><RelatoriosPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/catalogo" element={<ProtectedRoute><DashboardLayout><CatalogoPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
