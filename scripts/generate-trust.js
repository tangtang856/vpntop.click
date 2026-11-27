const { DOMAIN, renderPage, saveHtmlFile } = require('./template.js');

function generateTrustPages() {
  const depth = 1;
  const rel = '../';

  // 1. About Us
  {
    const crumbs = [{ name: "关于本站", url: "" }];
    const content = `
    <div class="container article-container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <h1 class="article-title">关于 VPN Top：专注真实网络体验与独立技术测评</h1>
        <div class="article-meta">
          <span>📅 发布时间：2026年</span>
          <span>🌐 官方域名：vpntop.click</span>
        </div>
      </div>
      <div class="article-content">
        <h2>我们的初衷与核心使命</h2>
        <p>
          在中文互联网上，关于“机场推荐”与“翻墙梯子”的信息长期充斥着大量虚假测速图、收钱洗脑的推销软文以及低价跑路小机场的劣质推广。普通用户往往要付出数次被骗跑路或晚高峰卡顿的沉重代价，才能勉强找到一个相对稳定的服务。
        </p>
        <p>
          <strong>VPN Top (vpntop.click)</strong> 由一群热爱开放互联网的独立网络工程师和技术写作者联合建立。我们不隶属于任何单一机场运营方，旨在通过建立<strong>客观量化、真实三网晚高峰监测、透明的数据来源核对标准</strong>，为广大中文用户提供值得信赖的科学上网指引与网络优化决策工具。
        </p>

        <h2>我们坚守的三项基本原则</h2>
        <ul>
          <li><strong>坚持实测说话：</strong>所有测评数据必须经由真实的脚本持续多日采集，严禁使用单次清晨跑分欺骗读者。</li>
          <li><strong>拒绝虚假背书：</strong>对于未经验证的小型机场，坚决不作无原则的推荐；缺失数据明确标注“尚未核实”。</li>
          <li><strong>用户利益优先：</strong>始终提醒读者遵守小额月付原则，降低财务风险，坚守理性客观底线。</li>
        </ul>
      </div>
    </div>`;

    const html = renderPage({
      title: "关于 VPN Top - 独立客观的机场梯子评测与网络资讯站 | VPN Top",
      description: "关于VPN Top (vpntop.click)。我们是一家专注真实三网晚高峰丢包监测与独立技术测评的中文网络评测站，坚持数据中立与客观原则。",
      canonicalPath: "/about/",
      depth: 1,
      activeNav: "",
      breadcrumbs: crumbs,
      schemaJson: null,
      content
    });
    saveHtmlFile('about/index.html', html);
  }

  // 2. Contact Us
  {
    const crumbs = [{ name: "联系我们", url: "" }];
    const content = `
    <div class="container article-container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <h1 class="article-title">联系 VPN Top 编辑团队</h1>
        <div class="article-meta">
          <span>📬 沟通渠道：邮件与勘误反馈</span>
        </div>
      </div>
      <div class="article-content">
        <h2>如何与我们取得联系？</h2>
        <p>
          我们欢迎广大读者、网络工程师及服务商与我们交流：
        </p>
        <ul>
          <li><strong>数据勘误与反馈：</strong>如果您发现某家机场的资费、线路或节点发生重大变更，欢迎来信指正，我们将在核验后 24 小时内更新。</li>
          <li><strong>测试线路提报：</strong>服务商若希望加入我们的自动化网络质量监控池，可提供真实公开文档与测试订阅，我们将按照统一标准进行无差别压力测试。</li>
        </ul>
        <div class="notice-box">
          <strong>官方联系邮箱：</strong>
          <br>
          电子邮箱：<code style="font-size:1.05rem;">contact@vpntop.click</code>
          <br>
          <span style="font-size:0.85rem; color:var(--text-muted);">（一般事务将在 1-2 个工作日内回复。不受理任何付费刷榜与洗稿要求。）</span>
        </div>
      </div>
    </div>`;

    const html = renderPage({
      title: "联系我们 - 反馈建议与线路核实申报 | VPN Top",
      description: "联系VPN Top编辑团队。提供数据勘误反馈、线路质量报送及合作建议通道，共同打造透明健康的中文网络生态。",
      canonicalPath: "/contact/",
      depth: 1,
      activeNav: "",
      breadcrumbs: crumbs,
      schemaJson: null,
      content
    });
    saveHtmlFile('contact/index.html', html);
  }

  // 3. Editorial Policy
  {
    const crumbs = [{ name: "编辑政策", url: "" }];
    const content = `
    <div class="container article-container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <h1 class="article-title">VPN Top 编辑政策与评分评测客观性公约</h1>
        <div class="article-meta">
          <span>📜 公约版本：2026.1</span>
          <span>🛡️ 核心宗旨：独立中立、透明披露、可复现</span>
        </div>
      </div>
      <div class="article-content">
        <h2>1. 评测数据来源与核实机制</h2>
        <p>
          本站所呈现的数据分为四类并在各评测中清晰标明：
        </p>
        <ul>
          <li><strong>【官方公开资料】：</strong>由各机场服务商官方网站、控制台公开公示的套餐价格、流量配额及服务条款。</li>
          <li><strong>【编辑整理资料】：</strong>由编辑团队对各协议、客户端支持及节点地区进行的归类与结构化整理。</li>
          <li><strong>【实际测试结果】：</strong>由本站探针脚本在晚高峰（20:00-23:00）针对三网骨干节点进行的真实延迟、丢包率与流媒体解锁检测。</li>
          <li><strong>【尚未核实资料】：</strong>服务商单方面宣传但缺乏独立复现条件的数据，均直接注明尚未核实。</li>
        </ul>

        <h2>2. 联盟推广与商业合作披露 (Affiliate Disclosure)</h2>
        <p>
          为维持本站测试服务器集群、云探针与内容维护的持续运转，本站部分页面包含推广联盟链接（Affiliate Links）。当读者通过这些链接购买服务时，服务商可能会向本站支付少许推广佣金。
        </p>
        <p>
          <strong>我们郑重承诺：</strong>商业联盟关系绝不影响我们的评测结论、缺点揭露与排行榜位次。任何存在断连、跑路风险或晚高峰严重劣化的服务，无论佣金高低，均会被如实列出缺点或移出推荐榜。
        </p>
      </div>
    </div>`;

    const html = renderPage({
      title: "编辑政策与客观测评公约 - VPN Top 评测标准披露 | VPN Top",
      description: "VPN Top编辑政策与独立评测客观性公约。公开我们的数据采集流程、评分权重标准及联盟推广透明披露，坚守中立公信力。",
      canonicalPath: "/editorial-policy/",
      depth: 1,
      activeNav: "",
      breadcrumbs: crumbs,
      schemaJson: null,
      content
    });
    saveHtmlFile('editorial-policy/index.html', html);
  }

  // 4. Privacy Policy
  {
    const crumbs = [{ name: "隐私政策", url: "" }];
    const content = `
    <div class="container article-container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <h1 class="article-title">VPN Top 隐私政策</h1>
        <div class="article-meta">
          <span>📅 最后生效：2026年</span>
        </div>
      </div>
      <div class="article-content">
        <h2>访客数据保护与零追踪声明</h2>
        <p>
          VPN Top 极度重视个人隐私保护。作为一家静态内容资讯站，我们坚持最小化数据采集原则：
        </p>
        <ul>
          <li><strong>无强制注册：</strong>本站无需任何用户注册登录，所有工具、测评与排行榜完全公开免费阅读。</li>
          <li><strong>不收集敏感个人信息：</strong>我们不收集您的姓名、电话、密码或支付账号。</li>
          <li><strong>无第三方追踪 Cookie：</strong>本站不嵌入任何跨站广告追踪脚本，不进行针对性广告画像追踪。</li>
        </ul>
      </div>
    </div>`;

    const html = renderPage({
      title: "隐私政策 - 保护访客数据与无Cookie声明 | VPN Top",
      description: "VPN Top隐私政策。坚持极简静态架构与零追踪保护，不收集用户敏感个人信息，保障完全纯粹的浏览安全。",
      canonicalPath: "/privacy-policy/",
      depth: 1,
      activeNav: "",
      breadcrumbs: crumbs,
      schemaJson: null,
      content
    });
    saveHtmlFile('privacy-policy/index.html', html);
  }

  // 5. Disclaimer
  {
    const crumbs = [{ name: "免责声明", url: "" }];
    const content = `
    <div class="container article-container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <h1 class="article-title">免责声明与合规使用提示</h1>
        <div class="article-meta">
          <span>⚠️ 法律与服务边界告知</span>
        </div>
      </div>
      <div class="article-content">
        <h2>合规与技术交流声明</h2>
        <p>
          1. <strong>技术探讨定位：</strong>VPN Top 本身不提供任何网络接入、VPN 搭建或中继代理服务。本站所有文章、词典与测评仅为计算机网络拓扑、密码学协议与海外前沿学术研发的技术研究记录。
        </p>
        <p>
          2. <strong>服务商独立性：</strong>第三方机场为独立商业主体，其运营行为、服务可用性、套餐调整及商业纠纷与本站无任何法律连带责任。用户在选购时应自行审慎评估风险。
        </p>
        <p>
          3. <strong>守法使用准则：</strong>请广大读者严格遵守所处国家与地区的法律法规，切勿利用相关网络技术从事任何破坏网络安全或违规违法行为。
        </p>
      </div>
    </div>`;

    const html = renderPage({
      title: "免责声明与服务合规提示 - VPN Top | VPN Top",
      description: "VPN Top免责声明与合规使用提示。明确本站技术测评与研究的边界，提示用户自主决策与合规使用网络加速工具。",
      canonicalPath: "/disclaimer/",
      depth: 1,
      activeNav: "",
      breadcrumbs: crumbs,
      schemaJson: null,
      content
    });
    saveHtmlFile('disclaimer/index.html', html);
  }

  // 6. 404 Page (404.html at root)
  {
    const content = `
    <div class="container" style="padding:80px 20px; text-align:center;">
      <h1 style="font-size:4rem; color:var(--primary); font-weight:800; margin-bottom:12px;">404</h1>
      <h2 style="font-size:1.8rem; color:var(--secondary); margin-bottom:16px;">抱歉，您访问的页面不存在或已被移除</h2>
      <p style="color:var(--text-muted); max-width:600px; margin:0 auto 28px; line-height:1.6;">
        由于网址更新或链接调整，请使用下方快捷入口前往核心页面，或点击按钮返回首页。
      </p>
      <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
        <a href="./index.html" class="btn btn-primary">返回网站首页</a>
        <a href="./ranking/overall/index.html" class="btn btn-outline">2026 综合排行榜</a>
        <a href="./compare/index.html" class="btn btn-outline">机场横向对比</a>
      </div>
    </div>`;

    const html = renderPage({
      title: "页面未找到 (404) - VPN Top",
      description: "抱歉，您访问的页面不存在。VPN Top 提供2026最新高性价比机场推荐、翻墙梯子测评与客户端配置指南。",
      canonicalPath: "/404.html",
      depth: 0,
      activeNav: "",
      breadcrumbs: null,
      schemaJson: null,
      content
    });
    saveHtmlFile('404.html', html);
  }
}

module.exports = {
  generateTrustPages
};
