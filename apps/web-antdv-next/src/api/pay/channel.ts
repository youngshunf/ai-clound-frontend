import { requestClient } from '#/api/request';

export interface PayChannel {
  id: number;
  code: string;
  name: string;
  status: number;
  fee_rate: number;
  remark: string | null;
  config: Record<string, any>;
  extra_config: Record<string, any> | null;
  merchant_id: number | null;
  created_time: string;
  updated_time: string | null;
}

export interface PayChannelParams {
  code: string;
  name: string;
  status?: number;
  fee_rate?: number;
  remark?: string;
  config: Record<string, any>;
  extra_config?: Record<string, any>;
  merchant_id?: number;
}

export async function getPayChannelListApi(params?: Record<string, any>) {
  return requestClient.get('/api/v1/pay/channels', { params });
}

export async function createPayChannelApi(data: PayChannelParams) {
  return requestClient.post('/api/v1/pay/channels', data);
}

export async function updatePayChannelApi(pk: number, data: Partial<PayChannelParams>) {
  return requestClient.put(`/api/v1/pay/channels/${pk}`, data);
}

export async function updatePayChannelStatusApi(pk: number, data: { status: number }) {
  return requestClient.patch(`/api/v1/pay/channels/${pk}/status`, data);
}

export async function deletePayChannelApi(pks: number[]) {
  return requestClient.delete('/api/v1/pay/channels', { data: { pks } });
}
