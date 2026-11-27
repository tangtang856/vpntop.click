import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'docs', '.vitepress', 'dist');
const DOMAIN = 'https://vpntop.click';

console.log('=== [QA AUDIT: VITEPRESS PRODUCTION BUILD & SEO] ===');

if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ [FAIL] docs/.vitepress/dist does not exist. Run "npm run build" first.');
  process.exit(1);
}

let errors = 0;

// 1. Verify index.html exists
const indexPath = path.join(DIST_DIR, 'index.html');
if (fs.existsSync(indexPath)) {
  const indexHtml = fs.readFileSync(indexPath, 'utf-8');
  if (indexHtml.includes('VPN Top') && indexHtml.includes('微风网络')) {
    console.log('✓ [PASS] index.html exists and contains verified brand data.');
  } else {
    console.error('❌ [FAIL] index.html missing key content.');
    errors++;
  }
} else {
  console.error('❌ [FAIL] index.html missing.');
  errors++;
}

// 2. Verify sitemap.xml exists and check URL count
const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
  const urlCount = (sitemapXml.match(/<url>/g) || []).length;
  if (urlCount >= 160) {
    console.log(`✓ [PASS] sitemap.xml exists with ${urlCount} indexed URLs (>= 160 required).`);
  } else {
    console.error(`❌ [FAIL] sitemap.xml contains only ${urlCount} URLs, expected at least 160.`);
    errors++;
  }
} else {
  console.error('❌ [FAIL] sitemap.xml missing in dist.');
  errors++;
}

// 3. Verify robots.txt and IndexNow key
const robotsPath = path.join(DIST_DIR, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  console.log('✓ [PASS] robots.txt exists in dist.');
} else {
  console.error('❌ [FAIL] robots.txt missing in dist.');
  errors++;
}

const keyPath = path.join(DIST_DIR, 'f23cb41920784260a48b5e98586909cb.txt');
if (fs.existsSync(keyPath)) {
  console.log('✓ [PASS] IndexNow verification key file exists in dist.');
} else {
  console.error('❌ [FAIL] IndexNow verification key file missing.');
  errors++;
}

// 4. Check core sections in dist
const checkPaths = [
  'compare/index.html',
  'ranking/overall.html',
  'ranking/value.html',
  'guides/index.html',
  'guides/windows.html',
  'blog/index.html',
  'blog/how-to-choose-airport.html',
  'review/breezenet.html',
  'review/yinxingren.html',
  'about.html',
  'privacy-policy.html'
];

checkPaths.forEach(p => {
  const full = path.join(DIST_DIR, p);
  if (fs.existsSync(full)) {
    const content = fs.readFileSync(full, 'utf-8');
    // Check no unreplaced template placeholders
    const placeholder = content.match(/\{\{([^{}]+)\}\}/);
    if (placeholder) {
      console.error(`❌ [TEMPLATE ERROR] Found unreplaced {{...}} in ${p}`);
      errors++;
    }
  } else {
    console.error(`❌ [FAIL] Expected route file ${p} missing in dist.`);
    errors++;
  }
});

if (errors === 0) {
  console.log('\n✨ [ALL PASS] VitePress architecture validation passed with 0 errors!');
  process.exit(0);
} else {
  console.error(`\n❌ [FAILED] Found ${errors} validation errors.`);
  process.exit(1);
}
