<template>
  <div class="airport-table-wrapper">
    <div class="table-responsive">
      <table class="airport-table">
        <thead>
          <tr>
            <th style="width: 60px;">排名</th>
            <th>品牌名称</th>
            <th>起步价格</th>
            <th>入门流量</th>
            <th>骨干传输线路</th>
            <th>适合人群</th>
            <th>专属优惠</th>
            <th style="width: 170px; text-align: center;">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(airport, index) in airportList" :key="airport.id">
            <td class="text-center">
              <span class="rank-badge" :class="'rank-' + (index + 1)">{{ index + 1 }}</span>
            </td>
            <td>
              <div class="airport-name">
                <a :href="'/review/' + airport.id" class="name-link">{{ airport.name }}</a>
              </div>
              <div class="protocols-tag">
                <span v-for="p in airport.protocols" :key="p" class="protocol-badge">{{ p }}</span>
              </div>
            </td>
            <td>
              <span class="price-val">¥{{ airport.startingPrice }}</span>
              <span class="price-unit">/月</span>
            </td>
            <td>
              <span class="traffic-val">{{ airport.plans[0]?.traffic || '详见官网' }}GB</span>
            </td>
            <td>
              <span class="line-badge">{{ airport.plans[0]?.features[3] || '高速专线' }}</span>
            </td>
            <td class="suitable-text">
              {{ airport.suitableFor[0] }}
            </td>
            <td>
              <div v-if="airport.coupon" class="coupon-box" @click="copyCoupon(airport.coupon)">
                <span class="coupon-code">{{ airport.coupon }}</span>
                <span class="copy-hint">{{ copiedCode === airport.coupon ? '已复制!' : '复制' }}</span>
              </div>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="actions-cell">
              <a :href="'/review/' + airport.id" class="btn-sub">评测</a>
              <a :href="airport.affiliateUrl" target="_blank" rel="noopener noreferrer" class="btn-main">直达官网</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { airports } from '../../data/airports';

const airportList = airports;
const copiedCode = ref<string | null>(null);

function copyCoupon(code: string) {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(code).then(() => {
      copiedCode.value = code;
      setTimeout(() => {
        copiedCode.value = null;
      }, 2000);
    });
  }
}
</script>

<style scoped>
.airport-table-wrapper {
  margin: 24px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--vp-c-divider);
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.airport-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 !important;
  font-size: 0.92rem;
  text-align: left;
}

.airport-table th {
  background: var(--vp-c-bg-soft);
  padding: 14px 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-bottom: 2px solid var(--vp-c-divider);
  white-space: nowrap;
}

.airport-table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  vertical-align: middle;
}

.airport-table tr:hover td {
  background: var(--vp-c-bg-soft);
}

.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.85rem;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
}

.rank-1 { background: #f59e0b; color: #fff; }
.rank-2 { background: #94a3b8; color: #fff; }
.rank-3 { background: #d97706; color: #fff; }

.airport-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.name-link {
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.name-link:hover {
  color: var(--vp-c-brand-1);
}

.protocols-tag {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.protocol-badge {
  font-size: 0.72rem;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.price-val {
  font-weight: 700;
  color: #ef4444;
  font-size: 1.05rem;
}

.price-unit {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.traffic-val {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.line-badge {
  display: inline-block;
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  background: rgba(37, 99, 235, 0.08);
  padding: 3px 8px;
  border-radius: 4px;
}

.suitable-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  max-width: 200px;
}

.coupon-box {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  background: rgba(16, 185, 129, 0.1);
  border: 1px dashed #10b981;
  padding: 3px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}
.coupon-box:hover {
  background: rgba(16, 185, 129, 0.2);
}

.coupon-code {
  font-family: monospace;
  font-weight: 700;
  color: #059669;
  font-size: 0.82rem;
}

.copy-hint {
  font-size: 0.7rem;
  color: #059669;
}

.actions-cell {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.btn-sub {
  font-size: 0.82rem;
  padding: 6px 10px;
  border-radius: 6px;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.btn-sub:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.btn-main {
  font-size: 0.82rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: #fff;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
}
.btn-main:hover {
  background: var(--vp-c-brand-2);
  color: #fff;
}
</style>
