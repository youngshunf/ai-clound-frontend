import { requestClient } from '#/api/request';

/**
 * 用户订阅表 API
 */

// Types
export interface UserSubscription {
  user_id: number;
  user_nickname?: string;
  user_phone?: string;
  tier: string;
  subscription_type: string;
  monthly_credits: number;
  current_credits: number;
  used_credits: number;
  purchased_credits: number;
  billing_cycle_start: string;
  billing_cycle_end: string;
  subscription_start_date: string | null;
  subscription_end_date: string | null;
  next_grant_date: string | null;
  status: string;
  auto_renew: boolean;
}

export interface UserSubscriptionParams {
  page?: number;
  size?: number;
  user_keyword?: string;
  billing_cycle_start?: string;
  billing_cycle_end?: string;
  status?: string;
}

export interface UserSubscriptionCreateParams {
  user_id: number;
  tier: string;
  subscription_type?: string;
  monthly_credits: number;
  current_credits: number;
  used_credits: number;
  purchased_credits: number;
  billing_cycle_start: string;
  billing_cycle_end: string;
  subscription_start_date?: string | null;
  subscription_end_date?: string | null;
  next_grant_date?: string | null;
  status: string;
  auto_renew: boolean;
}

export interface UserSubscriptionListResult {
  items: UserSubscription[];
  total: number;
}

// API functions
export async function getUserSubscriptionListApi(params: UserSubscriptionParams): Promise<UserSubscriptionListResult> {
  return requestClient.get<UserSubscriptionListResult>('/api/v1/user_tier/user/subscriptions', { params });
}

export async function getUserSubscriptionApi(id: number): Promise<UserSubscription> {
  return requestClient.get<UserSubscription>(`/api/v1/user_tier/user/subscriptions/${id}`);
}

export async function createUserSubscriptionApi(data: UserSubscriptionCreateParams): Promise<UserSubscription> {
  return requestClient.post<UserSubscription>('/api/v1/user_tier/user/subscriptions', data);
}

export async function updateUserSubscriptionApi(id: number, data: Partial<UserSubscriptionCreateParams>): Promise<UserSubscription> {
  return requestClient.put<UserSubscription>(`/api/v1/user_tier/user/subscriptions/${id}`, data);
}

export async function deleteUserSubscriptionApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/user_tier/user/subscriptions/${id}`);
}
