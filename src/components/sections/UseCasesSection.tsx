import { Mic, Mail, FileText, Video, Megaphone } from "lucide-react";

const UseCasesSection = () => {
  return (
    <section id="use-cases" className="bg-background">
      <div className="container py-14 lg:py-20 grid gap-8">
        <header className="space-y-3 text-center">
          <span className="inline-block text-xs px-3 py-1 rounded-full border bg-background">Where it shines</span>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Use cases</h2>
          <p className="text-muted-foreground">Turn long‑form into channel‑ready posts.</p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Mic className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Podcast content</h3>
                <p className="text-muted-foreground">Turn show notes and transcripts into threads, posts, and descriptions.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Newsletters & issues</h3>
                <p className="text-muted-foreground">Create social posts and cross‑post email‑friendly copy.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Blog articles</h3>
                <p className="text-muted-foreground">Extract hooks, quotes, and micro‑posts for social feeds.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Video className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Video transcripts</h3>
                <p className="text-muted-foreground">Produce captions, shorts, and prompt‑ready post text.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-5 bg-background hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Megaphone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Announcements & updates</h3>
                <p className="text-muted-foreground">Scale launches, events, and recaps across platforms.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
