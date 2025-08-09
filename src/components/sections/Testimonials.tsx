import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatarJane from "@/assets/avatar-jane.jpg";
import avatarMark from "@/assets/avatar-mark.jpg";
import avatarAisha from "@/assets/avatar-aisha.jpg";

const testimonials = [
  { avatar: avatarJane, name: "Jane Doe", role: "Content Creator", text: "This tool saved me hours every week." },
  { avatar: avatarMark, name: "Mark Smith", role: "Blogger", text: "Turning my blogs into tweets is now effortless." },
  { avatar: avatarAisha, name: "Aisha Khan", role: "Podcaster", text: "Perfect for repurposing transcripts into posts." },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-muted">
      <div className="container py-16">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-bold">What Our Users Say</h2>
          <p className="text-muted-foreground mt-2">Loved by creators across platforms.</p>
        </header>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="hover:shadow-[var(--shadow-soft)] transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={t.avatar} alt={`${t.name} avatar`} />
                    <AvatarFallback>{t.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">“{t.text}”</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;