import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { MarketplaceDownload } from '#/api/marketplace/marketplace_download';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '用户ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Select',
    fieldName: 'item_type',
    label: '类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('marketplace_item_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'item_id',
    label: '应用或技能ID',
    componentProps: {"placeholder": "Search by \u5e94\u7528\u6216\u6280\u80fdID"},
  },
  {
    component: 'RangePicker',
    fieldName: 'downloaded_at',
    label: '下载时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<MarketplaceDownload>,
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
      field: 'user_id',
      title: '用户ID',
      width: 150,
    },
    {
      field: 'item_type',
      title: '类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('marketplace_item_type'),
      },
    },
    {
      field: 'item_id',
      title: '应用或技能ID',
      width: 150,
    },
    {
      field: 'version',
      title: '下载的版本',
      width: 150,
    },
    {
      field: 'downloaded_at',
      title: '下载时间',
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
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '用户ID',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Select',
    fieldName: 'item_type',
    label: '类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('marketplace_item_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'item_id',
    label: '应用或技能ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'version',
    label: '下载的版本',
    rules: 'required',
  },
  {
    component: 'DatePicker',
    fieldName: 'downloaded_at',
    label: '下载时间',
    rules: 'required',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
];
