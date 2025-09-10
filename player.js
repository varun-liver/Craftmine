function createPlayer(scene) {
  const group = new THREE.Group(); // parent object

  // Body
  const bodyGeo = new THREE.BoxGeometry(1, 1.5, 0.5);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 1.0; // lift body
  group.add(body);

  // Head
  const headGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const headMat = new THREE.MeshStandardMaterial({ color: 0xffcc99 });
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.y = 2.1; // above body
  group.add(head);

  // Arms
  const armGeo = new THREE.BoxGeometry(0.3, 1, 0.3);
  const armMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });

  const leftArm = new THREE.Mesh(armGeo, armMat);
  leftArm.position.set(-0.8, 1.2, 0);
  group.add(leftArm);

  const rightArm = new THREE.Mesh(armGeo, armMat);
  rightArm.position.set(0.8, 1.2, 0);
  group.add(rightArm);

  // Legs
  const legGeo = new THREE.BoxGeometry(0.4, 1, 0.4);
  const legMat = new THREE.MeshStandardMaterial({ color: 0x0000ff });

  const leftLeg = new THREE.Mesh(legGeo, legMat);
  leftLeg.position.set(-0.3, 0.0, 0);
  group.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeo, legMat);
  rightLeg.position.set(0.3, 0.0, 0);
  group.add(rightLeg);

  // Lift player so feet touch ground
  group.position.y = 0.5;

  // Add to scene
  scene.add(group);

  return group; // return the full player model
}

class Player {
  constructor(scene) {
    this.mesh = createPlayer(scene); // use the grouped model
    this.speed = 0.1;
  }

  move(keys) {
    if (keys["ArrowUp"]) this.mesh.position.z -= this.speed;
    if (keys["ArrowDown"]) this.mesh.position.z += this.speed;
    if (keys["ArrowLeft"]) this.mesh.position.x -= this.speed;
    if (keys["ArrowRight"]) this.mesh.position.x += this.speed;
  }
}
