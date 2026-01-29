import { requestClient } from '#/api/request';

/**
 * 技能市场技能表 API
 */

// Types
export interface MarketplaceSkill {
  skill_id: string;
  name: string;
  description?: string;
  icon_url?: string;
  author_id?: number;
  author_name?: string;
  category?: string;
  tags?: string;
  pricing_type: string;
  price: number;
  is_private: boolean;
  is_official: boolean;
  download_count: number;
}

export interface MarketplaceSkillParams {
  page?: number;
  size?: number;
  skill_id?: string;
  name?: string;
  author_id?: number;
  author_name?: string;
  category?: string;
  pricing_type?: string;
}

export interface MarketplaceSkillCreateParams {
  skill_id: string;
  name: string;
  description?: string;
  icon_url?: string;
  author_id?: number;
  author_name?: string;
  category?: string;
  tags?: string;
  pricing_type: string;
  price: number;
  is_private: boolean;
  is_official: boolean;
  download_count: number;
}

export interface MarketplaceSkillListResult {
  items: MarketplaceSkill[];
  total: number;
}

// API functions
export async function getMarketplaceSkillListApi(params: MarketplaceSkillParams): Promise<MarketplaceSkillListResult> {
  return requestClient.get<MarketplaceSkillListResult>('/api/v1/marketplace/skills', { params });
}

export async function getMarketplaceSkillApi(id: number): Promise<MarketplaceSkill> {
  return requestClient.get<MarketplaceSkill>(`/api/v1/marketplace/skills/${id}`);
}

export async function createMarketplaceSkillApi(data: MarketplaceSkillCreateParams): Promise<MarketplaceSkill> {
  return requestClient.post<MarketplaceSkill>('/api/v1/marketplace/skills', data);
}

export async function updateMarketplaceSkillApi(id: number, data: Partial<MarketplaceSkillCreateParams>): Promise<MarketplaceSkill> {
  return requestClient.put<MarketplaceSkill>(`/api/v1/marketplace/skills/${id}`, data);
}

export async function deleteMarketplaceSkillApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/marketplace/skills/${id}`);
}
