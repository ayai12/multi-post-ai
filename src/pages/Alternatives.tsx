import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import SEO from "@/components/seo/SEO";
import { SITE } from "@/lib/seo";

const Alternatives = () => {
  return (
    <>
      <SEO
        title="Repurpose.cc Alternatives — Compare Repurposing Tools"
        description="Compare repurposing tools and see how Repurpose.cc stacks up on speed, voice preservation, and price. Find the best fit for creators and small teams."
        keywords={["repurpose.io alternative","repurposing tools","content repurposing","creator tools"]}
        canonical={`${SITE.url}/alternatives`}
        og={{ type: "website", url: `${SITE.url}/alternatives`, image: SITE.defaultImage, siteName: SITE.name }}
        twitter={{ card: "summary_large_image", image: SITE.defaultImage, site: SITE.twitter, creator: SITE.twitter }}
      />
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
