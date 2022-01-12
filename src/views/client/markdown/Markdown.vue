<template>
  <div class="markdown-container">
    <div>
      <router-link to="/">
        <span>首页</span>
      </router-link>
    </div>
    <md-editor v-model="markdownText" showCodeRowNumber @onSave="saveMarkdownText"></md-editor>
    <n-button @click="getMarkdownById" attr-type="button">获 取</n-button>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive, isRef, toRefs, watch, computed, getCurrentInstance } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { markdownSave, markdownById } from '@/api/client/markdown/index';

const toolbars: Array<string> = ['italic', 'underline', '-', 'bold', '=', 'github'];

const markdownText = ref('# markdown');

const saveMarkdownText = (text: string) => {
  console.log(text);
  const mdData: object = {
    mdText: text
  };
  markdownSave(mdData)
    .then(() => {
      console.log('请求');
    })
    .catch(() => {
      console.log('异常');
    });
};

const getMarkdownById = () => {
  let mdId: string = '60e5fb94-92ff-4329-831e-3f364127d819';
  markdownById(mdId)
    .then((res: any) => {
      console.log(res);
      markdownText.value = res.data.md.mdText;
    })
    .catch(() => {
      console.log('异常');
    });
};
</script>

<style lang="scss" scoped>
.markdown-container {
  width: 100%;
  background: rgba(222, 225, 230, 0.856);
}

// 移动端优先原则
// 横向放置的手机及分辨率更小的设备
@media (max-width: 480px) {
}
// 横向放置的手机和竖向放置的平板之间的分辨率
@media (min-width: 481px) and (max-width: 767px) {
}
// 平板电脑和小屏电脑之间的分辨率
@media (min-width: 768px) and (max-width: 979px) {
}
// 大屏幕
@media (min-width: 1200px) {
}
// 超大屏幕
@media (min-width: 1600px) {
}
</style>
