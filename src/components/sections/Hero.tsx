import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="hero" className="pt-20 bg-background">
      <div className="container flex flex-col items-center py-12 lg:py-16">
        <div className="space-y-6 lg:space-y-8 text-center">
          <div className="mb-4">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Social-Ready in Seconds · Preserve Your Voice
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight">
            Turn One Newsletter, Podcast, or Blog Into 10+ Social Posts
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-center">
            Quick value prop: Repurpose turns your latest episode, issue, or article into platform‑ready posts in seconds. Keep your unique voice across Twitter/X, LinkedIn, Instagram and more. Your 24/7 personal copywriter—faster, affordable, and always on.
          </p>
          <ul className="text-center grid gap-2 text-sm text-muted-foreground max-w-2xl mx-auto">
            <li>• Keep your unique voice while adapting length and style per platform</li>
            <li>• Save hours every week with platform‑aware formatting</li>
            <li>• Built for creators, solo founders, and content teams</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="xl" asChild className="text-base px-8 py-4 group">
              <a href="#toolUI" className="flex items-center gap-2">
                Try it free — repurpose your latest episode or issue in seconds
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </Button>
          </div>
        </div>
        {/* Removed preview mock panels for a cleaner, centered hero */}
      </div>
    </section>
  );
};

export default Hero;