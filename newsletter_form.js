document
  .getElementById("newsletterForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById("formStatus");
    const email = form.querySelector("input").value;

    status.innerHTML = '> Processing... <span class="blink">_</span>';

    // Simulate API call with cyber effect
    setTimeout(() => {
      status.innerHTML = `
    > Subscription successful!<br>
    > ${email} added to network<br>
    > Welcome to the grid...
  `;
      form.reset();

      // Clear status after 5 seconds
      setTimeout(() => {
        status.textContent = "";
      }, 5000);
    }, 1500);

    // Here you would normally add your fetch() call
    // to a real newsletter service API
  });
