import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'Topic',
    path: '/topic',
    meta: {
      title: '选题管理',
      icon: 'material-symbols:topic-outline',
      order: 2,
    },
    children: [
      {
        name: 'IndustryManage',
        path: '/topic/industry',
        component: () => import('#/views/topic/industry/index.vue'),
        meta: {
          title: '行业管理',
          icon: 'carbon:industry',
        },
      },
      {
        name: 'TopicRecommendation',
        path: '/topic/manage',
        component: () => import('#/views/topic/manage/index.vue'),
        meta: {
          title: '选题推荐',
          icon: 'material-symbols:recommend-outline',
        },
      },
    ],
  },
];

export default routes;
