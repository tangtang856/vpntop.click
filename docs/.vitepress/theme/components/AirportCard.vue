<template>
  <div v-if="airport" class="airport-card">
    <div class="card-header">
      <div class="card-title-group">
        <h3 class="card-title">{{ airport.name }}</h3>
        <span class="card-badge">{{ airport.plans[0]?.features[3] || '高速专线' }}</span>
      </div>
      <div class="card-price">
        <span class="price-val">¥{{ airport.startingPrice }}</span>
        <span class="price-unit">/月起</span>
      </div>
    </div>

    <p class="card-desc">{{ airport.description }}</p>

    <div class="card-specs">
      <div class="spec-item">
        <span class="spec-label">入门流量</span>
        <span class="spec-val">{{ airport.plans[0]?.traffic || '100' }} GB</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">设备限制</span>
        <span class="spec-val">{{ airport.deviceLimit }}</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">协议支持</span>
        <span class="spec-val">{{ airport.protocols.join(', ') }}</span>
      </div>
    </div>

    <div class="card-advantages">
      <div v-for="(adv, i) in airport.advantages.slice(0, 2)" :key="i" class="adv-line">
        ✓ {{ adv }}
      </div>
    </div>

    <div class="card-footer">
      <div v-if="airport.coupon" class="coupon-pill">
        优惠码: <code>{{ airport.coupon }}</code>
      </div>
      <div class="btn-group">
        <a :href="'/review/' + airport.id" class="btn-outline">评测详情</a>
        <a :href="airport.affiliateUrl" target="_blank" rel="noopener noreferrer" class="btn-primary">直达官网</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { airports, type Airport } from '../../data/airports';

const props = defineProps<{
  id: string;
}>();

const airport = computed<Airport | undefined>(() => {
  return airports.find(a => a.id === props.id);
});
</script>

<style scoped>
.airport-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  margin: 16px 0;
  transition: transform 0.2s, box-shadow 0.2s;
}

.airport-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.card-title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-title {
  margin: 0 !important;
  font-size: 1.25rem !important;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.card-badge {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(37, 99, 235, 0.1);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.card-price {
  text-align: right;
}

.price-val {
  font-size: 1.35rem;
  font-weight: 800;
  color: #ef4444;
}

.price-unit {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.card-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 16px 0 !important;
}

.card-specs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 12px;
  background: var(--vp-c-bg);
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 14px;
}

.spec-item {
  display: flex;
  flex-direction: column;
}

.spec-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-bottom: 2px;
}

.spec-val {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.card-advantages {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 16px;
}

.adv-line {
  color: #059669;
  margin-bottom: 4px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

.coupon-pill {
  font-size: 0.82rem;
  color: #059669;
}

.coupon-pill code {
  font-weight: 700;
  background: rgba(16, 185, 129, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

.btn-group {
  display: flex;
  gap: 8px;
}

.btn-outline {
  font-size: 0.85rem;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.btn-outline:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.btn-primary {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: #fff;
  text-decoration: none;
}
.btn-primary:hover {
  background: var(--vp-c-brand-2);
  color: #fff;
}
</style>
