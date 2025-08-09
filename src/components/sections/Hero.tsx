import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-repurposer.jpg";

const Hero = () => {
  return (
    <section id="hero" className="pt-20 bg-background">
      <div className="container grid md:grid-cols-2 gap-10 items-center py-14">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            AI Content Repurposing Tool — Turn Blogs into Social Posts
          </h1>
          <p className="text-lg text-muted-foreground max-w-prose">
            For bloggers, YouTubers, podcasters, and marketers—repurpose content into multi-platform posts in seconds.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="cta" size="xl" asChild>
              <a href="#toolUI">Repurpose Content Now</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#pricing">View Pricing</a>
            </Button>
          </div>
        </div>
        <div className="relative">
          <img
            src={heroImage}
            alt="AI Content Repurposer dashboard preview showing multiple social outputs"
            loading="lazy"
            className="w-full rounded-lg shadow-[var(--shadow-soft)] animate-float"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;