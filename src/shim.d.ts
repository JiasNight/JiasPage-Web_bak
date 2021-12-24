/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_MODE_NAME: string;
  readonly VITE_APP_BASE_API: string;
  readonly VITE_APP_TITLE: string;
}
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'three';
declare module '@/utils/request';
