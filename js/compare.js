/**
 * vpntop.click - Interactive Airport Comparison Engine (14 Brands)
 * Pure Vanilla JS | Supports 2-4 Airports Dynamic Matrix | Mobile Scrollable
 */

(function () {
  // Candidate pool from unified database
  const airportsData = (typeof airports !== "undefined") ? airports : [];

  let selectedAirports = ["breezenet", "feiv", "yinxingren", "lingmao"];

  function initCompare() {
    // If airportsData has items, make sure selectedAirports are valid
    if (airportsData.length > 0) {
      selectedAirports = selectedAirports.filter(id => airportsData.some(a => a.id === id));
      if (selectedAirports.length < 2) {
        selectedAirports = airportsData.slice(0, 3).map(a => a.id);
      }
    }
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

    if (selectedAirports.length < 4 && selectedAirports.length < airportsData.length) {
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
      { label: "起始套餐流量", getter: a => `${a.plans[0].traffic} GB` },
      { label: "每GB单价预估", getter: a => `<span style="color:var(--primary); font-weight:700;">${a.plans[0].unitPricePerGb ? a.plans[0].unitPricePerGb.toFixed(3) + ' 元/GB' : '按需'}</span>` },
      { label: "专属优惠码", getter: a => a.coupon ? `<span class="badge badge-warning">券: ${a.coupon}</span>` : '暂无专属券' },
      { label: "骨干传输线路", getter: a => a.description.includes('IPLC') ? 'IPLC纯专线' : (a.description.includes('IEPL') ? 'IEPL内网专线' : '优质优化中转') },
      { label: "支持协议", getter: a => a.protocols.join(' / ') },
      { label: "节点地区覆盖", getter: a => a.regions.slice(0, 4).join('/') },
      { label: "同时在线设备", getter: a => a.deviceLimit },
      { label: "AI 大模型解锁", getter: a => `<span style="color:var(--success); font-weight:600;">${a.aiSupport.slice(0, 3).join('/')}</span>` },
      { label: "4K 流媒体支持", getter: a => a.streamingSupport.slice(0, 3).join('/') },
      { label: "核心优势", getter: a => a.advantages[0] },
      { label: "需注意的短板", getter: a => `<span style="color:var(--danger);">${a.disadvantages[0]}</span>` },
      { 
        label: "深入测评与官网直达", 
        getter: a => `
          <div style="display:flex; flex-direction:column; gap:6px;">
            <a href="../review/${a.id}/index.html" class="btn btn-outline btn-sm">查看 ${a.name.split(' ')[0]} 完整测评 &rarr;</a>
            <a href="${a.affiliateUrl}" target="_blank" rel="noopener nofollow" class="btn btn-primary btn-sm">官网注册直达 &rarr;</a>
          </div>
        ` 
      }
    ];

    let html = `
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 170px; min-width: 140px;">比较指标</th>
              ${currentAirports.map(a => `
                <th style="text-align: center; min-width: 220px;">
                  <div style="font-size:1.1rem; font-weight:700; color:var(--secondary);">${a.name}</div>
                  ${a.coupon ? `<div style="font-size:0.75rem; color:var(--warning); font-weight:600; margin-top:2px;">专属券: ${a.coupon}</div>` : ''}
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
