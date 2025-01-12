document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------
  // 0) LOADING ANIMATION
  // --------------------------------------------------
  gsap.to(".bar", 1.3, {
    delay: 0,
    height: 0,
    stagger: {
      amount: 0.5,
    },
    ease: "power4.inOut",
    onComplete: function () {
      const overlayElem = document.querySelector(".overlay");
      if (overlayElem) {
        overlayElem.style.display = "none";
      }
    },
  });

  // --------------------------------------------------
  // 1) DARK MODE FUNCTIONALITY
  // --------------------------------------------------
  const darkModeButton = document.getElementById("darkModeButton");
  if (darkModeButton) {
    const leftHalf = darkModeButton.querySelector(".half.left");
    const rightHalf = darkModeButton.querySelector(".half.right");

    function applyMode(mode) {
      if (mode === "dark") {
        document.documentElement.classList.add("dark-mode");
        document.body.classList.add("dark-mode");
        if (leftHalf) leftHalf.style.backgroundColor = "#888";
        if (rightHalf) rightHalf.style.backgroundColor = "transparent";
      } else {
        document.documentElement.classList.remove("dark-mode");
        document.body.classList.remove("dark-mode");
        if (leftHalf) leftHalf.style.backgroundColor = "transparent";
        if (rightHalf) rightHalf.style.backgroundColor = "#888";
      }
    }

    const currentMode = localStorage.getItem("mode") || "dark";
    applyMode(currentMode);

    darkModeButton.addEventListener("click", () => {
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
  }

  // --------------------------------------------------
  // 2) BURGER & MENU OVERLAY / SLIDE IN-OUT
  // --------------------------------------------------
  const burgerButton = document.querySelector(".burger");
  const menuBars = document.querySelectorAll(".menu-bar");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuLines = document.querySelectorAll(".menu-line");

  let menuOpen = false;

  if (burgerButton) {
    burgerButton.addEventListener("click", () => {
      menuOpen = !menuOpen;

      // Toggle burger rotation
      burgerButton.classList.toggle("rotate");

      // Get the .fixed-box element
      const fixedBox = document.querySelector(".fixed-box");

      // When we open the menu
      if (menuOpen) {
        menuOverlay.style.pointerEvents = "auto";
        // Apply the background change by adding the helper class
        fixedBox.classList.add("menu-open");

        gsap.to(menuBars, {
          duration: 0.6,
          x: "0%",
          ease: "power4.out",
        });
        gsap.to(menuOverlay, {
          duration: 0.2,
          backgroundColor: "rgba(0, 0, 0, 0.85)",
        });
        gsap.to(menuOverlay, {
          duration: 0.5,
          backdropFilter: "blur(3px)",
        });
        gsap.to(menuLines, {
          duration: 0.6,
          delay: 0.1,
          x: "0%",
          stagger: 0.2,
          ease: "power4.out",
        });
      }
      // When we close the menu
      else {
        // Remove the background change
        fixedBox.classList.remove("menu-open");

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
          onComplete: () => {
            menuOverlay.style.pointerEvents = "none";
          },
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
  }

  // --------------------------------------------------
  // 3) SLIDER FUNCTIONALITY (Title Only)
  // --------------------------------------------------
  const totalSlides = 3;
  let currentSlide = 1;
  let isAnimating = false;
  let scrollAllowed = true;
  let lastScrollTime = 0;

  // Only slide titles remain
  const slideTitles = ["[Coding]", "[Articles]", "[About]"];

  // Create a new slide's background
  function createSlide(slideNumber, direction) {
    const slide = document.createElement("div");
    slide.className = "slide";

    const slideBgImg = document.createElement("div");
    slideBgImg.className = "slide-bg-img";

    const img = document.createElement("img");
    img.src = `./assets/img${slideNumber}.jpg`;
    img.alt = "";

    slideBgImg.appendChild(img);
    slide.appendChild(slideBgImg);

    if (direction === "down") {
      slideBgImg.style.clipPath =
        "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
    } else {
      slideBgImg.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
    }

    return slide;
  }

  // Create the new main image wrapper
  function createMainImageWrapper(slideNumber, direction) {
    const wrapper = document.createElement("div");
    wrapper.className = "slide-main-img-wrapper";

    const img = document.createElement("img");
    img.src = `./assets/img${slideNumber}.jpg`;
    img.alt = "";

    wrapper.appendChild(img);

    if (direction === "down") {
      wrapper.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
    } else {
      wrapper.style.clipPath =
        "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
    }

    return wrapper;
  }

  // Create new title elements
  function createTextElements(slideNumber, direction) {
    const newTitle = document.createElement("h1");
    newTitle.textContent = slideTitles[slideNumber - 1];
    gsap.set(newTitle, {
      y: direction === "down" ? 50 : -50,
    });

    const newCounter = document.createElement("p");
    newCounter.textContent = slideNumber;
    gsap.set(newCounter, {
      y: direction === "down" ? 18 : -18,
    });

    return { newTitle, newCounter };
  }

  function animateSlide(direction) {
    if (isAnimating || !scrollAllowed) return;

    isAnimating = true;
    scrollAllowed = false;

    const slider = document.querySelector(".slider");
    const currentSlideElement = slider.querySelector(".slide");
    const mainImageContainer = document.querySelector(".slide-main-img");
    const currentMainWrapper = mainImageContainer.querySelector(
      ".slide-main-img-wrapper"
    );

    const titleContainer = document.querySelector(".slide-title");
    const counterContainer = document.querySelector(".count");

    const currentTitle = titleContainer.querySelector("h1");
    const currentCounter = counterContainer.querySelector("p");

    // Calculate new slide index
    if (direction === "down") {
      currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
    } else {
      currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
    }

    // Create new elements
    const newSlide = createSlide(currentSlide, direction);
    const newMainWrapper = createMainImageWrapper(currentSlide, direction);
    const { newTitle, newCounter } = createTextElements(
      currentSlide,
      direction
    );

    slider.appendChild(newSlide);
    mainImageContainer.appendChild(newMainWrapper);
    titleContainer.appendChild(newTitle);
    counterContainer.appendChild(newCounter);

    // Start the new slide off invisible (for crossfade)
    gsap.set(newSlide, { autoAlpha: 0 });
    gsap.set(newMainWrapper.querySelector("img"), {
      y: direction === "down" ? "-50%" : "50%",
    });

    // GSAP Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Remove old elements
        [
          currentSlideElement,
          currentMainWrapper,
          currentTitle,
          currentCounter,
        ].forEach((el) => el?.remove());

        isAnimating = false;
        setTimeout(() => {
          scrollAllowed = true;
          lastScrollTime = Date.now();
        }, 25);
      },
    });

    tl.to(
      newSlide.querySelector(".slide-bg-img"),
      {
        clipPath:
          direction === "down"
            ? "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
            : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.5, // Increased duration for smoother transition
        ease: "power2.out", // Adjusted easing for smoother effect
      },
      0
    )
      .to(
        currentSlideElement.querySelector("img"),
        {
          scale: 1.5,
          duration: 1.5, // Increased duration
          ease: "power2.inOut", // Smoother easing
        },
        0
      )
      .to(
        newMainWrapper,
        {
          clipPath:
            direction === "down"
              ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
              : "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 1.5, // Increased duration
          ease: "power2.inOut",
        },
        0
      )
      .to(
        currentMainWrapper.querySelector("img"),
        {
          y: direction === "down" ? "50%" : "-50%",
          duration: 1.5, // Increased duration
          ease: "power2.inOut",
        },
        0
      )
      .to(
        newMainWrapper.querySelector("img"),
        {
          y: "0%",
          duration: 1.5, // Increased duration
          ease: "power2.inOut",
        },
        0
      )
      .to(
        currentTitle,
        {
          y: direction === "down" ? -50 : 50,
          duration: 1.5, // Increased duration
          ease: "power2.inOut",
        },
        0
      )
      .to(
        newTitle,
        {
          y: 0,
          duration: 1.5, // Increased duration
          ease: "power2.inOut",
        },
        0
      )
      .to(
        currentCounter,
        {
          y: direction === "down" ? -18 : 18,
          duration: 1.5, // Increased duration
          ease: "power2.inOut",
        },
        0
      )
      .to(
        newCounter,
        {
          y: 0,
          duration: 1.5, // Increased duration
          ease: "power2.inOut",
        },
        0
      )

      // Enhanced Crossfade for smoother image transition
      .to(
        newSlide,
        {
          autoAlpha: 1,
          duration: 0.5, // Slower fade-in
          ease: "power2.inOut",
        },
        "-=1.0" // Overlap with previous animations for smoothness
      )
      .to(
        currentSlideElement,
        {
          autoAlpha: 0,
          duration: 0.5, // Slower fade-out
          ease: "power2.inOut",
        },
        "-=1.0" // Synchronize with fade-in
      );
  }

  function handleScroll(direction) {
    const now = Date.now();
    if (isAnimating || !scrollAllowed) return;
    if (now - lastScrollTime < 300) return;
    lastScrollTime = now;
    animateSlide(direction);
  }

  // Mouse Wheel Event
  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? "down" : "up";
      handleScroll(direction);
    },
    { passive: false }
  );

  // Touch Events
  let touchStartY = 0;
  let isTouchActive = false;

  window.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
      isTouchActive = true;
    },
    { passive: false }
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      if (!isTouchActive || isAnimating || !scrollAllowed) return;
      const touchCurrentY = e.touches[0].clientY;
      const difference = touchStartY - touchCurrentY;
      if (Math.abs(difference) > 10) {
        isTouchActive = false;
        const direction = difference > 0 ? "down" : "up";
        handleScroll(direction);
      }
    },
    { passive: false }
  );

  window.addEventListener("touchend", () => {
    isTouchActive = false;
  });

  // --------------------------------------------------
  // INTEGRATED NOISE BACKGROUND
  // --------------------------------------------------
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
        // Randomly choose black or white pixel
        if (Math.random() < 0.5) {
          buffer32[i] = 0xff000000; // black pixel
        } else {
          buffer32[i] = 0xffffffff; // white pixel
        }
      }
      noiseData.push(idata);
    };

    // Paint Noise
    const paintNoise = () => {
      if (frame === 9) {
        frame = 0;
      } else {
        frame++;
      }
      ctx.putImageData(noiseData[frame], 0, 0);
    };

    // Animate Noise
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

      noiseData = []; // clear previous noise data
      for (let i = 0; i < 10; i++) {
        createNoise();
      }
      loop();
    };

    // Resize Handling
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
          'Canvas with id "noise" not found. Please add it to your HTML.'
        );
        return;
      }
      ctx = canvas.getContext("2d");
      setup();
      reset();
    };

    init();
  };

  // Call the noise function to launch the noise effect
  noise();
});
