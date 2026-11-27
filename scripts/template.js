const fs = require('fs');
const path = require('path');
const { airports } = require('../data/airports.js');

const DOMAIN = 'https://vpntop.click';

// Helper to determine relative path prefix based on file depth
function getRelPrefix(depth) {
  if (depth === 0) return './';
  return '../'.repeat(depth);
}

// Generate Header
function renderHeader(depth, activeNav) {
  const rel = getRelPrefix(depth);
  return `
  <header class="site-header">
    <div class="container header-inner">
      <a href="${rel}index.html" class="site-logo">
        <span class="badge-logo">VPN TOP</span>
        <span>机场评测网</span>
      </a>
      <button class="nav-toggle-btn" aria-label="切换导航菜单" aria-expanded="false">&#9776;</button>
      <nav class="main-nav" aria-label="全站导航">
        <a href="${rel}index.html" class="${activeNav === 'home' ? 'active' : ''}">首页</a>
        <a href="${rel}recommend/stable/index.html" class="${activeNav === 'recommend' ? 'active' : ''}">机场推荐</a>
        <a href="${rel}ranking/overall/index.html" class="${activeNav === 'ranking' ? 'active' : ''}">机场排行</a>
        <a href="${rel}compare/index.html" class="${activeNav === 'compare' ? 'active' : ''}">机场对比</a>
        <a href="${rel}guides/windows/index.html" class="${activeNav === 'guides' ? 'active' : ''}">使用教程</a>
        <a href="${rel}blog/how-to-choose-airport/index.html" class="${activeNav === 'blog' ? 'active' : ''}">博客文章</a>
      </nav>
    </div>
  </header>`;
}

// Generate Footer
function renderFooter(depth) {
  const rel = getRelPrefix(depth);
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h5>关于 VPN Top (vpntop.click)</h5>
          <p style="margin-bottom:12px; line-height:1.6; color:#94a3b8;">
            专注真实客观的中文机场推荐、翻墙梯子测评、IPLC/IEPL高速专线节点监测与网络加速科普。汇聚 14 款核验品牌，杜绝虚假跑分，秉持数据透明与中立原则。
          </p>
          <p style="color:#64748b; font-size:0.82rem;">主攻搜索词：机场推荐 · 性价比机场 · 梯子推荐 · 机场节点 · vpn机场推荐</p>
        </div>
        <div class="footer-col">
          <h5>专题推荐</h5>
          <ul>
            <li><a href="${rel}recommend/budget/index.html">低预算便宜机场</a></li>
            <li><a href="${rel}recommend/premium/index.html">高端IPLC专线机场</a></li>
            <li><a href="${rel}recommend/stable/index.html">稳定晚高峰机场</a></li>
            <li><a href="${rel}recommend/ai/index.html">AI / ChatGPT 专用节点</a></li>
            <li><a href="${rel}recommend/streaming/index.html">4K 流媒体解锁机场</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>排行榜与精选评测</h5>
          <ul>
            <li><a href="${rel}ranking/overall/index.html">2026综合实力总榜</a></li>
            <li><a href="${rel}ranking/value/index.html">高性价比机场排行</a></li>
            <li><a href="${rel}compare/index.html">机场横向对比工具</a></li>
            <li><a href="${rel}review/breezenet/index.html">微风网络 Breezenet 评测</a></li>
            <li><a href="${rel}review/yinxingren/index.html">隐形人 深度评测</a></li>
            <li><a href="${rel}review/lingmao/index.html">灵猫 深度评测</a></li>
            <li><a href="${rel}review/feiv/index.html">飞V 深度评测</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>站点政策与服务</h5>
          <ul>
            <li><a href="${rel}about/index.html">关于我们</a></li>
            <li><a href="${rel}contact/index.html">联系编辑部</a></li>
            <li><a href="${rel}editorial-policy/index.html">客观编辑政策</a></li>
            <li><a href="${rel}privacy-policy/index.html">隐私政策</a></li>
            <li><a href="${rel}disclaimer/index.html">合规免责声明</a></li>
            <li><a href="${rel}sitemap.xml">XML 网站地图</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div>&copy; 2026 VPN Top (vpntop.click) - 保留所有权利。遵循客观独立测评规范。</div>
        <div>全站纯 HTML 极速架构 | Bing SEO 强化版</div>
      </div>
    </div>
  </footer>
  <script src="${rel}js/main.js"></script>`;
}

// Generate Breadcrumbs
function renderBreadcrumbs(crumbs, depth) {
  const rel = getRelPrefix(depth);
  let listItems = crumbs.map((c, i) => {
    if (i === crumbs.length - 1) {
      return `<li aria-current="page">${c.name}</li>`;
    }
    return `<li><a href="${c.url.startsWith('http') ? c.url : rel + c.url}">${c.name}</a></li>`;
  }).join('');

  return `
  <nav class="breadcrumb-bar" aria-label="面包屑导航">
    <div class="container">
      <ul class="breadcrumb-list">
        <li><a href="${rel}index.html">首页</a></li>
        ${listItems}
      </ul>
    </div>
  </nav>`;
}

// Base HTML Template
function renderPage({
  title,
  description,
  canonicalPath,
  depth,
  activeNav,
  breadcrumbs,
  schemaJson,
  content
}) {
  const rel = getRelPrefix(depth);
  const canonicalUrl = `${DOMAIN}${canonicalPath}`;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <!-- Open Graph / Social Media -->
  <meta property="og:type" content="website">
  <meta property="og:locale" content="zh_CN">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="VPN Top">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <!-- Native Clean CSS (Strictly Relative Path) -->
  <link rel="stylesheet" href="${rel}css/style.css">
  ${schemaJson ? `<script type="application/ld+json">\n${JSON.stringify(schemaJson, null, 2)}\n</script>` : ''}
</head>
<body>
  ${renderHeader(depth, activeNav)}
  ${breadcrumbs ? renderBreadcrumbs(breadcrumbs, depth) : ''}
  <main>
    ${content}
  </main>
  ${renderFooter(depth)}
</body>
</html>`;
}

// Save file safely
function saveHtmlFile(subPath, html) {
  const fullPath = path.join(__dirname, '..', subPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, html, 'utf-8');
  console.log(`[GENERATED] ${subPath}`);
}

module.exports = {
  DOMAIN,
  renderPage,
  renderBreadcrumbs,
  saveHtmlFile,
  getRelPrefix
};
