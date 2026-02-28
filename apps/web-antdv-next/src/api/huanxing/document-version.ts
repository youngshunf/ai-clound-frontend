import { requestClient } from '#/api/request';

// ==================== 类型定义 ====================

export interface HuanxingDocumentVersionResult {
  id: number;
  document_id: number;
  version_number: number;
  title: string;
  content: string;
  created_by: number;
  created_at: string;
}

export interface HuanxingDocumentVersionParams {
  document_id?: number;
  title?: string;
  page?: number;
  size?: number;
}

export interface HuanxingDocumentVersionCreateParams {
  document_id: number;
  version_number: number;
  title: string;
  content: string;
  created_by: number;
}

// ==================== API ====================

export async function getHuanxingDocumentVersionListApi(params?: HuanxingDocumentVersionParams) {
  return requestClient.get<HuanxingDocumentVersionResult[]>(
    '/api/v1/huanxing/document/versions',
    { params },
  );
}

export async function getHuanxingDocumentVersionApi(pk: number) {
  return requestClient.get<HuanxingDocumentVersionResult>(
    `/api/v1/huanxing/document/versions/${pk}`,
  );
}

export async function createHuanxingDocumentVersionApi(data: HuanxingDocumentVersionCreateParams) {
  return requestClient.post('/api/v1/huanxing/document/versions', data);
}

export async function updateHuanxingDocumentVersionApi(
  pk: number,
  data: Partial<HuanxingDocumentVersionCreateParams>,
) {
  return requestClient.put(`/api/v1/huanxing/document/versions/${pk}`, data);
}

export async function deleteHuanxingDocumentVersionApi(pk: number) {
  return requestClient.delete(`/api/v1/huanxing/document/versions/${pk}`);
}
