import { Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container py-10 grid md:grid-cols-3 gap-6 items-center">
        <div className="text-sm text-muted-foreground">
          <strong className="text-foreground">AI Content Repurposer</strong> — Save hours. Create more.
        </div>
        <nav className="flex justify-center gap-6 text-sm">
          <a href="#" className="hover:text-foreground text-muted-foreground">About</a>
          <a href="#" className="hover:text-foreground text-muted-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground text-muted-foreground">Terms</a>
          <a href="#" className="hover:text-foreground text-muted-foreground">Contact</a>
        </nav>
        <div className="flex justify-end gap-3">
          <a href="#" aria-label="Twitter" className="p-2 rounded-md border border-border hover:bg-accent">
            <Twitter className="size-4" />
          </a>
          <a href="#" aria-label="LinkedIn" className="p-2 rounded-md border border-border hover:bg-accent">
            <Linkedin className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;