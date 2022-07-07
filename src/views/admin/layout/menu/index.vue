<template>
  <n-menu class="menu-label" :options="menuOptions" accordion :model="props.model" :location="props.location" :collapsed="props.collapsed"
          :collapsed-width="65" :collapsed-icon-size="25"></n-menu>
</template>

<script lang="ts" setup>
import { NIcon, NEllipsis } from 'naive-ui';
import { AppsList20Filled as Menu } from '@vicons/fluent';
import type { MenuOption } from 'naive-ui';

const renderIcon = (icon: Component = Menu) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const renderLabel = (label: string) => {
  return () => h(NEllipsis, null, { default: () => label })
}

const props = {
  mode: {
    // 菜单模式
    type: String,
    default: 'vertical',
  },
  //位置
  location: {
    type: String,
    default: 'right',
  },
  collapsed: {
    // 侧边栏菜单是否收起
    type: Boolean,
    default: false
  },
}

watch(() => props.collapsed, (newValue, oldValue) => {
  console.log(newValue)
  console.log(oldValue)
})

const menuOptions: MenuOption[] = [
  {
    label: renderLabel('系统管理'),
    key: 'dance-dance-dance',
    icon: renderIcon(),
    children: [
      {
        label: renderLabel('用户管理'),
        key: 'people',
        icon: renderIcon(),
      },
      {
        label: renderLabel('菜单管理'),
        key: 'beverage',
        icon: renderIcon(),
      },
      {
        label: renderLabel('角色管理'),
        key: 'food',
        icon: renderIcon(),
      },
      {
        label: renderLabel('登录管理'),
        key: 'the-past-increases-the-future-recedes',
        icon: renderIcon(),
      }
    ]
  }
]

</script>

<style lang="scss" scoped>
.menu-label {
  color: #fff !important;
}
</style>
