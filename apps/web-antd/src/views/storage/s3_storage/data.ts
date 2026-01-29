import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { S3Storage } from '#/api/storage/s3_storage';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'name',
    label: '存储名称',
    componentProps: { placeholder: '请输入存储名称' },
  },
  {
    component: 'Input',
    fieldName: 'region',
    label: '区域',
    componentProps: { placeholder: '请输入区域' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<S3Storage>,
): VxeGridProps['columns'] {
  return [
    {
      field: 'seq',
      title: $t('common.table.id'),
      type: 'seq',
      fixed: 'left',
      width: 60,
    },
    {
      field: 'name',
      title: '存储名称',
      minWidth: 120,
    },
    {
      field: 'endpoint',
      title: '终端节点',
      minWidth: 200,
    },
    {
      field: 'bucket',
      title: '存储桶',
      minWidth: 120,
    },
    {
      field: 'region',
      title: '区域',
      width: 100,
    },
    {
      field: 'prefix',
      title: '前缀',
      width: 120,
    },
    {
      field: 'remark',
      title: '备注',
      minWidth: 150,
    },
    {
      field: 'created_time',
      title: '创建时间',
      width: 160,
      formatter: 'formatDateTime',
    },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 150,
      cellRender: {
        attrs: {
          nameField: 'name',
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
    fieldName: 'name',
    label: '存储名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'endpoint',
    label: '终端节点 URL',
    rules: 'required',
    componentProps: { placeholder: 'https://s3.amazonaws.com' },
  },
  {
    component: 'Input',
    fieldName: 'access_key',
    label: '访问密钥 (Access Key)',
    rules: 'required',
  },
  {
    component: 'InputPassword',
    fieldName: 'secret_key',
    label: '密钥 (Secret Key)',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'bucket',
    label: '存储桶名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'prefix',
    label: '路径前缀',
    componentProps: { placeholder: '可选，如: uploads/' },
  },
  {
    component: 'Input',
    fieldName: 'region',
    label: '区域',
    componentProps: { placeholder: '可选，如: us-east-1' },
  },
  {
    component: 'Textarea',
    fieldName: 'remark',
    label: '备注',
    componentProps: { rows: 3 },
  },
];
