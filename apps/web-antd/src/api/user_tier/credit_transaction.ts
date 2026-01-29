import { requestClient } from '#/api/request';

/**
 * 积分交易记录表 API
 */

// Types
export interface CreditTransaction {
  user_id: number;
  transaction_type: string;
  credits: number;
  balance_before: number;
  balance_after: number;
  reference_id?: string;
  reference_type?: string;
  description?: string;
  extra_data?: Record<string, any>;
}

export interface CreditTransactionParams {
  page?: number;
  size?: number;
  user_id?: number;
  transaction_type?: string;
  reference_id?: string;
  reference_type?: string;
}

export interface CreditTransactionCreateParams {
  user_id: number;
  transaction_type: string;
  credits: number;
  balance_before: number;
  balance_after: number;
  reference_id?: string;
  reference_type?: string;
  description?: string;
  extra_data?: Record<string, any>;
}

export interface CreditTransactionListResult {
  items: CreditTransaction[];
  total: number;
}

// API functions
export async function getCreditTransactionListApi(params: CreditTransactionParams): Promise<CreditTransactionListResult> {
  return requestClient.get<CreditTransactionListResult>('/api/v1/user_tier/credit/transactions', { params });
}

export async function getCreditTransactionApi(id: number): Promise<CreditTransaction> {
  return requestClient.get<CreditTransaction>(`/api/v1/user_tier/credit/transactions/${id}`);
}

export async function createCreditTransactionApi(data: CreditTransactionCreateParams): Promise<CreditTransaction> {
  return requestClient.post<CreditTransaction>('/api/v1/user_tier/credit/transactions', data);
}

export async function updateCreditTransactionApi(id: number, data: Partial<CreditTransactionCreateParams>): Promise<CreditTransaction> {
  return requestClient.put<CreditTransaction>(`/api/v1/user_tier/credit/transactions/${id}`, data);
}

export async function deleteCreditTransactionApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/user_tier/credit/transactions/${id}`);
}
