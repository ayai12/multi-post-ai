import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Twitter, Instagram as InstagramIcon, Linkedin as LinkedinIcon, Quote as QuoteIcon, List as ListIcon, Crown, Mail, Image as ImageIcon, Layers } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEntitlements } from "@/hooks/useEntitlements";
import { useAuth } from "@clerk/react-router";

// If your Clerk plan slug is not "pro", update this to match your dashboard plan slug
const PRO_PLAN_SLUG = "pro" as const;

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
  const [isLoading, setIsLoading] = useState(false);
  const outputsRef = useRef<HTMLDivElement | null>(null);
  const STORAGE_KEY = "toolUIStateV1";

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

  const generateOutputs = async () => {
    if (!authLoaded) {
      toast({ title: "Please wait", description: "Loading your billing status..." });
      return;
    }
    if (!input.trim()) {
      toast({ title: "Error", description: "Please provide input content." });
      return;
    }

    const len = Math.max(1, Math.min(5, length[0]));
    const formats = selectedFormats;

    // Determine unlimited via entitlements
    const hasUnlimited = monthlyLimit === -1;

    // Enforce monthly limit for non-unlimited users
    if (!hasUnlimited) {
      const count = getUsage();
      if (count >= monthlyLimit) {
        toast({
          title: "Monthly limit reached",
          description: `You've used ${count}/${monthlyLimit} repurposes this month. Visit Pricing to upgrade for unlimited.`,
        });
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

  return (
    <section id="toolUI" className="bg-muted">
      <div className="container py-14">
        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="text-2xl">Repurpose Content in 3 Easy Steps (AI-Powered)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Step 1 */}
            <div className="space-y-3">
              <h3 className="font-semibold">Step 1 — Content Input</h3>
              <Textarea
                placeholder="Paste your blog post, transcript, or any long-form content here…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-40"
              />
              <div>
                <Button variant="secondary" type="button">Upload File</Button>
              </div>
              {/* Hints and upgrade CTA */}
              {!canAccessPremiumFormats && (
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Free plan: Select 1 format per request</p>
                  <p>• Premium formats are Pro-only</p>
                  <div>
                    <Button asChild variant="link" className="px-0 text-amber-600">
                      <a href="/pricing" target="_blank" rel="noreferrer">Upgrade to Pro</a>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <h3 className="font-semibold">Step 2 — Select Output Formats</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {formatOptions.map((opt) => {
                  // Don't restrict until billing/auth is loaded
                  const isAllowed = authLoaded ? canUseFormat(opt.key as FormatKey) : true;
                  const selectedCount = Object.values(selected).filter(Boolean).length;
                  const disabled = !isAllowed;
                  return (
                    <label key={opt.key} className={`flex items-center gap-2 rounded-md border border-border px-3 py-2 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent cursor-pointer'} relative ${isPremiumFormat(opt.key as FormatKey) ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200' : ''}`}>
                      <Checkbox
                        checked={selected[opt.key]}
                        onCheckedChange={(v) => {
                          const next = Boolean(v);
                          if (disabled && next) {
                            toast({ title: 'Upgrade required', description: 'This is a Pro format.' });
                            return;
                          }
                          if (next && !canSelectMultipleFormats && !selected[opt.key] && selectedCount >= 1) {
                            toast({ title: 'Limit reached', description: 'Your plan allows 1 format per request.' });
                            return;
                          }
                          setSelected((s) => ({ ...s, [opt.key]: next }));
                        }}
                        id={`fmt-${opt.key}`}
                        disabled={disabled}
                      />
                      <Label htmlFor={`fmt-${opt.key}`} className={isPremiumFormat(opt.key as FormatKey) ? 'text-amber-700' : ''}>{opt.label}</Label>
                      {isPremiumFormat(opt.key as FormatKey) && (
                        <Crown className="h-3 w-3 text-amber-500 ml-auto" />
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <h3 className="font-semibold">Step 3 — Tone & Length Controls</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tone</Label>
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
                <div className="space-y-2">
                  <Label>Output Length</Label>
                  <Slider min={1} max={5} step={1} value={length} onValueChange={setLength} />
                </div>
              </div>
            </div>

            <div>
              <Button variant="cta" size="lg" onClick={generateOutputs} disabled={isLoading}>
                {isLoading ? "Generating…" : "Repurpose My Content"}
              </Button>
            </div>

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
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ToolUI;