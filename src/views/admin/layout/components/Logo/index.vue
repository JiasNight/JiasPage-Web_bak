<template>
  <div class="logo">
    <img src="@/assets/images/logo.png" alt="" :class="{ 'mr-2': !collapsed }" />
    <h2 v-show="!collapsed" class="title">PageAdmin</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Index',
  props: {
    collapsed: {
      type: Boolean
    }
  }
});
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;
  img {
    width: auto;
    height: 50px;
  }
  .title {
    margin-bottom: 0;
    color: antiquewhite;
  }
}
</style>
