<script setup lang="ts">
/**
 * 模型选择组件
 * 支持单选和多选模式，自动获取已启用的模型列表
 */
import type { LlmModelConfigResult } from '#/api';

import { computed, ref, watch } from 'vue';

import { Select, Spin } from 'ant-design-vue';

import { getLlmModelListApi } from '#/api';

interface Props {
  value?: number | number[] | null;
  mode?: 'default' | 'multiple';
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  mode: 'default',
  placeholder: '请选择模型',
  disabled: false,
  allowClear: true,
  showSearch: true,
});

const emit = defineEmits<{
  'update:value': [value: number | number[] | null | undefined];
  change: [value: number | number[] | null | undefined];
}>();

const loading = ref(false);
const options = ref<{ label: string; value: number }[]>([]);
const modelMap = ref<Map<number, LlmModelConfigResult>>(new Map());

// 内部值
const innerValue = computed({
  get: () => props.value,
  set: (val) => {
    emit('update:value', val);
    emit('change', val);
  },
});

// 加载模型列表
async function loadModels() {
  loading.value = true;
  try {
    const res = await getLlmModelListApi({ enabled: true, size: 200 });
    const items = res.items || res;
    modelMap.value.clear();
    options.value = (items as LlmModelConfigResult[]).map((item) => {
      modelMap.value.set(item.id, item);
      return {
        label: `${item.model_name}（${item.provider_name || '未知供应商'}）`,
        value: item.id,
      };
    });
  } finally {
    loading.value = false;
  }
}

// 获取模型信息
function getModelInfo(id: number): LlmModelConfigResult | undefined {
  return modelMap.value.get(id);
}

// 初始加载
loadModels();

// 暴露方法给父组件
defineExpose({
  getModelInfo,
  modelMap,
  reload: loadModels,
});
</script>

<template>
  <Select
    v-model:value="innerValue"
    :mode="mode === 'multiple' ? 'multiple' : undefined"
    :placeholder="placeholder"
    :disabled="disabled"
    :allow-clear="allowClear"
    :show-search="showSearch"
    :options="options"
    :loading="loading"
    option-filter-prop="label"
    class="w-full"
  >
    <template #notFoundContent>
      <Spin v-if="loading" size="small" />
      <span v-else>暂无数据</span>
    </template>
  </Select>
</template>
