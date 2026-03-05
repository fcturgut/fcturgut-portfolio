import { ReactNode, useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, Twitter, BookOpen } from "lucide-react";

interface Article {
  title: string;
  pubDate: string;
  link: string;
  thumbnail: string;
  description: string;
}

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace '@fcturgut' with your actual Medium username
    const mediumUsername = "@fcturgut"; 
    const rssUrl = `https://medium.com/feed/${mediumUsername}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setArticles(data.items.slice(0, 3)); // Get latest 3 articles
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs font-mono tracking-widest uppercase"
        >
          [ FCT / 2026 ]
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-8 text-xs font-mono tracking-widest uppercase items-center"
        >
          <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
          <a href="#work" className="hover:opacity-50 transition-opacity">Experience</a>
          <a href="#articles" className="hover:opacity-50 transition-opacity">Articles</a>
          <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
          <a 
            href="#" 
            className="px-4 py-2 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 rounded-full"
          >
            Download CV
          </a>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-7xl mx-auto w-full">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6 font-mono"
          >
            Available for new opportunities
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[10vw] md:text-[7vw] leading-[0.9] font-serif italic mb-8"
          >
            Fatih C. Turgut <br />
            <span className="not-italic font-sans font-light text-white/80">Integration Architect</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row gap-12 items-start md:items-end"
          >
            <p className="max-w-xl text-lg text-white/60 font-light leading-relaxed">
              Specializing in the design and implementation of robust, scalable architectures. 15+ years of driving digital transformation for global organizations.
            </p>
            <div className="flex gap-6">
              <SocialIcon icon={<Linkedin size={20} />} href="https://www.linkedin.com/in/fcturgut/" />
              <SocialIcon icon={<Mail size={20} />} href="mailto:fatih.turgut@devoteam.com" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20"
        >
          <div className="w-[1px] h-12 bg-current mx-auto" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 md:px-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-12 font-mono">01 / The Expertise</h2>
            <p className="text-3xl md:text-4xl font-light leading-tight">
              I excel at creating <span className="italic font-serif">scalable</span> and <span className="italic font-serif">cost-effective</span> integration solutions that bridge the gap between business needs and technical reality.
            </p>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-white/60 leading-relaxed mb-8">
              As an expert in the MuleSoft Platform, I have successfully led technical teams and driven complex digital transformation and greenfield programs at global scale.
            </p>
            <div className="grid grid-cols-2 gap-8 py-8 border-t border-white/10">
              <SkillItem title="Core Focus" items={["Architecture", "Integration", "Solution Design"]} />
              <SkillItem title="Platforms" items={["MuleSoft", "API Management", "Cloud Architecture"]} />
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 px-6 md:px-24 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-black/50 mb-12 font-mono">02 / Professional Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <ProjectCard 
              title="Devoteam" 
              category="Integration Leadership" 
              description="Leading technical teams to deliver complex digital transformation programs using MuleSoft and modern API strategies."
              image="https://picsum.photos/seed/devoteam/1200/800"
            />
            <ProjectCard 
              title="Brenntag" 
              category="Global Architecture" 
              description="Architected scalable integration solutions for the world's leading chemical distributor, focusing on cost-efficiency and reliability."
              image="https://picsum.photos/seed/brenntag/1200/800"
            />
            <ProjectCard 
              title="Coca-Cola Icecek" 
              category="Digital Transformation" 
              description="Drove large-scale greenfield integration programs, establishing robust architectural patterns for enterprise-wide connectivity."
              image="https://picsum.photos/seed/cocacola/1200/800"
            />
            <ProjectCard 
              title="Turk Telekom" 
              category="Enterprise Integration" 
              description="Managed complex integration landscapes for a major telecommunications provider, ensuring high availability and performance."
              image="https://picsum.photos/seed/telekom/1200/800"
            />
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-32 px-6 md:px-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6 font-mono">03 / Insights</h2>
              <h3 className="text-4xl md:text-5xl font-serif italic">Latest from Medium</h3>
            </div>
            <a 
              href="https://medium.com/@fcturgut" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest font-mono text-white/40 hover:text-white transition-colors flex items-center gap-2"
            >
              View all posts <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {loading ? (
              // Loading Skeletons
              [1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-white/5 mb-6 rounded-sm" />
                  <div className="h-4 bg-white/10 w-3/4 mb-4" />
                  <div className="h-3 bg-white/5 w-full mb-2" />
                  <div className="h-3 bg-white/5 w-2/3" />
                </div>
              ))
            ) : articles.length > 0 ? (
              articles.map((article, index) => (
                <ArticleCard key={index} article={article} index={index} />
              ))
            ) : (
              // Fallback if no articles found
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-lg">
                <BookOpen className="mx-auto mb-4 text-white/20" size={32} />
                <p className="text-white/40 font-light">No articles found. Check your Medium username in the code.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-12 font-mono">03 / Connection</h2>
          <h3 className="text-5xl md:text-8xl font-serif italic mb-12">Let's architect <br /> the future.</h3>
          <a 
            href="mailto:fatih.turgut@devoteam.com" 
            className="inline-flex items-center gap-4 text-2xl border-b border-white/20 pb-2 hover:border-white transition-colors"
          >
            fatih.turgut@devoteam.com <ArrowUpRight />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-24 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-white/40 font-mono uppercase tracking-widest">© 2026 Fatih C. Turgut</p>
        <div className="flex gap-8 text-xs text-white/40 font-mono uppercase tracking-widest">
          <a href="https://www.linkedin.com/in/fcturgut/" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="mailto:fatih.turgut@devoteam.com" className="hover:text-white transition-colors">Email</a>
        </div>
      </footer>
    </div>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number; key?: any }) {
  // Helper to strip HTML and get first few sentences
  const getSnippet = (html: string) => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.slice(0, 140) + '...';
  };

  return (
    <motion.a 
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group block"
    >
      <div className="aspect-video overflow-hidden bg-white/5 mb-6 rounded-sm">
        <img 
          src={article.thumbnail || `https://picsum.photos/seed/${article.title}/800/450`} 
          alt={article.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
      <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3">
        {new Date(article.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </p>
      <h4 className="text-xl font-light mb-4 group-hover:text-white transition-colors leading-snug">
        {article.title}
      </h4>
      <p className="text-sm text-white/50 font-light leading-relaxed">
        {getSnippet(article.description)}
      </p>
      <div className="mt-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">
        Read Article <ArrowUpRight size={12} />
      </div>
    </motion.a>
  );
}

function SocialIcon({ icon, href }: { icon: ReactNode; href: string }) {
  return (
    <a 
      href={href} 
      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
    >
      {icon}
    </a>
  );
}

function SkillItem({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">{title}</h4>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item} className="text-sm font-light">{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ title, category, image, description }: { title: string; category: string; image: string; description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
    >
      <div className="aspect-[16/9] overflow-hidden bg-gray-100 mb-8 rounded-sm">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-black/40 mb-2">{category}</p>
            <h4 className="text-3xl font-light">{title}</h4>
          </div>
          <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-black/60 font-light leading-relaxed max-w-md">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
