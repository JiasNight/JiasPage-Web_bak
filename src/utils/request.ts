import axios, { AxiosInstance } from 'axios';
import { errorCodeType } from './requestErrorCode';

// 这个就是上面创建的router实例，用来跳转到login页面的
import router from '../router';

// 请求加密方法引入
import { aesUtil, rsaUtil, publicKey, privateKey } from './transfer';

const baseUrl = import.meta.env.VITE_APP_BASE_API;
class Interceptors {
  instance: AxiosInstance;
  loading: any;
  constructor() {
    // 基础配置
    this.instance = axios.create({
      // 服务接口请求
      baseURL: baseUrl,
      // 超时设置
      timeout: 1500,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8;',
      },
    });

    this.init();
  }

  // 下面两个方法可以参考element-plus
  startLoading() {
    this.loading = window.$loadingBar.start();
  }
  errorLoading() {
    this.loading = window.$loadingBar.error();
  }
  endLoading() {
    this.loading = window.$loadingBar.finish();
  }
  init() {
    // 请求拦截
    let aesKey = aesUtil.genKey();
    this.instance.interceptors.request.use(
      (config: any) => {
        this.startLoading();
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        const token = window.localStorage.getItem('TOKEN');
        token && (config.headers.Authorization = token);

        let requestMethod = config.method;
        if (requestMethod.toLocaleLowerCase() === 'post') {
          if (config.data) {
            let requestData = config.data;
            if (Object.prototype.toString.call(requestData) === '[object FormData]') {
              // 设置请求头为表单提交头
              let jsonData: any = {};
              for (let key of requestData.keys()) {
                jsonData[key] = requestData.get(key);
              }
              let objData: any = {
                data: aesUtil.encrypt(jsonData, aesKey),
                aesKey: rsaUtil.encrypt(aesKey, window.sessionStorage.getItem('javaPublicKey')),
                publicKey: publicKey,
              };
              let fd: FormData = new FormData();
              for (let key in objData) {
                fd.append(key, objData[key]);
              }
              config.data = fd;
            } else {
              let objData: any = {
                data: aesUtil.encrypt(requestData, aesKey),
                aesKey: rsaUtil.encrypt(aesKey, window.sessionStorage.getItem('javaPublicKey')),
                publicKey: publicKey,
              };
              config.data = objData;
            }
          }
        } else if (requestMethod.toLocaleLowerCase() === 'get') {
          if (config.params) {
            let requestParams = config.params;
            let objParams: any = {
              data: aesUtil.encrypt(requestParams, aesKey),
              aesKey: rsaUtil.encrypt(aesKey, window.sessionStorage.getItem('javaPublicKey')),
              publicKey: publicKey,
            };
            config.params = objParams;
          }
        }
        return config;
      },
      (error) => {
        // 失败就简单处理了
        this.errorLoading();
        return Promise.reject(error);
      },
    );

    // 响应拦截
    this.instance.interceptors.response.use(
      (response) => {
        this.endLoading();
        if (response.data.success) {
          return Promise.resolve(response.data);
        } else {
          // 这个就是错误的时候自行处理的代码了，具体业务具体处理，加上注释只供参考
          if (response.data.code == '401') {
            // 清除token
            localStorage.removeItem('TOKEN');
            router.push('/login');
            window.$message.error(errorCodeType('401'));
          } else if (response.status == 200) {
            window.$message.error(response.data.message || '系统错误');
            return Promise.resolve(response.data);
          } else {
            window.$message.error(errorCodeType(response.data.code));
            return Promise.reject(response.data);
          }
          return;
        }
      },
      (error) => {
        this.errorLoading();
        // 具体业务具体处理，加上注释只供参考
        const { status } = error.response;
        if (status == '401') {
          window.$message.error(errorCodeType('401'));
          // 清除token
          localStorage.removeItem('TOKEN');
          // 页面跳转
          router.push('/login');
        } else {
          window.$message.error('系统错误');
        }
        return Promise.reject(error);
      },
    );
  }

  getInterceptors() {
    return this.instance;
  }
}

// 请求配置
class serviceHttp {
  axios: any;
  // 获取axios实例
  constructor() {
    this.axios = new Interceptors().getInterceptors();
  }
}

const service = new serviceHttp();

export default service;
