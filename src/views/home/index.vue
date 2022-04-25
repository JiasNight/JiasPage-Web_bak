<template>
  <div class="home-container">
    <!-- 轮播图 -->
    <!-- <n-carousel show-arrow autoplay>
      <img class="carousel-img" v-for="(item, index) in imgLists" :key="index" :src="item.imgSrc" :alt="item.label" />
    </n-carousel> -->
    <div class="container-main" v-for="(item, index) in imgLists" :key="index" :style="{backgroundImage: `url(${item.imgSrc})`, backgroundSize: '100% 100%'}">
      <n-space>
        <n-button>Default</n-button>
        <n-button type="tertiary">
          Tertiary
        </n-button>
        <n-button type="primary">
          Primary
        </n-button>
        <n-button type="info">
          Info
        </n-button>
        <n-button type="success">
          Success
        </n-button>
        <n-button type="warning">
          Warning
        </n-button>
        <n-button type="error">
          Error
        </n-button>
      </n-space>
    </div>
    <!-- <img class="carousel-img" v-for="(item, index) in imgLists" :key="index" :src="item.imgSrc" :alt="item.label" /> -->
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
import * as THREE from 'three';

onMounted(() => {
  console.log('轮播');
  // 获取后端设置的轮播图
});

// 轮播图列表
interface loopImgType {
  id: string;
  label: string;
  imgSrc: string;
}
const imgLists: loopImgType[] = reactive([
  {
    id: '1',
    label: 'primary',
    imgSrc: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg'
  },
  {
    id: '2',
    label: 'info',
    imgSrc: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg'
  },
  {
    id: '3',
    label: 'warning',
    imgSrc: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg'
  },
  {
    id: '4',
    label: 'error',
    imgSrc: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
  }
]);
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  margin: 0 auto;
  .container-main {
    width: 100%;
    height: calc(100vh - 60px);
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
