import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// ----- 주제: glb 파일 불러오기

export default function example() {
  const gltfLoader = new GLTFLoader();
  // Scene
  let scene = new THREE.Scene();
  const firstClick = (e) => {
    scene.remove.apply(scene, scene.children);
    //조명추가
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xefefff, 1.5);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    gltfLoader.load("/models/jaigeas/scene.gltf", (gltf) => {
      const ilbuniMesh = gltf.scene.children[0];
      scene.add(ilbuniMesh);
    });
  };
  const secondClick = (e) => {
    scene.remove.apply(scene, scene.children);

    gltfLoader.load("/models/patrick/scene.gltf", (gltf) => {
      const ilbuniMesh = gltf.scene.children[0];
      scene.add(ilbuniMesh);
    });
  };
  const thirdClick = (e) => {
    scene.remove.apply(scene, scene.children);

    gltfLoader.load("/models/jonathan/scene.gltf", (gltf) => {
      const ilbuniMesh = gltf.scene.children[0];
      scene.add(ilbuniMesh);
    });
  };
  document.querySelector(".img_wrapper :nth-child(1)").onclick = firstClick;
  document.querySelector(".img_wrapper :nth-child(2)").onclick = secondClick;
  document.querySelector(".img_wrapper :nth-child(3)").onclick = thirdClick;

  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.gammaOutput = true;
  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // gltf loader

  gltfLoader.load("/models/patrick/scene.gltf", (gltf) => {
    const ilbuniMesh = gltf.scene.children[0];
    scene.add(ilbuniMesh);
  });

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
