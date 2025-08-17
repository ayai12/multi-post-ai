import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Twitter, Instagram as InstagramIcon, Linkedin as LinkedinIcon, Quote as QuoteIcon, List as ListIcon, Crown, Mail, Image as ImageIcon, Layers } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEntitlements } from "@/hooks/useEntitlements";
import { useAuth } from "@clerk/react-router";
import { useClerk } from "@clerk/react-router";

// If your Clerk plan slug is not "pro", update this to match your dashboard plan slug
const PRO_PLAN_SLUG = "pro" as const;

// Local enforcement limits (client-side)
const FREE_MAX_WORDS = 2000;
const PRO_MAX_WORDS = 10000;
const FREE_MAX_FILE_MB = 1; // ~1 MB
const PRO_MAX_FILE_MB = 5;  // ~5 MB

const formatOptions = [
  // Free formats
  { key: "single_tweet", label: "Single Tweet", premium: false },
  { key: "tweet_thread", label: "Tweet Thread", premium: false },
  { key: "summary", label: "Summary", premium: false },
  { key: "linkedin", label: "LinkedIn Post", premium: false },
  // Premium formats
  { key: "viral_thread", label: "Twitter Viral Thread", premium: true },
  { key: "quote_cards", label: "Twitter Quote Cards", premium: true },
  { key: "linkedin_carousel", label: "LinkedIn Carousel Post", premium: true },
  { key: "email_newsletter", label: "Email Newsletter", premium: true },
] as const;

type FormatKey = typeof formatOptions[number]["key"];

type Output = { title: string; body: string };

