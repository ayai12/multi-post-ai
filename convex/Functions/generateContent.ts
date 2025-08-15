import { GoogleGenerativeAI } from "@google/generative-ai";
import { action } from "../_generated/server";
import { v } from "convex/values";

type Output = { title: string; body: string };

export const generateContent = action({
  args: {
    content: v.string(),
    tone: v.string(),
    length: v.number(),
    formats: v.array(v.string()),
  },
  handler: async (_ctx, args): Promise<Output[]> => {
    "use node";

    const { content, tone, length, formats } = args;

    if (!content || formats.length === 0) {
      throw new Error("Missing content or formats");
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      // Accept user's provided variable name variant
      (process.env as Record<string, string | undefined>)["Gemeni_Api_Key"]; 

    if (!apiKey) {
      throw new Error(
        "Missing Gemini API key. Set GEMINI_API_KEY (or GOOGLE_API_KEY / Gemeni_Api_Key) in Convex env."
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Map UI keys to readable labels
    const labelByKey: Record<string, string> = {
      single_tweet: "Single Tweet",
      tweet_thread: "Tweet Thread",
      viral_thread: "Twitter Viral Thread",
      quote_cards: "Twitter Quote Cards",
      linkedin: "LinkedIn Post",
      linkedin_carousel: "LinkedIn Carousel Post",
      email_newsletter: "Email Newsletter",
      summary: "Summary",
    };

    // Build strict JSON-only instructions, scoped to requested formats
    const requested = formats;
    const lengthHint =
      length <= 2 ? "very short" : length === 3 ? "short" : length === 4 ? "medium" : "concise";

    const jsonShape = {
      single_tweet: "single tweet text (max 280 chars)",
      tweet_thread: ["tweet 1", "tweet 2", "tweet 3"],
      viral_thread: ["hook tweet", "value tweet", "cta tweet"],
      quote_cards: ["impactful quote 1", "impactful quote 2"],
      linkedin: "professional post content",
      linkedin_carousel: ["slide 1: insight", "slide 2: data"],
      email_newsletter: "subject: [subject]\n\ncontent sections...",
      summary: ["key point 1", "key point 2"],
    } as const;

    const instructions = `You are given content to repurpose. Respond with STRICT JSON only, no markdown, no backticks, no comments.
The JSON must include ONLY these keys: ${requested.join(", ")}. Do not include any other keys.
Rules per format:
- single_tweet: return ONE tweet only, MUST be <= 280 characters, engaging and complete.
- tweet_thread: return an array of 2-6 tweets. Each tweet MUST be <= 260 characters. Keep a numbered thread vibe.
- viral_thread: return 3-5 tweets optimized for engagement with hooks, value, and CTA. Each <= 260 chars.
- quote_cards: return 3-5 short, impactful quotes perfect for visual cards. Each <= 200 chars.
- linkedin: a professional post with strong opening, short paragraphs, avoid excessive hashtags.
- linkedin_carousel: return 3-5 slides with professional insights, data, or tips. Each slide focused.
- email_newsletter: return full newsletter with subject line and 3-4 content sections.
- summary: 3-5 concise bullet points capturing essentials.
Global constraints: Tone = ${tone}. Target length = ${lengthHint}. Be concise.
Return JSON with this shape example (values illustrative):
${JSON.stringify(jsonShape, null, 2)}

Content to repurpose:
${content}`;

    const result = await model.generateContent(instructions);
    const raw = result.response.text().trim();

    const parseJsonLoose = (input: string): any | null => {
      // Try raw parse first
      try {
        return JSON.parse(input);
      } catch {}
      // Try to extract from ```json ... ```
      const fenceMatch = input.match(/```json\s*([\s\S]*?)```/i);
      if (fenceMatch) {
        try {
          return JSON.parse(fenceMatch[1]);
        } catch {}
      }
      // Try to extract first {...} block
      const objMatch = input.match(/\{[\s\S]*\}/);
      if (objMatch) {
        try {
          return JSON.parse(objMatch[0]);
        } catch {}
      }
      return null;
    };

    const data = parseJsonLoose(raw) || {};

    // Helpers
    const clamp = (s: string, max: number) => (s.length <= max ? s : s.slice(0, max - 1).trimEnd() + "…");
    const splitToMaxLen = (s: string, max: number): string[] => {
      const words = s.split(/\s+/);
      const parts: string[] = [];
      let current = "";
      for (const w of words) {
        if ((current + (current ? " " : "") + w).length > max) {
          if (current) parts.push(current);
          current = w;
        } else {
          current = current ? current + " " + w : w;
        }
      }
      if (current) parts.push(current);
      return parts;
    };

    const outputs: Output[] = [];

    for (const key of requested) {
      const label = labelByKey[key] ?? key;
      const value = (data as any)[key];

      if (key === "single_tweet") {
        const tweet = typeof value === "string" ? value : Array.isArray(value) ? value[0] : "";
        const body = clamp(String(tweet).trim(), 280);
        outputs.push({ title: label, body });
        continue;
      }

      if (key === "tweet_thread" || key === "viral_thread") {
        let tweets: string[] = Array.isArray(value)
          ? value.map((t: any) => String(t))
          : typeof value === "string"
          ? splitToMaxLen(String(value), 240) // split long into multiple
          : [];
        // Enforce 260 char limit and number
        tweets = tweets.flatMap((t: string) => splitToMaxLen(t, 260));
        const body = tweets
          .map((t, i) => `${i + 1}/ ${clamp(t.trim(), 260)}`)
          .join("\n\n");
        outputs.push({ title: label, body });
        continue;
      }

      if (key === "summary") {
        const items: string[] = Array.isArray(value)
          ? value.map((v: any) => String(v))
          : typeof value === "string"
          ? String(value).split(/\n+/)
          : [];
        const body = items.map((it) => `• ${it.trim()}`).join("\n");
        outputs.push({ title: label, body });
        continue;
      }

      if (key === "quote_cards") {
        const items: string[] = Array.isArray(value)
          ? value.map((v: any) => String(v))
          : typeof value === "string"
          ? String(value).split(/\n+/)
          : [];
        const body = items.map((q) => `"${clamp(q.trim(), 200)}"`).join("\n\n");
        outputs.push({ title: label, body });
        continue;
      }


      if (key === "linkedin_carousel") {
        const slides: string[] = Array.isArray(value)
          ? value.map((v: any) => String(v))
          : typeof value === "string"
          ? String(value).split(/\n\n+/)
          : [];
        const body = slides.map((slide) => slide.trim()).join("\n\n");
        outputs.push({ title: label, body });
        continue;
      }

      if (key === "email_newsletter") {
        const text = typeof value === "string" ? value : Array.isArray(value) ? value.join("\n\n") : "";
        outputs.push({ title: label, body: text.trim() });
        continue;
      }

      if (key === "linkedin") {
        const text = typeof value === "string" ? value : Array.isArray(value) ? value.join("\n") : "";
        outputs.push({ title: label, body: clamp(text.trim(), 2000) });
        continue;
      }

      // Fallback for unknown keys
      if (typeof value === "string") {
        outputs.push({ title: label, body: value.trim() });
      }
    }

    return outputs;
  },
});
