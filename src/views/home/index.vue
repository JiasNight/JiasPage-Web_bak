<template>
  <div class="home-container">
    <!-- 轮播图 -->
    <div class="container-loop">
      <n-carousel show-arrow autoplay draggable>
        <div class="loop-img" v-for="(item, index) in imgLists" :key="index" :style="{backgroundImage: `url(${item.imgSrc})`}">
        </div>
      </n-carousel>
    </div>
  </div>
</template>

<script lang="ts" setup>

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
    imgSrc: 'src/assets/images/home/111.jpg'
  },
  {
    id: '2',
    label: 'info',
    imgSrc: 'src/assets/images/home/222.jpg'
  },
  {
    id: '3',
    label: 'warning',
    imgSrc: 'src/assets/images/home/333.jpg'
  },
  {
    id: '4',
    label: 'error',
    imgSrc: 'src/assets/images/home/444.jpg'
  },
  {
    id: '5',
    label: 'error',
    imgSrc: 'src/assets/images/home/555.jpg'
  },
  {
    id: '6',
    label: 'error',
    imgSrc: 'src/assets/images/home/666.jpg'
  },
  {
    id: '7',
    label: 'error',
    imgSrc: 'src/assets/images/home/777.jpg'
  },
  {
    id: '8',
    label: 'error',
    imgSrc: 'src/assets/images/home/888.jpg'
  },
  {
    id: '9',
    label: 'error',
    imgSrc: 'src/assets/images/home/999.jpg'
  }
]);
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  margin: 0 auto;
  .container-loop {
    width: 100%;
    height: 50vh;
    .loop-img {
      width: 100%;
      height: 100%;
      background-size: cover;
    }
  }
  .container-main {
    width: 100%;
    height: 100%;
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
