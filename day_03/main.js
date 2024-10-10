import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 3;

const light = new THREE.DirectionalLight("white", 3);
light.position.set(1.5, 1.5, 1.5);
scene.add(light);

// const helper = new THREE.DirectionalLightHelper(light, 1);
// scene.add(helper);

let textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load("./map.jpg");
texture.colorSpace = THREE.SRGBColorSpace;

const texture2 = textureLoader.load("./clouds.jpg");
texture2.colorSpace = THREE.SRGBColorSpace;
// console.log(texture);

const geometry = new THREE.SphereGeometry(1, 200, 200);
const material = new THREE.MeshPhysicalMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);

const geometry2 = new THREE.SphereGeometry(1.02, 200, 200);
const material2 = new THREE.MeshPhysicalMaterial({ alphaMap: texture2 });
const cube2 = new THREE.Mesh(geometry2, material2);

material2.transparent = true;

scene.add(cube);
scene.add(cube2);

const rgbeLoader = new RGBELoader();
rgbeLoader.load(
  "./abc.hdr",
  (chacha) => {
    chacha.mapping = THREE.EquirectangularReflectionMapping;
    // Apply HDRI as environment map
    scene.environment = chacha;
    scene.background = chacha;
  }
);

const canvas = document.querySelector("canvas");

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  cube2.rotation.x = clock.getElapsedTime() * 0.2;
  cube.rotation.x = clock.getElapsedTime() * 0.1;
  renderer.render(scene, camera);
  controls.update();
}
animate();
