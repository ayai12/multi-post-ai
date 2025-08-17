import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import { Helmet } from "react-helmet-async";

const Features = () => {
  return (
    <>
      <Helmet>
        <title>Features | Content repurposing for creators</title>
        <meta
          name="description"
          content="Purpose-built features for content repurposing for creators. Repurpose blog posts into social media, turn scripts into tweets & LinkedIn posts, and repurpose newsletters for social—while preserving your voice."
        />
        <meta
          name="keywords"
          content="Content repurposing for creators, Repurpose blog posts into social media, Turn scripts into tweets and LinkedIn posts, Repurpose newsletters for social media, Save time creating platform-ready posts"
        />
        <link rel="canonical" href="https://repurpose.cc/features" />
      </Helmet>
      <Navbar />
      <main className="container pt-24 pb-16 space-y-12">
        <header className="space-y-3 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Features built for creators</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Repurpose.cc instantly turns long‑form content into 10+ posts tailored for each platform while preserving your unique voice.
          </p>
        </header>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Multi‑platform output</h3>
            <p className="text-sm text-muted-foreground">Generate ready‑to‑post content for X, LinkedIn, Instagram and more from a single source.</p>
          </div>
          <div className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Voice preservation</h3>
            <p className="text-sm text-muted-foreground">Purpose‑built prompts to keep your tone authentic—not robotic.</p>
          </div>
          <div className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Instant scale</h3>
            <p className="text-sm text-muted-foreground">10+ posts per input so your content drives engagement across channels in minutes.</p>
          </div>
          <div className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Creator‑first pricing</h3>
            <p className="text-sm text-muted-foreground">Free plan to try. Pro from €5/month. Business adds scheduling & analytics.</p>
          </div>
          <div className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Time savings</h3>
            <p className="text-sm text-muted-foreground">Save ~5 hours/week by eliminating manual repurposing and formatting.</p>
          </div>
          <div className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Consistent presence</h3>
            <p className="text-sm text-muted-foreground">Stay active without burnout with reliable, repeatable output.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Features;
