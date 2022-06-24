<template>
  <n-space class="box-logo">
    <img src="/src/assets/images/logo.png" alt="logo">
    <h1 v-show="props.collapsed" class="logo-title">标题文字</h1>
  </n-space>
</template>

<script lang="ts" setup>
import { NIcon, NEllipsis } from 'naive-ui';
import { AppsList20Filled as Menu } from '@vicons/fluent';
import type { MenuOption } from 'naive-ui';
import { watch } from 'vue-demi';

const renderIcon = (icon: Component = Menu) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const renderLabel = (label: string) => {
  return () => h(NEllipsis, null, { default: () => label })
}

const props = {
  collapsed: {
    // 侧边栏菜单是否收起
    type: Boolean,
    default: true
  },
}

watch(() => props.collapsed, (newValue, oldValue) => {
  console.log(newValue)
  console.log(oldValue)
}, { deep: true })

</script>

<style lang="scss" scoped>
.box-logo {
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  line-height: 60px;
  overflow: hidden;
  white-space: nowrap;
  img {
    height: 60px;
  }
  .logo-title {
    text-align: center;
    font-size: 20px;
    font-weight: 900;
  }
}
</style>
