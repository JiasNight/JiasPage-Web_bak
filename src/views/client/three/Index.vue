<template>
  <div class="three-container">
    <div ref="threeDom" class="three-main"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import gsap from 'gsap';

onMounted(() => {
  initCurrentThree();
  loadGltfModel();
  renderThree();
});

const Scene = new THREE.Scene();
const Camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
const Renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true //开启alpha
});
// 控制器
const Controls = new OrbitControls(Camera, Renderer.domElement);
//gltfLoader
const Gltfloader = new GLTFLoader();
// 注意:此处为threejs的DOM,需要将threejs的场景渲染进去
const threeDom = ref(null);

// 首页进入相机的视角,这个视角可以在三维模型中建立一个摄像机获取摄像机的坐标,如C4D,非常准确.
const cameraPosition = {
  x: 0,
  y: 700,
  z: 0
};
const cameraLookat = {
  x: 0,
  y: 0,
  z: 1
};

// 声明一个方法传入参数可以在不同的地方调用相机
const cameraReset = (position, lookAt, time = 1) => {
  gsap.to(Camera.position, {
    x: position.x,
    y: position.y,
    z: position.z,
    duration: time,
    ease: 'power4.out'
    // onComplete: function () {
    // 这是相机运动完成的回调,可以执行其他的方法.
    // }
  });
  gsap.to(Camera.lookAt, {
    x: lookAt.x,
    y: lookAt.y,
    z: lookAt.z,
    duration: time,
    ease: 'power4.out'
  });
  gsap.to(Controls.target, {
    x: lookAt.x,
    y: lookAt.y,
    z: lookAt.z,
    duration: time,
    ease: 'power4.out'
  });
};

const initCurrentThree = () => {
  // 点光源
  const point = new THREE.PointLight(0xffffff, 1);
  point.position.set(10, 600, -40); // 点光源位置
  // Scene.position.set(0, 15, 0); // 场景位置
  // Scene.add(point); // 点光源添加到场景中
  // 环境光
  const ambient = new THREE.AmbientLight(0x444444, 1);
  Scene.add(ambient);
  // 辅助坐标系
  const axesHelper = new THREE.AxesHelper(500);
  // Scene.add(axesHelper);
  // 修改相机,场景的参数
  // Camera.position.set(18, 364, 397);
  // Camera.lookAt(0, 0, 0);
  // Camera.up.x = 0; //相机以哪个方向为上方
  // Camera.up.y = 1;
  // Camera.up.z = 1;
  Controls.target = new THREE.Vector3(0, 0, 0);
  // 使动画循环使用时阻尼或自转 意思是否有惯性
  Controls.enableDamping = true;
  // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
  Controls.dampingFactor = 0.04;
  // 是否可以旋转
  Controls.enableRotate = false;
  // 是否可以缩放与速度
  Controls.enableZoom = false;
  // 设置相机距离原点的最远距离
  Controls.minDistance = 1;
  // 设置相机距离原点的最远距离
  Controls.maxDistance = 2000;
  // 是否开启右键拖拽
  Controls.enablePan = false;
  //render的相关设置
  Renderer.setPixelRatio(window.devicePixelRatio);
  Renderer.setSize(window.innerWidth, window.innerHeight);
  Renderer.inputEncoding = true;
  Renderer.outputEncoding = THREE.sRGBEncoding;
  Renderer.setClearColor(0xd0d0d0, 1);
  // 将renderer渲染进DOM里面
  threeDom.value.appendChild(Renderer.domElement);
};

// 设置页面自适应
const onWindowResize = () => {
  Camera.aspect = window.innerWidth / window.innerHeight;
  Camera.updateProjectionMatrix();
  Renderer.setSize(window.innerWidth, window.innerHeight);
  renderThree();
};
window.addEventListener('resize', onWindowResize, false);

// 外部模型加载函数
const loadGltfModel = () => {
  // 加载模型
  let gltfLoader = new GLTFLoader();
  gltfLoader.load(
    '/src/assets/gltf/scene.gltf',
    (gltf: any) => {
      const loadscene = gltf.scene;
      console.log(gltf);
      window.gltf = gltf;
      // gltf.position.set(100, 100, 100);
      Scene.add(loadscene);
      // 设置大小比例
      loadscene.scale.set(0.06, 0.05, 0.05);
      // 模型加载完,进行相机的初始化,传入设置的参数,模型加载为异步
      cameraReset(cameraPosition, cameraLookat);
    },
    (xhr) => {
      // 控制台查看加载进度xhr
      console.log(Math.floor((xhr.loaded / xhr.total) * 100));
    }
  );
};

const renderThree = () => {
  requestAnimationFrame(renderThree);
  Controls.update(); // 轨道控制器的更新
  Renderer.clear(); // 清除画布
  Renderer.render(Scene, Camera);
};
</script>

<style lang="scss" scoped>
.three-container {
  width: 100vw;
  height: 100vh;
  .three-main {
    width: 100%;
    height: 100%;
    // overflow: hidden;
  }
}
</style>
