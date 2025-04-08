const planets = [
  {
    name: "gas giant",
    art: `
         .-~~~-.
       .'       '.
      /           \\
     :             :
     :             :
      \\           /
       '.       .'
         '-~~~-'
      `,
    color: "#FF9966",
    orbitSpeed: "40s",
    moons: 4,
  },
  {
    name: "ringed planet",
    art: `
         .-~~~-.
       .'  ___  '.
      /   /   \\   \\
     :   |     |   :
     :    \\___/    :
      \\           /
       '.       .'
         '-~~~-'
      `,
    color: "#66CCFF",
    orbitSpeed: "60s",
    moons: 2,
  },
  {
    name: "terra",
    art: `
         .-~~~-.
       .'       '.
      /     •     \\
     :      •      :
     :      •      :
      \\           /
       '.       .'
         '-~~~-'
      `,
    color: "#33FF99",
    orbitSpeed: "80s",
    moons: 1,
  },
  {
    name: "volcanic",
    art: `
         .-~~~-.
       .'  ^^^  '.
      /   ^^^^^   \\
     :    ^^^^^    :
     :     ^^^     :
      \\           /
       '.       .'
         '-~~~-'
      `,
    color: "#FF3366",
    orbitSpeed: "30s",
    moons: 0,
  },
  {
    name: "ice world",
    art: `
         .-~~~-.
       .'  ~~~  '.
      /   ~~~~~   \\
     :    ~~~~~    :
     :     ~~~     :
      \\           /
       '.       .'
         '-~~~-'
      `,
    color: "#66FFFF",
    orbitSpeed: "120s",
    moons: 3,
  },
];

class PlanetSystem {
  constructor() {
    this.container = document.getElementById("planetSystem");
    this.orbitContainer = document.createElement("div");
    this.orbitContainer.className = "orbit-container";
    this.container.appendChild(this.orbitContainer);

    this.currentPlanet = 0;
    this.moons = [];
    this.init();
  }

  init() {
    this.createOrbits();
    this.renderPlanet();
    setInterval(() => this.cyclePlanet(), 8000);
  }

  renderPlanet() {
    const planet = planets[this.currentPlanet];
    const planetElement = document.createElement("div");
    planetElement.className = "planet";
    planetElement.innerHTML = `
        ${planet.art}
        <div class="planet-name">${planet.name}</div>
      `;
    planetElement.style.color = planet.color;

    // Clear previous planet but keep orbits
    const oldPlanet = this.container.querySelector(".planet");
    if (oldPlanet) oldPlanet.remove();

    this.container.appendChild(planetElement);
    this.createMoons(planet.moons);
  }

  createOrbits() {
    for (let i = 1; i <= 3; i++) {
      const orbit = document.createElement("div");
      orbit.className = "orbit";
      orbit.style.width = `${150 + i * 100}px`;
      orbit.style.height = `${150 + i * 100}px`;
      orbit.style.animationDuration = `${10 + i * 5}s`;
      this.orbitContainer.appendChild(orbit);
    }
  }

  createMoons(count) {
    this.moons.forEach((moon) => moon.remove());
    this.moons = [];

    for (let i = 0; i < count; i++) {
      const moon = document.createElement("div");
      moon.className = "moon";
      moon.textContent = "○";
      moon.style.animationDuration = `${5 + Math.random() * 10}s`;
      moon.style.left = `${50 + Math.random() * 20 - 10}%`;
      moon.style.top = `${50 + Math.random() * 20 - 10}%`;
      this.container.appendChild(moon);
      this.moons.push(moon);
    }
  }

  cyclePlanet() {
    this.currentPlanet = (this.currentPlanet + 1) % planets.length;
    this.renderPlanet();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PlanetSystem();
});
