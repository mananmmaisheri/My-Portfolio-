import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Linkedin, Github, Twitter } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormState('idle'), 5000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  return (
    <div className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32 text-center">
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-glow">
            CONTACT.
          </h2>
          <p className="text-imperial font-mono text-sm tracking-[0.5em] uppercase mt-4">
            Let's Build the Future Together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div className="space-y-12">
            <h3 className="text-4xl md:text-6xl font-black mb-8 text-imperial">
              GET IN TOUCH.
            </h3>
            <p className="text-xl text-white/50 leading-relaxed font-light max-w-lg">
              Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to new opportunities and collaborations.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-imperial group-hover:shadow-[0_0_20px_#FB3640] transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-xl font-bold">contact@manancodes.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-imperial group-hover:shadow-[0_0_20px_#FB3640] transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-xl font-bold">Mumbai, India</p>
                </div>
              </div>
            </div>

            <div className="flex gap-6 pt-8">
              {[
                { Icon: Linkedin, href: 'https://linkedin.com/in/mananmmaisheri' },
                { Icon: Github, href: 'https://github.com/mananmmaisheri' },
                { Icon: Twitter, href: 'https://twitter.com/mananmmaisheri' }
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-white/50 hover:text-imperial hover:shadow-[0_0_20px_#FB3640] transition-all"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 glass-card p-12 rounded-[3rem] relative overflow-hidden">
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/30 uppercase tracking-widest ml-4">Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-imperial focus:shadow-[0_0_20px_rgba(251,54,64,0.1)] transition-all text-white placeholder:text-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-white/30 uppercase tracking-widest ml-4">Email</label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-imperial focus:shadow-[0_0_20px_rgba(251,54,64,0.1)] transition-all text-white placeholder:text-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-white/30 uppercase tracking-widest ml-4">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl focus:outline-none focus:border-imperial focus:shadow-[0_0_20px_rgba(251,54,64,0.1)] transition-all text-white placeholder:text-white/10 resize-none"
                />
              </div>

              <button
                disabled={formState === 'submitting'}
                className="w-full py-6 bg-imperial text-white font-black uppercase tracking-[0.3em] rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_#FB3640] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === 'submitting' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    SEND MESSAGE <Send size={20} />
                  </>
                )}
              </button>

              {/* Status Overlays */}
              <AnimatePresence>
                {formState === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-night/90 backdrop-blur-xl flex flex-col items-center justify-center text-center p-8 z-20"
                  >
                    <CheckCircle size={80} className="text-imperial mb-6" />
                    <h4 className="text-3xl font-black mb-4">MESSAGE SENT.</h4>
                    <p className="text-white/50">Thank you for reaching out. I'll get back to you soon.</p>
                  </motion.div>
                )}

                {formState === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-night/90 backdrop-blur-xl flex flex-col items-center justify-center text-center p-8 z-20"
                  >
                    <AlertCircle size={80} className="text-imperial mb-6" />
                    <h4 className="text-3xl font-black mb-4">ERROR.</h4>
                    <p className="text-white/50">Something went wrong. Please try again later.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
