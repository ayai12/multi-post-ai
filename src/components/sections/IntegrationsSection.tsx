import { Globe, Calendar, Zap, FileText, Database } from "lucide-react";

const IntegrationsSection = () => {
  return (
    <section id="integrations" className="bg-background/50 border-y border-border">
      <div className="container py-14 lg:py-20 grid gap-8">
        <header className="space-y-3 text-center">
          <span className="inline-block text-xs px-3 py-1 rounded-full border bg-background">Fits your stack</span>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Integrations</h2>
          <p className="text-muted-foreground">Meet your stack where it is</p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Platform reach</h3>
                <p className="text-muted-foreground">Native support for X, LinkedIn, Facebook, Instagram and more.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Scheduling / export</h3>
                <p className="text-muted-foreground">Push posts to Buffer, Hootsuite, or export for newsletters.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Automations</h3>
                <p className="text-muted-foreground">Zapier and API access for teams and custom workflows.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Show notes & newsletters</h3>
                <p className="text-muted-foreground">Export to Substack, Mailchimp, or your preferred editor.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Database className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Data & drafts</h3>
                <p className="text-muted-foreground">Cloud syncing with version history to track changes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
