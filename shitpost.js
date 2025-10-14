/***** CONFIG — tweak freely *****/
const CHAOS_ENABLED_DEFAULT = true;
const MAX_LIVE_MEMES = 26;
const BURSTS_PER_SEC = 5;          // time-based, not FPS-based
const MEMES_PER_BURST_MIN = 1;
const MEMES_PER_BURST_MAX = 2;
const FULLSCREEN_CHANCE = 0.06;
const SPIN_CHANCE = 0.25;

const MEME_DIR = './memes/';       // only change the folder here
// List memes as filename + extension only:
const MEMES = [
  'garfield.png','thomas.png','dog.webp','yes.jpeg','tortellini.jpeg',
  'walkies.webp','spongebobby.jpg','sinso.jpg','galaxy.webp','jorge.webp'
];

/***** UTIL *****/
const memeSrc = () => MEME_DIR + MEMES[Math.floor(Math.random()*MEMES.length)];
const ensure = (sel, maker) => document.querySelector(sel) || document.body.appendChild(maker());

/***** PREP — overlays exist? if not, create (safe if you pasted HTML snippet) *****/
ensure('.noise', () => { const d = document.createElement('div'); d.className = 'noise'; return d; });
const bg = ensure('#bg', () => { const d = document.createElement('div'); d.id = 'bg'; return d; });

/***** PRELOAD IMAGES for smooth first spawns *****/
for (const name of MEMES) { const img = new Image(); img.src = MEME_DIR + name; }

/***** NODE POOLS (avoid DOM/GC thrash) *****/
const memePool = [];
const liveMemes = new Set();
function acquireMeme() {
  const img = memePool.pop() || document.createElement('img');
  img.className = 'meme';
  img.decoding = 'async';
  img.loading = 'lazy';
  return img;
}
function releaseMeme(img) {
  img.remove();
  liveMemes.delete(img);
  if (memePool.length < MAX_LIVE_MEMES) memePool.push(img);
}

/***** SPAWNERS *****/
function spawnMeme(fullscreen = false) {
  if (liveMemes.size >= MAX_LIVE_MEMES) return;

  const img = acquireMeme();
  img.src = memeSrc();

  const short = Math.min(innerWidth, innerHeight);
  const w = fullscreen
    ? Math.max(innerWidth, innerHeight) * (0.8 + Math.random()*0.5)
    : Math.floor(short * (0.12 + Math.random() * 0.28)); // 12–40%

  img.style.width = w + 'px';

  if (fullscreen) {
    img.style.left = Math.floor((innerWidth - w)/2) + 'px';
    img.style.top  = Math.floor((innerHeight - w)/2) + 'px';
    img.style.opacity = 0.22;
    img.style.mixBlendMode = 'overlay';
    img.style.setProperty('--fry', (1000 + Math.random()*2000).toFixed(0) + 'ms');
    img.style.setProperty('--rot', (Math.random()*24-12).toFixed(2) + 'deg');
  } else {
    const maxLeft = Math.max(0, innerWidth - w);
    const maxTop  = Math.max(0, innerHeight - w);
    img.style.left = Math.floor(Math.random() * maxLeft) + 'px';
    img.style.top  = Math.floor(Math.random() * maxTop ) + 'px';
    img.style.setProperty('--fry', (900 + Math.random()*1600).toFixed(0) + 'ms');
    img.style.setProperty('--rot', (Math.random()*120-60).toFixed(2) + 'deg');
    if (Math.random() < SPIN_CHANCE) img.classList.add('spin-chaos');
    else img.classList.remove('spin-chaos');
  }

  document.body.appendChild(img);
  liveMemes.add(img);
  setTimeout(() => {
    img.style.opacity = '';
    img.style.mixBlendMode = '';
    releaseMeme(img);
  }, fullscreen ? 2600 : 2200);
}

/***** rAF SCHEDULER (time-based bursts) *****/
let chaosEnabled = CHAOS_ENABLED_DEFAULT;
let lastTime = performance.now();
let burstAcc = 0;

