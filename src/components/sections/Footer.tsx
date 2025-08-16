import { Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start lg:items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/favicon.png" alt="AI Content Repurposer" className="w-6 h-6" />
              <strong className="text-foreground font-bold">AI Content Repurposer</strong>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Built by a solo creator, for creators who want their time back.
            </p>
          </div>
          
          <nav className="space-y-4">
            <h4 className="font-semibold text-foreground">Links</h4>
            <div className="flex flex-col space-y-2">
              <a href="/about" className="text-sm hover:text-foreground text-muted-foreground transition-colors">About</a>
              <a href="/blog" className="text-sm hover:text-foreground text-muted-foreground transition-colors">Blog</a>
              <a href="/faq" className="text-sm hover:text-foreground text-muted-foreground transition-colors">FAQ</a>
              <a href="https://x.com/ReinwatashiDev" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-foreground text-muted-foreground transition-colors">Contact</a>
            </div>
          </nav>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Follow the Journey</h4>
            <div className="flex gap-3">
              <a href="https://x.com/ReinwatashiDev" target="_blank" rel="noopener noreferrer" aria-label="Follow on Twitter" className="p-3 rounded-lg border border-border hover:bg-accent hover:border-primary/30 transition-all duration-200">
                <Twitter className="size-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Building in public @ReinwatashiDev
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 AI Content Repurposer. Made with ❤️ by a solo developer.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;