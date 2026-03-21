import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { LayoutDashboard, FileText, Briefcase, MessageSquare, LogOut, Plus, Trash2, ExternalLink } from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'blog' | 'messages'>('overview');
  
  const [projects, setProjects] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        window.location.href = '/login';
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubProjects = onSnapshot(query(collection(db, 'projects'), orderBy('order', 'asc')), (snap) => {
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubPosts = onSnapshot(query(collection(db, 'blog_posts'), orderBy('date', 'desc')), (snap) => {
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubMessages = onSnapshot(query(collection(db, 'messages'), orderBy('createdAt', 'desc')), (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubProjects();
      unsubPosts();
      unsubMessages();
    };
  }, [user]);

  const handleDelete = async (coll: string, id: string) => {
    if (window.confirm('Are you sure?')) {
      await deleteDoc(doc(db, coll, id));
    }
  };

  if (loading) return <div className="min-h-screen bg-night flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-night flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-8 flex flex-col fixed h-full">
        <div className="text-xl font-bold tracking-tighter text-white mb-12">
          ADMIN<span className="text-imperial">.</span>
        </div>
        
        <nav className="flex-1 space-y-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 transition-colors w-full p-3 rounded-xl ${activeTab === 'overview' ? 'bg-imperial text-white' : 'text-white/70 hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-3 transition-colors w-full p-3 rounded-xl ${activeTab === 'projects' ? 'bg-imperial text-white' : 'text-white/70 hover:bg-white/5'}`}
          >
            <Briefcase size={20} /> Projects
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={`flex items-center gap-3 transition-colors w-full p-3 rounded-xl ${activeTab === 'blog' ? 'bg-imperial text-white' : 'text-white/70 hover:bg-white/5'}`}
          >
            <FileText size={20} /> Blog Posts
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-3 transition-colors w-full p-3 rounded-xl ${activeTab === 'messages' ? 'bg-imperial text-white' : 'text-white/70 hover:bg-white/5'}`}
          >
            <MessageSquare size={20} /> Messages
          </button>
        </nav>

        <button 
          onClick={() => signOut(auth)}
          className="flex items-center gap-3 text-white/30 hover:text-imperial transition-colors mt-auto p-3"
        >
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-12">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black tracking-tighter capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/50">{user?.email}</span>
            <img src={user?.photoURL} className="w-10 h-10 rounded-full border border-imperial" referrerPolicy="no-referrer" />
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl">
              <h4 className="text-white/50 text-xs font-mono uppercase tracking-widest mb-2">Total Projects</h4>
              <span className="text-4xl font-black">{projects.length}</span>
            </div>
            <div className="glass-card p-8 rounded-3xl">
              <h4 className="text-white/50 text-xs font-mono uppercase tracking-widest mb-2">Blog Posts</h4>
              <span className="text-4xl font-black">{posts.length}</span>
            </div>
            <div className="glass-card p-8 rounded-3xl">
              <h4 className="text-white/50 text-xs font-mono uppercase tracking-widest mb-2">Messages</h4>
              <span className="text-4xl font-black text-imperial">{messages.length}</span>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <button className="flex items-center gap-2 px-6 py-3 bg-imperial text-white font-bold rounded-xl hover:scale-105 transition-transform">
              <Plus size={20} /> ADD PROJECT
            </button>
            <div className="grid grid-cols-1 gap-4">
              {projects.map(p => (
                <div key={p.id} className="glass-card p-6 rounded-2xl flex justify-between items-center">
                  <div>
                    <h4 className="text-xl font-bold">{p.title}</h4>
                    <p className="text-white/50 text-sm">{p.tech?.join(', ')}</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => handleDelete('projects', p.id)} className="text-white/30 hover:text-imperial transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="space-y-6">
            <button className="flex items-center gap-2 px-6 py-3 bg-imperial text-white font-bold rounded-xl hover:scale-105 transition-transform">
              <Plus size={20} /> NEW POST
            </button>
            <div className="grid grid-cols-1 gap-4">
              {posts.map(p => (
                <div key={p.id} className="glass-card p-6 rounded-2xl flex justify-between items-center">
                  <div>
                    <h4 className="text-xl font-bold">{p.title}</h4>
                    <p className="text-white/50 text-sm">{p.slug}</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => handleDelete('blog_posts', p.id)} className="text-white/30 hover:text-imperial transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6">
            {messages.map(m => (
              <div key={m.id} className="glass-card p-8 rounded-3xl space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold">{m.name}</h4>
                    <p className="text-imperial text-sm font-mono">{m.email}</p>
                  </div>
                  <span className="text-white/30 text-xs">{m.createdAt?.toDate()?.toLocaleString()}</span>
                </div>
                <p className="text-white/70 leading-relaxed">{m.message}</p>
                <button onClick={() => handleDelete('messages', m.id)} className="text-white/20 hover:text-imperial transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
