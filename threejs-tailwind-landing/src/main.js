import "../style.css";
import * as THREE from "three";
import GUI from "lil-gui";

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

// Add GUI
const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");

const cubeProperties = {
  width: 2,
  height: 2,
  depth: 2,
  color: 0x00ff00,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0
};

cubeFolder.add(cubeProperties, "width", 0.1, 5).onChange(updateCube);
cubeFolder.add(cubeProperties, "height", 0.1, 5).onChange(updateCube);
cubeFolder.add(cubeProperties, "depth", 0.1, 5).onChange(updateCube);
cubeFolder.addColor(cubeProperties, "color").onChange(updateCubeColor);
cubeFolder.add(cubeProperties, "rotationX", 0, Math.PI * 2).onChange(function() {
  cube.rotation.x = cubeProperties.rotationX;
});
cubeFolder.add(cubeProperties, "rotationY", 0, Math.PI * 2).onChange(function() {
  cube.rotation.y = cubeProperties.rotationY;
});
cubeFolder.add(cubeProperties, "rotationZ", 0, Math.PI * 2).onChange(function() {
  cube.rotation.z = cubeProperties.rotationZ;
});

function updateCube() {
  cube.geometry.dispose();
  cube.geometry = new THREE.BoxGeometry(
    cubeProperties.width,
    cubeProperties.height,
    cubeProperties.depth,
    10,
    10,
    10
  );
}

function updateCubeColor() {
  cube.material.color.setHex(cubeProperties.color);
}

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
