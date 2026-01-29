import { requestClient } from '#/api/request';

/**
 * 技能市场应用表 API
 */

// Types
export interface MarketplaceApp {
  app_id: string;
  name: string;
  description?: string;
  icon_url?: string;
  author_id?: number;
  author_name?: string;
  pricing_type: string;
  price: number;
  is_private: boolean;
  is_official: boolean;
  download_count: number;
  skill_dependencies?: string;
}

export interface MarketplaceAppParams {
  page?: number;
  size?: number;
  app_id?: string;
  name?: string;
  author_id?: number;
  author_name?: string;
  pricing_type?: string;
}

export interface MarketplaceAppCreateParams {
  app_id: string;
  name: string;
  description?: string;
  icon_url?: string;
  author_id?: number;
  author_name?: string;
  pricing_type: string;
  price: number;
  is_private: boolean;
  is_official: boolean;
  download_count: number;
  skill_dependencies?: string;
}

export interface MarketplaceAppListResult {
  items: MarketplaceApp[];
  total: number;
}

// API functions
export async function getMarketplaceAppListApi(params: MarketplaceAppParams): Promise<MarketplaceAppListResult> {
  return requestClient.get<MarketplaceAppListResult>('/api/v1/marketplace/apps', { params });
}

export async function getMarketplaceAppApi(id: number): Promise<MarketplaceApp> {
  return requestClient.get<MarketplaceApp>(`/api/v1/marketplace/apps/${id}`);
}

export async function createMarketplaceAppApi(data: MarketplaceAppCreateParams): Promise<MarketplaceApp> {
  return requestClient.post<MarketplaceApp>('/api/v1/marketplace/apps', data);
}

export async function updateMarketplaceAppApi(id: number, data: Partial<MarketplaceAppCreateParams>): Promise<MarketplaceApp> {
  return requestClient.put<MarketplaceApp>(`/api/v1/marketplace/apps/${id}`, data);
}

export async function deleteMarketplaceAppApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/marketplace/apps/${id}`);
}
