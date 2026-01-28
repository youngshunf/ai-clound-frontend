import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { UserSubscription } from '#/api/llm/user_subscription';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '用户 ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'RangePicker',
    fieldName: 'billing_cycle_start',
    label: '计费周期开始时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'billing_cycle_end',
    label: '计费周期结束时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '订阅状态',
    componentProps: {"options": [{"label": "Active", "value": 1}, {"label": "Inactive", "value": 0}]},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<UserSubscription>,
): VxeGridProps['columns'] {
  return [
    {
      field: 'seq',
      title: $t('common.table.id'),
      type: 'seq',
      fixed: 'left',
      width: 50,
    },
    {
      field: 'user_id',
      title: '用户 ID',
      width: 150,
    },
    {
      field: 'tier',
      title: '订阅等级',
      width: 100,
    },
    {
      field: 'monthly_credits',
      title: '每月积分配额',
      width: 150,
    },
    {
      field: 'current_credits',
      title: '当前剩余积分',
      width: 150,
    },
    {
      field: 'used_credits',
      title: '本周期已使用积分',
      width: 150,
    },
    {
      field: 'purchased_credits',
      title: '购买的额外积分',
      width: 150,
    },
    {
      field: 'billing_cycle_start',
      title: '计费周期开始时间',
      width: 150,
    },
    {
      field: 'billing_cycle_end',
      title: '计费周期结束时间',
      width: 150,
    },
    {
      field: 'status',
      title: '状态',
      width: 80,
    },
    {
      field: 'auto_renew',
      title: '是否自动续费',
      width: 150,
    },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 150,
      cellRender: {
        attrs: {
          nameField: 'id',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: ['edit', 'delete'],
      },
    },
  ];
}

/**
 * Form schema for add/edit
 */
export const formSchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '用户 ID',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'tier',
    label: '订阅等级',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'monthly_credits',
    label: '每月积分配额',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'current_credits',
    label: '当前剩余积分',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'used_credits',
    label: '本周期已使用积分',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'purchased_credits',
    label: '购买的额外积分',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'DatePicker',
    fieldName: 'billing_cycle_start',
    label: '计费周期开始时间',
    rules: 'required',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'DatePicker',
    fieldName: 'billing_cycle_end',
    label: '计费周期结束时间',
    rules: 'required',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    componentProps: {"options": [{"label": "Active", "value": 1}, {"label": "Inactive", "value": 0}]},
  },
  {
    component: 'Switch',
    fieldName: 'auto_renew',
    label: '是否自动续费',
  },
];
