import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi! I'm Manan's AI assistant. Ask me anything about his work, skills, or projects!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const model = "gemini-3-flash-preview";
      const response = await genAI.models.generateContent({
        model,
        contents: [
          {
            role: 'user',
            parts: [{ text: `You are "Manan AI", a futuristic digital twin of Manan, a world-class full-stack developer and creative technologist. 
            Manan's expertise: Next.js, React, Node.js, Python, AI/ML, WebGL (Three.js), GSAP, and high-end UI/UX.
            He is passionate about building "cinematic" web experiences that push the boundaries of the browser.
            His portfolio (where you live) is an Awwwards-inspired interactive journey.
            
            Guidelines:
            - Be professional, slightly mysterious, and highly intelligent.
            - Use futuristic terminology (e.g., "Initializing response", "Scanning archives").
            - Keep responses concise but impactful.
            - If asked about contact, point them to the contact section or mananmmaisheri23@gmail.com.
            
            User message: ${input}` }]
          }
        ],
      });
      
      const botResponse = response.text || "I'm not sure how to answer that right now.";
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I'm having trouble thinking right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-imperial text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 imperial-glow"
      >
        <MessageCircle size={30} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-32 right-8 w-[400px] h-[600px] bg-night border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 glass-card"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-imperial rounded-full flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Manan AI</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-white/50 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'bg-imperial/20 text-imperial'}`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-imperial text-white rounded-tr-none' : 'bg-white/5 text-white/80 rounded-tl-none'}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-imperial/20 text-imperial rounded-full flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1">
                      <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/10 bg-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full bg-night border border-white/10 rounded-xl px-6 py-4 pr-16 focus:outline-none focus:border-imperial transition-colors text-white"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-imperial text-white rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
