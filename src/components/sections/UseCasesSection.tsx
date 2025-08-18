import { Mic, Mail, FileText, Video, Megaphone } from "lucide-react";
import { motion } from "framer-motion";

const useCases = [
  {
    icon: Mic,
    title: "Podcast Content",
    description: "Turn show notes and transcripts into engaging threads, posts, and descriptions.",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    icon: Mail,
    title: "Newsletters & Issues",
    description: "Transform your email content into social posts and cross-platform friendly copy.",
    gradient: "from-amber-500 to-pink-600"
  },
  {
    icon: FileText,
    title: "Blog Articles",
    description: "Extract key hooks, quotes, and micro-posts to fuel your social media strategy.",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    icon: Video,
    title: "Video Transcripts",
    description: "Create captions, shorts scripts, and social posts from your video content.",
    gradient: "from-rose-500 to-fuchsia-600"
  },
  {
    icon: Megaphone,
    title: "Announcements",
    description: "Amplify your launches, events, and recaps across all platforms.",
    gradient: "from-indigo-500 to-blue-600"
  }
];

const UseCasesSection = () => {
  return (
    <section id="use-cases" className="relative overflow-hidden py-16 md:py-24 lg:py-28">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-muted/20" />
      
      <div className="container relative">
        <header className="mx-auto max-w-3xl text-center mb-12 px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4"
          >
            Where It Shines
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4"
          >
            Transform Your Content
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Turn long-form content into engaging, platform-optimized posts in seconds
          </motion.p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index + 1) }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-background p-6 shadow-sm ring-1 ring-gray-200/10 transition-all duration-300 hover:shadow-lg hover:ring-gray-200/20"
              >
                <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-5`} />
                </div>
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${useCase.gradient} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground">{useCase.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
