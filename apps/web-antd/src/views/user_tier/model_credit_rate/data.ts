import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { ModelCreditRate } from '#/api/user_tier/model_credit_rate';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'model_id',
    label: '模型 ID',
    componentProps: {"style": "width: 100%"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<ModelCreditRate>,
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
      field: 'model_id',
      title: '模型 ID',
      width: 150,
    },
    {
      field: 'base_credit_per_1k_tokens',
      title: '基准积分费率',
      width: 150,
    },
    {
      field: 'input_multiplier',
      title: '输入倍率',
      width: 150,
    },
    {
      field: 'output_multiplier',
      title: '输出倍率',
      width: 150,
    },
    {
      field: 'enabled',
      title: '是否启用',
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
    fieldName: 'model_id',
    label: '模型 ID',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'base_credit_per_1k_tokens',
    label: '基准积分费率',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'input_multiplier',
    label: '输入倍率',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'output_multiplier',
    label: '输出倍率',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Switch',
    fieldName: 'enabled',
    label: '是否启用',
  },
];
