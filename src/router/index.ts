import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/client/home/index.vue')
      }
    ]
  },
  {
    path: '/three',
    name: 'Three',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/client/three/index.vue')
  },
  {
    path: '/article',
    name: 'Markdown',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/client/markdown/index.vue')
  },
  {
    path: '/markdown',
    name: 'Markdown',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/client/markdown/markdown.vue')
  },
  {
    path: '/word',
    name: 'Word',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/client/markdown/word.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/client/login/index.vue')
  },
  {
    path: '/adminLogin',
    name: 'AdminLogin',
    meta: {
      title: '管理端登录'
    },
    component: () => import('@/views/admin/login/index.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      title: '管理端首页'
    },
    component: () => import('@/views/admin/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(), // History 路由
  // history: createWebHashHistory(), // Hash 路由
  routes: [...commonRoutes]
});

router.beforeEach((to, from, next) => {
  // window.$loadingBar.start();
  const isLogin = localStorage.TOKEN ? true : false;
  if (to.path === '/login') {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
});

router.afterEach(() => {
  // window.$loadingBar.finish();
});

export default router;
