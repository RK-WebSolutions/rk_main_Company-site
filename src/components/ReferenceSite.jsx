import { useEffect, useMemo, useState } from "react";

import siteContent from "../content/siteContent";

const heroScreenshots = [
  "/a_data_002/ss-1.png",
  "/a_data_002/ss-2.png",
  "/a_data_002/ss-3.png",
  "/a_data_002/ss-4.png",
];

const heroSlides = [
  "/a_data_002/big-ss-1.jpg",
  "/a_data_002/big-ss-2.jpg",
  "/a_data_002/big-ss-3.jpg",
  "/a_data_002/big-ss-4.jpg",
];

const serviceIcons = ["truck", "fabric", "clinic", "grid"];
const processIcons = ["chat", "pencil", "settings", "rocket"];
const contactIcons = ["phone", "mail", "whatsapp", "location"];

const aboutImages = {
  main: "/a_data_002/img-1.jpg",
  accent: "/a_data_002/wow.png",
};

const whyChooseGallery = {
  main: "/a_data_002/demo-6.jpg",
  top: "/a_data_002/big-ss-3.jpg",
  bottom: "/a_data_002/demo-5.png",
};

function InlineIcon({ name, className = "" }) {
  const sharedProps = {
    "aria-hidden": "true",
    className: `rk-inline-icon ${className}`.trim(),
    fill: "none",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (name) {
    case "truck":
      return (
        <svg {...sharedProps}>
          <path d="M3 7h11v8H3Z" />
          <path d="M14 10h3l3 3v2h-6Z" />
          <circle cx="7.5" cy="17.5" r="1.5" />
          <circle cx="17.5" cy="17.5" r="1.5" />
        </svg>
      );
    case "fabric":
      return (
        <svg {...sharedProps}>
          <path d="M6 5h12l-2 14H8L6 5Z" />
          <path d="M9 5c0 1.3 1.3 2.3 3 2.3S15 6.3 15 5" />
          <path d="M9.2 12h5.6" />
        </svg>
      );
    case "clinic":
      return (
        <svg {...sharedProps}>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
          <rect x="4" y="4" width="16" height="16" rx="3" />
        </svg>
      );
    case "grid":
      return (
        <svg {...sharedProps}>
          <rect x="4" y="4" width="7" height="7" rx="1.5" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "settings":
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="2.8" />
          <path d="m12 3 1 2.2 2.4.5-.9 2 .9 2-2.4.5-1 2.2-1-2.2-2.4-.5.9-2-.9-2 2.4-.5L12 3Z" />
        </svg>
      );
    case "chat":
      return (
        <svg {...sharedProps}>
          <path d="M5 17.2V7.8A2.8 2.8 0 0 1 7.8 5h8.4A2.8 2.8 0 0 1 19 7.8v5.4a2.8 2.8 0 0 1-2.8 2.8h-6L5 19v-1.8Z" />
          <path d="M9 11h.01" />
          <path d="M12 11h.01" />
          <path d="M15 11h.01" />
        </svg>
      );
    case "pencil":
      return (
        <svg {...sharedProps}>
          <path d="m4 20 4.2-1 9.6-9.6a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z" />
          <path d="m13.5 7.5 3 3" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...sharedProps}>
          <path d="M14 4c3.5 0 6 2.5 6 6-2.2.2-4.1.9-5.7 2.3L11.7 15C10.3 16.4 9.6 18.3 9.4 20c-3.5 0-5.4-1.9-5.4-5.4 1.7-.2 3.6-.9 5-2.3L11.7 9C13.1 7.6 13.8 5.7 14 4Z" />
          <path d="M15.5 8.5h.01" />
          <path d="M8 16 5 19" />
          <path d="M5 14c1.5 0 3 .5 4 1.5" />
        </svg>
      );
    case "phone":
      return (
        <svg {...sharedProps}>
          <path d="M6.8 4.5h2.6L11 8.8l-1.9 1.9a14.3 14.3 0 0 0 4.2 4.2l1.9-1.9 4.3 1.6v2.6a1.6 1.6 0 0 1-1.7 1.6A15.8 15.8 0 0 1 5.2 6.2 1.6 1.6 0 0 1 6.8 4.5Z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...sharedProps}>
          <rect x="3" y="5.5" width="18" height="13" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...sharedProps}>
          <path d="M12 20a8 8 0 1 0-4-1.1L5 20l1.2-2.8A8 8 0 0 0 12 20Z" />
          <path d="M9.5 9.5c.3 1.4 1.6 2.8 3 3.3" />
          <path d="m11.6 10.4.7-1" />
          <path d="m13.7 14.1 1-.5" />
        </svg>
      );
    case "location":
      return (
        <svg {...sharedProps}>
          <path d="M12 20s6-5 6-10a6 6 0 1 0-12 0c0 5 6 10 6 10Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );
    case "check":
      return (
        <svg {...sharedProps}>
          <path d="m5 12 4 4 10-10" />
        </svg>
      );
    case "close":
      return (
        <svg {...sharedProps}>
          <path d="M6 6 18 18" />
          <path d="M18 6 6 18" />
        </svg>
      );
    case "arrow":
    default:
      return (
        <svg {...sharedProps}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
  }
}

function setMetaTag(name, content, attribute = "name") {
  if (!content) {
    return;
  }

  let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function setLinkTag(rel, href) {
  if (!href) {
    return;
  }

  let tag = document.head.querySelector(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
}

function usePageSeo(currentPage) {
  useEffect(() => {
    const canonicalUrl =
      currentPage.path === "/"
        ? `${siteContent.siteUrl}/`
        : `${siteContent.siteUrl}${currentPage.path}`;

    document.title = currentPage.title;
    setMetaTag("description", currentPage.metaDescription);
    setMetaTag("keywords", currentPage.keywords.join(", "));
    setMetaTag("robots", "index, follow");
    setMetaTag("og:title", currentPage.title, "property");
    setMetaTag("og:description", currentPage.metaDescription, "property");
    setMetaTag("og:type", "website", "property");
    setMetaTag("og:url", canonicalUrl, "property");
    setMetaTag("twitter:card", "summary_large_image", "name");
    setMetaTag("twitter:title", currentPage.title, "name");
    setMetaTag("twitter:description", currentPage.metaDescription, "name");
    setLinkTag("canonical", canonicalUrl);

    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: siteContent.brandName,
      url: canonicalUrl,
      description: currentPage.metaDescription,
      telephone: siteContent.contact.phoneRaw,
      email: siteContent.contact.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Salem",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      areaServed: siteContent.serviceAreas.map((location) => ({
        "@type": "City",
        name: location.city,
      })),
      serviceType: [
        "Website development",
        "Web design",
        "Business website design",
      ],
    };

    let schemaTag = document.getElementById("rk-seo-schema");

    if (!schemaTag) {
      schemaTag = document.createElement("script");
      schemaTag.id = "rk-seo-schema";
      schemaTag.type = "application/ld+json";
      document.head.appendChild(schemaTag);
    }

    schemaTag.textContent = JSON.stringify(schema);
  }, [currentPage]);
}

