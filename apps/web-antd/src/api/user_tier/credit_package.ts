import { requestClient } from '#/api/request';

/**
 * 积分包配置表 API
 */

// Types
export interface CreditPackage {
  package_name: string;
  credits: number;
  price: number;
  bonus_credits: number;
  description?: string;
  enabled: boolean;
  sort_order: number;
}

export interface CreditPackageParams {
  page?: number;
  size?: number;
  package_name?: string;
}

export interface CreditPackageCreateParams {
  package_name: string;
  credits: number;
  price: number;
  bonus_credits: number;
  description?: string;
  enabled: boolean;
  sort_order: number;
}

export interface CreditPackageListResult {
  items: CreditPackage[];
  total: number;
}

// API functions
export async function getCreditPackageListApi(params: CreditPackageParams): Promise<CreditPackageListResult> {
  return requestClient.get<CreditPackageListResult>('/api/v1/user_tier/credit/packages', { params });
}

export async function getCreditPackageApi(id: number): Promise<CreditPackage> {
  return requestClient.get<CreditPackage>(`/api/v1/user_tier/credit/packages/${id}`);
}

export async function createCreditPackageApi(data: CreditPackageCreateParams): Promise<CreditPackage> {
  return requestClient.post<CreditPackage>('/api/v1/user_tier/credit/packages', data);
}

export async function updateCreditPackageApi(id: number, data: Partial<CreditPackageCreateParams>): Promise<CreditPackage> {
  return requestClient.put<CreditPackage>(`/api/v1/user_tier/credit/packages/${id}`, data);
}

export async function deleteCreditPackageApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/user_tier/credit/packages/${id}`);
}
