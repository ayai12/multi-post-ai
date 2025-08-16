import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/react-router";

// Plan feature keys from Context/ContextFile.md
// Business:
//  - unlimited_repurposes_month
//  - access_to_all_formats_per_request
//  - access_to_all_formats
//  - early_access
//  - basic_editing
//  - email_support_only
// Pro:
//  - monthly_repurposes_limit_100
//  - access_to_all_formats_per_request
//  - access_to_all_formats
//  - basic_editing
//  - email_support_only
// Free:
//  - monthly_repurposes_limit_5
//  - only_access_to_one_format_per_request
//  - limited_access_to_formats
//  - basic_editing
//  - email_support_only
// Back-compat (older context keys):
//  - 10_ai_reproposes_a_month

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
  const earlyAccess = metaHas("early_access");
  const basicEditing = metaHas("basic_editing");
  const emailSupportOnly = metaHas("email_support_only");

  // Free semantics (only used to narrow if explicit features absent)
  const oneFormatPerRequest = metaHas("only_access_to_one_format_per_request");
  const limitedFormats = metaHas("limited_access_to_formats");

  // Monthly limits derived from metadata (with sensible fallbacks)
  const limit5 = metaHas("monthly_repurposes_limit_5") || metaHas("10_ai_reproposes_a_month"); // back-compat
  const limit100 = metaHas("monthly_repurposes_limit_100");

  // Final computed entitlements
  const canSelectMultipleFormats = allFormatsPerRequest || (!oneFormatPerRequest && accessAllFormats);
  const canAccessPremiumFormats = accessAllFormats && !limitedFormats;

  // Determine monthly limit priority: unlimited > 100 > 5 (default to 5 if neither set)
  const monthlyLimit = unlimitedRepurposes ? -1 : limit100 ? 100 : limit5 ? 5 : 5; // -1 means unlimited

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
    earlyAccess,
    basicEditing,
    emailSupportOnly,

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

