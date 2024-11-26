import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";



let scene, camera, renderer, controls;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

let geometry = new THREE.PlaneGeometry(4, 1.8, 100, 100);
let material = new THREE.ShaderMaterial({
    wireframe: true,
    vertexShader: vertex,
    fragmentShader: fragment,
});
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);



const canvas = document.querySelector("canvas");
renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
