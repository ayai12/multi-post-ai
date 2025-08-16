import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatarJane from "@/assets/avatar-jane.jpg";
import avatarMark from "@/assets/avatar-mark.jpg";
import avatarAisha from "@/assets/avatar-aisha.jpg";

const testimonials = [
  { avatar: avatarJane, name: "Sarah Chen", role: "Tech Blogger", text: "I was spending 3+ hours turning each blog post into social content. Now it takes me 10 minutes to get drafts for Twitter, LinkedIn, and Instagram. Game changer for solo creators." },
  { avatar: avatarMark, name: "Marcus Rivera", role: "YouTube Creator", text: "Finally, a tool that gets platform differences. The Twitter threads actually sound like threads, not chopped-up blog posts. Worth every penny of the Pro plan." },
  { avatar: avatarAisha, name: "Priya Patel", role: "Newsletter Writer", text: "As someone who publishes weekly, this tool is a lifesaver. I paste my newsletter, get 5 different social posts, and my engagement has doubled. The solo dev really understands creators." },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-muted/50">
      <div className="container py-16 lg:py-20">
        <header className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold">Trusted by 1000+ Solo Creators</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Real feedback from creators who've reclaimed their time</p>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <Card key={t.name} className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-0 bg-background/80 backdrop-blur">
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={t.avatar} alt={`${t.name} avatar`} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">{t.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-lg">{t.name}</div>
                    <div className="text-sm text-muted-foreground font-medium">{t.role}</div>
                  </div>
                </div>
                <blockquote className="text-muted-foreground leading-relaxed italic">
                  "{t.text}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;