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

  const darkModeButton = document.getElementById("darkModeButton");

  // Check localStorage for the preferred mode
  const currentMode = localStorage.getItem("mode");

  // If a mode is found, apply it
  if (currentMode === "dark") {
    document.documentElement.classList.add("dark-mode");
    document.body.classList.add("dark-mode");
    darkModeButton.textContent = "LM"; // Light Mode
  } else {
    darkModeButton.textContent = "DM"; // Dark Mode
  }

  // Toggle dark mode and store the preference
  darkModeButton.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark-mode");
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      darkModeButton.textContent = "LM"; // Light Mode
      localStorage.setItem("mode", "dark"); // Save the preference to localStorage
    } else {
      darkModeButton.textContent = "DM"; // Dark Mode
      localStorage.setItem("mode", "light"); // Save the preference to localStorage
    }
  });

  gsap.to(".bar", 1.3, {
    delay: 0,
    height: 0,
    stagger: {
      amount: 0.5,
    },
    ease: "power4.inOut",
    onComplete: function () {
      document.querySelector(".overlay").style.display = "none";
    },
  });
});
