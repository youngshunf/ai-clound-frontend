import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnMessages } from '#/api/hasn/hasn_messages';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'conversation_id',
    label: 'conversation_id',
    componentProps: {"placeholder": "Search by conversation_id"},
  },
  {
    component: 'Input',
    fieldName: 'from_id',
    label: 'from_id',
    componentProps: {"placeholder": "Search by from_id"},
  },
  {
    component: 'Select',
    fieldName: 'from_type',
    label: 'from_type',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_from_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'content_type',
    label: 'content_type',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_content_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: 'status',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_msg_status'),
    },
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
  onActionClick?: OnActionClickFn<HasnMessages>,
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
      field: 'conversation_id',
      title: 'conversation_id',
      width: 150,
    },
    {
      field: 'from_id',
      title: 'from_id',
      width: 150,
    },
    {
      field: 'from_type',
      title: 'from_type',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_from_type'),
      },
    },
    {
      field: 'content_type',
      title: 'content_type',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_content_type'),
      },
    },
    {
      field: 'reply_to',
      title: 'reply_to',
      width: 150,
    },
    {
      field: 'status',
      title: 'status',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_msg_status'),
      },
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
    fieldName: 'conversation_id',
    label: 'conversation_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'from_id',
    label: 'from_id',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'from_type',
    label: 'from_type',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_from_type'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'content',
    label: 'content',
    rules: 'required',
    componentProps: {"rows": 4},
  },
  {
    component: 'Select',
    fieldName: 'content_type',
    label: 'content_type',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_content_type'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'metadata',
    label: 'metadata',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'InputNumber',
    fieldName: 'reply_to',
    label: 'reply_to',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: 'status',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_msg_status'),
    },
  },
];
