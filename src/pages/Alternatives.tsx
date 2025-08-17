import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import { Helmet } from "react-helmet-async";

const Alternatives = () => {
  return (
    <>
      <Helmet>
        <title>Alternatives | Content repurposing for creators</title>
        <meta
          name="description"
          content="Compare alternatives for content repurposing for creators. Repurpose blog posts into social media, turn scripts into tweets & LinkedIn posts, and repurpose newsletters for social—AI tool to repurpose content instantly."
        />
        <meta
          name="keywords"
          content="Content repurposing for creators, Repurpose blog posts into social media, Turn scripts into tweets and LinkedIn posts, AI tool to repurpose content instantly, Repurpose newsletters for social media, Save time creating platform-ready posts"
        />
        <link rel="canonical" href="https://repurpose.cc/alternatives" />
      </Helmet>
      <Navbar />
      <main className="container pt-24 pb-16 space-y-12">
        <header className="space-y-3 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Repurpose.cc vs alternatives</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Not another generic AI writer. Built specifically for creators with existing long‑form content.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Niche focus</h3>
            <p className="text-sm text-muted-foreground">Optimized for newsletters, podcasts, and blogs—so outputs fit your context.</p>
          </div>
          <div className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Voice consistency</h3>
            <p className="text-sm text-muted-foreground">Emphasis on preserving your tone so posts feel authentically you.</p>
          </div>
          <div className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Instant output</h3>
            <p className="text-sm text-muted-foreground">10+ posts per source file for immediate cross‑platform publishing.</p>
          </div>
          <div className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Pricing that makes sense</h3>
            <p className="text-sm text-muted-foreground">Free to try. Pro from €5/month. Business adds scheduling & analytics.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Alternatives;
