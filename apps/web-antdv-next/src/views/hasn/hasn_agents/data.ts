import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnAgents } from '#/api/hasn/hasn_agents';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'star_id',
    label: 'Agent 唤星号',
    componentProps: {"placeholder": "Search by Agent \u5524\u661f\u53f7 (100001#star)"},
  },
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: '所属 Human 的 hasn_id',
    componentProps: {"placeholder": "Search by \u6240\u5c5e Human \u7684 hasn_id"},
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: 'Agent 显示名',
    componentProps: {"placeholder": "Search by Agent \u663e\u793a\u540d"},
  },
  {
    component: 'Input',
    fieldName: 'openclaw_agent_id',
    label: '关联 OpenClaw Agent ID',
    componentProps: {"placeholder": "Search by \u5173\u8054 OpenClaw Agent ID"},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_agent_status'),
    },
  },
  {
    component: 'RangePicker',
    fieldName: 'last_active_at',
    label: '最后活跃时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnAgents>,
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
      field: 'star_id',
      title: 'Agent 唤星号',
      width: 150,
    },
    {
      field: 'owner_id',
      title: '所属 Human 的 hasn_id',
      width: 150,
    },
    {
      field: 'name',
      title: 'Agent 显示名',
      width: 150,
    },
    {
      field: 'api_key_hash',
      title: 'API Key 的 SHA256 哈希',
      width: 150,
    },
    {
      field: 'api_key_prefix',
      title: 'API Key 前16字符',
      width: 150,
    },
    {
      field: 'openclaw_agent_id',
      title: '关联 OpenClaw Agent ID',
      width: 150,
    },
    {
      field: 'role',
      title: '角色',
      width: 150,
    },
    {
      field: 'api_endpoint',
      title: '外部 Agent 回调地址',
      width: 150,
    },
    {
      field: 'reputation_score',
      title: '综合评分',
      width: 150,
    },
    {
      field: 'review_count',
      title: '评价总数',
      width: 150,
    },
    {
      field: 'total_interactions',
      title: '交互总次数',
      width: 150,
    },
    {
      field: 'experience_credit_score',
      title: '经验贡献信用分',
      width: 150,
    },
    {
      field: 'experience_shared_count',
      title: '分享的经验总数',
      width: 150,
    },
    {
      field: 'experience_adopted_count',
      title: '经验被采纳总次数',
      width: 150,
    },
    {
      field: 'status',
      title: '状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_agent_status'),
      },
    },
    {
      field: 'last_active_at',
      title: '最后活跃时间',
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
    fieldName: 'star_id',
    label: 'Agent 唤星号',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: '所属 Human 的 hasn_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: 'Agent 显示名',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'api_key_hash',
    label: 'API Key 的 SHA256 哈希',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'api_key_prefix',
    label: 'API Key 前16字符',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'openclaw_agent_id',
    label: '关联 OpenClaw Agent ID',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: 'Agent 描述',
    rules: 'required',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'role',
    label: '角色',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'capabilities',
    label: '能力列表',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'profile',
    label: 'Agent Profile Card',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'api_endpoint',
    label: '外部 Agent 回调地址',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'pricing',
    label: '定价信息',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'InputNumber',
    fieldName: 'reputation_score',
    label: '综合评分',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'review_count',
    label: '评价总数',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'total_interactions',
    label: '交互总次数',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'experience_credit_score',
    label: '经验贡献信用分',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'experience_shared_count',
    label: '分享的经验总数',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'experience_adopted_count',
    label: '经验被采纳总次数',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_agent_status'),
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'last_active_at',
    label: '最后活跃时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
];
