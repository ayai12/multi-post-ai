import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import { Helmet } from "react-helmet-async";

const HowItWorks = () => {
  return (
    <>
      <Helmet>
        <title>How it works | Content repurposing for creators</title>
        <meta
          name="description"
          content="AI tool to repurpose content instantly: paste your newsletter, podcast or blog, choose platforms, and generate 10+ platform‑ready posts while preserving your voice. Save time creating platform‑ready posts."
        />
        <meta
          name="keywords"
          content="Content repurposing for creators, AI tool to repurpose content instantly, Repurpose newsletters for social media, Turn scripts into tweets and LinkedIn posts, Save time creating platform-ready posts"
        />
        <link rel="canonical" href="https://repurpose.cc/how-it-works" />
      </Helmet>
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
