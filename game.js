let scene, camera, renderer, player;
let keys = {};

class Player {
  constructor(scene, camera) {
    const model = this.createPlayerModel(scene);
    this.mesh = model.group;
    this.head = model.head;

    // Camera inside head
    this.pitchObject = new THREE.Object3D();
    this.pitchObject.position.set(0, 0.5, 0); // camera height in head
    this.pitchObject.add(camera);
    this.head.add(this.pitchObject);

    this.speed = 0.1;
    this.walkCycle = 0;
  }

  createPlayerModel(scene) {
    const group = new THREE.Group();

    // Body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1.5, 0.5),
      new THREE.MeshStandardMaterial({ color: 0xff0000 })
    );
    body.position.y = 1.0;
    group.add(body);

    // Head
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.MeshStandardMaterial({ color: 0xffcc99 })
    );
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
    leftLeg.position.set(-0.3, 0, 0);
    group.add(leftLeg);
    const rightLeg = new THREE.Mesh(legGeo, legMat);
    rightLeg.position.set(0.3, 0, 0);
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
    const forward = new THREE.Vector3(-Math.sin(this.mesh.rotation.y), 0, -Math.cos(this.mesh.rotation.y));
    const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), forward);

    let moving = false;
    if (keys["w"] || keys["ArrowUp"]) { this.mesh.position.addScaledVector(forward, this.speed); moving = true; }
    if (keys["s"] || keys["ArrowDown"]) { this.mesh.position.addScaledVector(forward, -this.speed); moving = true; }
    if (keys["a"] || keys["ArrowLeft"]) { this.mesh.position.addScaledVector(right, -this.speed); moving = true; }
    if (keys["d"] || keys["ArrowRight"]) { this.mesh.position.addScaledVector(right, this.speed); moving = true; }

    if (moving) {
      this.walkCycle += 0.2;
      const swing = Math.sin(this.walkCycle) * 0.5;
      this.leftArm.rotation.x = swing;
      this.rightArm.rotation.x = -swing;
      this.leftLeg.rotation.x = -swing;
      this.rightLeg.rotation.x = swing;
    } else {
      this.leftArm.rotation.x = 0;
      this.rightArm.rotation.x = 0;
      this.leftLeg.rotation.x = 0;
      this.rightLeg.rotation.x = 0;
    }
  }
}

function init() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

  // Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lights
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  // Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ color: 0x228b22 })
  );
  ground.rotation.x = -Math.PI/2;
  scene.add(ground);

  // Player
  player = new Player(scene, camera);

  // Pointer lock & mouse look
  document.body.addEventListener("click", () => document.body.requestPointerLock());
  document.addEventListener("mousemove", (event) => {
    if (document.pointerLockElement === document.body) {
      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;
      player.mesh.rotation.y -= movementX * 0.002;
      player.pitchObject.rotation.x -= movementY * 0.002;
      player.pitchObject.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, player.pitchObject.rotation.x));
    }
  });

  // Input
  window.addEventListener("keydown", e => keys[e.key] = true);
  window.addEventListener("keyup", e => keys[e.key] = false);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  player.move(keys);
  renderer.render(scene, camera);
}

init();
