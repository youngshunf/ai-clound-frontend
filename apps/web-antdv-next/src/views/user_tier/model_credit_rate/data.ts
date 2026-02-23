import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { ModelCreditRate } from '#/api/user_tier/model_credit_rate';

import { $t } from '@vben/locales';

import { updateModelCreditRateApi } from '#/api/user_tier/model_credit_rate';
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
    component: 'ModelSelect',
    fieldName: 'model_id',
    label: '模型',
    componentProps: {
      placeholder: '选择模型进行筛选',
    },
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
      field: 'app_code',
      title: '应用',
      width: 100,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('sys_app_code'),
      },
    },
    {
      field: 'model_name',
      title: '模型',
      minWidth: 250,
      formatter({ row }) {
        const name = row.model_name || `ID: ${row.model_id}`;
        const provider = row.provider_name ? `（${row.provider_name}）` : '';
        return `${name}${provider}`;
      },
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
          beforeChange: async (newVal: boolean, row: ModelCreditRate) => {
            await updateModelCreditRateApi(row.id, { enabled: newVal });
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
      width: 150,
      cellRender: {
        attrs: {
          nameField: 'model_name',
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
    component: 'ModelSelect',
    fieldName: 'model_id',
    label: '模型',
    rules: 'selectRequired',
    componentProps: {
      placeholder: '选择模型',
    },
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
