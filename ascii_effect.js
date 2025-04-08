let analyser;

// Particle system
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    // Set canvas styles to cover entire viewport
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.zIndex = "-1"; // Send to background
    this.canvas.style.pointerEvents = "none"; // Make click-through

    document.body.prepend(this.canvas); // Add as first element

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles(x, y) {
    for (let i = 0; i < 20; i++) {
      const particle = {
        x: x + Math.random() * 50 - 25,
        y: y + Math.random() * 50 - 25,
        vx: Math.random() * 4 - 2,
        vy: Math.random() * 4 - 2,
        life: 1,
      };
      this.particles.push(particle);
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.02;

      this.ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
      this.ctx.fillRect(particle.x, particle.y, 2, 2);

      if (particle.life <= 0) this.particles.splice(index, 1);
    });

    requestAnimationFrame(() => this.update());
  }
}

// Enhanced ASCII generator
class CyberAscii {
  constructor() {
    this.element = document.getElementById("ascii-terminal");

    // Add CSS to keep ASCII art above canvas
    this.element.style.zIndex = "100";

    this.particleSystem = new ParticleSystem();
    this.particleSystem.update();
    this.setupInteractions();
  }

  setupInteractions() {
    document.addEventListener("mousemove", (e) => {
      this.distortAscii(e.clientX, e.clientY);
      this.particleSystem.createParticles(e.clientX, e.clientY);
    });
  }

  distortAscii(x, y) {
    const rect = this.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = (x - centerX) / window.innerWidth;
    const dy = (y - centerY) / window.innerHeight;

    this.element.style.transform = `
      translate(-50%, -50%)
      rotate(${dx * 5}deg)
      scale(${1 + Math.abs(dy)})
    `;
  }

}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  const cyberAscii = new CyberAscii();
});
