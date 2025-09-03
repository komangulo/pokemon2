import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SetSearch from "./pages/SetSearch";
import SetDetail from "./pages/SetDetail";
import CardDetail from "./pages/CardDetail";
import NotFound from "./pages/NotFound";
import TopPrices from "./pages/TopPrices";
import Auth from '@/pages/Auth';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/top-prices" element={<TopPrices />} />
          <Route path="/set-search" element={<SetSearch />} />
          <Route path="/set/:setId" element={<SetDetail />} />
          <Route path="/card/:cardId" element={<CardDetail />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
