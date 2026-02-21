import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { AppVersion } from '#/api/admin/app_version';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'app_code',
    label: '应用标识',
    componentProps: {"placeholder": "Search by \u5e94\u7528\u6807\u8bc6 (creator-flow:CreatorFlow/craft-agent:CraftAgent)"},
  },
  {
    component: 'Input',
    fieldName: 'filename',
    label: '文件名',
    componentProps: {"placeholder": "Search by \u6587\u4ef6\u540d"},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('admin_status'),
    },
  },
  {
    component: 'RangePicker',
    fieldName: 'published_at',
    label: '发布时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<AppVersion>,
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
      field: 'app_code',
      title: '应用标识',
      width: 150,
    },
    {
      field: 'version',
      title: '语义化版本号',
      width: 150,
    },
    {
      field: 'platform',
      title: '平台',
      width: 150,
    },
    {
      field: 'arch',
      title: '架构',
      width: 150,
    },
    {
      field: 'download_url',
      title: '下载地址',
      width: 150,
    },
    {
      field: 'file_hash',
      title: 'SHA256 校验值',
      width: 150,
    },
    {
      field: 'file_size',
      title: '文件大小',
      width: 150,
    },
    {
      field: 'filename',
      title: '文件名',
      width: 150,
    },
    {
      field: 'min_version',
      title: '最小兼容版本',
      width: 150,
    },
    {
      field: 'is_force_update',
      title: '是否强制更新',
      width: 150,
    },
    {
      field: 'is_latest',
      title: '是否为最新版本',
      width: 150,
    },
    {
      field: 'status',
      title: '状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('admin_status'),
      },
    },
    {
      field: 'published_at',
      title: '发布时间',
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
    fieldName: 'app_code',
    label: '应用标识',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'version',
    label: '语义化版本号',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'platform',
    label: '平台',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'arch',
    label: '架构',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'download_url',
    label: '下载地址',
    rules: 'required',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'file_hash',
    label: 'SHA256 校验值',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'file_size',
    label: '文件大小',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'filename',
    label: '文件名',
  },
  {
    component: 'Textarea',
    fieldName: 'changelog',
    label: '更新日志',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'min_version',
    label: '最小兼容版本',
  },
  {
    component: 'Switch',
    fieldName: 'is_force_update',
    label: '是否强制更新',
  },
  {
    component: 'Switch',
    fieldName: 'is_latest',
    label: '是否为最新版本',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('admin_status'),
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'published_at',
    label: '发布时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
];
