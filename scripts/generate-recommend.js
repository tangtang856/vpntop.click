const fs = require('fs');
const path = require('path');
const { airports } = require('../data/airports.js');
const { DOMAIN, renderPage, saveHtmlFile } = require('./template.js');

function generateRecommendations() {
  const topics = [
    {
      slug: "stable",
      navName: "晚高峰抗断流",
      icon: "⚡",
      badge: "晚高峰抗断流专项评测",
      title: "2026 晚高峰抗断流专线节点精选：IPLC物理光缆与高可用梯子选型指南",
      seoTitle: "晚高峰抗断流梯子推荐 - 稳定高速IPLC/IEPL物理专线节点实测 | VPN Top",
      description: "2026年晚高峰抗断流机场节点推荐。针对晚上8点至11点骨干网晚高峰拥堵优化，严选三网低延迟专线与双机房高可用节点，彻底杜绝视频转圈与丢包断流。",
      lead: "判定一个机场节点是否优质，关键看晚高峰（20:00-23:00）的真实表现。本专题针对晚高峰国际出口拥堵场景，精选具备双活机房容灾、真实物理 IPLC/IEPL 专线与骨干 BGP 入口的高可用梯子，彻底告别频繁断流与视频转圈。",
      targetUsers: "重度外贸办公、远程代码推送、晚高峰 4K 追剧与对掉线零容忍的高要求用户",
      coreCriteria: "BGP 多线智能入口 + 纯物理内网专线 + 晚高峰丢包率 < 0.5%",
      bestPicks: ["yinxingren", "lingmao", "flashleap", "muguang"]
    },
    {
      slug: "budget",
      navName: "平价高性价比",
      icon: "💰",
      badge: "平价月付高性价比专项",
      title: "2026 平价穷鬼机场节点精选：月付几元便宜高性价比梯子与备用方案盘点",
      seoTitle: "便宜低预算平价机场梯子推荐 - 月付几元备用高性价比节点 | VPN Top",
      description: "2026年低预算平价机场梯子精选。推荐月付4.9-8元优质专线与中转节点，适合学生党、轻度查资料和备用防失联，拒绝跑路劣质小机场。",
      lead: "预算有限并不意味着必须忍受直连卡顿与频繁跑路。通过挑选月付 4.9-8 元的高性价比专线（如微风网络 Breezenet、飞V、飞猫云），依然能够享受高可用翻墙体验。",
      targetUsers: "学生群体、轻度学术查资料、个人月付备用防失联用户",
      coreCriteria: "月付单价 ≤ 10元 + 起步流量 ≥ 100GB + 支持单月支付周期",
      bestPicks: ["breezenet", "feiv", "feimaoyun", "firefly"]
    },
    {
      slug: "premium",
      navName: "高端企业专线",
      icon: "🚀",
      badge: "企业级零丢包物理专线",
      title: "2026 企业级高端跨境专线精选：全球纯IPLC内网与超低延迟外贸梯子指南",
      seoTitle: "企业级高端专线机场推荐 - 全球纯IPLC内网与超低延迟外贸梯子 | VPN Top",
      description: "2026企业级高端专线机场推荐。聚焦纯IPLC/IEPL物理内网专线梯子，极低延迟与零丢包率，满足外贸办公、远程研发与金融交易高SLA需求。",
      lead: "企业办公、跨境商贸及高阶跨国协作者对于网络连通率有严苛要求。高端专线依托物理内网光纤，彻底杜绝敏感期断流与丢包。",
      targetUsers: "跨国跨境电商团队、海外金融交易员、远程开发协作工程师",
      coreCriteria: "端到端专线点对点直达 + 99.9% 在线率 SLA + 专属客服响应通道",
      bestPicks: ["yinxingren", "lingmao", "flashleap", "wuyou"]
    },
    {
      slug: "ai",
      navName: "AI / ChatGPT专用",
      icon: "🤖",
      badge: "AI大模型原生节点",
      title: "2026 ChatGPT & Claude 专用原生节点精选：高纯净度住宅IP与防封防降智梯子",
      seoTitle: "ChatGPT与Claude专用AI原生机场节点推荐 - 解锁不降智梯子盘点 | VPN Top",
      description: "ChatGPT与Claude 3.7专用AI原生机场节点推荐。精选具备原生家庭住宅IP、极低风控欺诈值的纯净梯子，避免被OpenAI封号与降智卡顿。",
      lead: "OpenAI 与 Anthropic 对访问 IP 实行严苛的风控策略。IDC 机房万人共用 IP 极易引发 Access Denied 或模型降智。本专题盘点经过实测的高纯净度原生节点梯子。",
      targetUsers: "AI 创作者、Cursor 代码助手使用者、ChatGPT Plus / Claude Pro 订阅会员",
      coreCriteria: "原生家庭住宅/低欺诈值 ISP 节点 + 双向 TLS 混淆 + 自动轮换解锁",
      bestPicks: ["lingmao", "breezenet", "yinxingren", "flashleap"]
    },
    {
      slug: "streaming",
      navName: "4K流媒体解锁",
      icon: "🎬",
      badge: "4K/8K超高清流媒体解锁",
      title: "2026 4K/8K 超高清流媒体解锁精选：Netflix/Disney+/YouTube 原生家宽梯子大盘点",
      seoTitle: "Netflix与Disney+4K流媒体解锁机场推荐 - 原生节点梯子大盘点 | VPN Top",
      description: "2026年4K流媒体解锁机场推荐。精选原生支持Netflix各区非自制剧、Disney+、HBO Max与YouTube Premium的高速大带宽梯子，画质满血秒开。",
      lead: "追剧刷片最忌讳两点：一是由于版权限制提示代理错误，二是晚高峰缓冲卡顿。本专题精选大带宽、低单价且全天候自动轮换流媒体解锁 DNS 的优质机场。",
      targetUsers: "Netflix / Disney+ / YouTube / TikTok 重度流媒体追剧影音发烧友",
      coreCriteria: "非自制剧完整解锁 + 单节点带宽峰值 > 300Mbps + 动态 DNS 智能解封",
      bestPicks: ["breezenet", "feimaoyun", "yinxingren", "laddercloud"]
    },
    {
      slug: "beginner",
      navName: "新手零基础入门",
      icon: "🔰",
      badge: "新手小白零基础入门",
      title: "2026 新手翻墙零基础避坑选型指南：一键配置客户端与高可用入门梯子选型",
      seoTitle: "新手翻墙梯子入门推荐 - 零基础客户端配置与避坑指南 | VPN Top",
      description: "新手翻墙梯子与机场入门推荐。零基础挑选指南，推荐支持一键导入主流客户端、拥有详细图文文档与友好客服的平稳梯子，轻松避坑。",
      lead: "新手翻墙往往受困于复杂的客户端分流规则与看不懂的协议名词。本专题严选开箱即用、一键导入且文档详尽的友好梯子，新手无需学习门槛。",
      targetUsers: "刚接触科学上网、不熟悉订阅配置与规则分流的初学者",
      coreCriteria: "支持一键订阅导入 + 拥有 Windows/Mac/iOS/Android 全套图文视频文档 + 工单答复迅速",
      bestPicks: ["breezenet", "feimaoyun", "wavenet", "quanqiuyun"]
    }
  ];

  // Helper to render topic navigation tabs
  function renderTopicTabs(activeSlug, rel) {
    return `
    <div class="recommend-topic-tabs-container">
      <div class="recommend-topic-tabs-header">
        <span class="tabs-title">🎯 推荐专题分类导航：</span>
        <span class="tabs-subtitle">点击切换不同使用场景专项实测榜单</span>
      </div>
      <div class="recommend-topic-tabs">
        <a href="${rel}recommend/index.html" class="topic-tab-item ${!activeSlug ? 'active' : ''}">
          <span class="tab-icon">📋</span>
          <span class="tab-text">专题总览</span>
        </a>
        ${topics.map(t => `
        <a href="${rel}recommend/${t.slug}/index.html" class="topic-tab-item ${activeSlug === t.slug ? 'active' : ''}">
          <span class="tab-icon">${t.icon}</span>
          <span class="tab-text">${t.navName}</span>
        </a>
        `).join('')}
      </div>
    </div>`;
  }

  // 1. Generate the 6 Deep-Dive Recommendation Topic Pages
  topics.forEach(t => {
    const rel = '../../';
    const crumbs = [
      { name: "机场推荐", url: "recommend/index.html" },
      { name: `${t.navName}专题`, url: "" }
    ];

    const pickObjects = t.bestPicks.map(id => airports.find(a => a.id === id)).filter(Boolean);

    const content = `
    <div class="container" style="padding-top:24px; padding-bottom:60px;">
      ${renderTopicTabs(t.slug, rel)}

      <div class="recommend-topic-banner">
        <div class="topic-header-top">
          <span class="topic-badge">${t.badge}</span>
          <span class="topic-verified-tag">✓ VPN Top 独立实测认证</span>
        </div>
        <h1 class="recommend-topic-title">${t.title}</h1>
        <div class="article-meta" style="margin-top:12px; margin-bottom:0;">
          <span>📅 核验周期：2026年11月实时</span>
          <span>🎯 场景类别：${t.navName}</span>
          <span>⚡ 实测达标入围：${pickObjects.length} 款优质品牌</span>
        </div>
      </div>

      <div class="quick-answer-card" style="margin-top:24px;">
        <div class="quick-answer-header">
          <span>📌 专题导读与选型建议</span>
        </div>
        <p style="color:var(--text-muted); font-size:1rem; line-height:1.7; margin-bottom:12px;">
          ${t.lead}
        </p>
        <div class="topic-criteria-box">
          <div class="criteria-row">
            <strong>🎯 适合目标人群：</strong>
            <span>${t.targetUsers}</span>
          </div>
          <div class="criteria-row" style="margin-top:6px;">
            <strong>🔍 本专题核心筛选标准：</strong>
            <span style="color:var(--primary); font-weight:600;">${t.coreCriteria}</span>
          </div>
        </div>
      </div>

      <h2 style="font-size:1.6rem; margin:36px 0 20px;">本专题严选入围梯子实测名单</h2>
      <div class="grid-cards">
        ${pickObjects.map((a, idx) => `
        <article class="card ${idx === 0 ? 'card-featured' : ''}">
          <div class="card-top">
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="rank-badge rank-${airports.indexOf(a) + 1}">TOP ${airports.indexOf(a) + 1}</span>
                <h3 class="card-title" style="margin-bottom:0;">${a.name}</h3>
              </div>
              <div style="font-size:0.82rem; color:var(--text-muted); margin-top:4px;">
                ${a.protocols.join(' · ')}
              </div>
            </div>
            <div style="text-align:right;">
              <span class="badge badge-verified">✓ 实测达标</span>
              ${a.coupon ? `<div style="font-size:0.75rem; color:var(--warning); font-weight:700; margin-top:3px;">券: ${a.coupon}</div>` : ''}
            </div>
          </div>
          <div class="card-price">
            ¥${a.startingPrice} <small>/月起 (${a.startingPlan})</small>
          </div>
          <p class="card-desc">${a.description}</p>
          <div class="feature-pill-list">
            <span class="feature-pill">📍 ${a.regions.slice(0, 4).join('/')}</span>
            <span class="feature-pill">📱 ${a.deviceLimit}</span>
            <span class="feature-pill">🤖 ${a.aiSupport.slice(0, 2).join('+')}</span>
            <span class="feature-pill">⚡ ${a.lineType}</span>
          </div>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:8px;">
            <strong>核心亮点：</strong>${a.advantages[0]}
          </div>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">
            <strong>测速表现：</strong>${a.speed} (延迟约 ${a.latency})
          </div>
          <div style="font-size:0.85rem; color:var(--danger); margin-bottom:16px;">
            <strong>选购提示：</strong>${a.disadvantages[0]}
          </div>
          <div class="card-footer" style="display:flex; gap:8px;">
            <a href="${rel}review/${a.id}/index.html" class="btn btn-outline btn-sm" style="flex:1;">深度评测报告</a>
            <a href="${a.affiliateUrl}" target="_blank" rel="noopener nofollow" class="btn btn-primary btn-sm">直达官网 &rarr;</a>
          </div>
        </article>
        `).join('')}
      </div>

      <div class="article-content" style="margin-top:48px;">
        <h2>${t.navName}场景下的核心选型原则与避坑知识</h2>
        <p>
          在选择<strong>${t.navName}</strong>节点时，切忌盲目相信社交媒体上不负责任的营销推广。很多所谓的测速截图是在清晨或凌晨网络空闲时跑出来的千兆数据，与普通人晚高峰使用的真实情况完全脱节。
        </p>
        <p>
          建议用户遵循“<strong>小额月付先测、三网针对性试用、结合常用客户端分流</strong>”的三步策略。详细配置过程可参考我们的<a href="${rel}guides/windows/index.html">新手客户端配置教程中心</a>与各平台的配置指南。
        </p>
        
        <div class="notice-box">
          <strong>数据核实与来源披露：</strong>
          本专题所有数据均来自各服务商官方控制台公示资费与 VPN Top 评测团队持续的自动化网络连通性监测。入围品牌必须在对应指标上连续 14 天达标方可展示。
        </div>

        <div style="margin-top:36px; padding:24px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
          <h3 style="font-size:1.15rem; margin-bottom:14px;">探索更多分类推荐专题</h3>
          <div style="display:flex; flex-wrap:wrap; gap:10px;">
            ${topics.filter(o => o.slug !== t.slug).map(o => `
            <a href="${rel}recommend/${o.slug}/index.html" class="btn btn-outline btn-sm" style="background:#fff;">
              ${o.icon} ${o.navName}专题 &rarr;
            </a>
            `).join('')}
          </div>
        </div>

        <div style="margin-top:32px; display:flex; gap:16px; flex-wrap:wrap;">
          <a href="${rel}recommend/index.html" class="btn btn-primary">返回 机场推荐总览中心 &rarr;</a>
          <a href="${rel}ranking/overall/index.html" class="btn btn-outline">查看 2026 综合排行榜 &rarr;</a>
          <a href="${rel}compare/index.html" class="btn btn-outline">打开横向对比工具 &rarr;</a>
        </div>
      </div>
    </div>`;

    const html = renderPage({
      title: t.seoTitle,
      description: t.description,
      canonicalPath: `/recommend/${t.slug}/`,
      depth: 2,
      activeNav: "recommend",
      breadcrumbs: crumbs,
      schemaJson: null,
      content
    });

    saveHtmlFile(`recommend/${t.slug}/index.html`, html);
  });

  // 2. Generate the Main Recommendation Hub Index: recommend/index.html
  const rel = '../';
  const crumbs = [
    { name: "机场推荐", url: "" }
  ];

  const hubContent = `
  <div class="container" style="padding-top:24px; padding-bottom:60px;">
    ${renderTopicTabs('', rel)}

    <div class="recommend-hub-hero">
      <div class="hub-hero-badge">🎯 2026 机场梯子场景化推荐选型中心</div>
      <h1 class="recommend-hub-title">按需选型：拒绝盲目跟风，找到最适合你的科学上网方案</h1>
      <p class="recommend-hub-desc">
        不同用户对翻墙梯子的核心诉求截然不同：有人追求极致晚高峰抗断流，有人需要几元月付平价省钱，有人专注 ChatGPT 与 AI 生产力，有人专注 Netflix 4K 追剧。VPN Top 团队按 6 大真实使用场景深度测评，为你精准匹配最佳服务商。
      </p>
    </div>

    <div class="recommend-matrix-grid">
      ${topics.map(t => {
        const topPicks = t.bestPicks.slice(0, 3).map(id => airports.find(a => a.id === id)).filter(Boolean);
        return `
        <div class="matrix-card">
          <div class="matrix-card-header">
            <div class="matrix-card-icon">${t.icon}</div>
            <div>
              <span class="matrix-card-badge">${t.badge}</span>
              <h2 class="matrix-card-title">${t.navName}</h2>
            </div>
          </div>
          <p class="matrix-card-desc">${t.lead}</p>
          <div class="matrix-card-specs">
            <div class="spec-line">
              <span class="spec-label">🎯 目标人群：</span>
              <span class="spec-val">${t.targetUsers}</span>
            </div>
            <div class="spec-line">
              <span class="spec-label">🔍 考核核心：</span>
              <span class="spec-val" style="color:var(--primary); font-weight:600;">${t.coreCriteria}</span>
            </div>
          </div>
          <div class="matrix-card-picks">
            <div class="picks-title">精选达标品牌：</div>
            <div class="picks-tags">
              ${topPicks.map(p => `
              <span class="pick-tag">
                ${p.name} <small>(¥${p.startingPrice}/月)</small>
              </span>
              `).join('')}
            </div>
          </div>
          <div class="matrix-card-action">
            <a href="${rel}recommend/${t.slug}/index.html" class="btn btn-primary" style="width:100%; text-align:center;">
              进入${t.navName}专项榜单 &rarr;
            </a>
          </div>
        </div>
        `;
      }).join('')}
    </div>

    <div class="article-content" style="margin-top:56px;">
      <h2>如何根据自身使用场景科学选择机场？</h2>
      <p>
        选择机场梯子最常见的误区是“看别人买什么就买什么”。每个人的本地网络运营商（电信、联通、移动、广电）、所在省份、主力使用设备、以及主要用途完全不同：
      </p>
      <ul>
        <li><strong>电信与联通用户：</strong>通常拥有较好的国际出口带宽，选择优质三网优化中转或普通专线即可获得极佳体验。</li>
        <li><strong>移动与广电宽带用户：</strong>晚高峰国际出口拥堵最严重，强烈建议直接选择具备 <strong>BGP 多线智能入口</strong>与 <strong>IPLC 物理内网专线</strong>的高可用品牌（参考【晚高峰抗断流】或【高端企业专线】专题）。</li>
        <li><strong>AI 研发与跨国创作者：</strong>OpenAI 与 Claude 的封控极其严苛，机房 IP 容易触发验证码或降智，必须挑选具备<strong>原生住宅 IP / 纯净 ISP IP</strong> 的专门节点（参考【AI / ChatGPT专用】专题）。</li>
        <li><strong>影音追剧发烧友：</strong>流媒体平台会定期封禁机房段 IP，需要服务商具备<strong>自动轮换解锁 DNS</strong> 与大带宽冗余（参考【4K流媒体解锁】专题）。</li>
      </ul>

      <div class="notice-box" style="margin-top:28px;">
        <strong>选购安全建议：</strong>
        无论选择任何品牌，初次使用均强烈建议<strong>按月付费</strong>试用，切勿因大额年付折扣而一次性购买多年套餐。
      </div>

      <div style="margin-top:36px; display:flex; gap:16px; flex-wrap:wrap;">
        <a href="${rel}ranking/overall/index.html" class="btn btn-primary">查看 2026 综合排行榜 &rarr;</a>
        <a href="${rel}compare/index.html" class="btn btn-outline">打开 14 款机场横向对比工具 &rarr;</a>
        <a href="${rel}guides/index.html" class="btn btn-outline">全平台客户端配置教程中心 &rarr;</a>
      </div>
    </div>
  </div>`;

  const hubHtml = renderPage({
    title: "2026 机场推荐与选型中心 - 按预算/晚高峰/AI/4K场景精选最佳梯子 | VPN Top",
    description: "2026年机场推荐与科学上网梯子选型中心。拒绝盲目跟风，针对晚高峰抗断流、低预算平价、企业级专线、AI ChatGPT、4K流媒体与新手入门6大真实场景深度实测推荐。",
    canonicalPath: "/recommend/",
    depth: 1,
    activeNav: "recommend",
    breadcrumbs: crumbs,
    schemaJson: null,
    content: hubContent
  });

  saveHtmlFile("recommend/index.html", hubHtml);
  console.log('[GENERATED] recommend/index.html (Recommendation Hub Center)');
}

module.exports = {
  generateRecommendations
};
