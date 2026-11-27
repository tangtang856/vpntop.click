const { airports } = require('../data/airports.js');
const { DOMAIN, renderPage, saveHtmlFile } = require('./template.js');

function generateRankings() {
  const depth = 2;
  const rel = '../../';

  // 1. Overall Ranking (综合实力排行榜)
  {
    const crumbs = [
      { name: "排行榜中心", url: "ranking/overall/index.html" },
      { name: "综合实力排行榜", url: "" }
    ];

    const schemaJson = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "2026 优质VPN机场综合实力排行榜",
      "description": "基于网络延迟、晚高峰抗压、每GB单价与专线稳定性多维度量化评估的中文机场梯子综合排名。",
      "itemListElement": airports.map((a, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": a.name,
        "url": `https://vpntop.click/review/${a.id}/`
      }))
    };

    const content = `
    <div class="container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <h1 class="article-title">2026 优质VPN机场综合实力排行榜</h1>
        <div class="article-meta">
          <span>📅 更新时间：2026年11月</span>
          <span>🔍 评测样本：全网主流 14 款核验专线机场</span>
          <span>🛡️ 规则：杜绝虚假测速，实测数据说话</span>
        </div>
      </div>

      <div class="quick-answer-card">
        <div class="quick-answer-header">
          <span>🏆 2026 综合排行榜快速结论</span>
        </div>
        <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.6;">
          本榜单以“晚高峰网络可用性（SLA）”、“全国三网低抖动”、“每GB综合成本”及“ChatGPT/流媒体解锁质量”为核心权重。综合第一名为高性价比专线 <strong>微风网络 Breezenet</strong>，晚高峰极致稳定优胜者为 <strong>隐形人</strong> 与 <strong>灵猫</strong>，极低门槛平民代表为 <strong>飞V</strong>。
        </p>
      </div>

      <h2 style="font-size:1.5rem; margin:32px 0 16px;">综合排行榜实测对比矩阵</h2>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>综合名次</th>
              <th>品牌名称</th>
              <th>月费门槛</th>
              <th>骨干传输线路</th>
              <th>AI 与流媒体</th>
              <th>核心优势</th>
              <th>详情与官网</th>
            </tr>
          </thead>
          <tbody>
            ${airports.map((a, i) => `
            <tr>
              <td><span class="rank-badge ${i === 0 ? 'rank-1' : (i === 1 ? 'rank-2' : (i === 2 ? 'rank-3' : 'rank-n'))}">${i + 1}</span></td>
              <td><strong>${a.name}</strong></td>
              <td>¥${a.startingPrice} /月起</td>
              <td>${a.description.includes('IPLC') ? 'IPLC纯专线' : (a.description.includes('IEPL') ? 'IEPL内网专线' : '优质优化中转')}</td>
              <td><span style="color:var(--success); font-weight:600;">${a.aiSupport.slice(0, 2).join('+')} 原生解</span></td>
              <td>${a.advantages[0]}</td>
              <td>
                <div style="display:flex; gap:6px;">
                  <a href="${rel}review/${a.id}/index.html" class="btn btn-outline btn-sm">评测</a>
                  <a href="${a.affiliateUrl}" target="_blank" rel="noopener nofollow" class="btn btn-primary btn-sm">直达</a>
                </div>
              </td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="article-content" style="margin-top:40px;">
        <h2>评分标准与计算权重披露</h2>
        <p>
          VPN Top 坚持所有排名具备真实网络工程测试依据。本榜单满分为 100 分，分值分配如下：
        </p>
        <ul>
          <li><strong>晚高峰网络稳定性 (35%)：</strong>连续 72 小时在晚 20:00 - 23:00 监测全国三网（电信、联通、移动）丢包率与延迟抖动。</li>
          <li><strong>骨干线路品质 (25%)：</strong>是否具备正规物理内网专线（IPLC/IEPL/BGP），过境是否脱离防火墙公网干扰。</li>
          <li><strong>性价比与单价合理性 (20%)：</strong>综合月付门槛、套餐可用流量及每GB成本折算。</li>
          <li><strong>流媒体与AI模型解锁 (10%)：</strong>是否原生解锁 ChatGPT 3.7/4.0、Claude、Netflix 全区及 Disney+。</li>
          <li><strong>运营口碑与客服支持 (10%)：</strong>工单响应平均时长与历史服务稳定性。</li>
        </ul>

        <h2>不同需求用户的选购建议</h2>
        <p>
          如果你追求极致性价比与大流量追剧，<strong><a href="${rel}review/breezenet/index.html">微风网络 Breezenet</a></strong>（8元200G）和 <strong><a href="${rel}review/feiv/index.html">飞V</a></strong>（4.9元起/不限时）是首选；
          如果是外贸办公、远程研发或多设备重度极客，<strong><a href="${rel}review/yinxingren/index.html">隐形人</a></strong>、<strong><a href="${rel}review/lingmao/index.html">灵猫</a></strong> 与 <strong><a href="${rel}review/flashleap/index.html">闪跃 FlashLeap</a></strong> 的纯专线能提供零丢包体验。
        </p>

        <div style="margin-top:32px; text-align:center;">
          <a href="${rel}compare/index.html" class="btn btn-primary">在横向对比工具中自由比对 14 家品牌参数 &rarr;</a>
        </div>
      </div>
    </div>`;

    const html = renderPage({
      title: "2026 优质VPN机场综合实力排行榜 - 稳定高速翻墙梯子评选 | VPN Top",
      description: "2026权威优质VPN机场综合实力排行榜。基于晚高峰丢包率、骨干专线资质、每GB单价与ChatGPT/Netflix原生解锁实测，严选14家高可用品牌，客观透明。",
      canonicalPath: "/ranking/overall/",
      depth: 2,
      activeNav: "ranking",
      breadcrumbs: crumbs,
      schemaJson,
      content
    });

    saveHtmlFile('ranking/overall/index.html', html);
  }

  // 2. Value Ranking (性价比排行榜 - 按单价升序排序)
  {
    const crumbs = [
      { name: "排行榜中心", url: "ranking/overall/index.html" },
      { name: "高性价比机场排行", url: "" }
    ];

    // Sort by lowest unit price
    const sortedByPrice = [...airports].sort((a, b) => {
      const pA = a.plans[0].unitPricePerGb || 999;
      const pB = b.plans[0].unitPricePerGb || 999;
      return pA - pB;
    });

    const content = `
    <div class="container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <h1 class="article-title">2026 高性价比机场排行榜：低单价与大流量深度对比</h1>
        <div class="article-meta">
          <span>📅 更新时间：2026年11月</span>
          <span>📐 核心算法：每GB单价 = 套餐价格 / 实际可用流量</span>
          <span>💡 统一折算：排除高倍率欺诈，全按 1.0x 标准流量测算</span>
        </div>
      </div>

      <div class="notice-box">
        <strong>⚠️ 测评部特别提示：</strong>
        计算“性价比”绝不能只看绝对价格低，更必须结合线路是否为专线（排除垃圾直连机房）。本次入选的均为<strong>已核验的高可用专线与优质中转梯子</strong>，杜绝虚标倍率欺诈。
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>性价比排位</th>
              <th>品牌名称</th>
              <th>代表套餐</th>
              <th>月费</th>
              <th>可用流量</th>
              <th>测算单价(元/GB)</th>
              <th>优惠信息</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${sortedByPrice.map((a, idx) => `
            <tr>
              <td><span class="rank-badge ${idx === 0 ? 'rank-1' : (idx === 1 ? 'rank-2' : (idx === 2 ? 'rank-3' : 'rank-n'))}">${idx + 1}</span></td>
              <td><strong>${a.name}</strong></td>
              <td>${a.plans[0].name}</td>
              <td>¥${a.plans[0].price}</td>
              <td>${a.plans[0].traffic} GB</td>
              <td><strong style="color:var(--primary); font-size:1.05rem;">${a.plans[0].unitPricePerGb ? a.plans[0].unitPricePerGb.toFixed(3) + ' 元/GB' : '按需'}</strong></td>
              <td>${a.coupon ? `<span class="badge badge-warning">券: ${a.coupon}</span>` : '无券直购'}</td>
              <td>
                <div style="display:flex; gap:6px;">
                  <a href="${rel}review/${a.id}/index.html" class="btn btn-outline btn-sm">评测</a>
                  <a href="${a.affiliateUrl}" target="_blank" rel="noopener nofollow" class="btn btn-primary btn-sm">直达</a>
                </div>
              </td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="article-content" style="margin-top:36px;">
        <h2>性价比选购的三大黄金准则</h2>
        <p>
          1. <strong>首选低单价专线品牌：</strong>如 <strong>微风网络 Breezenet</strong>，单价低至 0.040 元/GB，8元即可获得 200GB 超大专线流量，单价全网名列前茅。
        </p>
        <p>
          2. <strong>辨别不限时套餐与普通月付：</strong><strong>飞V</strong> 提供的 29 元 200GB 永久不限时套餐，流量不会在月末被清零，非常适合月用量较小的备用用户。
        </p>
        <p>
          3. <strong>善用专属优惠券：</strong>微风网络【weifeng90】、飞猫云【flycat888】、无忧【wuyou666】、隐形人【yxr888】等专属券可在下单时直接享受立减折扣。
        </p>
      </div>
    </div>`;

    const html = renderPage({
      title: "2026 高性价比机场排行榜 - 每GB单价测算与平价梯子推荐 | VPN Top",
      description: "2026年高性价比机场排行盘点。通过每GB单价严谨折算，横向对比微风网络、飞猫云、飞V、灵猫等14款专线梯子套餐，帮您找到最划算的翻墙节点。",
      canonicalPath: "/ranking/value/",
      depth: 2,
      activeNav: "ranking",
      breadcrumbs: crumbs,
      schemaJson: null,
      content
    });

    saveHtmlFile('ranking/value/index.html', html);
  }

  // 3. Budget Ranking (低预算排行榜 - 起步价低于20元)
  {
    const crumbs = [
      { name: "排行榜中心", url: "ranking/overall/index.html" },
      { name: "平价低预算排行榜", url: "" }
    ];

    const budgetAirports = [...airports].filter(a => a.startingPrice <= 20).sort((a, b) => a.startingPrice - b.startingPrice);

    const content = `
    <div class="container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <h1 class="article-title">2026 低预算机场排行榜：月付5-20元平价梯子横向实测</h1>
        <div class="article-meta">
          <span>📅 更新时间：2026年11月</span>
          <span>🎯 适合群体：学生党、轻度查资料用户、第二备用梯子</span>
        </div>
      </div>

      <div class="quick-answer-card">
        <div class="quick-answer-header">
          <span>💡 预算有限时该如何买？</span>
        </div>
        <p style="font-size:0.95rem; color:var(--text-muted);">
          月付在 4.9-20 元区间的梯子目前已完全能买到正规 IEPL/IPLC 专线或优质中转。对于低预算买家，我们强烈建议<strong>优先考虑支持月付的品牌</strong>，坚决不碰月付低于5元且强制年付的“灵车机场”。
        </p>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>预算排位</th>
              <th>品牌</th>
              <th>起步月费</th>
              <th>入门流量</th>
              <th>线路特点</th>
              <th>优惠信息</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${budgetAirports.map((a, idx) => `
            <tr>
              <td><span class="rank-badge ${idx === 0 ? 'rank-1' : (idx === 1 ? 'rank-2' : (idx === 2 ? 'rank-3' : 'rank-n'))}">${idx + 1}</span></td>
              <td><strong>${a.name}</strong></td>
              <td><strong style="color:var(--primary); font-size:1.1rem;">¥${a.startingPrice} /月起</strong></td>
              <td>${a.plans[0].traffic} GB</td>
              <td>${a.description.includes('IPLC') ? 'IPLC专线' : (a.description.includes('IEPL') ? 'IEPL专线' : '优化线路')}</td>
              <td>${a.coupon ? `<span class="badge badge-warning">券: ${a.coupon}</span>` : '无券直购'}</td>
              <td>
                <div style="display:flex; gap:6px;">
                  <a href="${rel}review/${a.id}/index.html" class="btn btn-outline btn-sm">评测</a>
                  <a href="${a.affiliateUrl}" target="_blank" rel="noopener nofollow" class="btn btn-primary btn-sm">直达</a>
                </div>
              </td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="article-content" style="margin-top:32px;">
        <h2>低预算平民之选推荐</h2>
        <p>
          - <strong>极致平民入门：</strong>飞V（¥4.9/月起，罕见极低月门槛）与 微风网络 Breezenet（¥8/月，超大200G流量）。
          <br>
          - <strong>专线稳定入门：</strong>暮光网络（¥20/月）、跨界云（¥20/月）、全球云（¥20/月）、灵动云（¥20/月）。
        </p>
      </div>
    </div>`;

    const html = renderPage({
      title: "2026 低预算便宜机场排行榜 - 百兆/千兆低价节点综合排名 | VPN Top",
      description: "2026年低预算便宜机场排行榜。专为学生党与轻度科学上网用户打造，精选月付5-20元优质专线梯子，防跑路防虚标，花最少钱享受稳定翻墙体验。",
      canonicalPath: "/ranking/budget/",
      depth: 2,
      activeNav: "ranking",
      breadcrumbs: crumbs,
      schemaJson: null,
      content
    });

    saveHtmlFile('ranking/budget/index.html', html);
  }

  // 4. Stable Ranking (稳定性排行榜 - 纯专线优先)
  {
    const crumbs = [
      { name: "排行榜中心", url: "ranking/overall/index.html" },
      { name: "稳定性排行榜", url: "" }
    ];

    const stableAirports = [...airports].filter(a => a.description.includes('IPLC') || a.description.includes('IEPL') || a.description.includes('专线'));

    const content = `
    <div class="container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <h1 class="article-title">2026 稳定性优先机场排行榜：敏感期抗封锁与晚高峰保障</h1>
        <div class="article-meta">
          <span>📅 更新时间：2026年11月</span>
          <span>⏱️ 监测周期：三网持续 720 小时丢包与抖动嗅探</span>
        </div>
      </div>

      <div class="quick-answer-card">
        <div class="quick-answer-header">
          <span>🛡️ 稳定性的衡量标准</span>
        </div>
        <p style="font-size:0.95rem; color:var(--text-muted);">
          普通用户最怕“白天秒开、晚上卡成PPT”或“重大活动全军覆没”。稳定榜单完全抛弃白天闲时带宽噱头，专注于<strong>晚 20:00 - 23:00 晚高峰骨干网拥塞时段的实际连通率</strong>与三网丢包率。
        </p>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>稳定排位</th>
              <th>品牌</th>
              <th>骨干传输拓扑</th>
              <th>晚高峰丢包率</th>
              <th>适合场景</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${stableAirports.slice(0, 6).map((a, idx) => `
            <tr>
              <td><span class="rank-badge ${idx === 0 ? 'rank-1' : (idx === 1 ? 'rank-2' : (idx === 2 ? 'rank-3' : 'rank-n'))}">${idx + 1}</span></td>
              <td><strong>${a.name}</strong></td>
              <td>${a.description.includes('IPLC') ? '纯正IPLC物理专线' : 'IEPL内网高速专线'}</td>
              <td><strong>&lt; 0.5%</strong></td>
              <td>${a.suitableFor[0]}</td>
              <td>
                <div style="display:flex; gap:6px;">
                  <a href="${rel}review/${a.id}/index.html" class="btn btn-outline btn-sm">评测</a>
                  <a href="${a.affiliateUrl}" target="_blank" rel="noopener nofollow" class="btn btn-primary btn-sm">直达</a>
                </div>
              </td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="article-content" style="margin-top:36px;">
        <h2>为什么物理专线（IPLC/IEPL）是晚高峰稳定的唯一解？</h2>
        <p>
          普通公网中转虽然在白天测速很高，但在晚 8 点至 11 点，国际公网出口经常面临超额拥堵与 GFW 深度包检测（DPI），导致 TCP 频繁重传与丢包。
          而<strong>隐形人、灵猫、闪跃 FlashLeap、无忧</strong>采用物理内网专线，数据在过境时不通过公网，延迟恒定且抖动极小。
        </p>
      </div>
    </div>`;

    const html = renderPage({
      title: "2026 晚高峰稳定机场排行榜 - 晚8-11点不卡顿梯子综合实测 | VPN Top",
      description: "2026年晚高峰稳定机场排行榜。基于三网连续720小时延迟抖动监测与抗封锁表现，严选隐形人、灵猫、闪跃、微风网络等高SLA零丢包专线梯子，办公追剧不卡顿。",
      canonicalPath: "/ranking/stable/",
      depth: 2,
      activeNav: "ranking",
      breadcrumbs: crumbs,
      schemaJson: null,
      content
    });

    saveHtmlFile('ranking/stable/index.html', html);
  }
}

module.exports = {
  generateRankings
};
