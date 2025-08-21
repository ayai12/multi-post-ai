import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import SEO from "@/components/seo/SEO";
import { SITE } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Zap, Heart, Code } from "lucide-react";

const About = () => {
  return (
    <>
      <SEO
        title="About | Built by a solo developer for creators | Repurpose.cc"
        description="The story behind Repurpose.cc — a lightweight, affordable repurposing tool built by a solo developer for creators who want to ship more in less time."
        keywords={["about repurpose.cc","solo developer","creator-first","content repurposing tool"]}
        canonical={`${SITE.url}/about`}
        og={{ type: "website", url: `${SITE.url}/about`, image: SITE.defaultImage, siteName: SITE.name }}
        twitter={{ card: "summary_large_image", image: SITE.defaultImage, site: SITE.twitter, creator: SITE.twitter }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container max-w-4xl">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Built by a Solo Developer Who Gets It
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Hi, I'm the creator behind AI Content Repurposer. As a solo developer and content creator myself, 
                I built this tool to solve my own biggest pain point: turning one piece of content into multiple formats without losing my voice.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">The Problem I Faced</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Like many creators, I was spending 80% of my time repurposing content and only 20% creating it. 
                    I'd write a blog post, then manually craft tweets, LinkedIn posts, Instagram captions—the same ideas, 
                    different formats, hours of work.
                  </p>
                  <p>
                    Existing tools were either too expensive, too generic, or required complex setups. 
                    I needed something simple, affordable, and that understood the nuances of different platforms.
                  </p>
                </div>
              </div>
              <Card className="p-6 bg-muted/50">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-4">
                    <Code className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold">Built with Care</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Every feature in this app exists because I needed it myself. No bloat, no unnecessary complexity—
                    just the tools that actually help creators save time and grow their audience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">What Drives This Project</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <CardContent className="p-0 space-y-4">
                  <Zap className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Speed Over Perfection</h3>
                  <p className="text-sm text-muted-foreground">
                    Get 80% of the way there in 2 minutes, not 100% in 2 hours. 
                    Perfect is the enemy of published.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0 space-y-4">
                  <Heart className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Creator-First</h3>
                  <p className="text-sm text-muted-foreground">
                    Built by a creator, for creators. Every decision prioritizes 
                    your workflow and creative process.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0 space-y-4">
                  <Twitter className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Community Driven</h3>
                  <p className="text-sm text-muted-foreground">
                    Your feedback shapes the roadmap. Follow my journey and 
                    suggest features on Twitter.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Personal Touch */}
        <section className="py-16">
          <div className="container max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-6">Why This Matters to Me</h2>
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg">
                As a solo developer, I don't have a marketing team or endless resources. 
                What I do have is the same challenges you face: limited time, the need to be everywhere online, 
                and the pressure to constantly create fresh content.
              </p>
              <p className="text-lg">
                This tool is my way of giving back to the creator community while building something sustainable. 
                Every feature request, every bug report, every success story motivates me to keep improving it.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="cta" size="lg">
                <a href="/#toolUI">Try It Free</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://x.com/ReinwatashiDev" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4 mr-2" />
                  Follow My Journey
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
