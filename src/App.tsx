import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import TelaInicial from "./pages/TelaInicial";
import Revisar from "./pages/Revisar";
import Estatisticas from "./pages/Estatisticas";
import Configuracoes from "./pages/Configuracoes";
import Ajuda from "./pages/Ajuda";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1">
              {/* Header with toggle button */}
              <header className="h-16 flex items-center border-b border-border bg-background px-6">
                <SidebarTrigger className="p-2 hover:bg-muted rounded-lg" />
                <h2 className="ml-4 text-lg font-semibold text-foreground">
                  Sistema Athena
                </h2>
              </header>
              
              <Routes>
                <Route path="/" element={<TelaInicial />} />
                <Route path="/revisar" element={<Revisar />} />
                <Route path="/estatisticas" element={<Estatisticas />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
                <Route path="/ajuda" element={<Ajuda />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
