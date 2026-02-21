import { requestClient } from '#/api/request';

/**
 * 行业相关类型定义
 */
export interface Industry {
  id: number;
  name: string;
  parent_id?: number;
  keywords?: string[];
  description?: string;
  sort?: number;
  children?: Industry[];
  created_at?: string;
}

export interface CreateIndustryParams {
  name: string;
  parent_id?: number;
  keywords?: string[];
  description?: string;
  sort?: number;
}

export interface UpdateIndustryParams extends Partial<CreateIndustryParams> {}

/**
 * 选题相关类型定义
 */
export interface Topic {
  id: number;
  title: string;
  industry_id?: number;
  potential_score: number;
  heat_index: number;
  reason?: string;
  keywords?: string[];
  platform_heat?: Record<string, number>;
  heat_sources?: Array<Record<string, any>> | string[];
  trend?: Record<string, any> | Array<Record<string, any>>;
  industry_tags?: string[];
  target_audience?: string[] | Record<string, any>;
  creative_angles?: string[];
  content_outline?: string[] | Record<string, any>;
  format_suggestions?: string[];
  material_clues?: string[] | Record<string, any>;
  risk_notes?: string[];
  status: number; // 0: 待选, 1: 已采纳, 2: 已忽略
  created_at?: string;
  industry?: Industry;
}

export interface TopicQueryParams {
  page: number;
  size: number;
  industry_id?: number;
  status?: number;
  title?: string;
}

export interface TopicGenerateResult {
  generated: number;
  errors: string[];
}

/**
 * 行业管理 API
 */
enum IndustryApi {
  List = '/topic/industries',
  Create = '/topic/industry', // 假设后端有此接口，若无后续需补充
  Update = '/topic/industry',
  Delete = '/topic/industry',
  Init = '/topic/init',
}

export const getIndustryTreeApi = () => {
  return requestClient.get<Industry[]>(IndustryApi.List);
};

export const createIndustryApi = (data: CreateIndustryParams) => {
  return requestClient.post(IndustryApi.Create, data);
};

export const updateIndustryApi = (id: number, data: UpdateIndustryParams) => {
  return requestClient.put(`${IndustryApi.Update}/${id}`, data);
};

export const deleteIndustryApi = (id: number) => {
  return requestClient.delete(`${IndustryApi.Delete}/${id}`);
};

export const initIndustryDataApi = () => {
  return requestClient.post(IndustryApi.Init);
};

/**
 * 选题管理 API
 */
enum TopicApi {
  Recommendations = '/topic/recommendations',
  Generate = '/topic/generate',
  Adopt = '/topic/adopt', // 假设
  Ignore = '/topic/ignore', // 假设
}

export const getTopicRecommendationsApi = (params: TopicQueryParams) => {
  return requestClient.get<Topic[]>(TopicApi.Recommendations, { params });
};

export const generateDailyTopicsApi = () => {
  return requestClient.post<TopicGenerateResult>(TopicApi.Generate);
};

// 预留采纳/忽略接口，假设后端后续会实现
export const adoptTopicApi = (id: number) => {
  return requestClient.post(`${TopicApi.Adopt}/${id}`);
};

export const ignoreTopicApi = (id: number) => {
  return requestClient.post(`${TopicApi.Ignore}/${id}`);
};
