import { requestClient } from '#/api/request';

/**
 * S3 存储配置 API
 */

// Types
export interface S3Storage {
  id: number;
  name: string;
  endpoint: string;
  access_key: string;
  secret_key: string;
  bucket: string;
  prefix?: string;
  region?: string;
  remark?: string;
  created_time: string;
  updated_time?: string;
}

export interface S3StorageParams {
  page?: number;
  size?: number;
  id?: number;
  name?: string;
  created_time?: string;
  updated_time?: string;
}

export interface S3StorageCreateParams {
  name: string;
  endpoint: string;
  access_key: string;
  secret_key: string;
  bucket: string;
  prefix?: string;
  region?: string;
  remark?: string;
}

export interface S3StorageListResult {
  items: S3Storage[];
  total: number;
}

// API functions
export async function getS3StorageListApi(params: S3StorageParams): Promise<S3StorageListResult> {
  return requestClient.get<S3StorageListResult>('/api/v1/s3/storages', { params });
}

export async function getS3StorageApi(id: number): Promise<S3Storage> {
  return requestClient.get<S3Storage>(`/api/v1/s3/storages/${id}`);
}

export async function createS3StorageApi(data: S3StorageCreateParams): Promise<S3Storage> {
  return requestClient.post<S3Storage>('/api/v1/s3/storages', data);
}

export async function updateS3StorageApi(id: number, data: Partial<S3StorageCreateParams>): Promise<S3Storage> {
  return requestClient.put<S3Storage>(`/api/v1/s3/storages/${id}`, data);
}

export async function deleteS3StorageApi(pks: number[]): Promise<void> {
  return requestClient.delete<void>('/api/v1/s3/storages', { data: { pks } });
}
