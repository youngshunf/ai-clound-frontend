<template>
  <a-button 
    :class="[
      'zhixiaoya-button',
      `zhixiaoya-button--${type}`,
      { 'zhixiaoya-button--loading': loading }
    ]"
    v-bind="$attrs"
  >
    <slot />
  </a-button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
}>();
</script>

<style scoped>
.zhixiaoya-button--primary {
  background: linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%);
  border: none;
  color: white;
  font-weight: 500;
  transition: all 0.2s ease;
}

.zhixiaoya-button--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3),
              0 4px 12px rgba(139, 92, 246, 0.3);
}

.zhixiaoya-button--primary:active {
  transform: translateY(0);
}

.zhixiaoya-button--secondary {
  background: transparent;
  border: 1px solid transparent;
  border-image: linear-gradient(135deg, #06B6D4, #8B5CF6) 1;
  position: relative;
  overflow: hidden;
}

.zhixiaoya-button--secondary::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(135deg, #06B6D4, #8B5CF6);
  border-radius: inherit;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.zhixiaoya-button--secondary :deep(.ant-btn-content) {
  background: linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.zhixiaoya-button--ghost {
  background: transparent;
  border: none;
}

.zhixiaoya-button--ghost :deep(.ant-btn-content) {
  background: linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.zhixiaoya-button--ghost:hover {
  background: rgba(6, 182, 212, 0.05);
}
</style>
