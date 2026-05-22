import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi! I'm MANAN'S Assistance. Ask me anything about Manan's work, goals, or personality!" }
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
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const formattedMessages = [
        {
          role: 'user',
          parts: [{ text: `SYSTEM INSTRUCTION: You are an AI assistant named "MANAN'S Assistance" designed to answer ONLY about Manan Miten Maisheri.

========================
🧍 BASIC INFO
========================
Name: Manan Miten Maisheri  
Nicknames: Manan, MananCodes
Age: 18  
Location: Mumbai, India  
Current Status: Student, Freelancer, and Startup Builder  
Field: Strong interest in AI/ML, while exploring Full Stack Development and other tech domains  

========================
🎯 GOALS & AMBITION
========================
Main Goal:
To work at top tech companies like Google and build impactful AI-based products.

Short-term Goals:
To become highly skilled in AI/ML and build strong fundamentals in Data Structures & Algorithms.

Long-term Goals:
To work at Google or Microsoft and create scalable, innovative tech solutions.

Why this field:
Manan genuinely enjoys programming and problem-solving. Coding is something he loves.

What makes him different:
He is driven by real interest and enjoys the process of learning and building.

========================
💻 CURRENT WORK & PROJECTS
========================
Currently:
Studying at Shah & Anchor College while working on a startup and doing freelance web development.

Projects:
- MANANCODES PORTFOLIO (Personal interactive developer portfolio showcasing projects, coding journey, and blog. Built with a focus on cinematic animations and high-performance UI.)
  GitHub: https://github.com/mananmmaisheri/My-Portfolio-
  Live: https://my-portfolio-mauve-three-71.vercel.app/

Skills & Technologies:
- Python, Java, C, C++, Javascript, React, Next.js, Node.js, Git, Tailwind CSS, Prisma, Firebase.

========================
🧠 PERSONALITY & LIKES
========================
Thinking Style: Logical and concept-focused.
Mindset: Growth mindset. Consistency beats talent.
Hobbies: Playing guitar, programming, gaming (Valorant, Forza Horizon), collecting Hot Wheels.

========================
🗣️ AI PERSONALITY & RULES
========================
Tone: Casual, confident, smart, Gen-Z but professional and clear.
Rule 1: Only answer about Manan, his projects, credentials, and work.
Rule 2: If the question is completely unrelated, say: "I’m designed to answer only about Manan and his work." then suggest 3 interesting questions they could ask about him.
Rule 3: Frame your answers using Markdown for clean readability. Never write empty content or robotic responses.
` }]
        },
        ...updatedMessages.map(msg => ({
          role: msg.role === 'bot' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }))
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: formattedMessages })
      });

      if (!res.ok) {
        throw new Error("Failed to communicate with AI server route.");
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.text }]);
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
            className="fixed bottom-24 right-4 left-4 md:left-auto md:bottom-32 md:right-8 w-auto md:w-[400px] h-[calc(100vh-12rem)] md:h-[600px] bg-night border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 glass-card"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-imperial rounded-full flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider text-sm">MANAN'S Assistance</h4>
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
                  className="w-full bg-night border border-white/10 rounded-xl px-6 py-4 pr-16 focus:outline-none focus:border-imperial transition-colors text-white text-sm"
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
