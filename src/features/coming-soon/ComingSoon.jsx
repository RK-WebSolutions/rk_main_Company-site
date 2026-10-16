import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  Activity,
  DollarSign,
  ExternalLink,
  Terminal,
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Code2,
  Lock,
  Flame,
  MessageCircle,
  Mail,
  Compass,
  Smile,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "../../styles/coming-soon.css";

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}


const HUMAN_PROJECTS = [
  {
    id: "browser-mirror",
    name: "BrowserMirror",
    subdomain: "mirror.rkws.in",
    url: "https://mirror.rkws.in",
    category: "Online Privacy",
    color: "#38bdf8", // Sky blue
    icon: Shield,
    headline: "Can websites secretly track your phone or laptop?",
    plainEnglish:
      "Ever notice how ads follow you around the internet even when you use Incognito mode? This tool shows you the invisible digital 'fingerprint' your device gives away in milliseconds — and how to protect yourself.",
    analogy:
      "Just like passport control recognizes your face, websites recognize your device by how it draws shapes and plays audio behind the scenes. 100% private: runs completely in your browser, nothing is saved.",
    simpleAction: "Check My Device Privacy ➔",
    techSummary: "64.3 bits Shannon entropy, WebGL GPU unmasking, Canvas 2D sub-pixel metrics, and AudioContext SHA-256 acoustic synthesis.",
    status: "Free • 2-Sec Scan",
  },
  {
    id: "system-sim",
    name: "SystemSim",
    subdomain: "sim.rkws.in",
    url: "https://sim.rkws.in",
    category: "Interactive Playground",
    color: "#10b981", // Emerald green
    icon: Activity,
    headline: "Why do ticket websites always crash when you need them?",
    plainEnglish:
      "Ever try booking Tatkal train tickets or concert tickets at 10 AM only for the site to freeze? This is an interactive physics game where you can watch traffic flow like water — and hit a button to crash the servers yourself.",
    analogy:
      "Think of servers like cashiers at a supermarket. When 100,000 shoppers rush 4 cashiers at once, lines explode out the door (yellow) and frustrated people leave (red). You get to test and watch the meltdown live.",
    simpleAction: "Try to Crash the Website ➔",
    techSummary: "60 FPS HTML5 Canvas particle physics, Little's Law queues (L = λW), M/M/c worker pools, and thermal load modeling.",
    status: "Interactive 60 FPS",
  },
  {
    id: "real-worth",
    name: "RealWorth",
    subdomain: "worth.rkws.in",
    url: "https://worth.rkws.in",
    category: "Salary & Life Calculator",
    color: "#f59e0b", // Warm gold
    icon: DollarSign,
    headline: "Is that big Bangalore salary actually worth the move?",
    plainEnglish:
      "A ₹15 Lakhs or ₹18 Lakhs offer sounds huge on LinkedIn. But once you subtract new income tax, crazy metro rents, ₹2 Lakhs locked in landlord deposits, and 2 hours wasted in daily traffic, how much real money do you actually save?",
    analogy:
      "Nominal CTC is vanity. A ₹10 Lakhs remote job in your hometown often leaves you with MORE savings in your pocket and 40 extra hours of free life every single month.",
    simpleAction: "Calculate Your Real Savings ➔",
    techSummary: "Statutory Indian FY 2026-27 S.115BAC new tax slabs, Bangalore/Gurgaon rent deflators, and lost commute hours calculator.",
    status: "FY 2026-27 Slabs",
  },
];

const OTHER_TOOLS = [
  {
    name: "demo.rkws.in",
    desc: "Interactive client prototypes and custom design sandboxes.",
    url: "https://demo.rkws.in",
    status: "Live",
  },
  {
    name: "preview.rkws.in",
    desc: "Staging sandbox for upcoming customer deliverables.",
    url: "https://preview.rkws.in",
    status: "Live",
  },
  {
    name: "alpha.rkws.in",
    desc: "Autonomous trading engines and quant telemetry nodes.",
    url: "https://alpha.rkws.in",
    status: "Private",
  },
];

