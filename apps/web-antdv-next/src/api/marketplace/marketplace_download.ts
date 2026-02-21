import { requestClient } from '#/api/request';

/**
 * 用户下载记录表 API
 */

// Types
export interface MarketplaceDownload {
  user_id: number;
  item_type: string;
  item_id: string;
  version: string;
  downloaded_at: string;
}

export interface MarketplaceDownloadParams {
  page?: number;
  size?: number;
  user_id?: number;
  item_type?: string;
  item_id?: string;
  downloaded_at?: string;
}

export interface MarketplaceDownloadCreateParams {
  user_id: number;
  item_type: string;
  item_id: string;
  version: string;
  downloaded_at: string;
}

export interface MarketplaceDownloadListResult {
  items: MarketplaceDownload[];
  total: number;
}

// API functions
export async function getMarketplaceDownloadListApi(params: MarketplaceDownloadParams): Promise<MarketplaceDownloadListResult> {
  return requestClient.get<MarketplaceDownloadListResult>('/api/v1/marketplace/downloads', { params });
}

export async function getMarketplaceDownloadApi(id: number): Promise<MarketplaceDownload> {
  return requestClient.get<MarketplaceDownload>(`/api/v1/marketplace/downloads/${id}`);
}

export async function createMarketplaceDownloadApi(data: MarketplaceDownloadCreateParams): Promise<MarketplaceDownload> {
  return requestClient.post<MarketplaceDownload>('/api/v1/marketplace/downloads', data);
}

export async function updateMarketplaceDownloadApi(id: number, data: Partial<MarketplaceDownloadCreateParams>): Promise<MarketplaceDownload> {
  return requestClient.put<MarketplaceDownload>(`/api/v1/marketplace/downloads/${id}`, data);
}

export async function deleteMarketplaceDownloadApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/marketplace/downloads/${id}`);
}
