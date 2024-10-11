import "../style.css";
import * as THREE from "three";

// Three.js code
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const renderer2 = new THREE.WebGLRenderer({ alpha: true });

renderer.setClearColor(0x000000, 0);
renderer2.setClearColor(0x000000, 0);

const container = document.getElementById("three-container");
const container2 = document.getElementById("three-container2");
renderer.setSize(container.clientWidth, container.clientHeight);
renderer2.setSize(container.clientWidth, container2.clientHeight);
container.appendChild(renderer.domElement);
container2.appendChild(renderer2.domElement);

const geometry = new THREE.BoxGeometry(2, 2, 2, 10, 10, 10);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  renderer2.render(scene, camera);
}
animate();

// Handle window resize
function handleResize() {
  // Update camera
  const aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  // Update renderers
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer2.setSize(container2.clientWidth, container2.clientHeight);
}

// Add event listener for resize
window.addEventListener("resize", handleResize);

// Initial call to set correct sizes
handleResize();
