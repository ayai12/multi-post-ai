import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import PricingPage from "./app/Pricing/pricing";
import Features from "./pages/Features";
import UseCases from "./pages/UseCases";
import HowItWorks from "./pages/HowItWorks";
import CaseStudies from "./pages/CaseStudies";
import Alternatives from "./pages/Alternatives";
import RepurposeIoAlternatives from "./pages/blog/RepurposeIoAlternatives";
import HowToRepurposeFast from "./pages/blog/HowToRepurposeFast";
import ToolsForCreators2025 from "./pages/blog/ToolsForCreators2025";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/repurpose-io-alternatives" element={<RepurposeIoAlternatives />} />
          <Route path="/blog/how-to-repurpose-content" element={<HowToRepurposeFast />} />
          <Route path="/blog/tools-for-creators-2025" element={<ToolsForCreators2025 />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/alternatives" element={<Alternatives />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
