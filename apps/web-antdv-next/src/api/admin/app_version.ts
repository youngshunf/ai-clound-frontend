import { requestClient } from '#/api/request';

/**
 * 应用版本表 API
 */

// Types
export interface AppVersion {
  app_code: string;
  version: string;
  platform: string;
  arch: string;
  download_url: string;
  file_hash: string;
  file_size: number;
  filename?: string;
  changelog?: string;
  min_version?: string;
  is_force_update: boolean;
  is_latest: boolean;
  status: string;
  published_at?: string;
}

export interface AppVersionParams {
  page?: number;
  size?: number;
  app_code?: string;
  filename?: string;
  status?: string;
  published_at?: string;
}

export interface AppVersionCreateParams {
  app_code: string;
  version: string;
  platform: string;
  arch: string;
  download_url: string;
  file_hash: string;
  file_size: number;
  filename?: string;
  changelog?: string;
  min_version?: string;
  is_force_update: boolean;
  is_latest: boolean;
  status: string;
  published_at?: string;
}

export interface AppVersionListResult {
  items: AppVersion[];
  total: number;
}

// API functions
export async function getAppVersionListApi(params: AppVersionParams): Promise<AppVersionListResult> {
  return requestClient.get<AppVersionListResult>('/api/v1/admin/app/versions', { params });
}

export async function getAppVersionApi(id: number): Promise<AppVersion> {
  return requestClient.get<AppVersion>(`/api/v1/admin/app/versions/${id}`);
}

export async function createAppVersionApi(data: AppVersionCreateParams): Promise<AppVersion> {
  return requestClient.post<AppVersion>('/api/v1/admin/app/versions', data);
}

export async function updateAppVersionApi(id: number, data: Partial<AppVersionCreateParams>): Promise<AppVersion> {
  return requestClient.put<AppVersion>(`/api/v1/admin/app/versions/${id}`, data);
}

export async function deleteAppVersionApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/admin/app/versions/${id}`);
}
