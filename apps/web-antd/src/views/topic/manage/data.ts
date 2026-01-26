import type { VbenFormSchema } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getIndustryTreeApi } from '#/api/topic';

const formatCellValue = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === 'string' ? item : JSON.stringify(item))).join('、');
  }
  if (value && typeof value === 'object') {
    return JSON.stringify(value);
  }
  if (value === null || value === undefined || value === '') {
    return '-';
  }
  return String(value);
};

export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'title',
    label: '选题标题',
  },
  {
    component: 'ApiTreeSelect',
    fieldName: 'industry_id',
    label: '所属行业',
    componentProps: {
      api: getIndustryTreeApi,
      labelField: 'name',
      valueField: 'id',
      childrenField: 'children',
      allowClear: true,
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      options: [
        { label: '待选', value: 0 },
        { label: '已采纳', value: 1 },
        { label: '已忽略', value: 2 },
      ],
      allowClear: true,
    },
  },
];

export const useColumns: VxeGridProps['columns'] = [
  {
    type: 'seq',
    width: 50,
  },
  {
    field: 'title',
    title: '选题标题',
    minWidth: 200,
  },
  {
    field: 'industry.name',
    title: '行业',
    width: 120,
  },
  {
    field: 'potential_score',
    title: '潜力分',
    width: 100,
    sortable: true,
    formatter: ({ cellValue }) => Number(cellValue).toFixed(1),
  },
  {
    field: 'heat_index',
    title: '热度指数',
    width: 100,
    sortable: true,
    formatter: ({ cellValue }) => Number(cellValue).toFixed(1),
  },
  {
    field: 'keywords',
    title: '标签',
    width: 200,
    slots: { default: 'keywords' },
  },
  {
    field: 'platform_heat',
    title: '平台热度',
    width: 200,
    slots: { default: 'platform_heat' },
  },
  {
    field: 'heat_sources',
    title: '热度来源',
    width: 200,
    formatter: ({ cellValue }) => formatCellValue(cellValue),
  },
  {
    field: 'trend',
    title: '趋势走势',
    width: 200,
    formatter: ({ cellValue }) => formatCellValue(cellValue),
  },
  {
    field: 'industry_tags',
    title: '适配行业',
    width: 160,
    formatter: ({ cellValue }) => formatCellValue(cellValue),
  },
  {
    field: 'target_audience',
    title: '目标人群',
    width: 180,
    formatter: ({ cellValue }) => formatCellValue(cellValue),
  },
  {
    field: 'creative_angles',
    title: '创作角度',
    width: 180,
    formatter: ({ cellValue }) => formatCellValue(cellValue),
  },
  {
    field: 'content_outline',
    title: '内容结构要点',
    width: 220,
    formatter: ({ cellValue }) => formatCellValue(cellValue),
  },
  {
    field: 'format_suggestions',
    title: '形式建议',
    width: 160,
    formatter: ({ cellValue }) => formatCellValue(cellValue),
  },
  {
    field: 'material_clues',
    title: '素材线索',
    width: 200,
    formatter: ({ cellValue }) => formatCellValue(cellValue),
  },
  {
    field: 'risk_notes',
    title: '风险点',
    width: 160,
    formatter: ({ cellValue }) => formatCellValue(cellValue),
  },
  {
    field: 'status',
    title: '状态',
    width: 100,
    slots: { default: 'status' },
  },
  {
    field: 'created_at',
    title: '生成时间',
    width: 160,
  },
  {
    title: '操作',
    field: 'action',
    fixed: 'right',
    width: 120,
    slots: { default: 'action' },
  },
];
