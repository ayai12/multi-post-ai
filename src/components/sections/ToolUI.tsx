import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

const formatOptions = [
  { key: "tweet", label: "Tweet Thread" },
  { key: "instagram", label: "Instagram Caption" },
  { key: "linkedin", label: "LinkedIn Post" },
  { key: "summary", label: "Summary" },
  { key: "quotes", label: "Quote Cards" },
] as const;

type FormatKey = typeof formatOptions[number]["key"];

type Output = { title: string; body: string };

const ToolUI = () => {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<Record<FormatKey, boolean>>({
    tweet: true,
    instagram: false,
    linkedin: false,
    summary: true,
    quotes: false,
  });
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState<number[]>([3]);
  const [outputs, setOutputs] = useState<Output[] | null>(null);

  const selectedFormats = useMemo(() =>
    formatOptions.filter(f => selected[f.key]).map(f => f.key), [selected]
  );

  const placeholderOutputs: Output[] = [
    { title: "Tweet Thread", body: "Lorem ipsum dolor sit amet…" },
    { title: "Summary", body: "Lorem ipsum dolor sit amet…" },
  ];

  const generateOutputs = () => {
    const base = input.trim() || "Your content goes here. Paste or upload to see richer examples.";
    const len = Math.max(1, Math.min(5, length[0]));

    const make = (title: string) => ({
      title,
      body: `${title} (Tone: ${tone}, Length: ${len})\n\n` +
        base.slice(0, Math.min(base.length, 120 + len * 40)) +
        (base.length > 160 ? "…" : ""),
    });

    const outs: Output[] = [];
    if (selected.tweet) outs.push(make("Tweet Thread"));
    if (selected.instagram) outs.push(make("Instagram Caption"));
    if (selected.linkedin) outs.push(make("LinkedIn Post"));
    if (selected.summary) outs.push(make("Summary"));
    if (selected.quotes) outs.push(make("Quote Cards"));

    setOutputs(outs.length ? outs : placeholderOutputs);
    toast({ title: "Repurposed!", description: "Preview outputs are ready." });
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

  return (
    <section id="toolUI" className="bg-muted">
      <div className="container py-14">
        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="text-2xl">Repurpose in 3 easy steps</CardTitle>
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
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <h3 className="font-semibold">Step 2 — Select Output Formats</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {formatOptions.map((opt) => (
                  <label key={opt.key} className="flex items-center gap-2 rounded-md border border-border px-3 py-2 hover:bg-accent cursor-pointer">
                    <Checkbox
                      checked={selected[opt.key]}
                      onCheckedChange={(v) => setSelected((s) => ({ ...s, [opt.key]: Boolean(v) }))}
                      id={`fmt-${opt.key}`}
                    />
                    <Label htmlFor={`fmt-${opt.key}`}>{opt.label}</Label>
                  </label>
                ))}
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
              <Button variant="cta" size="lg" onClick={generateOutputs}>Repurpose My Content</Button>
            </div>

            {/* Outputs */}
            <div className="space-y-3">
              <h3 className="font-semibold">Outputs</h3>
              <ScrollArea className="w-full whitespace-nowrap rounded-md">
                <div className="flex gap-4 pb-2 overflow-x-auto">
                  {(outputs || placeholderOutputs).map((out, i) => (
                    <Card key={i} className="min-w-[280px] max-w-[360px] flex flex-col">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{out.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                          {out.body}
                        </pre>
                        <div className="mt-4 flex gap-2">
                          <Button variant="secondary" size="sm" onClick={() => onCopy(out.body)}>Copy</Button>
                          <Button variant="outline" size="sm" onClick={() => onDownload(out.title, out.body)}>Download .txt</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ToolUI;