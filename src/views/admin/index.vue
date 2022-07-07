<template>
  <div class="app-container">
    <n-layout class="container-layout" has-sider>
      <!-- 左边菜单 -->
      <n-layout-sider class="layout-sider" show-trigger="bar" width="220" :collapsed-width="65" collapse-mode="width" bordered
                      :native-scrollbar="false" :on-update:collapsed="collapseActive">
        <!-- logo -->
        <VLogo :collapsed="!collapsed"></VLogo>
        <!-- 菜单 -->
        <VMenu :collapsed="collapsed"></VMenu>
      </n-layout-sider>
      <!-- 右边主要部分 -->
      <n-layout class="layout-body">
        <!-- 横条菜单 -->
        <n-layout-header class="body-header" bordered>{{collapsed}}</n-layout-header>
        <!-- 内容 -->
        <n-layout-content :native-scrollbar="false" content-style="padding: 24px;">
          <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Calories
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
              </tr>
            </tbody>
          </v-table>
        </n-layout-content>
        <!-- 底部 -->
        <n-layout-footer bordered>成府路</n-layout-footer>
      </n-layout>
    </n-layout>
  </div>
</template>

<script lang="ts" setup>
import { VIcon } from 'vuetify/components';
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

const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
  },
  {
    name: 'Eclair',
    calories: 262,
  },
  {
    name: 'Cupcake',
    calories: 305,
  },
  {
    name: 'Gingerbread',
    calories: 356,
  },
  {
    name: 'Jelly bean',
    calories: 375,
  },
  {
    name: 'Lollipop',
    calories: 392,
  },
  {
    name: 'Honeycomb',
    calories: 408,
  },
  {
    name: 'Donut',
    calories: 452,
  },
  {
    name: 'KitKat',
    calories: 518,
  },
]
</script>

<style lang="scss" scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  .container-layout {
    height: 100%;
    .layout-sider {
      min-height: 100vh;
      background: linear-gradient(0deg, #abdcff, #2396e9);
      transition: all 0.2s ease-in-out;
    }
  }
  .layout-body {
    height: 100%;
    .body-header {
      height: 200px;
    }
  }
}
</style>
