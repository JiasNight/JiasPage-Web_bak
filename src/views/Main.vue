<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { useMessage, useDialog, useNotification, useLoadingBar } from 'naive-ui';

// mount on window
window.$message = useMessage();
window.$dialog = useDialog();
window.$notification = useNotification();
window.$loadingBar = useLoadingBar();

</script>

<style>
#main {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
}

</style>
