import { Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container py-10 grid md:grid-cols-3 gap-6 items-center">
        <div className="text-sm text-muted-foreground">
          <strong className="text-foreground">AI Content Repurposer</strong> — Built by a solo creator, for creators.
        </div>
        <nav className="flex justify-center gap-6 text-sm">
          <a href="/about" className="hover:text-foreground text-muted-foreground">About</a>
          <a href="/blog" className="hover:text-foreground text-muted-foreground">Blog</a>
          <a href="/faq" className="hover:text-foreground text-muted-foreground">FAQ</a>
          <a href="https://x.com/ReinwatashiDev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground text-muted-foreground">Contact</a>
        </nav>
        <div className="flex justify-end gap-3">
          <a href="https://x.com/ReinwatashiDev" target="_blank" rel="noopener noreferrer" aria-label="Follow on Twitter" className="p-2 rounded-md border border-border hover:bg-accent">
            <Twitter className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;