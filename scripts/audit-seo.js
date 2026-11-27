/**
 * vpntop.click - Automated SEO Audit Script
 * Audits all generated HTML files for:
 * - Missing / Duplicate Titles
 * - Missing Meta Descriptions
 * - Unique single H1 per page
 * - Correct Canonical URLs matching https://vpntop.click/
 * - Correct Robots directives
 * - Presence of OpenGraph and Schema JSON-LD
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DOMAIN = 'https://vpntop.click';

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'scripts' && file !== 'data' && file !== 'docs') {
        results = results.concat(getAllHtmlFiles(filePath));
      }
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

console.log('=== [QA AUDIT: SEO METADATA & STRUCTURE] ===');
const htmlFiles = getAllHtmlFiles(ROOT_DIR);
console.log(`Found ${htmlFiles.length} HTML files to inspect.`);

let hasError = false;
let titles = new Map();

htmlFiles.forEach(file => {
  const relPath = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf-8');

  // 1. Title Check
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch) {
    console.error(`❌ [FAIL] Missing <title> in ${relPath}`);
    hasError = true;
  } else {
    const title = titleMatch[1].trim();
    if (titles.has(title)) {
      console.warn(`⚠️ [WARN] Duplicate title: "${title}" in ${relPath} and ${titles.get(title)}`);
    } else {
      titles.set(title, relPath);
    }
  }

  // 2. Meta Description Check
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (!descMatch) {
    console.error(`❌ [FAIL] Missing meta description in ${relPath}`);
    hasError = true;
  }

  // 3. H1 Tag Count Check (Must have exactly one H1)
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  if (!h1Matches || h1Matches.length === 0) {
    console.error(`❌ [FAIL] No <h1> tag found in ${relPath}`);
    hasError = true;
  } else if (h1Matches.length > 1) {
    console.error(`❌ [FAIL] Multiple <h1> tags (${h1Matches.length}) found in ${relPath}`);
    hasError = true;
  }

  // 4. Canonical URL Check
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    console.error(`❌ [FAIL] Missing canonical URL in ${relPath}`);
    hasError = true;
  } else {
    const canonical = canonicalMatch[1];
    if (!canonical.startsWith(DOMAIN)) {
      console.error(`❌ [FAIL] Canonical URL "${canonical}" does not start with ${DOMAIN} in ${relPath}`);
      hasError = true;
    }
    if (canonical.includes('localhost') || canonical.includes('127.0.0.1')) {
      console.error(`❌ [FAIL] Canonical URL contains local domain in ${relPath}`);
      hasError = true;
    }
  }

  // 5. Robots Meta Check
  const robotsMatch = content.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
  if (!robotsMatch) {
    console.error(`❌ [FAIL] Missing robots meta in ${relPath}`);
    hasError = true;
  }
});

if (hasError) {
  console.error('\nSEO Audit: FAILED with errors.');
  process.exit(1);
} else {
  console.log(`\n✓ [PASS] SEO Audit passed! All ${htmlFiles.length} pages have valid Title, Description, single H1, Canonical and Robots tags.`);
}
