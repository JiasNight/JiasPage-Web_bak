<template>
  <div class="menu-style">
    <n-menu
      :options="menuOptions"
      :mode="mode"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="25"
      :indent="24"
      :render-label="renderMenuLabel"
      :render-icon="renderMenuIcon"
      :expand-icon="expandIcon"
      @update:value="clickMenuItem"
      @update:expanded-keys="menuExpanded"
    />
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { NIcon } from 'naive-ui';
import { BuildingBank28Regular, CaretDown24Filled, BookContacts28Regular } from '@vicons/fluent';
import { Icon } from '@vicons/utils';

const menuOptions = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: 'BookContacts28Regular'
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: 'BookContacts28Regular',
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    icon: 'BookContacts28Regular'
  }
];

const renderIcon = (icon: string) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};
const renderMenuLabel = (menu: any) => {
  return h('span', { style: { color: '#fff' } }, menu.label);
};
const renderMenuIcon = (menu: any) => {
  return h(Icon, { props: { color: '#fff' } }, menu.icon);
};
const expandIcon = () => {
  return h(
    NIcon,
    { style: { color: '#fff' } },
    { default: () => h(CaretDown24Filled, { style: { color: '#fff' } }) }
  );
};

const clickMenuItem = (key: string): void => {
  console.log(key);
};

const menuExpanded = (openKeys: string[]): void => {
  console.log(openKeys);
};
</script>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, computed, watch, toRefs, unref } from 'vue';
export default defineComponent({
  name: 'Menu',
  components: {},
  props: {
    mode: {
      // 菜单模式
      type: String,
      default: 'vertical'
    },
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean
    },
    //位置
    location: {
      type: String,
      default: 'left'
    }
  },
  emits: ['update:collapsed'],
  setup(props, { emit }) {
    const getSelectedKeys = computed(() => {
      let location = props.location;
      return location;
    });

    return {
      getSelectedKeys
    };
  }
});
</script>

<style lang="scss" scoped>
.menu-style {
  :deep(.n-menu) {
    text-align: left;
  }
  :deep(.n-menu-item):hover {
    font-weight: bolder;
  }
}
</style>
