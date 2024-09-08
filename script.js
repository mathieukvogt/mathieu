import smoothscroll from "smoothscroll-polyfill";

// Kick off the polyfill for smooth scroll
smoothscroll.polyfill();

document.addEventListener("DOMContentLoaded", function () {
  // Ensure the DOM is fully loaded before adding event listeners

  // Smooth scroll for links with class "alphsort"
  document.querySelectorAll(".alphsort a").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Toggle dark mode when dark mode button is clicked
  const darkModeButton = document.getElementById("darkModeButton");
  if (darkModeButton) {
    darkModeButton.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
    });
  } else {
    console.error(
      'Dark mode button not found. Ensure the button exists with id="darkModeButton".'
    );
  }
});
