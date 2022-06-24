<template>
  <div class="app-container">
    <n-layout class="container-layout" has-sider>
      <!-- 左边菜单 -->
      <n-layout-sider class="layout-sider" show-trigger="bar" width="220" :collapsed-width="65" collapse-mode="width" bordered
                      :native-scrollbar="false" :on-update:collapsed="collapseActive">
        <!-- logo -->
        <VLogo :collapsed="!collapsed"></VLogo>
        <n-divider dashed></n-divider>
        <!-- 菜单 -->
        <VMenu :collapsed="collapsed"></VMenu>
      </n-layout-sider>
      <!-- 右边主要部分 -->
      <n-layout>
        <!-- 横条菜单 -->
        <n-layout-header bordered>{{collapsed}}</n-layout-header>
        <!-- 内容 -->
        <n-layout-content :native-scrollbar="false" content-style="padding: 24px;">
          平山道
        </n-layout-content>
        <!-- 底部 -->
        <n-layout-footer bordered>成府路</n-layout-footer>
      </n-layout>
    </n-layout>
  </div>
</template>

<script lang="ts" setup>
import VLogo from './layout/logo/index.vue';
import VMenu from './layout/menu/index.vue';
import { NIcon } from 'naive-ui';

import {
  PersonCircle20Filled as UserIcon,
} from '@vicons/fluent';

let collapsed = $ref<boolean>(false)

const collapseActive = (val: boolean) => {
  collapsed = val
}

</script>

<style lang="scss" scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  .container-layout {
    height: 100%;
    .layout-sider {
      min-height: 100vh;
      background-color: rgb(146, 182, 182);
      transition: all 0.2s ease-in-out;
    }
  }
}
</style>
