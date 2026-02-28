import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { HuanxingUserResult } from '#/api/huanxing/user';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

export const querySchema: VbenFormSchema[] = [
  { component: 'Input', fieldName: 'server_id', label: '服务器ID', componentProps: { placeholder: '请输入服务器ID' } },
  { component: 'Input', fieldName: 'star_name', label: '超级大脑名', componentProps: { placeholder: '请输入名称' } },
  {
    component: 'Select', fieldName: 'agent_status', label: 'Agent状态',
    componentProps: { allowClear: true, options: getDictOptions('huanxing_agent_status') },
  },
  {
    component: 'Select', fieldName: 'channel_type', label: '注册渠道',
    componentProps: { allowClear: true, options: getDictOptions('huanxing_channel_type') },
  },
];

export function useColumns(
  onActionClick?: OnActionClickFn<HuanxingUserResult>,
): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: $t('common.table.id'), type: 'seq', fixed: 'left', width: 50 },
    { field: 'user_id', title: '用户ID', width: 80 },
    { field: 'server_id', title: '服务器ID', width: 120 },
    { field: 'agent_id', title: 'Agent ID', width: 140 },
    { field: 'star_name', title: '超级大脑名', width: 120 },
    { field: 'template', title: '模板', width: 100 },
    {
      field: 'agent_status', title: 'Agent状态', width: 110,
      cellRender: { name: 'CellTag', options: getDictOptions('huanxing_agent_status') },
    },
    {
      field: 'channel_type', title: '注册渠道', width: 100,
      cellRender: { name: 'CellTag', options: getDictOptions('huanxing_channel_type') },
    },
    { field: 'channel_peer_id', title: '渠道用户ID', width: 140 },
    { field: 'remark', title: '备注', width: 150 },
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
  { component: 'InputNumber', fieldName: 'user_id', label: '用户ID', rules: 'required', componentProps: { style: 'width: 100%' } },
  { component: 'Input', fieldName: 'server_id', label: '服务器ID', rules: 'required' },
  { component: 'Input', fieldName: 'agent_id', label: 'Agent ID' },
  { component: 'Input', fieldName: 'star_name', label: '超级大脑名' },
  { component: 'Input', fieldName: 'template', label: '模板类型', rules: 'required' },
  { component: 'Input', fieldName: 'workspace_path', label: '工作区路径' },
  {
    component: 'Select', fieldName: 'agent_status', label: 'Agent状态',
    componentProps: { options: getDictOptions('huanxing_agent_status') },
  },
  {
    component: 'Select', fieldName: 'channel_type', label: '注册渠道',
    componentProps: { options: getDictOptions('huanxing_channel_type') },
  },
  { component: 'Input', fieldName: 'channel_peer_id', label: '渠道用户ID' },
  { component: 'Textarea', fieldName: 'remark', label: '备注', componentProps: { rows: 3 } },
];
