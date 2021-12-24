<template>
  <div class="header-container">
    <!-- 导航菜单 -->
    <div class="container-menu">
      <!-- grid布局 -->
      <div class="menu-left">
        <div class="box-item item-logo">
          <router-link to="/">
            <img src="/src/assets/images/logo.png" alt="logo" />
          </router-link>
        </div>
        <div class="box-item item-title">
          <router-link to="/">
            <span>TITLE</span>
          </router-link>
        </div>
        <div class="box-item item-search">
          <n-input type="text" round clearable placeholder="输入关键字搜索">
            <template #suffix>
              <n-icon>
                <Search12Regular />
              </n-icon>
            </template>
          </n-input>
        </div>
        <div class="box-item item-menu">
          <router-link to="/home">
            <span>菜单</span>
          </router-link>
        </div>
        <div class="box-item item-menu">
          <router-link to="/">
            <span>菜单</span>
          </router-link>
        </div>
        <div class="box-item item-menu">
          <router-link to="/three">
            <span>THREE</span>
          </router-link>
        </div>
        <div class="box-item item-menu">
          <router-link to="/markdown">
            <span>笔记</span>
          </router-link>
        </div>
        <div class="box-item item-user">
          <router-link to="/login">
            <span>
              <n-avatar
                round
                object-fit="fill"
                src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
              >
              </n-avatar>
            </span>
          </router-link>
        </div>
      </div>
      <div class="menu-right" @click="menuShowList">
        <span v-show="data.isMenuShow">
          <n-icon color="green" size="50">
            <TextBulletListLtr24Filled />
          </n-icon>
        </span>
        <span v-show="!data.isMenuShow">
          <n-icon color="green" size="50">
            <TextBulletListTree24Filled />
          </n-icon>
        </span>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div :class="setMaskStyle" @click="menuShowList"></div>
    <!-- 弹出抽屉 -->
    <div class="container-drawer" ref="menusList">
      <div class="drawer-search">
        <n-input type="text" size="large" round clearable placeholder="输入关键字搜索">
          <template #suffix>
            <n-icon>
              <Search12Regular />
            </n-icon>
          </template>
        </n-input>
      </div>
      <div class="drawer-item">
        <router-link to="/home">
          <span>菜单</span>
        </router-link>
      </div>
      <div class="drawer-item">
        <router-link to="/">
          <span>菜单</span>
        </router-link>
      </div>
      <div class="drawer-item">
        <router-link to="/">
          <span>菜单</span>
        </router-link>
      </div>
      <div class="drawer-item">
        <router-link to="/markdown">
          <span>笔记</span>
        </router-link>
      </div>
      <div class="drawer-user">
        <router-link to="/login">
          <n-avatar round :size="50">
            <!-- <n-icon color="green">
              <PersonCircle20Regular />
            </n-icon> -->
            AoA
          </n-avatar>
        </router-link>
        <div>josn</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, isRef, toRefs, watch, computed } from 'vue';
