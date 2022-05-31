<template>
  <div class="index-container">
    <transition name="fade">
      <Header v-show="headerShow" :bgColor="headerColor" :ftColor="headerFontColor"></Header>
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

onMounted(() => {
  window.addEventListener('scroll', handleScroll, true);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, true);
});

// 头部导航背景色
const headerColor = ref<String>('rgb(75, 73, 72, 0.4)');

const headerFontColor = ref<String>('#fff');

// 头部导航栏滑动隐藏
const headerShow = ref<boolean>(true);
const handleScroll = () => {
  const top = document.documentElement.scrollTop;
  console.log(top)
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
    height: 100vh;
    background-color: aqua;
    // position: relative;
    // top: 60px;
  }
}
</style>
