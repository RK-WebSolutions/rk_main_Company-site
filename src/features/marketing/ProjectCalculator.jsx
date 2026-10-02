import React, { useState } from "react";
import siteContent from "../../data/siteContent.js";

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <polyline points="3 7 6 10 11 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ProjectCalculator({ isMobile }) {
  const [currency, setCurrency] = useState("INR"); // INR or USD
  const [projectType, setProjectType] = useState("web_app");
  const [pages, setPages] = useState(5);
  const [timeline, setTimeline] = useState("standard"); // standard or express
  const [features, setFeatures] = useState({
    upi: true,
    voice: false,
    brain: false,
    tunnel: true,
    analytics: false
  });
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const isUSD = currency === "USD";
  const rateMultiplier = isUSD ? 0.0125 : 1;

  const basePrices = {
    web_app: { inr: 18000, name: "High-Performance Web Platform", desc: "React 19 / Next.js 15, sub-500ms edge LCP, SEO-engineered" },
    ai_bot: { inr: 15000, name: "Autonomous AI & Bot Sentinel", desc: "24/7 Telegram / WhatsApp agent, STT voice loop, lead capture" },
    ecommerce: { inr: 28000, name: "Dynamic Payments & E-Commerce", desc: "Zero-fee UPI QR, instant invoicing, inventory scale engine" },
    enterprise: { inr: 45000, name: "Enterprise AI & Cloud Engine", desc: "FastAPI, PostgreSQL/Supabase, predictive ML & cloud daemons" }
  };

  const featureCosts = {
    upi: { inr: 4500, label: "Dynamic UPI QR & Zero-Fee Rail", icon: "💳" },
    voice: { inr: 6000, label: "Two-Way Neural Voice STT/TTS", icon: "🎙️" },
    brain: { inr: 7500, label: "Sub-2ms SQLite FTS5 Brain Search", icon: "🧠" },
    tunnel: { inr: 4000, label: "Cloudflare Edge Tunnel & Daemons", icon: "🌐" },
    analytics: { inr: 6500, label: "Real-Time Telemetry Dashboard", icon: "📊" }
  };

  // Cost calculation
  const baseCost = basePrices[projectType].inr;
  const extraPages = Math.max(0, pages - 3);
  const pageCost = extraPages * 1500;
  
  const featureCost = Object.keys(features).reduce((acc, k) => {
    return features[k] ? acc + featureCosts[k].inr : acc;
  }, 0);

  const subtotalINR = baseCost + pageCost + featureCost;
  const speedMultiplier = timeline === "express" ? 1.25 : 1.0;
  const finalINR = Math.round(subtotalINR * speedMultiplier);
  const finalUSD = Math.round(finalINR * 0.0125);

  const formattedPrice = isUSD ? `$${finalUSD.toLocaleString()}` : `₹${finalINR.toLocaleString()}`;

  const toggleFeature = (k) => {
    setFeatures(prev => ({ ...prev, [k]: !prev[k] }));
  };

  const generateWhatsAppLink = () => {
    const selectedFeats = Object.keys(features)
      .filter(k => features[k])
      .map(k => featureCosts[k].label)
      .join(", ");
    
    const text = encodeURIComponent(
      `Hi Ramani (RKWS Studio),\n\nI configured an estimate on rkws.in:\n` +
      `• Project: ${basePrices[projectType].name}\n` +
      `• Scope: ${pages} Pages / Modules\n` +
      `• Timeline: ${timeline === "express" ? "Express (5-7 Days)" : "Standard (10-14 Days)"}\n` +
      `• Features: ${selectedFeats || "None"}\n` +
      `• Estimated Investment: ${formattedPrice}\n\n` +
      `I'd like to review the architecture and start this project.`
    );
    return `https://wa.me/916385885560?text=${text}`;
  };

  return (
    <div style={{ background: "#fff", borderRadius: 28, padding: isMobile ? "28px 20px" : "48px 40px", border: "1px solid rgba(24, 95, 165, 0.12)", boxShadow: "0 24px 70px rgba(8, 20, 32, 0.04)" }}>
      {/* Header & Currency Switcher */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20, marginBottom: 36, borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: 24 }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 800, color: "#185FA5", textTransform: "uppercase", letterSpacing: "0.15em", display: "block", marginBottom: 6 }}>
            Interactive Architecture Planner
          </span>
          <h3 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, color: "#081420", margin: 0 }}>
            Project Scope & Investment Calculator
          </h3>
        </div>

        {/* Currency Switcher */}
        <div style={{ display: "inline-flex", background: "#f1f5f9", padding: 4, borderRadius: 12, border: "1px solid rgba(0,0,0,0.04)" }}>
          <button
            onClick={() => setCurrency("INR")}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: "none",
              fontSize: 13,
              fontWeight: 800,
              cursor: "pointer",
              background: currency === "INR" ? "#185FA5" : "transparent",
              color: currency === "INR" ? "#fff" : "#64748b",
              transition: "0.2s"
            }}
          >
            ₹ INR
          </button>
          <button
            onClick={() => setCurrency("USD")}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: "none",
              fontSize: 13,
              fontWeight: 800,
              cursor: "pointer",
              background: currency === "USD" ? "#185FA5" : "transparent",
              color: currency === "USD" ? "#fff" : "#64748b",
              transition: "0.2s"
            }}
          >
            $ USD
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr", gap: 36 }}>
        {/* Controls Column */}
        <div>
          {/* 1. Project Type */}
          <div style={{ marginBottom: 32 }}>
            <label style={{ fontSize: 13, fontWeight: 800, color: "#081420", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 14 }}>
              1. Select Architecture Paradigm
            </label>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
              {Object.keys(basePrices).map((key) => {
                const item = basePrices[key];
                const active = projectType === key;
                return (
                  <div
                    key={key}
                    onClick={() => setProjectType(key)}
                    style={{
                      padding: 16,
                      borderRadius: 16,
                      border: active ? "2px solid #185FA5" : "1px solid #e2e8f0",
                      background: active ? "#f0f7ff" : "#fff",
                      cursor: "pointer",
                      transition: "0.2s"
                    }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 800, color: active ? "#185FA5" : "#081420", marginBottom: 4 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.4 }}>
                      {item.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Scale / Page Count */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 800, color: "#081420", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                2. Scope & Complexity ({pages} {pages === 1 ? "Module / Page" : "Modules / Pages"})
              </label>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#185FA5" }}>
                {pages <= 3 ? "Standard Core" : `+${pages - 3} Extra Modules`}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              value={pages}
              onChange={(e) => setPages(parseInt(e.target.value))}
              style={{ width: "100%", accentColor: "#185FA5", cursor: "pointer", height: 6 }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94a3b8", fontWeight: 700, marginTop: 6 }}>
              <span>1 MVP Page</span>
              <span>5 Core Pages</span>
              <span>10 Scaled Platform</span>
              <span>15+ Enterprise Hub</span>
            </div>
          </div>

          {/* 3. Specialized Capabilities */}
          <div style={{ marginBottom: 32 }}>
            <label style={{ fontSize: 13, fontWeight: 800, color: "#081420", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 14 }}>
              3. Specialized Add-On Engines
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.keys(featureCosts).map((k) => {
                const f = featureCosts[k];
                const checked = features[k];
                const cost = isUSD ? `$${Math.round(f.inr * 0.0125)}` : `₹${f.inr.toLocaleString()}`;
                return (
                  <div
                    key={k}
                    onClick={() => toggleFeature(k)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      borderRadius: 14,
                      background: checked ? "#f8fbff" : "#f8fafc",
                      border: checked ? "1px solid #185FA5" : "1px solid #e2e8f0",
                      cursor: "pointer",
                      transition: "0.2s"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        border: checked ? "none" : "2px solid #cbd5e1",
                        background: checked ? "#185FA5" : "#fff",
                        display: "grid",
                        placeItems: "center",
                        color: "#fff"
                      }}>
                        {checked && <CheckIcon />}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: checked ? "#081420" : "#475569" }}>
                        {f.icon} {f.label}
                      </span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: checked ? "#185FA5" : "#94a3b8" }}>
                      +{cost}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Velocity Tier */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 800, color: "#081420", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 12 }}>
              4. Delivery Velocity
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div
                onClick={() => setTimeline("standard")}
                style={{
                  padding: 14,
                  borderRadius: 14,
                  border: timeline === "standard" ? "2px solid #185FA5" : "1px solid #e2e8f0",
                  background: timeline === "standard" ? "#f0f7ff" : "#fff",
                  cursor: "pointer",
                  textAlign: "center"
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 800, color: "#081420" }}>Standard Sprint</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>10–14 Days Delivery</div>
              </div>
              <div
                onClick={() => setTimeline("express")}
                style={{
                  padding: 14,
                  borderRadius: 14,
                  border: timeline === "express" ? "2px solid #185FA5" : "1px solid #e2e8f0",
                  background: timeline === "express" ? "#f0f7ff" : "#fff",
                  cursor: "pointer",
                  textAlign: "center"
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 800, color: "#185FA5" }}>⚡ Express Deployment</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>5–7 Days (+25% Priority)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Quotation Summary Column */}
        <div style={{ background: "#081420", color: "#fff", borderRadius: 24, padding: isMobile ? 24 : 32, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", color: "#38bdf8", textTransform: "uppercase" }}>
                Estimated Investment
              </span>
              <span style={{ background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 800 }}>
                {timeline === "express" ? "EXPRESS ⚡" : "FIXED ESTIMATE"}
              </span>
            </div>

            <div style={{ fontSize: isMobile ? 36 : 46, fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", marginBottom: 20 }}>
              {formattedPrice}
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
                Package Architecture Breakdown
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Base Architecture:</span>
                  <strong style={{ color: "#fff" }}>{basePrices[projectType].name}</strong>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Included Modules:</span>
                  <strong style={{ color: "#fff" }}>{pages} Screen(s)</strong>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Specialized Engines:</span>
                  <strong style={{ color: "#38bdf8" }}>{Object.values(features).filter(Boolean).length} Active</strong>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Turnaround Time:</span>
                  <strong style={{ color: "#fff" }}>{timeline === "express" ? "5–7 Days" : "10–14 Days"}</strong>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 14, marginBottom: 20, fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>
              🔒 <strong>100% IP Ownership:</strong> Zero recurring software agency licensing fees. You own all raw source code, assets, and database schemas.
            </div>

            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                background: "#1D9E75",
                color: "#fff",
                fontWeight: 800,
                fontSize: 15,
                padding: "16px",
                borderRadius: 14,
                textDecoration: "none",
                boxShadow: "0 10px 25px rgba(29, 158, 117, 0.3)",
                transition: "0.2s"
              }}
            >
              Lock Estimate & Book on WhatsApp ➔
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
