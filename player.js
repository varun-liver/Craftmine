function createPlayerCube(scene, color = 0x00ff00, size = 1) {
  // Geometry and material
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({ color });

  // Mesh
  const cube = new THREE.Mesh(geometry, material);
  cube.position.y = size / 2; // lift above ground so it doesn’t sink
  scene.add(cube);

  return cube;
}

class Player {
  constructor(scene) {
    this.mesh = createPlayerCube(scene); // use the function
    this.speed = 0.1;
  }

  move(keys) {
    if (keys["ArrowUp"]) this.mesh.position.z -= this.speed;
    if (keys["ArrowDown"]) this.mesh.position.z += this.speed;
    if (keys["ArrowLeft"]) this.mesh.position.x -= this.speed;
    if (keys["ArrowRight"]) this.mesh.position.x += this.speed;
  }
}
