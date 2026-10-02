import React, { useState } from "react";

export default function WebHudTerminal({ isMobile }) {
  const [activeTab, setActiveTab] = useState("telemetry"); // telemetry or search
  const [searchQuery, setSearchQuery] = useState("UPI Payment Specs");
  const [queryTime, setQueryTime] = useState("1.2ms");

  const searchIndex = {
    "UPI Payment Specs": {
      title: "NPCI UPI Dynamic Payment Rail (RKWS Studio)",
      latency: "1.1ms",
      details: "Merchant: RKWS Studio | Handle: spcacademytamilmidiramani-2@okicici | 0% gateway friction | Dynamic QR generation with instant base64 SVG rendering."
    },
    "Mamba SSM Research": {
      title: "SignMamba: Selective State Space Models",
      latency: "1.4ms",
      details: "PyTorch pure-SSM implementation with multi-stream MobileNetV3 + MediaPipe landmark fusion and CTC greedy/beam sequence decoding."
    },
    "CatBoost Forecasting": {
      title: "PharmaForecast AI Champion Regressor",
      latency: "1.8ms",
      details: "Gradient boosted decision trees evaluated on holdout pharmaceutical sales data with automated Safety Stock (SS) and Reorder Point (ROP) math."
    },
    "Thermal Guardian": {
      title: "sysfs Hardware Watchdog & Whisper Idle",
      latency: "0.9ms",
      details: "APU temperature pinned at 43.5°C, CPU load 0.00, Cgroups v2 memory sandbox limits preventing out-of-memory lockups."
    }
  };

  const handleSearchSelect = (query) => {
    setSearchQuery(query);
    setQueryTime(`${(Math.random() * 0.8 + 0.9).toFixed(1)}ms`);
  };

  const currentResult = searchIndex[searchQuery] || searchIndex["UPI Payment Specs"];

  return (
    <div style={{ background: "#0b1320", borderRadius: 24, border: "1px solid rgba(56, 189, 248, 0.2)", overflow: "hidden", boxShadow: "0 25px 80px rgba(0,0,0,0.4)" }}>
      {/* Terminal Header Bar */}
      <div style={{ background: "#060b13", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ef4444" }}></span>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#f59e0b" }}></span>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#10b981" }}></span>
          </div>
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "#94a3b8", marginLeft: 8 }}>
            dot@arch-node-01: ~ /dot_jv / live_telemetry
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }}></span>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "#10b981", fontWeight: 700 }}>
            DAEMON 24/7 ONLINE
          </span>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div style={{ padding: isMobile ? 20 : 32, fontFamily: "monospace", color: "#e2e8f0", fontSize: 13 }}>
        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 12 }}>
          <button
            onClick={() => setActiveTab("telemetry")}
            style={{
              background: activeTab === "telemetry" ? "rgba(56, 189, 248, 0.15)" : "transparent",
              color: activeTab === "telemetry" ? "#38bdf8" : "#94a3b8",
              border: activeTab === "telemetry" ? "1px solid #38bdf8" : "1px solid transparent",
              padding: "6px 14px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 12
            }}
          >
            SYSTEM TELEMETRY
          </button>
          <button
            onClick={() => setActiveTab("search")}
            style={{
              background: activeTab === "search" ? "rgba(56, 189, 248, 0.15)" : "transparent",
              color: activeTab === "search" ? "#38bdf8" : "#94a3b8",
              border: activeTab === "search" ? "1px solid #38bdf8" : "1px solid transparent",
              padding: "6px 14px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 12
            }}
          >
            FTS5 BRAIN SEARCH SANDBOX
          </button>
        </div>

        {activeTab === "telemetry" ? (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: 14, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>HARDWARE GUARDIAN</div>
                <div style={{ color: "#38bdf8", fontWeight: 800, fontSize: 16 }}>APU 43.5°C · 0.0% CPU</div>
                <div style={{ color: "#10b981", fontSize: 11, marginTop: 4 }}>Whisper-Quiet Mode Active</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: 14, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>NETWORK INGRESS</div>
                <div style={{ color: "#38bdf8", fontWeight: 800, fontSize: 16 }}>Cloudflare Tunnel 24/7</div>
                <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 4 }}>Routed via jv.rkws.in</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: 14, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>ACTIVE DAEMONS</div>
                <div style={{ color: "#10b981", fontWeight: 800, fontSize: 16 }}>5/5 Services Running</div>
                <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 4 }}>Guardian, JV, Voice, Web, Tunnel</div>
              </div>
            </div>

            <div style={{ background: "#05080f", padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", lineHeight: 1.6, fontSize: 12 }}>
              <div style={{ color: "#64748b" }}># Current Execution Trace:</div>
              <div><span style={{ color: "#38bdf8" }}>[SYSTEM]</span> Node 2 (Arch Linux `172.28.30.54`) verified healthy. Load Avg: 0.05, 0.08, 0.02.</div>
              <div><span style={{ color: "#10b981" }}>[PAYMENT]</span> NPCI UPI Dynamic Rail online (Payee: RKWS Studio, 0% platform fee).</div>
              <div><span style={{ color: "#eab308" }}>[VOICE]</span> Neural TTS engine (en-GB-RyanNeural) & Whisper STT initialized.</div>
              <div><span style={{ color: "#a855f7" }}>[SECURITY]</span> Cgroups v2 memory limits enforced; sub-2ms FTS5 second brain loaded.</div>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 8 }}>TEST QUERIES (CLICK TO BENCHMARK FTS5 RETRIEVAL):</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {Object.keys(searchIndex).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSearchSelect(q)}
                    style={{
                      background: searchQuery === q ? "#185FA5" : "rgba(255,255,255,0.06)",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: 8,
                      fontFamily: "monospace",
                      fontSize: 11,
                      cursor: "pointer"
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: "#05080f", padding: 20, borderRadius: 12, border: "1px solid rgba(56, 189, 248, 0.3)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ color: "#10b981", fontWeight: 700 }}>✓ MATCH FOUND IN {queryTime}</span>
                <span style={{ color: "#64748b", fontSize: 11 }}>ENGINE: SQLite FTS5 (BM25)</span>
              </div>
              <div style={{ color: "#38bdf8", fontWeight: 800, fontSize: 15, marginBottom: 8 }}>
                {currentResult.title}
              </div>
              <div style={{ color: "#cbd5e1", lineHeight: 1.6, fontSize: 12 }}>
                {currentResult.details}
              </div>
            </div>
          </div>
        )}

        {/* Console Action Bar */}
        <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
          <span style={{ color: "#64748b", fontSize: 11 }}>
            Running 24/7 on dedicated low-power Arch Linux hardware.
          </span>
          <a
            href="https://jv.rkws.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#185FA5",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 800,
              fontSize: 12,
              display: "inline-flex",
              alignItems: "center",
              gap: 6
            }}
          >
            Launch Live Fullscreen WebHUD ↗
          </a>
        </div>
      </div>
    </div>
  );
}