function ActionButton({
  href,
  label,
  variant = "primary",
  external = false,
  onClick,
}) {
  const className =
    variant === "secondary" ? "kk-pr-btn-5 btn_split_left" : "as-pr-btn-1";

  return (
    <a
      href={href}
      className={className}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span className="text">{label}</span>
      <span className="icon">
        {variant === "secondary" ? (
          <>
            <InlineIcon name="arrow" />
            <InlineIcon name="arrow" />
          </>
        ) : (
          <InlineIcon name="arrow" />
        )}
      </span>
    </a>
  );
}

function BrandLogo({ theme = "light", compact = false }) {
  const className = `rk-brand-logo rk-brand-logo--${theme} ${
    compact ? "rk-brand-logo--compact" : ""
  }`.trim();

  return (
    <span className={className}>
      <span className="rk-brand-logo__mark" aria-hidden="true">
        <span className="rk-brand-logo__ring rk-brand-logo__ring--outer" />
        <span className="rk-brand-logo__ring rk-brand-logo__ring--inner" />
        <span className="rk-brand-logo__letters">RK</span>
      </span>

      <span className="rk-brand-logo__text">
        <span className="rk-brand-logo__name">{siteContent.brandName}</span>
        {!compact ? (
          <span className="rk-brand-logo__tagline">{siteContent.tagline}</span>
        ) : null}
      </span>
    </span>
  );
}