export default function ComingSoon() {
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("tools"); // "tools" | "about" | "terminal"
  const [currentTime, setCurrentTime] = useState("");
  const [nudgeCount, setNudgeCount] = useState(() => {
    try {
      return parseInt(localStorage.getItem("rkws_nudges") || "42", 10);
    } catch {
      return 42;
    }
  });
  const [toastMessage, setToastMessage] = useState(null);

  // Terminal state
  const [cmdInput, setCmdInput] = useState("");
  const [termLines, setTermLines] = useState([
    { type: "out", text: "Welcome to rkws-shell v2.2.0" },
    { type: "out", text: "All 3 flagship tools are live: mirror.rkws.in, sim.rkws.in, worth.rkws.in" },
    { type: "out", text: "Type 'help' for available commands." },
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

  const handleNudge = () => {
    const newCount = nudgeCount + 1;
    setNudgeCount(newCount);
    try {
      localStorage.setItem("rkws_nudges", newCount.toString());
    } catch {}

    const responses = [
      "Thanks for checking in! Ramani is at his desk coding.",
      "Vibration sent to desk! Lines of clean code being written.",
      "Coffee brewed! Systems running at full speed.",
      "Hello! Hope you enjoyed testing the tools.",
    ];
    const randomMsg = responses[Math.floor(Math.random() * responses.length)];
    setToastMessage(randomMsg);

    setTimeout(() => {
      setToastMessage((prev) => (prev === randomMsg ? null : prev));
    }, 3500);
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
        text: "Commands:\n  • tools       - Open all live tools\n  • whoami      - About the developer\n  • status      - Check site health\n  • nudge       - Say hi to the developer\n  • clear       - Clear the screen",
      });
    } else if (lower === "tools" || lower === "apps") {
      newHistory.push({
        type: "out",
        text: "Live Tools:\n  1. mirror.rkws.in ➔ Privacy & Fingerprint Test\n  2. sim.rkws.in    ➔ Server Crash & Traffic Simulator\n  3. worth.rkws.in  ➔ Real Take-Home Salary Calculator",
      });
    } else if (lower === "whoami") {
      newHistory.push({
        type: "out",
        text: "Ramani Krishnan — Final-year AI & Data Science student in Coimbatore, India.\nBuilding high-performance trading software, systems, and clean web tools.",
      });
    } else if (lower === "status") {
      newHistory.push({
        type: "out",
        text: "All systems healthy • Hosted on Cloudflare Edge • 0 tracking cookies",
      });
    } else if (lower === "nudge") {
      handleNudge();
      newHistory.push({ type: "out", text: "⚡ Poked the developer!" });
    } else if (lower === "clear") {
      setTermLines([]);
      setCmdInput("");
      return;
    } else {
      newHistory.push({
        type: "out",
        text: `Command not found: '${trimmed}'. Type 'help' for guidance.`,
      });
    }

    setTermLines(newHistory);
    setCmdInput("");
  };

  return (
    <div className="cs-universe">
      {/* Top Header */}
      <header className="cs-header">
        <a href="/" className="cs-brand">
          <div className="cs-logo-symbol">rk</div>
          <div>
            <div className="cs-brand-text">rkws.in</div>
            <div className="cs-brand-sub">by Ramani Krishnan</div>
          </div>
        </a>

        <div className="cs-header-center">
          <div className="cs-pulse-dot"></div>
          <span>3 Free Interactive Tools Live</span>
        </div>

        <div className="cs-header-right">
          <div className="cs-clock">
            Coimbatore, IN <span>{currentTime || "14:50:00"} IST</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="cs-main">
        {/* Friendly Hero */}
        <section className="cs-hero-section">
          <div className="cs-hero-badge">
            <Sparkles className="w-4 h-4 text-amber" />
            <span>NO ADS • NO TRACKING • 100% FREE</span>
          </div>

          <h1 className="cs-hero-title">
            Simple tools that show you <br />
            <span className="highlight">how tech actually works.</span>
          </h1>

          <p className="cs-hero-subtitle">
            I build clean, privacy-friendly tools to help you understand what websites see about you, why internet services crash, and what your job offer is really worth. No confusing jargon.
          </p>

          {/* Quick Toggle for Curious Geeks */}
          <div className="cs-tech-toggle-bar">
            <button
              onClick={() => setShowTechDetails(!showTechDetails)}
              className="cs-tech-toggle-btn"
            >
              <Code2 className="w-3.5 h-3.5 text-amber" />
              <span>{showTechDetails ? "Hide technical details" : "Are you a developer? Click here for the tech specs"}</span>
              {showTechDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </section>

        {/* 3 Flagship Cards (Big, Beautiful, Understandable) */}
        <section className="cs-products-grid">
          {HUMAN_PROJECTS.map((proj) => {
            const Icon = proj.icon;
            return (
              <div
                key={proj.id}
                className="cs-human-card"
                style={{ "--accent": proj.color }}
              >
                {/* Top Badge & Category */}
                <div className="cs-human-top">
                  <div className="cs-human-category" style={{ color: proj.color }}>
                    <Icon className="w-4 h-4" />
                    <span>{proj.category}</span>
                  </div>
                  <span className="cs-human-status-pill">{proj.status}</span>
                </div>

                {/* Big Question Headline */}
                <h2 className="cs-human-headline">
                  "{proj.headline}"
                </h2>

                {/* Plain English Explanation */}
                <p className="cs-human-plain">
                  {proj.plainEnglish}
                </p>

                {/* The "In Plain Words" Analogy Box */}
                <div className="cs-human-analogy-box">
                  <div className="cs-human-analogy-title">
                    <span className="text-amber">💡</span>
                    <span>Think of it like this:</span>
                  </div>
                  <p className="cs-human-analogy-text">
                    {proj.analogy}
                  </p>
                </div>

                {/* Optional Developer Specs */}
                {showTechDetails && (
                  <div className="cs-human-tech-drawer">
                    <span className="cs-drawer-label">Under the hood:</span>
                    <p className="cs-drawer-text">{proj.techSummary}</p>
                  </div>
                )}

                {/* Big Launch Button */}
                <div className="cs-human-footer">
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="cs-human-launch-btn"
                    style={{ backgroundColor: proj.color }}
                  >
                    <span>{proj.simpleAction}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <span className="cs-human-domain-hint">{proj.subdomain}</span>
                </div>
              </div>
            );
          })}
        </section>

        {/* Friendly About & Developer Console */}
        <section className="cs-workbench-container">
          <div className="cs-card-bar">
            <div className="cs-window-dots">
              <span className="cs-dot cs-dot-red"></span>
              <span className="cs-dot cs-dot-yellow"></span>
              <span className="cs-dot cs-dot-green"></span>
            </div>

            <div className="cs-card-tabs">
              <button
                className={`cs-tab-btn ${activeTab === "tools" ? "active" : ""}`}
                onClick={() => setActiveTab("tools")}
              >
                <span>🌐</span> All Projects & Sites
              </button>
              <button
                className={`cs-tab-btn ${activeTab === "about" ? "active" : ""}`}
                onClick={() => setActiveTab("about")}
              >
                <span>👋</span> Who Made This?
              </button>
              <button
                className={`cs-tab-btn ${activeTab === "terminal" ? "active" : ""}`}
                onClick={() => setActiveTab("terminal")}
              >
                <span>⌨️</span> Interactive Shell
              </button>
            </div>

            <span className="cs-card-status">● 100% online</span>
          </div>

          {/* Tab 1: All Projects */}
          {activeTab === "tools" && (
            <div className="cs-tab-content">
              <div className="cs-simple-subdomain-list">
                {HUMAN_PROJECTS.map((proj, i) => (
                  <a
                    key={i}
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="cs-simple-sub-row"
                  >
                    <div className="cs-sub-row-left">
                      <span className="cs-sub-row-domain" style={{ color: proj.color }}>
                        {proj.subdomain}
                      </span>
                      <span className="cs-sub-row-title">— {proj.name}</span>
                    </div>
                    <span className="cs-sub-row-desc">{proj.plainEnglish}</span>
                    <span className="cs-sub-row-arrow">Launch ↗</span>
                  </a>
                ))}

                {OTHER_TOOLS.map((sub, i) => (
                  <a
                    key={i + 10}
                    href={sub.url}
                    target="_blank"
                    rel="noreferrer"
                    className="cs-simple-sub-row"
                  >
                    <div className="cs-sub-row-left">
                      <span className="cs-sub-row-domain">{sub.name}</span>
                    </div>
                    <span className="cs-sub-row-desc">{sub.desc}</span>
                    <span className="cs-sub-row-arrow">Visit ↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: About Ramani */}
          {activeTab === "about" && (
            <div className="cs-tab-content cs-about-tab">
              <div className="cs-about-content">
                <h3>Hi, I'm Ramani Krishnan 👋</h3>
                <p>
                  I'm a final-year Artificial Intelligence & Data Science student living in Coimbatore, Tamil Nadu. I love engineering fast systems, algorithmic trading engines, and interactive web tools that solve real problems.
                </p>
                <p>
                  I believe software should be fast, private, and easy for everyday people to understand without feeling intimidated by computer science jargon.
                </p>

                <div className="cs-about-links">
                  <a
                    href="https://github.com/Ramani-21-05"
                    target="_blank"
                    rel="noreferrer"
                    className="cs-social-pill"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub Profile</span>
                  </a>
                  <a
                    href="mailto:reach@rkws.in"
                    className="cs-social-pill"
                  >
                    <Mail className="w-4 h-4" />
                    <span>reach@rkws.in</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Interactive Terminal */}
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
                  placeholder="type 'help', 'tools', or 'whoami'..."
                  value={cmdInput}
                  onChange={(e) => setCmdInput(e.target.value)}
                  onKeyDown={handleCommand}
                  autoFocus
                />
              </div>
            </div>
          )}
        </section>

        {/* Nudge & Action Row */}
        <section className="cs-actions-row">
          <button className="cs-nudge-btn" onClick={handleNudge}>
            <span>⚡ Say Hi to the Dev</span>
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
        </section>
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
          <span>Crafted by Ramani Krishnan</span>
          <span>•</span>
          <span>No third-party trackers</span>
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
