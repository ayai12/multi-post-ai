import React from "react";
import { Helmet } from "react-helmet-async";

export type JsonLd = Record<string, any>;

export type SEOProps = {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  noindex?: boolean;
  og?: {
    type?: string;
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    siteName?: string;
  };
  twitter?: {
    card?: "summary" | "summary_large_image";
    title?: string;
    description?: string;
    image?: string;
    site?: string; // @username
    creator?: string; // @username
  };
  jsonLd?: JsonLd[]; // one or many JSON-LD blocks
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  noindex,
  og,
  twitter,
  jsonLd,
}) => {
  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords?.length ? (
        <meta name="keywords" content={keywords.join(", ")} />
      ) : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : null}

      {/* Open Graph */}
      <meta property="og:title" content={og?.title || title} />
      <meta property="og:description" content={og?.description || description} />
      {og?.url ? <meta property="og:url" content={og.url} /> : null}
      {og?.type ? <meta property="og:type" content={og.type} /> : null}
      {og?.image ? <meta property="og:image" content={og.image} /> : null}
      {og?.siteName ? <meta property="og:site_name" content={og.siteName} /> : null}

      {/* Twitter */}
      <meta name="twitter:card" content={twitter?.card || "summary_large_image"} />
      <meta name="twitter:title" content={twitter?.title || title} />
      <meta name="twitter:description" content={twitter?.description || description} />
      {twitter?.image ? <meta name="twitter:image" content={twitter.image} /> : null}
      {twitter?.site ? <meta name="twitter:site" content={twitter.site} /> : null}
      {twitter?.creator ? <meta name="twitter:creator" content={twitter.creator} /> : null}

      {/* JSON-LD */}
      {jsonLd?.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Ensure safe stringification
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </Helmet>
  );
};

export default SEO;
