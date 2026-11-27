const { airports } = require('../data/airports.js');
const { DOMAIN, renderPage, saveHtmlFile } = require('./template.js');

function generateRecommendations() {
  const depth = 2;
  const rel = '../../';

  const topics = [
    {
      slug: "budget",
      title: "低预算平价机场推荐：平民月付套餐与备用梯子盘点",
      seoTitle: "便宜低预算机场梯子推荐 - 月付几元学生备用高性价比节点 | VPN Top",
      description: "2026年低预算便宜机场梯子推荐。精选月付15-20元优质平价IEPL专线节点，适合学生党、轻度上网和备用防失联，拒绝跑路劣质小机场。",
      lead: "预算有限并不意味着必须忍受直连卡顿与频繁跑路。通过科学挑选月付 15-20 元的平民级 IEPL 专线，依然能够享受高可用翻墙体验。",
      bestPicks: ["flyingbird", "kuromi"]
    },
    {
      slug: "premium",
      title: "高端专线机场推荐：追求极致低延迟与零丢包的企业级首选",
      seoTitle: "高端专线机场推荐 - 全球IPLC内网专线与企业级稳定翻墙梯子 | VPN Top",
      description: "2026高端专线机场推荐。聚焦华为云BGP多线与顶级IPLC物理内网专线梯子，极低延迟与零丢包率，满足外贸办公、远程研发与金融交易高SLA需求。",
      lead: "企业办公、跨境商贸及高阶跨国协作者对于网络连通率有严苛要求。高端专线依托 BGP 多线入口与不过墙物理光纤，彻底杜绝敏感期断流与丢包。",
      bestPicks: ["wgetcloud", "duang", "tag"]
    },
    {
      slug: "beginner",
      title: "新手入门梯子推荐：零基础挑选指南与客户端设置",
      seoTitle: "新手翻墙梯子与VPN入门推荐 - 零基础客户端配置与避坑指南 | VPN Top",
      description: "新手翻墙梯子与机场入门推荐。零基础挑选指南，推荐支持一键导入主流客户端、拥有详细图文文档与友好客服的平稳梯子，轻松避坑。",
      lead: "新手翻墙往往受困于复杂的客户端分流规则与看不懂的协议名词。本专题严选开箱即用、一键导入且文档详尽的友好梯子，新手无需学习门槛。",
      bestPicks: ["kuromi", "flyingbird", "wgetcloud"]
    },
    {
      slug: "stable",
      title: "稳定高速机场节点推荐：原生IP与专线节点选购指南",
      seoTitle: "高质量稳定机场节点推荐 - IPLC/IEPL专线高速节点全解析 | VPN Top",
      description: "2026年稳定高速机场节点推荐。针对晚8-11点晚高峰网络骨干拥堵优化，严选三网低延迟专线与高可用节点，杜绝看视频转圈与丢包断流。",
      lead: "判定一个机场节点是否优质，关键看晚高峰（20:00-23:00）的稳定表现。具备双活机房冗余与动态智能路由调度的专线节点能够全天候保持流畅。",
      bestPicks: ["wgetcloud", "duang", "tag"]
    },
    {
      slug: "ai",
      title: "AI 与 ChatGPT 原生节点推荐：高纯净度IP与不降智梯子",
      seoTitle: "ChatGPT与Claude专用AI原生机场节点推荐 - 解锁不降智梯子盘点 | VPN Top",
      description: "ChatGPT与Claude 3.7专用AI原生机场节点推荐。精选具备原生家庭住宅IP、极低风控欺诈值的纯净梯子，避免被OpenAI封号与降智卡顿。",
      lead: "OpenAI 与 Anthropic 对访问 IP 实行严苛的风控策略。IDC 机房万人共用 IP 极易引发 Access Denied 或模型降智。本专题盘点经过实测的高纯净度原生节点梯子。",
      bestPicks: ["wgetcloud", "tag", "kuromi"]
    },
    {
      slug: "streaming",
      title: "4K流媒体解锁机场推荐：Netflix/Disney+/YouTube 原生家宽梯子",
      seoTitle: "Netflix与Disney+4K流媒体解锁机场推荐 - 原生节点梯子大盘点 | VPN Top",
      description: "2026年4K流媒体解锁机场推荐。精选原生支持Netflix各区非自制剧、Disney+、HBO Max与YouTube Premium的高速大带宽梯子，画质满血秒开。",
      lead: "追剧刷片最忌讳两点：一是由于版权限制提示代理错误，二是晚高峰缓冲卡顿。本专题精选大带宽、低倍率且全天候自动轮换流媒体解锁 DNS 的优质机场。",
      bestPicks: ["flyingbird", "kuromi", "tag", "wgetcloud"]
    }
  ];

  topics.forEach(t => {
    const crumbs = [
      { name: "推荐专题", url: "recommend/stable/index.html" },
      { name: t.title, url: "" }
    ];

    const pickObjects = t.bestPicks.map(id => airports.find(a => a.id === id)).filter(Boolean);

    const content = `
    <div class="container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <h1 class="article-title">${t.title}</h1>
        <div class="article-meta">
          <span>📅 发布时间：2026年11月</span>
          <span>🎯 专题类别：${t.title.split('：')[0]}</span>
          <span>⚡ 实测入围：${pickObjects.length} 款优胜品牌</span>
        </div>
      </div>

      <div class="quick-answer-card">
        <div class="quick-answer-header">
          <span>📌 专题导读与选型建议</span>
        </div>
        <p style="color:var(--text-muted); font-size:1rem; line-height:1.7;">
          ${t.lead}
        </p>
      </div>

      <h2 style="font-size:1.6rem; margin:36px 0 20px;">本专题严选推荐梯子名单</h2>
      <div class="grid-cards">
        ${pickObjects.map(a => `
        <article class="card">
          <div class="card-top">
            <div>
              <h3 class="card-title">${a.name}</h3>
              <div style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">
                ${a.protocols.join(' · ')}
              </div>
            </div>
            <span class="badge ${a.testStatus === 'tested' ? 'badge-verified' : 'badge-official'}">
              ${a.testStatus === 'tested' ? '✓ 实测达标' : '★ 官方在售'}
            </span>
          </div>
          <div class="card-price">
            ¥${a.startingPrice} <small>/月起</small>
          </div>
          <p class="card-desc">${a.description}</p>
          <div class="feature-pill-list">
            <span class="feature-pill">📍 ${a.regions.slice(0, 4).join('/')}</span>
            <span class="feature-pill">📱 ${a.deviceLimit}</span>
            <span class="feature-pill">🤖 ${a.aiSupport.slice(0, 2).join('+')}</span>
          </div>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">
            <strong>优点：</strong>${a.advantages[0]}
          </div>
          <div style="font-size:0.85rem; color:var(--danger); margin-bottom:16px;">
            <strong>注意：</strong>${a.disadvantages[0]}
          </div>
          <div class="card-footer">
            <a href="${rel}review/${a.id}/index.html" class="btn btn-primary btn-sm" style="flex:1;">查看深度评测报告</a>
            <a href="${rel}compare/index.html" class="btn btn-outline btn-sm">横向对比</a>
          </div>
        </article>
        `).join('')}
      </div>

      <div class="article-content" style="margin-top:44px;">
        <h2>该场景下的核心选型原则与避坑知识</h2>
        <p>
          在选择<strong>${t.title.split('：')[0]}</strong>时，切忌盲目相信社交媒体上不负责任的营销推广。很多所谓的测速截图是在清晨或凌晨网络空闲时跑出来的千兆数据，与普通人晚高峰使用的真实情况完全脱节。
        </p>
        <p>
          建议用户遵循“<strong>小额月付先测、三网针对性试用、结合常用客户端分流</strong>”的三步策略。详细配置过程可参考我们的<a href="${rel}guides/windows/index.html">新手客户端配置教程中心</a>。
        </p>
        
        <div class="notice-box">
          <strong>数据核实与来源披露：</strong>
          本专题所有数据均来自各服务商官方控制台公示资费与 VPN Top 评测团队持续 72 小时的自动化网络连通性监测。更新日期：${pickObjects[0].lastVerified}。
        </div>

        <div style="margin-top:32px; display:flex; gap:16px; flex-wrap:wrap;">
          <a href="${rel}ranking/overall/index.html" class="btn btn-outline">返回 2026 综合排行榜 &rarr;</a>
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
}

module.exports = {
  generateRecommendations
};
