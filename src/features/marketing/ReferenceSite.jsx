import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import siteContent from "../../data/siteContent.js";

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polyline points="3 7 6 10 11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#1D9E75" style={{ marginRight: 8, flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.054 23.486a.5.5 0 0 0 .609.61l5.7-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.523-5.204-1.43l-.374-.22-3.384.87.893-3.3-.243-.386A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

export default function ReferenceSite() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUSD, setIsUSD] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(`Hi ${siteContent.brandName}, I'm interested in getting a quote for my project.`);
    window.open(`${siteContent.contact.whatsappHref}?text=${text}`, "_blank");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const services = Array.from(formData.getAll("services")).join(", ");
    const text = encodeURIComponent(`New Quote Request:\nName: ${data.name}\nPhone: ${data.phone}\nServices: ${services}\nMessage: ${data.message}`);
    window.open(`${siteContent.contact.whatsappHref}?text=${text}`, "_blank");
    alert("Redirecting to WhatsApp for final submission...");
  };

  const prices = isUSD 
    ? ["$200", "$450", "$800"] 
    : ["₹15,000", "₹35,000", "₹60,000"];

  return (
    <div className="rk-page">
      <div className="noise-overlay" style={{ position: "fixed", inset: 0, opacity: 0.03, pointerEvents: "none", zIndex: 9999, background: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>

      {/* 🧭 Navigation */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 100,
        background: isScrolled ? "rgba(255, 255, 255, 0.85)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        padding: isScrolled ? "12px 0" : "24px 0",
        borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.05)" : "none"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="#" style={{ fontSize: 20, fontWeight: 800, color: "var(--da-text)", letterSpacing: "-0.05em" }}>
            RK<span style={{ color: "#185FA5" }}>WS</span>
          </a>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {isMobile ? (
              <a href="#contact" className="da-btn-primary" style={{ padding: "10px 20px", fontSize: 13, borderRadius: 8, background: "#185FA5" }}>GET QUOTE</a>
            ) : (
              <>
                {siteContent.navItems.map((item, i) => (
                  item.href.startsWith("/") ? (
                    <Link key={i} to={item.href} style={{ fontSize: 13, fontWeight: 600, color: "var(--da-text-muted)", textDecoration: "none" }}>{item.label}</Link>
                  ) : (
                    <a key={i} href={item.href} style={{ fontSize: 13, fontWeight: 600, color: "var(--da-text-muted)" }}>{item.label}</a>
                  )
                ))}
                <a href="#contact" className="da-btn-primary" style={{ padding: "10px 20px", fontSize: 13, borderRadius: 8, background: "#185FA5" }}>GET QUOTE</a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* 🔥 Hero Section */}
      <section style={{ 
        position: "relative",
        padding: "200px 24px 120px", 
        textAlign: "center", 
        background: `linear-gradient(rgba(248, 251, 255, 0.9), rgba(255, 255, 255, 0.97)), url("${siteContent.hero.image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden"
      }}>
        {/* ✨ Glassmorphism Ambient Elements */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 300, height: 300, background: "rgba(24, 95, 165, 0.05)", borderRadius: "50%", filter: "blur(80px)" }}></div>
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, background: "rgba(24, 95, 165, 0.03)", borderRadius: "50%", filter: "blur(100px)" }}></div>

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", backdropFilter: "blur(8px)", background: "rgba(230, 241, 251, 0.8)", border: "1px solid rgba(24, 95, 165, 0.1)", color: "#0C447C", padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, marginBottom: 24, letterSpacing: "0.02em" }}>
            {siteContent.hero.badge}
          </div>
          <h1
            style={{ fontSize: isMobile ? 40 : 72, fontWeight: 700, lineHeight: 1, color: "#081420", marginBottom: 32, letterSpacing: "-0.05em" }}
            dangerouslySetInnerHTML={{ __html: siteContent.hero.heading }}
          />
          <p style={{ fontSize: isMobile ? 18 : 22, color: "#5d6570", lineHeight: 1.6, maxWidth: 680, margin: "0 auto 48px", fontWeight: 500 }}>
            {siteContent.hero.subheading}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="#contact" className="da-btn-primary" style={{ padding: "20px 42px", fontSize: 16, borderRadius: 12, background: "#185FA5", display: "flex", alignItems: "center", gap: 10 }}>{siteContent.hero.primaryCTA}</a>
            <a href="#work" className="da-btn-secondary" style={{ padding: "20px 42px", fontSize: 16, borderRadius: 12, border: "1px solid #e1e8f0", backdropFilter: "blur(4px)", background: "rgba(255,255,255,0.5)" }}>{siteContent.hero.secondaryCTA}</a>
          </div>
          <a href={siteContent.contact.whatsappHref} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", marginTop: 32, fontSize: 14, color: "#0F6E56", background: "rgba(225, 245, 238, 0.8)", backdropFilter: "blur(4px)", border: "1px solid rgba(15, 110, 86, 0.1)", padding: "10px 20px", borderRadius: 20, fontWeight: 600 }}>
            <WhatsAppIcon /> {siteContent.hero.whatsappText}
          </a>
        </div>
      </section>

      {/* 📊 Stats */}
      <section style={{ borderY: "1px solid rgba(0,0,0,0.05)", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)" }}>
          {siteContent.results.map((stat, i) => (
            <div key={i} style={{ padding: "40px 24px", textAlign: "center", borderRight: !isMobile && i < 2 ? "1px solid rgba(0,0,0,0.05)" : "none", borderBottom: isMobile && i < 2 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: "#081420", marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: "#5d6570", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 🎯 Services */}
      <section id="services" style={{ padding: "100px 24px", background: "#f8fbff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: 13, fontWeight: 800, color: "#185FA5", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>{siteContent.services.heading}</h2>
            <h3 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 700, color: "#081420" }}>Built for Performance</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {siteContent.services.items.map((svc, i) => (
              <div key={i} style={{ padding: 40, background: "#fff", borderRadius: 24, boxShadow: "0 10px 40px rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.03)" }}>
                <div style={{ fontSize: 32, marginBottom: 24 }}>{svc.icon}</div>
                <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{svc.title}</h4>
                <p style={{ color: "#5d6570", lineHeight: 1.6, fontSize: 15 }}>{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧱 Portfolio */}
      <section id="work" style={{ padding: "120px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80, flexWrap: "wrap", gap: 24 }}>
            <div>
              <h2 style={{ fontSize: 13, fontWeight: 800, color: "#185FA5", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Deployments</h2>
              <h3 style={{ fontSize: isMobile ? 28 : 48, fontWeight: 700, color: "#081420", letterSpacing: "-0.03em" }}>Digital Infrastructure Showcase</h3>
            </div>
            <a href={siteContent.contact.whatsappHref} target="_blank" rel="noopener noreferrer" style={{ fontSize: 16, fontWeight: 700, color: "#185FA5", textDecoration: "none", borderBottom: "2px solid #185FA5", paddingBottom: 4 }}>VIEW LIVE BUILDS</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 40 }}>
            {siteContent.showcase.map((project, i) => (
              <div key={i} style={{ cursor: project.link ? "pointer" : "default" }} onClick={() => project.link && window.open(project.link, "_blank", "noopener,noreferrer")}>
                <div style={{ position: "relative", overflow: "hidden", borderRadius: 24, height: 400, background: "#f0f4f8", marginBottom: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.03)" }}>
                  <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }} onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.target.style.transform = "scale(1)"} />
                  <div style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", padding: "6px 14px", borderRadius: 10, fontSize: 10, fontWeight: 800, letterSpacing: "0.05em" }}>{project.category.toUpperCase()}</div>
                </div>
                <h4 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: "#081420" }}>{project.title}</h4>
                <p style={{ color: "#5d6570", fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>{project.description}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {["Performance", "Architecture", "Logic"].map((tag, j) => (
                    <span key={j} style={{ fontSize: 10, fontWeight: 700, color: "#5d6570", background: "#f1f5f9", padding: "4px 8px", borderRadius: 6 }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧑💼 About / Founder */}
      <section id="founder" style={{ padding: "100px 24px", background: "#081420", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ position: "relative" }}>
              <div style={{ width: "100%", paddingBottom: "125%", borderRadius: 32, overflow: "hidden", background: "#f0f4f8" }}>
                <img src={siteContent.founder.image} alt={siteContent.founder.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
              </div>
              <div style={{ position: "absolute", bottom: -20, left: -20, background: "#185FA5", color: "#fff", padding: "24px", borderRadius: 16, fontWeight: 800, backdropFilter: "blur(12px)", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", zIndex: 1 }}>
                 {siteContent.brandName} FOUNDER
              </div>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 13, fontWeight: 800, color: "#3da9ff", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 24 }}>{siteContent.founder.intro}</h2>
            <h3 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 32, lineHeight: 1.2 }}>{siteContent.founder.mission}</h3>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", marginBottom: 40 }}>{siteContent.founder.bio}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
              {siteContent.founder.skills.map((skill, i) => (
                <span key={i} style={{ padding: "8px 16px", background: "rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 13, fontWeight: 600 }}>{skill}</span>
              ))}
            </div>
            <a href="#contact" className="da-btn-primary" style={{ background: "#6366F1", color: "#fff", padding: "18px 40px", borderRadius: 12, fontWeight: 700 }}>{siteContent.founder.cta}</a>
          </div>
        </div>
      </section>

      {/* 💰 Pricing */}
      <section id="pricing" style={{ padding: "100px 24px", background: "#f8fbff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
             <h2 style={{ fontSize: 13, fontWeight: 800, color: "#185FA5", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Pricing</h2>
             <h3 style={{ fontSize: 32, fontWeight: 700, color: "#081420", marginBottom: 24 }}>{siteContent.pricing.heading}</h3>
             
             {/* 💱 Currency Toggle */}
             <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 48 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: !isUSD ? "#185FA5" : "#5d6570" }}>₹ INR</span>
                <div onClick={() => setIsUSD(!isUSD)} style={{ width: 50, height: 26, background: isUSD ? "#185FA5" : "#cbd5e1", borderRadius: 13, cursor: "pointer", position: "relative", transition: "0.3s" }}>
                  <div style={{ width: 20, height: 20, background: "#fff", borderRadius: "50%", position: "absolute", top: 3, left: isUSD ? 27 : 3, transition: "0.3s", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}></div>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: isUSD ? "#185FA5" : "#5d6570" }}>$ USD</span>
             </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 24, marginBottom: 80 }}>
            {siteContent.pricing.plans.map((plan, i) => (
              <div key={i} style={{ padding: 40, background: "#fff", borderRadius: 24, position: "relative", border: plan.popular ? "2px solid #185FA5" : "1px solid rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", transition: "transform 0.3s ease" }}>
                {plan.popular && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#185FA5", color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 16px", borderRadius: 20, letterSpacing: "0.05em" }}>MOST POPULAR</div>}
                <div style={{ fontSize: 15, fontWeight: 700, color: "#5d6570", marginBottom: 12 }}>{plan.name}</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: "#081420", marginBottom: 24 }}>
                  {prices[i]} <span style={{ fontSize: 14, fontWeight: 500, color: "#5d6570" }}>{i === 0 ? "fixed" : "onwards"}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px" }}>
                  {plan.features.map((feat, j) => (
                    <li key={j} style={{ display: "flex", gap: 12, marginBottom: 14, fontSize: 14, color: "#081420", lineHeight: 1.4 }}>
                      <span style={{ color: "#1D9E75", flexShrink: 0 }}><CheckIcon /></span> {feat}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="da-btn-primary" style={{ marginTop: "auto", width: "100%", padding: "14px", textAlign: "center", borderRadius: 12, background: plan.popular ? "#185FA5" : "#6366F1", border: "none", color: "#fff", fontWeight: 700 }}>{plan.cta}</a>
              </div>
            ))}
          </div>

           {/* ➕ Strategic Add-ons */}
           <div style={{ marginTop: 80 }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <h4 style={{ fontSize: 13, fontWeight: 800, color: "#185FA5", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>Strategic Architecture</h4>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#081420" }}>High-Performance Add-ons</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 24 }}>
                 {siteContent.pricing.addons.map((addon, i) => (
                   <div key={i} style={{ 
                     background: "#fff", 
                     padding: "32px", 
                     borderRadius: 24, 
                     border: "1px solid rgba(24, 95, 165, 0.08)",
                     boxShadow: "0 10px 40px rgba(0,0,0,0.02)",
                     display: "flex", 
                     flexDirection: "column",
                     gap: 16,
                     transition: "transform 0.3s ease",
                     cursor: "pointer"
                   }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-6px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#f0f7ff", display: "grid", placeItems: "center", fontSize: 20 }}>
                          {i === 0 ? "✍️" : i === 1 ? "🎨" : "⚡"}
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "#185FA5" }}>{isUSD ? addon.usd : addon.inr}</div>
                     </div>
                     <div>
                        <div style={{ fontSize: 17, fontWeight: 800, color: "#081420", marginBottom: 4 }}>{addon.name}</div>
                        <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Studio Grade Execution</div>
                     </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* ❓ Strategic Architecture FAQ */}
          <div style={{ marginTop: 120, maxWidth: 900, marginInline: "auto" }}>
             <div style={{ textAlign: "center", marginBottom: 60 }}>
                <h4 style={{ fontSize: 13, fontWeight: 800, color: "#185FA5", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Technical Clarity</h4>
                <h3 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: "#081420" }}>Common Strategic Questions</h3>
             </div>
             
             <div style={{ display: "grid", gap: 20 }}>
                {siteContent.pricing.faq.map((item, i) => (
                  <div key={i} style={{ 
                    padding: isMobile ? "24px" : "32px 40px", 
                    background: "#fff", 
                    borderRadius: 24, 
                    border: "1px solid rgba(24, 95, 165, 0.05)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                    display: "flex",
                    gap: 24,
                    alignItems: "flex-start",
                    transition: "transform 0.3s ease"
                  }}>
                    <div style={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: 12, 
                      background: "#E6F1FB", 
                      color: "#185FA5", 
                      display: "grid", 
                      placeItems: "center", 
                      fontSize: 18, 
                      fontWeight: 800,
                      flexShrink: 0 
                    }}>
                      ?
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12, color: "#081420", lineHeight: 1.4 }}>{item.q}</div>
                      <div style={{ fontSize: 16, color: "#5d6570", lineHeight: 1.7, fontWeight: 400 }}>{item.a}</div>
                    </div>
                  </div>
                ))}
             </div>

             <div style={{ textAlign: "center", marginTop: 48 }}>
                <p style={{ fontSize: 14, color: "#94a3b8", fontWeight: 600 }}>Have a more specific technical question? <a href="#contact" style={{ color: "#185FA5", textDecoration: "none", borderBottom: "1px solid #185FA5" }}>Ask the Architect directly.</a></p>
             </div>
          </div>
        </div>
      </section>

      {/* ⭐ Client Trust Architecture */}
      <section style={{ padding: "120px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <h2 style={{ fontSize: 13, fontWeight: 800, color: "#185FA5", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Social Proof</h2>
            <h3 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, color: "#081420", letterSpacing: "-0.03em" }}>Verified Client Outcomes</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 40 }}>
            {siteContent.testimonials.map((testi, i) => (
              <div key={i} style={{ 
                padding: "48px", 
                background: "#f8fbff", 
                borderRadius: 40, 
                border: "1px solid rgba(24, 95, 165, 0.05)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 20px 50px rgba(24, 95, 165, 0.03)"
              }}>
                <div style={{ position: "absolute", top: 40, right: 40, opacity: 0.1 }}>
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H5c-1.25 0-2 .75-2 2v3c0 1.25.75 2 2 2h3c0 4-4 4-4 4M13 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-3c-1.25 0-2 .75-2 2v3c0 1.25.75 2 2 2h3c0 4-4 4-4 4"></path></svg>
                </div>
                
                <div style={{ display: "flex", gap: 4, marginBottom: 32 }}>
                   {[...Array(testi.stars)].map((_, j) => (
                     <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                   ))}
                </div>
                
                <p style={{ fontSize: 18, lineHeight: 1.8, color: "#1e293b", marginBottom: 40, fontWeight: 500, fontStyle: "italic" }}>
                   "{testi.quote}"
                </p>
                
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ width: 60, height: 60, borderRadius: 20, background: "#fff", border: "1px solid #e2e8f0", display: "grid", placeItems: "center", fontSize: 24, fontWeight: 800, color: "#185FA5", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    {testi.author[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#081420", marginBottom: 4 }}>{testi.author}</div>
                    <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>{testi.role} · <span style={{ color: "#185FA5" }}>{testi.location}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📧 Contact / Strategy Section */}
      <section id="contact" style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr", gap: 80 }}>
            <div>
              <h2 style={{ fontSize: 13, fontWeight: 800, color: "#185FA5", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Inquiry</h2>
              <h3 style={{ fontSize: 40, fontWeight: 700, color: "#081420", marginBottom: 32 }}>Ready to build your website?</h3>
              <p style={{ fontSize: 18, color: "#5d6570", lineHeight: 1.6, marginBottom: 48 }}>
                Let's talk about your project. Free consultation, no commitment required. I'll get back to you within 24 hours.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                   <div style={{ width: 56, height: 56, borderRadius: 16, background: "#E1F5EE", display: "grid", placeItems: "center" }}>
                     <WhatsAppIcon />
                   </div>
                   <div>
                     <div style={{ fontSize: 12, fontWeight: 700, color: "#5d6570", textTransform: "uppercase" }}>WhatsApp / Call</div>
                     <div style={{ fontSize: 18, fontWeight: 700 }}>{siteContent.contact.phoneDisplay}</div>
                   </div>
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                   <div style={{ width: 56, height: 56, borderRadius: 16, background: "#E6F1FB", display: "grid", placeItems: "center" }}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                   </div>
                   <div>
                     <div style={{ fontSize: 12, fontWeight: 700, color: "#5d6570", textTransform: "uppercase" }}>Email Address</div>
                     <div style={{ fontSize: 18, fontWeight: 700 }}>{siteContent.contact.email}</div>
                   </div>
                </div>
              </div>
            </div>
            <div style={{ background: "#f8fbff", padding: isMobile ? "32px" : "48px", borderRadius: 32, border: "1px solid rgba(0,0,0,0.03)" }}>
              <form onSubmit={handleFormSubmit} style={{ display: "grid", gap: 24 }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
                   <label style={{ display: "block" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#081420", display: "block", marginBottom: 8 }}>NAME *</span>
                      <input type="text" name="name" required style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1px solid #e2e8f0" }} placeholder="Raj Kumar" />
                   </label>
                   <label style={{ display: "block" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#081420", display: "block", marginBottom: 8 }}>PHONE *</span>
                      <input type="tel" name="phone" required style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1px solid #e2e8f0" }} placeholder="+91 98765 43210" />
                   </label>
                </div>
                <label style={{ display: "block" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#081420", display: "block", marginBottom: 12 }}>SERVICES NEEDED</span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {siteContent.services.items.map((svc, i) => (
                      <label key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                        <input type="checkbox" name="services" value={svc.title} /> {svc.title}
                      </label>
                    ))}
                  </div>
                </label>
                <label style={{ display: "block" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#081420", display: "block", marginBottom: 8 }}>PROJECT DETAILS</span>
                  <textarea name="message" style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1px solid #e2e8f0", minHeight: 80 }} placeholder="Tell me about your business and goals..."></textarea>
                </label>
                <button type="submit" className="da-btn-primary" style={{ padding: "18px", borderRadius: 12, background: "#185FA5", display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
                  SEND STRATEGY REQUEST <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 🏛️ Footer */}
      <footer style={{ padding: "80px 24px 40px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
            <div>
               <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>RK<span style={{ color: "#185FA5" }}>WS</span></div>
               <p style={{ color: "#5d6570", fontSize: 14 }}>{siteContent.contact.tagline}</p>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
               {siteContent.footer.links.map((link, i) => (
                 <a key={i} href={link.href} style={{ fontSize: 14, color: "#5d6570", fontWeight: 600 }}>{link.label}</a>
               ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: 40, display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: 12, fontWeight: 700, letterSpacing: "0.05em" }}>
             <span>{siteContent.footer.copy}</span>
             <span>BUILT BY RKWS DIGITAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
