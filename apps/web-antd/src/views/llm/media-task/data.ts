import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { LlmMediaTaskResult } from '#/api';

import { $t } from '@vben/locales';

export const MEDIA_TYPES = [
  { label: '图像', value: 'image' },
  { label: '视频', value: 'video' },
];

export const TASK_STATUSES = [
  { label: '等待中', value: 'pending' },
  { label: '处理中', value: 'processing' },
  { label: '已完成', value: 'completed' },
  { label: '失败', value: 'failed' },
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
      options: MEDIA_TYPES,
      placeholder: $t('common.form.select'),
    },
    fieldName: 'media_type',
    label: '媒体类型',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: TASK_STATUSES,
      placeholder: $t('common.form.select'),
    },
    fieldName: 'status',
    label: '状态',
  },
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '用户 ID',
    componentProps: {
      placeholder: '输入用户 ID',
      class: 'w-full',
    },
  },
];

function statusColor(status: string) {
  switch (status) {
    case 'completed': {
      return 'green';
    }
    case 'processing': {
      return 'blue';
    }
    case 'failed': {
      return 'red';
    }
    default: {
      return 'default';
    }
  }
}

function statusLabel(status: string) {
  return TASK_STATUSES.find((s) => s.value === status)?.label || status;
}

export function useColumns(
  onActionClick?: OnActionClickFn<LlmMediaTaskResult>,
): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: '#', type: 'seq', width: 50 },
    { field: 'task_id', title: '任务 ID', width: 160 },
    { field: 'user_id', title: '用户 ID', width: 80 },
    { field: 'model_name', title: '模型', width: 150 },
    {
      field: 'media_type',
      title: '类型',
      width: 70,
      formatter({ cellValue }) {
        return MEDIA_TYPES.find((t) => t.value === cellValue)?.label || cellValue;
      },
    },
    {
      field: 'status',
      title: '状态',
      width: 90,
      cellRender: {
        name: 'CellTag',
        props: {
          colorField: '_statusColor',
        },
      },
      formatter({ row, cellValue }) {
        row._statusColor = statusColor(cellValue);
        return statusLabel(cellValue);
      },
    },
    { field: 'progress', title: '进度', width: 60 },
    {
      field: 'prompt',
      title: '提示词',
      minWidth: 200,
      showOverflow: 'tooltip',
    },
    {
      field: 'credits_cost',
      title: '积分消耗',
      width: 90,
      formatter({ cellValue }) {
        return cellValue > 0 ? `${cellValue}` : '-';
      },
    },
    { field: 'poll_count', title: '轮询', width: 60 },
    { field: 'error_code', title: '错误码', width: 120, showOverflow: 'tooltip' },
    {
      field: 'created_time',
      title: '创建时间',
      width: 170,
      sortable: true,
    },
    {
      field: 'completed_at',
      title: '完成时间',
      width: 170,
      formatter({ cellValue }) {
        return cellValue || '-';
      },
    },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 100,
      cellRender: {
        attrs: {
          nameField: 'task_id',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: ['delete'],
      },
    },
  ];
}
