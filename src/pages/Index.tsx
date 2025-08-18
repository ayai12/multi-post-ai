import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import ProblemAgitation from "@/components/sections/ProblemAgitation";
import Transformation from "@/components/sections/Transformation";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import IntegrationsSection from "@/components/sections/IntegrationsSection";
import ToolUI from "@/components/sections/ToolUI";
import Testimonials from "@/components/sections/Testimonials";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/sections/Footer";
import PricingPage from "@/app/Pricing/pricing";
import { Helmet } from "react-helmet-async";
const Index = () => {
  return (
    <>
      <Helmet>
        <title>Turn Long‑Form Into 10+ Social Posts in Seconds | Repurpose</title>
        <meta
          name="description"
          content="Repurpose your newsletters, podcasts and blogs into platform‑ready posts in seconds. Keep your voice, save hours each week, and stay consistent across X, LinkedIn and Instagram."
        />
        <meta
          name="keywords"
          content="Content repurposing for creators, Repurpose blog posts into social media, Turn scripts into tweets and LinkedIn posts, AI tool to repurpose content instantly, Repurpose newsletters for social media, Save time creating platform-ready posts"
        />
        <link rel="canonical" href="https://repurpose.cc/" />
      </Helmet>
      <Navbar />
      <main>
        <Hero />
       
        <ToolUI />
        <section id="pricing">
          <PricingPage />
        </section>
        <Testimonials />
        <ProblemAgitation />
        <Transformation />
        <HowItWorksSection />
        <UseCasesSection />
        <FeaturesSection />
        {/* <IntegrationsSection /> */}
        <FAQSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;