import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import ToolUI from "@/components/sections/ToolUI";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";
import PricingPage from "@/app/Pricing/pricing";
const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ToolUI />
        <section id="pricing">
          <PricingPage />
        </section>
        <Testimonials />
      </main>
      <Footer />
    </>
  );
};

export default Index;