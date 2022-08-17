<template>
  <v-navigation-drawer v-model="openMenu" app color="#218c74" :width="menuWidth">
    <VLogo></VLogo>
    <!-- <VMenu></VMenu> -->
  </v-navigation-drawer>

  <v-app-bar app> app-bar </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>
    面包屑
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      路由内容
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app> 底部内容 </v-footer>
</template>

<script lang="ts" setup>
import { VIcon } from 'vuetify/components';
import VLogo from './layout/logo/index.vue';
import VMenu from './layout/menu/index.vue';
import { NIcon } from 'naive-ui';

const openMenu = $ref<boolean>(true);
const menuWidth = openMenu ? '250' : '60';
const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159
  },
  {
    name: 'Ice cream sandwich',
    calories: 237
  },
  {
    name: 'Eclair',
    calories: 262
  },
  {
    name: 'Cupcake',
    calories: 305
  },
  {
    name: 'Gingerbread',
    calories: 356
  },
  {
    name: 'Jelly bean',
    calories: 375
  },
  {
    name: 'Lollipop',
    calories: 392
  },
  {
    name: 'Honeycomb',
    calories: 408
  },
  {
    name: 'Donut',
    calories: 452
  },
  {
    name: 'KitKat',
    calories: 518
  }
];
</script>

<style lang="scss" scoped>
.app-container {
  width: 100vw;
  height: 100%;
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
