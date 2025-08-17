import { Quote, Layout, Scissors, Layers, Edit3 } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-background">
      <div className="container py-14 lg:py-20 grid gap-8">
        <header className="space-y-3 text-center">
          <span className="inline-block text-xs px-3 py-1 rounded-full border bg-background">Built for creators</span>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Features</h2>
          <p className="text-muted-foreground">Purpose-built to keep your voice while scaling output</p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Quote className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Voice retention</h3>
                <p className="text-muted-foreground">Brand voice library keeps style consistent across channels.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Layout className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Platform‑aware formatting</h3>
                <p className="text-muted-foreground">Length, structure, hashtags and CTAs adapted per platform.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Scissors className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">One‑click length adaptation</h3>
                <p className="text-muted-foreground">Automatically trim or expand content for each channel.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Layers className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Batch processing</h3>
                <p className="text-muted-foreground">Convert multiple items in one go to save time.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Edit3 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">In‑app editing & variants</h3>
                <p className="text-muted-foreground">Tweak and re‑generate to find your best performing copy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
