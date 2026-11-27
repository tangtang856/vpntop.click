const { DOMAIN, renderPage, saveHtmlFile } = require('./template.js');
const { allBlogs } = require('./blogs-data.js');

function generateBlogsFull() {
  console.log(`[GENERATING] 100 Blog Posts and blog/index.html...`);

  // 1. Generate Each of the 100 Blog Posts
  allBlogs.forEach(p => {
    const depth = 2;
    const rel = '../../';

    const crumbs = [
      { name: "博客文章", url: "blog/index.html" },
      { name: p.title.split('：')[0], url: "" }
    ];

    const sectionsHtml = p.sections.map(s => `
      <section style="margin-top:32px;">
        <h2 style="font-size:1.35rem; font-weight:700; color:var(--text-main); margin-bottom:14px; padding-bottom:8px; border-bottom:1px solid var(--border);">${s.heading}</h2>
        ${s.paragraphs.map(para => `<p style="line-height:1.8; color:var(--text-main); margin-bottom:16px;">${para}</p>`).join('')}
      </section>
    `).join('');

    const content = `
    <article class="container article-container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <div style="display:inline-block; background:rgba(37,99,235,0.08); color:var(--primary); font-size:0.85rem; font-weight:600; padding:4px 12px; border-radius:20px; margin-bottom:12px;">
          专题分类：${p.category}
        </div>
        <h1 class="article-title">${p.title}</h1>
        <div class="article-meta">
          <span>📅 更新时间：2026年11月</span>
          <span>✍️ 资深网络评测组</span>
          <span>⏱️ 深度阅读：约 8 分钟</span>
        </div>
      </div>

      <div class="lead-box" style="margin:24px 0 32px 0;">
        <p style="font-size:1.05rem; line-height:1.7; margin:0; color:var(--secondary); font-weight:500;">
          💡 <strong>核心导读：</strong>${p.lead}
        </p>
      </div>

      <div class="article-body">
        ${sectionsHtml}

        <div class="notice-box" style="margin-top:40px;">
          <h3 style="font-size:1.15rem; margin-top:0; color:var(--secondary);">💡 选购与配置建议</h3>
          <p style="margin-bottom:12px;">在挑选科学上网梯子服务时，建议结合自身预算与实际使用场景进行客观决策。不同服务商在晚高峰稳定性、流媒体解锁能力以及售后响应上存在明显分化。</p>
          <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:16px;">
            <a href="${rel}ranking/overall/index.html" class="btn btn-primary" style="padding:8px 18px; font-size:0.9rem;">查看2026综合排行榜</a>
            <a href="${rel}compare/index.html" class="btn btn-secondary" style="padding:8px 18px; font-size:0.9rem;">打开多品牌横向对比</a>
            <a href="${rel}guides/index.html" class="btn btn-secondary" style="padding:8px 18px; font-size:0.9rem;">全平台客户端教程</a>
          </div>
        </div>

        <section style="margin-top:48px; padding-top:24px; border-top:1px solid var(--border);">
          <h3 style="font-size:1.15rem; font-weight:700; color:var(--secondary); margin-bottom:16px;">📚 推荐相关阅读</h3>
          <ul style="line-height:2; padding-left:20px; color:var(--primary);">
            <li><a href="${rel}ranking/value/index.html">2026 高性价比机场推荐排行榜</a></li>
            <li><a href="${rel}ranking/stable/index.html">稳定性第一的高端 IPLC/IEPL 专线机场排行</a></li>
            <li><a href="${rel}guides/windows/index.html">Windows 电脑 Clash Verge Rev 保姆级配置教程</a></li>
            <li><a href="${rel}guides/android/index.html">Android 安卓手机 Clash Meta / v2rayNG 入门指南</a></li>
            <li><a href="${rel}guides/ios/index.html">iOS 平台小火箭 (Shadowrocket) 快速上手图解</a></li>
          </ul>
        </section>
      </div>
    </article>`;

    const html = renderPage({
      title: p.seoTitle,
      description: p.description,
      canonicalPath: `/blog/${p.slug}/`,
      depth,
      activeNav: "blog",
      breadcrumbs: crumbs,
      schemaJson: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": p.title,
        "description": p.description,
        "datePublished": "2026-11-01",
        "dateModified": "2026-11-27",
        "author": {
          "@type": "Organization",
          "name": "VPN Top 评测组"
        }
      },
      content
    });

    saveHtmlFile(`blog/${p.slug}/index.html`, html);
  });

  // 2. Generate Blog Hub Index (blog/index.html)
  {
    const depth = 1;
    const rel = '../';

    const crumbs = [
      { name: "博客文章", url: "" }
    ];

    // Group blogs by category
    const categories = [
      "选型与避坑",
      "底层网络与专线",
      "协议技术与演进",
      "故障排查与性能调优",
      "AI工具与办公解锁",
      "流媒体与跨境合租",
      "网络安全与隐私防范"
    ];

    const categoryDescriptions = {
      "选型与避坑": "新手入门必看防坑秘籍、套餐计费暗坑、备用节点容灾方案与合理预算规划。",
      "底层网络与专线": "IPLC/IEPL内网专线、BGP中转、骨干网络拓扑、CN2 GIA与物理隔离深度科普。",
      "协议技术与演进": "VLESS Reality、Hysteria 2、TUIC v5、Shadowsocks 2022等新一代协议横评。",
      "故障排查与性能调优": "解决晚高峰卡顿、DNS污染与泄漏、TUN虚拟网卡接管、油管4K缓冲优化。",
      "AI工具与办公解锁": "ChatGPT免封与防降智、Claude 3.5防封号、GitHub Copilot与Cursor开发加速。",
      "流媒体与跨境合租": "Netflix非自制剧全解锁、Disney+报错修复、YouTube Premium低价合租与TikTok出海。",
      "网络安全与隐私防范": "HTTPS端到端加密、流量指纹分析、WebRTC真实IP泄漏防范与高隐私链式代理。"
    };

    const content = `
    <div class="container" style="padding-top:40px; padding-bottom:60px;">
      <div style="text-align:center; max-width:860px; margin:0 auto 40px auto;">
        <span class="hero-badge" style="display:inline-block; margin-bottom:12px;">📚 知识文库 · 100篇深度专栏</span>
        <h1 style="font-size:2.2rem; font-weight:800; color:var(--secondary); margin-bottom:16px;">
          科学上网与机场梯子深度技术知识库
        </h1>
        <p style="font-size:1.05rem; color:var(--text-muted); line-height:1.7;">
          汇集100篇涵盖机场选型、内网专线架构、现代代理协议、晚高峰卡顿优化、AI工具解锁与网络隐私安全的硬核原创专栏。为你提供客观、详实、可落地的技术参考。
        </p>
      </div>

      <!-- Category Filter Jump Links -->
      <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin-bottom:48px;">
        ${categories.map(cat => `
          <a href="#cat-${encodeURIComponent(cat)}" style="background:var(--bg-card); border:1px solid var(--border); padding:8px 16px; border-radius:20px; font-size:0.9rem; font-weight:600; color:var(--text-main); text-decoration:none; transition:all 0.2s;" onmouseover="this.style.borderColor='var(--primary)'; this.style.color='var(--primary)';" onmouseout="this.style.borderColor='var(--border)'; this.style.color='var(--text-main)';">
            🏷️ ${cat} (${allBlogs.filter(b => b.category === cat).length})
          </a>
        `).join('')}
      </div>

      <!-- Categories Sections -->
      ${categories.map(cat => {
        const catBlogs = allBlogs.filter(b => b.category === cat);
        return `
        <section id="cat-${encodeURIComponent(cat)}" style="margin-bottom:56px; scroll-margin-top:90px;">
          <div style="display:flex; align-items:baseline; justify-content:space-between; margin-bottom:16px; border-bottom:2px solid var(--primary); padding-bottom:8px;">
            <h2 style="font-size:1.45rem; font-weight:800; color:var(--secondary); margin:0;">
              📁 ${cat}
              <span style="font-size:0.9rem; font-weight:500; color:var(--text-muted); margin-left:8px;">共 ${catBlogs.length} 篇文章</span>
            </h2>
          </div>
          <p style="font-size:0.92rem; color:var(--text-muted); margin-bottom:24px;">${categoryDescriptions[cat] || ''}</p>

          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(360px, 1fr)); gap:20px;">
            ${catBlogs.map(b => `
            <a href="${b.slug}/index.html" class="card" style="text-decoration:none; display:flex; flex-direction:column; padding:20px; border-radius:12px; border:1px solid var(--border); background:var(--bg-card); transition:transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='var(--shadow-md)';" onmouseout="this.style.transform='none'; this.style.boxShadow='none';">
              <div style="font-size:0.8rem; font-weight:600; color:var(--primary); margin-bottom:8px;">专题专栏 · 深度实测</div>
              <h3 style="font-size:1.05rem; font-weight:700; color:var(--secondary); margin-bottom:10px; line-height:1.45;">${b.title}</h3>
              <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6; margin-bottom:14px; flex-grow:1;">${b.lead.slice(0, 90)}...</p>
              <div style="font-size:0.85rem; font-weight:600; color:var(--primary); display:flex; align-items:center; gap:4px;">阅读深度全文 &rarr;</div>
            </a>
            `).join('')}
          </div>
        </section>
        `;
      }).join('')}

      <div class="notice-box" style="margin-top:40px;">
        <strong>准备挑选好用的专线机场？</strong>
        欢迎查阅我们的 <a href="../ranking/overall/index.html">2026 优质VPN机场综合实力排行榜</a>，或使用 <a href="../compare/index.html">多品牌横向比对工具</a>。需要客户端设置指导请访问 <a href="../guides/index.html">新手教程中心</a>。
      </div>
    </div>`;

    const html = renderPage({
      title: "科学上网知识库与技术博客 - 100篇机场选型、专线与协议深度长文 | VPN Top",
      description: "VPN Top 科学上网与机场梯子深度技术知识库。收录100篇涵盖机场选型、IPLC专线、VLESS Reality与Hysteria 2协议、晚高峰卡顿优化、AI工具解锁的硬核原创文章。",
      canonicalPath: "/blog/",
      depth: 1,
      activeNav: "blog",
      breadcrumbs: crumbs,
      schemaJson: null,
      content
    });

    saveHtmlFile('blog/index.html', html);
  }

  console.log(`[SUCCESS] Generated 100 blog posts + blog/index.html`);
}

module.exports = {
  generateBlogsFull
};
