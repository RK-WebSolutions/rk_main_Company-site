import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  Activity,
  DollarSign,
  ExternalLink,
  Terminal,
  Sparkles,
  Layers,
  Cpu,
  Eye,
  Zap,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  User,
  Heart,
  MessageSquare,
  Flame,
  HelpCircle,
  Code2,
  Globe,
  Radio,
  Lock,
  Clock,
  Compass
} from "lucide-react";
import "../../styles/coming-soon.css";

const FLAGSHIP_PROJECTS = [
  {
    id: "browser-mirror",
    name: "BrowserMirror",
    subdomain: "mirror.rkws.in",
    url: "https://mirror.rkws.in",
    tag: "Online Privacy & Hardware Profiling",
    accent: "#38bdf8", // Cyan
    accentDim: "rgba(56, 189, 248, 0.15)",
    hook: "Think 'Incognito Mode' hides who you are? Think again.",
    simpleSummary:
      "Every website you visit can identify your exact device in milliseconds without using cookies, logins, or your name. BrowserMirror reveals your invisible hardware fingerprint and provides actionable tools to defend your privacy.",
    eli5:
      "Just like a fingerprint on a glass, your computer has a unique 'handwriting' based on how its screen, graphics card, and audio chip render graphics. Websites track you across the internet using this signature even if you clear cookies or use Incognito mode.",
    techSpecs: [
      "63.68 bits Shannon Entropy Engine with 1 in 68.7 Billion global rarity",
      "WebGL unmasked GPU renderer & floating-point shader precision probing",
      "Canvas 2D sub-pixel anti-aliasing & winding rule geometry measurement",
      "AudioContext offline oscillator buffer SHA-256 acoustic synthesis",
      "100% Client-Side Privacy: zero telemetry sent to servers, 0 latency"
    ],
    badgeText: "1 in 68.7B Rarity Probed",
    status: "Live on Cloudflare Edge",
    cta: "Audit My Browser Privacy",
    icon: Shield,
  },
  {
    id: "system-sim",
    name: "SystemSim",
    subdomain: "sim.rkws.in",
    url: "https://sim.rkws.in",
    tag: "Distributed Systems & Physics Simulator",
    accent: "#10b981", // Emerald
    accentDim: "rgba(16, 185, 129, 0.15)",
    hook: "Ever wondered why IRCTC Tatkal or Ticketmaster crash at 10:00 AM?",
    simpleSummary:
      "SimCity for the internet. An interactive 60 FPS physics sandbox where thousands of requests flow like water through servers, databases, and caches. Trigger chaotic traffic surges to watch servers overheat and collapse before your eyes.",
    eli5:
      "Think of servers like cashiers at a supermarket. When 100,000 shoppers rush 4 cashiers at once, lines back up out the door (yellow), cashiers overheat (🔥), and customers get turned away (red). SystemSim lets you stress-test and watch the meltdown in real time.",
    techSpecs: [
      "60 FPS HTML5 Canvas particle physics with cubic Bézier conduit curves",
      "Little's Law queuing theory equilibrium (L = λW) across worker pools",
      "M/M/c multi-server finite queue simulation & exponential service times",
      "Interactive Disaster Scenarios: Ticketmaster Meltdown & Cache Stampede",
      "Thermal load modeling with real-time 504 Gateway Timeout shedding"
    ],
    badgeText: "60 FPS Interactive Physics",
    status: "Live on Cloudflare Edge",
    cta: "Stress-Test Live Systems",
    icon: Activity,
  },
  {
    id: "real-worth",
    name: "RealWorth",
    subdomain: "worth.rkws.in",
    url: "https://worth.rkws.in",
    tag: "Compensation & True Wealth Engine",
    accent: "#f59e0b", // Amber
    accentDim: "rgba(245, 158, 11, 0.15)",
    hook: "Why an ₹18 LPA Bangalore offer gives you LESS pocket money than ₹10 LPA in your hometown.",
    simpleSummary:
      "Most salary calculators only show basic income tax. RealWorth calculates what you actually keep after Indian FY 2026-27 tax slabs, metro rents, 6-month security deposit locks, and 500 hours wasted in traffic.",
    eli5:
      "A big salary on paper can be an optical illusion. When ₹40,000/month goes to rent, ₹2 Lakhs is locked in landlord deposits, and you lose 2 hours daily sitting in traffic, your actual 'Hourly Freedom Wage' drops by more than 50%.",
    techSpecs: [
      "Statutory FY 2026-27 Section 115BAC Slabs & Section 87A rebate rules",
      "Standard ₹75,000 deduction, 4% Health/Education cess, and surcharge",
      "Metro Opportunity Cost & Commute Depreciation deflator matrix",
      "Side-by-Side Offer Match Simulation with instant infographic export",
      "100% Client-Side execution with zero tracking or financial data storage"
    ],
    badgeText: "FY 2026-27 Statutory Slabs",
    status: "Live on Cloudflare Edge",
    cta: "Calculate True Take-Home",
    icon: DollarSign,
  },
];

