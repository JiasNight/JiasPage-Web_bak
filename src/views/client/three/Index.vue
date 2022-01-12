<template>
  <div class="three-container">
    <n-spin :show="isLoading" size="large">
      <div ref="threeDom" class="three-main" id="three-box"></div>
      <template #description>正在加载 . . .</template>
    </n-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import CreateDivThree from './utils/threeTool';

const isLoading = ref<boolean>(true);

onBeforeMount(() => {});

onMounted(() => {
  initCurrentThree();
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});

const initCurrentThree = () => {
  const cdt = new CreateDivThree('#three-box');
  cdt.initThree();
  const modelPath: string = '/public/model/';
  const modelName: string = 'scene.gltf';
  cdt.loadModel(modelPath, modelName);
  const skyPath: string = '/public/images/';
  cdt.loadSky(skyPath);
  // cdt.loadHdr();
  cdt.renderThree();
  cdt.onWindowResize();

  // 首页进入相机的视角,这个视角可以在三维模型中建立一个摄像机获取摄像机的坐标,如C4D,非常准确.
  const cameraPosition = {
    x: 0,
    y: 450,
    z: 450
  };
  const cameraLookat = {
    x: 0,
    y: 0,
    z: 0
  };
  cdt.cameraReset(cameraPosition, cameraLookat);
};
</script>

<style lang="scss" scoped>
.three-container {
  width: 100vw;
  height: 100vh;
  .three-main {
    width: 100%;
    height: 100%;
  }
}
</style>
