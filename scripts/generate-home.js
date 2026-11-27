const { airports } = require('../data/airports.js');
const { DOMAIN, renderPage, saveHtmlFile } = require('./template.js');

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
  <!-- Section 1: Hero with Stats Counters -->
  <section class="hero-section">
    <div class="container">
      <span class="hero-badge">2026 权威实测 · Bing 专属优化导航</span>
      <h1 class="hero-title">2026 高性价比机场推荐与 VPN 梯子评测导航</h1>
      <p class="hero-subtitle">
        专注于真实晚高峰表现的<strong>机场推荐</strong>与<strong>翻墙梯子测评</strong>。汇聚精选<strong>性价比机场</strong>、低延迟 IPLC/IEPL <strong>机场节点</strong>与高速 <strong>vpn节点</strong>，全方位拒绝虚假跑分，助你轻松避开跑路风险。
      </p>

      <!-- Live Stats Bar -->
      <div class="hero-stats-grid">
        <div class="stat-card">
          <div class="stat-number">14 款</div>
          <div class="stat-label">已核验品牌 (严格排序)</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">100%</div>
          <div class="stat-label">真实线路与资费核验</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">30 篇</div>
          <div class="stat-label">全平台保姆级配置教程</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">100 篇</div>
          <div class="stat-label">原创深度技术知识库</div>
        </div>
      </div>

      <div class="hero-actions" style="margin-top:28px;">
        <a href="#ranking-table" class="btn btn-primary" style="padding:12px 28px; font-size:1.05rem;">查看 2026 综合排行榜 &rarr;</a>
        <a href="${rel}compare/index.html" class="btn btn-outline" style="padding:12px 24px;">机场横向对比工具</a>
        <a href="${rel}guides/index.html" class="btn btn-outline" style="padding:12px 24px;">全平台教程中心</a>
      </div>
    </div>
  </section>

  <!-- Section 2: 新手快速决策指南 (Quick Answers) -->
  <div class="container" style="margin-top: -20px; margin-bottom: 40px; position: relative; z-index: 2;">
    <div class="quick-answer-card">
      <div class="quick-answer-header">
        <span style="font-size:1.4rem;">💡</span>
        <span>新手快速决策指南：30秒看懂如何挑选适合自己的机场梯子</span>
      </div>
      <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom: 16px;">
        翻墙工具通常分为“传统商业 VPN”与“Shadowsocks/V2Ray/Clash 专线机场”。对于中国大陆网络环境，具备内网专线（IPLC/IEPL）的机场在抗封锁、低延迟和晚高峰稳定性上显著优于普通直连节点。
      </p>
      <div class="quick-answer-list">
        <div class="quick-answer-item">
          <strong>1. 新手应该如何选择？</strong>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">
            优先选择月付 8-20 元起、支持主流客户端一键导入的成熟专线梯子（如微风网络、暮光网络、飞猫云或无忧），坚决避免一次性年付不知名小机场。
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
            计算公式：每 GB 单价 = 月费 ÷ 实际可用流量。微风网络低至 0.040 元/GB，飞猫云 0.046 元/GB，超出 0.30 元/GB 属于高溢价定位。
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

  <!-- Section 3: 2026 核心机场综合实力排行榜 (Master Table with Interactive Category Filters) -->
  <section class="section-block" id="ranking-table" style="padding-top: 10px;">
    <div class="container">
      <div class="section-head section-head-flex">
        <div>
          <h2 class="section-title">2026 优质机场综合排行榜（14家核验品牌）</h2>
          <p class="section-desc">严格依据真实晚高峰稳定性、每GB单价与资费核验排序，点击优惠码可一键复制</p>
        </div>
        <div class="filter-pills" id="table-filter-pills">
          <button class="filter-pill active" data-filter="all">全部 (14)</button>
          <button class="filter-pill" data-filter="budget">超值平价 (<¥10)</button>
          <button class="filter-pill" data-filter="premium">纯专线骨干</button>
          <button class="filter-pill" data-filter="ai">ChatGPT 原生</button>
          <button class="filter-pill" data-filter="streaming">4K 流媒体</button>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table" id="airports-ranking-table">
          <thead>
            <tr>
              <th style="width:65px; text-align:center;">排名</th>
              <th style="width:200px;">品牌名称</th>
              <th style="width:110px; white-space:nowrap;">起步价格</th>
              <th style="width:110px; white-space:nowrap;">入门流量</th>
              <th style="width:190px; white-space:nowrap;">骨干传输线路</th>
              <th style="min-width:240px;">适合人群</th>
              <th style="text-align:center; width:160px;">操作</th>
            </tr>
          </thead>
          <tbody>
            ${airports.map((a, idx) => {
              // tags for dynamic filtering
              let filterTags = ['all'];
              if (a.startingPrice <= 10) filterTags.push('budget');
              if (a.lineType?.includes('专线') || a.advantages.some(v => v.includes('专线'))) filterTags.push('premium');
              if (a.aiSupport && a.aiSupport.length > 0) filterTags.push('ai');
              if (a.streamingSupport && a.streamingSupport.length > 0) filterTags.push('streaming');

              return `
            <tr data-tags="${filterTags.join(' ')}">
              <td style="text-align:center;">
                <span class="rank-badge rank-${idx + 1}">${idx + 1}</span>
              </td>
              <td>
                <div class="airport-brand-title">${a.name}</div>
                ${a.coupon ? `
                <div class="brand-coupon-pill" onclick="copyCouponText('${a.coupon}')" title="点击复制优惠码">
                  券码: <code>${a.coupon}</code> <span class="copy-hint">复制</span>
                </div>` : ''}
              </td>
              <td style="white-space:nowrap;">
                <strong style="color:var(--danger); font-size:1.15rem;">¥${a.startingPrice}</strong>
                <span style="font-size:0.8rem; color:var(--text-muted);">/月</span>
              </td>
              <td style="white-space:nowrap;">
                <strong style="color:var(--text-main); font-size:1.05rem;">${a.plans[0]?.traffic || '100'}GB</strong>
              </td>
              <td>
                <span class="line-badge">${a.lineType}</span>
              </td>
              <td>
                <div class="suitable-text">${a.suitableSummary || a.suitableFor[0]}</div>
              </td>
              <td style="text-align:center;">
                <div style="display:flex; gap:6px; justify-content:center; align-items:center;">
                  <a href="${rel}review/${a.id}/index.html" class="btn btn-outline btn-sm" style="padding:6px 10px;">评测详情</a>
                  <a href="${a.affiliateUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="padding:6px 12px; font-weight:700;">直达官网</a>
                </div>
              </td>
            </tr>
            `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Section 4: 按场景选择 (6 Visual Tiles) -->
  <section class="section-block" style="background:var(--bg-alt); padding:50px 0;">
    <div class="container">
      <div class="section-head text-center" style="max-width:760px; margin:0 auto 36px auto;">
        <h2 class="section-title">按使用场景与核心需求快速选型</h2>
        <p class="section-desc">不同用途对网络线路要求大不相同，针对性选择省钱又省心</p>
      </div>

      <div class="hub-grid">
        <a href="${rel}recommend/budget/index.html" class="hub-card">
          <span class="hub-icon">🪙</span>
          <div class="hub-name">低预算便宜机场</div>
          <div class="hub-desc">适合学生党与轻度办公，月付4.9元起，实标大流量，高性价比首选。</div>
        </a>
        <a href="${rel}recommend/premium/index.html" class="hub-card">
          <span class="hub-icon">🚀</span>
          <div class="hub-name">高端 IPLC 专线</div>
          <div class="hub-desc">国际企业物理内网骨干，不过公网审查，敏感时期稳如磐石，极低丢包。</div>
        </a>
        <a href="${rel}recommend/stable/index.html" class="hub-card">
          <span class="hub-icon">🛡️</span>
          <div class="hub-name">晚高峰抗封锁保障</div>
          <div class="hub-desc">BGP多线中继入口，晚8点至11点网络抖动小于5%，告别转圈圈困扰。</div>
        </a>
        <a href="${rel}recommend/ai/index.html" class="hub-card">
          <span class="hub-icon">🤖</span>
          <div class="hub-name">AI / ChatGPT 专线</div>
          <div class="hub-desc">原生住宅落地 IP，全天候解锁 ChatGPT、Claude 3.5、Gemini，彻底杜绝降智封号。</div>
        </a>
        <a href="${rel}recommend/streaming/index.html" class="hub-card">
          <span class="hub-icon">🎬</span>
          <div class="hub-name">4K/8K 流媒体秒开</div>
          <div class="hub-desc">支持 Netflix 各区非自制剧、Disney+、HBO Max 与 YouTube 4K HDR 原生解析。</div>
        </a>
        <a href="${rel}recommend/beginner/index.html" class="hub-card">
          <span class="hub-icon">🔰</span>
          <div class="hub-name">新手入门零基础指南</div>
          <div class="hub-desc">一键导入客户端，零代码基础上手，配合全套保姆级图文教程。</div>
        </a>
      </div>
    </div>
  </section>

  <!-- Section 5: 机场横向比较入口 (Compare Tool Callout) -->
  <section class="section-block" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color:#fff; padding:60px 0;">
    <div class="container" style="text-align:center;">
      <h2 style="font-size:2rem; font-weight:800; margin-bottom:14px; color:#fff;">还在犹豫挑选哪家机场？使用横向对比工具</h2>
      <p style="max-width:720px; margin:0 auto 28px; color:#cbd5e1; font-size:1.05rem; line-height:1.7;">
        支持在 14 家品牌中自由勾选 2 到 4 家并排对照起步资费、每GB估算单价、协议支持、AI 解锁能力与缺点短板，帮您精准决策。
      </p>
      <a href="${rel}compare/index.html" class="btn btn-primary" style="font-size:1.05rem; padding:12px 36px; font-weight:700;">打开机场横向对比工具 &rarr;</a>
    </div>
  </section>

  <!-- Section 6: 教程中心与深度博文双栏 (Resources Dual Column) -->
  <section class="section-block" style="padding:60px 0;">
    <div class="container">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:36px;">
        <!-- Left: Guides -->
        <div>
          <div class="section-head" style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:20px;">
            <div>
              <h2 class="section-title" style="font-size:1.45rem;">🖥️ 翻墙新手教程中心</h2>
              <p class="section-desc">全平台客户端安装、配置与订阅规则分流设置</p>
            </div>
            <a href="${rel}guides/index.html" style="font-size:0.9rem; color:var(--primary); font-weight:700; text-decoration:none; white-space:nowrap; margin-bottom:4px;">查看全部 30 篇教程 &rarr;</a>
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
            <a href="${rel}guides/openwrt-clash/index.html" class="card" style="padding:16px; text-decoration:none;">
              <div style="font-weight:700; color:var(--secondary);">🌐 OpenWrt 软路由 OpenClash 全屋翻墙</div>
              <div style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">旁路由与透明网关设置，全家设备免配置科学上网</div>
            </a>
          </div>
        </div>

        <!-- Right: Blogs -->
        <div>
          <div class="section-head" style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:20px;">
            <div>
              <h2 class="section-title" style="font-size:1.45rem;">📚 科学上网深度技术博文</h2>
              <p class="section-desc">透视网络专线原理，避开营销虚标陷阱与安全风险</p>
            </div>
            <a href="${rel}blog/index.html" style="font-size:0.9rem; color:var(--primary); font-weight:700; text-decoration:none; white-space:nowrap; margin-bottom:4px;">查看全部 100 篇专栏 &rarr;</a>
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
            <a href="${rel}blog/chatgpt-ip-blocked-fix/index.html" class="card" style="padding:16px; text-decoration:none;">
              <div style="font-weight:700; color:var(--secondary);">🤖 访问 ChatGPT 报 Access Denied 彻底解决</div>
              <div style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">原生住宅落地 IP 选型技巧，彻底杜绝降智与封号</div>
            </a>
            <a href="${rel}blog/fix-evening-peak-lag/index.html" class="card" style="padding:16px; text-decoration:none;">
              <div style="font-weight:700; color:var(--secondary);">📊 晚高峰八点到十点网络大卡顿？五招彻底解决</div>
              <div style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">排查本地 QoS 限制，优选冷门出口与单边并发调优</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 7: 术语百科极简药丸 (Glossary Compact Pills) -->
  <section class="section-block" style="background:var(--bg-alt); padding:36px 0;">
    <div class="container text-center">
      <div style="font-size:0.88rem; font-weight:700; color:var(--text-muted); margin-bottom:12px; letter-spacing:1px;">
        💡 科学上网常用术语百科
      </div>
      <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
        <a href="${rel}glossary/iplc/index.html" class="tag-pill">什么是 IPLC 专线？</a>
        <a href="${rel}glossary/iepl/index.html" class="tag-pill">什么是 IEPL 专线？</a>
        <a href="${rel}glossary/clash/index.html" class="tag-pill">什么是 Clash 客户端？</a>
        <a href="${rel}glossary/v2ray/index.html" class="tag-pill">什么是 V2Ray / VMess？</a>
        <a href="${rel}glossary/shadowsocks/index.html" class="tag-pill">什么是 Shadowsocks？</a>
      </div>
    </div>
  </section>

  <!-- Section 8: FAQ 常见问答 -->
  <section class="section-block" style="padding:50px 0;">
    <div class="container" style="max-width:860px;">
      <div class="section-head text-center">
        <h2 class="section-title">常见问题解答 (FAQ)</h2>
        <p class="section-desc">围绕机场推荐、梯子节点配置与安全选型的常见疑问解答</p>
      </div>

      <div class="faq-list">
        <div class="faq-item">
          <button class="faq-question">
            <span>什么是机场？与普通 VPN 相比有什么优势？</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>“机场”是中文网络语境中提供基于 Shadowsocks、V2Ray (VMess/VLESS)、Trojan、Hysteria2 等协议节点集群服务商的统称。与传统商业 VPN 相比，机场拥有全球多节点并发、智能分流（国内直连不耗流量、海外走代理）、更低延迟以及晚高峰不易被大面积阻断的显著优势。</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>为什么专线机场（IPLC/IEPL）比普通公网中转更好？</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>IPLC/IEPL 内网专线走的是企业级点对点物理光缆内网，数据直接在深港、沪日物理机房间传输，不经过公网国际出口审查网关。因此在敏感时期不掉线、晚高峰网络抖动极小、丢包率几乎为 0。</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>为什么一定要坚持买月付套餐？</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>机场行业由于不可抗力与线路调整频繁，购买长周期套餐（如一年或两年）会承受较大的跑路或服务劣化风险。选择月付或季付可以把个人资金风险降到最低，即使服务商出现异常也能随时止损换新。</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>购买机场后，访问 ChatGPT 或 Netflix 提示不可用怎么办？</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>这是因为 OpenAI 与各大流媒体对机房 IP 进行了风控拦截。建议优先挑选提供“原生住宅 IP”或专设“AI / 流媒体解锁节点”的机场（如灵猫、闪跃、飞猫云），并在客户端中配置专属分流规则。</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  const html = renderPage({
    title: "2026最新机场推荐与梯子评测指南 - 精选高性价比VPN机场节点 | VPN Top",
    description: "专注真实晚高峰表现的2026机场推荐与翻墙梯子测评网。精选高性价比机场、低延迟IPLC/IEPL内网专线节点与高速vpn节点，拒绝虚标跑分，避开跑路鸡。",
    canonicalPath: "/",
    depth,
    activeNav: "home",
    breadcrumbs: [],
    schemaJson,
    content
  });

  saveHtmlFile('index.html', html);
  console.log('[GENERATED] index.html (Revamped Clean Architecture)');
}

module.exports = {
  generateHomepage
};