const OTHER_SUBDOMAINS = [
  {
    name: "demo.rkws.in",
    desc: "Interactive client prototypes, sandbox simulations, and live interface demos.",
    status: "Active Deployment",
    state: "live",
    url: "https://demo.rkws.in",
  },
  {
    name: "preview.rkws.in",
    desc: "Staging sandbox for upcoming customer deliverables and feature experiments.",
    status: "Staging Pipeline",
    state: "live",
    url: "https://preview.rkws.in",
  },
  {
    name: "alpha.rkws.in",
    desc: "Autonomous agent execution nodes, quant backtest telemetry, and deep-tech logs.",
    status: "Private Node",
    state: "incubating",
    url: "https://alpha.rkws.in",
  },
  {
    name: "api.rkws.in",
    desc: "Low-latency edge routing, webhook collectors, and background telemetry APIs.",
    status: "Edge Worker",
    state: "live",
    url: "https://api.rkws.in",
  },
];

const DEV_THOUGHTS = [
  {
    time: "14:15 IST",
    text: "Production verification: All 3 flagship subdomains (mirror, sim, worth) routing 200 OK via Cloudflare Edge with automated SSL.",
  },
  {
    time: "13:50 IST",
    text: "Human-centric design: Complex distributed systems and cryptography should be immediately understandable to anyone who sees them.",
  },
  {
    time: "11:20 IST",
    text: "Architectural note: Keeping rkws.in pure and uncluttered. If a tool needs to go live today, it belongs on an edge sub-site.",
  },
  {
    time: "08:15 IST",
    text: "Fedora Linux workstation running stable at 48°C. Algorithmic quant engines and live data pipelines operating on local nodes.",
  },
  {
    time: "06:30 IST",
    text: "Rule of simplicity: Zero unnecessary dependencies. The fastest code is the code you didn't have to load.",
  },
];

const NUDGE_RESPONSES = [
  "Dev: 'Felt that! Switching back from Hacker News to Neovim.'",
  "Dev: 'Hold on, just fixing a race condition in the backtester.'",
  "Dev: 'Cup #3 of coffee brewed. Lines of code refactored: 142.'",
  "Dev: 'All 3 subdomains are live! Mirror, Sim, and Worth are running.'",
  "Dev: 'No generic AI-sludge templates here. Handcrafted systems only.'",
  "Dev: 'Ping received loud and clear. Great things take time.'",
];

