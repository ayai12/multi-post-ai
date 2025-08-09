import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import ToolUI from "@/components/sections/ToolUI";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ToolUI />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
};

export default Index;