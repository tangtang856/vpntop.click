const { DOMAIN, renderPage, saveHtmlFile } = require('./template.js');

function generateGlossary() {
  const depth = 2;
  const rel = '../../';

  const terms = [
    {
      slug: "iplc",
      title: "IPLC 专线（International Private Leased Circuit）百科解析",
      seoTitle: "什么是 IPLC 专线？国际私有租用线路原理解析 | VPN Top",
      description: "IPLC专线术语百科。通俗解读国际私有租用线路的概念、物理点对点点亮光纤、不经过公网GFW防火墙审查的优势及高昂成本背景。",
      definition: "IPLC（International Private Leased Circuit，国际私有租用线路）是指电信运营商向跨国企业提供的、点对点直连的专用通信链路。在物理层面上相当于连接两地的一根独立内网光缆。"
    },
    {
      slug: "iepl",
      title: "IEPL 专线（International Ethernet Private Line）百科解析",
      seoTitle: "什么是 IEPL 专线？国际以太网专线特性与对比 | VPN Top",
      description: "IEPL专线术语百科。详解国际以太网专线的二层传输机制、与IPLC的异同、抗封锁能力与目前机场主流专线选用依据。",
      definition: "IEPL（International Ethernet Private Line，国际以太网专线）是基于以太网技术的跨境二层专线连接。它结合了传统 IPLC 的点对点安全性和现代以太网带宽分配的灵活性，是目前主流高品质机场首选的骨干方案。"
    },
    {
      slug: "clash",
      title: "Clash / Mihomo 规则分流代理客户端百科",
      seoTitle: "什么是 Clash 代理客户端？规则分流核心机制详解 | VPN Top",
      description: "Clash代理客户端百科。深度解析基于Go语言开发的跨平台规则分流引擎工作原理，解释国内直连与海外代理智能路由判断机制。",
      definition: "Clash 是一款基于 Go 语言开发的跨平台规则分流代理客户端（目前开源社区主力维护分支为 Mihomo/Clash.Meta）。其核心创新在于能够依据访问域名和 IP 归属地自动匹配路由规则，实现国内流量直连与海外流量代理并存。"
    },
    {
      slug: "v2ray",
      title: "V2Ray 代理框架与 VMess 协议百科解析",
      seoTitle: "什么是 V2Ray / VMess 协议？功能架构与分流原理 | VPN Top",
      description: "V2Ray与VMess协议百科。科普Project V生态框架、动态端口、传输层混淆（WebSocket/mKCP）及抗网络审查历史演进。",
      definition: "V2Ray 是 Project V 旗下的核心模块工具套件，集成了多种现代化代理协议、路由调度和多层数据混淆功能。其自研的 VMess 协议曾是抗网络流量特征识别的重要里程碑。"
    },
    {
      slug: "shadowsocks",
      title: "Shadowsocks (SS) 协议百科与发展历程",
      seoTitle: "什么是 Shadowsocks (SS)？轻量加密代理协议的起源与现状 | VPN Top",
      description: "Shadowsocks协议百科。科普轻量级Socks5加密代理协议的设计初衷、AEAD现代化加密特性、低计算开销优势及其在专线机场中的主力地位。",
      definition: "Shadowsocks（简称 SS）是一种轻量级安全 SOCKS5 代理协议。其特点是客户端和服务端之间采用高效的对称加密（如 AEAD 密码学套件），开销极小且极其稳定，至今仍是高速专线内网传输的首选协议。"
    }
  ];

  terms.forEach(t => {
    const crumbs = [
      { name: "知识百科", url: "glossary/iplc/index.html" },
      { name: t.title.split('（')[0], url: "" }
    ];

    const content = `
    <article class="container article-container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <h1 class="article-title">${t.title}</h1>
        <div class="article-meta">
          <span>📚 类别：网络技术词典</span>
          <span>📅 更新时间：2026年11月</span>
          <span>🔍 编审：VPN Top 技术词条委员会</span>
        </div>
      </div>

      <div class="quick-answer-card">
        <div class="quick-answer-header">
          <span>📖 权威定义</span>
        </div>
        <p style="color:var(--text-main); font-size:1.05rem; line-height:1.7; font-weight:500;">
          ${t.definition}
        </p>
      </div>

      <div class="article-content">
        <h2>为什么该技术对科学上网至关重要？</h2>
        <p>
          在当今复杂的国际互联网互联互通背景下，理解<strong>${t.title.split('（')[0]}</strong>能够帮助消费者建立清晰的技术认知，不再被黑心商家“花哨虚标”的宣传口号所蒙蔽。
        </p>
        <p>
          通过采用合规物理专线与轻量加密封装，流量在境内落地端就已经完成了定向分流，不经过公网审查节点，因此在延迟敏感度（如跨国即时通讯、跨国会议语音与游戏联机）上具备压倒性优势。
        </p>

        <h2>相关概念横向关联</h2>
        <ul>
          <li>查阅使用该技术的服务商：<a href="${rel}ranking/overall/index.html">2026 优质VPN机场综合实力排行榜</a></li>
          <li>技术深度横评对比：<a href="${rel}blog/iepl-vs-iplc/index.html">IEPL 与 IPLC 专线全面原理解析</a></li>
          <li>客户端实操配置指南：<a href="${rel}guides/windows/index.html">Windows 客户端配置指南</a></li>
        </ul>

        <div class="notice-box">
          <strong>想直接挑选搭载专线的成熟梯子？</strong>
          建议参考我们的 <a href="${rel}recommend/stable/index.html">晚高峰抗断流专线节点精选</a>、查阅 <a href="${rel}recommend/index.html">场景化推荐中心</a> 或进入 <a href="${rel}compare/index.html">机场横向对比工具</a> 对齐各家配置。
        </div>

        <div class="related-posts">
          <h3>相关词条推荐</h3>
          <div class="related-grid">
            <a href="${rel}glossary/iplc/index.html" class="related-card">
              <h4>IPLC 专线</h4>
              <span>国际私有租用线路</span>
            </a>
            <a href="${rel}glossary/iepl/index.html" class="related-card">
              <h4>IEPL 专线</h4>
              <span>国际以太网专线</span>
            </a>
            <a href="${rel}glossary/clash/index.html" class="related-card">
              <h4>Clash / Mihomo</h4>
              <span>规则分流引擎</span>
            </a>
            <a href="${rel}glossary/shadowsocks/index.html" class="related-card">
              <h4>Shadowsocks</h4>
              <span>轻量级加密代理</span>
            </a>
          </div>
        </div>
      </div>
    </article>`;

    const html = renderPage({
      title: t.seoTitle,
      description: t.description,
      canonicalPath: `/glossary/${t.slug}/`,
      depth: 2,
      activeNav: "blog",
      breadcrumbs: crumbs,
      schemaJson: null,
      content
    });

    saveHtmlFile(`glossary/${t.slug}/index.html`, html);
  });
}

module.exports = {
  generateGlossary
};
