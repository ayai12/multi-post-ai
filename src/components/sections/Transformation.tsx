import { Rocket, Sparkles, CheckCircle2, Zap } from "lucide-react";

const Transformation = () => {
  return (
    <section className="bg-gradient-to-br from-[#FDF7F2] to-[#FFF1E6] py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 mb-6">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-700">The solution</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#2E2E2E]">
            What Changes With <span className="text-[#FF6B35]">AI Repurposing</span>
          </h2>
          <p className="text-xl text-[#5A5A5A] max-w-2xl mx-auto">
            From hours of manual work to seconds of smart automation. Keep your voice, scale your reach.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="group p-8 rounded-2xl bg-white border border-[#E5DED7] hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6 text-[#FF6B35]" />
            </div>
            <h3 className="font-semibold text-[#2E2E2E] mb-3 text-lg">10x Faster Creation</h3>
            <p className="text-[#5A5A5A] leading-relaxed">Turn one piece of content into 10+ platform-ready posts in seconds, not hours.</p>
          </div>

          <div className="group p-8 rounded-2xl bg-white border border-[#E5DED7] hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-[#6A4C93]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6 text-[#6A4C93]" />
            </div>
            <h3 className="font-semibold text-[#2E2E2E] mb-3 text-lg">Your Voice, Preserved</h3>
            <p className="text-[#5A5A5A] leading-relaxed">AI adapts your content while maintaining your unique style and personality across all platforms.</p>
          </div>

          <div className="group p-8 rounded-2xl bg-white border border-[#E5DED7] hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-[#00A676]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="h-6 w-6 text-[#00A676]" />
            </div>
            <h3 className="font-semibold text-[#2E2E2E] mb-3 text-lg">Platform-Perfect Posts</h3>
            <p className="text-[#5A5A5A] leading-relaxed">Each output is optimized for its platform - Twitter threads, LinkedIn posts, Instagram captions.</p>
          </div>

          <div className="group p-8 rounded-2xl bg-white border border-[#E5DED7] hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-[#FFD23F]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Rocket className="h-6 w-6 text-[#FFD23F]" />
            </div>
            <h3 className="font-semibold text-[#2E2E2E] mb-3 text-lg">Consistent Growth</h3>
            <p className="text-[#5A5A5A] leading-relaxed">Post regularly across all channels without burning out. Your audience stays engaged.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transformation;
