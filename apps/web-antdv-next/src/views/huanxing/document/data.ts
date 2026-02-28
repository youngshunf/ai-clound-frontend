import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { HuanxingDocumentResult } from '#/api/huanxing/document';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

export const querySchema: VbenFormSchema[] = [
  { component: 'Input', fieldName: 'title', label: '文档标题', componentProps: { placeholder: '请输入标题搜索' } },
  {
    component: 'Select', fieldName: 'status', label: '状态',
    componentProps: { allowClear: true, options: getDictOptions('huanxing_status') },
  },
  { component: 'Input', fieldName: 'agent_id', label: 'Agent ID', componentProps: { placeholder: '请输入Agent ID' } },
];

export function useColumns(
  onActionClick?: OnActionClickFn<HuanxingDocumentResult>,
): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: $t('common.table.id'), type: 'seq', fixed: 'left', width: 50 },
    { field: 'uuid', title: 'UUID', width: 200 },
    { field: 'title', title: '标题', width: 200 },
    { field: 'summary', title: '摘要', width: 200 },
    { field: 'word_count', title: '字数', width: 80 },
    {
      field: 'status', title: '状态', width: 100,
      cellRender: { name: 'CellTag', options: getDictOptions('huanxing_status') },
    },
    { field: 'is_public', title: '公开', width: 70 },
    { field: 'created_by', title: '创建者', width: 100 },
    { field: 'current_version', title: '版本', width: 70 },
    { field: 'created_at', title: '创建时间', width: 170 },
    { field: 'updated_at', title: '更新时间', width: 170 },
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
  { component: 'Input', fieldName: 'uuid', label: '文档UUID', rules: 'required' },
  { component: 'InputNumber', fieldName: 'user_id', label: '用户ID', rules: 'required', componentProps: { style: 'width: 100%' } },
  { component: 'Input', fieldName: 'title', label: '标题', rules: 'required' },
  { component: 'Textarea', fieldName: 'content', label: '内容(Markdown)', componentProps: { rows: 6 } },
  { component: 'Textarea', fieldName: 'summary', label: '摘要', componentProps: { rows: 3 } },
  { component: 'Input', fieldName: 'tags', label: '标签' },
  { component: 'InputNumber', fieldName: 'word_count', label: '字数', componentProps: { style: 'width: 100%' } },
  {
    component: 'Select', fieldName: 'status', label: '状态',
    componentProps: { options: getDictOptions('huanxing_status') },
  },
  { component: 'Switch', fieldName: 'is_public', label: '是否公开' },
  { component: 'Input', fieldName: 'created_by', label: '创建来源' },
  { component: 'Input', fieldName: 'agent_id', label: 'Agent ID' },
  { component: 'Input', fieldName: 'share_token', label: '分享Token' },
  { component: 'InputPassword', fieldName: 'share_password', label: '分享密码' },
  { component: 'Input', fieldName: 'share_permission', label: '分享权限' },
  {
    component: 'DatePicker', fieldName: 'share_expires_at', label: '分享过期时间',
    componentProps: { format: 'YYYY-MM-DD HH:mm:ss', showTime: true, valueFormat: 'YYYY-MM-DD HH:mm:ss' },
  },
  { component: 'InputNumber', fieldName: 'current_version', label: '版本号', componentProps: { style: 'width: 100%' } },
];
