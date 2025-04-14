
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
          <Route path="/aplicativos" element={<DashboardLayout><AplicativosPage /></DashboardLayout>} />
          <Route path="/canais-de-vendas" element={<DashboardLayout><CanaisVendasPage /></DashboardLayout>} />
          <Route path="/relatorios" element={<DashboardLayout><RelatoriosPage /></DashboardLayout>} />
          <Route path="/configuracoes" element={<DashboardLayout><ConfiguracoesPage /></DashboardLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
