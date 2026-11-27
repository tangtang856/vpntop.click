const { DOMAIN, renderPage, saveHtmlFile } = require('./template.js');
const { allBlogs } = require('./blogs-data.js');

function injectInternalLinks(para, rel, usedKeywords) {
  const linkRules = [
    { kw: '微风网络', label: '微风网络 Breezenet', url: `${rel}review/breezenet/index.html` },
    { kw: '暮光网络', label: '暮光网络', url: `${rel}review/muguang/index.html` },
    { kw: '飞猫云', label: '飞猫云', url: `${rel}review/feimaoyun/index.html` },
    { kw: '闪跃', label: '闪跃 FlashLeap', url: `${rel}review/flashleap/index.html` },
    { kw: '隐形人', label: '隐形人', url: `${rel}review/yinxingren/index.html` },
    { kw: '性价比机场', label: '性价比机场', url: `${rel}ranking/value/index.html` },
    { kw: '综合排行榜', label: '综合实力排行榜', url: `${rel}ranking/overall/index.html` },
    { kw: '横向对比', label: '横向对比工具', url: `${rel}compare/index.html` },
    { kw: 'Clash Verge', label: 'Clash Verge Rev', url: `${rel}guides/windows/index.html` },
    { kw: 'Shadowrocket', label: 'Shadowrocket (小火箭)', url: `${rel}guides/ios/index.html` },
    { kw: '小火箭', label: 'Shadowrocket (小火箭)', url: `${rel}guides/ios/index.html` },
    { kw: 'Sing-box', label: 'Sing-box 客户端', url: `${rel}guides/sing-box-windows/index.html` },
    { kw: 'v2rayNG', label: 'v2rayNG 安卓客户端', url: `${rel}guides/android/index.html` },
    { kw: 'IPLC专线', label: 'IPLC纯物理专线', url: `${rel}ranking/stable/index.html` },
    { kw: 'IEPL专线', label: 'IEPL内网专线', url: `${rel}glossary/iepl/index.html` },
    { kw: '机场推荐', label: '优质机场推荐', url: `${rel}index.html` }
  ];

  let res = para;
  for (const rule of linkRules) {
    if (!usedKeywords.has(rule.kw) && res.includes(rule.kw)) {
      usedKeywords.add(rule.kw);
      res = res.replace(rule.kw, `<a href="${rule.url}" class="inline-link">${rule.label}</a>`);
      break; // At most one link per paragraph
    }
  }
  return res;
}

