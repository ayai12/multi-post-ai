import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const plans = [
  { title: "Free", price: "€0", features: ["3 repurposes/week"], cta: "Select Plan" },
  { title: "Starter", price: "€5/mo", features: ["30 repurposes/month"], cta: "Select Plan" },
  { title: "Pro", price: "€15/mo", features: ["150 repurposes/month", "Extra formats"], cta: "Select Plan" },
];

const Pricing = () => {
  return (
    <section id="pricing" className="bg-background">
      <div className="container py-16">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-bold">AI Content Repurposing Pricing</h2>
          <p className="text-muted-foreground mt-2">Simple pricing that scales with you.</p>
        </header>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <Card key={p.title} className="relative hover:shadow-[var(--shadow-soft)] transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-baseline justify-between">
                  <span>{p.title}</span>
                  <span className="text-2xl font-extrabold">{p.price}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="text-muted-foreground">• {f}</li>
                  ))}
                </ul>
                <Button className="mt-6 w-full" variant="cta">{p.cta}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;