function Header({ currentPage, isSticky, menuOpen, setMenuOpen }) {
  const headerClassName = `nm-header-1-area wa-sticky-header-2 ${
    isSticky ? "has-sticky" : ""
  }`;

  return (
    <>
      <div className={headerClassName}>
        <div className="nm-header-1-container">
          <div className="nm-header-1-row">
            <a
              href="/"
              aria-label={siteContent.brandName}
              className="nm-header-1-logo wa-p-relative rk-brand-logo-link"
            >
              <BrandLogo theme="light" compact />
            </a>

            <nav className="main-navigation d-none d-xl-block">
              <ul>
                <li>
                  <a href={currentPage.path === "/" ? "#home" : "/"}>Home</a>
                </li>
                {siteContent.navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="nm-header-1-action-link">
              <ActionButton
                href={siteContent.headerCta.href}
                label={siteContent.headerCta.label}
                variant="secondary"
              />

              <button
                type="button"
                aria-label="Open menu"
                className="nm-menu-btn-1 d-xl-none d-grid"
                onClick={() => setMenuOpen(true)}
              >
                {Array.from({ length: 9 }).map((_, index) => (
                  <span key={index} />
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`txa-offcanvas-box ${menuOpen ? "active" : ""}`}>
        <button
          className="txa-offcanvas-box-close"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          <InlineIcon name="close" />
        </button>

        <div className="txa-offcanvas-box-container">
          <div className="mobile-menu-navigation d-block">
            <nav className="mobile-main-navigation clearfix ul-li">
              <ul id="main-nav" className="nav navbar-nav clearfix">
                <li>
                  <a href={currentPage.path === "/" ? "#home" : "/"}>
                    Home
                  </a>
                </li>
                {siteContent.navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} onClick={() => setMenuOpen(false)}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

function HeroSection({ currentPage, activeSlide }) {
  return (
    <div className="hero-x-features-bg wa-p-relative">
      <div className="nm-hero-area wa-p-relative wa-fix" id="home">
        <div className="nm-hero-top wa-bg-default wa-fix wa-p-relative rk-hero-top">
          <div className="container nm-container-1">
            <p className="rk-hero-offer">{siteContent.homepage.announcement}</p>
            <p className="rk-hero-tagline">{siteContent.tagline}</p>
            <h1 className="nm-sec-title hero-title">{currentPage.heroHeading}</h1>
            <p className="rk-hero-subtitle">{currentPage.heroSubheading}</p>

            <div className="nm-hero-content wa-p-relative active">
              <div className="inner-div rk-hero-actions">
                <ActionButton
                  href="#contact"
                  label="Get Free Demo Website"
                />
                <ActionButton
                  href="#locations"
                  label="View Service Areas"
                  variant="secondary"
                />
              </div>

              <div className="rk-hero-highlights">
                <span className="rk-hero-highlight">
                  {siteContent.contact.serviceAreaText}
                </span>
                <span className="rk-hero-highlight">Free demo before payment</span>
                <span className="rk-hero-highlight">Transport, textile, clinic websites</span>
              </div>

              {heroScreenshots.map((image, index) => (
                <div
                  key={image}
                  className={`nm-hero-content-ss ss-${index + 1} wa-fix wa-img-cover`}
                >
                  <img src={image} alt={`Website showcase ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="nm-hero-bottom wa-p-relative">
          <div className="wa-fix rk-marquee-shell">
            <div className="nm-hero-marquee">
              <div className="rk-marquee-track">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div className="nm-hero-marquee-wrap" key={index}>
                    <h5 className="nm-hero-marquee-item">
                      Website Developer in {currentPage.city} • Free Demo
                      Website • RK Web Solutions
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="nm-hero-bottom-laptop">
            <img src="/a_data_002/Laptop.png" alt="Laptop frame" />
            <div className="nm-hero-bottom-laptop-slider wa-fix rk-hero-slider">
              <div className="nm-hero-bottom-laptop-slider-img wa-fix wa-img-cover">
                <img
                  src={heroSlides[activeSlide]}
                  alt={`Website preview ${activeSlide + 1}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntroSection({ currentPage }) {
  const isHomepage = currentPage.type === "homepage";
  const paragraphs = isHomepage
    ? siteContent.homepage.leadParagraphs
    : currentPage.introParagraphs;
  const heading = isHomepage
    ? siteContent.homepage.leadHeading
    : currentPage.introHeading;
  const keywordLine = isHomepage
    ? "We provide modern website development in Erode for businesses that want better local visibility, stronger branding, and more trust online."
    : currentPage.keywordLine;

  return (
    <section className="nm-header-footer-area pt-130 pb-110" id="about">
      <div className="container nm-container-1">
        <div className="nm-header-footer-wrap">
          <div className="nm-header-footer-left wa-p-relative">
            <div className="nm-header-footer-img-1">
              <img src={aboutImages.main} alt={`${currentPage.city} website design preview`} />
            </div>
            <div className="nm-header-footer-img-wow rk-about-accent">
              <img src={aboutImages.accent} alt="Creative accent" />
            </div>
          </div>

          <div className="nm-header-footer-right">
            <h2 className="nm-sec-title title">{heading}</h2>
            <div className="rk-about-copy">
              {paragraphs.map((paragraph) => (
                <p className="nm-p-1 sec-disc" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="rk-city-keyword-line">{keywordLine}</p>
            <div className="nm-elementor-btn">
              <ActionButton href="#contact" label="Get Free Demo Website" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ currentPage }) {
  return (
    <section className="rk-services-section" id="services">
      <div className="container nm-container-1">
        <div className="rk-section-intro rk-section-intro--tight">
          <div className="rk-section-intro__inner">
            <h2 className="rk-section-intro__title">
              {siteContent.services.title}
            </h2>
            <p className="rk-section-copy">
              We build focused business websites for {currentPage.city} and
              nearby businesses that want a professional online presence and
              more customer enquiries.
            </p>
          </div>
        </div>

        <div className="rk-services-grid">
          {siteContent.services.items.map((service, index) => (
            <a className="rk-service-card" href="#contact" key={service.title}>
              <div className="rk-service-icon">
                <InlineIcon name={serviceIcons[index]} />
              </div>

              <div className="rk-service-card__content">
                <span className="rk-service-card__eyebrow">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="rk-service-card__title">{service.title}</h3>
                <p className="rk-service-card__text">{service.description}</p>
              </div>

              <span className="rk-service-card__cta">
                Request free demo
                <InlineIcon name="arrow" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection({ currentPage }) {
  return (
    <section
      className="nm-elementor-area pt-180 pb-180 wa-p-relative wa-fix"
      style={{ backgroundImage: "url('/a_data_002/bg-img.png')" }}
    >
      <div className="container nm-container-1">
        <div className="nm-elementor-wrap">
          <div className="nm-elementor-left">
            <div className="nm-elementor-sec-title mb-45">
              <h2 className="nm-sec-title">{siteContent.whyChooseUs.title}</h2>
              <p className="nm-p-1 sec-disc">
                {siteContent.whyChooseUs.intro} We support businesses in{" "}
                {currentPage.city} with clear messaging, modern layouts, and
                lead-focused calls to action.
              </p>
            </div>

            <ul className="nm-elementor-list">
              {siteContent.whyChooseUs.points.map((point) => (
                <li className="nm-p-1" key={point}>
                  <span className="icon">
                    <InlineIcon name="check" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="nm-elementor-btn">
              <ActionButton href="#contact" label="Request Free Demo" />
            </div>
          </div>

          <div className="rk-why-gallery wa-p-relative">
            <div className="rk-why-gallery__main wa-fix wa-img-cover">
              <img src={whyChooseGallery.main} alt="Business website preview" />
            </div>
            <div className="rk-why-gallery__card rk-why-gallery__card--top wa-fix wa-img-cover">
              <img src={whyChooseGallery.top} alt="Homepage website preview" />
            </div>
            <div className="rk-why-gallery__card rk-why-gallery__card--bottom wa-fix wa-img-cover">
              <img src={whyChooseGallery.bottom} alt="Services website preview" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="nm-features-area pt-10 pb-130 rk-process-area">
      <div className="container nm-container-1">
        <div className="nm-features-content mb-50">
          <p className="nm-demo-counter nm-p-1 rk-process-eyebrow">
            {siteContent.process.eyebrow}
          </p>
          <h2 className="nm-sec-title title">{siteContent.process.title}</h2>
          <p className="nm-p-1 rk-section-copy rk-section-copy--center">
            {siteContent.process.intro}
          </p>
        </div>

        <div className="nm-features-wrap wa-p-relative">
          {siteContent.process.steps.map((step, index) => (
            <div className="nm-features-item" key={step.title}>
              <div className="icon">
                <InlineIcon name={processIcons[index]} />
              </div>
              <div className="line" />
              <h5 className="nm-h-1 title">{step.title}</h5>
              <p className="nm-p-1 disc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationLinksSection({ currentPage }) {
  return (
    <section className="rk-location-section" id="locations">
      <div className="container nm-container-1">
        <div className="rk-location-section__header">
          <span className="rk-location-section__eyebrow">Local SEO</span>
          <h2 className="rk-section-intro__title">
            We provide website services in:
          </h2>
          <p className="rk-section-copy rk-section-copy--center">
            Explore our dedicated location pages for Erode, Coimbatore,
            Namakkal, and Tiruchirappalli. These internal links strengthen local
            SEO and help each city page rank independently.
          </p>
        </div>

        <div className="rk-location-grid">
          {siteContent.serviceAreas.map((location) => {
            const isActive = currentPage.city === location.city;

            return (
              <a
                className={`rk-location-card${isActive ? " rk-location-card--active" : ""}`}
                href={location.path}
                key={location.city}
              >
                <span className="rk-location-card__city">{location.city}</span>
                <p className="rk-location-card__text">
                  {location.shortDescription}
                </p>
                <span className="rk-location-card__cta">
                  View page
                  <InlineIcon name="arrow" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FreeDemoSection({ currentPage }) {
  return (
    <section className="rk-free-demo-section">
      <div className="container nm-container-1">
        <div className="rk-free-demo-card">
          <div className="rk-free-demo-copy">
            <span className="rk-free-demo-eyebrow">Free Demo</span>
            <h2 className="rk-free-demo-title">{siteContent.freeDemo.title}</h2>
            <p className="rk-free-demo-text">
              {siteContent.freeDemo.content} This is especially useful if you
              want to launch a business website in {currentPage.city} without
              committing before you see the design.
            </p>

            <div className="rk-free-demo-points">
              {siteContent.freeDemo.points.map((point) => (
                <span className="rk-free-demo-point" key={point}>
                  <InlineIcon name="check" />
                  {point}
                </span>
              ))}
            </div>
          </div>

          <div className="rk-free-demo-actions">
            <ActionButton href="#contact" label="Request Free Demo" />
            <p className="rk-free-demo-note">"{siteContent.freeDemo.note}"</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ currentPage, formData, setFormData }) {
  const details = [
    {
      title: "Phone",
      description: siteContent.contact.phoneDisplay,
      href: `tel:${siteContent.contact.phoneRaw}`,
    },
    {
      title: "Email",
      description: siteContent.contact.email,
      href: `mailto:${siteContent.contact.email}`,
    },
    {
      title: "WhatsApp",
      description: "Message us directly for the fastest reply",
      href: siteContent.contact.whatsappHref,
      external: true,
    },
    {
      title: "Location",
      description: siteContent.contact.location,
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const lines = [
      `Hello RK Web Solutions, I want a website demo for ${currentPage.city}.`,
      `Name: ${formData.name || "-"}`,
      `Business Type: ${formData.businessType || "-"}`,
      `Phone Number: ${formData.phone || "-"}`,
      `Message: ${formData.message || "-"}`,
    ];

    const url = `${siteContent.contact.whatsappHref}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="nm-responsive-area rk-contact-area" id="contact">
      <div className="container nm-container-1">
        <div className="rk-contact-layout">
          <div className="nm-responsive-sec-title rk-contact-panel">
            <span className="rk-contact-eyebrow">Contact Us</span>
            <h2 className="nm-sec-title title">
              Ready to grow your business online?
            </h2>
            <p className="nm-p-1 sec-disc">
              Talk to RK Web Solutions about your website project. We serve
              businesses in Erode, Coimbatore, Namakkal, and Tiruchirappalli.
            </p>

            <div className="rk-contact-detail-list">
              {details.map((detail, index) => {
                const cardContent = (
                  <>
                    <div className="rk-contact-detail__icon">
                      <InlineIcon name={contactIcons[index]} />
                    </div>
                    <div className="rk-contact-detail__body">
                      <span className="rk-contact-detail__label">
                        {detail.title}
                      </span>
                      <span className="rk-contact-detail__value">
                        {detail.description}
                      </span>
                    </div>
                  </>
                );

                if (detail.href) {
                  return (
                    <a
                      className="rk-contact-detail"
                      href={detail.href}
                      key={detail.title}
                      target={detail.external ? "_blank" : undefined}
                      rel={detail.external ? "noreferrer" : undefined}
                    >
                      {cardContent}
                    </a>
                  );
                }

                return (
                  <div className="rk-contact-detail" key={detail.title}>
                    {cardContent}
                  </div>
                );
              })}
            </div>

            <div className="btn-wrap">
              <ActionButton
                href={siteContent.contact.whatsappHref}
                label="Chat on WhatsApp"
                external
              />
            </div>
          </div>

          <div className="rk-contact-board">
            <div className="rk-contact-board__header">
              <span className="rk-contact-board__eyebrow">Quick Enquiry</span>
              <h3 className="rk-contact-board__title">
                Get your free demo website
              </h3>
              <p className="rk-contact-board__copy">
                Fill in your details and we will open WhatsApp with your message
                so you can send it instantly.
              </p>
            </div>

            <form className="rk-contact-form" onSubmit={handleSubmit}>
              <label className="rk-contact-form__field">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </label>

              <label className="rk-contact-form__field">
                <span>Business Type</span>
                <input
                  type="text"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  placeholder="Transport, textile, clinic..."
                  required
                />
              </label>

              <label className="rk-contact-form__field">
                <span>Phone Number</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91"
                  required
                />
              </label>

              <label className="rk-contact-form__field rk-contact-form__field--full">
                <span>Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={`Tell us what kind of website you need in ${currentPage.city}`}
                  rows="5"
                />
              </label>

              <button type="submit" className="as-pr-btn-1 rk-submit-btn">
                <span className="text">Send on WhatsApp</span>
                <span className="icon">
                  <InlineIcon name="arrow" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="rk-site-footer">
      <div className="container nm-container-1">
        <div className="rk-site-footer__inner">
          <div className="rk-site-footer__brand">
            <a
              href="/"
              aria-label={siteContent.brandName}
              className="rk-brand-logo-link"
            >
              <BrandLogo theme="light" compact />
            </a>
            <p className="rk-site-footer__text">{siteContent.footer.tagline}</p>
            <p className="rk-site-footer__locations">
              {siteContent.footer.locationLine}
            </p>
          </div>

          <div className="rk-site-footer__links">
            <a href="/">Home</a>
            {siteContent.serviceAreas.map((location) => (
              <a href={location.path} key={location.city}>
                {location.city}
              </a>
            ))}
          </div>

          <div className="rk-site-footer__actions">
            <a href={`tel:${siteContent.contact.phoneRaw}`}>Call</a>
            <a href={`mailto:${siteContent.contact.email}`}>Email</a>
            <a
              href={siteContent.contact.whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsAppButton() {
  return (
    <a
      className="rk-floating-whatsapp"
      href={siteContent.contact.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <InlineIcon name="whatsapp" />
      <span>WhatsApp</span>
    </a>
  );
}

function ReferenceSite({ currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    businessType: "",
    phone: "",
    message: "",
  });

  usePageSeo(currentPage);

  const pageKey = useMemo(
    () => `${currentPage.type}-${currentPage.city}`,
    [currentPage],
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 3200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("rk-mobile-lock", menuOpen);

    return () => {
      document.body.classList.remove("rk-mobile-lock");
    };
  }, [menuOpen]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setMenuOpen(false);
    setFormData({
      name: "",
      businessType: "",
      phone: "",
      message: "",
    });
  }, [pageKey]);

  return (
    <div className="rk-page">
      <Header
        currentPage={currentPage}
        isSticky={isSticky}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <HeroSection currentPage={currentPage} activeSlide={activeSlide} />
      <IntroSection currentPage={currentPage} />
      <ServicesSection currentPage={currentPage} />
      <WhyChooseSection currentPage={currentPage} />
      <ProcessSection />
      <LocationLinksSection currentPage={currentPage} />
      <FreeDemoSection currentPage={currentPage} />
      <ContactSection
        currentPage={currentPage}
        formData={formData}
        setFormData={setFormData}
      />
      <FooterSection />
      <FloatingWhatsAppButton />
    </div>
  );
}

export default ReferenceSite;
