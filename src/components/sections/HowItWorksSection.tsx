import { ClipboardList, SlidersHorizontal, Wand2, Share2 } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="bg-white py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="text-sm font-medium text-blue-700">Simple process</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#2E2E2E]">
            How It Works
          </h2>
          <p className="text-xl text-[#5A5A5A] max-w-2xl mx-auto">
            From long-form content to platform-ready posts in under 60 seconds.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center group">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#E85A2A] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <ClipboardList className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#2E2E2E] text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            </div>
            <h3 className="font-semibold text-[#2E2E2E] mb-3 text-lg">Paste Content</h3>
            <p className="text-[#5A5A5A] text-sm leading-relaxed">Drop in your blog post, newsletter, or podcast transcript.</p>
          </div>

          <div className="text-center group">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6A4C93] to-[#593D7A] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <SlidersHorizontal className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#2E2E2E] text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            </div>
            <h3 className="font-semibold text-[#2E2E2E] mb-3 text-lg">Choose Formats</h3>
            <p className="text-[#5A5A5A] text-sm leading-relaxed">Select Twitter threads, LinkedIn posts, Instagram captions, and more.</p>
          </div>

          <div className="text-center group">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00A676] to-[#008A5E] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Wand2 className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#2E2E2E] text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            </div>
            <h3 className="font-semibold text-[#2E2E2E] mb-3 text-lg">AI Magic</h3>
            <p className="text-[#5A5A5A] text-sm leading-relaxed">Watch your content transform into platform-optimized posts instantly.</p>
          </div>

          <div className="text-center group">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFD23F] to-[#E6BD36] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Share2 className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#2E2E2E] text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
            </div>
            <h3 className="font-semibold text-[#2E2E2E] mb-3 text-lg">Copy & Post</h3>
            <p className="text-[#5A5A5A] text-sm leading-relaxed">Copy the results and paste directly to your social platforms.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
