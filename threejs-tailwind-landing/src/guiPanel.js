import { GUI } from 'lil-gui';

export function createGUIPanel(cube, THREE) {
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

  function updateCube() {
    cube.geometry.dispose();
    cube.geometry = new THREE.BoxGeometry(
      cubeProperties.width,
      cubeProperties.height,
      cubeProperties.depth,
      10, 10, 10
    );
  }

  function updateCubeColor() {
    cube.material.color.setHex(cubeProperties.color);
  }

  function updateCubeRotation() {
    cube.rotation.x = cubeProperties.rotationX;
    cube.rotation.y = cubeProperties.rotationY;
    cube.rotation.z = cubeProperties.rotationZ;
  }

  cubeFolder.add(cubeProperties, "width", 0.1, 5).onChange(updateCube);
  cubeFolder.add(cubeProperties, "height", 0.1, 5).onChange(updateCube);
  cubeFolder.add(cubeProperties, "depth", 0.1, 5).onChange(updateCube);
  cubeFolder.addColor(cubeProperties, "color").onChange(updateCubeColor);
  cubeFolder.add(cubeProperties, "rotationX", 0, Math.PI * 2).onChange(updateCubeRotation);
  cubeFolder.add(cubeProperties, "rotationY", 0, Math.PI * 2).onChange(updateCubeRotation);
  cubeFolder.add(cubeProperties, "rotationZ", 0, Math.PI * 2).onChange(updateCubeRotation);

  return { gui, cubeProperties };
}