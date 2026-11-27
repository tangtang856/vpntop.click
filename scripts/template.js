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
      <nav class="main-nav" aria-label="全站导航">
        <a href="${rel}index.html" class="${activeNav === 'home' ? 'active' : ''}">首页</a>
        <a href="${rel}recommend/index.html" class="${activeNav === 'recommend' ? 'active' : ''}">机场推荐</a>
        <a href="${rel}ranking/overall/index.html" class="${activeNav === 'ranking' ? 'active' : ''}">机场排行</a>
        <a href="${rel}compare/index.html" class="${activeNav === 'compare' ? 'active' : ''}">机场对比</a>
        <a href="${rel}guides/index.html" class="${activeNav === 'guides' ? 'active' : ''}">使用教程</a>
        <a href="${rel}blog/index.html" class="${activeNav === 'blog' ? 'active' : ''}">博客文章</a>
        <a href="javascript:void(0)" onclick="openContactModal()" class="mobile-contact-link">💬 联络我们</a>
      </nav>
      <div class="header-actions">
        <button type="button" class="btn btn-contact btn-sm" onclick="openContactModal()" aria-label="联络我们">
          <span class="contact-btn-icon">💬</span> 联络我们
        </button>
        <a href="${rel}compare/index.html" class="btn btn-outline btn-sm">横向对比</a>
      </div>
      <button class="nav-toggle-btn" aria-label="切换导航菜单" aria-expanded="false">&#9776;</button>
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
          <h5>推荐专题中心</h5>
          <ul>
            <li><a href="${rel}recommend/index.html" style="font-weight:700; color:var(--primary);">🎯 场景化推荐总览</a></li>
            <li><a href="${rel}recommend/stable/index.html">⚡ 晚高峰抗断流专线</a></li>
            <li><a href="${rel}recommend/budget/index.html">💰 平价便宜备用机场</a></li>
            <li><a href="${rel}recommend/premium/index.html">🚀 企业级高端IPLC专线</a></li>
            <li><a href="${rel}recommend/ai/index.html">🤖 AI / ChatGPT 专用节点</a></li>
            <li><a href="${rel}recommend/streaming/index.html">🎬 4K 超高清流媒体解锁</a></li>
            <li><a href="${rel}recommend/beginner/index.html">🔰 新手零基础入门指南</a></li>
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

  <!-- 全局专业联络我们弹窗 Modal -->
  <div id="contact-modal" class="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
    <div class="contact-modal-overlay" onclick="closeContactModal()"></div>
    <div class="contact-modal-dialog">
      <div class="contact-modal-header">
        <div class="contact-modal-title-group">
          <h3 id="contact-modal-title" class="contact-modal-title">💬 联络我们 / 商务合作</h3>
          <p class="contact-modal-subtitle">官方唯一联系渠道 · 商务合作 · 节点送测 · 7×24h 优先受理</p>
        </div>
        <button type="button" class="contact-modal-close" onclick="closeContactModal()" aria-label="关闭窗口">&times;</button>
      </div>
      
      <div class="contact-modal-body">
        <!-- Gmail 商务联络通道 -->
        <div class="contact-channel-card">
          <div class="channel-icon gmail-icon">
            <span>M</span>
          </div>
          <div class="channel-info">
            <div class="channel-type">官方商务与合作邮箱 (Gmail)</div>
            <div class="channel-value" id="contact-gmail-val">xintangtang888@gmail.com</div>
            <div class="channel-desc">受理机场品牌送测、广告赞助、文章转载与商业洽谈，1个工作日内必复。</div>
          </div>
          <div class="channel-actions">
            <button type="button" class="btn btn-sm btn-outline" onclick="copyContactText('xintangtang888@gmail.com', this)">复制邮箱</button>
            <a href="mailto:xintangtang888@gmail.com?subject=VPN%20Top%20业务合作咨询" class="btn btn-sm btn-primary" style="font-weight:700;">发信联络</a>
          </div>
        </div>

        <!-- Telegram 即时沟通通道 -->
        <div class="contact-channel-card">
          <div class="channel-icon tlg-icon">
            <span>✈</span>
          </div>
          <div class="channel-info">
            <div class="channel-type">Telegram 唯一官方即时客服</div>
            <div class="channel-value" id="contact-tlg-val">@xintangtang</div>
            <div class="channel-desc">支持即时技术探讨、大客户采购咨询与紧急问题交流。请认准唯一用户名。</div>
          </div>
          <div class="channel-actions">
            <button type="button" class="btn btn-sm btn-outline" onclick="copyContactText('@xintangtang', this)">复制账号</button>
            <a href="https://t.me/xintangtang" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" style="background:#0088cc; border-color:#0088cc; font-weight:700;">直达 TG 对话</a>
          </div>
        </div>

        <!-- 合作规范声明 -->
        <div class="contact-notice-box">
          <div class="notice-item">
            <strong>🛡️ 客观公正声明：</strong>本站所有测评均基于真实网络环境实测，拒绝虚假跑分，不收受虚假排位赞助。
          </div>
          <div class="notice-item">
            <strong>⚡ 优先响应承诺：</strong>Telegram 消息于工作时段优先极速响应，邮件信件将在 1 个工作日内处理完毕。
          </div>
        </div>
      </div>
      
      <div class="contact-modal-footer">
        <a href="${rel}contact/index.html" class="contact-footer-link">查看完整联络渠道与勘误公约 &rarr;</a>
      </div>
    </div>
  </div>

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
