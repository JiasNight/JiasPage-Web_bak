import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/client/Index.vue'),
    redirect: 'Home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/client/Home.vue')
      }
    ]
  },
  {
    path: '/three',
    name: 'Three',
    component: () => import('@/views/client/three/Index.vue')
  },
  {
    path: '/markdown',
    name: 'Markdown',
    component: () => import('@/views/client/markdown/Markdown.vue')
  },
  {
    path: '/word',
    name: 'Word',
    component: () => import('@/views/client/markdown/Word.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/client/login/Index.vue')
  },
  // 后台管理
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/Index.vue'),
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/admin/layout/Index.vue')
      }
    ]
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
