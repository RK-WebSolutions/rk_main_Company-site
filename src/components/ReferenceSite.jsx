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

const projectImages = [
  "/a_data_002/demo-1.jpg",
  "/a_data_002/demo-2.jpg",
  "/a_data_002/demo-7.jpg",
  "/a_data_002/demo-3.jpg",
];

const serviceIcons = [
  "website",
  "code",
  "cart",
  "settings",
];

const processIcons = [
  "chat",
  "pencil",
  "website",
  "rocket",
];

const contactIcons = [
  "phone",
  "mail",
  "whatsapp",
  "location",
];

const aboutImages = {
  main: "/a_data_002/img-1.jpg",
  accent: "/a_data_002/wow.png",
};

const whyChooseGallery = {
  main: "/a_data_002/demo-6.jpg",
  top: "/a_data_002/big-ss-3.jpg",
  bottom: "/a_data_002/demo-5.png",
};

const responsiveShowcaseAssets = {
  main: "/a_data_002/laptop_002.png",
  tablet: "/a_data_002/demo-6.jpg",
  phone: "/a_data_002/phone.png",
};

const responsiveIconMap = {
  desktop: "/a_data_002/desktop.png",
  laptop: "/a_data_002/laptop.png",
  tablet: "/a_data_002/tablet.png",
  mobile: "/a_data_002/mobile.png",
};

const footerScreenshots = [
  "/a_data_002/ss1.jpg",
  "/a_data_002/ss2.jpg",
  "/a_data_002/ss3.jpg",
  "/a_data_002/ss4.jpg",
];

function splitIntoColumns(items, columnCount) {
  return Array.from({ length: columnCount }, (_, columnIndex) =>
    items.filter((_, itemIndex) => itemIndex % columnCount === columnIndex),
  );
}

