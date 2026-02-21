import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { CreditPackage } from '#/api/user_tier/credit_package';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'package_name',
    label: '积分包名称',
    componentProps: {"placeholder": "Search by \u79ef\u5206\u5305\u540d\u79f0"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<CreditPackage>,
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
      field: 'package_name',
      title: '积分包名称',
      width: 150,
    },
    {
      field: 'credits',
      title: '基础积分数量',
      width: 150,
    },
    {
      field: 'price',
      title: '价格',
      width: 150,
    },
    {
      field: 'bonus_credits',
      title: '额外赠送积分',
      width: 150,
    },
    {
      field: 'description',
      title: '描述',
      width: 150,
    },
    {
      field: 'enabled',
      title: '是否启用',
      width: 150,
    },
    {
      field: 'sort_order',
      title: '排序权重',
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
    component: 'Input',
    fieldName: 'package_name',
    label: '积分包名称',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'credits',
    label: '基础积分数量',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'price',
    label: '价格',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'bonus_credits',
    label: '额外赠送积分',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '描述',
    componentProps: {"rows": 4},
  },
  {
    component: 'Switch',
    fieldName: 'enabled',
    label: '是否启用',
  },
  {
    component: 'InputNumber',
    fieldName: 'sort_order',
    label: '排序权重',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
];
