import { Quote, Layout, Scissors, Layers, Edit3, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Quote,
    title: "Voice Retention",
    description: "Maintain your unique brand voice across all platforms with our advanced AI that learns and adapts to your style.",
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    icon: Layout,
    title: "Smart Formatting",
    description: "Automatic length adjustments, hashtags, and CTAs optimized for each social platform's best practices.",
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    icon: Scissors,
    title: "Content Adaptation",
    description: "One-click transformation of content length and style while preserving your core message and voice.",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    icon: Layers,
    title: "Batch Processing",
    description: "Process multiple pieces of content simultaneously, saving you hours of manual work.",
    gradient: "from-amber-500 to-orange-600"
  },
  {
    icon: Edit3,
    title: "Smart Editing",
    description: "Generate multiple variants and refine them with our intuitive in-app editing tools.",
    gradient: "from-rose-500 to-pink-600"
  },
  {
    icon: Sparkles,
    title: "AI Enhancements",
    description: "Automated suggestions to improve engagement and performance across all your content.",
    gradient: "from-violet-500 to-fuchsia-600"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-background to-muted/5">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent w-full h-full" />
      </div>
      
      <div className="container relative">
        <header className="mx-auto max-w-3xl text-center mb-16 px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4"
          >
            Built for Creators
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4"
          >
            Powerful Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Everything you need to scale your content without losing your unique voice
          </motion.p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index % 3) }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl bg-background/50 backdrop-blur-sm p-6 shadow-sm ring-1 ring-gray-200/10 transition-all duration-300 hover:shadow-lg hover:ring-gray-200/20"
              >
                <div className="absolute -inset-1 -z-10 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20`} />
                </div>
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
