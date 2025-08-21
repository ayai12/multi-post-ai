import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import SEO from "@/components/seo/SEO";
import { SITE } from "@/lib/seo";

const CaseStudies = () => {
  return (
    <>
      <SEO
        title="Case studies | Content repurposing for creators"
        description="Real examples of content repurposing for creators: repurpose blog posts into social media, turn scripts into tweets & LinkedIn posts, and repurpose newsletters for social—saving time with platform‑ready posts."
        keywords={[
          "Content repurposing for creators",
          "Repurpose blog posts into social media",
          "Turn scripts into tweets and LinkedIn posts",
          "Repurpose newsletters for social media",
          "Save time creating platform-ready posts",
        ]}
        canonical={`${SITE.url}/case-studies`}
        og={{ type: "website", url: `${SITE.url}/case-studies`, image: SITE.defaultImage, siteName: SITE.name }}
        twitter={{ card: "summary_large_image", image: SITE.defaultImage, site: SITE.twitter, creator: SITE.twitter }}
      />
      <Navbar />
      <main className="container pt-24 pb-16 space-y-12">
        <header className="space-y-3 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Case studies</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proof that consistency compounds. Early users save hours and grow faster.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-6">
          <article className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Newsletter writer → 2x platform reach</h3>
            <p className="text-sm text-muted-foreground">Turned each issue into 12 posts across X & LinkedIn. Saved ~5 hours/week.</p>
          </article>
          <article className="rounded-xl border p-6 space-y-2">
            <h3 className="font-semibold">Podcaster → consistent weekly clips</h3>
            <p className="text-sm text-muted-foreground">Converted transcripts into quotes and teasers, increasing listens and signups.</p>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CaseStudies;
