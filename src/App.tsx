
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/minha-conta" element={<DashboardLayout><MinhaContaPage /></DashboardLayout>} />
          <Route path="/membros" element={<DashboardLayout><MembrosPage /></DashboardLayout>} />
          <Route path="/cupons" element={<DashboardLayout><CuponsPage /></DashboardLayout>} />
          <Route path="/mercadoria" element={<DashboardLayout><MercadoriaPage /></DashboardLayout>} />
          <Route path="/catalogo" element={<DashboardLayout><CatalogoPage /></DashboardLayout>} />
          <Route path="/imagens" element={<DashboardLayout><ImagensPage /></DashboardLayout>} />
          <Route path="/complementos" element={<DashboardLayout><ComplementosPage /></DashboardLayout>} />
          <Route path="/perguntas" element={<DashboardLayout><PerguntasPage /></DashboardLayout>} />
          <Route path="/campanhas" element={<DashboardLayout><CampanhasPage /></DashboardLayout>} />
          <Route path="/fidelidade" element={<DashboardLayout><FidelidadePage /></DashboardLayout>} />
          <Route path="/areas-entrega" element={<DashboardLayout><AreasEntregaPage /></DashboardLayout>} />
          <Route path="/entregadores" element={<DashboardLayout><EntregadoresPage /></DashboardLayout>} />
          <Route path="/relatorio-entregas" element={<DashboardLayout><RelatorioEntregasPage /></DashboardLayout>} />
          <Route path="/marketplaces" element={<DashboardLayout><MarketplacesPage /></DashboardLayout>} />
          <Route path="/whatsapp" element={<DashboardLayout><WhatsappPage /></DashboardLayout>} />
          <Route path="/pagamentos" element={<DashboardLayout><PagamentosPage /></DashboardLayout>} />
          <Route path="/usuarios" element={<DashboardLayout><UsuariosPage /></DashboardLayout>} />
          <Route path="/local-preparo" element={<DashboardLayout><LocalPreparoPage /></DashboardLayout>} />
          <Route path="/cannoli-server" element={<DashboardLayout><CannaliServerPage /></DashboardLayout>} />
          <Route path="/tokens" element={<DashboardLayout><TokensPage /></DashboardLayout>} />
          <Route path="/grupos-economicos" element={<DashboardLayout><GruposEconomicosPage /></DashboardLayout>} />
          <Route path="/marcas" element={<DashboardLayout><MarcasPage /></DashboardLayout>} />
          <Route path="/lojas" element={<DashboardLayout><LojasPage /></DashboardLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
