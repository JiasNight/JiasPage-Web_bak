<template>
  <div class="home-container">
    <!-- 轮播图 -->
    <div class="container-loop">
      <!-- <n-carousel show-arrow autoplay draggable>
        <div class="loop-img" v-for="(item, index) in imgLists" :key="index" :style="{backgroundImage: `url(${item.imgSrc})`}">
          <n-space class="img-content" align="center" justify="center">
            <n-statistic label="少年，多喝热水吧！！！" tabular-nums>
              <n-countdown :render="renderCountdown" :duration="996 * 1000" :active="true" />
            </n-statistic>
          </n-space>
        </div>
      </n-carousel> -->
      <v-carousel cycle hide-delimiter-background show-arrows="hover">
        <v-carousel-item v-for="(item, i) in imgLists" :key="i">
          <v-sheet height="100%" :style="{backgroundImage: `url(${item.imgSrc})`}">
            <div class="d-flex fill-height justify-center align-center">
              <div class="img-text">
                {{item.describe}}
              </div>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <!-- 首页主要内容 -->
    <section class="container-main">

    </section>
  </div>
</template>

<script lang="ts" setup>
import { CountdownProps } from 'naive-ui'

onMounted(() => {
  console.log('轮播');
  // 获取后端设置的轮播图
});

// 轮播图列表
interface loopImgType {
  id: string;
  label: string;
  imgSrc: string;
  describe: string
}
const imgLists: loopImgType[] = reactive([
  {
    id: '1',
    label: 'primary',
    imgSrc: 'src/assets/images/home/111.jpg',
    describe: '当你不能再拥有，你唯一可以做的，就是令自己不要忘记。'
  },
  {
    id: '2',
    label: 'info',
    imgSrc: 'src/assets/images/home/222.jpg',
    describe: '虽然你我天各一方，但我们的心却是在一起的。'
  },
  {
    id: '3',
    label: 'warning',
    imgSrc: 'src/assets/images/home/333.jpg',
    describe: '有时，需要一炷香，一个人，将生活关在门外，安静地看看自己。'
  },
  {
    id: '4',
    label: 'error',
    imgSrc: 'src/assets/images/home/444.jpg',
    describe: '千万记得天涯有人在等待。'
  },
  {
    id: '5',
    label: 'error',
    imgSrc: 'src/assets/images/home/555.jpg',
    describe: '曾以为念念不忘的东西，总有一天会变得面目全非。'
  }
]);

const renderCountdown: CountdownProps['render'] = ({
  hours,
  minutes,
  seconds
}) => {
  return `早起${String(hours).padStart(2, '0')}晚睡${String(
    minutes
  ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  margin: 0 auto;
  .container-loop {
    width: 100%;
    height: 50vh;
    .img-text {
      color: #fff;
      font-size: 30px;
      padding: 0 5%;
    }
  }
  .container-main {
    width: 100%;
    height: 1000px;
  }
}
</style>
