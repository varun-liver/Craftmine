let scene, camera, renderer, player;
let keys = {};
let pitchObject; // for looking up/down

function init() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 5);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  // Ground
  const groundGeo = new THREE.PlaneGeometry(50, 50);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Player
  player = new Player(scene, camera);

  // Mouse look setup
  setupMouseLook();

  // Input handling
  window.addEventListener("keydown", (e) => (keys[e.key] = true));
  window.addEventListener("keyup", (e) => (keys[e.key] = false));

  animate();
}

function setupMouseLook() {
  // Pointer lock (click to capture mouse)
  document.body.addEventListener("click", () => {
    document.body.requestPointerLock();
  });

  // Create pitchObject (for vertical look)
  pitchObject = new THREE.Object3D();
  pitchObject.add(camera);

  // Add pitchObject to head
  player.head.add(pitchObject);

  // Mouse movement listener
  document.addEventListener("mousemove", (event) => {
    if (document.pointerLockElement === document.body) {
      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;

      // Rotate player (yaw left/right)
      player.mesh.rotation.y -= movementX * 0.002;

      // Rotate pitch (look up/down)
      pitchObject.rotation.x -= movementY * 0.002;

      // Clamp vertical look (-90° to +90°)
      pitchObject.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, pitchObject.rotation.x)
      );
    }
  });
}

function animate() {
  requestAnimationFrame(animate);

  // Update player movement
  player.move(keys);

  renderer.render(scene, camera);
}

init();
