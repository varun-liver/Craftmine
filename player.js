function createPlayerCube(scene, color = 0x00ff00, width = 1, height = 1, depth = 1) {
  // Geometry and material
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshStandardMaterial({ color });

  // Mesh
  const cube = new THREE.Mesh(geometry, material);
  cube.position.y = height / 2; // lift it so it sits on the ground
  scene.add(cube);

  return cube;
}

class Player {
  constructor(scene) {
    // example: red rectangle-shaped player
    this.mesh = createPlayerCube(scene, 0xff0000, 1, 0.9, 0.4);
    this.speed = 0.1;
  }

  move(keys) {
    if (keys["ArrowUp"]) this.mesh.position.z -= this.speed;
    if (keys["ArrowDown"]) this.mesh.position.z += this.speed;
    if (keys["ArrowLeft"]) this.mesh.position.x -= this.speed;
    if (keys["ArrowRight"]) this.mesh.position.x += this.speed;
  }
}
