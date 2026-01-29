import { requestClient } from '#/api/request';

/**
 * 模型积分费率表 API
 */

// Types
export interface ModelCreditRate {
  model_id: number;
  base_credit_per_1k_tokens: number;
  input_multiplier: number;
  output_multiplier: number;
  enabled: boolean;
}

export interface ModelCreditRateParams {
  page?: number;
  size?: number;
  model_id?: number;
}

export interface ModelCreditRateCreateParams {
  model_id: number;
  base_credit_per_1k_tokens: number;
  input_multiplier: number;
  output_multiplier: number;
  enabled: boolean;
}

export interface ModelCreditRateListResult {
  items: ModelCreditRate[];
  total: number;
}

// API functions
export async function getModelCreditRateListApi(params: ModelCreditRateParams): Promise<ModelCreditRateListResult> {
  return requestClient.get<ModelCreditRateListResult>('/api/v1/user_tier/model/credit/rates', { params });
}

export async function getModelCreditRateApi(id: number): Promise<ModelCreditRate> {
  return requestClient.get<ModelCreditRate>(`/api/v1/user_tier/model/credit/rates/${id}`);
}

export async function createModelCreditRateApi(data: ModelCreditRateCreateParams): Promise<ModelCreditRate> {
  return requestClient.post<ModelCreditRate>('/api/v1/user_tier/model/credit/rates', data);
}

export async function updateModelCreditRateApi(id: number, data: Partial<ModelCreditRateCreateParams>): Promise<ModelCreditRate> {
  return requestClient.put<ModelCreditRate>(`/api/v1/user_tier/model/credit/rates/${id}`, data);
}

export async function deleteModelCreditRateApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/user_tier/model/credit/rates/${id}`);
}
