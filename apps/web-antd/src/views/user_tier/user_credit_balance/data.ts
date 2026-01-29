import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { UserCreditBalance } from '#/api/user_tier/user_credit_balance';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

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
    component: 'Select',
    fieldName: 'credit_type',
    label: '积分类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('user_tier_credit_type'),
    },
  },
  {
    component: 'RangePicker',
    fieldName: 'expires_at',
    label: '过期时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'granted_at',
    label: '发放时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'Select',
    fieldName: 'source_type',
    label: '来源类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('user_tier_source_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'source_reference_id',
    label: '关联订单号',
    componentProps: {"placeholder": "Search by \u5173\u8054\u8ba2\u5355\u53f7"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<UserCreditBalance>,
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
      field: 'credit_type',
      title: '积分类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('user_tier_credit_type'),
      },
    },
    {
      field: 'original_amount',
      title: '原始积分数量',
      width: 120,
    },
    {
      field: 'used_amount',
      title: '已使用',
      width: 100,
    },
    {
      field: 'remaining_amount',
      title: '剩余积分',
      width: 100,
    },
    {
      field: 'expires_at',
      title: '过期时间',
      width: 150,
    },
    {
      field: 'granted_at',
      title: '发放时间',
      width: 150,
    },
    {
      field: 'source_type',
      title: '来源类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('user_tier_source_type'),
      },
    },
    {
      field: 'source_reference_id',
      title: '关联订单号',
      width: 150,
    },
    {
      field: 'description',
      title: '描述',
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
    component: 'Select',
    fieldName: 'credit_type',
    label: '积分类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('user_tier_credit_type'),
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'original_amount',
    label: '原始积分数量',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'used_amount',
    label: '已使用积分',
    componentProps: {"style": "width: 100%", "disabled": true},
  },
  {
    component: 'InputNumber',
    fieldName: 'remaining_amount',
    label: '剩余积分数量',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'DatePicker',
    fieldName: 'expires_at',
    label: '过期时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'DatePicker',
    fieldName: 'granted_at',
    label: '发放时间',
    rules: 'required',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'Select',
    fieldName: 'source_type',
    label: '来源类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('user_tier_source_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'source_reference_id',
    label: '关联订单号',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '描述',
    componentProps: {"rows": 4},
  },
];
