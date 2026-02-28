import { requestClient } from '#/api/request';

// ==================== 类型定义 ====================

export interface HuanxingServerResult {
  id: number;
  server_id: string;
  server_name: string | null;
  ip_address: string;
  port: number | null;
  region: string | null;
  provider: string | null;
  max_users: number | null;
  status: number | null;
  gateway_status: string | null;
  last_heartbeat: string | null;
  config: Record<string, any> | null;
  remark: string | null;
  created_time: string;
  updated_time: string | null;
}

export interface HuanxingServerParams {
  server_id?: string;
  server_name?: string;
  status?: number;
  page?: number;
  size?: number;
}

export interface HuanxingServerCreateParams {
  server_id: string;
  server_name?: string;
  ip_address: string;
  port?: number;
  region?: string;
  provider?: string;
  max_users?: number;
  status?: number;
  remark?: string;
}

export interface HuanxingServerUpdateParams {
  server_id?: string;
  server_name?: string;
  ip_address?: string;
  port?: number;
  region?: string;
  provider?: string;
  max_users?: number;
  status?: number;
  gateway_status?: string;
  config?: Record<string, any>;
  remark?: string;
}

// ==================== API ====================

export async function getHuanxingServerListApi(params?: HuanxingServerParams) {
  return requestClient.get<HuanxingServerResult[]>(
    '/api/v1/huanxing/servers',
    { params },
  );
}

export async function getHuanxingServerApi(pk: number) {
  return requestClient.get<HuanxingServerResult>(
    `/api/v1/huanxing/servers/${pk}`,
  );
}

export async function createHuanxingServerApi(
  data: HuanxingServerCreateParams,
) {
  return requestClient.post('/api/v1/huanxing/servers', data);
}

export async function updateHuanxingServerApi(
  pk: number,
  data: Partial<HuanxingServerUpdateParams>,
) {
  return requestClient.put(`/api/v1/huanxing/servers/${pk}`, data);
}

export async function deleteHuanxingServerApi(pks: number[]) {
  return requestClient.delete('/api/v1/huanxing/servers', { data: { pks } });
}
