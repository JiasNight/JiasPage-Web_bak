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
// 引入vuetify组件
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
// 引入自定义指令和样式
import * as directives from '@/directives/index';
import '@/directives/loading/style/index.scss';

loadFonts();

// 创建app实例
const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(store);
app.use(vuetify);
// 全局挂在axios
app.config.globalProperties.$axios = axios;
// 全局指令
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive; })[key]);
});
// 挂载
app.mount('#app');
