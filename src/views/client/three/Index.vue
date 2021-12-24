<template>
  <div class="three-container">
    <div class="three-main" id="three-box"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import CreateDivThree from './utils/threeTool';

onMounted(() => {
  initCurrentThree();
  loadGltf();
});

let scene;
const initCurrentThree = () => {
  // 初始化场景
  scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);

  // 初始化灯光
  // 环境光 能保持整体都是亮点
  let ambientLight = new THREE.AmbientLight(0x404040);
  // let ambientLight = new THREE.AmbientLight('#fff', 0.3);
  // 点光源 就像灯泡一样的效果  白色灯光 亮度0.6
  let pointLight = new THREE.PointLight(0xffffff, 0.6);
  // 将灯光加入到场景中
  scene.add(ambientLight);
  // 将灯光加到摄像机中 点光源跟随摄像机移动
  // 为什么这样做  因为这样可以让后期处理时的辉光效果更漂亮
  camera.add(pointLight);
  // 我们将摄像机加入到场景中
  scene.add(camera);
  // 初始化渲染器
  let renderer = new THREE.WebGLRenderer({
    // 开启抗锯齿
    antialias: true,
    // 开启背景透明
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  let threeBox = document.getElementById('three-box');
  threeBox.appendChild(renderer.domElement);
  // 背景
  renderer.setClearColor('#000', 0);

  // 三维坐标
  scene.add(new THREE.AxesHelper(200));

  let controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 0.3;
  controls.enablePan = true;

  let directionalLight = new THREE.DirectionalLight('#fff');
  directionalLight.position.set(30, 30, 30).normalize();
  scene.add(directionalLight);
  camera.position.x = 20; //相机的位置
  camera.position.y = 30;
  camera.position.z = 250;

  renderer.render(scene, camera);
};

// 外部模型加载函数
const loadGltf = () => {
  // 加载模型
  let loader = new GLTFLoader();
  loader.setPath('/src/assets/json/');
  loader.load('city.gltf', (gltf) => {
    // 就是两个模型 这个是动态的,下面是静态的,这些从sketchfab上面下载即可
    gltf.scene.traverse((object) => {
      if (object.isMesh) {
        // 修改模型的材质
        console.log(object);
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    gltf.scene.receiveShadow = true;
    scene.add(gltf.scene);
  });
};
</script>

<style lang="scss" scoped>
.three-container {
  width: 100vw;
  height: calc(100vh - 120px);
  .three-main {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
