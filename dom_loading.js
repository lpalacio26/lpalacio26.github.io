document.addEventListener("DOMContentLoaded", () => {
    const typewriter = document.querySelector(".typewriter-text");
    const lines = [
      "> digital gardens, hypertext",
      "> boot sequence: /init",
      "> tracing signal...",
      "> connection found: NODE 01",
    ];

    let i = 0;
    let charIndex = 0;
    function typeLine() {
      if (i < lines.length) {
        if (charIndex < lines[i].length) {
          typewriter.textContent += lines[i].charAt(charIndex);
          charIndex++;
          setTimeout(typeLine, 30);
        } else {
          typewriter.innerHTML += "<br />";
          i++;
          charIndex = 0;
          setTimeout(typeLine, 500);
        }
      }
    }
    typeLine();
  });

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "m") {
      alert(">>> secret transfer station unlocked: /AI-mem/lain-lab");
    }
  });