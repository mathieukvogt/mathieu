document.addEventListener("DOMContentLoaded", function () {
  // Wait a small amount of time to ensure everything is loaded
  setTimeout(function () {
    const pageOverlay = document.querySelector(".page-overlay");
    if (pageOverlay) {
      pageOverlay.classList.add("active");
    }
  }, 300);

  // Animate about image
  const aboutImage = document.querySelector(".about-image");
  if (aboutImage) {
    gsap.set(aboutImage, { scale: 0 });
    gsap.to(aboutImage, {
      scale: 1,
      duration: 1.5,
      ease: "power4.out",
      delay: 0.5,
    });
  }

  // Animate text content
  const contentTexts = document.querySelectorAll(".content-text");
  gsap.set(contentTexts, { opacity: 0 });
  gsap.to(contentTexts, {
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out",
    delay: 2,
  });

  // Animate skills section
  const skillsTitles = document.querySelectorAll(".skills-title");
  const skillItems = document.querySelectorAll(".skill-item");

  gsap.set([skillsTitles, skillItems], { opacity: 0 });

  gsap.to(skillsTitles, {
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
    delay: 2,
  });

  gsap.to(skillItems, {
    opacity: 1,
    duration: 0.8,
    stagger: 0.05,
    ease: "power2.out",
    delay: 2,
  });

  // Dark mode functionality
  const darkModeButton = document.getElementById("darkModeButton");
  const leftHalf = darkModeButton.querySelector(".half.left");
  const rightHalf = darkModeButton.querySelector(".half.right");

  function applyMode(mode) {
    if (mode === "dark") {
      document.documentElement.classList.add("dark-mode");
      document.body.classList.add("dark-mode");
      leftHalf.style.backgroundColor = "var(--color-eight)";
      rightHalf.style.backgroundColor = "transparent";
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.body.classList.remove("dark-mode");
      leftHalf.style.backgroundColor = "transparent";
      rightHalf.style.backgroundColor = "var(--color-eight)";
    }
  }

  // Initialize mode from localStorage or default to system preference
  const storedMode = localStorage.getItem("mode");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const currentMode = storedMode || (systemPrefersDark ? "dark" : "light");
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

  // Menu functionality
  const burgerButton = document.querySelector(".burger");
  const squareOne = document.querySelector(".square-one");
  const squareTwo = document.querySelector(".square-two");
  const menuBars = document.querySelectorAll(".menu-bar");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuLines = document.querySelectorAll(".menu-line");
  const menuTitles = document.querySelectorAll(".menu-title.one");

  let menuOpen = false;

  // Set initial state
  gsap.set(menuLines, { x: "100%" });

  // Function to scramble text sequentially
  function scrambleText(element, duration = 0.5) {
    const originalText = element.textContent;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const textLength = originalText.length;
    let currentIndex = 0;

    const interval = setInterval(() => {
      const newText = originalText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < currentIndex) return originalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      element.textContent = newText;

      currentIndex++;
      if (currentIndex > textLength) {
        clearInterval(interval);
        element.textContent = originalText;
      }
    }, (duration * 1000) / textLength);
  }

  burgerButton.addEventListener("click", () => {
    if (!menuOpen) {
      menuOpen = true;
      gsap.to(menuBars, {
        duration: 0.6,
        x: "0%",
        ease: "power4.out",
      });
      gsap.to(menuOverlay, {
        duration: 0.2,
        backgroundColor: "var(--color-ten)",
      });
      gsap.to(menuOverlay, {
        duration: 0.3,
        backdropFilter: "blur(2px)",
      });
      gsap.to(menuLines, {
        duration: 0.6,
        delay: 0.1,
        x: "0%",
        stagger: 0.2,
        ease: "power4.out",
        onStart: () => {
          menuTitles.forEach((title, index) => {
            setTimeout(() => {
              scrambleText(title, 0.5);
            }, index * 200);
          });
        },
      });
      menuOverlay.style.pointerEvents = "auto";
    } else {
      menuOpen = false;
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
      gsap.to(menuOverlay, {
        duration: 0.3,
        backdropFilter: "blur(0px)",
        delay: 0.6,
      });
      gsap.to(menuLines, {
        duration: 0.6,
        delay: 0.1,
        x: "100%",
        stagger: 0.2,
        ease: "power4.out",
      });
      menuOverlay.style.pointerEvents = "none";
    }
  });

  let isRotated = false;
  burgerButton.addEventListener("click", () => {
    if (!isRotated) {
      squareOne.style.animation = "moveSquareOne 0.3s forwards";
      squareTwo.style.animation = "moveSquareTwo 0.3s forwards";
    } else {
      squareOne.style.animation = "moveSquareOneReverse 0.3s forwards";
      squareTwo.style.animation = "moveSquareTwoReverse 0.3s forwards";
    }
    isRotated = !isRotated;
  });

  // Noise background
  const noise = () => {
    let canvas, ctx;
    let wWidth, wHeight;
    let noiseData = [];
    let frame = 0;
    let loopTimeout;

    const createNoise = () => {
      const idata = ctx.createImageData(wWidth, wHeight);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
          buffer32[i] = 0xff000000;
        } else {
          buffer32[i] = 0xffffffff;
        }
      }

      noiseData.push(idata);
    };

    const paintNoise = () => {
      if (frame === 9) {
        frame = 0;
      } else {
        frame++;
      }
      ctx.putImageData(noiseData[frame], 0, 0);
    };

    const loop = () => {
      paintNoise(frame);
      loopTimeout = window.setTimeout(() => {
        window.requestAnimationFrame(loop);
      }, 1000 / 25);
    };

    const setup = () => {
      wWidth = window.innerWidth;
      wHeight = window.innerHeight;
      canvas.width = wWidth;
      canvas.height = wHeight;
      noiseData = [];
      for (let i = 0; i < 10; i++) {
        createNoise();
      }
      loop();
    };

    let resizeThrottle;
    const reset = () => {
      window.addEventListener(
        "resize",
        () => {
          window.clearTimeout(resizeThrottle);
          resizeThrottle = window.setTimeout(() => {
            window.clearTimeout(loopTimeout);
            setup();
          }, 200);
        },
        false
      );
    };

    const init = () => {
      canvas = document.getElementById("noise");
      if (!canvas) return;
      ctx = canvas.getContext("2d");
      setup();
      reset();
    };

    init();
  };

  noise();
});
