import "./style.css";
import * as THREE from "three";
import vertex from "./shaders/vertex.glsl";
import fragment from './shaders/fragment.glsl';

let scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 5;

let geometry = new THREE.BoxGeometry(1, 1, 1, 30, 30, 30);
console.log(geometry);

let material = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
        uTime: { value: 0 }
    }
  
});
console.log(material);

let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const canvas = document.querySelector("canvas");
let renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

let animate = function () {
  requestAnimationFrame(animate);

  material.uniforms.uTime.value += 0.08;  // Increase the time uniform value by 0.01 each frame

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', function () {
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

