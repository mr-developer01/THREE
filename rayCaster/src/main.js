import * as THREE from "three";
import "../style.css";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const models = document.getElementById("models");

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(models.clientWidth, models.clientHeight);
models.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhysicalMaterial({
  color: 0x00ff00,
  metalness: 0.5,
  roughness: 0.5,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.x = -5;
scene.add(cube);

const geometry2 = new THREE.BoxGeometry(2, 2, 2);
const material2 = new THREE.MeshPhysicalMaterial({
  color: 0x00ff00,
  metalness: 0.5,
  roughness: 0.5,
});
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.x = 5;
scene.add(cube2);

// Add a light
const light = new THREE.AmbientLight(0xffffff, 3);
light.position.set(4, 5, 10);
scene.add(light);

// Create a raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / models.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / models.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects([cube, cube2]);

  // Reset all cubes to their original color
  [cube, cube2].forEach((obj) => {
    obj.material.color.setHex(0x00ff00);
  });

  // Change color of intersected object
  if (intersects.length > 0) {
    intersects[0].object.material.color.setHex(0xff0000);
  }
}
models.addEventListener("mousemove", onMouseMove);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

function onWindowResize() {
  camera.aspect = models.clientWidth / models.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(models.clientWidth, models.clientHeight);
}

window.addEventListener("resize", onWindowResize);
onWindowResize();
