/**
 * vpntop.click - Internal Link & Asset Relative Path Validator
 * Checks:
 * - Strict relative paths for all css, js, images, and links
 * - Zero broken internal links (ensuring targets exist on disk)
 * - Zero illegal absolute root paths like href="/css/..." or href="/ranking/..."
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

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

console.log('=== [QA AUDIT: INTERNAL LINKS & RELATIVE PATHS] ===');
const htmlFiles = getAllHtmlFiles(ROOT_DIR);
let brokenLinks = 0;
let absoluteRootViolations = 0;

htmlFiles.forEach(file => {
  const fileDir = path.dirname(file);
  const relHtml = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf-8');

  // Check href and src attributes
  const linkRegex = /(?:href|src)=["']([^"']+)["']/gi;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const target = match[1].trim();

    // Skip external URLs, anchor hashes, javascript:, mailto:, data: URIs
    if (target.startsWith('http://') || 
        target.startsWith('https://') || 
        target.startsWith('#') || 
        target.startsWith('javascript:') || 
        target.startsWith('mailto:') || 
        target.startsWith('data:')) {
      continue;
    }

    // CHECK FORBIDDEN ROOT-RELATIVE PATHS (e.g. href="/ranking/..." or src="/css/...")
    if (target.startsWith('/') && !target.startsWith('//')) {
      console.error(`❌ [ABSOLUTE PATH VIOLATION] Found root-relative path "${target}" in ${relHtml}. Relative paths are strictly required!`);
      absoluteRootViolations++;
      continue;
    }

    // Resolve relative path against file directory
    const cleanTarget = target.split('#')[0].split('?')[0];
    if (!cleanTarget) continue;

    const resolvedPath = path.resolve(fileDir, cleanTarget);

    if (!fs.existsSync(resolvedPath)) {
      console.error(`❌ [BROKEN LINK] In ${relHtml}: "${target}" resolves to non-existent file "${resolvedPath}"`);
      brokenLinks++;
    }
  }
});

console.log(`\nAudit Results:`);
console.log(`- Broken Links: ${brokenLinks}`);
console.log(`- Absolute Root Path Violations: ${absoluteRootViolations}`);

if (brokenLinks > 0 || absoluteRootViolations > 0) {
  console.error('\nLink Audit: FAILED.');
  process.exit(1);
} else {
  console.log('✓ [PASS] Link and Relative Path Audit passed cleanly! Zero broken links and 100% strict relative path compliance.');
}
