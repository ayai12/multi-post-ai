import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Zap, Users, TrendingUp } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      id: "launch-story",
      title: "Why I Built AI Content Repurposer as a Solo Developer",
      excerpt: "The story behind creating a tool that saves content creators hours every week, and why I chose to build it as a bootstrapped solo project.",
      date: "2025-01-16",
      readTime: "5 min read",
      category: "Story",
      featured: true
    },
    {
      id: "content-strategy",
      title: "The 1-to-10 Content Strategy: Turn One Post Into 10 Pieces",
      excerpt: "A proven framework for maximizing your content's reach across all platforms without burning out or losing your authentic voice.",
      date: "2025-01-15",
      readTime: "8 min read",
      category: "Strategy"
    },
    {
      id: "platform-guide",
      title: "Platform-Specific Content: What Works Where and Why",
      excerpt: "Deep dive into how Twitter threads, LinkedIn posts, and Instagram captions each require different approaches for maximum engagement.",
      date: "2025-01-14",
      readTime: "6 min read",
      category: "Guide"
    },
    {
      id: "ai-writing-tips",
      title: "5 Ways to Make AI-Generated Content Sound More Human",
      excerpt: "Practical tips for editing AI outputs to maintain your unique voice while saving time on content creation.",
      date: "2025-01-13",
      readTime: "4 min read",
      category: "Tips"
    }
  ];

  const upcomingTopics = [
    "Building in Public: Monthly Revenue Updates",
    "Content Creator Interviews: How They Scale",
    "Technical Deep Dive: How the AI Actually Works",
    "Community Spotlight: Success Stories",
    "Roadmap Updates: What's Coming Next"
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Blog & Updates
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Behind-the-scenes insights, content strategy tips, and product updates 
              from a solo developer building for the creator community.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="container max-w-6xl">
            <div className="mb-8">
              <Badge variant="secondary" className="mb-4">Featured Post</Badge>
              <Card className="overflow-hidden border-2 border-primary/20">
                <div className="md:flex">
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        January 16, 2025
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        5 min read
                      </div>
                      <Badge variant="outline">Story</Badge>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">
                      Why I Built AI Content Repurposer as a Solo Developer
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      The story behind creating a tool that saves content creators hours every week, 
                      and why I chose to build it as a bootstrapped solo project instead of raising VC funding.
                    </p>
                    <Button variant="cta">
                      Read Full Story
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  <div className="md:w-1/3 bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <Zap className="h-16 w-16 text-primary mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        From idea to 1000+ users in 3 months
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-6xl">
            <h2 className="text-3xl font-bold mb-8">Recent Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(1).map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <Button variant="ghost" size="sm">
                        Read More
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What's Coming Next</h2>
              <p className="text-muted-foreground">
                Topics I'm working on for upcoming posts. Got suggestions? 
                <a href="https://x.com/ReinwatashiDev" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  Let me know on Twitter!
                </a>
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingTopics.map((topic, index) => (
                <Card key={index} className="p-4 bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm font-medium">{topic}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-primary/5">
          <div className="container max-w-3xl text-center">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Join 500+ Creators</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold">Stay Updated</h2>
              <p className="text-lg text-muted-foreground">
                Follow my journey building AI Content Repurposer, get content strategy tips, 
                and be the first to know about new features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="cta" size="lg">
                  <a href="https://x.com/ReinwatashiDev" target="_blank" rel="noopener noreferrer">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Follow on Twitter
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/#toolUI">Try the Tool</a>
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

export default Blog;
