<template>
  <div class="index-container">
    <transition name="fade">
      <Header v-show="headerShow"></Header>
    </transition>
    <div class="container-body">
      <!-- 子路由 -->
      <router-view></router-view>
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script lang="ts" setup>
import Header from '@/views/layout/header.vue';
import Footer from '@/views/layout/footer.vue';
import { ref, onMounted, onUnmounted } from 'vue';

onMounted(() => {
  window.addEventListener('scroll', handleScroll, true);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, true);
});

// 头部导航栏滑动隐藏
const headerShow = ref<boolean>(true);
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
    min-height: calc(100vh - 60px);
    max-height: calc(100vh - 60px);
    position: relative;
    top: 60px;
  }
}
</style>
