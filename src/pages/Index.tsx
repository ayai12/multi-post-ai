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
import SEO from "@/components/seo/SEO";
import { SITE, createSoftwareAppJsonLd, createWebsiteJsonLd } from "@/lib/seo";
const Index = () => {
  return (
    <>
      <SEO
        title="Repurpose.cc — Turn Blogs & Newsletters Into Social Posts with AI"
        description="Convert long-form content into channel-ready social posts in seconds. Save time, stay consistent, and grow reach with Repurpose.cc."
        keywords={[
          "AI content repurposing tool",
          "Repurpose content for social media",
          "Automated social media posts",
          "Blog to social media posts AI",
          "Save time creating social media content",
        ]}
        canonical={`${SITE.url}/`}
        og={{
          type: "website",
          title: "Repurpose.cc — Turn Blogs & Newsletters Into Social Posts with AI",
          description:
            "Convert long-form content into channel-ready social posts in seconds.",
          url: SITE.url,
          image: SITE.defaultImage,
          siteName: SITE.name,
        }}
        twitter={{
          card: "summary_large_image",
          title: "Repurpose.cc — Turn Blogs & Newsletters Into Social Posts with AI",
          description:
            "Convert long-form content into channel-ready social posts in seconds.",
          image: SITE.defaultImage,
          site: SITE.twitter,
          creator: SITE.twitter,
        }}
        jsonLd={[
          createWebsiteJsonLd({ potentialAction: true }),
          createSoftwareAppJsonLd({
            offers: { price: "0", priceCurrency: "USD", url: `${SITE.url}/pricing` },
          }),
        ]}
      />
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