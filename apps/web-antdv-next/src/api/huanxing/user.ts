import { requestClient } from '#/api/request';

// ==================== 类型定义 ====================

export interface HuanxingUserResult {
  id: number;
  user_id: number;
  server_id: string;
  agent_id: string | null;
  star_name: string | null;
  template: string;
  workspace_path: string | null;
  agent_status: number | null;
  channel_type: string | null;
  channel_peer_id: string | null;
  remark: string | null;
  created_time: string;
  updated_time: string | null;
}

export interface HuanxingUserParams {
  server_id?: string;
  template?: string;
  agent_status?: number;
  channel_type?: string;
  page?: number;
  size?: number;
}

export interface HuanxingUserCreateParams {
  user_id: number;
  server_id: string;
  agent_id?: string;
  star_name?: string;
  template: string;
  workspace_path?: string;
  agent_status?: number;
  channel_type?: string;
  channel_peer_id?: string;
  remark?: string;
}

export interface HuanxingUserUpdateParams {
  user_id?: number;
  server_id?: string;
  agent_id?: string;
  star_name?: string;
  template?: string;
  workspace_path?: string;
  agent_status?: number;
  channel_type?: string;
  channel_peer_id?: string;
  remark?: string;
}

// ==================== API ====================

export async function getHuanxingUserListApi(params?: HuanxingUserParams) {
  return requestClient.get<HuanxingUserResult[]>(
    '/api/v1/huanxing/users',
    { params },
  );
}

export async function getHuanxingUserApi(pk: number) {
  return requestClient.get<HuanxingUserResult>(
    `/api/v1/huanxing/users/${pk}`,
  );
}

export async function createHuanxingUserApi(data: HuanxingUserCreateParams) {
  return requestClient.post('/api/v1/huanxing/users', data);
}

export async function updateHuanxingUserApi(
  pk: number,
  data: Partial<HuanxingUserUpdateParams>,
) {
  return requestClient.put(`/api/v1/huanxing/users/${pk}`, data);
}

export async function deleteHuanxingUserApi(pks: number[]) {
  return requestClient.delete('/api/v1/huanxing/users', { data: { pks } });
}
