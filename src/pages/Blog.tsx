import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog — Content Repurposing, Tools, and Strategies | Repurpose.cc</title>
        <meta
          name="description"
          content="Read SEO-optimized guides on repurpose.io alternatives, how to repurpose content in seconds, and the best tools for solo creators. Learn how Repurpose.cc saves hours and scales your content."
        />
        <link rel="canonical" href="https://repurpose.cc/blog" />
        <meta name="keywords" content="repurpose.io alternative, repurpose.io competitors, best repurposing tool, content repurposing, reuse content quickly, repurpose content tool, content marketing tools, AI content tools, tools for creators" />
      </Helmet>

      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Intro */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Repurpose.cc Blog</h1>
            <p className="text-lg text-muted-foreground">
              Practical, no-fluff articles for solo founders, marketers, and creators. Learn how to repurpose content, evaluate tools, and scale distribution—without losing your voice.
            </p>
          </div>
        </section>

        {/* Blog List */}
        <section className="py-12">
          <div className="container max-w-5xl grid md:grid-cols-3 gap-6">
            <Link to="/blog/repurpose-io-alternatives" className="block rounded-lg border p-6 hover:shadow-md transition">
              <h2 className="text-xl font-semibold">Repurpose.io Alternatives (2025)</h2>
              <p className="mt-2 text-muted-foreground">Compare competitors and see why Repurpose.cc is the lightweight, affordable choice for creators.</p>
              <p className="mt-3 text-sm text-primary">Read article →</p>
            </Link>

            <Link to="/blog/how-to-repurpose-content" className="block rounded-lg border p-6 hover:shadow-md transition">
              <h2 className="text-xl font-semibold">How to Repurpose Content in Seconds</h2>
              <p className="mt-2 text-muted-foreground">Step-by-step guide to reuse content quickly across X, LinkedIn, and Instagram.</p>
              <p className="mt-3 text-sm text-primary">Read article →</p>
            </Link>

            <Link to="/blog/tools-for-creators-2025" className="block rounded-lg border p-6 hover:shadow-md transition">
              <h2 className="text-xl font-semibold">Best Tools for Solo Creators (2025)</h2>
              <p className="mt-2 text-muted-foreground">A lean stack of content marketing tools and AI content tools to scale output.</p>
              <p className="mt-3 text-sm text-primary">Read article →</p>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
