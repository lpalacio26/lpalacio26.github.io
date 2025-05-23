const canvas = document.getElementById("pipes-bg");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 150);

  // Lighting
  scene.add(new THREE.AmbientLight(0x555555));
  const point = new THREE.PointLight(0xffffff, 1);
  point.position.set(50, 50, 50);
  scene.add(point);

  // Post-processing
  const composer = new THREE.EffectComposer(renderer);
  composer.addPass(new THREE.RenderPass(scene, camera));

  // Bloom
  const bloom = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.8,  // strength
    0.5,  // radius
    0.85  // threshold
  );
  composer.addPass(bloom);

  // Depth-of-Field
  const bokeh = new THREE.BokehPass(scene, camera, {
    focus:    100.0,
    aperture: 0.0005,
    maxblur:  0.01,
    width:    window.innerWidth,
    height:   window.innerHeight
  });
  composer.addPass(bokeh);

  // —————————————————————————————————————————————————————
  // PipeSystem: handles multiple “heads” with fading trails
  // —————————————————————————————————————————————————————
  class PipeHead {
    constructor() {
      this.path = [ new THREE.Vector3(
        (Math.random()-0.5)*200,
        (Math.random()-0.5)*200,
        (Math.random()-0.5)*200
      ) ];
      this.dir  = new THREE.Vector3(
        ...[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]][Math.floor(Math.random()*6)]
      );
      this.segments = [];
      this.material = new THREE.MeshPhongMaterial({
        color:  0x00ffcc,
        transparent: true,
        opacity: 1
      });
      this.maxLen = 100;  // max segments before fade
    }

    step() {
      // choose a new direction (not directly back)
      const choices = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
      const next = new THREE.Vector3(...choices[Math.floor(Math.random()*6)]);
      if (next.dot(this.dir) !== -1) this.dir.copy(next);

      // next point
      const last = this.path[this.path.length-1];
      const nextPoint = last.clone().add(this.dir.clone().multiplyScalar(5));
      this.path.push(nextPoint);

      // create a tube segment along last→next
      const curve = new THREE.LineCurve3(last, nextPoint);
      const geo   = new THREE.TubeGeometry(curve, 4, 0.5, 8, false);
      const mesh  = new THREE.Mesh(geo, this.material.clone());
      scene.add(mesh);
      this.segments.push(mesh);

      // remove old segments when too many & fade oldest
      if (this.segments.length > this.maxLen) {
        const old = this.segments.shift();
        scene.remove(old);
      }
      // fade all
      this.segments.forEach((m,i) => {
        m.material.opacity = THREE.MathUtils.lerp(0, 1, i / this.segments.length);
      });
    }
  }

  // create several heads for fuller coverage
  const heads = Array.from({length: 8}, () => new PipeHead());

  // —————————————————————————————————————————————————————
  // Animation loop
  // —————————————————————————————————————————————————————
  function animate() {
    requestAnimationFrame(animate);
    heads.forEach(h => h.step());
    composer.render();
  }
  animate();

  // —————————————————————————————————————————————————————
  // Handle resizing
  // —————————————————————————————————————————————————————
  window.addEventListener("resize", () => {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h);
    composer.setSize(w, h);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
  });