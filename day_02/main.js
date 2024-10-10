import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 4;

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

directionalLight.position.set( 1, 1, 1)

// const helper = new THREE.DirectionalLightHelper( directionalLight, 1 );
// scene.add( helper );

const geometry = new THREE.SphereGeometry( 1, 70, 70 );
const material = new THREE.MeshStandardMaterial({color: "white"});
const mesh = new THREE.Mesh( geometry, material );

// mesh.rotation.y = 1;

scene.add( mesh );

const canvas = document.querySelector("canvas")

const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
    window.requestAnimationFrame(animate)
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.4
    mesh.rotation.z += 0.5
    controls.update();
	renderer.render( scene, camera );
}

animate()