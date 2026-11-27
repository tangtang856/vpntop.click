<template>
  <a
    v-if="airport"
    :href="airport.affiliateUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="aff-cta-btn"
  >
    <span class="btn-text">{{ text || `访问 ${airport.name} 官网` }}</span>
    <span class="btn-arrow">&rarr;</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { airports } from '../../data/airports';

const props = defineProps<{
  id: string;
  text?: string;
}>();

const airport = computed(() => airports.find(a => a.id === props.id));
</script>

<style scoped>
.aff-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--vp-c-brand-1);
  color: #fff !important;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 8px 20px;
  border-radius: 8px;
  text-decoration: none !important;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
}

.aff-cta-btn:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.btn-arrow {
  transition: transform 0.2s;
}

.aff-cta-btn:hover .btn-arrow {
  transform: translateX(3px);
}
</style>
