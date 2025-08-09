import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 bg-background ${
      scrolled ? "shadow-sm border-b" : "border-b"
    } border-border/60`}
    >
      <nav className="container flex h-16 items-center justify-between">
        <a href="#hero" className="font-extrabold tracking-tight text-lg">
          AI Content Repurposer
        </a>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Login</a>
          <Button asChild variant="cta" size="sm">
            <a href="#toolUI" aria-label="Sign Up">Sign Up</a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;