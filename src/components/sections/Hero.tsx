import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-repurposer.jpg";

const Hero = () => {
  return (
    <section id="hero" className="pt-20 bg-background">
      <div className="container grid md:grid-cols-2 gap-10 items-center py-14">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Turn One Piece of Content Into 10x More
          </h1>
          <p className="text-lg text-muted-foreground max-w-prose">
            Paste your content and instantly get ready-to-use social posts, summaries, and more.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="cta" size="xl" asChild>
              <a href="#toolUI">Get Started Free</a>
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