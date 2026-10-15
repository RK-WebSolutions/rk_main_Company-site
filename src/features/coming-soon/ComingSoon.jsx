import React, { useState, useEffect, useRef } from "react";
import "../../styles/coming-soon.css";

const DEV_THOUGHTS = [
  {
    time: "19:15 IST",
    text: "Architectural note: Keeping rkws.in pure and uncluttered. If a tool needs to go live today, it belongs on a sub-site.",
  },
  {
    time: "17:40 IST",
    text: "Contemplating UI layout: Why do so many landing pages look like cookie-cutter SaaS templates? We're taking our time to do this right.",
  },
  {
    time: "14:22 IST",
    text: "Fedora Linux workstation running at 48°C. Trading engines and data pipelines running stable on local nodes.",
  },
  {
    time: "11:05 IST",
    text: "Rule of simplicity: Zero unnecessary dependencies. The fastest code is the code you didn't have to load.",
  },
];

const SUBDOMAINS = [
  {
    name: "demo.rkws.in",
    desc: "Interactive client prototypes, sandbox simulations, and live interface demos.",
    status: "Active Deployment",
    state: "live",
  },
  {
    name: "preview.rkws.in",
    desc: "Staging sandbox for upcoming customer deliverables and feature experiments.",
    status: "Staging Pipeline",
    state: "live",
  },
  {
    name: "alpha.rkws.in",
    desc: "Autonomous agent execution nodes, quant backtest telemetry, and deep-tech logs.",
    status: "Private Node",
    state: "incubating",
  },
  {
    name: "api.rkws.in",
    desc: "Low-latency edge routing, webhook collectors, and background telemetry APIs.",
    status: "Edge Worker",
    state: "live",
  },
];

const NUDGE_RESPONSES = [
  "Dev: 'Felt that! Switching back from Hacker News to Neovim.'",
  "Dev: 'Hold on, just fixing a race condition in the backtester.'",
  "Dev: 'Cup #3 of coffee brewed. Lines of code refactored: 142.'",
  "Dev: 'Subdomains are already running! Main site is getting the artisan polish.'",
  "Dev: 'No generic AI-sludge templates here. Handcrafted systems only.'",
  "Dev: 'Currently debating whether this button should use flexbox or CSS grid.'",
  "Dev: 'Ping received loud and clear. Great things take time.'",
];

