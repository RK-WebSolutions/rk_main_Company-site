import React, { useEffect, useRef, useState } from "react";
import siteContent from "../../data/siteContent.js";

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

export default function ReferenceSite({ currentPage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState("light");
  const [openFaq, setOpenFaq] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  // Parallax & Scroll Features Refs
  const horizontalRef = useRef(null);
  const expandRef = useRef(null);
  const scrubRef = useRef(null);

  // States
  const [horizontalX, setHorizontalX] = useState(0);
  const [expandWidth, setExpandWidth] = useState(70);
  const [expandScale, setExpandScale] = useState(1.2);
  const [scrubProgress, setScrubProgress] = useState(0);

  useEffect(() => {
    // Window resize handler for mobile responsiveness
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    document.title = currentPage.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", currentPage.metaDescription);
    }
    
    const handleScroll = () => {
      const cy = window.scrollY;
      setScrollY(cy);
      setIsScrolled(cy > 10);
      
      // Theme Shift logic for dark showcase
      const workEl = document.getElementById("work");
      if (workEl) {
        const top = workEl.offsetTop;
        const height = workEl.offsetHeight;
        if (cy > top - window.innerHeight / 1.5 && cy < top + height) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }

      const mobileCheck = window.innerWidth <= 768;

      if (!mobileCheck) {
          // Horizontal Scroll Array Logic (Desktop Only)
          if (horizontalRef.current) {
            const top = horizontalRef.current.offsetTop;
            const height = horizontalRef.current.offsetHeight - window.innerHeight;
            if (cy >= top && cy <= top + height) {
              const progress = (cy - top) / height;
              setHorizontalX(progress * -75);
            } else if (cy < top) {
              setHorizontalX(0);
            } else {
              setHorizontalX(-75);
            }
          }

          // Expanding Image Cover Logic (Desktop Only)
          if (expandRef.current) {
            const top = expandRef.current.offsetTop;
            const start = top - window.innerHeight;
            const end = top;
            if (cy > start && cy <= end) {
              const progress = (cy - start) / (end - start); 
              setExpandWidth(60 + (progress * 40)); 
              setExpandScale(1.3 - (progress * 0.3)); 
            } else if (cy > end) {
              setExpandWidth(100);
              setExpandScale(1.0);
            } else {
              setExpandWidth(60);
              setExpandScale(1.3);
            }
          }
      }

      // Text Scrubbing Logic Form (Works on all devices)
      if (scrubRef.current) {
        const top = scrubRef.current.offsetTop;
        const start = top - window.innerHeight + 300;
        const end = top - 100;
        if (cy > start && cy <= end) {
          const progress = (cy - start) / (end - start);
          setScrubProgress(progress * 100);
        } else if (cy > end) {
          setScrubProgress(100);
        } else {
          setScrubProgress(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
    }
  }, [currentPage]);

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(`Hi ${siteContent.brandName}, I am interested in a free homepage demo for my business in ${currentPage.city}.`);
    window.open(`${siteContent.contact.whatsappHref}?text=${text}`, "_blank");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const text = encodeURIComponent(`New Website Enquiry:\nName: ${data.name}\nBusiness: ${data.business}\nCity: ${data.city}\nPhone: ${data.phone}\nMessage: ${data.message}`);
    window.open(`${siteContent.contact.whatsappHref}?text=${text}`, "_blank");
  };

  return (
    <div className={`da-page theme-${theme}`}>
      <div className="noise-overlay"></div>
      {/* Header */}
      <header className={`da-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="da-container da-header-inner">
          <a href="#" className="da-logo animate-up">
            {siteContent.brandName}
          </a>
          <nav className="da-nav">
            {siteContent.navItems.map((item, i) => (
              <a key={i} href={item.href} className={`animate-up delay-${(i % 4) + 1}`}>{item.label}</a>
            ))}
          </nav>
          <a href={siteContent.headerCta.href} className="da-btn-primary animate-up delay-4" style={{display: isMobile ? "none" : "flex", padding: "12px 24px"}} onClick={handleWhatsApp}>
            Contact
          </a>
        </div>
      </header>

      {/* Editorial Hero */}
      <section className="da-hero">
        <div className="da-container">
          <div className="da-hero-grid">
            <div style={{ transform: isMobile ? 'none' : `translateY(${scrollY * 0.15}px)` }}>
              <h1 className="massive-text animate-up" dangerouslySetInnerHTML={{ __html: currentPage.heroHeading.replace('Website Developer', 'Website Developer<br/>') }} />
              <p className="animate-up delay-1">
                {currentPage.heroSubheading}
              </p>
              <div className="animate-up delay-2" style={{display: "flex", flexDirection: isMobile ? "column" : "row", gap: "16px", marginTop: "40px"}}>
                <a href="#contact" className="da-btn-primary" onClick={handleWhatsApp}>Get The Request</a>
                <a href="#work" className="da-btn-secondary">View Deployments</a>
              </div>
            </div>
          </div>
          
          <div className="da-hero-bento animate-up delay-3" style={{ transform: isMobile ? 'none' : `translateY(${scrollY * -0.05}px)` }}>
            <div className="editorial-img tall"><img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80" alt="Gym Core" /></div>
            {!isMobile && (
              <>
                <div className="editorial-img box"><img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Tech Architecture" /></div>
                <div className="editorial-img box"><img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" alt="Medical Structure" /></div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Infinite Ticker Tape */}
      <section className="ticker-wrap animate-up delay-4">
        <div className="ticker-track">
          {/* Double array to create seamless loop */}
          {[...Array(2)].map((_, idx) => (
             <React.Fragment key={idx}>
                <div className="ticker-item">React Architecture</div>
                <div className="ticker-item">Edge Computing</div>
                <div className="ticker-item">Conversion Psychology</div>
                <div className="ticker-item">Vercel Deployments</div>
                <div className="ticker-item">Sub-Second Load Times</div>
                <div className="ticker-item">Local Dominance</div>
             </React.Fragment>
          ))}
        </div>
      </section>

      {/* About Section - Editorial Stats */}
      <section id="about" className="da-section">
        <div className="da-container editorial-split">
           <div>
             <h2 className="huge-text animate-up">{siteContent.aboutSection.heading}</h2>
           </div>
           <div>
             <p className="editorial-lead animate-up delay-1">{siteContent.aboutSection.content}</p>
             <div className="stats-grid animate-up delay-2">
               {siteContent.aboutSection.stats.map((stat, i) => (
                 <div key={i}>
                   <div className="stat-num">{stat.number}</div>
                   <div className="stat-label">{stat.label}</div>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </section>

      {/* Showcase / Featured Work */}
      <section id="work" className="da-section-alt">
        <div className="da-container">
          <div className="editorial-split animate-up" style={{ marginBottom: "80px" }}>
            <h2 className="huge-text">Featured<br/>Deployments.</h2>
            <p className="editorial-lead" style={{ alignSelf: "end" }}>Websites strictly optimized for absolute performance, immediate trust, and aggressive local market domination.</p>
          </div>
          
          <div className="da-pic-grid">
            {siteContent.showcase.map((project, i) => (
              <div key={i} className={`da-pic-card ${i === 0 ? 'full-width' : ''} animate-up delay-${(i % 3) + 1}`}>
                <div className="img-box" style={{ transform: isMobile ? 'none' : `translateY(${(scrollY - 1000) * -0.05 * (i % 2 === 0 ? 1 : 1.5)}px)` }}>
                  <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ color: "var(--da-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.85rem", marginBottom: "16px" }}>{project.category}</div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanding Image Reveal Feature (Turns into static hero on mobile) */}
      <section ref={expandRef} style={{ display: "flex", justifyContent: "center", padding: isMobile ? "0px" : "100px 0" }}>
        <div style={{
          width: isMobile ? "100vw" : `${expandWidth}vw`, 
          height: isMobile ? "60vh" : "80vh", 
          overflow: "hidden", 
          position: "relative",
          borderRadius: "0px",
          transition: "width 0.15s ease-out"
        }}>
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80" 
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: isMobile ? "none" : `scale(${expandScale})`, transition: "transform 0.15s ease-out", filter: "brightness(40%) grayscale(50%)" }} 
            alt="The Team" 
          />
          <div style={{ 
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%", 
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", 
            textAlign: "center", color: "#fff", padding: "0 24px",
            opacity: isMobile ? 1 : (expandWidth > 85 ? 1 : 0), 
            transform: isMobile ? "none" : `translateY(${expandWidth > 85 ? 0 : 40}px)`, 
            transition: "all 0.6s ease"
          }}>
             <h2 className="expand-title">Engineered in Tamil Nadu.<br/>Deployed Globally.</h2>
             <p style={{ fontSize: isMobile ? "1.1rem" : "1.25rem", color: "#ddd", maxWidth: "600px", lineHeight: "1.6" }}>Our mission is to arm local businesses with the exact same digital infrastructure and user-psychology systems utilized by silicon valley corporations.</p>
          </div>
        </div>
      </section>

      {/* Services List - Human Editorial Layout */}
      <section id="services" className="da-section">
        <div className="da-container">
          <div className="editorial-split animate-up" style={{ marginBottom: "60px" }}>
             <h2 className="huge-text">Architecture<br/>& Services.</h2>
          </div>
          <div className="service-list">
            {siteContent.services.items.map((svc, i) => (
              <div key={i} className="service-row animate-up delay-1">
                <div className="service-num">0{i+1}.</div>
                <div className="service-title"><h3>{svc.title}</h3></div>
                <div className="service-desc">{svc.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section (Sticky Horizontal on Desktop, Standard Stack on Mobile) */}
      {!isMobile ? (
        <section id="process" ref={horizontalRef} style={{ height: "300vh", position: "relative" }}>
          <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--da-surface)", borderTop: "1px solid var(--da-ring)" }}>
            <div className="da-container" style={{ marginBottom: "40px", width: "100%" }}>
              <h2 className="huge-text">Deployment Engine.</h2>
            </div>
            
            <div style={{ 
              display: "flex", 
              width: "400vw", 
              transform: `translateX(${horizontalX}vw)`, 
              transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)", 
              paddingLeft: "40px" 
            }}>
              {siteContent.process.steps.map((step, i) => (
                <div key={i} style={{ width: "60vw", padding: "0", flexShrink: 0 }}>
                  <div className="process-card-raw">
                    <div className="process-num">0{i+1}</div>
                    <h3 style={{fontSize: "2.5rem", marginBottom: "24px"}}>{step.title.replace(/\d+\.\s*/, '')}</h3>
                    <p style={{fontSize: "1.25rem", lineHeight: "1.6", color: "var(--da-text-muted)", maxWidth: "500px"}}>{step.description}</p>
                  </div>
                </div>
              ))}
              <div style={{ width: "20vw", flexShrink: 0 }}></div>
            </div>
          </div>
        </section>
      ) : (
        <section id="process" className="da-section">
            <div className="da-container">
              <h2 className="huge-text" style={{ marginBottom: "60px" }}>Deployment Engine.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                 {siteContent.process.steps.map((step, i) => (
                    <div key={i} className="process-card-mobile">
                      <div className="process-num">0{i+1}</div>
                      <h3 style={{fontSize: "1.75rem", marginBottom: "16px"}}>{step.title.replace(/\d+\.\s*/, '')}</h3>
                      <p style={{fontSize: "1.1rem", lineHeight: "1.6", color: "var(--da-text-muted)"}}>{step.description}</p>
                    </div>
                 ))}
              </div>
            </div>
        </section>
      )}

      {/* Secure Scroll Fade Typography */}
      <section ref={scrubRef} className="da-section" style={{ padding: isMobile ? "80px 0" : "200px 0", background: "var(--da-surface)" }}>
         <div className="da-container" style={{ textAlign: "center" }}>
            <h2 className="scrubbing-text" style={{
                color: "var(--da-text)",
                opacity: isMobile ? 1 : ((scrubProgress / 100) + 0.1),
                transform: isMobile ? "none" : `translateY(${(100 - scrubProgress) * 0.5}px)`,
                transition: "opacity 0.1s ease-out, transform 0.1s ease-out"
            }}>
               We don't just build websites.<br />
               We build digital engines designed<br />
               specifically to increase your revenue.
            </h2>
         </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="da-section-alt">
        <div className="da-container faq-grid">
          <div>
            <h2 className="huge-text animate-up">Questions.<br/>Answered.</h2>
            <p className="editorial-lead animate-up delay-1" style={{ marginTop: "32px", maxWidth: "400px" }}>Radical transparency on ownership, cost, and hosting.</p>
          </div>
          <div className="faq-list animate-up delay-2">
            {siteContent.faqs.map((faq, i) => (
              <div key={i} className="faq-item" onClick={() => setOpenFaq(i === openFaq ? -1 : i)}>
                 <div className="faq-q">
                    {faq.question}
                    <span className="faq-icon" style={{ transform: `rotate(${openFaq === i ? '45deg' : '0deg'})`, transition: "transform 0.3s" }}>+</span>
                 </div>
                 <div className="faq-a" style={{ maxHeight: openFaq === i ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                    <p>{faq.answer}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="da-section border-top-none">
        <div className="da-container">
          <div className="editorial-split animate-up" style={{ marginBottom: "80px" }}>
            <h2 className="huge-text">Investment.</h2>
            <p className="editorial-lead" style={{ alignSelf: "end" }}>Standardized models tailored for pure dominance. Never hidden fees.</p>
          </div>
          <div className="da-pricing-grid">
            {siteContent.packages.map((pkg, i) => (
              <div key={i} className={`da-pricing-card ${pkg.featured ? 'featured' : ''} animate-up delay-${(i % 3) + 1}`}>
                <h3>{pkg.name}</h3>
                <p className={pkg.featured ? "" : "da-text-muted"} style={{minHeight: "64px", fontSize: "1.1rem"}}>{pkg.description}</p>
                <div className="da-pricing-v">{pkg.price}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "40px" }}>
                  {pkg.features.map((feat, j) => (
                    <div key={j} className="da-feat">
                      <CheckIcon />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact" className={pkg.featured ? "da-btn-secondary" : "da-btn-primary"} style={{width: "100%"}} onClick={(e) => {
                  e.preventDefault();
                  const text = encodeURIComponent(`Hi ${siteContent.brandName}, I am interested in the ${pkg.name} package.`);
                  window.open(`${siteContent.contact.whatsappHref}?text=${text}`, "_blank");
                }}>Initiate Brief</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="da-section">
        <div className="da-container editorial-split">
            <div className="animate-up">
              <h2 className="huge-text" style={{marginBottom: "40px"}}>{siteContent.freeDemo.title}</h2>
              <p className="editorial-lead" style={{marginBottom: "60px", maxWidth: "450px"}}>{siteContent.freeDemo.content}</p>
              <div style={{display: "grid", gap: "40px"}}>
                <div>
                  <h4 style={{ textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--da-text-muted)", fontSize: "0.85rem", marginBottom: "8px" }}>Direct Line</h4>
                  <p style={{fontSize: "1.5rem", color: "var(--da-text)", fontWeight: "600"}}>{siteContent.contact.phoneDisplay}</p>
                </div>
                <div>
                  <h4 style={{ textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--da-text-muted)", fontSize: "0.85rem", marginBottom: "8px" }}>Electronic Mail</h4>
                  <p style={{fontSize: "1.5rem", color: "var(--da-text)", fontWeight: "600"}}>{siteContent.contact.email}</p>
                </div>
              </div>
            </div>
            
            <div className="animate-up delay-2">
              <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" className="form-input" required placeholder="Partner Name" />
                <input type="text" name="business" className="form-input" placeholder="Enterprise Name" />
                <input type="text" name="city" className="form-input" defaultValue={currentPage.city} placeholder="City Array" />
                <input type="tel" name="phone" className="form-input" required placeholder="Mobile Communication" />
                <textarea name="message" className="form-input" rows="3" placeholder="Project Directive..."></textarea>
                <button type="submit" className="da-btn-primary" style={{ marginTop: "24px" }}>Transmit Request <ExternalIcon style={{marginLeft: "12px"}}/></button>
              </form>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="da-container">
          <div className="footer-grid">
            <div className="animate-up">
              <h3 style={{marginBottom: "24px", fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "-0.02em"}}>{siteContent.brandName}</h3>
              <p style={{color: "var(--da-text-muted)", fontSize: "1.1rem", maxWidth: "300px"}}>{siteContent.footer.tagline}</p>
            </div>
            <div className="animate-up delay-1">
              <h4>Deployment Zones</h4>
              <div>
                {siteContent.serviceAreas.map((loc, i) => (
                  <a key={i} href={loc.path}>{loc.city}</a>
                ))}
              </div>
            </div>
            <div className="animate-up delay-2">
              <h4>Architecture</h4>
              <div>
                {siteContent.navItems.map((item, i) => (
                  <a key={i} href={item.href}>{item.label}</a>
                ))}
              </div>
            </div>
          </div>
          <div style={{borderTop: "1px solid var(--da-ring)", paddingTop: "40px", color: "var(--da-text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: isMobile ? "center" : "left"}}>
            &copy; {new Date().getFullYear()} {siteContent.brandName} - Engineered by Humans
          </div>
        </div>
      </footer>
    </div>
  );
}
