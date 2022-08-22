/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_MODE_NAME: string;
  readonly VITE_APP_BASE_API: string;
  readonly VITE_APP_TITLE: string;
}

declare module 'three';
declare module '@/utils/request';
declare module 'three/examples/jsm/loaders/RGBELoader';
declare module 'three/examples/jsm/loaders/GLTFLoader';
declare module 'three/examples/jsm/controls/TrackballControls.js';
declare module '@/api/login/index';
declare module '@/api/markdown/index';
declare module 'three/examples/jsm/controls/DragControls';
declare module 'three/examples/jsm/controls/OrbitControls.js';
declare module '@/router/index';
declare module '$ref';
