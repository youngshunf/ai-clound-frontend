import { requestClient } from '#/api/request';

// ==================== 类型定义 ====================

export interface HuanxingDocumentAutosaveResult {
  id: number;
  document_id: number;
  user_id: number;
  content: string;
  saved_at: string;
}

export interface HuanxingDocumentAutosaveParams {
  document_id?: number;
  user_id?: number;
  page?: number;
  size?: number;
}

export interface HuanxingDocumentAutosaveCreateParams {
  document_id: number;
  user_id: number;
  content: string;
}

// ==================== API ====================

export async function getHuanxingDocumentAutosaveListApi(params?: HuanxingDocumentAutosaveParams) {
  return requestClient.get<HuanxingDocumentAutosaveResult[]>(
    '/api/v1/huanxing/document/autosaves',
    { params },
  );
}

export async function getHuanxingDocumentAutosaveApi(pk: number) {
  return requestClient.get<HuanxingDocumentAutosaveResult>(
    `/api/v1/huanxing/document/autosaves/${pk}`,
  );
}

export async function createHuanxingDocumentAutosaveApi(data: HuanxingDocumentAutosaveCreateParams) {
  return requestClient.post('/api/v1/huanxing/document/autosaves', data);
}

export async function updateHuanxingDocumentAutosaveApi(
  pk: number,
  data: Partial<HuanxingDocumentAutosaveCreateParams>,
) {
  return requestClient.put(`/api/v1/huanxing/document/autosaves/${pk}`, data);
}

export async function deleteHuanxingDocumentAutosaveApi(pk: number) {
  return requestClient.delete(`/api/v1/huanxing/document/autosaves/${pk}`);
}
