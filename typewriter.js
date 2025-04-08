    // Add persistent cursor after typewriter finishes
    setTimeout(() => {
        const cursor = document.createElement("span");
        cursor.className = "cursor";
        document.querySelector(".typewriter-text").appendChild(cursor);
      }, 6000);