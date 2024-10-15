import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;

// Create renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

const rgbeLoader = new RGBELoader();
rgbeLoader.load(
  "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/zwartkops_curve_sunset_1k.hdr",
  function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // scene.background = texture;
    scene.environment = texture;
  }
);

const loader = new GLTFLoader();
let mkda;
loader.load(
  "./starship.glb",
  function (gltf) {
    mkda = gltf.scene;
    gltf.scene.scale.set(0.006, 0.006, 0.006);
    // gltf.scene.position.y = -2.8;
    // gltf.scene.position.z = -1.8;
    // gltf.scene.position.x = 8.8;
    // gltf.scene.rotation.y = Math.PI;
    // gltf.scene.rotation.x = Math.PI/2;
    scene.add(gltf.scene);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  mkda.rotation.x -= 0.003;
  mkda.position.x -= 0.04;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
