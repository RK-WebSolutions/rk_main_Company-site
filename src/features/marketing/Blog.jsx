import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import siteContent from "../../data/siteContent.js";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = ["all", ...new Set(siteContent.blog.posts.map(p => p.category))];
  
  const filteredPosts = siteContent.blog.posts.filter(post => {
    const matchesFilter = filter === "all" || post.category === filter;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredPost = siteContent.blog.posts.find(p => p.featured);

  if (selectedPost) {
    return (
      <section style={{ padding: "100px 24px", background: "#fff", minHeight: "100vh" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <button 
            onClick={() => {
              setSelectedPost(null);
              window.scrollTo(0,0);
            }}
            style={{ 
              marginBottom: 40, 
              background: "none", 
              border: "none", 
              color: "#185FA5", 
              fontWeight: 700, 
              display: "flex", 
              alignItems: "center", 
              gap: 8, 
              cursor: "pointer",
              fontSize: 13
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> BACK TO ARTICLES
          </button>

          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 16, fontSize: 13, fontWeight: 700, color: "#185FA5" }}>
              <span>{selectedPost.category}</span>
              <span style={{ color: "#cbd5e1" }}>•</span>
              <span style={{ color: "#5d6570" }}>{selectedPost.date}</span>
            </div>
            <h1 style={{ fontSize: 40, fontWeight: 800, color: "#081420", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 24 }}>{selectedPost.title}</h1>
            
            {selectedPost.image && (
              <div style={{ width: "100%", borderRadius: 32, overflow: "hidden", marginBottom: 32, position: "relative", border: "1px solid rgba(0,0,0,0.05)" }}>
                <img src={selectedPost.image} alt={selectedPost.title} style={{ width: "100%", height: "auto", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%)", opacity: 0.3 }}></div>
              </div>
            )}

            <p style={{ fontSize: 18, color: "#5d6570", fontStyle: "italic", lineHeight: 1.6 }}>{selectedPost.summary || selectedPost.excerpt}</p>
          </div>

          <div className="blog-content" style={{ fontSize: 17, lineHeight: 1.8, color: "#1e293b" }}>
            {selectedPost.content.split('\n').map((line, i) => {
              const trimmedLine = line.trim();
              if (trimmedLine.startsWith('###')) return <h3 key={i} style={{ fontSize: 28, fontWeight: 800, marginTop: 56, marginBottom: 20, color: "#081420", letterSpacing: "-0.02em" }}>{line.replace(/^###\s*/, '')}</h3>;
              if (trimmedLine === '---') return <hr key={i} style={{ margin: "48px 0", border: "none", borderTop: "1px solid #e2e8f0" }} />;
              
              const formattedLine = line
                .replace(/\*\*(.+?)\*\*/g, '<strong style="color: #081420; font-weight: 800;">$1</strong>')
                .replace(/❌/g, '<span style="color: #ef4444;">❌</span>')
                .replace(/✅/g, '<span style="color: #22c55e;">✅</span>')
                .replace(/🚩/g, '<span style="color: #f97316;">🚩</span>')
                .replace(/₹/g, '<span style="font-weight: 700;">₹</span>');

              if (trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
                return <li key={i} style={{ marginLeft: 24, marginBottom: 12, paddingLeft: 8 }} dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^[-*]\s*/, '') }} />;
              }
              
              if (/^\d+\./.test(trimmedLine)) {
                return <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16, paddingLeft: 8 }}>
                  <span style={{ fontWeight: 800, color: "#185FA5" }}>{trimmedLine.match(/^\d+\./)[0]}</span>
                  <span dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^\d+\.\s*/, '') }} />
                </div>;
              }

              if (!trimmedLine) return <div key={i} style={{ height: 20 }} />;
              
              return <p key={i} style={{ marginBottom: 24 }} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
            })}
          </div>

          <div style={{ marginTop: 80, padding: 40, background: "#f8fbff", borderRadius: 24, textAlign: "center" }}>
            <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Need help with your {selectedPost.category.toLowerCase()}?</h4>
            <p style={{ color: "#5d6570", marginBottom: 24 }}>Let's build a website that actually grows your business.</p>
            <Link to="/" style={{ display: "inline-block", background: "#185FA5", color: "#fff", padding: "14px 28px", borderRadius: 12, textDecoration: "none", fontWeight: 700 }}>GET A FREE QUOTE</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" style={{ padding: "100px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
           <Link to="/" style={{ fontSize: 13, fontWeight: 700, color: "#185FA5", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> BACK TO HOME
           </Link>
        </div>
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 13, fontWeight: 800, color: "#185FA5", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>{siteContent.blog.heading}</h2>
          <h3 style={{ fontSize: 32, fontWeight: 700, color: "#081420", maxWidth: 600 }}>{siteContent.blog.subheading}</h3>
        </div>

        {/* 🔍 Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  border: "1px solid",
                  borderColor: filter === cat ? "#185FA5" : "#e2e8f0",
                  background: filter === cat ? "#185FA5" : "transparent",
                  color: filter === cat ? "#fff" : "#5d6570",
                  cursor: "pointer",
                  transition: "0.2s"
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <input 
            type="text" 
            placeholder="Search resources..."
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "12px 20px", borderRadius: 12, border: "1px solid #e2e8f0", width: "100%", maxWidth: 300 }}
          />
        </div>

        {/* 🌟 Featured Post */}
        {featuredPost && filter === "all" && !searchTerm && (
          <div 
            onClick={() => {
              setSelectedPost(featuredPost);
              window.scrollTo(0,0);
            }}
            style={{ 
              display: "grid", 
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", 
              background: "#f8fbff", 
              borderRadius: 32, 
              overflow: "hidden", 
              marginBottom: 48,
              border: "1px solid rgba(0,0,0,0.03)",
              cursor: "pointer"
            }}
          >
             <div style={{ padding: isMobile ? "40px" : "60px" }}>
               <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                 <span style={{ fontSize: 11, fontWeight: 800, color: "#185FA5", background: "#E6F1FB", padding: "4px 12px", borderRadius: 20 }}>FEATURED</span>
                 <span style={{ fontSize: 11, fontWeight: 800, color: "#5d6570" }}>{featuredPost.date}</span>
               </div>
               <h4 style={{ fontSize: 32, fontWeight: 700, color: "#081420", marginBottom: 24, lineHeight: 1.2 }}>{featuredPost.title}</h4>
               <p style={{ fontSize: 16, color: "#5d6570", lineHeight: 1.6, marginBottom: 32 }}>{featuredPost.excerpt}</p>
               <button style={{ color: "#185FA5", fontWeight: 700, background: "none", border: "none", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  READ ARTICLE <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
               </button>
             </div>
             <div style={{ background: "#E6F1FB", display: "grid", placeItems: "center", overflow: "hidden" }}>
                {featuredPost.image ? (
                  <img src={featuredPost.image} alt={featuredPost.title} style={{ width: "100%", height: "auto", display: "block" }} />
                ) : (
                  <div style={{ fontSize: 80 }}>📰</div>
                )}
             </div>
          </div>
        )}

        {/* 📚 Posts Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
          {filteredPosts.filter(p => !p.featured || searchTerm || filter !== "all").map((post, i) => (
            <div 
              key={i} 
              onClick={() => {
                setSelectedPost(post);
                window.scrollTo(0,0);
              }}
              style={{ group: "blog-card", cursor: "pointer" }}
            >
              <div style={{ borderRadius: 24, background: "#f8fbff", marginBottom: 24, display: "grid", placeItems: "center", fontSize: 40, border: "1px solid rgba(0,0,0,0.03)", overflow: "hidden" }}>
                {post.image ? (
                  <img src={post.image} alt={post.title} style={{ width: "100%", height: "auto", display: "block" }} />
                ) : (
                  post.category === "SEO & Google" ? "🔍" : post.category === "Coimbatore & TN" ? "📍" : "💼"
                )}
              </div>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#185FA5", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>{post.category}</div>
              <h4 style={{ fontSize: 20, fontWeight: 700, color: "#081420", marginBottom: 16, lineHeight: 1.4 }}>{post.title}</h4>
              <p style={{ fontSize: 14, color: "#5d6570", lineHeight: 1.6, marginBottom: 24 }}>{post.excerpt}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#94a3b8", fontSize: 12, fontWeight: 700 }}>
                 <span>{post.date}</span>
                 <span>{post.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
