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
  const [youtubeVideos, setYoutubeVideos] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [youtubeLoading, setYoutubeLoading] = useState(true);

  useEffect(() => {
    const mediumUsername = "@fcturgut"; 
    const rssUrl = `https://medium.com/feed/${mediumUsername}`;
    
    const fetchRss = async () => {
      try {
        // Try multiple proxies to ensure reliability and bypass CORS/adblockers
        const proxies = [
          `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
          `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`,
          `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`
        ];
        
        let xmlContent = "";
        
        for (const proxy of proxies) {
          try {
            const res = await fetch(proxy);
            if (res.ok) {
              const text = await res.text();
              // Verify it looks like XML/RSS before accepting it
              if (text && (text.includes('<rss') || text.includes('<feed'))) {
                xmlContent = text;
                break; // Successfully fetched valid XML
              }
            }
          } catch (e) {
            console.warn(`Proxy failed:`, e);
          }
        }

        if (!xmlContent) {
          throw new Error("Failed to fetch valid RSS feed from all proxies");
        }

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
        const items = xmlDoc.querySelectorAll("item");
        
        const parsedArticles: Article[] = Array.from(items).slice(0, 3).map(item => {
          const title = item.querySelector("title")?.textContent || "";
          const link = item.querySelector("link")?.textContent || "";
          const pubDate = item.querySelector("pubDate")?.textContent || "";
          
          // Medium uses content:encoded for the full post
          // We try different ways to get the content
          let content = "";
          const encodedContent = item.getElementsByTagName("content:encoded")[0] || 
                                item.getElementsByTagName("encoded")[0];
          
          if (encodedContent) {
            content = encodedContent.textContent || "";
          } else {
            content = item.querySelector("description")?.textContent || "";
          }
          
          // Extract thumbnail from content
          const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
          const thumbnail = imgMatch ? imgMatch[1] : "";

          return {
            title,
            link,
            pubDate,
            thumbnail,
            description: content
          };
        });

        if (parsedArticles.length > 0) {
          setArticles(parsedArticles);
        }
        setLoading(false);
      } catch (err) {
        console.error("RSS Fetch error:", err);
        setLoading(false);
      }
    };

    const fetchYouTube = async () => {
      const channelId = "UCuPKOa-1kcTEhjsi2urBJ0Q";
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
      
      try {
        const proxies = [
          `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
          `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`,
          `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`
        ];
        
        let xmlContent = "";
        
        for (const proxy of proxies) {
          try {
            const res = await fetch(proxy);
            if (res.ok) {
              const text = await res.text();
              if (text && text.includes('<feed')) {
                xmlContent = text;
                break;
              }
            }
          } catch (e) {
            console.warn(`YouTube Proxy failed:`, e);
          }
        }

        if (!xmlContent) {
          throw new Error("Failed to fetch valid YouTube RSS feed");
        }

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
        const entries = xmlDoc.querySelectorAll("entry");
        
        const parsedVideos: Article[] = Array.from(entries).slice(0, 3).map(entry => {
          const title = entry.querySelector("title")?.textContent || "";
          const link = entry.querySelector("link")?.getAttribute("href") || "";
          const pubDate = entry.querySelector("published")?.textContent || "";
          const description = entry.getElementsByTagName("media:description")[0]?.textContent || "";
          const thumbnail = entry.getElementsByTagName("media:thumbnail")[0]?.getAttribute("url") || "";

          return {
            title,
            link,
            pubDate,
            thumbnail,
            description
          };
        });

        if (parsedVideos.length > 0) {
          setYoutubeVideos(parsedVideos);
        }
        setYoutubeLoading(false);
      } catch (err) {
        console.error("YouTube Fetch error:", err);
        setYoutubeLoading(false);
      }
    };

    fetchRss();
    fetchYouTube();
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
          [2026]
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-8 text-xs font-mono tracking-widest uppercase items-center"
        >
          <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
          <a href="#work" className="hover:opacity-50 transition-opacity">Experience</a>
          <a href="#articles" className="hover:opacity-50 transition-opacity">Articles</a>
          <a href="#youtube" className="hover:opacity-50 transition-opacity">Video</a>
          <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
          <a 
            href="/Fatih_Cihat_Turgut_CV.pdf" 
            download="Fatih_Cihat_Turgut_CV.pdf"
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
            Let's Connect
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
              <SocialIcon icon={<Mail size={20} />} href="mailto:fcturgut@gmail.com" />
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
      <section id="work" className="py-32 px-6 md:px-24 bg-[#e6f0f5] text-[#1a3848]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#1a3848]/50 mb-12 font-mono">02 / Professional Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <ProjectCard 
              title="Devoteam" 
              category="Integration Leadership" 
              description="Leading technical teams to deliver complex digital transformation programs using MuleSoft and modern API strategies."
              image="/devoteam.jpg"
            />
            <ProjectCard 
              title="Brenntag" 
              category="Global Integration Architecture" 
              description="Architected scalable integration solutions for the world's leading chemical distributor, focusing on cost-efficiency and reliability."
              image="/brenntag1.webp"
            />
            <ProjectCard 
              title="Coca-Cola Icecek" 
              category="Digital Transformation" 
              description="Drove large-scale greenfield integration programs, establishing robust architectural patterns for enterprise-wide connectivity."
              image="/cocacolaicecek.webp"
            />
            <ProjectCard 
              title="Turk Telekom" 
              category="Middleware Operations" 
              description="Managed complex integration landscapes for a major telecommunications provider, ensuring high availability and performance."
              image="/telekom.png"
            />
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-32 px-6 md:px-24 bg-[#1f4255] border-t border-white/5">
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

      {/* YouTube Section */}
      <section id="youtube" className="py-32 px-6 md:px-24 bg-[#1f4255] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6 font-mono">04 / Video</h2>
              <h3 className="text-4xl md:text-5xl font-serif italic">Latest from YouTube</h3>
            </div>
            <a 
              href="https://youtube.com/@fatihcihatturgut?si=g78LBJbSvIp9iQds" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest font-mono text-white/40 hover:text-white transition-colors flex items-center gap-2"
            >
              View channel <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {youtubeLoading ? (
              // Loading Skeletons
              [1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-white/5 mb-6 rounded-sm" />
                  <div className="h-4 bg-white/10 w-3/4 mb-4" />
                  <div className="h-3 bg-white/5 w-full mb-2" />
                  <div className="h-3 bg-white/5 w-2/3" />
                </div>
              ))
            ) : youtubeVideos.length > 0 ? (
              youtubeVideos.map((video, index) => (
                <ArticleCard key={index} article={video} index={index} actionLabel="Watch Video" />
              ))
            ) : (
              // Fallback if no videos found
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-lg">
                <BookOpen className="mx-auto mb-4 text-white/20" size={32} />
                <p className="text-white/40 font-light">No videos found.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-24 bg-[#1a3848]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-12 font-mono">05 / Connection</h2>
          <h3 className="text-5xl md:text-8xl font-serif italic mb-12">Let's architect the future.</h3>
          <a 
            href="mailto:fcturgut@gmail.com" 
            className="inline-flex items-center gap-4 text-2xl border-b border-white/20 pb-2 hover:border-white transition-colors text-center"
          >
            fcturgut@gmail.com <ArrowUpRight />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-24 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-white/40 font-mono uppercase tracking-widest">© 2026 Fatih C. Turgut</p>
        <div className="flex gap-8 text-xs text-white/40 font-mono uppercase tracking-widest">
          <a href="https://www.linkedin.com/in/fcturgut/" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="mailto:fcturgut@gmail.com" className="hover:text-white transition-colors">Email</a>
        </div>
      </footer>
    </div>
  );
}

function ArticleCard({ article, index, actionLabel = "Read Article" }: { article: Article; index: number; key?: any; actionLabel?: string }) {
  // Helper to extract first image from description if thumbnail is missing
  const getThumbnail = (article: Article) => {
    if (article.thumbnail && !article.thumbnail.includes('stat?event=post.opened')) {
      return article.thumbnail;
    }
    // Try to find an image tag in the description
    const imgMatch = article.description.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
    return `https://picsum.photos/seed/${encodeURIComponent(article.title)}/800/450`;
  };

  // Helper to strip HTML and get first few sentences
  const getSnippet = (html: string) => {
    // Remove all HTML tags
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.slice(0, 140) + '...';
  };

  const articleImage = getThumbnail(article);

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
          src={articleImage} 
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
        {actionLabel} <ArrowUpRight size={12} />
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
