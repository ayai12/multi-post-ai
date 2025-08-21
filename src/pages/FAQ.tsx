import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";
import SEO from "@/components/seo/SEO";
import { SITE, createFAQPageJsonLd } from "@/lib/seo";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const faqs = [
    {
      id: "what-is-it",
      question: "What exactly does AI Content Repurposer do?",
      answer: "It takes your long-form content (blog posts, transcripts, articles) and instantly transforms it into multiple social media formats like tweet threads, LinkedIn posts, Instagram captions, and summaries. Think of it as having a personal content assistant that understands each platform's unique style."
    },
    {
      id: "how-accurate",
      question: "How accurate is the AI? Will it capture my voice?",
      answer: "The AI is trained to maintain your content's core message while adapting to each platform's best practices. You can choose between Professional, Casual, or Witty tones. While it won't be 100% perfect, it gives you a solid 80% foundation that you can quickly polish—saving hours of work."
    },
    {
      id: "free-vs-pro",
      question: "What's the difference between Free and Pro plans?",
      answer: "Free gives you 5 repurposes per month with access to basic formats (tweets, summaries, LinkedIn posts) and 1 format per request. Pro unlocks unlimited usage, all premium formats (viral threads, quote cards, email newsletters), multiple formats per request, and higher input limits (10,000 words vs 2,000)."
    },
    {
      id: "content-types",
      question: "What types of content work best?",
      answer: "Any text-based content works great: blog posts, podcast transcripts, video scripts, newsletters, case studies, or even meeting notes. The longer and more detailed your input, the better the AI can extract key insights for different formats. Aim for at least 500 words for best results."
    },
    {
      id: "data-privacy",
      question: "Is my content safe and private?",
      answer: "Yes. Your content is processed securely and not stored permanently. We use industry-standard encryption and don't train our AI models on your data. Your content is your intellectual property, and we respect that completely."
    },
    {
      id: "editing-needed",
      question: "Do I still need to edit the outputs?",
      answer: "Think of the outputs as high-quality first drafts. They'll capture your main points and adapt them for each platform, but you'll likely want to add your personal touch, adjust specific details, or tweak the tone. Most users spend 2-3 minutes editing vs. 20-30 minutes writing from scratch."
    },
    {
      id: "platform-specific",
      question: "How does it know the rules for each platform?",
      answer: "The AI is trained on platform-specific best practices: Twitter's character limits and thread structure, LinkedIn's professional tone, Instagram's visual-first approach, etc. It automatically adjusts length, style, and formatting for each platform's unique audience and algorithm preferences."
    },
    {
      id: "bulk-processing",
      question: "Can I process multiple pieces of content at once?",
      answer: "Currently, you process one piece of content at a time, but you can select multiple output formats in a single request (Pro plan). This approach ensures each piece gets the focused attention it deserves rather than generic batch processing."
    },
    {
      id: "refunds",
      question: "What's your refund policy?",
      answer: "We offer a 7-day money-back guarantee on Pro subscriptions. If you're not satisfied with the quality or find it doesn't fit your workflow, just reach out and we'll process a full refund, no questions asked."
    },
    {
      id: "roadmap",
      question: "What new features are coming?",
      answer: "I'm constantly improving based on user feedback! Upcoming features include: custom tone training, team collaboration, direct social media scheduling, and more platform formats. Follow @ReinwatashiDev on Twitter for the latest updates and to influence the roadmap."
    }
  ];

  return (
    <>
      <SEO
        title="FAQ | Repurpose.cc"
        description="Answers about AI content repurposing, voice preservation, plans, data privacy, and workflows. Learn how Repurpose.cc converts long-form into platform-ready posts."
        keywords={["AI content repurposing FAQ","repurpose content","privacy","plans","workflows"]}
        canonical={`${SITE.url}/faq`}
        og={{ type: "website", url: `${SITE.url}/faq`, image: SITE.defaultImage, siteName: SITE.name }}
        twitter={{ card: "summary_large_image", image: SITE.defaultImage, site: SITE.twitter, creator: SITE.twitter }}
        jsonLd={[
          createFAQPageJsonLd(
            faqs.map(f => ({ question: f.question, answer: f.answer }))
          ),
        ]}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about AI Content Repurposer. 
              Can't find what you're looking for? Reach out on Twitter!
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.id} className="overflow-hidden">
                  <Collapsible 
                    open={openItems[faq.id]} 
                    onOpenChange={() => toggleItem(faq.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardTitle className="text-left flex items-center justify-between text-lg">
                          {faq.question}
                          <ChevronDown 
                            className={`h-5 w-5 transition-transform ${
                              openItems[faq.id] ? 'rotate-180' : ''
                            }`} 
                          />
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-3xl text-center">
            <div className="space-y-6">
              <MessageCircle className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-3xl font-bold">Still Have Questions?</h2>
              <p className="text-lg text-muted-foreground">
                I'm always happy to help! As a solo developer, I personally respond to every question and feature request.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="cta" size="lg">
                  <a href="/#toolUI">Try It Free First</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="https://x.com/ReinwatashiDev" target="_blank" rel="noopener noreferrer">
                    Ask on Twitter
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;
