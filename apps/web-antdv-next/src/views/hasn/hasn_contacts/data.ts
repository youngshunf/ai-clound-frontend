import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnContacts } from '#/api/hasn/hasn_contacts';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: 'owner_id',
    componentProps: {"placeholder": "Search by owner_id"},
  },
  {
    component: 'Input',
    fieldName: 'peer_id',
    label: 'peer_id',
    componentProps: {"placeholder": "Search by peer_id"},
  },
  {
    component: 'Select',
    fieldName: 'peer_type',
    label: 'peer_type',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_peer_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'relation_type',
    label: 'relation_type',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_relation_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: 'nickname',
    componentProps: {"placeholder": "Search by nickname"},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: 'status',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_contact_status'),
    },
  },
  {
    component: 'RangePicker',
    fieldName: 'auto_expire',
    label: 'auto_expire',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'connected_at',
    label: 'connected_at',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'last_interaction_at',
    label: 'last_interaction_at',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'created_time',
    label: 'created_time',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'updated_time',
    label: 'updated_time',
    componentProps: {"format": "YYYY-MM-DD"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnContacts>,
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
      field: 'owner_id',
      title: 'owner_id',
      width: 150,
    },
    {
      field: 'peer_id',
      title: 'peer_id',
      width: 150,
    },
    {
      field: 'peer_type',
      title: 'peer_type',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_peer_type'),
      },
    },
    {
      field: 'relation_type',
      title: 'relation_type',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_relation_type'),
      },
    },
    {
      field: 'trust_level',
      title: 'trust_level',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_trust_level'),
      },
    },
    {
      field: 'nickname',
      title: 'nickname',
      width: 150,
    },
    {
      field: 'subscription',
      title: 'subscription',
      width: 150,
    },
    {
      field: 'status',
      title: 'status',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_contact_status'),
      },
    },
    {
      field: 'auto_expire',
      title: 'auto_expire',
      width: 150,
    },
    {
      field: 'connected_at',
      title: 'connected_at',
      width: 150,
    },
    {
      field: 'last_interaction_at',
      title: 'last_interaction_at',
      width: 150,
    },
    {
      field: 'interaction_count',
      title: 'interaction_count',
      width: 150,
    },
    {
      field: 'created_time',
      title: 'created_time',
      width: 150,
    },
    {
      field: 'updated_time',
      title: 'updated_time',
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
    fieldName: 'owner_id',
    label: 'owner_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'peer_id',
    label: 'peer_id',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'peer_type',
    label: 'peer_type',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_peer_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'relation_type',
    label: 'relation_type',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_relation_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'trust_level',
    label: 'trust_level',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_trust_level'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'scope',
    label: 'scope',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'custom_permissions',
    label: 'custom_permissions',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: 'nickname',
  },
  {
    component: 'Textarea',
    fieldName: 'tags',
    label: 'tags',
    componentProps: {"rows": 4},
  },
  {
    component: 'Switch',
    fieldName: 'subscription',
    label: 'subscription',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: 'status',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_contact_status'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'request_message',
    label: 'request_message',
    componentProps: {"rows": 4},
  },
  {
    component: 'DatePicker',
    fieldName: 'auto_expire',
    label: 'auto_expire',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'DatePicker',
    fieldName: 'connected_at',
    label: 'connected_at',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'DatePicker',
    fieldName: 'last_interaction_at',
    label: 'last_interaction_at',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'InputNumber',
    fieldName: 'interaction_count',
    label: 'interaction_count',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
];
