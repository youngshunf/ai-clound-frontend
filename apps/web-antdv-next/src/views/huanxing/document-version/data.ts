import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { HuanxingDocumentVersionResult } from '#/api/huanxing/document-version';

import { $t } from '@vben/locales';

export const querySchema: VbenFormSchema[] = [
  { component: 'InputNumber', fieldName: 'document_id', label: '文档ID', componentProps: { style: 'width: 100%' } },
  { component: 'Input', fieldName: 'title', label: '标题', componentProps: { placeholder: '请输入标题' } },
];

export function useColumns(
  onActionClick?: OnActionClickFn<HuanxingDocumentVersionResult>,
): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: $t('common.table.id'), type: 'seq', fixed: 'left', width: 50 },
    { field: 'document_id', title: '文档ID', width: 100 },
    { field: 'version_number', title: '版本号', width: 80 },
    { field: 'title', title: '标题', width: 200 },
    { field: 'created_by', title: '创建者ID', width: 100 },
    { field: 'created_at', title: '创建时间', width: 170 },
    {
      field: 'operation', title: $t('common.table.operation'), align: 'center', fixed: 'right', width: 150,
      cellRender: {
        attrs: { nameField: 'id', onClick: onActionClick },
        name: 'CellOperation',
        options: ['edit', 'delete'],
      },
    },
  ];
}

export const formSchema: VbenFormSchema[] = [
  { component: 'InputNumber', fieldName: 'document_id', label: '文档ID', rules: 'required', componentProps: { style: 'width: 100%' } },
  { component: 'InputNumber', fieldName: 'version_number', label: '版本号', rules: 'required', componentProps: { style: 'width: 100%' } },
  { component: 'Input', fieldName: 'title', label: '标题', rules: 'required' },
  { component: 'Textarea', fieldName: 'content', label: '内容(Markdown)', rules: 'required', componentProps: { rows: 8 } },
  { component: 'InputNumber', fieldName: 'created_by', label: '创建者ID', rules: 'required', componentProps: { style: 'width: 100%' } },
];
