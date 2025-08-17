import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        <a href="#hero" className="flex items-center gap-2 font-extrabold tracking-tight text-lg sm:text-xl hover:opacity-80 transition-opacity">
          <img src="/favicon.png" alt="AI Content Repurposer" className="w-7 h-7 sm:w-8 sm:h-8" />
          <span className="hidden xs:inline">AI Content Repurposer</span>
          <span className="xs:hidden">AI Repurposer</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-4">
            {/* <a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </a>
            <a href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a> */}
            <a
              href="#pricing"
              onClick={scrollToPricing}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
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
            
            <a
              href="#pricing"
              onClick={(e) => {
                scrollToPricing(e);
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