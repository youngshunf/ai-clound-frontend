import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'Huanxing',
    path: '/huanxing',
    meta: {
      title: '唤星管理',
      icon: 'mdi:star-shooting-outline',
      order: 0,
    },
    children: [
      {
        name: 'HuanxingServer',
        path: '/huanxing/server',
        component: () => import('#/views/huanxing/server/index.vue'),
        meta: {
          title: '服务器管理',
          icon: 'mdi:server-outline',
        },
      },
      {
        name: 'HuanxingUser',
        path: '/huanxing/user',
        component: () => import('#/views/huanxing/user/index.vue'),
        meta: {
          title: '唤星用户',
          icon: 'mdi:account-star-outline',
        },
      },
      {
        name: 'HuanxingDocument',
        path: '/huanxing/document',
        component: () => import('#/views/huanxing/document/index.vue'),
        meta: {
          title: '文档管理',
          icon: 'mdi:file-document-outline',
        },
      },
      {
        name: 'HuanxingDocumentVersion',
        path: '/huanxing/document-version',
        component: () => import('#/views/huanxing/document-version/index.vue'),
        meta: {
          title: '文档版本',
          icon: 'mdi:source-branch',
        },
      },
      {
        name: 'HuanxingDocumentAutosave',
        path: '/huanxing/document-autosave',
        component: () => import('#/views/huanxing/document-autosave/index.vue'),
        meta: {
          title: '自动保存',
          icon: 'mdi:content-save-outline',
        },
      },
    ],
  },
];

export default routes;
