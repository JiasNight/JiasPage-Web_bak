<template>
  <n-layout class="layout-container" bordered has-sider>
    <n-layout-sider
      :width="250"
      show-trigger="bar"
      collapse-mode="width"
      :collapsed="collapsed"
      :collapsed-width="60"
      :native-scrollbar="false"
      @collapse="collapsed = true"
      @expand="collapsed = false"
      class="layout-sider"
    >
      <Logo :collapsed="collapsed" />
      <AsideMenu v-model:collapsed="collapsed" v-model:location="getMenuLocation" />
    </n-layout-sider>

    <n-layout>
      <n-layout-header> header </n-layout-header>

      <n-layout-content class="layout-content">
        <div class="layout-content-main">
          tabs
          <div class="main-view">main</div>
        </div>
      </n-layout-content>
      <n-back-top :right="100" />
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { ref, unref, computed, onMounted } from 'vue';
import { Logo } from './components/Logo';
// import { TabsView } from './components/TagsView';
// import { MainView } from './components/Main';
import { AsideMenu } from './components/Menu';
// import { PageHeader } from './components/Header';

const collapsed = ref<boolean>(false);

const getMenuLocation = computed(() => {
  return 'left';
});
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  flex-direction: row;
  flex: auto;
  background: #f5f7f9;
  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
    background: #001428;
  }

  .layout-sider-fix {
    position: fixed;
    top: 0;
    left: 0;
  }

  .ant-layout {
    overflow: hidden;
  }

  .layout-right-fix {
    overflow-x: hidden;
    padding-left: 200px;
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
  }

  .layout-content {
    flex: auto;
    min-height: 100vh;
  }

  .n-layout-header.n-layout-header--absolute-positioned {
    z-index: 11;
  }

  .n-layout-footer {
    background: none;
  }
}

.layout-content-main {
  margin: 0 10px 10px;
  position: relative;
  padding-top: 64px;
}

.layout-content-main-fix {
  padding-top: 64px;
}

.fluid-header {
  padding-top: 0px;
}

.main-view-fix {
  padding-top: 44px;
}

.noMultiTabs {
  padding-top: 0;
}
</style>
