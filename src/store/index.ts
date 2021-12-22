import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStores, Store } from 'vuex';

// 为 store state 声明类型
export interface State {
  count: number;
}

export const key: InjectionKey<Store<State>> = Symbol();

// 重写useStore方法
// 如果其他页面有使用到useStore，可以直接使用这个
export const useStore = () => baseUseStores(key);

export const store = createStore<State>({
  state() {
    return {
      count: 0
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});
