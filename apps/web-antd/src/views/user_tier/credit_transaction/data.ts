import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { CreditTransaction } from '#/api/user_tier/credit_transaction';

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
    fieldName: 'transaction_type',
    label: '交易类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('user_tier_transaction_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'reference_id',
    label: '关联 ID',
    componentProps: {"placeholder": "Search by \u5173\u8054 ID"},
  },
  {
    component: 'Select',
    fieldName: 'reference_type',
    label: '关联类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('user_tier_reference_type'),
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<CreditTransaction>,
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
      field: 'transaction_type',
      title: '交易类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('user_tier_transaction_type'),
      },
    },
    {
      field: 'credits',
      title: '积分变动数量',
      width: 150,
    },
    {
      field: 'balance_before',
      title: '交易前余额',
      width: 150,
    },
    {
      field: 'balance_after',
      title: '交易后余额',
      width: 150,
    },
    {
      field: 'reference_id',
      title: '关联 ID',
      width: 150,
    },
    {
      field: 'reference_type',
      title: '关联类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('user_tier_reference_type'),
      },
    },
    {
      field: 'description',
      title: '交易描述',
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
    fieldName: 'transaction_type',
    label: '交易类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('user_tier_transaction_type'),
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'credits',
    label: '积分变动数量',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'balance_before',
    label: '交易前余额',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'balance_after',
    label: '交易后余额',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'reference_id',
    label: '关联 ID',
  },
  {
    component: 'Select',
    fieldName: 'reference_type',
    label: '关联类型',
    componentProps: {
      options: getDictOptions('user_tier_reference_type'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '交易描述',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'extra_data',
    label: '扩展数据',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
];
