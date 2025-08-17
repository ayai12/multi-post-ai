import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-repurposer.jpg";

const Hero = () => {
  return (
    <section id="hero" className="pt-20 bg-background">
      <div className="container grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-16">
        <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
          <div className="mb-4">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Social-Ready in Seconds
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight">
            Transform Any Content Into Revenue-Driving Assets
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Turn any text (articles, transcripts, newsletters) into 10+ posts for Twitter, LinkedIn, and more—instantly. AI that repurposes your content while keeping your voice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="cta" size="xl" asChild className="text-base px-8 py-4 group">
              <a href="#toolUI" className="flex items-center gap-2">
                Start Repurposing
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-base px-6 py-3 group">
              <a href="#pricing" className="flex items-center gap-2">
                View Pricing
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </Button>
          </div>
        </div>
        <div className="relative order-first lg:order-last">
          <div className="relative bg-muted/30 rounded-2xl p-4 lg:p-6 border border-border">
            <img
              src={heroImage}
              alt="AI Content Repurposer dashboard preview showing multiple social outputs"
              loading="lazy"
              className="w-full rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;