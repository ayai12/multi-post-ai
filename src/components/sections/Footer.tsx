import { Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container py-10 grid lg:grid-cols-3 gap-6 items-center">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong className="text-foreground">AI Content Repurposer</strong> — Built by a solo creator, for creators.
          </div>
          {/* Affiliate link */}
          <div>
            <a
              href="https://shipfa.st/?via=RDW"
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Built with ShipFast (affiliate)
            </a>
          </div>
        </div>

        <nav className="flex justify-center gap-6 text-sm">
          <a href="/about" className="hover:text-foreground text-muted-foreground">About</a>
          <a href="/blog" className="hover:text-foreground text-muted-foreground">Blog</a>
          <a href="/faq" className="hover:text-foreground text-muted-foreground">FAQ</a>
          <a href="https://x.com/ReinwatashiDev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground text-muted-foreground">Contact</a>
        </nav>

        {/* Social actions: follow + share */}
        <div className="flex justify-end gap-3 items-center">
          <Button variant="outline" size="sm" asChild className="group">
            <a href="https://x.com/ReinwatashiDev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Follow My Journey
              <span className="group-hover:scale-110 transition-transform duration-200">👀</span>
            </a>
          </Button>
          {/* Share to X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              "Turn long‑form into 10+ social posts in seconds"
            )}&url=${encodeURIComponent("https://repurpose.cc/")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            className="p-2 rounded-md border border-border hover:bg-accent"
          >
            <Twitter className="size-4" />
          </a>
          {/* Share to LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://repurpose.cc/")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className="p-2 rounded-md border border-border hover:bg-accent"
          >
            <Linkedin className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;