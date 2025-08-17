import { useState } from "react";

const items = [
  {
    q: "What can Repurpose do for me and my content types?",
    a: "Turn newsletters, podcasts, blogs, videos, and updates into platform‑ready copy: tweet threads, LinkedIn posts, email‑friendly text, and show notes in seconds."
  },
  {
    q: "Which platforms are supported, and can I export to tools?",
    a: "Twitter/X, LinkedIn, Facebook, Instagram and more. Export or schedule via Buffer/Hootsuite, or copy to Substack/Mailchimp."
  },
  {
    q: "How does voice preservation work?",
    a: "A built‑in voice library and tone controls adapt output while keeping your style consistent."
  },
  {
    q: "What are the Free vs paid limits?",
    a: "Free lets you try core features with limited usage. Paid plans increase items, formats, exports, and integrations."
  },
  {
    q: "Can I batch‑convert and keep drafts/history?",
    a: "Yes—batch multiple items and keep cloud‑synced drafts with version history."
  },
  {
    q: "Do you offer trials or refunds? Team/agency plans?",
    a: "Try it free. Paid plans are flexible; team options are available. Contact us if you need help choosing."
  }
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-background">
      <div className="container py-12 lg:py-16">
        <header className="space-y-2 text-center mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">FAQ</h2>
          <p className="text-muted-foreground">Answers to common questions</p>
        </header>
        <div className="max-w-3xl mx-auto divide-y rounded-xl border">
          {items.map((item, idx) => (
            <details
              key={idx}
              className="group"
              open={open === idx}
              onToggle={(e) => {
                const el = e.currentTarget as HTMLDetailsElement;
                setOpen(el.open ? idx : null);
              }}
            >
              <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between font-medium">
                {item.q}
                <span className="transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <div className="px-5 pb-4 text-sm text-muted-foreground">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
