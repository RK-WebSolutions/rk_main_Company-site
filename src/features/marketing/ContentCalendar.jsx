import React from "react";
import { Link } from "react-router-dom";
import siteContent from "../../data/siteContent.js";

export default function ContentCalendar() {
  return (
    <section id="roadmap" style={{ padding: "100px 24px", background: "#081420", color: "#fff" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
           <Link to="/" style={{ fontSize: 13, fontWeight: 700, color: "#3da9ff", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> BACK TO HOME
           </Link>
        </div>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: 13, fontWeight: 800, color: "#3da9ff", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Strategy</h2>
          <h3 style={{ fontSize: 40, fontWeight: 700 }}>{siteContent.calendar.heading}</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: 16 }}>Precision-engineered content mapping for market dominance.</p>
        </div>

        <div style={{ display: "grid", gap: 24 }}>
          {siteContent.calendar.months.map((month, i) => (
            <div key={i} style={{ 
              background: "rgba(255,255,255,0.03)", 
              border: "1px solid rgba(255,255,255,0.05)", 
              borderRadius: 24, 
              padding: 40,
              display: "grid",
              gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "200px 1fr",
              gap: 40
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#3da9ff", marginBottom: 8 }}>{month.name}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{month.topic}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 12, fontWeight: 600 }}>CANDIDATE POST</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>"{month.post}"</div>
                
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
                  {month.keywords.map((kw, j) => (
                    <span key={j} style={{ background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: 8, fontSize: 11, fontWeight: 500 }}>{kw}</span>
                  ))}
                </div>

                <button style={{ 
                  background: "#3da9ff", 
                  color: "#081420", 
                  border: "none", 
                  padding: "10px 20px", 
                  borderRadius: 8, 
                  fontSize: 12, 
                  fontWeight: 800,
                  cursor: "pointer"
                }}>
                  GENERATE ASSETS ↗
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          marginTop: 64, 
          padding: 32, 
          borderRadius: 24, 
          background: "linear-gradient(135deg, rgba(61, 169, 255, 0.1) 0%, rgba(0,0,0,0) 100%)",
          border: "1px solid rgba(61, 169, 255, 0.2)"
        }}>
          <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Development Process</h4>
          <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", display: "flex", gap: 12 }}>
              <span style={{ color: "#3da9ff" }}>•</span> One high-authority post per month (800-1200 words).
            </li>
            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", display: "flex", gap: 12 }}>
              <span style={{ color: "#3da9ff" }}>•</span> Targeted keyword clusters for Coimbatore local dominance.
            </li>
            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", display: "flex", gap: 12 }}>
              <span style={{ color: "#3da9ff" }}>•</span> Cross-platform syndication (LinkedIn + GMB).
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
