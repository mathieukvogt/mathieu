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
  const leftHalf = darkModeButton.querySelector(".half.left");
  const rightHalf = darkModeButton.querySelector(".half.right");

  // Function to apply the mode by setting background colors
  function applyMode(mode) {
    if (mode === "dark") {
      document.documentElement.classList.add("dark-mode");
      document.body.classList.add("dark-mode");
      leftHalf.style.backgroundColor = "var(--color-eight)"; // Dark background
      rightHalf.style.backgroundColor = "transparent"; // Light background
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.body.classList.remove("dark-mode");
      leftHalf.style.backgroundColor = "transparent"; // Light background
      rightHalf.style.backgroundColor = "var(--color-eight)"; // Dark background
    }
  }

  // Initialize mode from localStorage or default to light
  const currentMode = localStorage.getItem("mode") || "light";
  applyMode(currentMode);

  // Toggle mode and update background colors on button click
  darkModeButton.addEventListener("click", function () {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    document.documentElement.classList.toggle("dark-mode");

    if (isDarkMode) {
      applyMode("dark");
      localStorage.setItem("mode", "dark");
    } else {
      applyMode("light");
      localStorage.setItem("mode", "light");
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
  const menuOverlay = document.querySelector(".menu-overlay");

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
      gsap.to(menuOverlay, {
        duration: 0.2,
        backgroundColor: "var(--color-ten)",
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
      gsap.to(menuOverlay, {
        duration: 0.2,
        backgroundColor: "transparent",
      });
    }
  });
});

const burgerButton = document.querySelector(".burger");

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("rotate");
});
