import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/front/Index.vue'),
    redirect: 'Home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/front/Home.vue')
      },
      {
        path: 'markdown',
        name: 'Markdown',
        component: () => import('@/views/front/markdown/Markdown.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/front/login/Index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(), // History 路由
  // history: createWebHashHistory(), // Hash 路由
  // base: process.env.BASE_URL,
  routes: [...routes]
});

router.beforeEach((to, from, next) => {
  window.$loadingBar.start();
  const isLogin = localStorage.TOKEN ? true : false;
  if (to.path == '/login') {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
});

router.afterEach(() => {
  window.$loadingBar.finish();
});

export default router;
