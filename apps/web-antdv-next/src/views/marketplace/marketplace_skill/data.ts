import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { MarketplaceSkill } from '#/api/marketplace/marketplace_skill';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'skill_id',
    label: '技能唯一标识',
    componentProps: {"placeholder": "Search by \u6280\u80fd\u552f\u4e00\u6807\u8bc6"},
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '技能名称',
    componentProps: {"placeholder": "Search by \u6280\u80fd\u540d\u79f0"},
  },
  {
    component: 'InputNumber',
    fieldName: 'author_id',
    label: '作者用户ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'author_name',
    label: '作者名称',
    componentProps: {"placeholder": "Search by \u4f5c\u8005\u540d\u79f0"},
  },
  {
    component: 'Select',
    fieldName: 'category',
    label: '分类',
    componentProps: {
      allowClear: true,
      options: getDictOptions('marketplace_category'),
    },
  },
  {
    component: 'Select',
    fieldName: 'pricing_type',
    label: '定价类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('marketplace_pricing_type'),
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<MarketplaceSkill>,
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
      field: 'skill_id',
      title: '技能唯一标识',
      width: 150,
    },
    {
      field: 'name',
      title: '技能名称',
      width: 150,
    },
    {
      field: 'icon_url',
      title: 'SVG图标URL',
      width: 150,
    },
    {
      field: 'author_id',
      title: '作者用户ID',
      width: 150,
    },
    {
      field: 'author_name',
      title: '作者名称',
      width: 150,
    },
    {
      field: 'category',
      title: '分类',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('marketplace_category'),
      },
    },
    {
      field: 'tags',
      title: '标签，逗号分隔',
      width: 150,
    },
    {
      field: 'pricing_type',
      title: '定价类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('marketplace_pricing_type'),
      },
    },
    {
      field: 'price',
      title: '价格',
      width: 150,
    },
    {
      field: 'is_private',
      title: '是否私有',
      width: 150,
    },
    {
      field: 'is_official',
      title: '是否官方技能',
      width: 150,
    },
    {
      field: 'download_count',
      title: '下载次数',
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
    fieldName: 'skill_id',
    label: '技能唯一标识',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '技能名称',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '技能描述',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'icon_url',
    label: 'SVG图标URL',
    componentProps: {"rows": 4},
  },
  {
    component: 'InputNumber',
    fieldName: 'author_id',
    label: '作者用户ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'author_name',
    label: '作者名称',
  },
  {
    component: 'Select',
    fieldName: 'category',
    label: '分类',
    componentProps: {
      options: getDictOptions('marketplace_category'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'tags',
    label: '标签，逗号分隔',
    componentProps: {"rows": 4},
  },
  {
    component: 'Select',
    fieldName: 'pricing_type',
    label: '定价类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('marketplace_pricing_type'),
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'price',
    label: '价格',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Switch',
    fieldName: 'is_private',
    label: '是否私有',
  },
  {
    component: 'Switch',
    fieldName: 'is_official',
    label: '是否官方技能',
  },
  {
    component: 'InputNumber',
    fieldName: 'download_count',
    label: '下载次数',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
];
