import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import gsap from 'gsap';

export class CreateDivThree {
  dom: string;
  canvas: any;
  scene: any;
  camera: any;
  renderer: any;
  controls: any;

  constructor(dom: string) {
    this.dom = dom;
    this.canvas = document.querySelector(dom);
  }

  // 初始化场景
  initThree() {
    let width = this.canvas.offsetWidth;
    let height = this.canvas.offsetHeight;
    //  创建场景对象Scene
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.CubeTextureLoader()
    //   .setPath('../../../../../public/model/skyImages/')
    //   .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);
    // 辅助三维坐标系
    const axesHelper = new THREE.AxesHelper(500);
    this.scene.add(axesHelper);
    // 平行光
    let directionalLight = new THREE.DirectionalLight(0xdfebff, 0.45);
    directionalLight.position.set(2000, 2000, 1000).normalize();
    this.scene.add(directionalLight);
    // 环境光
    let ambientLight = new THREE.AmbientLight(0x999999);
    this.scene.add(ambientLight);
    // 点光源
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0, 2500, 1000);
    this.scene.add(light);
    // 相机设置
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    this.camera.position.set(10, 150, 150);
    this.camera.lookAt(this.scene.position);

    // 创建渲染器对象
    this.renderer = new THREE.WebGLRenderer({
      // 是否执行抗锯齿
      antialias: true,
      // 开启背景透明
      alpha: true
    });
    // this.scene.background = new THREE.TextureLoader()
    //   .setPath('../../../../../public/model/skyImages/')
    //   .load('nx.png');
    // 为了兼容高清屏幕
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // 改成这样就可以居中
    this.renderer.setSize(width, height);
    this.canvas.appendChild(this.renderer.domElement);
    // this.renderer.setClearColor('#1e1e1e');

    // 初始化控制器,创建控件对象
    let controls = new TrackballControls(this.camera, this.renderer.domElement);
    // 是否禁用缩放
    controls.noZoom = false;
    // 是否禁用平移
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.target.set(0, 0, 0);
    // controls.target = new THREE.Vector3(2, 44, 32);
    this.controls = controls;
  }

  renderThree = () => {
    requestAnimationFrame(this.renderThree);
    this.controls.update(); // 轨道控制器的更新
    this.renderer.clear(); // 清除画布
    this.renderer.render(this.scene, this.camera);
  };

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  windowResize() {
    window.addEventListener('resize', () => this.resize());
  }

  // 声明一个方法传入参数可以在不同的地方调用相机
  cameraReset(position: any, lookAt: any, time = 1) {
    gsap.to(this.camera.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: time,
      ease: 'power4.out'
      // onComplete: function () {
      // 这是相机运动完成的回调,可以执行其他的方法.
      // }
    });
    gsap.to(this.camera.lookAt, {
      x: lookAt.x,
      y: lookAt.y,
      z: lookAt.z,
      duration: time,
      ease: 'power4.out'
    });
    gsap.to(this.camera.target, {
      x: lookAt.x,
      y: lookAt.y,
      z: lookAt.z,
      duration: time,
      ease: 'power4.out'
    });
  }

  // 加载模型
  loadModel(modelPath: string, modelName: string) {
    let gltfLoader = new GLTFLoader();
    gltfLoader.setPath(modelPath);
    gltfLoader.load(
      modelName,
      (gltf: any) => {
        const loadscene = gltf.scene;
        //  投影
        loadscene.castShadow = true;
        let wrapper = new THREE.Object3D();
        //模型在场景中的为准
        wrapper.position.set(200, 0, 120);
        wrapper.add(loadscene);
        wrapper.rotation.set(0, Math.PI / 2, 0);
        // loadscene.rotate.set(180, 0, 0);
        // this.modelScene = loadscene;
        // 设置大小比例
        loadscene.scale.set(60, 50, 50);
        this.scene.add(wrapper);
        this.renderThree();
      },
      (xhr: any) => {
        // 控制台查看加载进度xhr
        console.log(Math.floor((xhr.loaded / xhr.total) * 100));
      },
      (error: any) => {
        // 加载出错
        console.log(error);
      }
    );
  }

  // 加载天空盒
  loadSky(skyPath: string) {
    this.scene.background = new THREE.CubeTextureLoader()
      .setPath(skyPath)
      .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);
  }

  // 加载环境贴图
  loadHdr() {
    // 使用hdr作为背景色
    let pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    // 阴影
    pmremGenerator.compileEquirectangularShader();
    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .load('/public/model/skyImages/railway_bridge_02_4k.hdr', (texture: any) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        // 给场景添加环境光效果
        this.scene.environment = envMap;
        // 给场景添加背景图
        // this.scene.background = envMap；
        pmremGenerator.dispose();
      });
    this.renderThree();
  }
}