export default function ComingSoon() {
  const [activeTab, setActiveTab] = useState("thoughts");
  const [currentTime, setCurrentTime] = useState("");
  const [nudgeCount, setNudgeCount] = useState(() => {
    try {
      return parseInt(localStorage.getItem("rkws_nudges") || "24", 10);
    } catch {
      return 24;
    }
  });
  const [toastMessage, setToastMessage] = useState(null);

  // Terminal state
  const [cmdInput, setCmdInput] = useState("");
  const [termLines, setTermLines] = useState([
    { type: "out", text: "rkws-shell v1.0.4 (x86_64-pc-linux-gnu)" },
    { type: "out", text: "Apex domain 'rkws.in' is currently in incubation." },
    { type: "out", text: "Type 'help' to inspect available commands." },
  ]);
  const termEndRef = useRef(null);

  // Live Clock in IST
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setCurrentTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (activeTab === "terminal" && termEndRef.current) {
      termEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [termLines, activeTab]);

  const handleNudge = () => {
    const newCount = nudgeCount + 1;
    setNudgeCount(newCount);
    try {
      localStorage.setItem("rkws_nudges", newCount.toString());
    } catch {}

    const randomMsg =
      NUDGE_RESPONSES[Math.floor(Math.random() * NUDGE_RESPONSES.length)];
    setToastMessage(randomMsg);

    // Auto-dismiss toast
    setTimeout(() => {
      setToastMessage((prev) => (prev === randomMsg ? null : prev));
    }, 4000);
  };

  const handleCommand = (e) => {
    if (e.key !== "Enter") return;
    const trimmed = cmdInput.trim();
    if (!trimmed) return;

    const newHistory = [...termLines, { type: "cmd", text: `$ ${trimmed}` }];
    const lower = trimmed.toLowerCase();

    if (lower === "help") {
      newHistory.push({
        type: "out",
        text: "Available commands:\n  • status      - Query current incubator state\n  • subdomains  - List active sub-sites (*.rkws.in)\n  • whoami      - View developer identity & profile\n  • coffee      - Inject virtual caffeine into the dev\n  • nudge       - Poke the developer\n  • clear       - Clear terminal window\n  • github      - Open GitHub profile",
      });
    } else if (lower === "status") {
      newHistory.push({
        type: "out",
        text: "STATUS: 200 OK | State: Dev is Thinking | Scope: Main domain incubation | Subdomain mesh: Online",
      });
    } else if (lower === "subdomains") {
      newHistory.push({
        type: "out",
        text: "Active Subdomains:\n  → demo.rkws.in    (Live Demos)\n  → preview.rkws.in (Staging Previews)\n  → alpha.rkws.in   (Quant & Autonomous Telemetry)\n  → api.rkws.in     (Edge Workers)",
      });
    } else if (lower === "whoami") {
      newHistory.push({
        type: "out",
        text: "Ramani Krishnan — Systems & Quantitative Engineer.\nCrafting high-throughput financial engines, distributed agents, and clean software.",
      });
    } else if (lower === "coffee") {
      newHistory.push({
        type: "out",
        text: "☕ Espresso delivered! Brain clock speed boosted by +25%.",
      });
    } else if (lower === "nudge") {
      handleNudge();
      newHistory.push({
        type: "out",
        text: "⚡ Developer poked! Vibration sent to desk.",
      });
    } else if (lower === "clear") {
      setTermLines([]);
      setCmdInput("");
      return;
    } else if (lower === "github") {
      window.open("https://github.com/Ramani-21-05", "_blank");
      newHistory.push({
        type: "out",
        text: "Opening https://github.com/Ramani-21-05 in new window...",
      });
    } else {
      newHistory.push({
        type: "out",
        text: `bash: command not found: '${trimmed}'. Type 'help' for guidance.`,
      });
    }

    setTermLines(newHistory);
    setCmdInput("");
  };

  return (
    <div className="cs-universe">
      {/* Top Bar / Header */}
      <header className="cs-header">
        <a href="/" className="cs-brand">
          <div className="cs-logo-symbol">rk</div>
          <span className="cs-brand-text">rkws.in</span>
          <span className="cs-tag">incubation</span>
        </a>

        <div className="cs-header-center">
          <div className="cs-pulse-dot"></div>
          <span>The dev is thinking...</span>
        </div>

        <div className="cs-header-right">
          <div className="cs-clock">
            Coimbatore, IN <span>{currentTime || "19:30:00"} IST</span>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="cs-main">
        <div className="cs-hero-badge">
          <span>APEX DOMAIN</span>
          <span>•</span>
          <strong>RESERVED FOR FUTURE LAUNCH</strong>
        </div>

        <h1 className="cs-hero-title">
          The dev is thinking. <br />
          <span className="highlight">Great things take patience.</span>
        </h1>

        <p className="cs-hero-subtitle">
          You’ve arrived at the main portal of <strong>rkws.in</strong>. We’re
          intentionally holding back the primary website while the core
          architecture is being thoughtfully designed. No rushed templates or
          empty buzzwords.
        </p>

        {/* Subdomain Notice */}
        <div className="cs-subdomain-notice">
          <span className="cs-notice-icon">⚡</span>
          <div>
            <strong>Looking for our active builds?</strong> Live demos, client
            work, and active tools deploy exclusively on sub-sites like{" "}
            <code>demo.rkws.in</code> or <code>*.rkws.in</code>.
          </div>
        </div>

        {/* Interactive Workspace Card */}
        <div className="cs-card-container">
          <div className="cs-card-bar">
            <div className="cs-window-dots">
              <span className="cs-dot cs-dot-red"></span>
              <span className="cs-dot cs-dot-yellow"></span>
              <span className="cs-dot cs-dot-green"></span>
            </div>

            <div className="cs-card-tabs">
              <button
                className={`cs-tab-btn ${
                  activeTab === "thoughts" ? "active" : ""
                }`}
                onClick={() => setActiveTab("thoughts")}
              >
                <span>💭</span> Dev Mindstream
              </button>
              <button
                className={`cs-tab-btn ${
                  activeTab === "terminal" ? "active" : ""
                }`}
                onClick={() => setActiveTab("terminal")}
              >
                <span>⌨️</span> Interactive Shell
              </button>
              <button
                className={`cs-tab-btn ${
                  activeTab === "subdomains" ? "active" : ""
                }`}
                onClick={() => setActiveTab("subdomains")}
              >
                <span>🌐</span> Subdomain Mesh
              </button>
            </div>

            <span className="cs-card-status">mode: offline-craft</span>
          </div>

          {/* Tab 1: Dev Mindstream */}
          {activeTab === "thoughts" && (
            <div className="cs-tab-content">
              <div className="cs-thought-stream">
                {DEV_THOUGHTS.map((item, idx) => (
                  <div key={idx} className="cs-thought-item">
                    <span className="cs-thought-time">[{item.time}]</span>
                    <span className="cs-thought-text">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Terminal */}
          {activeTab === "terminal" && (
            <div className="cs-tab-content cs-terminal">
              <div className="cs-term-history">
                {termLines.map((line, i) => (
                  <div
                    key={i}
                    className={`cs-term-line ${
                      line.type === "cmd" ? "cs-term-cmd" : "cs-term-out"
                    }`}
                  >
                    <pre style={{ margin: 0, fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                      {line.text}
                    </pre>
                  </div>
                ))}
                <div ref={termEndRef} />
              </div>

              <div className="cs-term-input-row">
                <span className="cs-term-prompt">guest@rkws:~$</span>
                <input
                  type="text"
                  className="cs-term-input"
                  placeholder="type 'help', 'subdomains', or 'status'..."
                  value={cmdInput}
                  onChange={(e) => setCmdInput(e.target.value)}
                  onKeyDown={handleCommand}
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Tab 3: Subdomains */}
          {activeTab === "subdomains" && (
            <div className="cs-tab-content">
              <div className="cs-subdomain-grid">
                {SUBDOMAINS.map((sub, i) => (
                  <div key={i} className="cs-subdomain-card">
                    <span className="cs-subdomain-name">{sub.name}</span>
                    <span className="cs-subdomain-desc">{sub.desc}</span>
                    <span
                      className={`cs-subdomain-status ${
                        sub.state === "live" ? "live" : "incubating"
                      }`}
                    >
                      ● {sub.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Nudge & Action Row */}
        <div className="cs-actions-row">
          <button className="cs-nudge-btn" onClick={handleNudge}>
            <span>⚡ Nudge the Dev</span>
            <span className="cs-nudge-badge">{nudgeCount}</span>
          </button>

          <a
            href="https://github.com/Ramani-21-05"
            target="_blank"
            rel="noreferrer"
            className="cs-secondary-btn"
          >
            <span>GitHub Profile</span>
            <span>↗</span>
          </a>

          <a
            href="mailto:reach@rkws.in"
            className="cs-secondary-btn"
          >
            <span>Email Inquiries</span>
            <span>↗</span>
          </a>
        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="cs-toast">
          <span>💬</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="cs-footer">
        <div className="cs-footer-meta">
          <span>© {new Date().getFullYear()} RKWS Studio</span>
          <span>•</span>
          <span>Crafted with intention by Ramani</span>
          <span>•</span>
          <span>Zero third-party trackers</span>
        </div>

        <div className="cs-footer-links">
          <a
            href="https://github.com/Ramani-21-05"
            target="_blank"
            rel="noreferrer"
            className="cs-footer-link"
          >
            github.com/Ramani-21-05
          </a>
          <a href="mailto:reach@rkws.in" className="cs-footer-link">
            reach@rkws.in
          </a>
        </div>
      </footer>
    </div>
  );
}
