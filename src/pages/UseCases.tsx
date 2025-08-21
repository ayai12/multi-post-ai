import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import SEO from "@/components/seo/SEO";
import { SITE } from "@/lib/seo";

const UseCases = () => {
  return (
    <>
      <SEO
        title="Use cases | Content repurposing for creators"
        description="Repurpose blog posts into social media, turn scripts into tweets & LinkedIn posts, and repurpose newsletters for social media. See how creators save time creating platform‑ready posts."
        keywords={[
          "Content repurposing for creators",
          "Repurpose blog posts into social media",
          "Turn scripts into tweets and LinkedIn posts",
          "Repurpose newsletters for social media",
          "Save time creating platform-ready posts",
        ]}
        canonical={`${SITE.url}/use-cases`}
        og={{ type: "website", url: `${SITE.url}/use-cases`, image: SITE.defaultImage, siteName: SITE.name }}
        twitter={{ card: "summary_large_image", image: SITE.defaultImage, site: SITE.twitter, creator: SITE.twitter }}
      />
      <Navbar />
      <main className="container pt-24 pb-16 space-y-12">
        <header className="space-y-3 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Use cases</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            How creators, newsletter writers and podcasters use Repurpose.cc to stay consistent across channels.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Newsletter to multi‑platform</h3>
            <p className="text-sm text-muted-foreground">Convert each issue into X threads, LinkedIn carousels, and Instagram captions in minutes.</p>
          </div>
          <div className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Podcast transcript to social</h3>
            <p className="text-sm text-muted-foreground">Turn highlights into pull‑quotes, teasers, and episode promos while keeping your voice.</p>
          </div>
          <div className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Blog to evergreen snippets</h3>
            <p className="text-sm text-muted-foreground">Extract insights and CTAs to fuel weeks of scheduled content without rewriting.</p>
          </div>
          <div className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Solo creator ops</h3>
            <p className="text-sm text-muted-foreground">Ship more in less time. Repurpose once, publish everywhere—stay top of mind.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default UseCases;
