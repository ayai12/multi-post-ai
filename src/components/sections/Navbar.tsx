import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-background ${
        scrolled ? "shadow-sm border-b" : "border-b"
      } border-border/60`}
    >
      <nav className="container flex h-16 items-center justify-between">
        <a href="#hero" className="font-extrabold tracking-tight text-lg">
          AI Content Repurposer
        </a>
        <div className="flex items-center gap-4">
          <a
            href="#pricing"
            onClick={scrollToPricing}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </a>
          {!isSignedIn && (
            <>
              <SignInButton
                appearance={{
                  variables: {
                    colorPrimary: '#FF6B35',
                    colorForeground: '#2E2E2E',
                    colorPrimaryForeground: '#FFFFFF',
                    colorBackground: '#FDF7F2',
                    colorInput: '#FFF1E6',
                    colorInputForeground: '#2E2E2E',
                    colorMutedForeground: '#5A5A5A',
                    colorSuccess: '#00A676',
                    colorWarning: '#FFD23F',
                    colorDanger: '#E85A2A',
                  },
                }}
              >
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Login
                </a>
              </SignInButton>
              <Button asChild variant="cta" size="sm">
                <a href="#toolUI" aria-label="Sign Up">
                  Sign Up
                </a>
              </Button>
            </>
          )}
          {isSignedIn && <UserButton afterSignOutUrl="/" />} 
        </div>
      </nav>
    </header>
  );
};

export default Navbar;