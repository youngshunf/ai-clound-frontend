import { requestClient } from '#/api/request';

/**
 * 用户积分余额 API
 */

// Types
export interface UserCreditBalance {
  user_id: number;
  user_nickname?: string;
  user_phone?: string;
  credit_type: string;
  original_amount: number;
  used_amount: number;
  remaining_amount: number;
  expires_at?: string;
  granted_at: string;
  source_type: string;
  source_reference_id?: string;
  description?: string;
}

export interface UserCreditBalanceParams {
  page?: number;
  size?: number;
  user_keyword?: string;
  credit_type?: string;
  expires_at?: string;
  granted_at?: string;
  source_type?: string;
  source_reference_id?: string;
}

export interface UserCreditBalanceCreateParams {
  user_id: number;
  credit_type: string;
  original_amount: number;
  remaining_amount: number;
  expires_at?: string;
  granted_at: string;
  source_type: string;
  source_reference_id?: string;
  description?: string;
}

export interface UserCreditBalanceListResult {
  items: UserCreditBalance[];
  total: number;
}

// API functions
export async function getUserCreditBalanceListApi(params: UserCreditBalanceParams): Promise<UserCreditBalanceListResult> {
  return requestClient.get<UserCreditBalanceListResult>('/api/v1/user_tier/user/credit/balances', { params });
}

export async function getUserCreditBalanceApi(id: number): Promise<UserCreditBalance> {
  return requestClient.get<UserCreditBalance>(`/api/v1/user_tier/user/credit/balances/${id}`);
}

export async function createUserCreditBalanceApi(data: UserCreditBalanceCreateParams): Promise<UserCreditBalance> {
  return requestClient.post<UserCreditBalance>('/api/v1/user_tier/user/credit/balances', data);
}

export async function updateUserCreditBalanceApi(id: number, data: Partial<UserCreditBalanceCreateParams>): Promise<UserCreditBalance> {
  return requestClient.put<UserCreditBalance>(`/api/v1/user_tier/user/credit/balances/${id}`, data);
}

export async function deleteUserCreditBalanceApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/user_tier/user/credit/balances/${id}`);
}
