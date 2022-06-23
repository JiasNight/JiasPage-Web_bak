import { createApp } from 'vue';
import App from './App.vue';
// 引入路由
import router from './router';
// 引入pinia
import store from './store';
// 引入axios
import axios from 'axios';
// 引入i18n
import i18n from './i18n';
// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';
// 引入naiveUI组件
import naiveUI from 'naive-ui';

// 创建app实例
const app = createApp(App);
app.use(naiveUI);
app.use(router);
app.use(i18n);
app.use(store);
// 全局挂在axios
app.config.globalProperties.$axios = axios;
// 挂载
app.mount('#app');
