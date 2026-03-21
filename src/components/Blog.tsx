import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar as CalendarIcon } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <div className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32 text-center">
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-glow">
            BLOG.
          </h2>
          <p className="text-imperial font-mono text-sm tracking-[0.5em] uppercase mt-4">
            Thoughts on Tech & Design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative glass-card rounded-[3rem] overflow-hidden p-10 hover:border-imperial/30 transition-all"
            >
              {/* Image Reveal Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                <img 
                  src={`https://picsum.photos/seed/${post.slug}/800/600`} 
                  alt="" 
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-imperial/10 flex items-center justify-center text-imperial">
                    <CalendarIcon size={18} />
                  </div>
                  <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                    {post.date}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-black mb-6 group-hover:text-imperial transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-lg text-white/50 mb-10 font-light leading-relaxed">
                  {post.description}
                </p>

                <button className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-imperial group/btn">
                  READ MORE <ArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" size={18} />
                </button>
              </div>

              {/* Glowing Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-imperial/20 rounded-[3rem] transition-all duration-1000 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
