import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-background ${
        scrolled ? "shadow-sm border-b" : "border-b"
      } border-border/60`}
    >
      <nav className="container flex h-16 items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 font-extrabold tracking-tight text-lg sm:text-xl hover:opacity-80 transition-opacity">
          <img src="/favicon.png" alt="AI Content Repurposer" className="w-7 h-7 sm:w-8 sm:h-8" />
          <span className="hidden xs:inline">AI Content Repurposer</span>
          <span className="xs:hidden">AI Repurposer</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a href="#features" onClick={(e) => scrollToId(e, "features")} className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-accent/40">
              Features
            </a>
            <a href="#how-it-works" onClick={(e) => scrollToId(e, "how-it-works")} className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-accent/40">
              How it works
            </a>
            <div className="relative">
              <button
                className={`flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-accent/40 ${moreOpen ? 'bg-accent/50' : ''}`}
                onClick={() => setMoreOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={moreOpen}
              >
                More <ChevronDown className="h-4 w-4" />
              </button>
              {moreOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-md border border-border bg-background shadow-sm py-1">
                  <a href="#use-cases" onClick={(e) => { scrollToId(e, 'use-cases'); setMoreOpen(false); }} className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/40">Use cases</a>
                  <a href="#integrations" onClick={(e) => { scrollToId(e, 'integrations'); setMoreOpen(false); }} className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/40">Integrations</a>
                  <a href="#faq" onClick={(e) => { scrollToId(e, 'faq'); setMoreOpen(false); }} className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/40">FAQ</a>
                </div>
              )}
            </div>
            <a href="#pricing" onClick={(e) => scrollToId(e, "pricing")} className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-accent/40">
              Pricing
            </a>
          </div>
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
              <SignUpButton
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
                <Button variant="cta" size="sm">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
          {isSignedIn && <UserButton afterSignOutUrl="/" />}
        </div>
        
        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-3">
          {!isSignedIn && (
            <SignUpButton
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
              <Button variant="cta" size="sm">
                Try Free
              </Button>
            </SignUpButton>
          )}
          {isSignedIn && <UserButton afterSignOutUrl="/" />}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-accent/50 transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="container py-4 space-y-3">
            <a href="#features" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2" onClick={(e) => { scrollToId(e, "features"); setMobileMenuOpen(false); }}>Features</a>
            <a href="#how-it-works" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2" onClick={(e) => { scrollToId(e, "how-it-works"); setMobileMenuOpen(false); }}>How it works</a>
            <a href="#use-cases" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2" onClick={(e) => { scrollToId(e, "use-cases"); setMobileMenuOpen(false); }}>Use cases</a>
            <a href="#integrations" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2" onClick={(e) => { scrollToId(e, "integrations"); setMobileMenuOpen(false); }}>Integrations</a>
            <a href="#faq" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2" onClick={(e) => { scrollToId(e, "faq"); setMobileMenuOpen(false); }}>FAQ</a>
            <a
              href="#pricing"
              onClick={(e) => {
                scrollToId(e, "pricing");
                setMobileMenuOpen(false);
              }}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Pricing
            </a>
            {!isSignedIn && (
              <div className="pt-3 border-t border-border">
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
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </a>
                </SignInButton>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;