import {
  Search12Regular,
  PersonCircle20Regular,
  TextBulletListTree24Filled,
  TextBulletListLtr24Filled
} from '@vicons/fluent';
interface header {
  isMenuShow: boolean;
  maskShow: boolean;
}
const menusList: any = ref(null);
const data: header = reactive({
  isMenuShow: true,
  maskShow: false
});
const setMaskStyle = computed(() => {
  return { 'container-mask': data.maskShow };
});
const menuShowList = () => {
  menusList.value.style.transition = '0.5s';
  if (data.isMenuShow) {
    data.maskShow = true;
    menusList.value.style.top = '60px';
    menusList.value.style.zIndex = 0;
    data.isMenuShow = false;
  } else {
    data.maskShow = false;
    menusList.value.style.zIndex = -9;
    menusList.value.style.top = '-500px';
    data.isMenuShow = true;
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 9;
  background: rgba(222, 225, 230, 0.856);
  .container-menu {
    width: 100%;
    height: 100%;
    .menu-left {
      width: 80%;
      height: 100%;
      margin: 0 auto;
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: repeat(10, 10%);
      align-items: center;
      .box-item {
        a {
          text-decoration: none;
        }
      }
      .item-logo {
        justify-self: end;
        overflow: hidden;
        img {
          height: 60px;
        }
      }
      .item-title {
        justify-self: start;
        align-self: center;
        span {
          font-size: 35px;
          font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
          color: rgb(7, 7, 7);
        }
      }
      .item-search {
        grid-column-start: 3;
        grid-column-end: 6;
        width: 90%;
        height: 60%;
        justify-self: center;
        align-self: center;
        :deep(.n-input__placeholder) {
          line-height: 35px;
        }
      }
      .item-menu {
        width: 100%;
        height: 80%;
        justify-self: center;
        align-self: center;
        display: table-cell;
        text-align: center;
        border-right: 2px solid rgb(133, 126, 126);
        span {
          font-size: 18px;
          font-weight: 600;
          font-family: '楷体';
          color: rgb(7, 7, 7);
          position: relative;
          top: 25%;
          transform: translate(0, -50%);
        }
        span:hover {
          color: rgb(6, 221, 6);
        }
        span::after {
          width: 5px;
          height: 5px;
          display: none;
          content: '';
          background: #00abd9;
          border-radius: 50%;
          position: relative;
          left: 50%;
          transform: translate(-50%, 0);
        }
        span:hover::after {
          display: block;
        }
      }
      .item-user {
        width: 100%;
        height: 80%;
        justify-self: center;
        align-self: center;
        span {
          font-size: 16px;
          color: rgb(7, 7, 7);
          position: relative;
          top: 25%;
          transform: translate(0, -50%);
        }
      }
    }
    .menu-right {
      width: 50px;
      height: 50px;
      float: right;
      margin-right: 10px;
      position: relative;
      bottom: 60px;
      display: none;
      span {
        cursor: pointer;
      }
    }
  }
  .container-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 60px;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: -9;
    display: none;
  }
  .container-drawer {
    width: 100%;
    height: 500px;
    position: absolute;
    top: -500px;
    background: linear-gradient(0deg, rgba(32, 107, 145, 0.774), rgba(222, 225, 230, 0.911));
    z-index: -9;
    display: none;
    .drawer-search {
      width: 90%;
      height: 40px;
      margin-top: 20px;
      position: relative;
      left: 50%;
      transform: translate(-50%, 0);
      :deep(.n-input__placeholder) {
        line-height: 40px;
      }
    }
    .drawer-item {
      width: 100%;
      height: 50px;
      background: rgba(190, 184, 184, 0.377);
      border-radius: 5px;
      margin-top: 20px;
      a {
        text-decoration: none;
      }
      span {
        height: 100%;
        color: rgba(0, 0, 0, 0.705);
        font-size: 18px;
        font-weight: bolder;
        line-height: 50px;
      }
      span:hover {
        color: rgba(23, 182, 36, 0.863);
      }
    }
    .drawer-user {
      width: 100%;
      margin-top: 30px;
    }
  }
}

// 移动端优先原则
// 横向放置的手机及分辨率更小的设备
@media (max-width: 480px) {
  .header-container {
    .container-menu {
      .menu-left {
        grid-template-columns: repeat(3, 40%);
        .item-search {
          display: none;
        }
        .item-menu {
          display: none;
        }
        .item-user {
          display: none;
        }
      }
      .menu-right {
        display: block;
      }
    }
    // 抽屉
    .container-drawer {
      display: block;
    }
  }
}
// 横向放置的手机和竖向放置的平板之间的分辨率
@media (min-width: 481px) and (max-width: 767px) {
  .header-container {
    .container-menu {
      .menu-left {
        grid-template-columns: repeat(3, 49%);
        .item-search {
          display: none;
        }
        .item-menu {
          display: none;
        }
        .item-user {
          display: none;
        }
      }
      .menu-right {
        display: block;
      }
    }
    .container-mask {
      display: block;
    }
    .container-drawer {
      display: block;
    }
  }
}
// 平板电脑和小屏电脑之间的分辨率
@media (min-width: 768px) and (max-width: 979px) {
  .header-container {
    .container-menu {
      .menu-left {
        grid-template-columns: repeat(7, 14%);
        .item-search {
          display: none;
        }
      }
    }
  }
}
// 大屏幕
@media (min-width: 1200px) {
}
// 超大屏幕
@media (min-width: 1600px) {
}
</style>
