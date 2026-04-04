import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowUpRight, 
  Calendar as CalendarIcon, 
  ArrowLeft, 
  Clock, 
  Tag, 
  Search, 
  Share2, 
  ChevronUp,
  BookOpen
} from 'lucide-react';
import { blogs, BlogPost } from '../blogData';

export default function Blog() {
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const categories = ['All', ...new Set(blogs.map(b => b.category))];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateReadingTime = (content: string | React.ReactNode) => {
    const wordsPerMinute = 200;
    let text = '';

    if (typeof content === 'string') {
      text = content;
    } else {
      // Helper to extract text from React nodes
      const getText = (node: any): string => {
        if (!node) return '';
        if (typeof node === 'string' || typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(getText).join(' ');
        if (node.props && node.props.children) return getText(node.props.children);
        return '';
      };
      text = getText(content);
    }

    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
    return `${minutes} min read`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (blog: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Reading Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (activeBlog) {
    return (
      <div className="relative min-h-screen py-32 px-6 bg-night">
        {/* Reading Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-imperial z-50 origin-left"
          style={{ scaleX }}
        />

        <div className="max-w-4xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => {
              setActiveBlog(null);
              window.scrollTo(0, 0);
            }}
            className="group flex items-center gap-2 text-imperial font-black uppercase tracking-widest mb-12 hover:gap-4 transition-all"
          >
            <ArrowLeft size={20} /> BACK TO BLOGS
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative aspect-video rounded-[3rem] overflow-hidden mb-12 glass-card">
              <img 
                src={activeBlog.coverImage} 
                alt={activeBlog.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent opacity-60" />
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <span className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest bg-gradient-to-r ${activeBlog.color} text-white shadow-lg`}>
                {activeBlog.category}
              </span>
              <div className="flex items-center gap-2 text-white/50 font-mono text-xs uppercase tracking-widest">
                <CalendarIcon size={14} className="text-imperial" />
                {activeBlog.date}
              </div>
              <div className="flex items-center gap-2 text-white/50 font-mono text-xs uppercase tracking-widest">
                <Clock size={14} className="text-imperial" />
                {calculateReadingTime(activeBlog.content)}
              </div>
              <button 
                onClick={() => handleShare(activeBlog)}
                className="ml-auto p-3 rounded-full glass-card hover:border-imperial/50 transition-all text-white/50 hover:text-imperial"
              >
                <Share2 size={18} />
              </button>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 leading-[0.9]">
              {activeBlog.title}
            </h1>

            <div className="prose prose-invert max-w-none">
              {typeof activeBlog.content === 'string' ? (
                <div className="text-xl text-white/70 font-light leading-relaxed whitespace-pre-line space-y-6">
                  {activeBlog.content}
                </div>
              ) : (
                activeBlog.content
              )}
            </div>

            {/* Related Posts */}
            <div className="mt-32 pt-32 border-t border-white/10">
              <h3 className="text-3xl font-black tracking-tighter mb-12">RELATED POSTS.</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogs.filter(b => b.id !== activeBlog.id).slice(0, 2).map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => {
                      setActiveBlog(post);
                      window.scrollTo(0, 0);
                    }}
                    className="group glass-card rounded-[2rem] p-8 cursor-pointer hover:border-imperial/30 transition-all"
                  >
                    <span className="text-[10px] font-mono text-imperial uppercase tracking-widest mb-4 block">
                      {post.category}
                    </span>
                    <h4 className="text-xl font-black tracking-tighter group-hover:text-imperial transition-colors">
                      {post.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-32 p-12 rounded-[3rem] glass-card border-imperial/20 bg-imperial/5 relative overflow-hidden">
              <div className="relative z-10 text-center">
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">STAY IN THE LOOP.</h3>
                <p className="text-white/50 mb-10 max-w-md mx-auto font-light">
                  Get the latest thoughts on tech, design, and engineering delivered straight to your inbox.
                </p>
                <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="YOUR EMAIL ADDRESS"
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-4 text-sm font-mono tracking-widest focus:outline-none focus:border-imperial/50 transition-all"
                  />
                  <button className="px-10 py-4 bg-imperial text-white font-black rounded-full uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(251,54,64,0.3)]">
                    SUBSCRIBE
                  </button>
                </form>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-imperial/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </div>
          </motion.div>
        </div>

        {/* Floating Action Buttons */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-4 rounded-full bg-imperial text-white shadow-[0_0_20px_rgba(251,54,64,0.3)] z-50 hover:scale-110 transition-transform"
            >
              <ChevronUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative py-32 px-6 bg-night">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-glow">
              BLOG.
            </h2>
            <p className="text-imperial font-mono text-sm tracking-[0.5em] uppercase mt-4">
              Thoughts on Tech & Design
            </p>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-8 mb-20 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <input 
              type="text"
              placeholder="SEARCH POSTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-sm font-mono tracking-widest focus:outline-none focus:border-imperial/50 transition-all"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${
                  selectedCategory === cat 
                    ? 'bg-imperial text-white shadow-[0_0_15px_rgba(251,54,64,0.3)]' 
                    : 'bg-white/5 text-white/50 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredBlogs.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => {
                setActiveBlog(post);
                window.scrollTo(0, 0);
              }}
              className="group relative glass-card rounded-[3rem] overflow-hidden p-10 hover:border-imperial/30 transition-all cursor-pointer"
            >
              {/* Image Reveal Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                <img 
                  src={post.coverImage} 
                  alt="" 
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-imperial/10 flex items-center justify-center text-imperial">
                      <BookOpen size={18} />
                    </div>
                    <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                      {post.date}
                    </span>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-gradient-to-r ${post.color} text-white`}>
                    {post.category}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-black mb-6 group-hover:text-imperial transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-lg text-white/50 mb-10 font-light leading-relaxed line-clamp-3">
                  {post.description}
                </p>

                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-imperial group/btn">
                    READ MORE <ArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" size={18} />
                  </button>
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                    {calculateReadingTime(post.content)}
                  </span>
                </div>
              </div>

              {/* Glowing Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-imperial/20 rounded-[3rem] transition-all duration-1000 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-32">
            <p className="text-white/30 font-mono uppercase tracking-widest">No posts found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
