document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll functionality
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

  // Dark mode toggle functionality
  const darkModeButton = document.getElementById("darkModeButton");
  darkModeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });
});
