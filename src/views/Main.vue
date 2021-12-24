<template>
  <div id="amin">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import { useMessage, useDialog, useNotification, useLoadingBar } from 'naive-ui';

// mount on window
window.$message = useMessage();
window.$dialog = useDialog();
window.$notification = useNotification();
window.$loadingBar = useLoadingBar();
</script>

<style>
#amin {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
}
</style>
