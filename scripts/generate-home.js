const { airports } = require('../data/airports.js');
const { DOMAIN, renderPage, saveHtmlFile } = require('./template.js');

// 1. GENERATE HOMEPAGE (index.html)
function generateHomepage() {
  const depth = 0;
  const rel = './';

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://vpntop.click/#website",
        "url": "https://vpntop.click/",
        "name": "VPN Top - 中文机场评测与梯子推荐网",
        "description": "专业中文机场推荐与翻墙梯子深度测评门户，涵盖性价比机场、IPLC/IEPL高速节点、ChatGPT与4K流媒体解锁实测指南。",
        "publisher": {
          "@type": "Organization",
          "name": "VPN Top 编辑部",
          "url": "https://vpntop.click/"
        }
      },
      {
        "@type": "ItemList",
        "name": "2026 精选高性价比机场推荐列表",
        "itemListElement": airports.map((a, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": a.name,
          "url": `https://vpntop.click/review/${a.id}/`
        }))
      }
    ]
  };

  const content = `
  <!-- Section 2: Hero -->
  <section class="hero-section">
    <div class="container">
      <span class="hero-badge">2026 权威实测 · Bing 专属优化导航</span>
      <h1 class="hero-title">2026 高性价比机场推荐与 VPN 梯子评测导航</h1>
      <p class="hero-subtitle">
        专注于真实晚高峰表现的<strong>机场推荐</strong>与<strong>翻墙梯子测评</strong>。汇聚精选<strong>性价比机场</strong>、低延迟 IPLC/IEPL <strong>机场节点</strong>与高速 <strong>vpn节点</strong>，全方位拒绝虚假跑分，助你轻松避开跑路风险。
      </p>
      <div class="hero-actions">
        <a href="${rel}ranking/overall/index.html" class="btn btn-primary">查看 2026 综合排行榜 &rarr;</a>
        <a href="${rel}compare/index.html" class="btn btn-outline">打开机场横向对比工具</a>
        <a href="${rel}recommend/budget/index.html" class="btn btn-outline">低预算学生党专题</a>
      </div>
    </div>
  </section>

  <div class="container">
    <!-- Section 3: 快速答案 (Quick Answers) -->
    <div class="quick-answer-card">
      <div class="quick-answer-header">
        <span style="font-size:1.4rem;">💡</span>
        <span>新手快速决策指南：30秒看懂如何挑选适合自己的机场梯子</span>
      </div>
      <p style="color:var(--text-muted); font-size:0.95rem;">
        翻墙工具通常分为“传统商业 VPN”与“Shadowsocks/V2Ray/Clash 专线机场”。对于中国大陆网络环境，具备内网专线（IPLC/IEPL）的机场在抗封锁、低延迟和晚高峰稳定性上显著优于普通直连节点。
      </p>
      <div class="quick-answer-list">
        <div class="quick-answer-item">
          <strong>1. 新手应该如何选择？</strong>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">
            优先选择月付 15-25 元起、支持主流客户端一键导入的成熟专线梯子（如 Kuromi 或 FlyingBird），坚决避免一次性年付不知名小机场。
          </p>
        </div>
        <div class="quick-answer-item">
          <strong>2. 哪些核心指标最值得关注？</strong>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">
            重点考察：晚 8:00-11:00 高峰丢包率、骨干专线资质、原生落地 IP 纯净度（能否顺畅使用 ChatGPT 与 Claude）、退款政策与工单响应速度。
          </p>
        </div>
        <div class="quick-answer-item">
          <strong>3. 如何判断套餐单价是否划算？</strong>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">
            计算公式：每 GB 单价 = 月费 ÷ 实际可用流量。目前优质 IEPL 专线的合理均价为 0.10~0.25 元/GB，超出 0.50 元/GB 属于轻奢或冷门定位。
          </p>
        </div>
        <div class="quick-answer-item">
          <strong>4. 购买前应检查什么？</strong>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">
            查阅服务商是否支持你常用的客户端（Windows、Android、Mac、iOS），节点地区是否满足流媒体或外贸业务需求，以及是否有限制设备数。
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Section 4: 精选推荐卡片 (Featured Airports) -->
  <section class="section-block">
    <div class="container">
      <div class="section-head section-head-flex">
        <div>
          <h2 class="section-title">2026 精选优质机场推荐</h2>
          <p class="section-desc">基于全国三网持续连通性监控与真实流媒体解锁嗅探，严选 5 款梯子品牌</p>
        </div>
        <a href="${rel}ranking/value/index.html" class="btn btn-outline btn-sm">按性价比排序 &rarr;</a>
      </div>

      <div class="grid-cards">
        ${airports.map(a => `
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
            <span class="feature-pill">🤖 ${a.aiSupport.slice(0, 2).join('+')}原生解锁</span>
          </div>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">
            <strong>适合人群：</strong>${a.suitableFor[0]}
          </div>
          <div class="card-footer">
            <a href="${rel}review/${a.id}/index.html" class="btn btn-outline btn-sm" style="flex:1;">详细评测报告</a>
            <a href="${rel}compare/index.html" class="btn btn-outline btn-sm">加入对比</a>
          </div>
        </article>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Section 5: 综合排行榜简表 (Ranking Summary) -->
  <section class="section-block">
    <div class="container">
      <div class="section-head section-head-flex">
        <div>
          <h2 class="section-title">机场综合实力排行榜（2026最新）</h2>
          <p class="section-desc">综合网络延迟、晚高峰抗压性、每GB性价比与客服响应多维度量化评估</p>
        </div>
        <a href="${rel}ranking/overall/index.html" class="btn btn-primary btn-sm">查看完整排行榜 &rarr;</a>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:70px;">排名</th>
              <th>品牌名称</th>
              <th>起步价格</th>
              <th>入门流量</th>
              <th>骨干传输线路</th>
              <th>适合人群</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="rank-badge rank-1">1</span></td>
              <td><strong>WgetCloud (恶魔之眼)</strong></td>
              <td>¥49 /月</td>
              <td>120GB</td>
              <td>华为云顶级BGP Bidir专线</td>
              <td>外贸办公、ChatGPT重度用户、企业高阶需求</td>
              <td><a href="${rel}review/wgetcloud/index.html" class="btn btn-outline btn-sm">评测详情</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-2">2</span></td>
              <td><strong>Kuromi (黑猫机场)</strong></td>
              <td>¥20 /月</td>
              <td>100GB</td>
              <td>全IEPL内网专线</td>
              <td>学生党、轻奢性价比、日常多媒体娱乐</td>
              <td><a href="${rel}review/kuromi/index.html" class="btn btn-outline btn-sm">评测详情</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-3">3</span></td>
              <td><strong>FlyingBird (飞鸟机场)</strong></td>
              <td>¥15 /月</td>
              <td>100GB</td>
              <td>IEPL优质内网专线</td>
              <td>超低预算尝鲜、追剧大流量下载备用</td>
              <td><a href="${rel}review/flyingbird/index.html" class="btn btn-outline btn-sm">评测详情</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-n">4</span></td>
              <td><strong>TAG VPN</strong></td>
              <td>¥33 /月(折合)</td>
              <td>250GB/季</td>
              <td>全球IPLC物理专线 (90+国)</td>
              <td>小众冷门节点需求、海淘跨服、数字游民</td>
              <td><a href="${rel}review/tag/index.html" class="btn btn-outline btn-sm">评测详情</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-n">5</span></td>
              <td><strong>DuangCloud</strong></td>
              <td>¥40 /月</td>
              <td>150GB</td>
              <td>老牌IEPL高可用专线</td>
              <td>长期稳定办公、不想频繁换机场的稳健型用户</td>
              <td><a href="${rel}review/duang/index.html" class="btn btn-outline btn-sm">评测详情</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Section 6: 按需求选择 (Category Hubs) -->
  <section class="section-block">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title">按应用场景选择您的最佳梯子</h2>
        <p class="section-desc">不同使用需求对应不同的网络拓扑，选择针对性优化的机场能够事半功倍</p>
      </div>

      <div class="hub-grid">
        <a href="${rel}recommend/budget/index.html" class="hub-card">
          <span class="hub-icon">💰</span>
          <div class="hub-name">平价低预算推荐</div>
          <div class="hub-desc">月付 15-20 元以内的实惠梯子，高单价低至 0.09元/GB，学生党与轻量上网优选。</div>
        </a>
        <a href="${rel}recommend/premium/index.html" class="hub-card">
          <span class="hub-icon">⚡</span>
          <div class="hub-name">高端专线梯子</div>
          <div class="hub-desc">全 IPLC/BGP 物理内网直连专线，极低延迟零丢包，企业跨国协同与金融级稳定首选。</div>
        </a>
        <a href="${rel}recommend/beginner/index.html" class="hub-card">
          <span class="hub-icon">🔰</span>
          <div class="hub-name">新手入门零门槛</div>
          <div class="hub-desc">一键导入客户端，配套保姆级图文教程，告别繁琐配置文件，零基础即买即用。</div>
        </a>
        <a href="${rel}recommend/stable/index.html" class="hub-card">
          <span class="hub-icon">🛡️</span>
          <div class="hub-name">晚高峰抗封锁保障</div>
          <div class="hub-desc">敏感时期坚挺不掉线，晚 8 点至 11 点网络抖动小于 5%，告别转圈圈困扰。</div>
        </a>
        <a href="${rel}recommend/ai/index.html" class="hub-card">
          <span class="hub-icon">🤖</span>
          <div class="hub-name">AI / ChatGPT 专线</div>
          <div class="hub-desc">原生住宅落地 IP，全天候解锁 ChatGPT、Claude 3.7、Google Gemini，彻底杜绝降智封号。</div>
        </a>
        <a href="${rel}recommend/streaming/index.html" class="hub-card">
          <span class="hub-icon">🎬</span>
          <div class="hub-name">4K 流媒体秒开</div>
          <div class="hub-desc">支持 Netflix 各区片库、Disney+、HBO Max 与 YouTube Premium 4K HDR 原生解析。</div>
        </a>
      </div>
    </div>
  </section>

  <!-- Section 7: 机场横向比较入口 (Compare Tool Callout) -->
  <section class="section-block" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color:#fff;">
    <div class="container" style="text-align:center; padding:20px 0;">
      <h2 style="font-size:2rem; font-weight:800; margin-bottom:12px; color:#fff;">还在犹豫挑选哪家机场？使用横向对比工具</h2>
      <p style="max-width:700px; margin:0 auto 24px; color:#cbd5e1; font-size:1.05rem;">
        我们提供支持 2-4 家机场并排对照的实时参数矩阵：同时对比起始价格、实际每GB单价、支持协议、AI大模型解锁能力与缺点短板。
      </p>
      <a href="${rel}compare/index.html" class="btn btn-primary" style="font-size:1.05rem; padding:12px 32px;">立即打开横向对比工具 &rarr;</a>
    </div>
  </section>

  <!-- Section 8 & 9: 教程与深度评测 (Guides & Reviews) -->
  <section class="section-block">
    <div class="container">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:32px;">
        <div>
          <div class="section-head">
            <h2 class="section-title">新手翻墙教程中心</h2>
            <p class="section-desc">主流操作系统客户端安装、配置与订阅规则分流设置</p>
          </div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <a href="${rel}guides/windows/index.html" class="card" style="padding:16px; text-decoration:none;">
              <div style="font-weight:700; color:var(--secondary);">🖥️ Windows 电脑客户端配置教程</div>
              <div style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">基于 Clash Verge Rev 与 Sing-box 的快速订阅导入指南</div>
            </a>
            <a href="${rel}guides/android/index.html" class="card" style="padding:16px; text-decoration:none;">
              <div style="font-weight:700; color:var(--secondary);">📱 Android 手机科学上网教程</div>
              <div style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">Clash Meta for Android 与 v2rayNG 新手快速上手</div>
            </a>
            <a href="${rel}guides/ios/index.html" class="card" style="padding:16px; text-decoration:none;">
              <div style="font-weight:700; color:var(--secondary);">🍏 iOS (iPhone/iPad) 翻墙配置指南</div>
              <div style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">Shadowrocket (小火箭) 与 Loon 规则分流配置图解</div>
            </a>
            <a href="${rel}guides/macos/index.html" class="card" style="padding:16px; text-decoration:none;">
              <div style="font-weight:700; color:var(--secondary);">💻 macOS 平台机场节点配置教程</div>
              <div style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">Clash Verge macOS 增强模式与全局代理设置指南</div>
            </a>
          </div>
        </div>

        <div>
          <div class="section-head">
            <h2 class="section-title">行业知识与深度博文</h2>
            <p class="section-desc">透视网络专线原理，避开营销虚标陷阱与安全风险</p>
          </div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <a href="${rel}blog/how-to-choose-airport/index.html" class="card" style="padding:16px; text-decoration:none;">
              <div style="font-weight:700; color:var(--secondary);">🔍 新手如何挑选靠谱机场？八条黄金防跑路准则</div>
              <div style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">从套餐周期、线路架构到退款机制的全面避坑策略</div>
            </a>
            <a href="${rel}blog/iepl-vs-iplc/index.html" class="card" style="padding:16px; text-decoration:none;">
              <div style="font-weight:700; color:var(--secondary);">⚡ IEPL 与 IPLC 专线有什么区别？技术原理解读</div>
              <div style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">为什么内网专线不经过防火墙审查？成本与延迟真相</div>
            </a>
            <a href="${rel}blog/protocol-comparison/index.html" class="card" style="padding:16px; text-decoration:none;">
              <div style="font-weight:700; color:var(--secondary);">🛠️ SS / V2Ray / Trojan / Hysteria2 协议大横评</div>
              <div style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">不同网络代理协议在延迟、开销及抗封锁维度的取舍</div>
            </a>
            <a href="${rel}blog/airport-speedtest-myths/index.html" class="card" style="padding:16px; text-decoration:none;">
              <div style="font-weight:700; color:var(--secondary);">📊 看懂机场测速图：为什么测速千兆但晚上依然卡顿？</div>
              <div style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">揭秘峰值带宽与真实晚高峰延迟抖动的本质差距</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 10: 知识百科词条 (Glossary Hub) -->
  <section class="section-block">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title">核心概念百科词典</h2>
        <p class="section-desc">清晰透彻解释专业网络术语，降低技术认知门槛</p>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:12px;">
        <a href="${rel}glossary/iplc/index.html" class="feature-pill" style="padding:8px 16px; font-size:0.95rem;">📘 什么是 IPLC 专线？</a>
        <a href="${rel}glossary/iepl/index.html" class="feature-pill" style="padding:8px 16px; font-size:0.95rem;">📘 什么是 IEPL 专线？</a>
        <a href="${rel}glossary/clash/index.html" class="feature-pill" style="padding:8px 16px; font-size:0.95rem;">📘 什么是 Clash 规则分流？</a>
        <a href="${rel}glossary/v2ray/index.html" class="feature-pill" style="padding:8px 16px; font-size:0.95rem;">📘 什么是 V2Ray / VMess？</a>
        <a href="${rel}glossary/shadowsocks/index.html" class="feature-pill" style="padding:8px 16px; font-size:0.95rem;">📘 什么是 Shadowsocks 协议？</a>
      </div>
    </div>
  </section>

  <!-- Section 12: FAQ (围绕关键词真实解答) -->
  <section class="section-block">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title">常见问题解答 (FAQ)</h2>
        <p class="section-desc">围绕“机场推荐、性价比机场、VPN梯子与节点选择”的热门疑问</p>
      </div>

      <div style="max-width:900px; margin:0 auto;">
        <div class="faq-item">
          <button class="faq-question">
            <span>翻墙用的“机场”和传统“商业 VPN”有什么本质区别？</span>
            <span class="faq-toggle-icon">−</span>
          </button>
          <div class="faq-answer">
            传统的商业 VPN（如 ExpressVPN、NordVPN）通常采用通用 OpenVPN/WireGuard 协议直连海外服务器，协议特征明显，在敏感时期极易被 GFW 精准识别并拦截封锁 IP；而“机场”通常采用专门为抗封锁设计的加密代理协议（如 Shadowsocks、Trojan、V2Ray/Vless），并配合国内 BGP 入口与 IPLC/IEPL 跨境物理内网专线，数据在过境时不经过公网防火墙检查，因而具备超低的延迟和极高的稳定性。
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>如何辨别一家机场是不是真的内网专线（IPLC/IEPL）？</span>
            <span class="faq-toggle-icon">+</span>
          </button>
          <div class="faq-answer" style="display:none;">
            主要看两个指标：<strong>Ping 延迟与追踪路由（Traceroute）</strong>。真实的内网专线由于在大陆境内入口（如深圳、上海）直接进入跨境物理内网，用户 ping 节点时延迟通常非常低（沿海到香港一般在 20-35ms 之间），且全国各省份三网波动极小；如果在晚高峰（20:00-23:00）延迟突然飙升到 150ms 以上或大量丢包，通常是普通公网中转冒充的假专线。
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>为什么不建议新手一次性购买一整年的机场套餐？</span>
            <span class="faq-toggle-icon">+</span>
          </button>
          <div class="faq-answer" style="display:none;">
            网络代理行业受外部政策波动、专线通报与机房变更影响较大。部分低价机场通过“极低年付促销”吸收资金后存在跑路或服务降级风险。我们强烈建议所有新用户在初次使用时选择<strong>月付或季付</strong>，在连续稳定使用 3-6 个月且对其晚高峰表现满意后，再考虑长周期套餐。
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>使用机场节点时，为什么 ChatGPT 会提示 Access Denied 或降智？</span>
            <span class="faq-toggle-icon">+</span>
          </button>
          <div class="faq-answer" style="display:none;">
            OpenAI 对访问 IP 的风控级别极高。当一个机房 IDC 节点的 IP 被成百上千人共用时，OpenAI 会自动触发人机验证、封禁账户或切换至低配模型（即所谓“降智”）。解决办法是选择具备“原生住宅落地 IP”或对 AI 大模型有专门解锁维护的机场（如 WgetCloud、Kuromi 等），并避免使用万人骑的免费或极低端廉价节点。
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  const html = renderPage({
    title: "2026最新机场推荐与梯子评测指南 - 精选高性价比VPN机场节点 | VPN Top",
    description: "VPN Top专注2026年中文机场推荐与翻墙梯子测评。提供高性价比机场排行榜、IPLC/IEPL稳定专线节点测评、ChatGPT与4K流媒体原生解锁指南，客观真实，拒绝虚假跑分。",
    canonicalPath: "/",
    depth: 0,
    activeNav: "home",
    breadcrumbs: null,
    schemaJson,
    content
  });

  saveHtmlFile('index.html', html);
}

module.exports = {
  generateHomepage
};
