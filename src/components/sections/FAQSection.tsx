import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "What content types can I repurpose with this tool?",
    answer: "You can repurpose any text-based content including articles, blog posts, podcast transcripts, and more. Simply paste your content or upload a text file (.txt or .md format).",
    category: "General"
  },
  {
    question: "What are the input limits?",
    answer: "Free plan: Up to 2,000 words per request, 1MB file size. Pro/Business plans: Up to 10,000 words per request, 5MB file size.",
    category: "Limits"
  },
  {
    question: "What formats can I export to?",
    answer: "Free plan: Single Tweets, Tweet Threads, Summaries, and LinkedIn Posts. Pro/Business plans: Additional formats including Twitter Viral Threads, Quote Cards, LinkedIn Carousel Posts, and Email Newsletters.",
    category: "Formats"
  },
  {
    question: "How does the free plan compare to paid plans?",
    answer: "Free: 5 repurposes/month, 1 format per request, basic formats only. Pro ($5/month): Unlimited repurposes, all formats per request, early access to new features. Business ($15/month): All Pro features plus team collaboration tools.",
    category: "Pricing"
  },
  {
    question: "What file types can I upload?",
    answer: "You can upload .txt and .md files. For the free plan, files must be under 1MB. Pro/Business plans support files up to 5MB.",
    category: "General"
  },
  {
    question: "Is there a limit to how many formats I can generate at once?",
    answer: "Free plan: You can only generate one format at a time. Pro and Business plans: Generate multiple formats simultaneously in a single request.",
    category: "Limits"
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(faqItems.map(item => item.category)))];
  const filteredItems = activeCategory === "All" 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-background to-muted/5">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent w-full h-full" />
      </div>
      
      <div className="container relative px-4">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4"
          >
            <HelpCircle className="h-4 w-4" />
            Need Help?
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Everything you need to know about our platform
          </motion.p>
        </motion.header>

        {/* Category filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {filteredItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (index % 3) }}
              className="overflow-hidden rounded-xl bg-background/80 backdrop-blur-sm shadow-sm ring-1 ring-gray-200/10 hover:ring-gray-200/20 transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <h3 className="text-base font-medium text-foreground sm:text-lg">
                  {item.question}
                </h3>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  className="ml-4 flex-shrink-0 text-muted-foreground"
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-muted-foreground text-sm sm:text-base">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="https://x.com/ReinwatashiDev"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Contact our support team
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
