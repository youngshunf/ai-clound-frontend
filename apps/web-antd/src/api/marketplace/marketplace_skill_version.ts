import { requestClient } from '#/api/request';

/**
 * 技能版本表 API
 */

// Types
export interface MarketplaceSkillVersion {
  skill_id: string;
  version: string;
  changelog?: string;
  package_url?: string;
  file_hash?: string;
  file_size?: number;
  is_latest: boolean;
  published_at: string;
}

export interface MarketplaceSkillVersionParams {
  page?: number;
  size?: number;
  skill_id?: string;
  published_at?: string;
}

export interface MarketplaceSkillVersionCreateParams {
  skill_id: string;
  version: string;
  changelog?: string;
  package_url?: string;
  file_hash?: string;
  file_size?: number;
  is_latest: boolean;
  published_at: string;
}

export interface MarketplaceSkillVersionListResult {
  items: MarketplaceSkillVersion[];
  total: number;
}

// API functions
export async function getMarketplaceSkillVersionListApi(params: MarketplaceSkillVersionParams): Promise<MarketplaceSkillVersionListResult> {
  return requestClient.get<MarketplaceSkillVersionListResult>('/api/v1/marketplace/skills/versions', { params });
}

export async function getMarketplaceSkillVersionApi(id: number): Promise<MarketplaceSkillVersion> {
  return requestClient.get<MarketplaceSkillVersion>(`/api/v1/marketplace/skills/versions/${id}`);
}

export async function createMarketplaceSkillVersionApi(data: MarketplaceSkillVersionCreateParams): Promise<MarketplaceSkillVersion> {
  return requestClient.post<MarketplaceSkillVersion>('/api/v1/marketplace/skills/versions', data);
}

export async function updateMarketplaceSkillVersionApi(id: number, data: Partial<MarketplaceSkillVersionCreateParams>): Promise<MarketplaceSkillVersion> {
  return requestClient.put<MarketplaceSkillVersion>(`/api/v1/marketplace/skills/versions/${id}`, data);
}

export async function deleteMarketplaceSkillVersionApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/marketplace/skills/versions/${id}`);
}
