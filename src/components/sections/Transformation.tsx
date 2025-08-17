import { Rocket, Sparkles, CheckCircle2, Repeat } from "lucide-react";

const Transformation = () => {
  return (
    <section className="bg-background">
      <div className="container py-14 lg:py-20 grid gap-8">
        <header className="space-y-3 text-center">
          <span className="inline-block text-xs px-3 py-1 rounded-full border bg-background">What changes</span>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">The transformation</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">From scattered effort to consistent, authentic output.</p>
        </header>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <li className="rounded-xl border p-5 text-sm hover:shadow-sm transition-shadow bg-background">
            <div className="flex items-start gap-3">
              <Rocket className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-muted-foreground">Publish more with less effort — save hours every week.</p>
            </div>
          </li>
          <li className="rounded-xl border p-5 text-sm hover:shadow-sm transition-shadow bg-background">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-muted-foreground">Preserve your unique style at scale across all platforms.</p>
            </div>
          </li>
          <li className="rounded-xl border p-5 text-sm hover:shadow-sm transition-shadow bg-background">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-muted-foreground">Platform‑ready copy tailored to each audience.</p>
            </div>
          </li>
          <li className="rounded-xl border p-5 text-sm hover:shadow-sm transition-shadow bg-background">
            <div className="flex items-start gap-3">
              <Repeat className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-muted-foreground">Quick tests of tone and format help you dial in what works.</p>
            </div>
          </li>
          <li className="rounded-xl border p-5 text-sm hover:shadow-sm transition-shadow bg-background">
            <div className="flex items-start gap-3">
              <Rocket className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-muted-foreground">Reuse winning formats to grow reach and engagement consistently.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Transformation;
