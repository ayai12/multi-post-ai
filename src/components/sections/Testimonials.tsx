import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";
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
    <section id="testimonials" className="bg-gradient-to-br from-[#FDF7F2] to-[#FFF1E6] py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-yellow-700">Loved by creators</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#2E2E2E]">
            What Creators Are Saying
          </h2>
          <p className="text-xl text-[#5A5A5A] max-w-2xl mx-auto">
            Real feedback from creators who've reclaimed their time and grown their reach.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, index) => (
            <div key={t.name} className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B35] via-[#6A4C93] to-[#00A676] rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-sm"></div>
              <Card className="relative bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-[#FF6B35] mb-4 opacity-60" />
                  <p className="text-[#2E2E2E] leading-relaxed mb-6 font-medium">"{t.text}"</p>
                  
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 border-2 border-[#E5DED7]">
                      <AvatarImage src={t.avatar} alt={`${t.name} avatar`} />
                      <AvatarFallback className="bg-gradient-to-br from-[#FF6B35] to-[#6A4C93] text-white font-semibold">
                        {t.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-[#2E2E2E]">{t.name}</div>
                      <div className="text-sm text-[#5A5A5A]">{t.role}</div>
                      <div className="flex text-[#FFD23F] mt-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;