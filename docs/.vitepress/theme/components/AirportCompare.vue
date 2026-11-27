<template>
  <div class="compare-wrapper">
    <div class="selector-bar">
      <div class="selector-title">选择要对比的机场品牌（最多4家）：</div>
      <div class="tags-group">
        <button
          v-for="a in allAirports"
          :key="a.id"
          class="tag-btn"
          :class="{ active: selectedIds.includes(a.id) }"
          @click="toggleAirport(a.id)"
        >
          {{ a.name }}
          <span v-if="selectedIds.includes(a.id)">✓</span>
        </button>
      </div>
    </div>

    <div v-if="selectedAirports.length < 2" class="empty-state">
      💡 请至少选择 2 家机场进行横向比对（当前已选 {{ selectedAirports.length }} 家）。
    </div>

    <div v-else class="table-responsive">
      <table class="compare-table">
        <thead>
          <tr>
            <th style="width: 130px;">对比维度</th>
            <th v-for="a in selectedAirports" :key="a.id" style="min-width: 200px;">
              <div class="brand-header">
                <strong>{{ a.name }}</strong>
                <button class="remove-btn" @click="toggleAirport(a.id)" title="移除此项">✕</button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="dim-label">起步价格</td>
            <td v-for="a in selectedAirports" :key="a.id">
              <span class="price-val">¥{{ a.startingPrice }}</span> /月
            </td>
          </tr>
          <tr>
            <td class="dim-label">入门流量</td>
            <td v-for="a in selectedAirports" :key="a.id">
              <strong>{{ a.plans[0]?.traffic || '详见官网' }} GB</strong>
            </td>
          </tr>
          <tr>
            <td class="dim-label">每GB估算单价</td>
            <td v-for="a in selectedAirports" :key="a.id">
              ¥{{ a.plans[0]?.unitPricePerGb?.toFixed(3) || '0.000' }} /GB
            </td>
          </tr>
          <tr>
            <td class="dim-label">骨干线路架构</td>
            <td v-for="a in selectedAirports" :key="a.id">
              {{ a.plans[0]?.features[3] || '高速专线' }}
            </td>
          </tr>
          <tr>
            <td class="dim-label">传输协议支持</td>
            <td v-for="a in selectedAirports" :key="a.id">
              <div class="badge-list">
                <span v-for="p in a.protocols" :key="p" class="badge">{{ p }}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="dim-label">节点覆盖区域</td>
            <td v-for="a in selectedAirports" :key="a.id">
              {{ a.regions.join('、') }}
            </td>
          </tr>
          <tr>
            <td class="dim-label">设备数量限制</td>
            <td v-for="a in selectedAirports" :key="a.id">
              {{ a.deviceLimit }}
            </td>
          </tr>
          <tr>
            <td class="dim-label">AI / ChatGPT</td>
            <td v-for="a in selectedAirports" :key="a.id">
              <span class="badge badge-success">{{ a.aiSupport.join('、') }}</span>
            </td>
          </tr>
          <tr>
            <td class="dim-label">4K 流媒体解锁</td>
            <td v-for="a in selectedAirports" :key="a.id">
              {{ a.streamingSupport.join('、') }}
            </td>
          </tr>
          <tr>
            <td class="dim-label">核心优势</td>
            <td v-for="a in selectedAirports" :key="a.id">
              <ul class="prop-list">
                <li v-for="(adv, i) in a.advantages.slice(0, 3)" :key="i">✓ {{ adv }}</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="dim-label">注意事项/短板</td>
            <td v-for="a in selectedAirports" :key="a.id">
              <ul class="prop-list warn-list">
                <li v-for="(dis, i) in a.disadvantages" :key="i">⚠️ {{ dis }}</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="dim-label">专属优惠与直达</td>
            <td v-for="a in selectedAirports" :key="a.id">
              <div v-if="a.coupon" class="coupon-tag">券码: {{ a.coupon }}</div>
              <div class="action-btns">
                <a :href="'/review/' + a.id" class="btn-sub">详细评测</a>
                <a :href="a.affiliateUrl" target="_blank" rel="noopener noreferrer" class="btn-main">直达官网</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { airports } from '../../data/airports';

const allAirports = airports;
// Default select first 3
const selectedIds = ref<string[]>([airports[0].id, airports[1].id, airports[2].id]);

const selectedAirports = computed(() => {
  return allAirports.filter(a => selectedIds.value.includes(a.id));
});

function toggleAirport(id: string) {
  const index = selectedIds.value.indexOf(id);
  if (index > -1) {
    selectedIds.value.splice(index, 1);
  } else {
    if (selectedIds.value.length >= 4) {
      alert('最多只能同时对比 4 家机场');
      return;
    }
    selectedIds.value.push(id);
  }
}
</script>

<style scoped>
.compare-wrapper {
  margin: 24px 0;
}

.selector-bar {
  background: var(--vp-c-bg-soft);
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 24px;
}

.selector-title {
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.tags-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag-btn {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.tag-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.tag-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.empty-state {
  padding: 30px;
  text-align: center;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  color: var(--vp-c-text-2);
}

.table-responsive {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 !important;
  font-size: 0.9rem;
}

.compare-table th, .compare-table td {
  padding: 14px 16px;
  border: 1px solid var(--vp-c-divider);
  vertical-align: top;
}

.compare-table th {
  background: var(--vp-c-bg-soft);
}

.brand-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}
.remove-btn:hover {
  color: #ef4444;
}

.dim-label {
  font-weight: 600;
  background: var(--vp-c-bg-soft);
  white-space: nowrap;
}

.price-val {
  font-weight: 700;
  color: #ef4444;
  font-size: 1.1rem;
}

.badge-list {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.badge {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}

.badge-success {
  color: #059669;
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
}

.prop-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.6;
}

.warn-list {
  color: #b45309;
}

.coupon-tag {
  font-size: 0.8rem;
  font-family: monospace;
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  padding: 2px 6px;
  border-radius: 4px;
  margin-bottom: 8px;
  display: inline-block;
}

.action-btns {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 6px;
}

.btn-sub, .btn-main {
  font-size: 0.8rem;
  padding: 5px 10px;
  border-radius: 4px;
  text-decoration: none;
}

.btn-sub {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.btn-main {
  background: var(--vp-c-brand-1);
  color: #fff;
  font-weight: 600;
}
</style>
