import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { PayChannel } from '#/api/pay/channel';

import { $t } from '@vben/locales';

const STATUS_OPTIONS = [
  { label: '启用', value: 1, color: 'green' },
  { label: '停用', value: 0, color: 'red' },
];

export const CHANNEL_CODE_OPTIONS = [
  { label: '微信 JSAPI 支付', value: 'wx_pub' },
  { label: '微信小程序支付', value: 'wx_lite' },
  { label: '微信 APP 支付', value: 'wx_app' },
  { label: '微信 Native 扫码支付', value: 'wx_native' },
  { label: '微信 H5 支付', value: 'wx_h5' },
  { label: '微信条码支付', value: 'wx_bar' },
  { label: '微信委托代扣', value: 'wx_papay' },
  { label: '支付宝 PC 网站支付', value: 'alipay_pc' },
  { label: '支付宝 WAP 网站支付', value: 'alipay_wap' },
  { label: '支付宝 APP 支付', value: 'alipay_app' },
  { label: '支付宝扫码支付', value: 'alipay_qr' },
  { label: '支付宝条码支付', value: 'alipay_bar' },
  { label: '支付宝周期扣款', value: 'alipay_cycle' },
];

// ===== 列表搜索 =====
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Select', fieldName: 'code', label: '渠道编码',
    componentProps: { allowClear: true, options: CHANNEL_CODE_OPTIONS, style: 'min-width: 200px' },
  },
  {
    component: 'Select', fieldName: 'status', label: '状态',
    componentProps: { allowClear: true, options: STATUS_OPTIONS },
  },
];

// ===== 列表列 =====
export function useColumns(onActionClick?: OnActionClickFn<PayChannel>): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: '#', type: 'seq', width: 50 },
    { field: 'id', title: 'ID', width: 60 },
    { field: 'merchant_id', title: '商户ID', width: 80 },
    { field: 'code', title: '渠道编码', minWidth: 180, cellRender: { name: 'CellTag', options: CHANNEL_CODE_OPTIONS } },
    { field: 'name', title: '渠道名称', minWidth: 120 },
    { field: 'status', title: '状态', width: 80, cellRender: { name: 'CellTag', options: STATUS_OPTIONS } },
    {
      field: 'fee_rate', title: '费率', width: 90,
      formatter({ cellValue }) { return cellValue != null ? `${(cellValue * 100).toFixed(2)}%` : '-'; },
    },
    { field: 'remark', title: '备注', minWidth: 150 },
    { field: 'created_time', title: '创建时间', width: 170 },
    {
      field: 'operation', title: $t('common.table.operation'), align: 'center', fixed: 'right', width: 160,
      cellRender: { attrs: { nameField: 'name', onClick: onActionClick }, name: 'CellOperation', options: ['edit', 'delete'] },
    },
  ];
}

/** 需要扩展配置的签约渠道 */
const CONTRACT_CHANNELS = ['wx_papay', 'alipay_cycle'];

// ===== 表单 =====
export const formSchema: VbenFormSchema[] = [
  {
    component: 'ApiSelect', fieldName: 'merchant_id', label: '所属商户', rules: 'required',
    componentProps: {
      api: async () => {
        const { getPayMerchantSimpleApi } = await import('#/api/pay/merchant');
        const res = await getPayMerchantSimpleApi();
        const list = (res as any)?.data ?? res ?? [];
        return list.map((m: any) => ({ label: `${m.name}（${m.type === 'weixin' ? '微信' : '支付宝'}）`, value: m.id }));
      },
      placeholder: '请选择商户', popupMatchSelectWidth: false, style: 'width: 100%',
    },
  },
  {
    component: 'Select', fieldName: 'code', label: '渠道编码', rules: 'required',
    componentProps: { options: CHANNEL_CODE_OPTIONS, showSearch: true, optionFilterProp: 'label', placeholder: '请选择渠道', popupMatchSelectWidth: false, style: 'width: 100%' },
  },
  {
    component: 'Input', fieldName: 'name', label: '渠道名称', rules: 'required',
    componentProps: { placeholder: '如：微信Native支付' },
  },
  {
    component: 'RadioGroup', fieldName: 'status', label: '状态', defaultValue: 1,
    componentProps: { options: STATUS_OPTIONS },
  },
  {
    component: 'InputNumber', fieldName: 'fee_rate', label: '渠道费率',
    componentProps: { min: 0, max: 1, step: 0.001, style: 'width: 100%', placeholder: '如 0.006 表示 0.6%' },
  },
  {
    component: 'Input', fieldName: 'remark', label: '备注',
    componentProps: { placeholder: '备注信息' },
  },
  // ---- 签约渠道扩展配置 ----
  {
    component: 'Input', fieldName: 'extra_config.plan_id', label: '签约模板ID',
    componentProps: { placeholder: '微信商户后台的委托代扣模板ID' },
    dependencies: {
      triggerFields: ['code'],
      show: (values: Record<string, any>) => values?.code === 'wx_papay',
    },
  },
  {
    component: 'Input', fieldName: 'extra_config.contract_notify_url', label: '签约回调URL',
    componentProps: { placeholder: '签约/解约结果通知地址（不填则使用默认）' },
    dependencies: {
      triggerFields: ['code'],
      show: (values: Record<string, any>) => CONTRACT_CHANNELS.includes(values?.code),
    },
  },
  {
    component: 'Input', fieldName: 'extra_config.personal_product_code', label: '个人签约产品码',
    componentProps: { placeholder: '支付宝周期扣款产品码，如 CYCLE_PAY_AUTH_P' },
    dependencies: {
      triggerFields: ['code'],
      show: (values: Record<string, any>) => values?.code === 'alipay_cycle',
    },
  },
];
