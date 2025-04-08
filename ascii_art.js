const asciiFrames = [
  `
     _____
    |  _  |
    | | | |
    | |_| |
    |___  |
        |_|
    `,
  `
    ╔═╗╔═╗
    ║ ║║ ║
    ╠═╝╠═╣
    ║  ║ ║
    ╚═╝╚═╝
    `,
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
╔═╗╦╦ ╦╔═╗╦╔═╗╔═╗╦╔═╗╔═╗╦╔═╗
╠═╝║║ ║║╣ ║║  ╠═╝║║  ╠═╝║║ 
╩  ╩╚═╝╚═╝╩╚═╝╩  ╩╚═╝╩  ╩╚═╝
`,
  `
█▀▀▀▀▀▀▀█▄     ▄█▀▀▀▀▀▀▀█
█ ███ █ ▐▌   ▐▌ █ ███ █
█ ▀▀▀ █ ▐▌   ▐▌ █ ▀▀▀ █
▀▀▀▀▀▀▀▀▀     ▀▀▀▀▀▀▀▀▀
`,
  `
┌─┐┬ ┬┌┬┐┌─┐┬─┐┌┬┐┌─┐┬ ┬
├─┤│ │ │ │ │├┬┘ │ ├─┤└┬┘
┴ ┴└─┘ ┴ └─┘┴└─ ┴ ┴ ┴ ┴ 
`,
  `
░▒▓█████▓▒░▒▓█▓▒░░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█
░▒▓█████▓▒░▒▓█▓▒░░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█
░▒▓█████▓▒░▒▓█▓▒░░▒▓█▓▒░
`,
  `
╔╦╗╦╔═╗╔═╗╔═╗╔╦╗╔═╗╔═╗╔╦╗
 ║ ║║ ║║ ╦║ ║ ║║║╣ ╠═╣ ║ 
 ╩ ╩╚═╝╚═╝╚═╝═╩╝╚═╝╩ ╩ ╩ 
`,
  `
█░█░█▀█░█▀▀░█▀▄░█▀▀░█▀█
▀▄▀░█░█░█▀▀░█▀▄░█▀▀░█░█
░▀░░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀░▀
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

// Toggle visibility with animation
function toggleAscii() {
  const asciiTerminal = document.getElementById("ascii-terminal");
  asciiTerminal.style.display =
    asciiTerminal.style.display === "none" ? "block" : "none";
}

// Initialize with random art and rotation
document.addEventListener("DOMContentLoaded", () => {
  generateRandomAscii();
  asciiInterval = setInterval(generateRandomAscii, 5000);

});


