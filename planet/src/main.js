import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import gsap from "gsap";

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
  25,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 9;

// Create renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Create RGBELoader
const loader = new RGBELoader();
loader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/ouchy_pier_1k.hdr', function(texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
//   scene.background = texture;
});

// Create texture loader
const textureLoader = new THREE.TextureLoader();
const star = textureLoader.load('./resources/stars.jpg');
star.colorSpace = THREE.SRGBColorSpace;


// Create a large background sphere
const backgroundRadius = 50;
const backgroundGeometry = new THREE.SphereGeometry(backgroundRadius, 64, 64);
const backgroundMaterial = new THREE.MeshBasicMaterial({
  map: star,  // Black color
  opacity: 0.1,
  side: THREE.BackSide  // Render the inside of the sphere
});
const backgroundSphere = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
scene.add(backgroundSphere);

const radius = 1;
const segments = 65;
// const colors = [0x00ff00, 0x0000ff, 0xff0000, 0xffff00];
const textureImages = ['./resources/csilla/color.png', './resources/earth/map.jpg', './resources/venus/map.jpg', './resources/volcanic/color.png'];
const orbitRadius = 3.5;
const spheres = new THREE.Group();
let sphere;

for (let i = 0; i < 4; i++) {
  // Load texture for the sphere
  const texture = textureLoader.load(textureImages[i]);
  texture.colorSpace = THREE.SRGBColorSpace;
  const geometry = new THREE.SphereGeometry(radius, segments, segments);
  // const geometry = new THREE.BoxGeometry(1,1,1, segments, segments,segments);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  sphere = new THREE.Mesh(geometry, material);

  const angle = (i / 4) * (Math.PI * 2);
  sphere.position.x = orbitRadius * Math.cos(angle);
  sphere.position.y = orbitRadius * Math.sin(angle);

  spheres.add(sphere);
}
spheres.rotation.x = Math.PI / 2 + 0.2;
// spheres.rotation.y = 0.24;
spheres.position.y = -0.1;
scene.add(spheres);

// Rotation animation for spheres
function rotateSpheres() {
  gsap.to(spheres.rotation, {
    // z: `+=${Math.PI * 2}`,
    // y: `+=${Math.PI * 2}`,
    // z: `+=${Math.PI * 2}`,
    duration: 40,
    repeat: -1,
    // repeatDelay: 0,
    ease: "linear"
  });
}

rotateSpheres();

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;

// Animation loop

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}
let scrollCount = 0;
// Throttled wheel event handler
const handleWheel = throttle((event) => {

  if (event.deltaY < 0 && scrollCount === 0){
    return
  }
  // Add your wheel event logic here
  const direction = event.deltaY > 0 ? 'down' : 'up';

  scrollCount = (scrollCount + 1) % 4;

  const heading = document.querySelectorAll(".heading");
  
  gsap.to(heading, {
    y: direction === 'down' ? '-=100%' : '+=100%',
    duration: 1,
    ease: "linear"
  });

  gsap.to(spheres.rotation, {
    z: `+=${Math.PI / 2}`,
    duration: 1,
    ease: "linear"
  });

  if(scrollCount === 0){
    gsap.to(heading, {
      y: 0,
    duration: 1,
    ease: "linear"
    });
  }

}, 2000);

// Add event listener for the wheel event
window.addEventListener('wheel', handleWheel);

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  // Rotate each sphere on its own axis
  spheres.children.forEach((sphere) => {
    sphere.rotation.y = clock.getElapsedTime() * 0.002; // Adjust the rotation speed as needed
  });
//   controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
