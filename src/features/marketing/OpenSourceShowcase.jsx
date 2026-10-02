import React from "react";

export default function OpenSourceShowcase({ isMobile }) {
  const ossProjects = [
    {
      title: "SignMamba (SLR-SSM)",
      badge: "PyTorch · Mamba SSM",
      category: "Deep Learning Sequence Modeling",
      description: "Continuous Sign Language Recognition utilizing hierarchical multi-scale Mamba State Space Models, MobileNetV3-Small RGB encoder, MediaPipe 3-stream landmark fusion, and CTC sequence loss.",
      github: "https://github.com/Ramani-21-05/SLR-SSM",
      tags: ["PyTorch", "Mamba SSM", "MediaPipe", "CTC Loss"]
    },
    {
      title: "ASL Real-Time Classifier",
      badge: "Edge CV · Sub-10ms",
      category: "Edge Computer Vision",
      description: "Decoupled gesture recognition pipeline combining Google MediaPipe 21-point 3D hand landmarks with a latency-optimized LightGBM GBDT classifier, delivering 30+ FPS real-time CPU inference.",
      github: "https://github.com/Ramani-21-05/asl-lightgbm-",
      tags: ["LightGBM", "MediaPipe", "Real-Time", "Zero GPU"]
    },
    {
      title: "Placement Reality",
      badge: "Next.js 15 · TypeScript",
      category: "Career Analytics Engine",
      description: "Full-stack campus recruitment readiness evaluator aggregating live GitHub commit volume, LeetCode algorithmic breadth, and academic scores to generate tiered corporate match ratings.",
      github: "https://github.com/Ramani-21-05/placement-reality",
      tags: ["Next.js 15", "TypeScript", "Tailwind", "REST API"]
    },
    {
      title: "PharmaForecast AI",
      badge: "CatBoost · FastAPI",
      category: "Enterprise Time-Series",
      description: "Pharmaceutical demand forecasting and stockout mitigation engine. Features CatBoost regression models with custom asymmetric loss, holdout validation, and automated ROP/Safety Stock logic.",
      github: "https://github.com/Ramani-21-05/shall-we-start",
      tags: ["CatBoost", "FastAPI", "Supabase", "Time Series"]
    }
  ];

  const unsungStack = [
    {
      tool: "SQLite FTS5",
      advantage: "Sub-2ms BM25 full-text search directly inside local storage. Replaces bloated 2GB+ Elasticsearch containers with zero runtime overhead.",
      icon: "⚡"
    },
    {
      tool: "DuckDB In-Process Lake",
      advantage: "Ultra-fast vectorized columnar analytics. Queries millions of rows in memory without requiring remote analytical databases.",
      icon: "🦆"
    },
    {
      tool: "Cgroups v2 & Systemd",
      advantage: "Hardware-level memory limits and auto-restart supervisors guaranteeing 24/7 autonomous uptime with zero memory leaks.",
      icon: "🛡️"
    },
    {
      tool: "Cloudflare Edge Tunnels",
      advantage: "End-to-end encrypted localhost-to-edge tunneling. Exposes internal services globally without open router ports or static IP charges.",
      icon: "🔒"
    }
  ];

  return (
    <div style={{ background: "#fff", borderRadius: 28, padding: isMobile ? "28px 20px" : "48px 40px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 20px 60px rgba(0,0,0,0.03)" }}>
      {/* Section Header */}
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#185FA5", textTransform: "uppercase", letterSpacing: "0.15em", display: "block", marginBottom: 8 }}>
          Proof-of-Work & Open Engineering
        </span>
        <h3 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 800, color: "#081420", marginBottom: 12 }}>
          Open-Source Systems & Unsung Weaponry
        </h3>
        <p style={{ maxWidth: 700, margin: "0 auto", color: "#64748b", fontSize: 15, lineHeight: 1.6 }}>
          We don't just consume technology; we build, optimize, and contribute back. Explore our open research repositories and high-leverage architectural primitives.
        </p>
      </div>

      {/* Flagship Repositories Grid */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24, marginBottom: 56 }}>
        {ossProjects.map((p, i) => (
          <div
            key={i}
            style={{
              padding: 28,
              borderRadius: 20,
              background: "#f8fbff",
              border: "1px solid rgba(24, 95, 165, 0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s"
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <span style={{ background: "#e0f2fe", color: "#0369a1", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 8 }}>
                  {p.badge}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>
                  {p.category}
                </span>
              </div>

              <h4 style={{ fontSize: 19, fontWeight: 800, color: "#081420", marginBottom: 10 }}>
                {p.title}
              </h4>
              <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                {p.description}
              </p>
            </div>

            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                {p.tags.map((t, j) => (
                  <span key={j} style={{ background: "#fff", border: "1px solid #e2e8f0", color: "#475569", padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#185FA5",
                  fontWeight: 800,
                  fontSize: 13,
                  textDecoration: "none"
                }}
              >
                Inspect Source Code on GitHub ➔
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* The Unsung Tools We Deploy */}
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h4 style={{ fontSize: 20, fontWeight: 800, color: "#081420", marginBottom: 6 }}>
            High-Leverage Tools Competitors Overlook
          </h4>
          <p style={{ color: "#64748b", fontSize: 13 }}>
            Architectural primitives that deliver 10x speed, zero recurring cloud bills, and battle-tested resilience.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: 16 }}>
          {unsungStack.map((item, idx) => (
            <div key={idx} style={{ background: "#f8fafc", padding: 20, borderRadius: 16, border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#081420", marginBottom: 6 }}>{item.tool}</div>
              <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>{item.advantage}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
