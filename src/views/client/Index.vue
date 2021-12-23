<template>
  <div class="index-container">
    <transition name="fade">
      <Header v-show="headerShow"></Header>
    </transition>
    <div class="container-body">
      <!-- 子路由 -->
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/views/client/Header.vue';
import Footer from '@/views/client/Footer.vue';
import {
  defineComponent,
  ref,
  reactive,
  isRef,
  toRefs,
  watch,
  computed,
  onMounted,
  onUnmounted,
  getCurrentInstance
} from 'vue';

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 头部导航栏滑动隐藏
const headerShow = ref(true);
const handleScroll = () => {
  const top = document.documentElement.scrollTop;
  if (top > 30) {
    headerShow.value = false;
  } else {
    headerShow.value = true;
  }
};
</script>

<style lang="scss" scoped>
.index-container {
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .container-body {
    width: 100%;
    min-height: calc(100vh - 120px);
    position: relative;
    top: 62px;
  }
}
</style>
