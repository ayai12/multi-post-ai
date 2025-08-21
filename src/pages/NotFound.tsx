import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/seo/SEO";
import { SITE } from "@/lib/seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="404 | Page not found | Repurpose.cc"
        description="The page you’re looking for doesn’t exist. Return to Repurpose.cc home."
        canonical={`${SITE.url}/404`}
        noindex
        og={{ type: "website", url: `${SITE.url}/404`, image: SITE.defaultImage, siteName: SITE.name, title: "404 | Page not found | Repurpose.cc", description: "The page you’re looking for doesn’t exist." }}
        twitter={{ card: "summary", image: SITE.defaultImage, site: SITE.twitter, creator: SITE.twitter, title: "404 | Page not found | Repurpose.cc", description: "The page you’re looking for doesn’t exist." }}
      />
      <main className="min-h-screen flex items-center justify-center bg-background">
        <section className="text-center">
          <h1 className="text-5xl font-extrabold mb-3">404</h1>
          <p className="text-muted-foreground mb-6">Oops! Page not found</p>
          <Button asChild variant="cta">
            <a href="/">Return to Home</a>
          </Button>
        </section>
      </main>
    </>
  );
};

export default NotFound;
