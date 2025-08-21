export const SITE = {
  name: "Repurpose.cc",
  url: "https://repurpose.cc",
  twitter: "@repurpose_cc",
  description:
    "Convert long-form content into channel-ready social posts in seconds. Save time, stay consistent, and grow reach with Repurpose.cc.",
  defaultImage: "/icon%20(2).png",
};

export type FAQ = { question: string; answer: string };

export function createWebsiteJsonLd(params?: {
  siteName?: string;
  url?: string;
  potentialAction?: boolean;
}) {
  const url = params?.url || SITE.url;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: params?.siteName || SITE.name,
    url,
    potentialAction: params?.potentialAction
      ? {
          "@type": "SearchAction",
          target: `${url}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        }
      : undefined,
  };
}

export function createSoftwareAppJsonLd(params?: {
  name?: string;
  url?: string;
  description?: string;
  image?: string;
  applicationCategory?: string;
  offers?: { price: string; priceCurrency: string; url?: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: params?.name || SITE.name,
    url: params?.url || SITE.url,
    description: params?.description || SITE.description,
    image: params?.image || SITE.defaultImage,
    applicationCategory:
      params?.applicationCategory || "BusinessApplication",
    offers: params?.offers
      ? {
          "@type": "Offer",
          price: params.offers.price,
          priceCurrency: params.offers.priceCurrency,
          url: params.offers.url || SITE.url,
        }
      : undefined,
    aggregateRating: undefined,
  };
}

export function createFAQPageJsonLd(faq: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function createBlogPostingJsonLd(params: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.headline,
    description: params.description,
    url: params.url,
    datePublished: params.datePublished,
    dateModified: params.dateModified || params.datePublished,
    image: params.image || SITE.defaultImage,
    author: params.authorName
      ? { "@type": "Person", name: params.authorName }
      : undefined,
    publisher: { "@type": "Organization", name: SITE.name },
  };
}

export function createHowToJsonLd(params: {
  name: string;
  description?: string;
  steps: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: params.name,
    description: params.description,
    step: params.steps.map((s) => ({ "@type": "HowToStep", name: s })),
  };
}
