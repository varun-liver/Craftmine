class Player {
  constructor(scene, camera) {
    const model = this.createPlayerModel(scene);
    this.mesh = model.group;
    this.head = model.head;

    // Attach camera to head
    this.pitchObject = new THREE.Object3D();
    this.pitchObject.position.set(0, 0.5, 0); // camera height inside head
    this.pitchObject.add(camera);
    this.head.add(this.pitchObject);

    this.speed = 0.1;
    this.walkCycle = 0; // counter for limb swinging
  }

  createPlayerModel(scene) {
    const group = new THREE.Group();

    // Body
    const bodyGeo = new THREE.BoxGeometry(1, 1.5, 0.5);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.0;
    group.add(body);

    // Head
    const headGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xffcc99 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 2.1;
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

    group.position.y = 0.5;
    scene.add(group);

    // Save limb references
    this.leftArm = leftArm;
    this.rightArm = rightArm;
    this.leftLeg = leftLeg;
    this.rightLeg = rightLeg;

    return { group, head, leftArm, rightArm, leftLeg, rightLeg };
  }

  move(keys) {
    // Calculate movement direction based on player yaw
    const forward = new THREE.Vector3(-Math.sin(this.mesh.rotation.y), 0, -Math.cos(this.mesh.rotation.y));
    const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), forward);

    let moving = false;

    if (keys["ArrowUp"] || keys["w"]) {
      this.mesh.position.addScaledVector(forward, this.speed);
      moving = true;
    }
    if (keys["ArrowDown"] || keys["s"]) {
      this.mesh.position.addScaledVector(forward, -this.speed);
      moving = true;
    }
    if (keys["ArrowLeft"] || keys["a"]) {
      this.mesh.position.addScaledVector(right, -this.speed);
      moving = true;
    }
    if (keys["ArrowRight"] || keys["d"]) {
      this.mesh.position.addScaledVector(right, this.speed);
      moving = true;
    }

    // Swing limbs if moving
    if (moving) {
      this.walkCycle += 0.2;
      const swing = Math.sin(this.walkCycle) * 0.5;

      this.leftArm.rotation.x = swing;
      this.rightArm.rotation.x = -swing;
      this.leftLeg.rotation.x = -swing;
      this.rightLeg.rotation.x = swing;
    } else {
      // Reset pose
      this.leftArm.rotation.x = 0;
      this.rightArm.rotation.x = 0;
      this.leftLeg.rotation.x = 0;
      this.rightLeg.rotation.x = 0;
    }
  }
}
