import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/projects/projects',
    name: 'Projects',
    component: () => import('#/views/projects/projects/index.vue'),
    meta: {
      title: '项目表 - 工作区的核心上下文',
      icon: 'lucide:list',
      order: 1,
    },
  }
];

export default routes;
