import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { UserSubscription } from '#/api/user_tier/user_subscription';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Select',
    fieldName: 'app_code',
    label: '应用',
    componentProps: {
      allowClear: true,
      options: getDictOptions('sys_app_code'),
    },
  },
  {
    component: 'Input',
    fieldName: 'user_keyword',
    label: '用户搜索',
    componentProps: {"placeholder": "昵称/手机号"},
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
    componentProps: {
      allowClear: true,
      options: getDictOptions('user_tier_status'),
    },
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
      field: 'app_code',
      title: '应用',
      width: 100,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('sys_app_code'),
      },
    },
    {
      field: 'user_nickname',
      title: '用户昵称',
      width: 120,
    },
    {
      field: 'user_phone',
      title: '手机号',
      width: 130,
    },
    {
      field: 'tier',
      title: '订阅等级',
      width: 120,
    },
    {
      field: 'subscription_type',
      title: '订阅类型',
      width: 100,
      formatter: ({ cellValue }) => cellValue === 'yearly' ? '年度' : '月度',
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
      title: '订阅状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('user_tier_status'),
      },
    },
    {
      field: 'subscription_start_date',
      title: '订阅开始时间',
      width: 150,
    },
    {
      field: 'subscription_end_date',
      title: '订阅结束时间',
      width: 150,
    },
    {
      field: 'next_grant_date',
      title: '下次赠送时间',
      width: 150,
    },
    {
      field: 'auto_renew',
      title: '是否自动续费',
      width: 120,
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
    component: 'Select',
    fieldName: 'app_code',
    label: '应用',
    rules: 'required',
    defaultValue: 'huanxing',
    componentProps: {
      options: getDictOptions('sys_app_code'),
    },
  },
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
    component: 'Select',
    fieldName: 'subscription_type',
    label: '订阅类型',
    defaultValue: 'monthly',
    componentProps: {
      options: [
        { label: '月度', value: 'monthly' },
        { label: '年度', value: 'yearly' },
      ],
    },
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
    label: '订阅状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('user_tier_status'),
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'subscription_start_date',
    label: '订阅开始时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'DatePicker',
    fieldName: 'subscription_end_date',
    label: '订阅结束时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'DatePicker',
    fieldName: 'next_grant_date',
    label: '下次赠送时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss", "placeholder": "年度订阅专用"},
  },
  {
    component: 'Switch',
    fieldName: 'auto_renew',
    label: '是否自动续费',
  },
];
