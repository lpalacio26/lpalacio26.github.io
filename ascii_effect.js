// ascii_effect.js — uses frames defined elsewhere (e.g., ascii_art.js)
// No defaults. No bare identifiers. Just reads whatever globals your file exposes.

(function (g) {
  "use strict";

  const GLOBAL_INTERVAL_KEY = "__asciiInterval";

  // Find frames under common global names your ascii_art.js might be using.
  function resolveFrames() {
    const c = [
      "asciiFrames",   // common
      "ASCII_FRAMES",  // common
      "ASCII_ARTS",    // sometimes used
      "ASCII_ART",
      "ASCII"
    ];
    for (const key of c) {
      const val = g[key];
      if (Array.isArray(val) && val.length) return val.map(String);
    }
    return null;
  }

  // Poll briefly so we don’t race script loading
  function waitForFrames(maxMs = 6000) {
    const deadline = performance.now() + maxMs;
    return new Promise((resolve) => {
      (function tick() {
        const f = resolveFrames();
        if (f) return resolve(f);
        if (performance.now() > deadline) return resolve(null);
        requestAnimationFrame(tick);
      })();
    });
  }

  // Restart your CSS morph animation (you already have .morph-transition)
  function restartMorph(el) {
    el.classList.remove("morph-transition");
    // force reflow
    // eslint-disable-next-line no-unused-expressions
    el.offsetWidth;
    el.classList.add("morph-transition");
  }

  async function startAsciiEffect(opts = {}) {
    const {
      targetId = "ascii-terminal", // your existing element
      delayMs = 3600,              // when to show first frame
      cycleMs = 1500,              // swap speed
      hueRotate = true,            // random hue each frame
      maxWaitMs = 6000             // how long to wait for frames to exist
    } = opts;

    // Wait for DOM
    if (document.readyState === "loading") {
      await new Promise((r) => document.addEventListener("DOMContentLoaded", r, { once: true }));
    }

    const el = document.getElementById(targetId);
    if (!el) {
      console.warn(`[ascii] Target #${targetId} not found`);
      return;
    }

    // Wait for frames provided by YOUR ascii_art.js
    const frames = await waitForFrames(maxWaitMs);
    if (!frames || frames.length === 0) {
      console.warn("[ascii] No frames found. Ensure ascii_art.js sets a global array (e.g. window.asciiFrames).");
      return;
    }

    // Prevent duplicates if called twice
    if (g[GLOBAL_INTERVAL_KEY]) {
      clearInterval(g[GLOBAL_INTERVAL_KEY]);
      g[GLOBAL_INTERVAL_KEY] = null;
    }

    // Start after a small delay so it doesn't clash with intro effects
    setTimeout(() => {
      let i = 0;

      // initial draw
      el.textContent = frames[i % frames.length];
      if (hueRotate) el.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
      el.style.opacity = 1;
      restartMorph(el);
      i++;

      // loop
      g[GLOBAL_INTERVAL_KEY] = setInterval(() => {
        el.textContent = frames[i % frames.length];
        if (hueRotate) el.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
        restartMorph(el);
        i++;
      }, cycleMs);
    }, Math.max(0, delayMs));
  }

  g.startAsciiEffect = startAsciiEffect;
})(window);