function loop(now) {
  const elapsed = (now - lastTime) / 1000;
  lastTime = now;

  if (chaosEnabled) {
    burstAcc += elapsed * BURSTS_PER_SEC;
    while (burstAcc >= 1) {
      burstAcc -= 1;
      const count = Math.floor(Math.random() * (MEMES_PER_BURST_MAX - MEMES_PER_BURST_MIN + 1)) + MEMES_PER_BURST_MIN;
      for (let i = 0; i < count; i++) setTimeout(() => spawnMeme(false), i * 35);
      if (Math.random() < FULLSCREEN_CHANCE) spawnMeme(true);
    }
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame((t)=>{ lastTime = t; loop(t); });

/***** ASCII POP-UPS (lightweight, self-cleaning) *****/
const ASCII_SNIPPETS = [
`  _____  _ _      _____   _____
 |  __ \\(_) |    |  __ \\ / ____|
 | |  | |_| | ___| |  | | (___
 | |  | | | |/ _ \\ |  | |\\___ \\
 | |__| | | |  __/ |__| |____) |
 |_____/|_|_|\\___|_____/|_____/`,
`  ___  _      ___  ___  ___  _  _
 / __|| |    / _ \\| _ \\| _ \\| || |
 \\__ \\| |__ | (_) |  _/|  _/| __ |
 |___/|____| \\___/|_|  |_|  |_||_|`,
` ██████╗ ██╗██╗     ███████╗██╗   ██╗
██╔═══██╗██║██║     ██╔════╝╚██╗ ██╔╝
██║   ██║██║██║     █████╗   ╚████╔╝
██║▄▄ ██║██║██║     ██╔══╝    ╚██╔╝
╚██████╔╝██║███████╗███████╗   ██║
 ╚══▀▀═╝ ╚═╝╚══════╝╚══════╝   ╚═╝`
];
const ASCII_COLORS = ['#ffea00', '#33ff99', '#00ffff', '#ff00ff', '#ffffff'];

function spawnAsciiArt() {
  const el = document.createElement('pre');
  el.className = 'ascii-pop';
  el.textContent = ASCII_SNIPPETS[Math.floor(Math.random()*ASCII_SNIPPETS.length)];
  el.style.left = Math.random()*70 + 'vw';
  el.style.top = Math.random()*70 + 'vh';
  el.style.color = ASCII_COLORS[Math.floor(Math.random()*ASCII_COLORS.length)];
  el.style.opacity = 0;
  el.style.transform = 'scale(0.8) rotate(' + (Math.random()*10-5) + 'deg)';
  document.body.appendChild(el);

  requestAnimationFrame(() => {
    el.style.opacity = 1;
    el.style.transform = 'scale(1) rotate(' + (Math.random()*20-10) + 'deg)';
  });
  setTimeout(() => {
    el.style.opacity = 0;
    el.style.transform = 'scale(1.3) rotate(' + (Math.random()*40-20) + 'deg)';
    setTimeout(() => el.remove(), 800);
  }, 1500 + Math.random()*1500);
}
setInterval(() => { if (chaosEnabled && Math.random() < 0.35) spawnAsciiArt(); }, 700);

/***** AUDIO — autoplay with fallback + hotkeys *****/
const music = document.getElementById('bgmusic') || (() => {
  const a = document.createElement('audio');
  a.id = 'bgmusic';
  a.src = './music/intheend.mp3';
  a.loop = true;
  document.body.appendChild(a);
  return a;
})();
music.volume = 0.7;
music.play().catch(() => {
  const start = () => { music.play().catch(()=>{}); off(); };
  const off = () => { document.removeEventListener('click', start); document.removeEventListener('keydown', start); };
  document.addEventListener('click', start);
  document.addEventListener('keydown', start);
});

/* Hotkeys:
   M = mute/unmute
   C = toggle chaos
   F = mutate font (for extra cyber vibes) */
const FONTS = ['Impact','Courier New','Papyrus','Times New Roman','Gnomon','Arial Black','Monaco','Menlo','Lucida Console'];
addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (k === 'm') music.muted = !music.muted;
  if (k === 'c') chaosEnabled = !chaosEnabled;
  if (k === 'f') document.body.style.fontFamily = FONTS[Math.floor(Math.random()*FONTS.length)];
});
