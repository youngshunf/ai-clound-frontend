<template>
  <div 
    :class="[
      'zhixiaoya-card',
      { 'zhixiaoya-card--gradient': gradient },
      { 'zhixiaoya-card--interactive': interactive }
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  gradient?: boolean;
  interactive?: boolean;
}>();
</script>

<style scoped>
.zhixiaoya-card {
  background: var(--bg-primary, #FFFFFF);
  border: 1px solid var(--border-default, #E2E8F0);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.zhixiaoya-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-color: var(--border-strong, #CBD5E1);
}

.zhixiaoya-card--interactive {
  cursor: pointer;
}

.zhixiaoya-card--interactive:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.zhixiaoya-card--gradient {
  position: relative;
  border: none;
}

.zhixiaoya-card--gradient::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(135deg, #06B6D4, #8B5CF6);
  border-radius: 12px;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* 深色主题适配 */
:global(.dark) .zhixiaoya-card {
  background: var(--bg-primary, #1E293B);
  border-color: var(--border-default, #334155);
}
</style>
