import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/react-router";

// Plan feature keys from Context/ContextFile.md
// Pro:
//  - unlimited_repurposes_month
//  - access_to_all_formats_per_request
//  - access_to_all_formats
// Free:
//  - 10_ai_reproposes_a_month
//  - only_access_to_one_format_per_request
//  - limited_access_to_formats

export type FormatKey =
  | "single_tweet"
  | "tweet_thread"
  | "summary"
  | "linkedin"
  | "viral_thread"
  | "quote_cards"
  | "linkedin_carousel"
  | "email_newsletter";

export function useEntitlements() {
  const { user, isLoaded: userLoaded } = useUser();
  const { has, isLoaded: authLoaded } = useAuth();

  // Fallback metadata (if not using Clerk Billing features or before has() resolves)
  const metaFeatures = (user?.publicMetadata?.features || {}) as Record<string, unknown>;
  const metaHas = (key: string) => Boolean(metaFeatures[key]);

  // Prefer Clerk Billing has() checks when available
  const safeHas = (query: { feature?: string; plan?: string }) => {
    try {
      if (authLoaded && typeof has === "function") return has(query as any);
    } catch {}
    return false;
  };

  // Features per ContextFile.md
  const unlimitedRepurposes = safeHas({ feature: "unlimited_repurposes_month" }) || metaHas("unlimited_repurposes_month");
  const allFormatsPerRequest = safeHas({ feature: "access_to_all_formats_per_request" }) || metaHas("access_to_all_formats_per_request");
  const accessAllFormats = safeHas({ feature: "access_to_all_formats" }) || metaHas("access_to_all_formats");

  // Free semantics (only used to narrow if explicit features absent)
  const oneFormatPerRequest = metaHas("only_access_to_one_format_per_request");
  const limitedFormats = metaHas("limited_access_to_formats");

  // Final computed entitlements
  const canSelectMultipleFormats = allFormatsPerRequest || (!oneFormatPerRequest && accessAllFormats);
  const canAccessPremiumFormats = accessAllFormats && !limitedFormats;

  const monthlyLimit = unlimitedRepurposes ? -1 : 10; // -1 means unlimited

  const freeFormats: FormatKey[] = [
    "single_tweet",
    "tweet_thread",
    "summary",
    "linkedin",
  ];

  const premiumFormats: FormatKey[] = [
    "viral_thread",
    "quote_cards",
    "linkedin_carousel",
    "email_newsletter",
  ];

  const availableFormats: FormatKey[] = accessAllFormats
    ? [...freeFormats, ...premiumFormats]
    : freeFormats;

  // Helpers
  const isPremiumFormat = (key: FormatKey) => premiumFormats.includes(key);
  const canUseFormat = (key: FormatKey) => availableFormats.includes(key);

  return {
    // loading
    isLoaded: Boolean(userLoaded && authLoaded),

    // raw features (from metadata)
    rawFeatures: metaFeatures,

    // derived flags
    unlimitedRepurposes,
    canSelectMultipleFormats: canSelectMultipleFormats || !oneFormatPerRequest,
    canAccessPremiumFormats,

    // limits
    monthlyLimit,

    // formats
    availableFormats,
    freeFormats,
    premiumFormats,

    // helpers
    isPremiumFormat,
    canUseFormat,
  };
}
