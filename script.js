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
  // Select the burger button and menu bars
  const burgerButton = document.querySelector(".burger");
  const menuBars = document.querySelectorAll(".menu-bar");

  let menuOpen = false; // Track the state of the menu

  // Toggle menu on burger button click
  burgerButton.addEventListener("click", () => {
    if (!menuOpen) {
      menuOpen = true;
      // Animate menu bars dropping down
      gsap.to(menuBars, {
        duration: 0.5,
        y: "0%",
        stagger: 0.05, // Delay each bar by 0.1s
        ease: "power4.out",
      });
    } else {
      menuOpen = false;
      // Animate menu bars moving up
      gsap.to(menuBars, {
        duration: 0.5,
        y: "-100%",
        stagger: {
          each: 0.05,
          from: "end", // Reverse the stagger
        },
        ease: "power4.in",
      });
    }
  });
});

const burgerButton = document.querySelector(".burger");

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("rotate");
});
