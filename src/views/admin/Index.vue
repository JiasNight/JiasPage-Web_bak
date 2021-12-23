<template>
  <n-layout class="admin-container" bordered has-sider>
    <router-view></router-view>
  </n-layout>
</template>

<script lang="ts" setup>
import { ref, unref, computed, onMounted } from 'vue';
</script>

<style lang="scss" scoped>
.admin-container {
  width: 100%;
  height: 100vh;
}
</style>
