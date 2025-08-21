import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import SEO from "@/components/seo/SEO";
import { SITE, createHowToJsonLd } from "@/lib/seo";

const HowItWorks = () => {
  return (
    <>
      <SEO
        title="How It Works | Repurpose.cc"
        description="Paste your newsletter, podcast, or blog. Choose platforms. Generate 10+ platform-ready posts while preserving your voice."
        keywords={["AI content repurposing","how to repurpose content","repurpose blog to social"]}
        canonical={`${SITE.url}/how-it-works`}
        og={{ type: "website", url: `${SITE.url}/how-it-works`, image: SITE.defaultImage, siteName: SITE.name }}
        twitter={{ card: "summary_large_image", image: SITE.defaultImage, site: SITE.twitter, creator: SITE.twitter }}
        jsonLd={[
          createHowToJsonLd({
            name: "How to repurpose long-form content into social posts with Repurpose.cc",
            description: "Three simple steps to convert blogs, newsletters, and transcripts into channel-native posts.",
            steps: [
              "Paste your content (blog, newsletter, transcript)",
              "Choose platforms (X, LinkedIn, Instagram, etc.)",
              "Generate 10+ posts and refine tone, then publish",
            ],
          }),
        ]}
      />
      <Navbar />
      <main className="container pt-24 pb-16 space-y-12">
        <header className="space-y-3 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">How it works</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From long‑form to 10+ platform‑ready posts in three simple steps.
          </p>
        </header>

        <ol className="grid md:grid-cols-3 gap-6 list-decimal list-inside">
          <li className="rounded-xl border p-6">
            <h3 className="font-semibold mb-1">Paste your content</h3>
            <p className="text-sm text-muted-foreground">Newsletter issue, podcast transcript, or blog post—drop it in.</p>
          </li>
          <li className="rounded-xl border p-6">
            <h3 className="font-semibold mb-1">Choose platforms</h3>
            <p className="text-sm text-muted-foreground">Select X, LinkedIn, Instagram and more. We adapt to each format.</p>
          </li>
          <li className="rounded-xl border p-6">
            <h3 className="font-semibold mb-1">Generate & refine</h3>
            <p className="text-sm text-muted-foreground">Get 10+ posts in seconds. Tweak tone to match your voice, then publish.</p>
          </li>
        </ol>
      </main>
      <Footer />
    </>
  );
};

export default HowItWorks;
