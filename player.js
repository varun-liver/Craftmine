class Player {
  constructor(scene) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.y = 0.5; // lift it off the ground
    scene.add(this.mesh);

    this.speed = 0.1;
  }

  move(keys) {
    if (keys["ArrowUp"]) this.mesh.position.z -= this.speed;
    if (keys["ArrowDown"]) this.mesh.position.z += this.speed;
    if (keys["ArrowLeft"]) this.mesh.position.x -= this.speed;
    if (keys["ArrowRight"]) this.mesh.position.x += this.speed;
  }
}
