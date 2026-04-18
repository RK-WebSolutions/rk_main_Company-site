
This is now a React-first Vite website. React owns the page content, location-specific pages, SEO updates, layout, and styling imports.

```text
src/
  app/                 React application entrypoint and root app component
  data/                Site copy, location page data, contact details, SEO content
  features/
    marketing/         Main website UI sections and interactions
  styles/
    vendor/            Imported third-party/theme CSS used by React
    global.css         Custom RKWS Web Studio styling
public/
  assets/images/       Static images referenced by React components
  robots.txt           Search engine crawling rules
  sitemap.xml          Public URLs for search engines
```

## Editing Guide

- Update text, location pages, contact details, and SEO data in `src/data/siteContent.js`.
- Update website sections/components in `src/features/marketing/ReferenceSite.jsx`.
- Update custom styling in `src/styles/global.css`.
- Add images to `public/assets/images/` and reference them with `/assets/images/file-name.ext`.
- `index.html` is the only HTML entrypoint; all website pages are handled by React based on the browser path.
