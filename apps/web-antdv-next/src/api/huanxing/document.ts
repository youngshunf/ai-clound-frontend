import { requestClient } from '#/api/request';

// ==================== 类型定义 ====================

export interface HuanxingDocumentResult {
  id: number;
  uuid: string;
  user_id: number;
  title: string;
  content?: string;
  summary?: string;
  tags?: string;
  word_count: number;
  status: string;
  is_public: boolean;
  created_by: string;
  agent_id?: string;
  share_token?: string;
  share_password?: string;
  share_permission?: string;
  share_expires_at?: string;
  current_version: number;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface HuanxingDocumentParams {
  uuid?: string;
  user_id?: number;
  title?: string;
  status?: string;
  agent_id?: string;
  page?: number;
  size?: number;
}

export interface HuanxingDocumentCreateParams {
  uuid: string;
  user_id: number;
  title: string;
  content?: string;
  summary?: string;
  tags?: string;
  word_count?: number;
  status?: string;
  is_public?: boolean;
  created_by?: string;
  agent_id?: string;
  share_token?: string;
  share_password?: string;
  share_permission?: string;
  share_expires_at?: string;
  current_version?: number;
}

export interface HuanxingDocumentUpdateParams {
  uuid?: string;
  user_id?: number;
  title?: string;
  content?: string;
  summary?: string;
  tags?: string;
  word_count?: number;
  status?: string;
  is_public?: boolean;
  created_by?: string;
  agent_id?: string;
  share_token?: string;
  share_password?: string;
  share_permission?: string;
  share_expires_at?: string;
  current_version?: number;
}

// ==================== API ====================

export async function getHuanxingDocumentListApi(params?: HuanxingDocumentParams) {
  return requestClient.get<HuanxingDocumentResult[]>(
    '/api/v1/huanxing/documents',
    { params },
  );
}

export async function getHuanxingDocumentApi(pk: number) {
  return requestClient.get<HuanxingDocumentResult>(
    `/api/v1/huanxing/documents/${pk}`,
  );
}

export async function createHuanxingDocumentApi(data: HuanxingDocumentCreateParams) {
  return requestClient.post('/api/v1/huanxing/documents', data);
}

export async function updateHuanxingDocumentApi(
  pk: number,
  data: Partial<HuanxingDocumentUpdateParams>,
) {
  return requestClient.put(`/api/v1/huanxing/documents/${pk}`, data);
}

export async function deleteHuanxingDocumentApi(pk: number) {
  return requestClient.delete(`/api/v1/huanxing/documents/${pk}`);
}