// 加载3D模型类
export class LoadGltfModel {
  path: string;
  modelName: string;
  scene: any;
  camera: any;
  modelScene: any;

  constructor(path: string, modelName: string, scene: any, camera: any) {
    this.path = path;
    this.modelName = modelName;
    this.scene = scene;
    this.camera = camera;
  }

  loadModel() {
    // 加载模型
    let gltfLoader = new GLTFLoader();
    gltfLoader.setPath(this.path);
    gltfLoader.load(
      this.modelName,
      (gltf: any) => {
        const loadscene = gltf.scene;
        let wrapper = new THREE.Object3D();
        //模型在场景中的为准
        wrapper.position.set(220, 0, 50);
        wrapper.add(loadscene);
        wrapper.rotation.set(0, Math.PI / 2, 0);
        // loadscene.rotate.set(180, 0, 0);
        // this.modelScene = loadscene;
        // 设置大小比例
        loadscene.scale.set(50, 50, 50);
        this.scene.add(wrapper);
      },
      (xhr: any) => {
        // 控制台查看加载进度xhr
        console.log(Math.floor((xhr.loaded / xhr.total) * 100));
      },
      (error: any) => {
        // 加载出错
        console.log(error);
      }
    );
  }

  // 加载天空盒
  loaderSky(path: any) {
    this.scene.background = new THREE.TextureLoader().load(
      '../../../../../public/model/skyImages/nx.png'
    );
    // let skyTexture = new THREE.CubeTextureLoader().setPath(path).load([
    //   'px.jpg', //右
    //   'nx.jpg', //左
    //   'py.jpg', //上
    //   'ny.jpg', //下
    //   'pz.jpg', //前
    //   'nz.jpg' //后
    // ]);

    // this.scene.background = skyTexture;
    // this.renderer.setClearAlpha(1);
  }

  // 动态设置模型比例大小
  adjustModel(dom: any, modelScene: any) {
    let divDom = document.querySelector(dom);
    let width = divDom.offsetWidth;
    console.log(width);
    let height = divDom.offsetHeight;
    let group = new THREE.Group();
    group.add(modelScene);
    let bbox = new THREE.Box3().setFromObject(group);
    // 边界的最小坐标值 边界的最大坐标值
    let mdlen = bbox.max.x - bbox.min.x;
    let mdhei = bbox.max.y - bbox.min.y;
    let mdwid = bbox.max.z - bbox.min.z;
    group.position.set(0, 0, 0);
    console.log(bbox);
    console.log(this.camera.position.z);
    let dist = Math.abs(this.camera.position.z - group.position.z - mdwid / 2);
    console.log('dist值为:' + dist);
    let vFov = (this.camera.fov * Math.PI) / 180;
    //console.log('vFov值为:' + vFov );
    let vheight = 2 * Math.tan(vFov * 0.5) * dist;
    //console.log('vheight值为:' + vheight );
    let fraction = mdhei / vheight;
    // console.log('fraction值为:' + fraction );
    let finalHeight = height * fraction;
    //console.log('finalHeight值为:' + finalHeight);
    let finalWidth = (finalHeight * mdlen) / mdhei;
    //console.log('finalWidth值为:' + finalWidth );

    let value1 = width / finalWidth;
    console.log('value1缩放比例值为:' + value1);
    let value2 = height / finalHeight;
    console.log('value2缩放比例值为:' + value2);

    if (value1 >= value2) {
      group.scale.set(value2, value2, value2);
    } else {
      group.scale.set(value1, value1, value1);
    }
    let bbox2 = new THREE.Box3().setFromObject(group);
    let mdlen2 = bbox2.max.x - bbox2.min.x;
    let mdhei2 = bbox2.max.y - bbox2.min.y;
    let mdwid2 = bbox2.max.z - bbox2.min.z;
    group.position.set(
      -(bbox2.max.x + bbox2.min.x) / 2,
      -(bbox2.max.y + bbox2.min.y) / 2,
      -(bbox2.max.z + bbox2.min.z) / 2 - (bbox2.max.z - bbox2.min.z) / 2
    );

    this.scene.add(group);

    let boxhelper = new THREE.BoxHelper(group, 0xbe1915); //外面红色框
    this.scene.add(boxhelper);
  }
}
