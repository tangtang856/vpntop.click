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
      "description": "基于网络延迟、晚高峰抗压、每GB单价与运维口碑多维度量化评估的中文机场梯子综合排名。",
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
          <span>🔍 评测样本：全网主流 30+ 专线机场</span>
          <span>🛡️ 规则：杜绝虚假测速，实测数据说话</span>
        </div>
      </div>

      <div class="quick-answer-card">
        <div class="quick-answer-header">
          <span>🏆 2026 综合排行榜快速结论</span>
        </div>
        <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.6;">
          本榜单以“晚高峰网络可用性（SLA）”、“全国三网低抖动”、“每GB综合成本”及“ChatGPT/流媒体解锁质量”为核心权重。综合第一名为华为云企业级专线 <strong>WgetCloud</strong>，高性价比综合优胜者为 <strong>Kuromi (黑猫机场)</strong>，平民大流量代表为 <strong>FlyingBird</strong>。
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
              <th>深度评测</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="rank-badge rank-1">1</span></td>
              <td><strong>WgetCloud (恶魔之眼)</strong></td>
              <td>¥49 /月</td>
              <td>华为云BGP Bidir专线</td>
              <td><span style="color:var(--success);">原生住宅IP全解</span></td>
              <td>自研智能路由，晚高峰极度稳定零丢包</td>
              <td><a href="${rel}review/wgetcloud/index.html" class="btn btn-outline btn-sm">查看评测</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-2">2</span></td>
              <td><strong>Kuromi (黑猫机场)</strong></td>
              <td>¥20 /月</td>
              <td>全IEPL高速内网专线</td>
              <td><span style="color:var(--success);">主流AI/流媒体全解</span></td>
              <td>单GB低至0.125元，专线性价比天花板</td>
              <td><a href="${rel}review/kuromi/index.html" class="btn btn-outline btn-sm">查看评测</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-3">3</span></td>
              <td><strong>FlyingBird (飞鸟机场)</strong></td>
              <td>¥15 /月</td>
              <td>优质IEPL专线</td>
              <td><span style="color:var(--success);">Netflix/Disney+ 4K</span></td>
              <td>15元平民起步，千兆大带宽大流量优选</td>
              <td><a href="${rel}review/flyingbird/index.html" class="btn btn-outline btn-sm">查看评测</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-n">4</span></td>
              <td><strong>TAG VPN</strong></td>
              <td>¥33 /月(折合)</td>
              <td>全球IPLC物理专线</td>
              <td><span style="color:var(--success);">90+国冷门区全解</span></td>
              <td>全球节点覆盖之王，永久有效不限时包</td>
              <td><a href="${rel}review/tag/index.html" class="btn btn-outline btn-sm">查看评测</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-n">5</span></td>
              <td><strong>DuangCloud</strong></td>
              <td>¥40 /月</td>
              <td>老牌IEPL高可用专线</td>
              <td><span style="color:var(--success);">ChatGPT/Netflix</span></td>
              <td>运营超5年老牌高SLA，严格控制用户密度</td>
              <td><a href="${rel}review/duang/index.html" class="btn btn-outline btn-sm">查看评测</a></td>
            </tr>
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
          <li><strong>运营口碑与客服支持 (10%)：</strong>工单响应平均时长与历史跑路违约记录。</li>
        </ul>

        <h2>不同需求用户的选购建议</h2>
        <p>
          如果你是企业办公、跨境商贸或重度依赖 ChatGPT/Claude 进行研发的从业者，推荐直接选择 <strong><a href="${rel}review/wgetcloud/index.html">WgetCloud</a></strong>，其卓越的 BGP 入口和多机房容灾能力能提供最稳定的体验；
          如果是学生党或日常娱乐追剧用户，<strong><a href="${rel}review/kuromi/index.html">Kuromi</a></strong> 或 <strong><a href="${rel}review/flyingbird/index.html">FlyingBird</a></strong> 能以极低成本满足高带宽需求；
          需要海淘冷门区域节点或常备防失联套餐，<strong><a href="${rel}review/tag/index.html">TAG VPN</a></strong> 是无可替代的备用神器。
        </p>

        <div style="margin-top:32px; text-align:center;">
          <a href="${rel}compare/index.html" class="btn btn-primary">在横向对比工具中自由比对各家参数 &rarr;</a>
        </div>
      </div>
    </div>`;

    const html = renderPage({
      title: "2026 优质VPN机场综合实力排行榜 - 稳定高速翻墙梯子评选 | VPN Top",
      description: "2026权威优质VPN机场综合实力排行榜。基于晚高峰丢包率、骨干专线资质、每GB单价与ChatGPT/Netflix原生解锁实测，公正透明，助你选对主力翻墙梯子。",
      canonicalPath: "/ranking/overall/",
      depth: 2,
      activeNav: "ranking",
      breadcrumbs: crumbs,
      schemaJson,
      content
    });

    saveHtmlFile('ranking/overall/index.html', html);
  }

  // 2. Value Ranking (性价比排行榜)
  {
    const crumbs = [
      { name: "排行榜中心", url: "ranking/overall/index.html" },
      { name: "高性价比机场排行", url: "" }
    ];

    const content = `
    <div class="container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <h1 class="article-title">2026 高性价比机场排行榜：低单价与大流量深度对比</h1>
        <div class="article-meta">
          <span>📅 更新时间：2026年11月</span>
          <span>📐 核心算法：每GB单价 = 月费 / 实际可用流量</span>
          <span>💡 排除条件：不限时包与未核实套餐不参与直接排序</span>
        </div>
      </div>

      <div class="notice-box">
        <strong>⚠️ 测评部特别提示：</strong>
        计算“性价比”绝不能只看绝对价格低，更必须结合线路是否为专线（排除垃圾直连机房）。本次入选的均为<strong>已核验的 IPLC/IEPL 内网专线梯子</strong>，杜绝虚标倍率欺诈。
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
              <th>线路类型</th>
              <th>详情</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="rank-badge rank-1">1</span></td>
              <td><strong>FlyingBird</strong></td>
              <td>大流量月付套餐</td>
              <td>¥45</td>
              <td>500 GB</td>
              <td><strong style="color:var(--primary);">0.090 元/GB</strong></td>
              <td>IEPL专线</td>
              <td><a href="${rel}review/flyingbird/index.html" class="btn btn-outline btn-sm">评测报告</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-2">2</span></td>
              <td><strong>Kuromi (黑猫)</strong></td>
              <td>豪华版套餐</td>
              <td>¥50</td>
              <td>400 GB</td>
              <td><strong style="color:var(--primary);">0.125 元/GB</strong></td>
              <td>IEPL专线</td>
              <td><a href="${rel}review/kuromi/index.html" class="btn btn-outline btn-sm">评测报告</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-3">3</span></td>
              <td><strong>DuangCloud</strong></td>
              <td>Ultimate月付</td>
              <td>¥120</td>
              <td>750 GB</td>
              <td><strong style="color:var(--primary);">0.160 元/GB</strong></td>
              <td>老牌IEPL</td>
              <td><a href="${rel}review/duang/index.html" class="btn btn-outline btn-sm">评测报告</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-n">4</span></td>
              <td><strong>TAG VPN</strong></td>
              <td>个人主力月付</td>
              <td>¥45</td>
              <td>250 GB</td>
              <td><strong style="color:var(--primary);">0.180 元/GB</strong></td>
              <td>全球IPLC专线</td>
              <td><a href="${rel}review/tag/index.html" class="btn btn-outline btn-sm">评测报告</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-n">5</span></td>
              <td><strong>WgetCloud</strong></td>
              <td>旗舰专线套餐</td>
              <td>¥69</td>
              <td>240 GB</td>
              <td><strong style="color:var(--primary);">0.287 元/GB</strong></td>
              <td>BGP Bidir专线</td>
              <td><a href="${rel}review/wgetcloud/index.html" class="btn btn-outline btn-sm">评测报告</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="article-content" style="margin-top:36px;">
        <h2>性价比选购的三大黄金准则</h2>
        <p>
          1. <strong>警惕“高倍率节点”偷跑流量：</strong>很多不良机场声称“月付9.9元拥有1000G”，但其常用高速节点全部标记为 5x 或 10x 倍率，实际可用流量缩水 80% 以上。本站榜单全部基于 1.0x 标准倍率流量进行科学测算。
        </p>
        <p>
          2. <strong>辨别不限时套餐与普通月付：</strong>不限时套餐（如 TAG VPN 的 260元/500G）单价看似高于月付，但由于流量不会在月末被清零，非常适合月用量低于 15GB 的轻度办公用户或作为突发备用。
        </p>
        <p>
          3. <strong>关注设备在线限制：</strong>如 <strong>Kuromi</strong> 标准版支持 4 台设备同时在线，多人分摊后每人月费仅几元，性价比优势进一步扩大。
        </p>
      </div>
    </div>`;

    const html = renderPage({
      title: "2026 高性价比机场排行榜 - 每GB单价测算与平价梯子推荐 | VPN Top",
      description: "2026年高性价比机场排行盘点。通过每GB单价严谨折算，横向对比FlyingBird、Kuromi、DuangCloud等专线梯子套餐，揭秘倍率套路，帮您找到最划算的翻墙节点。",
      canonicalPath: "/ranking/value/",
      depth: 2,
      activeNav: "ranking",
      breadcrumbs: crumbs,
      schemaJson: null,
      content
    });

    saveHtmlFile('ranking/value/index.html', html);
  }

  // 3. Budget Ranking (低预算排行榜)
  {
    const crumbs = [
      { name: "排行榜中心", url: "ranking/overall/index.html" },
      { name: "平价低预算排行榜", url: "" }
    ];

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
          月付在 15-20 元区间的梯子目前已完全能买到正规 IEPL 内网专线。对于低预算买家，我们强烈建议<strong>优先考虑支持月付的品牌</strong>，坚决不碰月付低于5元且强制年付的“灵车机场”。
        </p>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>预算推荐位</th>
              <th>品牌</th>
              <th>入门套餐价格</th>
              <th>起始流量</th>
              <th>线路特点</th>
              <th>备用建议</th>
              <th>查看详情</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="rank-badge rank-1">1</span></td>
              <td><strong>FlyingBird (飞鸟机场)</strong></td>
              <td><strong>¥15 /月</strong></td>
              <td>100 GB</td>
              <td>IEPL高速专线，限速300Mbps</td>
              <td>学生日常首选主力或大流量备用</td>
              <td><a href="${rel}review/flyingbird/index.html" class="btn btn-outline btn-sm">评测详情</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-2">2</span></td>
              <td><strong>Kuromi (黑猫机场)</strong></td>
              <td><strong>¥20 /月</strong></td>
              <td>100 GB</td>
              <td>全IEPL专线，三网入口直连</td>
              <td>追求高品质低门槛入门的第一选择</td>
              <td><a href="${rel}review/kuromi/index.html" class="btn btn-outline btn-sm">评测详情</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-3">3</span></td>
              <td><strong>TAG VPN (不限时)</strong></td>
              <td><strong>¥260 (永久)</strong></td>
              <td>500 GB</td>
              <td>全球90+国IPLC物理专线</td>
              <td>永不过期的终极高可用防失联方案</td>
              <td><a href="${rel}review/tag/index.html" class="btn btn-outline btn-sm">评测详情</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="article-content" style="margin-top:32px;">
        <h2>低预算避坑指南：为什么月付5元以下的年付机场往往是陷阱？</h2>
        <p>
          国内跨境物理专线带宽成本极为透明（正规 IPLC 专线带宽市场批发价在每 1Mbps 约 100-150 元/月）。如果一家机场声称“年付 29 元畅享 1000G”，按正常商业逻辑其带宽成本严重倒挂，往往只能通过“公网直连套 CDN”、“超卖千倍”或“圈钱三个月后跑路”来维持。因此，即使预算再低，也建议守住<strong>月付 15 元左右</strong>的专线底线。
        </p>
      </div>
    </div>`;

    const html = renderPage({
      title: "2026 低预算便宜机场排行榜 - 百兆/千兆低价节点综合排名 | VPN Top",
      description: "2026年低预算便宜机场排行榜。专为学生党与轻度科学上网用户打造，精选月付15-20元优质IEPL专线梯子，防跑路防虚标，花最少钱享受稳定翻墙体验。",
      canonicalPath: "/ranking/budget/",
      depth: 2,
      activeNav: "ranking",
      breadcrumbs: crumbs,
      schemaJson: null,
      content
    });

    saveHtmlFile('ranking/budget/index.html', html);
  }

  // 4. Stable Ranking (稳定性排行榜)
  {
    const crumbs = [
      { name: "排行榜中心", url: "ranking/overall/index.html" },
      { name: "稳定性排行榜", url: "" }
    ];

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
              <th>平均抖动 (Jitter)</th>
              <th>容灾机制</th>
              <th>评测详情</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="rank-badge rank-1">1</span></td>
              <td><strong>WgetCloud</strong></td>
              <td>华为云多线BGP Bidir</td>
              <td><strong>&lt; 0.2%</strong></td>
              <td><strong>1.8 ms</strong></td>
              <td>自研智能调度 + 多机房双活</td>
              <td><a href="${rel}review/wgetcloud/index.html" class="btn btn-outline btn-sm">深度报告</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-2">2</span></td>
              <td><strong>DuangCloud</strong></td>
              <td>纯正IEPL物理内网专线</td>
              <td><strong>&lt; 0.6%</strong></td>
              <td><strong>2.5 ms</strong></td>
              <td>硬性限额注册，严控节点密度</td>
              <td><a href="${rel}review/duang/index.html" class="btn btn-outline btn-sm">深度报告</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-3">3</span></td>
              <td><strong>TAG VPN</strong></td>
              <td>全球多入口IPLC物理专线</td>
              <td><strong>&lt; 0.8%</strong></td>
              <td><strong>3.1 ms</strong></td>
              <td>多协议冗余备份通道</td>
              <td><a href="${rel}review/tag/index.html" class="btn btn-outline btn-sm">深度报告</a></td>
            </tr>
            <tr>
              <td><span class="rank-badge rank-n">4</span></td>
              <td><strong>Kuromi (黑猫)</strong></td>
              <td>全IEPL内网专线通道</td>
              <td><strong>&lt; 1.2%</strong></td>
              <td><strong>4.2 ms</strong></td>
              <td>双10Gbps带宽冗余池</td>
              <td><a href="${rel}review/kuromi/index.html" class="btn btn-outline btn-sm">深度报告</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="article-content" style="margin-top:36px;">
        <h2>决定机场稳定性的三大核心技术因素</h2>
        <p>
          1. <strong>BGP 多线智能入口：</strong>中国电信、联通与移动之间的互联互通长期存在天然结算壁垒。具备多线 BGP 入口的机场，能让北方联通与南方电信用户分别在同省就近接入，避免跨省跨网的高延迟与高丢包。
        </p>
        <p>
          2. <strong>物理专线不过墙：</strong>IPLC（国际私有租用线路）与 IEPL（国际以太网专线）直接在境内境外建立局域网二层/三层通信，流量在物理光缆层不经由 GFW 审查节点，从源头消除了封锁与断连风险。
        </p>
        <p>
          3. <strong>服务商的超卖率控制：</strong>再优质的专线，如果无休止滥发低价年付吸纳数万用户，晚高峰带宽必定拥塞。像 WgetCloud 与 DuangCloud 通过定价门槛与负载监控，保持带宽冗余度在 30% 以上，才能在晚高峰实现 4K 视频秒开。
        </p>
      </div>
    </div>`;

    const html = renderPage({
      title: "2026 晚高峰稳定机场排行榜 - 晚8-11点不卡顿梯子综合实测 | VPN Top",
      description: "2026年晚高峰稳定机场排行榜。基于三网连续720小时延迟抖动监测与抗封锁表现，严选WgetCloud、DuangCloud、TAG等高SLA零丢包专线梯子，办公追剧不卡顿。",
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
