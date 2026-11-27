const { airports } = require('../data/airports.js');
const { DOMAIN, renderPage, saveHtmlFile } = require('./template.js');

function generateCompare() {
  const depth = 1;
  const rel = '../';

  const crumbs = [
    { name: "机场工具", url: "compare/index.html" },
    { name: "横向对比工具", url: "" }
  ];

  const content = `
  <div class="container" style="padding-top:40px; padding-bottom:60px;">
    <div class="article-header">
      <h1 class="article-title">机场横向对比工具：多维度参数对齐选购</h1>
      <div class="article-meta">
        <span>🔄 交互特性：支持在 14 家核验品牌中自由选择 2-4 家并排对比</span>
        <span>📊 数据依据：统一数据源，严格核查</span>
        <span>⚡ 模式：纯原生 JS 运行，支持横向拖拽与差异高亮</span>
      </div>
    </div>

    <div class="quick-answer-card">
      <div class="quick-answer-header">
        <span>🎯 如何使用本对比工具？</span>
      </div>
      <p style="color:var(--text-muted); font-size:0.95rem;">
        在下方选择框中挑选您正在纠结的机场品牌，系统将自动对比<strong>起始门槛、测算每GB单价、专线骨干类型、支持协议、AI/4K流媒体解锁能力及缺点短板</strong>。即使在无 JavaScript 环境下，下方也已预渲染主流对比矩阵。
      </p>
    </div>

    <!-- Dynamic Selector Toolbar -->
    <div style="background-color:#fff; border:1px solid var(--border); border-radius:var(--radius-md); padding:20px; margin:24px 0;">
      <h3 style="font-size:1.1rem; margin-bottom:12px; color:var(--secondary);">配置对比席位（14家候选品牌）</h3>
      <div id="compare-selectors" class="compare-select-row">
        <!-- Injected via compare.js -->
        <noscript>
          <div class="notice-box">JavaScript 已被禁用，下方已为您直接呈现全量机场对比矩阵。</div>
        </noscript>
      </div>
    </div>

    <!-- Target Comparison Matrix (Pre-rendered for SEO & dynamic update) -->
    <div id="compare-table-target">
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:160px;">对比维度</th>
              ${airports.map(a => `<th style="text-align:center;"><div style="font-size:1.05rem; font-weight:700;">${a.name}</div></th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-weight:600; background-color:var(--bg-alt);">起步月费门槛</td>
              ${airports.map(a => `<td style="text-align:center;"><strong>¥${a.startingPrice}</strong> /月起</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight:600; background-color:var(--bg-alt);">起始套餐流量</td>
              ${airports.map(a => `<td style="text-align:center;">${a.plans[0].traffic} GB</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight:600; background-color:var(--bg-alt);">每GB单价预估</td>
              ${airports.map(a => `<td style="text-align:center; color:var(--primary); font-weight:700;">${a.plans[0].unitPricePerGb ? a.plans[0].unitPricePerGb.toFixed(3) + ' 元/GB' : '按需折算'}</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight:600; background-color:var(--bg-alt);">骨干线路类型</td>
              ${airports.map(a => `<td style="text-align:center;">${a.description.includes('IPLC') ? 'IPLC纯专线' : (a.description.includes('IEPL') ? 'IEPL专线' : '优质中转/专线')}</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight:600; background-color:var(--bg-alt);">支持协议</td>
              ${airports.map(a => `<td style="text-align:center;">${a.protocols.join(', ')}</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight:600; background-color:var(--bg-alt);">专属优惠码</td>
              ${airports.map(a => `<td style="text-align:center;">${a.coupon ? `<span class="badge badge-warning">券: ${a.coupon}</span>` : '无券直购'}</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight:600; background-color:var(--bg-alt);">同时在线设备</td>
              ${airports.map(a => `<td style="text-align:center;">${a.deviceLimit}</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight:600; background-color:var(--bg-alt);">AI 大模型解锁</td>
              ${airports.map(a => `<td style="text-align:center; color:var(--success); font-weight:600;">${a.aiSupport.slice(0, 2).join('/')}</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight:600; background-color:var(--bg-alt);">4K 流媒体</td>
              ${airports.map(a => `<td style="text-align:center;">${a.streamingSupport.slice(0, 2).join('/')}</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight:600; background-color:var(--bg-alt);">需注意的短板</td>
              ${airports.map(a => `<td style="text-align:center; color:var(--danger); font-size:0.85rem;">${a.disadvantages[0]}</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight:600; background-color:var(--bg-alt);">评测与官网直达</td>
              ${airports.map(a => `
                <td style="text-align:center;">
                  <div style="display:flex; flex-direction:column; gap:6px;">
                    <a href="${rel}review/${a.id}/index.html" class="btn btn-outline btn-sm">评测报告</a>
                    <a href="${a.affiliateUrl}" target="_blank" rel="noopener nofollow" class="btn btn-primary btn-sm">官网直达</a>
                  </div>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="article-content" style="margin-top:40px;">
      <h2>横向比较核心维度说明</h2>
      <p>
        <strong>1. 线路架构优劣：</strong>IPLC 专线物理点对点直连不经过公网防火墙；IEPL 专线成本适中且晚高峰稳定性远超公网直连；优质中转则兼顾弹性与带宽储备。
      </p>
      <p>
        <strong>2. 单价陷阱识别：</strong>很多机场故意用 0.1x 倍率节点虚晃一枪，但该节点经常处于断连状态。实际使用中，优质节点的倍率通常为 1.0x。
      </p>
    </div>
  </div>
  <script src="${rel}data/airports.js"></script>
  <script src="${rel}js/compare.js"></script>`;

  const html = renderPage({
    title: "机场横向对比工具 - 实时对比价格/流量/专线/解锁能力 | VPN Top",
    description: "专业机场横向对比工具。支持在14家品牌中自由并排参数对齐，实时比较月费门槛、实际每GB单价、骨干专线资质、ChatGPT与4K流媒体原生解锁能力，帮您快速做出明智选择。",
    canonicalPath: "/compare/",
    depth: 1,
    activeNav: "compare",
    breadcrumbs: crumbs,
    schemaJson: null,
    content
  });

  saveHtmlFile('compare/index.html', html);
}

module.exports = {
  generateCompare
};
