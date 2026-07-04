// Lorenz attractor hero.
// Thousands of particles integrate the Lorenz system — the canonical benchmark
// for data-driven equation discovery. Hovering perturbs the flow locally
// (the attractor pulls it back); scrolling orbits the camera around the wings.
// If WebGL is missing or the user prefers reduced motion, the CSS gradient
// behind the canvas simply stays as-is.
import * as THREE from "three";

const SIGMA = 10;
const RHO = 28;
const BETA = 8 / 3;
const SCALE = 0.076; // lorenz units -> world units
const CENTER_Z = 27; // vertical center of the attractor in lorenz space
const TIME_SCALE = 0.14; // real seconds -> lorenz time
const MAX_STEP = 0.009; // Euler stability cap per frame
const POINTER_RADIUS = 0.72; // world-space radius of the hover turbulence
const SWIRL = 2.1; // hover swirl strength (world units / s)
const PUSH = 0.88; // hover outward push strength (world units / s)

const hero = document.querySelector(".hero");
const canvas = document.getElementById("lorenz-canvas");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (hero && canvas && !reduceMotion) {
  try {
    start();
  } catch (err) {
    canvas.remove(); // WebGL unavailable -> keep the gradient fallback
  }
}

function start() {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const COUNT = coarse || window.innerWidth < 720 ? 2600 : 6000;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    depth: false, // additive points, no depth test needed
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);

  // Lorenz-space state; world positions/colors live in the buffer attributes.
  const state = new Float32Array(COUNT * 3);
  const jitter = new Float32Array(COUNT);
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);

  function respawn(i) {
    // scatter in a box around the attractor; the flow itself collapses the
    // cloud onto the butterfly within a couple of seconds (nice intro)
    state[i * 3] = (Math.random() - 0.5) * 40;
    state[i * 3 + 1] = (Math.random() - 0.5) * 50;
    state[i * 3 + 2] = Math.random() * 50;
  }

  for (let i = 0; i < COUNT; i++) {
    respawn(i);
    jitter[i] = 0.75 + Math.random() * 0.5; // desync so trails don't clump
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: coarse ? 0.03 : 0.022,
    map: makeGlowSprite(),
    vertexColors: true,
    transparent: true,
    opacity: 0, // faded in on load
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  scene.add(points);

  const cSlow = new THREE.Color("#5b51c4"); // muted violet (slow, wing tips)
  const cFast = new THREE.Color("#3fb3a7"); // muted teal (fast, center)

  // ---- pointer: hover turbulence ----
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2(10, 10); // offscreen until first move
  let pointerTarget = 0;
  let pointerAmt = 0;

  window.addEventListener("pointermove", (e) => {
    if (coarse) return;
    const r = canvas.getBoundingClientRect();
    if (e.clientY < r.top || e.clientY > r.bottom) {
      pointerTarget = 0;
      return;
    }
    ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    pointerTarget = 1;
  });
  document.documentElement.addEventListener("mouseleave", () => {
    pointerTarget = 0;
  });

  // ---- camera: slow idle spin + scroll-driven orbit ----
  let orbit = -0.4;

  function updateCamera(elapsed, delta) {
    const target = -0.4 + elapsed * 0.04 + window.scrollY * 0.0026;
    orbit += (target - orbit) * Math.min(1, delta * 4);
    const radius = 2.9;
    camera.position.set(Math.sin(orbit) * radius, 0.4, Math.cos(orbit) * radius);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
  }

  function stepParticles(delta) {
    const dt = Math.min(delta, 0.05) * TIME_SCALE;
    const usePointer = !coarse && pointerAmt > 0.02;
    if (usePointer) raycaster.setFromCamera(ndc, camera);
    const ro = raycaster.ray.origin;
    const rd = raycaster.ray.direction;
    const R = POINTER_RADIUS;
    const R2 = R * R;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      let x = state[i3];
      let y = state[i3 + 1];
      let z = state[i3 + 2];

      const vx = SIGMA * (y - x);
      const vy = x * (RHO - z) - y;
      const vz = x * y - BETA * z;

      let h = dt * jitter[i];
      if (h > MAX_STEP) h = MAX_STEP;
      x += vx * h;
      y += vy * h;
      z += vz * h;

      let px = x * SCALE;
      let py = (z - CENTER_Z) * SCALE;
      let pz = y * SCALE;

      if (usePointer) {
        const ox = px - ro.x;
        const oy = py - ro.y;
        const oz = pz - ro.z;
        const t = ox * rd.x + oy * rd.y + oz * rd.z;
        if (t > 0) {
          const dx = px - (ro.x + rd.x * t);
          const dy = py - (ro.y + rd.y * t);
          const dz = pz - (ro.z + rd.z * t);
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < R2) {
            const d = Math.sqrt(d2) + 1e-5;
            let f = 1 - d / R;
            f = f * f * pointerAmt * delta;
            const ux = dx / d;
            const uy = dy / d;
            const uz = dz / d;
            // swirl around the view ray + gentle outward push
            const swx = rd.y * uz - rd.z * uy;
            const swy = rd.z * ux - rd.x * uz;
            const swz = rd.x * uy - rd.y * ux;
            px += (swx * SWIRL + ux * PUSH) * f;
            py += (swy * SWIRL + uy * PUSH) * f;
            pz += (swz * SWIRL + uz * PUSH) * f;
            // fold the displacement back into lorenz space so the flow reacts
            x = px / SCALE;
            z = py / SCALE + CENTER_Z;
            y = pz / SCALE;
          }
        }
      }

      if (
        !Number.isFinite(x + y + z) ||
        Math.abs(x) > 150 ||
        Math.abs(y) > 200 ||
        z < -80 ||
        z > 200
      ) {
        respawn(i);
        x = state[i3];
        y = state[i3 + 1];
        z = state[i3 + 2];
        px = x * SCALE;
        py = (z - CENTER_Z) * SCALE;
        pz = y * SCALE;
      }

      state[i3] = x;
      state[i3 + 1] = y;
      state[i3 + 2] = z;
      positions[i3] = px;
      positions[i3 + 1] = py;
      positions[i3 + 2] = pz;

      // color by local speed: violet (slow, wing tips) -> teal (fast, center)
      const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
      let s = (speed - 30) / 220;
      if (s < 0) s = 0;
      else if (s > 1) s = 1;
      colors[i3] = cSlow.r + (cFast.r - cSlow.r) * s;
      colors[i3 + 1] = cSlow.g + (cFast.g - cSlow.g) * s;
      colors[i3 + 2] = cSlow.b + (cFast.b - cSlow.b) * s;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  }

  function resize() {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  // ---- render loop, paused when the hero is offscreen or the tab hidden ----
  const clock = new THREE.Clock();
  let elapsed = 0; // running total that excludes paused time (getDelta swallows the gap)
  let inView = true;
  let running = false;
  let rafId = 0;

  function frame() {
    rafId = requestAnimationFrame(frame);
    const delta = clock.getDelta();
    elapsed += delta;
    pointerAmt += (pointerTarget - pointerAmt) * Math.min(1, delta * 6);
    material.opacity += (0.66 - material.opacity) * Math.min(1, delta * 1.1);
    updateCamera(elapsed, delta);
    stepParticles(delta);
    renderer.render(scene, camera);
  }

  function setRunning(on) {
    if (on && !running) {
      running = true;
      clock.getDelta(); // swallow the pause gap
      rafId = requestAnimationFrame(frame);
    } else if (!on && running) {
      running = false;
      cancelAnimationFrame(rafId);
    }
  }

  new IntersectionObserver((entries) => {
    inView = entries[entries.length - 1].isIntersecting;
    setRunning(inView && !document.hidden);
  }).observe(hero);
  document.addEventListener("visibilitychange", () => {
    setRunning(inView && !document.hidden);
  });

  setRunning(true);
}

function makeGlowSprite() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.5)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}
