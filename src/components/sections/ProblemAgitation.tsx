import { AlertTriangle, Clock, Megaphone } from "lucide-react";

const ProblemAgitation = () => {
  return (
    <section id="problem" className="bg-background/50 border-y border-border">
      <div className="container py-14 lg:py-20 grid gap-8">
        <header className="space-y-3 text-center">
          <span className="inline-block text-xs px-3 py-1 rounded-full border bg-background">Why this is hard</span>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">The problem</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Repurposing long‑form into daily posts is slow, manual, and often loses your voice.</p>
        </header>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <li className="rounded-xl border p-5 text-sm hover:shadow-sm transition-shadow bg-background">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-muted-foreground">Rewriting for every platform eats hours from your week.</p>
            </div>
          </li>
          <li className="rounded-xl border p-5 text-sm hover:shadow-sm transition-shadow bg-background">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-muted-foreground">Long‑form shrinks to awkward snippets — your voice gets diluted.</p>
            </div>
          </li>
          <li className="rounded-xl border p-5 text-sm hover:shadow-sm transition-shadow bg-background">
            <div className="flex items-start gap-3">
              <Megaphone className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-muted-foreground">Inconsistent posting hurts reach and engagement across channels.</p>
            </div>
          </li>
          <li className="rounded-xl border p-5 text-sm hover:shadow-sm transition-shadow bg-background">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-muted-foreground">Managing X, LinkedIn, newsletters and podcasts stays manual.</p>
            </div>
          </li>
          <li className="rounded-xl border p-5 text-sm hover:shadow-sm transition-shadow bg-background">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-muted-foreground">Hiring copywriters is slow and expensive for tight budgets.</p>
            </div>
          </li>
          <li className="rounded-xl border p-5 text-sm hover:shadow-sm transition-shadow bg-background">
            <div className="flex items-start gap-3">
              <Megaphone className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-muted-foreground">You need a fast, affordable way to scale posting without losing your voice.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProblemAgitation;
