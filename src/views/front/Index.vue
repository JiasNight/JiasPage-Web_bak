<template>
  <div class="index-container">
    <Header></Header>
    <div class="container-body">
      <!-- 子路由 -->
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/views/front/Header.vue';
import Footer from '@/views/front/Footer.vue';
</script>

<style lang="scss" scoped>
.index-container {
  .container-body {
    width: 100%;
    min-height: calc(100vh - 120px);
  }
}
</style>