function generateBlogsFull() {
  console.log(`[GENERATING] 100 Blog Posts and blog/index.html...`);

  // 1. Generate Each of the 100 Blog Posts with Prev/Next, In-content Links, and Recs
  allBlogs.forEach((p, idx) => {
    const depth = 2;
    const rel = '../../';

    const crumbs = [
      { name: "博客文章", url: "blog/index.html" },
      { name: p.title.split('：')[0], url: "" }
    ];

    // Prev / Next Navigation Calculation
    const prevPost = idx > 0 ? allBlogs[idx - 1] : null;
    const nextPost = idx < allBlogs.length - 1 ? allBlogs[idx + 1] : null;

    // Related Posts (Prioritize same category, then adjacent)
    const sameCatBlogs = allBlogs.filter(b => b.slug !== p.slug && b.category === p.category);
    const otherBlogs = allBlogs.filter(b => b.slug !== p.slug && b.category !== p.category);
    const relatedPosts = sameCatBlogs.slice(0, 4);
    if (relatedPosts.length < 4) {
      relatedPosts.push(...otherBlogs.slice(0, 4 - relatedPosts.length));
    }

    const usedKeywords = new Set();

    const sectionsHtml = p.sections.map(s => `
      <section style="margin-top:32px;">
        <h2 style="font-size:1.35rem; font-weight:700; color:var(--text-main); margin-bottom:14px; padding-bottom:8px; border-bottom:1px solid var(--border);">${s.heading}</h2>
        ${s.paragraphs.map(para => `<p style="line-height:1.8; color:var(--text-main); margin-bottom:16px;">${injectInternalLinks(para, rel, usedKeywords)}</p>`).join('')}
      </section>
    `).join('');

    const content = `
    <article class="container article-container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <a href="${rel}blog/index.html#cat-${encodeURIComponent(p.category)}" style="display:inline-block; background:rgba(37,99,235,0.08); color:var(--primary); font-size:0.85rem; font-weight:600; padding:4px 12px; border-radius:20px; margin-bottom:12px; text-decoration:none;">
          专题分类：${p.category} &rarr;
        </a>
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

        <!-- 推荐专线直达转化卡片 -->
        <div class="article-inline-recommend">
          <div class="inline-recommend-header">
            <h3 class="inline-recommend-title">
              <span>⚡ 2026 实测推荐：高速稳定专线机场精选</span>
            </h3>
            <a href="${rel}ranking/overall/index.html" style="font-size:0.85rem; color:var(--primary); font-weight:700; text-decoration:none;">
              查看完整 14 品牌排行 &rarr;
            </a>
          </div>
          <div class="inline-recommend-grid">
            <div class="inline-rec-item">
              <div class="inline-rec-brand">
                <span>微风网络 Breezenet</span>
                <span class="inline-rec-price">¥8 /月</span>
              </div>
              <span class="inline-rec-line">IEPL/IPLC 高速专线</span>
              <p class="inline-rec-desc">200GB起步流量，大流量视频追剧首选，优惠码 <code>weifeng90</code>。</p>
              <div class="inline-rec-actions">
                <a href="${rel}review/breezenet/index.html" class="btn btn-outline btn-sm" style="flex:1; text-align:center;">评测详情</a>
                <a href="https://edp01.breezenetaff.com/#/?code=h4GlIXwC" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="flex:1; text-align:center; font-weight:700;">直达官网</a>
              </div>
            </div>
            <div class="inline-rec-item">
              <div class="inline-rec-brand">
                <span>暮光网络</span>
                <span class="inline-rec-price">¥20 /月</span>
              </div>
              <span class="inline-rec-line">三网优化专线入口</span>
              <p class="inline-rec-desc">120GB起步流量，晚高峰低延迟，办公、文献与科研主力。</p>
              <div class="inline-rec-actions">
                <a href="${rel}review/muguang/index.html" class="btn btn-outline btn-sm" style="flex:1; text-align:center;">评测详情</a>
                <a href="https://varnexa.twilightaff.com/#/?code=8EtJCnBT" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="flex:1; text-align:center; font-weight:700;">直达官网</a>
              </div>
            </div>
            <div class="inline-rec-item">
              <div class="inline-rec-brand">
                <span>飞猫云</span>
                <span class="inline-rec-price">¥7 /月起</span>
              </div>
              <span class="inline-rec-line">IEPL/IPLC 双中转</span>
              <p class="inline-rec-desc">150GB起步流量，多线容灾互备，优惠码 <code>flycat888</code>。</p>
              <div class="inline-rec-actions">
                <a href="${rel}review/feimaoyun/index.html" class="btn btn-outline btn-sm" style="flex:1; text-align:center;">评测详情</a>
                <a href="https://flycat1.flycatvipaff.cc/#/?code=MlwqPqcx" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="flex:1; text-align:center; font-weight:700;">直达官网</a>
              </div>
            </div>
          </div>
        </div>

        <div class="notice-box" style="margin-top:36px;">
          <h3 style="font-size:1.15rem; margin-top:0; color:var(--secondary);">💡 选购与配置建议</h3>
          <p style="margin-bottom:12px;">在挑选科学上网梯子服务时，建议结合自身预算与实际使用场景进行客观决策。不同服务商在晚高峰稳定性、流媒体解锁能力以及售后响应上存在明显分化。</p>
          <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:16px;">
            <a href="${rel}ranking/overall/index.html" class="btn btn-primary" style="padding:8px 18px; font-size:0.9rem;">查看2026综合排行榜</a>
            <a href="${rel}compare/index.html" class="btn btn-secondary" style="padding:8px 18px; font-size:0.9rem;">打开多品牌横向对比</a>
            <a href="${rel}guides/index.html" class="btn btn-secondary" style="padding:8px 18px; font-size:0.9rem;">全平台客户端教程</a>
          </div>
        </div>

        <!-- 文章上一篇 / 下一篇导航组件 -->
        <nav class="post-pagination" aria-label="文章上下篇跳转">
          ${prevPost ? `
          <a href="${rel}blog/${prevPost.slug}/index.html" class="pagination-card prev">
            <span class="pagination-label">&larr; 上一篇专栏</span>
            <span class="pagination-title">${prevPost.title}</span>
          </a>
          ` : `
          <a href="${rel}blog/index.html" class="pagination-card prev">
            <span class="pagination-label">&larr; 返回博客文库</span>
            <span class="pagination-title">浏览全部 100 篇深度专栏</span>
          </a>
          `}
          ${nextPost ? `
          <a href="${rel}blog/${nextPost.slug}/index.html" class="pagination-card next">
            <span class="pagination-label">下一篇专栏 &rarr;</span>
            <span class="pagination-title">${nextPost.title}</span>
          </a>
          ` : `
          <a href="${rel}ranking/overall/index.html" class="pagination-card next">
            <span class="pagination-label">已读完全部 &rarr;</span>
            <span class="pagination-title">前往 2026 综合实力排行榜</span>
          </a>
          `}
        </nav>

        <!-- 推荐相关阅读 -->
        <section class="related-posts">
          <h3 style="font-size:1.18rem; font-weight:700; color:var(--secondary); margin-bottom:16px;">📚 推荐同类深度阅读</h3>
          <div class="related-grid">
            ${relatedPosts.map(rp => `
            <a href="${rel}blog/${rp.slug}/index.html" class="related-card">
              <div style="font-size:0.75rem; color:var(--primary); font-weight:700; margin-bottom:4px;">${rp.category}</div>
              <h4>${rp.title}</h4>
              <span>阅读全文 &rarr;</span>
            </a>
            `).join('')}
          </div>
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
