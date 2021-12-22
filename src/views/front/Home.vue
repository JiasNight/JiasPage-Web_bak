<template>
  <div class="home-container">
    <div class="container-main">
      <!-- 轮播图 -->
      <div class="main-top">
        <n-carousel show-arrow autoplay>
          <img
            class="carousel-img"
            v-for="(item, index) in imgLists"
            :key="index"
            :src="item.imgSrc"
            :alt="item.label"
          />
        </n-carousel>
      </div>
      <!-- 主体部分 -->
      <div class="main-body"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  defineComponent,
  ref,
  reactive,
  isRef,
  toRefs,
  watch,
  computed,
  onMounted,
  getCurrentInstance
} from 'vue';

const imgLists: Array<string> = reactive([
  {
    label: 'primary',
    imgSrc: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg'
  },
  {
    label: 'info',
    imgSrc: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg'
  },
  {
    label: 'warning',
    imgSrc: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg'
  },
  {
    label: 'error',
    imgSrc: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
  }
]);
</script>

<style lang="scss" scoped>
.home-container {
  width: 70%;
  height: calc(100vh - 120px);
  margin: 0 auto;
  overflow: hidden;
  .container-main {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    .main-top {
      width: 100%;
      height: 280px;
      .carousel-img {
        width: 100%;
        height: 280px;
        object-fit: cover;
      }
    }
  }
  .container-main::-webkit-scrollbar {
    width: 0 !important;
  }
  .container-main {
    -ms-overflow-style: none;
  }
  .container-main {
    overflow: -moz-scrollbars-none;
  }
}
</style>
