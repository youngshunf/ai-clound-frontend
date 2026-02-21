import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { Industry } from '#/api/topic';

import { z } from '#/adapter/form';
import { getIndustryTreeApi } from '#/api/topic';

export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'name',
    label: '行业名称',
  },
];

export const useColumns = (
  onActionClick: OnActionClickFn<Industry>,
): VxeGridProps['columns'] => [
  {
    field: 'name',
    title: '行业名称',
    treeNode: true,
    align: 'left',
  },
  {
    field: 'keywords',
    title: '关键词',
    formatter: ({ cellValue }) => {
      if (Array.isArray(cellValue)) {
        return cellValue.join(', ');
      }
      return cellValue || '-';
    },
  },
  {
    field: 'description',
    title: '描述',
  },
  {
    field: 'sort',
    title: '排序',
    width: 80,
  },
  {
    field: 'created_at',
    title: '创建时间',
    width: 160,
  },
  {
    title: '操作',
    field: 'action',
    fixed: 'right',
    width: 150,
    cellRender: {
      name: 'CellOperation',
      attrs: {
        onClick: onActionClick,
      },
      options: [
        { code: 'edit', text: '编辑' },
        { code: 'delete', text: '删除', status: 'danger' },
      ],
    },
  },
];

export const addSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'name',
    label: '行业名称',
    rules: z.string().min(1, '请输入行业名称'),
  },
  {
    component: 'ApiTreeSelect',
    fieldName: 'parent_id',
    label: '上级行业',
    componentProps: {
      api: getIndustryTreeApi,
      labelField: 'name',
      valueField: 'id',
      childrenField: 'children',
      placeholder: '留空则为顶级行业',
      allowClear: true,
    },
  },
  {
    component: 'Select',
    fieldName: 'keywords',
    label: '关键词',
    componentProps: {
      mode: 'tags',
      placeholder: '输入关键词后回车',
      tokenSeparators: [',', ' '],
    },
    help: '用于爬虫搜索热点，按回车添加多个',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '描述',
  },
  {
    component: 'InputNumber',
    fieldName: 'sort',
    label: '排序',
    defaultValue: 0,
  },
];

export const editSchema: VbenFormSchema[] = [...addSchema];
