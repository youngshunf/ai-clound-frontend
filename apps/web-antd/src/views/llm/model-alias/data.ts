import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { LlmModelAliasResult, LlmModelConfigResult } from '#/api';

import { $t } from '@vben/locales';

import { getLlmModelListApi, updateLlmModelAliasApi } from '#/api';

// 常见的 Anthropic 模型别名
export const COMMON_ALIASES = [
  { label: 'claude-sonnet-4-5-20250929', value: 'claude-sonnet-4-5-20250929' },
  { label: 'claude-opus-4-5-20251101', value: 'claude-opus-4-5-20251101' },
  { label: 'claude-haiku-4-5-20251001', value: 'claude-haiku-4-5-20251001' },
  { label: 'claude-3-5-sonnet-20241022', value: 'claude-3-5-sonnet-20241022' },
  { label: 'claude-3-5-haiku-20241022', value: 'claude-3-5-haiku-20241022' },
  { label: 'claude-3-opus-20240229', value: 'claude-3-opus-20240229' },
];

export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'alias_name',
    label: '别名',
    componentProps: {
      placeholder: '如 claude-sonnet-4-5-20250929',
    },
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: [
        { label: '启用', value: true },
        { label: '禁用', value: false },
      ],
      placeholder: $t('common.form.select'),
    },
    fieldName: 'enabled',
    label: '状态',
  },
];

export function useColumns(
  onActionClick?: OnActionClickFn<LlmModelAliasResult>,
): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: '#', type: 'seq', width: 50 },
    { field: 'alias_name', title: '别名（Anthropic 模型名）', minWidth: 220 },
    { field: 'display_name', title: '显示名称', width: 150 },
    {
      field: 'model_ids',
      title: '映射模型数',
      width: 100,
      formatter({ cellValue }) {
        return cellValue?.length || 0;
      },
    },
    { field: 'description', title: '描述', minWidth: 200 },
    {
      field: 'enabled',
      title: '状态',
      width: 100,
      cellRender: {
        name: 'CellSwitch',
        props: {
          checkedValue: true,
          unCheckedValue: false,
          checkedChildren: '启用',
          unCheckedChildren: '禁用',
        },
        attrs: {
          beforeChange: async (newVal: boolean, row: LlmModelAliasResult) => {
            await updateLlmModelAliasApi(row.id, { enabled: newVal });
            return true;
          },
        },
      },
    },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 120,
      cellRender: {
        attrs: {
          nameField: 'alias_name',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: ['edit', 'delete'],
      },
    },
  ];
}

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'AutoComplete',
      fieldName: 'alias_name',
      label: '别名',
      rules: 'required',
      componentProps: {
        options: COMMON_ALIASES,
        placeholder: '输入或选择 Anthropic 模型名称',
        class: 'w-full',
        filterOption: (input: string, option: { value: string }) => {
          return option.value.toLowerCase().includes(input.toLowerCase());
        },
      },
      help: '如：claude-sonnet-4-5-20250929，支持自定义输入',
    },
    {
      component: 'Input',
      fieldName: 'display_name',
      label: '显示名称',
      componentProps: {
        placeholder: '如：Claude 4.5 Sonnet',
      },
    },
    {
      component: 'ApiSelect',
      fieldName: 'model_ids',
      label: '映射模型',
      rules: 'selectRequired',
      componentProps: {
        api: () => getLlmModelListApi({ enabled: true, size: 200 }),
        afterFetch: (data: { items: LlmModelConfigResult[] }) =>
          data.items.map((item) => ({
            ...item,
            label: `${item.model_name}（${item.provider_name || '未知供应商'}）`,
          })),
        labelField: 'label',
        valueField: 'id',
        mode: 'multiple',
        class: 'w-full',
        showSearch: true,
        optionFilterProp: 'label',
        placeholder: '选择要映射的模型（按优先级排序）',
      },
      help: '按选择顺序设置优先级，第一个模型优先调用',
    },
    {
      component: 'Textarea',
      fieldName: 'description',
      label: '描述',
      componentProps: {
        placeholder: '描述此别名映射的用途',
        rows: 3,
      },
    },
    {
      component: 'Switch',
      fieldName: 'enabled',
      label: '启用',
      defaultValue: true,
    },
  ];
}
