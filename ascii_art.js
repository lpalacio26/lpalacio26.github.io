window.asciiFrames = [
  `
    (\\___/)
    ( • • )
    (  >< )
    /  [] \\
    `,
  `
     ▄▄▄▄▄▄▄
     █ █▀▀ █
     █ ███ █
     █▄▄▄▄▄█
     ███████
    `,
  `
    .d8888b. 
   d88P  Y88b
   888    888
   888       
   888       
   888    888
   Y88b  d88P
    "Y8888P"
    `,
  `
▄▀▀▀▀▀▀▀▀▄         ▄▀▀▀▀▀▀▀▀▄
█      █▀▄       ▄▀█      █
█  ▄▄▄▄▄  █     █  ▄▄▄▄▄  █
▀▄▀     ▀▄▀     ▀▄▀     ▀▄▀
`,

  `
█▀▀▀▀▀▀▀█▄     ▄█▀▀▀▀▀▀▀█
█ ███ █ ▐▌   ▐▌ █ ███ █
█ ▀▀▀ █ ▐▌   ▐▌ █ ▀▀▀ █
▀▀▀▀▀▀▀▀▀     ▀▀▀▀▀▀▀▀▀
`,

  `
░▒▓█████▓▒░▒▓█▓▒░░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█
░▒▓█████▓▒░▒▓█▓▒░░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█
░▒▓█████▓▒░▒▓█▓▒░░▒▓█▓▒░
`,
  `
                     .::.
                  .:'  .:
        ,MMM8&&&.:'   .:'
       MMMMM88&&&&  .:'
      MMMMM88&&&&&&:'
      MMMMM88&&&&&&
    .:MMMMM88&&&&&&
  .:'  MMMMM88&&&&
.:'   .:'MMM8&&&'
:'  .:'
'::'  
`,
  `
% +=============================================================+
% | ____ ___ _     _______   ______  ____ ___ _     _______   __|
% ||  _ \_ _| |   | ____\ \ / / ___||  _ \_ _| |   | ____\ \ / /|
% || | | | || |   |  _|  \ V /\___ \| | | | || |   |  _|  \ V / |
% || |_| | || |___| |___  | |  ___) | |_| | || |___| |___  | |  |
% ||____/___|_____|_____| |_| |____/|____/___|_____|_____| |_|  |
% +=============================================================+ 
`,
];
let asciiInterval;

function generateRandomAscii() {
  const asciiTerminal = document.getElementById("ascii-terminal");
  const randomIndex = Math.floor(Math.random() * asciiFrames.length);
  asciiTerminal.textContent = asciiFrames[randomIndex];
}

// Initialize with random art and rotation
document.addEventListener("DOMContentLoaded", () => {
  generateRandomAscii();
  asciiInterval = setInterval(generateRandomAscii, 5000);
});

// Ensure global visibility of ASCII frames
window.ASCII_ARTS =
  typeof asciiFrames !== "undefined"
    ? asciiFrames
    : typeof ASCII_FRAMES !== "undefined"
    ? ASCII_FRAMES
    : typeof FRAMES !== "undefined"
    ? FRAMES
    : [];

// --- ASCII global shim (put at the very end of ascii_art.js) ---
(function (g) {
  // If your file declared `const asciiFrames = [...]`, make it global:
  if (
    typeof g.asciiFrames === "undefined" &&
    typeof asciiFrames !== "undefined"
  ) {
    g.asciiFrames = asciiFrames;
  }
  // Also support other common names:
  if (
    typeof g.asciiFrames === "undefined" &&
    typeof ASCII_FRAMES !== "undefined"
  ) {
    g.asciiFrames = ASCII_FRAMES;
  }
  if (typeof g.asciiFrames === "undefined" && typeof FRAMES !== "undefined") {
    g.asciiFrames = FRAMES;
  }
  // Canonical global used by the effect:
  if (typeof g.ASCII_ARTS === "undefined") {
    g.ASCII_ARTS = g.asciiFrames || [];
  }
})(window);
// --- end shim ---
