import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  {
    path: '/three',
    name: 'Three',
    component: () => import('@/views/three/index.vue')
  },
  {
    path: '/markdown',
    name: 'Markdown',
    component: () => import('@/views/markdown/markdown.vue')
  },
  {
    path: '/word',
    name: 'Word',
    component: () => import('@/views/markdown/word.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
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
