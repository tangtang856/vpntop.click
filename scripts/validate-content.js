/**
 * vpntop.click - Content & Variable Integrity Validator
 * Checks:
 * - No unreplaced template brackets like {{...}}
 * - Substantial content (no blank pages, body content length > 1000 characters)
 * - Sitemap.xml and robots.txt exist and match formal domain https://vpntop.click
 * - IndexNow key file verification
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

console.log('=== [QA AUDIT: CONTENT INTEGRITY & VARIABLES] ===');
const htmlFiles = getAllHtmlFiles(ROOT_DIR);
let errors = 0;

htmlFiles.forEach(file => {
  const relHtml = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf-8');

  // 1. Check for unreplaced template variables
  const placeholderMatch = content.match(/\{\{([^{}]+)\}\}/g);
  if (placeholderMatch) {
    console.error(`❌ [TEMPLATE ERROR] Found unreplaced placeholder in ${relHtml}: ${placeholderMatch.join(', ')}`);
    errors++;
  }

  // 2. Content Length Check (prevent blank or empty stubs)
  if (content.length < 1500) {
    console.error(`❌ [THIN CONTENT] File ${relHtml} is unexpectedly short (${content.length} bytes).`);
    errors++;
  }
});

// 3. Sitemap Verification
const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('❌ [MISSING] sitemap.xml is missing.');
  errors++;
} else {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  if (!sitemapContent.includes(DOMAIN)) {
    console.error(`❌ [SITEMAP ERROR] sitemap.xml does not contain formal domain ${DOMAIN}`);
    errors++;
  }
  console.log('✓ [VERIFIED] sitemap.xml exists and references formal domain.');
}

// 4. Robots.txt Verification
const robotsPath = path.join(ROOT_DIR, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  console.error('❌ [MISSING] robots.txt is missing.');
  errors++;
} else {
  const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
  if (!robotsContent.includes('Sitemap: ' + DOMAIN + '/sitemap.xml')) {
    console.error('❌ [ROBOTS ERROR] robots.txt does not properly declare Sitemap URL.');
    errors++;
  }
  console.log('✓ [VERIFIED] robots.txt exists and properly declares Sitemap.');
}

// 5. IndexNow Key File Verification
const keyFile = path.join(ROOT_DIR, 'f23cb41920784260a48b5e98586909cb.txt');
if (!fs.existsSync(keyFile)) {
  console.error('❌ [MISSING] IndexNow key file is missing.');
  errors++;
} else {
  console.log('✓ [VERIFIED] IndexNow verification key file exists.');
}

if (errors > 0) {
  console.error(`\nContent Validation: FAILED with ${errors} errors.`);
  process.exit(1);
} else {
  console.log(`\n✓ [PASS] Content Validation passed cleanly across all ${htmlFiles.length} pages.`);
}
