document.addEventListener("DOMContentLoaded", function () {
  // All slider functionality removed

  // ------------------------------
  // 3D Card Slider Functionality
  // ------------------------------

  // Create cubic ease for animations
  gsap.registerPlugin(TextPlugin);
  if (!window.CustomEase) {
    console.warn(
      "CustomEase plugin not available, using Power3.easeInOut instead"
    );
  }

  const ease = window.CustomEase
    ? CustomEase.create("cubic", "0.83, 0, 0.17, 1")
    : "power3.inOut";
  let isAnimating = false;

  // Domain data mapping
  const domainData = {
    1: { price: "USD 7,500.00$", name: "synchronized.ai" },
    2: { price: "USD 7,500.00$", name: "peas.ai" },
    3: { price: "USD 7,500.00$", name: "quicktake.ai" },
    4: { price: "USD 7,500.00$", name: "sandclock.ai" },
    5: { price: "USD 7,500.00$", name: "salva.ai" },
    6: { price: "USD 20,000.00$", name: "onecall.ai" },
  };

  // Update onecall-box content based on domain index
  function updateDomainInfo(index) {
    const domainPrice = document.querySelector(".domain-price");
    const domainName = document.querySelector(".domain-name");

    if (domainPrice && domainName && domainData[index]) {
      domainPrice.textContent = domainData[index].price;
      domainName.textContent = domainData[index].name;
    }
  }

  // Initialize cards with staggered positioning
  function initializeCards() {
    const cards = Array.from(document.querySelectorAll(".card"));

    // Make cards visible but in starting position
    gsap.set(cards, {
      opacity: 1,
      y: (i) => (i === 0 ? "150%" : "0%"),
    });

    // Position and fade in cards
    gsap.to(cards, {
      y: (i) => -10 + 10 * i + "%",
      z: (i) => 15 * i,
      opacity: 1,
      duration: 1,
      ease: ease,
      stagger: -0.08,
    });

    // Update domain number
    const domainNumber = document.querySelector(".domain-number");
    if (domainNumber) {
      const activeIndex = cards.length - 1;
      const domainIndex = activeIndex + 1;
      domainNumber.textContent = `[${domainIndex}]`;

      // Initialize domain info on page load
      updateDomainInfo(domainIndex);
    }
  }

  // Setup the slider
  function setupSlider() {
    // Initialize card positions
    initializeCards();

    // Add click listener to slider
    document.querySelector(".slider").addEventListener("click", rotateCards);

    // Add click listener to the card swap trigger button
    const cardSwapTrigger = document.getElementById("cardSwapTrigger");
    if (cardSwapTrigger) {
      cardSwapTrigger.addEventListener("click", rotateCards);
    }
  }

  // Rotate cards on click
  function rotateCards() {
    if (isAnimating) return;
    isAnimating = true;

    const slider = document.querySelector(".slider");
    const cards = Array.from(slider.querySelectorAll(".card"));
    const lastCard = cards.pop();
    const nextCard = cards[cards.length - 1];

    // Get current domain index
    const currentIndex = Number(
      lastCard.querySelector("img").alt.replace(/\D/g, "")
    );

    // Calculate next index (handle 6 images instead of 3)
    const totalImages = 6;
    const nextIndex = currentIndex === 1 ? totalImages : currentIndex - 1;

    // Update domain number and info
    const domainNumber = document.querySelector(".domain-number");
    if (domainNumber) {
      domainNumber.textContent = `[${nextIndex}]`;

      // Update domain info when changing cards
      updateDomainInfo(nextIndex);
    }

    // First animation: Slide the card down off-screen
    gsap.to(lastCard, {
      y: "+=200%", // Move further down to ensure it's off-screen
      opacity: 1, // Keep it visible
      duration: 0.9,
      ease: "power2.inOut",
      onComplete: () => {
        // Move the original card to the beginning of the stack
        slider.prepend(lastCard);

        // Position it below the screen, ready to slide up
        gsap.set(lastCard, {
          y: "200%", // Position below the screen
          opacity: 0,
          zIndex: -1, // Set a lower z-index so it doesn't interfere with visible cards
        });

        // Reposition all other cards with staggering
        gsap.to(Array.from(slider.querySelectorAll(".card")).slice(1), {
          y: (i) => -10 + 10 * (i + 1) + "%",
          z: (i) => 15 * (i + 1),
          opacity: 1,
          duration: 0.6,
          ease: ease,
          stagger: -0.05,
        });

        // Short delay before sliding the card back up
        setTimeout(() => {
          // Second animation: Slide the card up from below
          gsap.to(lastCard, {
            y: -10 + "%", // Match the first card's position
            z: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            onComplete: () => {
              // Allow another animation after completion
              setTimeout(() => {
                isAnimating = false;
              }, 200);
            },
          });
        }, 400); // Slightly longer delay before sliding up
      },
    });
  }

  // Initialize slider on page load
  setupSlider();

  // ------------------------------
  // Existing Functionalities
  // ------------------------------

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

  function applyMode(mode) {
    if (mode === "dark") {
      document.documentElement.classList.add("dark-mode");
      document.body.classList.add("dark-mode");
      leftHalf.style.backgroundColor = "var(--color-eight)"; // Dark side
      rightHalf.style.backgroundColor = "transparent"; // Light side
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.body.classList.remove("dark-mode");
      leftHalf.style.backgroundColor = "transparent"; // Light side
      rightHalf.style.backgroundColor = "var(--color-eight)"; // Dark side
    }
  }

  // Function to get URL query parameters
  function getQueryParams() {
    const params = {};
    window.location.search
      .substring(1)
      .split("&")
      .forEach(function (param) {
        const [key, value] = param.split("=");
        params[key] = value;
      });
    return params;
  }

  // Initialize mode from URL parameter, localStorage, or default to system preference
  const params = getQueryParams();
  const urlMode = params["mode"];

  const storedMode = localStorage.getItem("mode");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const currentMode =
    urlMode || storedMode || (systemPrefersDark ? "dark" : "light");
  applyMode(currentMode);

  // If mode is specified in URL, update localStorage
  if (urlMode) {
    localStorage.setItem("mode", urlMode);
  }

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

  const burgerButton = document.querySelector(".burger");
  const squareOne = document.querySelector(".square-one");
  const squareTwo = document.querySelector(".square-two");
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
      });
      menuTitleTwos.forEach((element) => {
        element.textContent = element.textContent;
      });
      menuTitleOne.forEach((element) => {
        element.textContent = element.textContent;
      });

      // **Enable pointer events when menu is open**
      menuOverlay.style.pointerEvents = "auto";
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
      gsap.to(menuOverlay, {
        duration: 0.3,
        backdropFilter: "blur(0px)",
        delay: 0.6,
      });
      gsap.to(menuLines, {
        duration: 0.6,
        delay: 0.1,
        x: "130%",
        stagger: 0.2,
        ease: "power4.out",
      });

      // **Disable pointer events when menu is closed**
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

  // **Simplified Scramble Text on Hover Implementation**

  // Select the target <b> element containing "MATHIEU"
  const mathieuElement = document.querySelector(".center-text b");

  // Original text
  const originalText = mathieuElement.textContent;

  // Function to scramble to random text
  function scrambleText() {
    gsap.to(mathieuElement, {
      duration: 1.2,
      text: {
        value: generateRandomText(originalText.length),
        scramble: 20, // Adjust the scramble amount as needed
        chars: "$#?&!%≠¿§¥ß¡€£389206XYKZENHAJ",
      },
      ease: "none",
      onComplete: unscrambleText, // After scrambling, unscramble
    });
  }

  // Function to unscramble back to original text
  function unscrambleText() {
    gsap.to(mathieuElement, {
      duration: 1.2,
      text: {
        value: originalText,
        scramble: 20,
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

  // ------------------------------
  // Integrated Noise Background
  // ------------------------------

  const noise = () => {
    let canvas, ctx;

    let wWidth, wHeight;

    let noiseData = [];
    let frame = 0;

    let loopTimeout;

    // Create Noise
    const createNoise = () => {
      const idata = ctx.createImageData(wWidth, wHeight);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
          buffer32[i] = 0xff000000;
        } else {
          buffer32[i] = 0xffffffff; // Optional: Set to white for contrast
        }
      }

      noiseData.push(idata);
    };

    // Play Noise
    const paintNoise = () => {
      if (frame === 9) {
        frame = 0;
      } else {
        frame++;
      }

      ctx.putImageData(noiseData[frame], 0, 0);
    };

    // Loop
    const loop = () => {
      paintNoise(frame);

      loopTimeout = window.setTimeout(() => {
        window.requestAnimationFrame(loop);
      }, 1000 / 25);
    };

    // Setup
    const setup = () => {
      wWidth = window.innerWidth;
      wHeight = window.innerHeight;

      canvas.width = wWidth;
      canvas.height = wHeight;

      noiseData = []; // Clear previous noise data

      for (let i = 0; i < 10; i++) {
        createNoise();
      }

      loop();
    };

    // Reset
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

    // Init
    const init = () => {
      canvas = document.getElementById("noise");
      if (!canvas) {
        console.error(
          'Canvas with id "noise" not found. Please add a <canvas id="noise"></canvas> to your HTML.'
        );
        return;
      }
      ctx = canvas.getContext("2d");

      setup();
      reset();
    };

    // Start the noise effect
    init();
  };

  // Initialize the noise background
  noise();

  // Document query selector to update text
  document.querySelectorAll("h4 u").forEach(function (element) {
    if (element.textContent.trim() === "Specifications") {
      element.textContent = "Examples";
    }
  });
});