function InlineIcon({ name, className = "" }) {
  const sharedProps = {
    "aria-hidden": "true",
    className: `rk-inline-icon ${className}`.trim(),
    fill: "none",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (name) {
    case "website":
      return (
        <svg {...sharedProps}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M3 9h18" />
          <path d="M8 20h8" />
          <path d="M12 18v2" />
        </svg>
      );
    case "code":
      return (
        <svg {...sharedProps}>
          <path d="M9 8 5 12l4 4" />
          <path d="m15 8 4 4-4 4" />
          <path d="m13 6-2 12" />
        </svg>
      );
    case "cart":
      return (
        <svg {...sharedProps}>
          <circle cx="9" cy="19" r="1.5" />
          <circle cx="17" cy="19" r="1.5" />
          <path d="M3 5h2l2.2 9.2a1 1 0 0 0 1 .8H18a1 1 0 0 0 1-.8L21 8H7" />
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
        <span className="rk-brand-logo__name">RK Web Solutions</span>
        {!compact ? (
          <span className="rk-brand-logo__tagline">{siteContent.tagline}</span>
        ) : null}
      </span>
    </span>
  );
}

function Header({ isSticky, menuOpen, setMenuOpen }) {
  const headerClassName = `nm-header-1-area wa-sticky-header-2 ${
    isSticky ? "has-sticky" : ""
  }`;

  return (
    <>
      <div className={headerClassName}>
        <div className="nm-header-1-container">
          <div className="nm-header-1-row">
            <a
              href="#home"
              aria-label={siteContent.brandName}
              className="nm-header-1-logo wa-p-relative rk-brand-logo-link"
            >
              <BrandLogo theme="light" compact />
            </a>

            <nav className="main-navigation d-none d-xl-block">
              <ul>
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

function HeroSection({ activeSlide }) {
  return (
    <div className="hero-x-features-bg wa-p-relative">
      <div className="nm-hero-area wa-p-relative wa-fix" id="home">
        <div className="nm-hero-top wa-bg-default wa-fix wa-p-relative rk-hero-top">
          <div className="container nm-container-1">
            <p className="rk-hero-tagline">{siteContent.tagline}</p>
            <h1 className="nm-sec-title hero-title">
              {siteContent.hero.heading}
            </h1>
            <p className="rk-hero-subtitle">{siteContent.hero.subheading}</p>

            <div className="nm-hero-content wa-p-relative active">
              <div className="inner-div">
                <ActionButton
                  href={siteContent.hero.button.href}
                  label={siteContent.hero.button.label}
                />
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
                      {siteContent.hero.marquee}
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

function ServicesSection() {
  return (
    <section className="rk-services-section" id="services">
      <div className="container nm-container-1">
        <div className="rk-section-intro rk-section-intro--tight">
          <div className="rk-section-intro__inner">
            <h2 className="rk-section-intro__title">
              {siteContent.services.title}
            </h2>
            <p className="rk-section-copy">{siteContent.services.intro}</p>
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
                Request demo
                <InlineIcon name="arrow" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const projectCards = siteContent.projects.items.map((title, index) => ({
    title,
    image: projectImages[index],
  }));

  return (
    <section className="nm-demo-area pt-110 pb-130 wa-fix wa-bg-default mt-130" id="projects">
      <div className="container nm-container-1">
        <p className="nm-demo-counter nm-p-1">{siteContent.projects.countLabel}</p>
        <h2 className="nm-sec-title nm-demo-sec-title">{siteContent.projects.title}</h2>
        <p className="nm-p-1 rk-section-copy rk-section-copy--center rk-on-dark">
          {siteContent.projects.intro}
        </p>

        <div className="nm-demo-wrap mt-65">
          {projectCards.map((project) => (
            <div className="nm-demo-single rk-demo-single" key={project.title}>
              <div className="nm-demo-single-img wa-img-cover wa-fix">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="content-wrap">
                <h4 className="nm-h-1 demo-name">{project.title}</h4>
                <div className="btn-wrap">
                  <a href="#contact" className="demo-btn nm-p-1">
                    {siteContent.projects.buttonLabel}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
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
              <p className="nm-p-1 sec-disc">{siteContent.whyChooseUs.intro}</p>
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
              <ActionButton
                href={siteContent.whyChooseUs.button.href}
                label={siteContent.whyChooseUs.button.label}
              />
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

function AboutSection() {
  return (
    <section className="nm-header-footer-area pt-130 pb-110" id="about">
      <div className="container nm-container-1">
        <div className="nm-header-footer-wrap">
          <div className="nm-header-footer-left wa-p-relative">
            <div className="nm-header-footer-img-1">
              <img src={aboutImages.main} alt="RK Web Solutions preview" />
            </div>
            <div className="nm-header-footer-img-wow rk-about-accent">
              <img src={aboutImages.accent} alt="Creative accent" />
            </div>
          </div>

          <div className="nm-header-footer-right">
            <h2 className="nm-sec-title title">{siteContent.about.title}</h2>
            <p className="nm-p-1 sec-disc">{siteContent.about.content}</p>
            <div className="nm-elementor-btn">
              <ActionButton
                href={siteContent.about.button.href}
                label={siteContent.about.button.label}
              />
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

function ResponsiveShowcaseSection() {
  return (
    <section className="rk-responsive-showcase">
      <div className="container nm-container-1">
        <div className="rk-responsive-showcase__shell">
          <div className="rk-responsive-showcase__visual">
            <div className="rk-responsive-showcase__laptop">
              <img
                src={responsiveShowcaseAssets.main}
                alt="Laptop website preview"
              />
            </div>

            <div className="rk-responsive-showcase__tablet">
              <div className="rk-responsive-showcase__tablet-frame">
                <img
                  src={responsiveShowcaseAssets.tablet}
                  alt="Tablet website preview"
                />
              </div>
            </div>

            <div className="rk-responsive-showcase__phone">
              <img
                src={responsiveShowcaseAssets.phone}
                alt="Mobile website preview"
              />
            </div>
          </div>

          <div className="rk-responsive-showcase__content">
            <h2 className="rk-responsive-showcase__title">
              {siteContent.responsiveShowcase.title}
            </h2>
            <p className="rk-responsive-showcase__copy">
              {siteContent.responsiveShowcase.intro}
            </p>
            <div className="rk-responsive-showcase__btn">
              <ActionButton
                href={siteContent.responsiveShowcase.button.href}
                label={siteContent.responsiveShowcase.button.label}
              />
            </div>

            <div className="rk-responsive-showcase__stats">
              {siteContent.responsiveShowcase.items.map((item) => (
                <div className="rk-responsive-stat" key={item.icon}>
                  <div className="rk-responsive-stat__icon">
                    <img src={responsiveIconMap[item.icon]} alt="" />
                  </div>
                  <strong className="rk-responsive-stat__resolution">
                    {item.resolution}
                  </strong>
                  <span className="rk-responsive-stat__label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonialCards = useMemo(
    () =>
      siteContent.testimonials.reviews.map((review, index) => ({
        review,
        name:
          siteContent.testimonials.names[
            index % siteContent.testimonials.names.length
          ],
      })),
    [],
  );

  const columns = splitIntoColumns(testimonialCards, 3);

  return (
    <section className="px-testimonial-area pt-125 pb-90 wa-p-relative">
      <div className="px-testimonial-bg-shadow-1">
        <img src="/a_data_002/testimonial-shadow-1.png" alt="" />
      </div>
      <div className="px-testimonial-bg-shadow-2">
        <img src="/a_data_002/testimonial-shadow-2.png" alt="" />
      </div>

      <div className="container nm-container-1">
        <div className="px-testimonial-scn-title mb-60">
          <h2 className="nm-sec-title">{siteContent.testimonials.title}</h2>
          <p className="nm-p-1 sec-disc">{siteContent.testimonials.intro}</p>
        </div>

        <div className="rk-testimonial-grid">
          {columns.map((column, columnIndex) => (
            <div className="rk-testimonial-column" key={columnIndex}>
              {column.map((item) => (
                <div className="px-testimonial-item" key={`${columnIndex}-${item.name}`}>
                  <div className="header">
                    <img
                      src="/a_data_002/envato-logo.png"
                      alt=""
                      className="icon"
                    />
                    <span className="name">
                      {item.name} <span>-client</span>
                    </span>
                  </div>
                  <p className="text">{item.review}</p>
                  <div className="ratting-wrap">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <span className="rk-rating-star" key={starIndex}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const contactMeta = {
    Phone: {
      eyebrow: "Direct line",
      action: "Call now",
      href: "tel:+916385885560",
    },
    Email: {
      eyebrow: "Project inbox",
      action: "Send email",
      href: "mailto:rkwebsolutions.business@gmail.com",
    },
    WhatsApp: {
      eyebrow: "Fastest reply",
      action: "Open chat",
      href: siteContent.contact.button.href,
      external: true,
      featured: true,
    },
    Address: {
      eyebrow: "Service area",
      action: "View details",
    },
  };

  const contactHighlights = [
    "Free homepage demo",
    "Phone, email & WhatsApp",
    "Business-focused websites",
  ];

  return (
    <section className="nm-responsive-area rk-contact-area" id="contact">
      <div className="container nm-container-1">
        <div className="rk-contact-layout">
          <div className="nm-responsive-sec-title rk-contact-panel">
            <span className="rk-contact-eyebrow">Start Your Project</span>
            <h2 className="nm-sec-title title">{siteContent.contact.title}</h2>
            <p className="nm-p-1 sec-disc">{siteContent.contact.intro}</p>

            <div className="rk-contact-pills">
              {contactHighlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="btn-wrap">
              <ActionButton
                href={siteContent.contact.button.href}
                label={siteContent.contact.button.label}
                external={siteContent.contact.button.external}
              />
            </div>

            <p className="rk-contact-note">
              Share your business name and what kind of website you need, and
              we’ll guide you to the fastest next step.
            </p>
          </div>

          <div className="rk-contact-board">
            <div className="rk-contact-board__header">
              <span className="rk-contact-board__eyebrow">Reach Out</span>
              <h3 className="rk-contact-board__title">
                Choose the easiest way to connect with us
              </h3>
              <p className="rk-contact-board__copy">
                Pick the method that works best for you and we’ll help you get
                your website project started.
              </p>
            </div>

            <div className="nm-responsive-devices rk-contact-cards">
              {siteContent.contact.details.map((detail, index) => {
                const meta = contactMeta[detail.title] ?? {};
                const cardClassName = `nm-responsive-devices-single rk-contact-card${
                  meta.featured ? " rk-contact-card--featured" : ""
                }`;

                const content = (
                  <>
                    <div className="rk-contact-card__top">
                      <div className="rk-contact-icon">
                        <InlineIcon name={contactIcons[index]} />
                      </div>
                      <span className="rk-contact-card__eyebrow">
                        {meta.eyebrow ?? detail.title}
                      </span>
                    </div>
                    <h5 className="nm-h-1 title">{detail.title}</h5>
                    <p className="nm-p-1 disc rk-contact-card__value">
                      {detail.description}
                    </p>
                    <span className="rk-contact-card__action">
                      {meta.action ?? "Learn more"}
                      <InlineIcon name="arrow" />
                    </span>
                  </>
                );

                if (meta.href) {
                  return (
                    <a
                      className={cardClassName}
                      href={meta.href}
                      key={detail.title}
                      target={meta.external ? "_blank" : undefined}
                      rel={meta.external ? "noreferrer" : undefined}
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <div className={cardClassName} key={detail.title}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <>
      <div className="nm-marquee-text-area rk-footer-marquee">
        <div className="rk-marquee-track rk-marquee-track--footer">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="nm-marquee-text-wrap" key={index}>
              <h4 className="nm-h-1 nm-marquee-text-title">
                <span>Smart </span>
                <span className="has-stroke">Websites </span>
                <span className="clr-2">That Grow </span>
                <span className="has-stroke-2">Your Business </span>
              </h4>
            </div>
          ))}
        </div>
      </div>

      <footer className="px-footer-area wa-fix">
        <div className="px-footer-top wa-bg-default wa-p-relative wa-fix rk-footer-top">
          <div className="container nm-container-1">
            <div className="px-footer-content">
              <h2 className="nm-sec-title title">{siteContent.cta.title}</h2>
              <p className="nm-p-1 disc">{siteContent.cta.content}</p>
              <ActionButton
                href={siteContent.cta.button.href}
                label={siteContent.cta.button.label}
              />
            </div>
          </div>

          <div className="px-footer-demo-1 wa-fix wa-img-cover">
            <img src={footerScreenshots[0]} alt="Website preview" />
          </div>
          <div className="px-footer-demo-3 wa-fix wa-img-cover">
            <img src={footerScreenshots[2]} alt="Website preview" />
          </div>
          <div className="px-footer-demo-4 wa-fix wa-img-cover">
            <img src={footerScreenshots[1]} alt="Website preview" />
          </div>
          <div className="px-footer-demo-5 wa-fix wa-img-cover">
            <img src={footerScreenshots[3]} alt="Website preview" />
          </div>
        </div>

        <div className="px-footer-bottom">
          <div className="container nm-container-1">
            <div className="px-footer-copyright rk-footer-meta">
              <div className="rk-footer-brand-block">
                <a
                  href="#home"
                  aria-label={siteContent.brandName}
                  className="rk-brand-logo-link rk-brand-logo-link--footer"
                >
                  <BrandLogo theme="light" compact />
                </a>
                <p className="rk-footer-copy">{siteContent.footer.text}</p>
              </div>

              <div className="rk-footer-links">
                {siteContent.footer.quickLinks.map((link) => (
                  <a href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="rk-footer-social">
                {siteContent.footer.socials.map((social) => (
                  <a
                    href={social.href}
                    key={social.label}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noreferrer" : undefined}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function ReferenceSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    document.title = siteContent.brandName;
  }, []);

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

  return (
    <div className="rk-page">
      <Header
        isSticky={isSticky}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <HeroSection activeSlide={activeSlide} />
      <ServicesSection />
      <ProjectsSection />
      <WhyChooseSection />
      <AboutSection />
      <ProcessSection />
      <ResponsiveShowcaseSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}

export default ReferenceSite;
