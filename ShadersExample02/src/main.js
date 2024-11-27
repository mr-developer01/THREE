import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

// Create a plane
const geometry = new THREE.PlaneGeometry(2, 3, 100, 100)
console.log(geometry);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('mypic.JPG');

const material = new THREE.ShaderMaterial({
  // wireframe: true,
  vertexShader: vertex,
  fragmentShader: fragment,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: { value: 0. },
    uTexture: { value: texture }
  },
})
const plane = new THREE.Mesh(geometry, material)
scene.add(plane)


const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new OrbitControls(camera, renderer.domElement)

const animate = function () {
  requestAnimationFrame(animate)
  material.uniforms.uTime.value += 0.1
  renderer.render(scene, camera)
}
animate()

// Handle window resize
window.addEventListener('resize', () => {
    // Update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // Update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight)
})