export default function ComingSoon() {
  const [viewMode, setViewMode] = useState("simple"); // "simple" | "tech"
  const [activeTab, setActiveTab] = useState("products"); // "products" | "thoughts" | "terminal" | "subdomains"
  const [currentTime, setCurrentTime] = useState("");
  const [nudgeCount, setNudgeCount] = useState(() => {
    try {
      return parseInt(localStorage.getItem("rkws_nudges") || "32", 10);
    } catch {
      return 32;
    }
  });
  const [toastMessage, setToastMessage] = useState(null);

  // Terminal state
  const [cmdInput, setCmdInput] = useState("");
  const [termLines, setTermLines] = useState([
    { type: "out", text: "rkws-shell v2.1.0 (x86_64-pc-linux-gnu)" },
    { type: "out", text: "Cloudflare Edge Mesh: 3 Flagship Subdomains Active (mirror, sim, worth)." },
    { type: "out", text: "Type 'help' to inspect available system commands." },
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
        text: "Available commands:\n  • apps        - Launch the 3 flagship live engines\n  • status      - Query Cloudflare Edge & node status\n  • whoami      - View developer identity & credentials\n  • coffee      - Inject virtual caffeine into the dev\n  • nudge       - Poke the developer\n  • clear       - Clear terminal window\n  • github      - Open GitHub profile",
      });
    } else if (lower === "apps" || lower === "subdomains") {
      newHistory.push({
        type: "out",
        text: "Active Production Engines:\n  → mirror.rkws.in  (Browser Fingerprint Auditor & Defense Shield)\n  → sim.rkws.in     (60 FPS Distributed Systems Physics Playground)\n  → worth.rkws.in   (Statutory FY 2026-27 Real Purchasing Power Deflator)",
      });
    } else if (lower === "status") {
      newHistory.push({
        type: "out",
        text: "STATUS: 200 OK | Edge Network: Cloudflare Pages | SSL: Automated Active | Mesh: 3 Engines Operational",
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
          <div>
            <div className="cs-brand-text">rkws.in</div>
            <div className="cs-brand-sub">studio & systems</div>
          </div>
        </a>

        <div className="cs-header-center">
          <div className="cs-pulse-dot"></div>
          <span>3 Flagship Engines Live on Cloudflare</span>
        </div>

        <div className="cs-header-right">
          <div className="cs-clock">
            Coimbatore, IN <span>{currentTime || "14:30:00"} IST</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="cs-main">
        {/* Hero Section */}
        <div className="cs-hero-section">
          <div className="cs-hero-badge">
            <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--amber)" }} />
            <span>DEEP SYSTEMS • ZERO JARGON • 100% PRIVATE</span>
          </div>

          <h1 className="cs-hero-title">
            Engineered for Depth. <br />
            <span className="highlight">Understood by Everyone.</span>
          </h1>

          <p className="cs-hero-subtitle">
            Welcome to the laboratory of <strong>Ramani Krishnan</strong>. Here, advanced cryptography, distributed systems, and financial realities are distilled into interactive, production-grade tools that <strong>anyone</strong> can explore.
          </p>

          {/* Mode Switcher */}
          <div className="cs-view-toggle-container">
            <span className="cs-toggle-label">Audience View:</span>
            <div className="cs-view-toggle">
              <button
                className={`cs-toggle-btn ${viewMode === "simple" ? "active" : ""}`}
                onClick={() => setViewMode("simple")}
              >
                <Eye className="w-4 h-4" />
                <span>Explain for Everyone (Visual)</span>
              </button>
              <button
                className={`cs-toggle-btn ${viewMode === "tech" ? "active" : ""}`}
                onClick={() => setViewMode("tech")}
              >
                <Code2 className="w-4 h-4" />
                <span>Deep Engineering Specs</span>
              </button>
            </div>
          </div>
        </div>

        {/* Flagship Products Grid */}
        <div className="cs-products-grid">
          {FLAGSHIP_PROJECTS.map((proj) => {
            const Icon = proj.icon;
            return (
              <div
                key={proj.id}
                className="cs-product-card"
                style={{ "--card-accent": proj.accent }}
              >
                {/* Card Top: Tag & Live Indicator */}
                <div className="cs-card-top">
                  <div className="cs-card-tag" style={{ color: proj.accent }}>
                    <Icon className="w-4 h-4" />
                    <span>{proj.tag}</span>
                  </div>
                  <div className="cs-card-live-badge">
                    <span className="cs-live-pulse" style={{ backgroundColor: proj.accent }}></span>
                    <span>{proj.status}</span>
                  </div>
                </div>

                {/* Card Title & Subdomain */}
                <div className="cs-card-header">
                  <h2 className="cs-card-title">{proj.name}</h2>
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="cs-card-domain"
                  >
                    <span>{proj.subdomain}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* The Hook */}
                <div className="cs-card-hook">
                  "{proj.hook}"
                </div>

                {/* Dynamic Content: Simple vs Tech */}
                {viewMode === "simple" ? (
                  <div className="cs-card-body-simple">
                    <p className="cs-simple-desc">{proj.simpleSummary}</p>
                    <div className="cs-eli5-box">
                      <div className="cs-eli5-header">
                        <HelpCircle className="w-4 h-4" style={{ color: proj.accent }} />
                        <strong>In Plain Words:</strong>
                      </div>
                      <p className="cs-eli5-text">{proj.eli5}</p>
                    </div>
                  </div>
                ) : (
                  <div className="cs-card-body-tech">
                    <div className="cs-tech-badge-row">
                      <span className="cs-tech-badge">{proj.badgeText}</span>
                      <span className="cs-tech-badge">Zero Trackers</span>
                    </div>
                    <ul className="cs-tech-list">
                      {proj.techSpecs.map((spec, i) => (
                        <li key={i}>
                          <CheckCircle2 className="w-3.5 h-3.5" style={{ color: proj.accent, flexShrink: 0 }} />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Card Footer: Launch Button */}
                <div className="cs-card-footer">
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="cs-launch-btn"
                    style={{ backgroundColor: proj.accent }}
                  >
                    <span>{proj.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Developer Lab & Terminal Workbench */}
        <div className="cs-workbench-container">
          <div className="cs-card-bar">
            <div className="cs-window-dots">
              <span className="cs-dot cs-dot-red"></span>
              <span className="cs-dot cs-dot-yellow"></span>
              <span className="cs-dot cs-dot-green"></span>
            </div>

            <div className="cs-card-tabs">
              <button
                className={`cs-tab-btn ${activeTab === "products" ? "active" : ""}`}
                onClick={() => setActiveTab("products")}
              >
                <span>🌐</span> Subdomain Mesh
              </button>
              <button
                className={`cs-tab-btn ${activeTab === "thoughts" ? "active" : ""}`}
                onClick={() => setActiveTab("thoughts")}
              >
                <span>💭</span> Dev Mindstream
              </button>
              <button
                className={`cs-tab-btn ${activeTab === "terminal" ? "active" : ""}`}
                onClick={() => setActiveTab("terminal")}
              >
                <span>⌨️</span> Interactive Shell
              </button>
            </div>

            <span className="cs-card-status">mode: live-edge</span>
          </div>

          {/* Workbench Tab 1: Subdomain Mesh */}
          {activeTab === "products" && (
            <div className="cs-tab-content">
              <div className="cs-subdomain-grid">
                {FLAGSHIP_PROJECTS.map((proj, i) => (
                  <a
                    key={i}
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="cs-subdomain-card highlighted"
                    style={{ "--sub-color": proj.accent }}
                  >
                    <div className="cs-sub-card-top">
                      <span className="cs-subdomain-name">{proj.subdomain}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-dim" />
                    </div>
                    <span className="cs-subdomain-tag">[{proj.name}]</span>
                    <span className="cs-subdomain-desc">{proj.simpleSummary}</span>
                    <span className="cs-subdomain-status live">● Live Production</span>
                  </a>
                ))}

                {OTHER_SUBDOMAINS.map((sub, i) => (
                  <a
                    key={i + 10}
                    href={sub.url}
                    target="_blank"
                    rel="noreferrer"
                    className="cs-subdomain-card"
                  >
                    <div className="cs-sub-card-top">
                      <span className="cs-subdomain-name">{sub.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-dim" />
                    </div>
                    <span className="cs-subdomain-desc">{sub.desc}</span>
                    <span className={`cs-subdomain-status ${sub.state === "live" ? "live" : "incubating"}`}>
                      ● {sub.status}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Workbench Tab 2: Dev Mindstream */}
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

          {/* Workbench Tab 3: Interactive Terminal */}
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
                  placeholder="type 'help', 'apps', or 'status'..."
                  value={cmdInput}
                  onChange={(e) => setCmdInput(e.target.value)}
                  onKeyDown={handleCommand}
                  autoFocus
                />
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
            <span>GitHub (Ramani-21-05)</span>
            <span>↗</span>
          </a>

          <a
            href="mailto:reach@rkws.in"
            className="cs-secondary-btn"
          >
            <span>Email Direct (reach@rkws.in)</span>
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
          <span>Crafted with intention by Ramani Krishnan</span>
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
