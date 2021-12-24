<template>
  <!-- <n-config-provider :theme-overrides="themeOverrides"> -->
  <n-config-provider>
    <n-dialog-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-loading-bar-provider>
            <Main />
          </n-loading-bar-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { defineComponent, reactive } from 'vue';
import {
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  NLoadingBarProvider,
  GlobalThemeOverrides
} from 'naive-ui';
import Main from '@/views/Main.vue';

const themeOverrides: GlobalThemeOverrides = reactive({
  common: {
    primaryColor: '#4fb233',
    primaryColorHover: '#4fb233',
    fontSize: '16px',
    borderRadius: '16px'
  }
});
</script>
