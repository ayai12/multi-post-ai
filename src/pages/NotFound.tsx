import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <section className="text-center">
        <h1 className="text-5xl font-extrabold mb-3">404</h1>
        <p className="text-muted-foreground mb-6">Oops! Page not found</p>
        <Button asChild variant="cta">
          <a href="/">Return to Home</a>
        </Button>
      </section>
    </main>
  );
};

export default NotFound;
