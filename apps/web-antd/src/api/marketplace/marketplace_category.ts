import { requestClient } from '#/api/request';

/**
 * 技能市场分类表 API
 */

// Types
export interface MarketplaceCategory {
  slug: string;
  name: string;
  icon?: string;
  parent_slug?: string;
  sort_order: number;
}

export interface MarketplaceCategoryParams {
  page?: number;
  size?: number;
  name?: string;
}

export interface MarketplaceCategoryCreateParams {
  slug: string;
  name: string;
  icon?: string;
  parent_slug?: string;
  sort_order: number;
}

export interface MarketplaceCategoryListResult {
  items: MarketplaceCategory[];
  total: number;
}

// API functions
export async function getMarketplaceCategoryListApi(params: MarketplaceCategoryParams): Promise<MarketplaceCategoryListResult> {
  return requestClient.get<MarketplaceCategoryListResult>('/api/v1/marketplace/categories', { params });
}

export async function getMarketplaceCategoryApi(id: number): Promise<MarketplaceCategory> {
  return requestClient.get<MarketplaceCategory>(`/api/v1/marketplace/categories/${id}`);
}

export async function createMarketplaceCategoryApi(data: MarketplaceCategoryCreateParams): Promise<MarketplaceCategory> {
  return requestClient.post<MarketplaceCategory>('/api/v1/marketplace/categories', data);
}

export async function updateMarketplaceCategoryApi(id: number, data: Partial<MarketplaceCategoryCreateParams>): Promise<MarketplaceCategory> {
  return requestClient.put<MarketplaceCategory>(`/api/v1/marketplace/categories/${id}`, data);
}

export async function deleteMarketplaceCategoryApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/marketplace/categories/${id}`);
}
