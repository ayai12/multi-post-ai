import { AlertTriangle, Clock, Megaphone } from "lucide-react";

const ProblemAgitation = () => {
  return (
    <section id="problem" className="bg-white py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 mb-6">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-700">The struggle is real</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#2E2E2E]">
            Content Creation is <span className="text-red-500">Exhausting</span>
          </h2>
          <p className="text-xl text-[#5A5A5A] max-w-2xl mx-auto">
            You create amazing long-form content, but turning it into social posts feels like starting over every time.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="group p-8 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-[#2E2E2E] mb-2">Hours Wasted Weekly</h3>
            <p className="text-[#5A5A5A] text-sm leading-relaxed">Rewriting the same content for Twitter, LinkedIn, Instagram... it never ends.</p>
          </div>

          <div className="group p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-[#2E2E2E] mb-2">Voice Gets Lost</h3>
            <p className="text-[#5A5A5A] text-sm leading-relaxed">Your unique style disappears when you rush to adapt content for different platforms.</p>
          </div>

          <div className="group p-8 rounded-2xl bg-gradient-to-br from-yellow-50 to-red-50 border border-yellow-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Megaphone className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-[#2E2E2E] mb-2">Inconsistent Posting</h3>
            <p className="text-[#5A5A5A] text-sm leading-relaxed">When it's this hard, you post less often and your audience engagement suffers.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemAgitation;
