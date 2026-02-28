import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { HuanxingDocumentAutosaveResult } from '#/api/huanxing/document-autosave';

import { $t } from '@vben/locales';

export const querySchema: VbenFormSchema[] = [
  { component: 'InputNumber', fieldName: 'document_id', label: '文档ID', componentProps: { style: 'width: 100%' } },
  { component: 'InputNumber', fieldName: 'user_id', label: '用户ID', componentProps: { style: 'width: 100%' } },
];

export function useColumns(
  onActionClick?: OnActionClickFn<HuanxingDocumentAutosaveResult>,
): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: $t('common.table.id'), type: 'seq', fixed: 'left', width: 50 },
    { field: 'document_id', title: '文档ID', width: 100 },
    { field: 'user_id', title: '用户ID', width: 100 },
    { field: 'saved_at', title: '最后保存时间', width: 170 },
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
  { component: 'InputNumber', fieldName: 'user_id', label: '用户ID', rules: 'required', componentProps: { style: 'width: 100%' } },
  { component: 'Textarea', fieldName: 'content', label: '内容(Markdown)', rules: 'required', componentProps: { rows: 8 } },
];
