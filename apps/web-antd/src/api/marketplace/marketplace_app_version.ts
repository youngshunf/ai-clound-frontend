import { requestClient } from '#/api/request';

/**
 * 应用版本表 API
 */

// Types
export interface MarketplaceAppVersion {
  app_id: string;
  version: string;
  changelog?: string;
  skill_dependencies_versioned?: Record<string, any>;
  package_url?: string;
  file_hash?: string;
  file_size?: number;
  is_latest: boolean;
  published_at: string;
}

export interface MarketplaceAppVersionParams {
  page?: number;
  size?: number;
  app_id?: string;
  published_at?: string;
}

export interface MarketplaceAppVersionCreateParams {
  app_id: string;
  version: string;
  changelog?: string;
  skill_dependencies_versioned?: Record<string, any>;
  package_url?: string;
  file_hash?: string;
  file_size?: number;
  is_latest: boolean;
  published_at: string;
}

export interface MarketplaceAppVersionListResult {
  items: MarketplaceAppVersion[];
  total: number;
}

// API functions
export async function getMarketplaceAppVersionListApi(params: MarketplaceAppVersionParams): Promise<MarketplaceAppVersionListResult> {
  return requestClient.get<MarketplaceAppVersionListResult>('/api/v1/marketplace/apps/versions', { params });
}

export async function getMarketplaceAppVersionApi(id: number): Promise<MarketplaceAppVersion> {
  return requestClient.get<MarketplaceAppVersion>(`/api/v1/marketplace/apps/versions/${id}`);
}

export async function createMarketplaceAppVersionApi(data: MarketplaceAppVersionCreateParams): Promise<MarketplaceAppVersion> {
  return requestClient.post<MarketplaceAppVersion>('/api/v1/marketplace/apps/versions', data);
}

export async function updateMarketplaceAppVersionApi(id: number, data: Partial<MarketplaceAppVersionCreateParams>): Promise<MarketplaceAppVersion> {
  return requestClient.put<MarketplaceAppVersion>(`/api/v1/marketplace/apps/versions/${id}`, data);
}

export async function deleteMarketplaceAppVersionApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/marketplace/apps/versions/${id}`);
}
