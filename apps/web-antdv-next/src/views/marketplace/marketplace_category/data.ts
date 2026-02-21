import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { MarketplaceCategory } from '#/api/marketplace/marketplace_category';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'name',
    label: '分类名称',
    componentProps: {"placeholder": "Search by \u5206\u7c7b\u540d\u79f0"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<MarketplaceCategory>,
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
      field: 'slug',
      title: '分类标识',
      width: 150,
    },
    {
      field: 'name',
      title: '分类名称',
      width: 150,
    },
    {
      field: 'icon',
      title: 'emoji图标',
      width: 150,
    },
    {
      field: 'parent_slug',
      title: '父分类标识',
      width: 150,
    },
    {
      field: 'sort_order',
      title: '排序顺序',
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
    fieldName: 'slug',
    label: '分类标识',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '分类名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'icon',
    label: 'emoji图标',
  },
  {
    component: 'Input',
    fieldName: 'parent_slug',
    label: '父分类标识',
  },
  {
    component: 'InputNumber',
    fieldName: 'sort_order',
    label: '排序顺序',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
];
