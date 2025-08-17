import { ClipboardList, SlidersHorizontal, Wand2, Share2 } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="bg-background/50 border-y border-border">
      <div className="container py-14 lg:py-20 grid gap-8">
        <header className="space-y-3 text-center">
          <span className="inline-block text-xs px-3 py-1 rounded-full border bg-background">4 simple steps</span>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">How it works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">From long‑form to platform‑ready in minutes.</p>
        </header>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <li className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <ClipboardList className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Step 1 — Input</h3>
                <p className="text-muted-foreground">Paste transcript, issue, or article — or connect your source.</p>
              </div>
            </div>
          </li>
          <li className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <SlidersHorizontal className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Step 2 — Choose</h3>
                <p className="text-muted-foreground">Pick platforms (X, LinkedIn, IG) and tone (pro, witty, concise).</p>
              </div>
            </div>
          </li>
          <li className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Wand2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Step 3 — Generate</h3>
                <p className="text-muted-foreground">Length, hashtags and structure adapted per platform.</p>
              </div>
            </div>
          </li>
          <li className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Share2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Step 4 — Publish</h3>
                <p className="text-muted-foreground">Copy, export, or batch. Schedule to your tools.</p>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default HowItWorksSection;
