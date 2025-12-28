/**
 * 用量统计页面数据配置
 * @author Ysf
 */
import type { VbenFormSchema } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { LlmUsageLogResult } from '#/api';

import { $t } from '@vben/locales';

export const LOG_STATUS = [
  { label: '成功', value: 'success', color: 'green' },
  { label: '失败', value: 'error', color: 'red' },
];

export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'model_name',
    label: '模型名称',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: LOG_STATUS,
      placeholder: $t('common.form.select'),
    },
    fieldName: 'status',
    label: '状态',
  },
  {
    component: 'RangePicker',
    fieldName: 'dateRange',
    label: '时间范围',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];

export function useLogColumns(): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: '#', type: 'seq', width: 50 },
    { field: 'model_name', title: '模型', width: 150 },
    { field: 'input_tokens', title: '输入 Tokens', width: 100 },
    { field: 'output_tokens', title: '输出 Tokens', width: 100 },
    { field: 'total_tokens', title: '总 Tokens', width: 100 },
    {
      field: 'total_cost',
      title: '费用',
      width: 80,
      formatter({ cellValue }) {
        return `$${cellValue?.toFixed(4) || 0}`;
      },
    },
    {
      field: 'latency_ms',
      title: '延迟',
      width: 80,
      formatter({ cellValue }) {
        return `${cellValue}ms`;
      },
    },
    {
      field: 'status',
      title: '状态',
      width: 80,
      cellRender: {
        name: 'CellTag',
        props: {
          color: (row: LlmUsageLogResult) =>
            row.status === 'success' ? 'green' : 'red',
          content: (row: LlmUsageLogResult) =>
            row.status === 'success' ? '成功' : '失败',
        },
      },
    },
    {
      field: 'is_streaming',
      title: '流式',
      width: 70,
      cellRender: {
        name: 'CellTag',
        props: {
          color: (row: LlmUsageLogResult) =>
            row.is_streaming ? 'blue' : 'default',
          content: (row: LlmUsageLogResult) => (row.is_streaming ? '是' : '否'),
        },
      },
    },
    { field: 'created_time', title: '时间', width: 160 },
  ];
}
