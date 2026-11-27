/**
 * vpntop.click - Interactive Airport Comparison Engine
 * Pure Vanilla JS | Supports 2-4 Airports Dynamic Matrix | Mobile Scrollable
 */

(function () {
  // Candidate pool from unified database
  const airportsData = (typeof airports !== "undefined") ? airports : [
    {
      id: "wgetcloud",
      name: "WgetCloud (恶魔之眼)",
      startingPrice: 49,
      traffic: "120GB起",
      unitPrice: "0.408元/GB",
      lineType: "华为云顶级BGP Bidir专线",
      protocols: "Shadowsocks / Trojan / V2Ray",
      regions: "港/台/日/新/美/英/德",
      devices: "3 - 8 台",
      aiSupport: "ChatGPT / Claude / Gemini / Midjourney (全解锁)",
      streaming: "Netflix 4K / Disney+ / YouTube / HBO Max",
      features: "自研流量调度系统，晚高峰零丢包，三网延迟极低",
      cons: "起步价49元偏高，无亚非拉冷门节点"
    },
    {
      id: "kuromi",
      name: "Kuromi Network (黑猫)",
      startingPrice: 20,
      traffic: "100GB起",
      unitPrice: "0.200元/GB",
      lineType: "全IEPL内网高速专线",
      protocols: "Shadowsocks / V2Ray",
      regions: "港/台/日/新/美/韩/英/澳等20+地区",
      devices: "2 - 8 台",
      aiSupport: "ChatGPT / Claude / Gemini (原生解锁)",
      streaming: "Netflix / Disney+ / YouTube / DMM",
      features: "月付仅20元起，单GB低至0.125元，性价比极佳",
      cons: "轻量版限2台设备，冷门节点需手动选路"
    },
    {
      id: "tag",
      name: "TAG VPN",
      startingPrice: 33,
      traffic: "250GB/季起",
      unitPrice: "0.180元/GB",
      lineType: "全球IPLC物理内网专线",
      protocols: "Shadowsocks",
      regions: "全球90+国家与地区（含冷门小国与南极点）",
      devices: "5 - 10 台",
      aiSupport: "OpenAI / Claude / Perplexity / Copilot",
      streaming: "全球流媒体全区解锁 / BBC / DAZN",
      features: "节点国家覆盖量行业天花板，提供永久不限时套餐",
      cons: "起步需季付99元起，节点过多新手挑选耗时"
    },
    {
      id: "flyingbird",
      name: "FlyingBird (飞鸟机场)",
      startingPrice: 15,
      traffic: "100GB起",
      unitPrice: "0.150元/GB",
      lineType: "优质IEPL内网专线",
      protocols: "Shadowsocks",
      regions: "香港 / 台湾 / 日本 / 新加坡 / 美国 / 韩国",
      devices: "2 - 5 台",
      aiSupport: "ChatGPT / Claude / Gemini",
      streaming: "Netflix / Disney+ / YouTube 4K",
      features: "15元平民起步价，大流量套餐单GB低至0.09元",
      cons: "尝鲜套餐仅限2台设备，深夜客服工单偶有延迟"
    },
    {
      id: "duang",
      name: "DuangCloud",
      startingPrice: 40,
      traffic: "150GB起",
      unitPrice: "0.267元/GB",
      lineType: "老牌IEPL内网专线",
      protocols: "Shadowsocks / Vless",
      regions: "香港 / 台湾 / 日本 / 新加坡 / 美国 / 英国",
      devices: "3 - 8 台",
      aiSupport: "ChatGPT / Claude",
      streaming: "Netflix / Disney+ / YouTube Premium",
      features: "运营超5年老牌高SLA，严格控制用户密度，低抖动",
      cons: "中高端定价无极低套餐，邀请码阶段性关闭"
    }
  ];

  let selectedAirports = ["wgetcloud", "kuromi", "flyingbird"];

  function initCompare() {
    renderSelectors();
    renderCompareTable();
  }

  function renderSelectors() {
    const selectorContainer = document.getElementById("compare-selectors");
    if (!selectorContainer) return;

    selectorContainer.innerHTML = "";
    
    selectedAirports.forEach((id, index) => {
      const selectBox = document.createElement("div");
      selectBox.className = "compare-select-item";
      selectBox.innerHTML = `
        <label style="font-weight:600; font-size:0.85rem; color:var(--text-muted); display:block; margin-bottom:4px;">
          对比席位 ${index + 1}
        </label>
        <select class="compare-dropdown" data-index="${index}">
          ${airportsData.map(a => `<option value="${a.id}" ${a.id === id ? 'selected' : ''}>${a.name}</option>`).join('')}
        </select>
        ${selectedAirports.length > 2 ? `<button type="button" class="btn btn-outline btn-sm remove-slot" data-index="${index}" style="margin-left:6px; padding:6px 10px;">移除</button>` : ''}
      `;
      selectorContainer.appendChild(selectBox);
    });

    if (selectedAirports.length < 4) {
      const addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "btn btn-outline btn-sm";
      addBtn.textContent = "+ 添加对比席位 (最多4个)";
      addBtn.style.alignSelf = "flex-end";
      addBtn.style.height = "42px";
      addBtn.addEventListener("click", function () {
        const unused = airportsData.find(a => !selectedAirports.includes(a.id));
        if (unused) {
          selectedAirports.push(unused.id);
        } else {
          selectedAirports.push(airportsData[0].id);
        }
        initCompare();
      });
      selectorContainer.appendChild(addBtn);
    }

    // Attach change handlers
    document.querySelectorAll(".compare-dropdown").forEach(dropdown => {
      dropdown.addEventListener("change", function () {
        const idx = parseInt(this.getAttribute("data-index"), 10);
        selectedAirports[idx] = this.value;
        renderCompareTable();
      });
    });

    // Attach remove handlers
    document.querySelectorAll(".remove-slot").forEach(btn => {
      btn.addEventListener("click", function () {
        const idx = parseInt(this.getAttribute("data-index"), 10);
        selectedAirports.splice(idx, 1);
        initCompare();
      });
    });
  }

  function renderCompareTable() {
    const tableContainer = document.getElementById("compare-table-target");
    if (!tableContainer) return;

    const currentAirports = selectedAirports.map(id => airportsData.find(a => a.id === id)).filter(Boolean);

    if (currentAirports.length === 0) {
      tableContainer.innerHTML = `<div class="notice-box">请至少选择一家机场进行对比。</div>`;
      return;
    }

    const rows = [
      { label: "起步月费", getter: a => `<strong>¥${a.startingPrice}</strong> /月起` },
      { label: "套餐起始流量", getter: a => a.traffic },
      { label: "每GB单价预估", getter: a => `<span style="color:var(--primary); font-weight:700;">${a.unitPrice}</span>` },
      { label: "骨干传输线路", getter: a => a.lineType },
      { label: "支持协议", getter: a => a.protocols },
      { label: "节点地区覆盖", getter: a => a.regions },
      { label: "同时在线设备", getter: a => a.devices },
      { label: "AI 大模型解锁", getter: a => `<span style="color:var(--success); font-weight:600;">${a.aiSupport}</span>` },
      { label: "4K 流媒体支持", getter: a => a.streaming },
      { label: "核心优势", getter: a => a.features },
      { label: "需注意的短板", getter: a => `<span style="color:var(--danger);">${a.cons}</span>` },
      { 
        label: "深入测评详情", 
        getter: a => `<a href="../review/${a.id}/index.html" class="btn btn-outline btn-sm">查看 ${a.name.split(' ')[0]} 完整测评 &rarr;</a>` 
      }
    ];

    let html = `
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 180px; min-width: 140px;">比较指标</th>
              ${currentAirports.map(a => `
                <th style="text-align: center; min-width: 220px;">
                  <div style="font-size:1.1rem; font-weight:700; color:var(--secondary);">${a.name}</div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map(row => `
              <tr>
                <td style="font-weight:600; background-color:var(--bg-alt);">${row.label}</td>
                ${currentAirports.map(a => `<td style="text-align:center;">${row.getter(a)}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    tableContainer.innerHTML = html;
  }

  document.addEventListener("DOMContentLoaded", initCompare);
})();
