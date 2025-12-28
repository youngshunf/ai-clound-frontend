/**
 * API Key管理页面数据配置
 * @author Ysf
 */
import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type {
  LlmApiKeyResult,
  LlmRateLimitResult,
  LlmModelConfigResult,
} from '#/api';

import type { Ref } from 'vue';

import { $t } from '@vben/locales';

export const API_KEY_STATUS = [
  { label: '活跃', value: 'active', color: 'green' },
  { label: '已禁用', value: 'disabled', color: 'red' },
  { label: '已过期', value: 'expired', color: 'orange' },
];

export function useColumns(
  onActionClick?: OnActionClickFn<LlmApiKeyResult>,
): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: '#', type: 'seq', width: 50 },
    { field: 'name', title: '名称', width: 150 },
    { field: 'key_prefix', title: 'Key 前缀', width: 120 },
    {
      field: 'status',
      title: '状态',
      width: 80,
      cellRender: {
        name: 'CellTag',
        props: {
          color: (row: LlmApiKeyResult) => {
            const status = API_KEY_STATUS.find((s) => s.value === row.status);
            return status?.color || 'default';
          },
          content: (row: LlmApiKeyResult) => {
            const status = API_KEY_STATUS.find((s) => s.value === row.status);
            return status?.label || row.status;
          },
        },
      },
    },
    {
      field: 'expires_at',
      title: '过期时间',
      width: 160,
      formatter({ cellValue }) {
        return cellValue || '永不过期';
      },
    },
    {
      field: 'custom_daily_tokens',
      title: '日 Token 限制',
      width: 110,
      formatter({ cellValue }) {
        return cellValue?.toLocaleString() || '默认';
      },
    },
    {
      field: 'custom_monthly_tokens',
      title: '月 Token 限制',
      width: 110,
      formatter({ cellValue }) {
        return cellValue?.toLocaleString() || '默认';
      },
    },
    {
      field: 'last_used_at',
      title: '最后使用',
      width: 160,
      formatter({ cellValue }) {
        return cellValue || '从未使用';
      },
    },
    { field: 'created_time', title: '创建时间', width: 160 },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 150,
      cellRender: {
        attrs: {
          nameField: 'name',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: ['edit', 'delete'],
      },
    },
  ];
}

export function useFormSchema(
  rateLimitOptions: Ref<LlmRateLimitResult[]>,
  modelOptions: Ref<LlmModelConfigResult[]>,
): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: '名称',
      rules: 'required',
      componentProps: {
        placeholder: '用于标识此 API Key 的名称',
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'expires_at',
      label: '过期时间',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        class: 'w-full',
        placeholder: '留空表示永不过期',
      },
    },
    {
      component: 'Select',
      fieldName: 'rate_limit_config_id',
      label: '速率限制配置',
      componentProps: {
        allowClear: true,
        options: rateLimitOptions,
        fieldNames: { label: 'name', value: 'id' },
        class: 'w-full',
        placeholder: '选择速率限制配置',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'custom_daily_tokens',
      label: '自定义日 Token',
      componentProps: { min: 0, class: 'w-full', placeholder: '留空使用默认' },
    },
    {
      component: 'InputNumber',
      fieldName: 'custom_monthly_tokens',
      label: '自定义月 Token',
      componentProps: { min: 0, class: 'w-full', placeholder: '留空使用默认' },
    },
    {
      component: 'InputNumber',
      fieldName: 'custom_rpm_limit',
      label: '自定义 RPM',
      componentProps: { min: 1, class: 'w-full', placeholder: '留空使用默认' },
    },
    {
      component: 'Select',
      fieldName: 'allowed_models',
      label: '允许的模型',
      componentProps: {
        mode: 'multiple',
        options: modelOptions,
        fieldNames: { label: 'model_name', value: 'id' },
        class: 'w-full',
        placeholder: '留空表示允许所有模型',
      },
    },
  ];
}

export function useEditFormSchema(
  rateLimitOptions: Ref<LlmRateLimitResult[]>,
  modelOptions: Ref<LlmModelConfigResult[]>,
): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: '名称',
      rules: 'required',
    },
    {
      component: 'Select',
      fieldName: 'status',
      label: '状态',
      componentProps: {
        options: API_KEY_STATUS.map((s) => ({ label: s.label, value: s.value })),
        class: 'w-full',
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'expires_at',
      label: '过期时间',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        class: 'w-full',
        placeholder: '留空表示永不过期',
      },
    },
    {
      component: 'Select',
      fieldName: 'rate_limit_config_id',
      label: '速率限制配置',
      componentProps: {
        allowClear: true,
        options: rateLimitOptions,
        fieldNames: { label: 'name', value: 'id' },
        class: 'w-full',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'custom_daily_tokens',
      label: '自定义日 Token',
      componentProps: { min: 0, class: 'w-full' },
    },
    {
      component: 'InputNumber',
      fieldName: 'custom_monthly_tokens',
      label: '自定义月 Token',
      componentProps: { min: 0, class: 'w-full' },
    },
    {
      component: 'InputNumber',
      fieldName: 'custom_rpm_limit',
      label: '自定义 RPM',
      componentProps: { min: 1, class: 'w-full' },
    },
    {
      component: 'Select',
      fieldName: 'allowed_models',
      label: '允许的模型',
      componentProps: {
        mode: 'multiple',
        options: modelOptions,
        fieldNames: { label: 'model_name', value: 'id' },
        class: 'w-full',
      },
    },
  ];
}
