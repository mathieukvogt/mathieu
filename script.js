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

  // Toggle detail functionality
  function toggleDetail(detailId, event) {
    var detailRow = document.getElementById(detailId);
    var isExpanded = detailRow.style.display === "table-row";
    detailRow.style.display = isExpanded ? "none" : "table-row";

    if (isExpanded) {
      event.target.classList.remove("expanded");
    } else {
      event.target.classList.add("expanded");
    }
  }

  // Add click event listeners to all clickable elements
  document.querySelectorAll(".clickable").forEach((element) => {
    element.addEventListener("click", function (event) {
      const detailId = element.getAttribute("data-detail-id"); // Get the target id from data attribute
      toggleDetail(detailId, event); // Pass the id to the toggle function
    });
  });

  // Dark mode functionality
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

  // Initial GSAP animation for ".bar" elements
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

  // Register GSAP Plugins
  gsap.registerPlugin(TextPlugin); // Only TextPlugin is needed

  // Select the burger button and menu bars
  const burgerButton = document.querySelector(".burger");
  const menuBars = document.querySelectorAll(".menu-bar");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuLines = document.querySelectorAll(".menu-line");
  const menuTitleTwos = document.querySelectorAll(".menu-title.two");
  const menuTitleOne = document.querySelectorAll(".menu-title.one");

  let menuOpen = false; // Track the state of the menu

  // Toggle menu on burger button click
  burgerButton.addEventListener("click", () => {
    if (!menuOpen) {
      menuOpen = true;
      // Animate menu bars dropping down
      gsap.to(menuBars, {
        duration: 0.6,
        x: "0%",
        ease: "power4.out",
      });
      gsap.to(menuOverlay, {
        duration: 0.2,
        backgroundColor: "var(--color-ten)",
      });
      gsap.to(menuLines, {
        duration: 0.6,
        delay: 0.1,
        x: "0%",
        stagger: 0.2,
        ease: "power4.out",
      });
      menuTitleTwos.forEach((element, index) => {
        gsap.fromTo(
          element,
          {
            text: {
              value: "",
            },
          },
          {
            duration: 0.6,
            delay: index * 0.3 + 0.2,
            text: {
              value: element.textContent,
              scramble: 5,
              chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            },
            ease: "none",
          }
        );
      });
      menuTitleOne.forEach((element, index) => {
        gsap.fromTo(
          element,
          {
            text: {
              value: "",
            },
          },
          {
            duration: 0.6,
            delay: index * 0.2 + 0.2,
            text: {
              value: element.textContent,
              scramble: 5,
              chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            },
            ease: "none",
          }
        );
      });
    } else {
      menuOpen = false;
      // Animate menu bars moving up
      gsap.to(menuBars, {
        duration: 0.7,
        x: "100%",
        ease: "power4.in",
      });
      gsap.to(menuOverlay, {
        duration: 0.2,
        delay: 0.6,
        backgroundColor: "transparent",
      });
      gsap.to(menuLines, {
        duration: 0.6,
        delay: 0.1,
        x: "130%",
        stagger: 0.2,
        ease: "power4.out",
      });
    }
  });

  // Rotate the burger button on click
  burgerButton.addEventListener("click", () => {
    burgerButton.classList.toggle("rotate");
  });

  // **Simplified Scramble Text on Hover Implementation**

  // Select the target <b> element containing "MATHIEU"
  const mathieuElement = document.querySelector(".center-text b");

  // Original text
  const originalText = mathieuElement.textContent;

  // Function to scramble to random text
  function scrambleText() {
    gsap.to(mathieuElement, {
      duration: 0.6,
      text: {
        value: generateRandomText(originalText.length),
        scramble: 5, // Adjust the scramble amount as needed
        chars: "$#?&!%≠¿§¥ß¡€£389206XYKZENHAJ",
      },
      ease: "none",
      onComplete: unscrambleText, // After scrambling, unscramble
    });
  }

  // Function to unscramble back to original text
  function unscrambleText() {
    gsap.to(mathieuElement, {
      duration: 0.6,
      text: {
        value: originalText,
        scramble: 5,
        chars: "$#?&!%≠¿§¥ß¡€£389206XYKZENHAJ",
      },
      ease: "none",
    });
  }

  // Utility function to generate random text of a given length
  function generateRandomText(length) {
    const chars = "$#?&!%≠¿§¥ß¡€£389206XYKZENHAJ";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Add event listener for mouseenter to trigger scramble
  const linkElement = document.querySelector(".center-text");
  linkElement.addEventListener("mouseenter", scrambleText);

  // **End of Scramble Text Implementation**
});
