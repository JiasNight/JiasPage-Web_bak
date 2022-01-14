<template>
  <div class="markdown-container">
    <n-space class="container-top" justify="end">
      <!-- <router-link to="/">
        <span>首页</span>
      </router-link>-->
      <n-button strong round>取 消</n-button>
      <n-button strong round type="primary">保 存</n-button>
    </n-space>
    <n-divider>虚线</n-divider>
    <div class="container-body">
      <div class="body-catalogue">
        <h3>目录</h3>
      </div>
      <md-editor
        class="body-mdeditor"
        v-model="markdownText"
        showCodeRowNumber
        @onSave="saveMarkdownText"
      ></md-editor>
    </div>
    <!-- <n-button @click="getMarkdownById">获 取</n-button> -->
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
  height: 100%;
  background: rgba(222, 225, 230, 0.856);
  .container-top {
    width: 80%;
    margin: 0 auto;
    // height: 80px;
  }
  .container-body {
    width: 70%;
    height: calc(100vh - 120px);
    margin: 0 auto;
    .body-catalogue {
      width: 13%;
      height: 100%;
      float: left;
      border: 2px solid rgb(126, 119, 119);
    }
    .body-mdeditor {
      width: 85%;
      height: 100%;
      float: right;
    }
  }
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
