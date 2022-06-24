<template>
  <div class="index-container">
    <div class="container-nav">
      <transition name="fade">
        <Header v-show="headerShow" :headerColor="headerColor"></Header>
      </transition>
    </div>
    <div class="container-body">
      <!-- 子路由 -->
      <router-view></router-view>
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script lang="ts" setup>
import Header from '@/views/client/layout/header.vue';
import Footer from '@/views/client/layout/footer.vue';

onMounted(() => {
  window.addEventListener('scroll', handleScroll, true);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, true);
});

// 头部导航背景色
const headerColor = $ref('rgb(75, 73, 72, 0.4)');
// const headerColor = $ref('rgb(0, 0, 0)');

// 头部导航栏滑动隐藏
let headerShow = $ref(true);

const handleScroll = () => {
  const top = document.documentElement.scrollTop;
  console.log(document.documentElement)
  if (top > 30) {
    headerShow = false;
  } else {
    headerShow = true;
  }
};
</script>

<style lang="scss" scoped>
.index-container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .container-nav {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1;
  }
  .container-body {
    width: 100%;
    height: 100vh;
    flex: 1;
  }
}
</style>
