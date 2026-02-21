import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'Llm',
    path: '/llm',
    meta: {
      title: 'LLM 管理',
      icon: 'carbon:machine-learning-model',
      order: 2,
    },
    children: [
      {
        name: 'LlmProvider',
        path: '/llm/provider',
        component: () => import('#/views/llm/provider/index.vue'),
        meta: {
          title: '供应商管理',
          icon: 'carbon:cloud-service-management',
        },
      },
      {
        name: 'LlmModel',
        path: '/llm/model',
        component: () => import('#/views/llm/model/index.vue'),
        meta: {
          title: '模型配置',
          icon: 'carbon:model-alt',
        },
      },
      {
        name: 'LlmModelAlias',
        path: '/llm/model-alias',
        component: () => import('#/views/llm/model-alias/index.vue'),
        meta: {
          title: '模型映射',
          icon: 'carbon:connect',
        },
      },
      {
        name: 'LlmModelGroup',
        path: '/llm/model-group',
        component: () => import('#/views/llm/model-group/index.vue'),
        meta: {
          title: '模型组',
          icon: 'carbon:group-objects',
        },
      },
      {
        name: 'LlmRateLimit',
        path: '/llm/rate-limit',
        component: () => import('#/views/llm/rate-limit/index.vue'),
        meta: {
          title: '速率限制',
          icon: 'carbon:meter',
        },
      },
      {
        name: 'LlmApiKey',
        path: '/llm/api-key',
        component: () => import('#/views/llm/api-key/index.vue'),
        meta: {
          title: 'API Key 管理',
          icon: 'carbon:password',
        },
      },
      {
        name: 'LlmUsage',
        path: '/llm/usage',
        component: () => import('#/views/llm/usage/index.vue'),
        meta: {
          title: '用量统计',
          icon: 'carbon:analytics',
        },
      },
      {
        name: 'LlmMediaTask',
        path: '/llm/media-task',
        component: () => import('#/views/llm/media-task/index.vue'),
        meta: {
          title: '媒体任务',
          icon: 'carbon:media-library',
        },
      },
    ],
  },
];

export default routes;
