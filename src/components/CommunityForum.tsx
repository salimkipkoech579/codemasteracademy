import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  CheckCircle2, 
  Search, 
  PlusCircle, 
  Tag, 
  User, 
  Send
} from 'lucide-react';
import { FORUM_POSTS } from '../data/coursesData';
import { ForumPost } from '../types';

interface CommunityForumProps {
  darkMode: boolean;
}

export const CommunityForum: React.FC<CommunityForumProps> = ({ darkMode }) => {
  const [posts, setPosts] = useState<ForumPost[]>(FORUM_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleUpvote = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const created: ForumPost = {
      id: `post-${Date.now()}`,
      authorName: 'Alex Johnson',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      authorRole: 'Student',
      title: newTitle,
      content: newContent,
      category: 'General Q&A',
      tags: ['Question', 'CodeMaster'],
      upvotes: 1,
      repliesCount: 0,
      createdAt: 'Just now',
    };

    setPosts([created, ...posts]);
    setNewTitle('');
    setNewContent('');
    setNewPostOpen(false);
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Peer & Instructor Q&A</span>
          <h1 className="text-3xl font-extrabold tracking-tight">Community Discussion Forums</h1>
        </div>

        <button
          onClick={() => setNewPostOpen(!newPostOpen)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1.5 self-start"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Ask Question</span>
        </button>
      </div>

      {newPostOpen && (
        <form onSubmit={handleCreatePost} className={`p-6 rounded-3xl border space-y-3 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <h3 className="text-sm font-bold">Ask the Engineering Community</h3>
          <input
            type="text"
            required
            placeholder="What is your question? (Be specific)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500"
          />
          <textarea
            rows={4}
            required
            placeholder="Provide code snippets or context..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500"
          />
          <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white">
            Post Question
          </button>
        </form>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className={`p-6 rounded-2xl border space-y-4 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center space-x-3">
                <img src={post.authorAvatar} alt={post.authorName} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-bold flex items-center space-x-1.5">
                    <span>{post.authorName}</span>
                    <span className="text-[10px] text-slate-400">({post.authorRole})</span>
                    {post.isSolved && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        ✓ Solved
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400">{post.createdAt}</div>
                </div>
              </div>

              <button
                onClick={() => handleUpvote(post.id)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-xs text-slate-300 font-bold"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-blue-400" />
                <span>{post.upvotes}</span>
              </button>
            </div>

            <h3 className="text-base font-bold">{post.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {post.tags.map((t, idx) => (
                <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  #{t}
                </span>
              ))}
            </div>

            {/* Replies */}
            {post.replies && post.replies.map((reply) => (
              <div key={reply.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{reply.authorName}</span>
                  {reply.isInstructor && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-blue-500 text-white">Instructor</span>
                  )}
                </div>
                <p className="text-slate-300 text-xs">{reply.content}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
};
