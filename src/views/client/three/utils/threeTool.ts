import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export default class CreateDivThree {
  id: string;
  ele: HTMLElement | null;
  scene: any;
  camera: any;
  renderer: any;
  controls: any;

  constructor(id: string) {
    this.id = id;
    this.ele = document.getElementById(id);
  }

  // 初始化场景
  initThree() {
    let width = this.ele.offsetWidth;
    let height = this.ele.offsetHeight;
    //  创建场景对象Scene
    console.log(this.scene);
    this.scene = new THREE.Scene();
    console.log(this.scene);
    // 相机设置
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 3000);
    this.camera.position.z = 1;
    // 创建渲染器对象
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.ele.append(this.renderer.domElement);
    this.renderer.setClearColor('#000');

    // 三维坐标
    this.scene.add(new THREE.AxesHelper(100));

    // 灯光
    let directionalLight = new THREE.DirectionalLight('#fff');
    directionalLight.position.set(30, 30, 30).normalize();
    this.scene.add(directionalLight);
    let ambientLight = new THREE.AmbientLight('#fff', 0.3);
    this.scene.add(ambientLight);

    // 初始化控制器,创建控件对象
    let controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.3;
    controls.enablePan = true;
    this.controls = controls;

    window.addEventListener(
      'resize',
      () => {
        console.log('resize');
        this.camera.aspect = this.ele.offsetWidth / this.ele.offsetWidth;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.ele.offsetWidth, this.ele.offsetWidth);
      },
      false
    );
  }
}
