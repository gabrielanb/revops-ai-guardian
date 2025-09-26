import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Dashboard from "./pages/Dashboard";
import ClientPricing from "./pages/ClientPricing";
import AIOptimization from "./pages/AIOptimization";
import DisputeResolution from "./pages/DisputeResolution";
import AdhocCharges from "./pages/AdhocCharges";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pricing" element={<ClientPricing />} />
            <Route path="/adhoc" element={<AdhocCharges />} />
            <Route path="/optimization" element={<AIOptimization />} />
            <Route path="/disputes" element={<DisputeResolution />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
