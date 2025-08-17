import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-repurposer.jpg";

const Hero = () => {
  return (
    <section id="hero" className="pt-20 bg-background">
      <div className="container grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-16">
        <div className="space-y-6 lg:space-y-8 animate-fade-in text-center lg:text-left">
          <div className="mb-4">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Built by a Solo Creator, For Creators
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight">
            Stop Spending 80% of Your Time Repurposing Content
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Turn one blog post into 10 social media posts in under 2 minutes. 
            Built by a solo developer who understands the creator struggle—because I live it too.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="cta" size="xl" asChild className="text-base px-8 py-4 group">
              <a href="#toolUI" className="flex items-center gap-2">
                Try It Free (No Signup Required)
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-base px-6 py-3 group">
              <a href="https://x.com/ReinwatashiDev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Follow My Journey
                <span className="group-hover:scale-110 transition-transform duration-200">👀</span>
              </a>
            </Button>
          </div>
        </div>
        <div className="relative order-first lg:order-last">
          <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-4 lg:p-6">
            <img
              src={heroImage}
              alt="AI Content Repurposer dashboard preview showing multiple social outputs"
              loading="lazy"
              className="w-full rounded-xl shadow-2xl animate-float"
            />
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary/60 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-secondary/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;