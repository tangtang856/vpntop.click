/**
 * vpntop.click - IndexNow Submission Tool for Bing / Yandex
 * Section 13.6 Compliance:
 * - API Key Configuration & Verification
 * - Single / Batch URL submission
 * - Non-indiscriminate submission: only targets newly updated or modified pages
 * - Clear reminder: IndexNow submission success does NOT equate to instant Bing indexing
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const DOMAIN = 'vpntop.click';
const KEY = 'f23cb41920784260a48b5e98586909cb';
const KEY_LOCATION = `https://${DOMAIN}/${KEY}.txt`;

// Determine URLs to submit from arguments or default to core updated targets
const args = process.argv.slice(2);
let targetUrls = [];

if (args.length > 0) {
  targetUrls = args.map(u => u.startsWith('http') ? u : `https://${DOMAIN}${u.startsWith('/') ? u : '/' + u}`);
} else {
  // Selective core priority URLs (Never indiscriminately submit the whole site)
  targetUrls = [
    `https://${DOMAIN}/`,
    `https://${DOMAIN}/ranking/overall/`,
    `https://${DOMAIN}/ranking/value/`,
    `https://${DOMAIN}/ranking/stable/`,
    `https://${DOMAIN}/compare/`,
    `https://${DOMAIN}/recommend/stable/`
  ];
}

console.log('=== [INDEXNOW SUBMISSION] ===');
console.log(`Host: ${DOMAIN}`);
console.log(`Key Location: ${KEY_LOCATION}`);
console.log(`Target URLs (${targetUrls.length}):`);
targetUrls.forEach(u => console.log(`  - ${u}`));

const payload = JSON.stringify({
  host: DOMAIN,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: targetUrls
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  let responseBody = '';
  res.on('data', (chunk) => {
    responseBody += chunk;
  });

  res.on('end', () => {
    console.log(`HTTP Status: ${res.statusCode} ${res.statusMessage}`);
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('✓ [SUCCESS] IndexNow API accepted the submission successfully.');
      console.log('⚠️ [IMPORTANT NOTICE] IndexNow submission success notifies Bing of page freshness, but does NOT guarantee immediate indexing. Actual indexing depends on Bing Webmaster crawl quotas and page quality evaluation.');
    } else {
      console.error(`❌ [ERROR] Submission failed with status code ${res.statusCode}: ${responseBody}`);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ [NETWORK ERROR] Unable to reach IndexNow API: ${e.message}`);
  console.log('Tip: Check your network connectivity or proxy settings.');
});

req.write(payload);
req.end();
