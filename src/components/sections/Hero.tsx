import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDF7F2] to-[#FFF1E6] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B35' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container relative z-10 text-center max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#E5DED7] rounded-full px-4 py-2 mb-8 shadow-sm">
          <div className="w-2 h-2 bg-[#00A676] rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-[#2E2E2E]">AI-powered • Ready in seconds</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#2E2E2E] mb-6 leading-tight">
          Turn One Piece of Content Into{" "}
          <span className="text-[#FF6B35] relative">
            10x More
            <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
              <path d="M2 10C60 2 140 2 198 10" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
            </svg>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-[#5A5A5A] mb-12 max-w-2xl mx-auto font-light">
          Paste your content and instantly get ready-to-use social posts, summaries, and more.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            asChild 
            className="bg-[#FF6B35] hover:bg-[#E85A2A] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <a href="#toolUI" className="flex items-center gap-2">
              Get Started Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            asChild 
            className="border-2 border-[#6A4C93] text-[#6A4C93] hover:bg-[#6A4C93] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200"
          >
            <a href="#pricing" className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              See Pricing
            </a>
          </Button>
        </div>

        {/* No credit card required */}
        <div className="flex justify-center items-center gap-2 text-[#5A5A5A] text-sm">
          <svg className="w-4 h-4 text-[#00A676]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>No credit card required to start</span>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#FF6B35]/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#6A4C93]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;