const ToolUI = () => {
  const {
    availableFormats,
    canSelectMultipleFormats,
    canUseFormat,
    isPremiumFormat,
    canAccessPremiumFormats,
    monthlyLimit,
  } = useEntitlements();
  const { has, isLoaded: authLoaded, userId } = useAuth();
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<Record<FormatKey, boolean>>({
    single_tweet: true,
    tweet_thread: false,
    summary: true,
    linkedin: false,
    viral_thread: false,
    quote_cards: false,
    linkedin_carousel: false,
    email_newsletter: false,
  });
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState<number[]>([3]);
  const [outputs, setOutputs] = useState<Output[] | null>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const outputsRef = useRef<HTMLDivElement | null>(null);
  const STORAGE_KEY = "toolUIStateV1";
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const { redirectToSignIn, redirectToSignUp } = useClerk();
  const debounceRef = useRef<number | null>(null);

  // Cleanup any pending debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.location.hash = '#pricing';
  };

  // Debounced click handler to avoid accidental double-triggering
  const handleGenerateClick = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(() => {
      debounceRef.current = null;
      generateOutputs();
    }, 300);
  };

  // Helpers
  const countWords = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);
  const bytesToMB = (bytes: number) => bytes / (1024 * 1024);
  const clampToWords = (s: string, maxWords: number) => {
    const parts = s.trim().split(/\s+/);
    if (parts.length <= maxWords) return s.trim();
    return parts.slice(0, maxWords).join(" ");
  };

  // Load persisted state on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<{
        input: string;
        selected: Record<FormatKey, boolean>;
        tone: string;
        length: number[];
      }>;
      if (typeof saved.input === "string") setInput(saved.input);
      if (saved.selected && typeof saved.selected === "object") setSelected((s) => ({ ...s, ...saved.selected }));
      if (typeof saved.tone === "string") setTone(saved.tone);
      if (Array.isArray(saved.length) && saved.length.length > 0) setLength(saved.length as number[]);
    } catch {}
  }, []);

  // Persist state on change
  useEffect(() => {
    try {
      const toSave = JSON.stringify({ input, selected, tone, length });
      localStorage.setItem(STORAGE_KEY, toSave);
    } catch {}
  }, [input, selected, tone, length]);

  const selectedFormats = useMemo(() =>
    formatOptions.filter(f => selected[f.key]).map(f => f.key), [selected]
  );
  const noFormatSelected = selectedFormats.length === 0;

  const runGenerateContent = useAction(
    api["Functions/generateContent"].generateContent
  );

  // Simple monthly usage tracking (client-side, per-user)
  const monthKey = useMemo(() => {
    const d = new Date();
    const ym = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    return `${userId || "anon"}:${ym}`;
  }, [userId]);

  const getUsage = () => {
    try {
      // v2 storage key (per-user)
      const rawV2 = localStorage.getItem("usageCountsV2");
      const allV2 = rawV2 ? (JSON.parse(rawV2) as Record<string, number>) : {};
      if (allV2[monthKey] != null) return allV2[monthKey];
      // backward-compat: old global counts (no user scoping)
      const raw = localStorage.getItem("usageCounts");
      const all = raw ? (JSON.parse(raw) as Record<string, number>) : {};
      // Use current month portion from key to attempt a match
      const ym = monthKey.split(":").pop() as string;
      return all[ym] || 0;
    } catch {
      return 0;
    }
  };

  const incUsage = () => {
    try {
      const rawV2 = localStorage.getItem("usageCountsV2");
      const allV2 = rawV2 ? (JSON.parse(rawV2) as Record<string, number>) : {};
      allV2[monthKey] = (allV2[monthKey] || 0) + 1;
      localStorage.setItem("usageCountsV2", JSON.stringify(allV2));
    } catch {}
  };

  // Local UI state for showing live usage and unlimited flag
  const hasUnlimited = monthlyLimit === -1;
  const [usageCount, setUsageCount] = useState<number>(0);
  useEffect(() => {
    setUsageCount(getUsage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthKey]);

  const generateOutputs = async () => {
    if (!authLoaded) {
      toast({ title: "Please wait", description: "Loading your billing status..." });
      return;
    }
    if (!input.trim()) {
      toast({ title: "Error", description: "Please provide input content." });
      return;
    }
    // Enforce word limit per plan
    const maxWordsAllowed = hasUnlimited ? PRO_MAX_WORDS : FREE_MAX_WORDS;
    const currentWords = countWords(input);
    if (currentWords > maxWordsAllowed) {
      toast({ title: "Input too long", description: `Limit is ${maxWordsAllowed.toLocaleString()} words on your plan. Please shorten your input.` });
      return;
    }

    const len = Math.max(1, Math.min(5, length[0]));
    const formats = selectedFormats;

    // Enforce monthly limit for non-unlimited users
    if (!hasUnlimited) {
      const count = getUsage();
      // Require sign-up after the first free repurpose for anonymous users
      if (!userId && count >= 1) {
        setShowAuthModal(true);
        return;
      }
      if (count >= monthlyLimit) {
        setShowUpgradeModal(true);
        return;
      }
    }

    // Enforce one-format-per-request when not allowed
    if (!canSelectMultipleFormats && formats.length > 1) {
      toast({ title: "Upgrade required", description: "Your plan allows 1 format per request." });
      return;
    }

    try {
      setIsLoading(true);
      const result = await runGenerateContent({
        content: input,
        tone,
        length: len,
        formats,
      });

      setOutputs(result);
      // Record usage for limited plans after success
      if (!hasUnlimited) incUsage();
      if (!hasUnlimited) setUsageCount((c) => c + 1);
      // After first successful free repurpose, request sign-up for anonymous users
      if (!hasUnlimited) {
        try {
          const used = getUsage();
          if (!userId && used === 1) {
            setShowAuthModal(true);
          }
        } catch {}
      }
      toast({ title: "Repurposed!", description: "Preview outputs are ready." });
      // Smooth scroll to outputs
      requestAnimationFrame(() => {
        outputsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (error) {
      console.error("Error generating outputs:", error);
      toast({ title: "Error", description: "Failed to generate outputs. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const onCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({ title: "Copied", description: "Output copied to clipboard." });
  };

  const onDownload = (title: string, text: string) => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Rendering helpers for prettier, format-aware layouts
  const detectKeyFromTitle = (title: string): FormatKey | null => {
    const t = title.toLowerCase();
    if (t.includes("single tweet")) return "single_tweet";
    if (t.includes("tweet thread")) return "tweet_thread";
    if (t.includes("viral thread")) return "viral_thread";
    if (t.includes("quote cards")) return "quote_cards";
    if (t.includes("linkedin carousel")) return "linkedin_carousel";
    if (t.includes("email newsletter")) return "email_newsletter";
    if (t.includes("linkedin")) return "linkedin";
    if (t.includes("summary")) return "summary";
    return null;
  };

  const formatIcon = (key: FormatKey | null) => {
    switch (key) {
      case "single_tweet":
        return <Twitter className="h-4 w-4 text-sky-500" />;
      case "tweet_thread":
        return <Twitter className="h-4 w-4 text-sky-600" />;
      case "viral_thread":
        return <Twitter className="h-4 w-4 text-orange-500" />;
      case "quote_cards":
        return <QuoteIcon className="h-4 w-4 text-amber-600" />;
      case "linkedin":
        return <LinkedinIcon className="h-4 w-4 text-blue-600" />;
      case "linkedin_carousel":
        return <Layers className="h-4 w-4 text-blue-700" />;
      case "email_newsletter":
        return <Mail className="h-4 w-4 text-purple-600" />;
      case "summary":
        return <ListIcon className="h-4 w-4 text-emerald-600" />;
      default:
        return null;
    }
  };

  const accentBorderClass = (key: FormatKey | null) => {
    switch (key) {
      case "single_tweet":
        return "border-t-4 border-sky-400";
      case "tweet_thread":
        return "border-t-4 border-sky-500";
      case "viral_thread":
        return "border-t-4 border-orange-400";
      case "quote_cards":
        return "border-t-4 border-amber-500";
      case "linkedin":
        return "border-t-4 border-blue-500";
      case "linkedin_carousel":
        return "border-t-4 border-blue-600";
      case "email_newsletter":
        return "border-t-4 border-purple-500";
      case "summary":
        return "border-t-4 border-emerald-500";
      default:
        return "";
    }
  };

  const renderBody = (title: string, body: string, isOpen: boolean) => {
    const key = detectKeyFromTitle(title);
    const overflow = body.length > 400;
    const shortText = body.slice(0, 400);

    if (key === "single_tweet") {
      return (
        <div className="rounded-md border border-border bg-background px-3 py-2 text-sm">
          {body}
        </div>
      );
    }

    if (key === "tweet_thread" || key === "viral_thread") {
      // split into tweets by blank lines or numbered prefixes
      const parts = body
        .split(/\n\n+/)
        .flatMap((p) => p.split(/(?=\n\d+\/\s)/))
        .map((p) => p.replace(/^\s*\d+\/\s*/, "").trim())
        .filter(Boolean);
      const visible = !isOpen && parts.length > 3 ? parts.slice(0, 3) : parts;
      return (
        <div className="space-y-2">
          {visible.map((t, idx) => (
            <div key={idx} className="rounded-md border border-border bg-background px-3 py-2 text-sm">
              {t}
            </div>
          ))}
        </div>
      );
    }

    if (key === "quote_cards") {
      const quotes = body.split(/\n\n+/).map((q) => q.replace(/^\s*[""\']?|[""\']?\s*$/g, "").trim()).filter(Boolean);
      const visible = !isOpen && quotes.length > 3 ? quotes.slice(0, 3) : quotes;
      return (
        <div className="space-y-3">
          {visible.map((q, i) => (
            <blockquote key={i} className="border-l-2 pl-3 italic text-sm text-muted-foreground">"{q}"</blockquote>
          ))}
        </div>
      );
    }


    if (key === "linkedin_carousel") {
      const slides = body.split(/\n\n+/).filter(Boolean);
      const visible = !isOpen && slides.length > 3 ? slides.slice(0, 3) : slides;
      return (
        <div className="space-y-2">
          {visible.map((slide, i) => (
            <div key={i} className="rounded-md border border-border bg-blue-50 px-3 py-2 text-sm">
              <div className="font-medium text-xs text-blue-600 mb-1">Slide {i + 1}</div>
              {slide}
            </div>
          ))}
        </div>
      );
    }

    if (key === "email_newsletter") {
      const sections = body.split(/\n\n+/).filter(Boolean);
      const visible = !isOpen && sections.length > 2 ? sections.slice(0, 2) : sections;
      return (
        <div className="space-y-2">
          {visible.map((section, i) => (
            <div key={i} className="rounded-md border border-border bg-purple-50 px-3 py-2 text-sm">
              {section}
            </div>
          ))}
        </div>
      );
    }

    if (key === "summary") {
      const items = body
        .split(/\n+/)
        .map((l) => l.replace(/^\s*[•\-]\s*/, "").trim())
        .filter(Boolean);
      const visible = !isOpen && items.length > 5 ? items.slice(0, 5) : items;
      return (
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          {visible.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    }

    // linkedin or default
    return (
      <div className={`text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed ${!isOpen && overflow ? "line-clamp-6 max-h-56 overflow-hidden" : ""}`}>
        {isOpen || !overflow ? body : shortText + "…"}
      </div>
    );
  };

  // Determine if a card needs a Show more button based on format-specific size
  const hasOverflow = (title: string, body: string): boolean => {
    const key = detectKeyFromTitle(title);
    if (key === "single_tweet") {
      return body.length > 280;
    }
    if (key === "tweet_thread" || key === "viral_thread") {
      const parts = body
        .split(/\n\n+/)
        .flatMap((p) => p.split(/(?=\n\d+\/\s)/))
        .map((p) => p.replace(/^\s*\d+\/\s*/, "").trim())
        .filter(Boolean);
      return parts.length > 3;
    }
    if (key === "summary") {
      const items = body
        .split(/\n+/)
        .map((l) => l.replace(/^\s*[•\-]\s*/, "").trim())
        .filter(Boolean);
      return items.length > 5 || body.length > 400;
    }
    if (key === "quote_cards") {
      const quotes = body
        .split(/\n\n+/)
        .map((q) => q.replace(/^\s*[""\']?|[""\']?\s*$/g, "").trim())
        .filter(Boolean);
      return quotes.length > 3;
    }
    if (key === "linkedin_carousel") {
      const slides = body.split(/\n\n+/).filter(Boolean);
      return slides.length > 3;
    }
    if (key === "email_newsletter") {
      const sections = body.split(/\n\n+/).filter(Boolean);
      return sections.length > 2;
    }
    // linkedin/default
    return body.length > 400;
  };

  const limitReached = !hasUnlimited && usageCount >= monthlyLimit;

  return (
    <section id="toolUI" className="bg-muted/30">
      <div className="container py-16 lg:py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-foreground">Repurpose Content, Professionally</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Paste text or upload a file. Select formats. Generate high-quality outputs fast.</p>
        </div>
        <Card className="shadow-lg border bg-background">
          <CardHeader className="pb-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                {hasUnlimited ? (
                  <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50/80 border border-emerald-200 rounded-lg px-3 py-2">
                    <Crown className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Unlimited on Pro</span>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{usageCount}</span>
                    <span> / {monthlyLimit} used this month</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 px-6">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                  1
                </div>
                <h3 className="text-lg font-semibold">Content Input</h3>
              </div>
              <Textarea
                placeholder="Paste your content here… (articles, transcripts, newsletters, any text)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-40 resize-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
              {/* Word count and limits */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Words: {countWords(input)} / {hasUnlimited ? PRO_MAX_WORDS : FREE_MAX_WORDS}
                </span>
                <span>
                  Max file size: {hasUnlimited ? PRO_MAX_FILE_MB : FREE_MAX_FILE_MB} MB
                </span>
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,text/plain,text/markdown"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const maxMb = hasUnlimited ? PRO_MAX_FILE_MB : FREE_MAX_FILE_MB;
                    const sizeMb = bytesToMB(file.size);
                    if (sizeMb > maxMb) {
                      toast({ title: 'File too large', description: `Max ${maxMb} MB on your plan. Selected file is ${sizeMb.toFixed(2)} MB.` });
                      e.currentTarget.value = '';
                      return;
                    }
                    setUploadedFileName(file.name);
                    const reader = new FileReader();
                    reader.onerror = () => toast({ title: 'Upload failed', description: 'Could not read the selected file.' });
                    reader.onload = () => {
                      let text = String(reader.result || '').trim();
                      if (!text) {
                        toast({ title: 'Empty file', description: 'The uploaded file had no readable text.' });
                        return;
                      }
                      // Enforce word limit on import (truncate if needed)
                      const maxWords = hasUnlimited ? PRO_MAX_WORDS : FREE_MAX_WORDS;
                      const merged = (prevInput: string) => (prevInput ? prevInput + '\n\n' + text : text);
                      setInput((prev) => {
                        const candidate = merged(prev);
                        const words = countWords(candidate);
                        if (words > maxWords) {
                          const remaining = Math.max(0, maxWords - countWords(prev));
                          const truncated = remaining > 0 ? (prev ? prev + '\n\n' + clampToWords(text, remaining) : clampToWords(text, remaining)) : prev;
                          toast({ title: 'Input truncated', description: `Limited to ${maxWords.toLocaleString()} words on your plan.` });
                          return truncated || prev;
                        }
                        toast({ title: 'File imported', description: `${file.name} added to input.` });
                        return candidate;
                      });
                    };
                    reader.readAsText(file);
                    // Reset value so selecting the same file again re-triggers change
                    e.currentTarget.value = '';
                  }}
                />
                <Button variant="secondary" type="button" onClick={() => fileInputRef.current?.click()}>Upload File</Button>
                {uploadedFileName && (
                  <span className="ml-2 text-xs text-muted-foreground align-middle">{uploadedFileName} imported</span>
                )}
              </div>
              {/* Hints and upgrade CTA */}
              {!canAccessPremiumFormats && (
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Free plan: Select 1 format per request</p>
                  <p>• Premium formats are Pro-only</p>
                  <div>
                    <Button variant="link" className="px-0 text-amber-600" onClick={scrollToPricing}>Upgrade to Pro</Button>
                  </div>
                </div>
              )}
              {/* Prominent quota banner */}
              <div className={`mt-2 rounded-md border ${hasUnlimited ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'} p-3 flex flex-col gap-2`}>
                {hasUnlimited ? (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-emerald-800 flex items-center gap-2">
                      <Crown className="h-4 w-4 text-emerald-600" />
                      <span>Unlimited usage on Pro</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Monthly usage</span>
                      <span className="text-foreground font-medium">{usageCount} / {monthlyLimit}</span>
                    </div>
                    <Progress value={Math.min(100, Math.round((usageCount / monthlyLimit) * 100))} className="h-2" />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Free plan limit. Upgrade for unlimited.</span>
                      <Button size="sm" variant="outline" onClick={scrollToPricing}>Upgrade</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                <h3 className="text-lg font-semibold">Select Output Formats</h3>
              </div>
              {!canSelectMultipleFormats && (
                <div className="text-xs text-muted-foreground">
                  Free plan allows <span className="font-medium text-foreground">1 format per request</span>.{' '}
                  <button type="button" onClick={scrollToPricing} className="text-amber-600 underline underline-offset-2">Upgrade</button> to select multiple formats.
                </div>
              )}
              <div className="text-xs text-muted-foreground">
                Limits — {hasUnlimited ? (
                  <span>
                    Pro: up to {PRO_MAX_WORDS.toLocaleString()} words per input and {PRO_MAX_FILE_MB} MB per file.
                  </span>
                ) : (
                  <span>
                    Free: up to {FREE_MAX_WORDS.toLocaleString()} words per input and {FREE_MAX_FILE_MB} MB per file.
                  </span>
                )}
              </div>
              <TooltipProvider>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {formatOptions.map((opt) => {
                    // Don't restrict until billing/auth is loaded
                    const isAllowed = authLoaded ? canUseFormat(opt.key as FormatKey) : true;
                    const selectedCount = Object.values(selected).filter(Boolean).length;
                    const disabled = !isAllowed;
                    const multiBlocked = !disabled && !canSelectMultipleFormats && selectedCount >= 1;
                    const showTooltip = disabled; // Only show tooltip for premium gating; we auto-switch for multi-select
                    return (
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <label key={opt.key} className={`flex items-center gap-2 rounded-md border px-3 py-2 transition-colors ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-accent cursor-pointer'} relative ${isPremiumFormat(opt.key as FormatKey) ? 'bg-amber-50 border-amber-200' : ''} ${selected[opt.key] ? 'border-primary bg-primary/5' : ''}`}>
                            <Checkbox
                              checked={selected[opt.key]}
                              onCheckedChange={(v) => {
                                const next = Boolean(v);
                                if (disabled && next) {
                                  toast({ title: 'Upgrade required', description: 'This is a Pro format.' });
                                  return;
                                }
                                if (!canSelectMultipleFormats) {
                                  if (next) {
                                    // Auto-switch to only this format on Free
                                    setSelected((s) => {
                                      const n: Record<FormatKey, boolean> = { ...s } as any;
                                      (Object.keys(n) as FormatKey[]).forEach((k) => (n[k] = k === (opt.key as FormatKey)));
                                      return n;
                                    });
                                  } else {
                                    // Allow unchecking the only selected
                                    setSelected((s) => ({ ...s, [opt.key]: false }));
                                  }
                                  return;
                                }
                                setSelected((s) => ({ ...s, [opt.key]: next }));
                              }}
                              id={`fmt-${opt.key}`}
                              disabled={disabled}
                            />
                            <Label htmlFor={`fmt-${opt.key}`}>{opt.label}</Label>
                            {isPremiumFormat(opt.key as FormatKey) && (<Crown className="h-3 w-3 text-amber-500 ml-auto" />)}
                          </label>
                        </TooltipTrigger>
                        {showTooltip && (
                          <TooltipContent>
                            <p className="max-w-[220px] text-sm">Pro-only format. Upgrade to access all formats.</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                <h3 className="text-lg font-semibold">Brand Voice & Tone</h3>
              </div>
              <div className="space-y-2">
                <Label>Brand Voice</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="z-50">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Witty">Witty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

          <div className="pt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <TooltipProvider>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          variant="cta"
                          size="xl"
                          onClick={handleGenerateClick}
                          disabled={isLoading || limitReached || noFormatSelected}
                          aria-disabled={isLoading || limitReached || noFormatSelected}
                          className="w-full sm:w-auto px-6 py-3 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {limitReached ? `Monthly limit reached` : (isLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Generating…
                            </div>
                          ) : (noFormatSelected ? "Select a format" : "Repurpose My Content"))}
                        </Button>
                      </span>
                    </TooltipTrigger>
                    {(limitReached || noFormatSelected) && (
                      <TooltipContent>
                        <p className="max-w-[260px] text-sm">
                          {limitReached
                            ? `You've used ${usageCount}/${monthlyLimit} this month. Upgrade for unlimited.`
                            : `Select at least one output format above to continue.`}
                        </p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
                {!hasUnlimited && (
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {Math.max(0, monthlyLimit - usageCount)} of {monthlyLimit} left this month
                  </span>
                )}
              </div>
              {(limitReached || !canSelectMultipleFormats || !canAccessPremiumFormats) && (
                <Button variant="outline" size="lg" onClick={scrollToPricing} className="w-full sm:w-auto">
                  Upgrade to Pro
                </Button>
              )}
            </div>
          </div>

            {/* Loading skeletons */}
            {isLoading && (
              <div className="space-y-4" ref={outputsRef} id="outputs">
                <h3 className="font-semibold">Generating…</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded-md border border-border bg-background p-4 animate-pulse">
                      <div className="h-4 w-1/3 bg-muted rounded mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-full"></div>
                        <div className="h-3 bg-muted rounded w-11/12"></div>
                        <div className="h-3 bg-muted rounded w-10/12"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Outputs */}
            {outputs && outputs.length > 0 && (
              <div className="space-y-4" ref={outputsRef} id="outputs">
                <h3 className="font-semibold">Repurposed Outputs</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {outputs.map((out, i) => {
                    const isOpen = !!expanded[i];
                    const key = detectKeyFromTitle(out.title);
                    const showMore = hasOverflow(out.title, out.body);
                    return (
                      <Card key={i} className={`flex flex-col hover:shadow-md transition-shadow ${accentBorderClass(key)}`}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {formatIcon(key)}
                              <CardTitle className="text-base truncate">{out.title}</CardTitle>
                            </div>
                            <Badge variant="secondary">AI</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                          {renderBody(out.title, out.body, isOpen)}
                          <div className="mt-4 flex flex-wrap gap-2">
                            {showMore && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setExpanded((s) => ({ ...s, [i]: !isOpen }))}
                              >
                                {isOpen ? "Show less" : "Show more"}
                              </Button>
                            )}
                            <Button variant="secondary" size="sm" onClick={() => onCopy(out.body)}>Copy</Button>
                            <Button variant="outline" size="sm" onClick={() => onDownload(out.title, out.body)}>Download .txt</Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

          {/* Auth modal for sign in/up */}
          <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Continue for free</DialogTitle>
                <DialogDescription>
                  Create a free account to use your remaining monthly repurposes.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => redirectToSignIn({ redirectUrl: '/' })} className="border-2">Sign in</Button>
                <Button variant="cta" onClick={() => redirectToSignUp({ redirectUrl: '/' })} className="bg-gradient-to-r from-primary to-primary/90 shadow-lg">Create free account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Upgrade modal when monthly quota reached */}
          <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Monthly limit reached</DialogTitle>
                <DialogDescription>
                  You have used {usageCount}/{monthlyLimit} repurposes this month. Upgrade for unlimited usage and access to all formats.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowUpgradeModal(false)} className="border-2">Close</Button>
                <Button variant="cta" onClick={() => { setShowUpgradeModal(false); scrollToPricing(); }} className="bg-gradient-to-r from-primary to-primary/90 shadow-lg">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  </section>
  );
};

export default ToolUI;