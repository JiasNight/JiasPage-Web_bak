<template>
  <div ref="indexBox" class="index-container">
    <div class="container-nav">
      <transition name="fade">
        <Header v-show="!headerShow" :headerColor="headerColor"></Header>
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
import { petal1, petal2 } from '@/assets/base64/index';
import Header from '@/views/client/layout/header.vue';
import Footer from '@/views/client/layout/footer.vue';

onMounted(() => {
  window.addEventListener('scroll', handleScroll, true);
  nextTick(() => {
    console.log(indexBox.offsetWidth)
    initBkgTime()
  })

});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, true);
});

/** 
 * 根据一年不同的月份时间显示背景飘落花瓣，雨水，黄叶，雪花四种效果
 * 分别表示春夏秋冬四个季节的特效
 */
// 获取背景dom
const indexBox = $ref(null)
const initBkgTime = () => {
  const time = setInterval(() => {
    renderImg()
  }, 5000)
}

const renderImg = () => {
  let width = indexBox.offsetWidth;
  let height = indexBox.offsetHeight;
  indexBox.style.position = 'relative'
  let imgArr = [petal1, petal2]
  let numImgs = 0;
  do {
    numImgs = Math.floor(Math.random() * 20 + 1);
  } while (numImgs > 10)
  const imgArray = []
  for (let i = 0; i < numImgs; i++) {
    let img = document.createElement('img');
    imgArray.push(img);
    let index = Math.floor(Math.random() * 2)
    img.src = `${imgArr[index]}`
    img.style.zIndex = '99999';
    if (index === 1) {
      img.style.width = '20px';
      img.style.height = '40px';
    } else {
      img.style.width = '30px';
      img.style.height = '50px';
    }
    img.style.position = 'absolute';
    let x = Math.random() * width + 1;
    let y = 0
    do {
      y = Math.random() * height / 150;
    } while (y > 500)
    img.style.left = x + 'px';
    img.style.top = y + 'px';
    img.style.opacity = '0';
    indexBox.appendChild(img)
  }
  for (let i = 0; i < imgArray.length; i++) {
    let index = Math.floor(Math.random() * imgArray.length);
    let time = Math.random() * imgArray.length * 5 + 2;
    imgArray[index].style.animation = `rotate1 ${time}s linear`
  }
}

// 头部导航背景色
const headerColor = $ref('rgb(75, 73, 72, 0.4)');
// const headerColor = $ref('rgb(0, 0, 0)');

// 头部导航栏滑动隐藏
let headerShow = $ref(true);

const handleScroll = () => {
  const top = document.documentElement.scrollTop;
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
  background-color: #fcf3d4;
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
    animation: ease;
  }
}
</style>

<style>
/* 花瓣下落动画 */
@keyframes rotate1 {
  0% {
    opacity: 0;
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: translate(-50px, 400px) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: translate(50px, calc(100vh - 10vh)) rotate(360deg);
  }
}

@keyframes rotate2 {
  0% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(20px);
  }
}
</style>