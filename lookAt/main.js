// Import necessary modules
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;

const loader = new THREE.TextureLoader();
const tex = loader.load("b.jpg");
tex.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.BoxGeometry(2, 2, 2, 20, 20, 20);
const material = new THREE.MeshBasicMaterial({ map: tex });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

const mouse = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX / window.innerWidth;
//   mouse.y = event.clientY / window.innerHeight;
});

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  mesh.lookAt(mouse.x - 0.5, 0 , 0.02)
  renderer.render(scene, camera);
}

animate();
