import { requestClient } from '#/api/request';

/**
 * 订阅等级配置表 API
 */

// Types
export interface SubscriptionTier {
  tier_name: string;
  display_name: string;
  monthly_credits: number;
  monthly_price: number;
  features: Record<string, any>;
  enabled: boolean;
  sort_order: number;
}

export interface SubscriptionTierParams {
  page?: number;
  size?: number;
  tier_name?: string;
  display_name?: string;
}

export interface SubscriptionTierCreateParams {
  tier_name: string;
  display_name: string;
  monthly_credits: number;
  monthly_price: number;
  features: Record<string, any>;
  enabled: boolean;
  sort_order: number;
}

export interface SubscriptionTierListResult {
  items: SubscriptionTier[];
  total: number;
}

// API functions
export async function getSubscriptionTierListApi(params: SubscriptionTierParams): Promise<SubscriptionTierListResult> {
  return requestClient.get<SubscriptionTierListResult>('/api/v1/user_tier/subscription/tiers', { params });
}

export async function getSubscriptionTierApi(id: number): Promise<SubscriptionTier> {
  return requestClient.get<SubscriptionTier>(`/api/v1/user_tier/subscription/tiers/${id}`);
}

export async function createSubscriptionTierApi(data: SubscriptionTierCreateParams): Promise<SubscriptionTier> {
  return requestClient.post<SubscriptionTier>('/api/v1/user_tier/subscription/tiers', data);
}

export async function updateSubscriptionTierApi(id: number, data: Partial<SubscriptionTierCreateParams>): Promise<SubscriptionTier> {
  return requestClient.put<SubscriptionTier>(`/api/v1/user_tier/subscription/tiers/${id}`, data);
}

export async function deleteSubscriptionTierApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/user_tier/subscription/tiers/${id}`);
}
