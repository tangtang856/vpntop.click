const fs = require('fs');
const path = require('path');
const { airports } = require('../data/airports.js');

const { generateHomepage } = require('./generate-home.js');
const { generateRankings } = require('./generate-rankings.js');
const { generateCompare } = require('./generate-compare.js');
const { generateRecommendations } = require('./generate-recommend.js');
const { generateReviews } = require('./generate-reviews.js');
const { generateGuidesFull, allGuides } = require('./generate-guides-full.js');
const { generateBlogsFull } = require('./generate-blogs-full.js');
const { allBlogs } = require('./blogs-data.js');
const { generateGlossary } = require('./generate-glossary.js');
const { generateTrustPages } = require('./generate-trust.js');

const DOMAIN = 'https://vpntop.click';
const INDEXNOW_KEY = 'f23cb41920784260a48b5e98586909cb';

console.log('=== [VPNTOP.CLICK] BUILD PIPELINE STARTING (14 BRANDS + 30 GUIDES + 100 BLOGS) ===');

// 1. Generate All Pages
generateHomepage();
generateRankings();
generateCompare();
generateRecommendations();
generateReviews();
generateGuidesFull();
generateBlogsFull();
generateGlossary();
generateTrustPages();

// 2. Generate Sitemap.xml
const sitemapUrls = [
  '/',
  '/ranking/overall/',
  '/ranking/value/',
  '/ranking/budget/',
  '/ranking/stable/',
  '/compare/',
  '/recommend/',
  '/recommend/budget/',
  '/recommend/premium/',
  '/recommend/beginner/',
  '/recommend/stable/',
  '/recommend/ai/',
  '/recommend/streaming/',
  // 14 Brand Reviews
  ...airports.map(a => `/review/${a.id}/`),
  // Guides Hub & 30 Guides
  '/guides/',
  ...allGuides.map(g => `/guides/${g.slug}/`),
  // Blog Hub & 100 Blog Posts
  '/blog/',
  ...allBlogs.map(b => `/blog/${b.slug}/`),
  // Glossary
  '/glossary/iplc/',
  '/glossary/iepl/',
  '/glossary/clash/',
  '/glossary/v2ray/',
  '/glossary/shadowsocks/',
  // Trust Pages
  '/about/',
  '/contact/',
  '/editorial-policy/',
  '/privacy-policy/',
  '/disclaimer/'
];

const today = new Date().toISOString().split('T')[0];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(urlPath => `  <url>
    <loc>${DOMAIN}${urlPath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${urlPath === '/' || urlPath.startsWith('/ranking/') ? 'daily' : 'weekly'}</changefreq>
    <priority>${urlPath === '/' ? '1.0' : (urlPath.startsWith('/ranking/') || urlPath === '/compare/' ? '0.9' : '0.8')}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '..', 'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`[GENERATED] sitemap.xml (${sitemapUrls.length} URLs)`);

// 3. Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;
fs.writeFileSync(path.join(__dirname, '..', 'robots.txt'), robotsTxt, 'utf-8');
console.log('[GENERATED] robots.txt');

// 4. Generate IndexNow Key File
fs.writeFileSync(path.join(__dirname, '..', `${INDEXNOW_KEY}.txt`), INDEXNOW_KEY, 'utf-8');
console.log(`[GENERATED] ${INDEXNOW_KEY}.txt (IndexNow Verification Key)`);

console.log('=== [VPNTOP.CLICK] BUILD PIPELINE COMPLETE ===');
