document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------
  // Register GSAP Plugins
  // --------------------------------------------------
  gsap.registerPlugin(TextPlugin);

  // --------------------------------------------------
  // LOADING ANIMATION: DISAPPEARING SQUARES
  // --------------------------------------------------
  function createSquaresAnimation() {
    // Get the container element
    const container = document.querySelector(".squares-container");
    if (!container) return;

    // Clear any existing squares
    container.innerHTML = "";

    // Set grid dimensions based on screen size
    let numRows, numCols;

    if (window.innerWidth > 900) {
      // Desktop layout
      numRows = 15;
      numCols = 30;
    } else {
      // Mobile layout
      numRows = 20;
      numCols = 10;
    }

    const totalSquares = numRows * numCols;

    // Create all squares
    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement("div");
      square.className = "square";
      container.appendChild(square);
    }

    // Get all squares as an array
    const squares = Array.from(container.querySelectorAll(".square"));

    // Make sure overlay is visible
    const overlay = document.querySelector(".overlay");
    if (overlay) {
      overlay.style.display = "block";
    }

    // Double-shuffle for better randomness while keeping same structure
    const shuffledSquares = [...squares]
      .sort(() => Math.random() - 0.5)
      .sort(() => Math.random() - 0.5);

    // Add a delay before starting the animation
    setTimeout(() => {
      // Create GSAP timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Remove overlay when animation is complete
          if (overlay) {
            overlay.style.display = "none";

            // When loading animation completes, run the text scramble animation
            animateSliderTexts();
          }
        },
      });

      // Add animation for each square
      shuffledSquares.forEach((square, index) => {
        tl.to(
          square,
          {
            opacity: 0,
            duration: 0.001,
            ease: "none",
          },
          index * 0.005
        ); // Stagger effect
      });

      // Set total duration to exactly 2 seconds
      tl.duration(2);
    }, 800); // 800ms initial delay before animation starts
  }

  // --------------------------------------------------
  // SLIDER TEXT ANIMATIONS
  // --------------------------------------------------
  function animateSliderTexts() {
    // Get all the small text elements in the slider
    const smallTextElements = [
      ...document.querySelectorAll(
        ".metatitleone p, .metatitletwo p, .metathree, .metaone, .metatwo"
      ),
    ];

    if (smallTextElements.length === 0) return;

    // Store original text content
    const originalTexts = smallTextElements.map((el) => el.textContent);

    // Create a timeline for text animations
    const textTl = gsap.timeline();

    // First make all text elements visible (they're initially hidden via CSS)
    smallTextElements.forEach((el) => {
      el.style.visibility = "visible";
      el.textContent = "";
    });

    // Then animate each text element with scramble effect
    smallTextElements.forEach((element, index) => {
      textTl.to(element, {
        duration: 0.8,
        delay: index * 0.1, // Stagger the animations
        text: {
          value: originalTexts[index],
          scramble: 5,
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        },
        ease: "none",
      });
    });
  }

  // Run the animation immediately
  createSquaresAnimation();

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

    // Set default mode to dark
    const currentMode = "dark"; // Changed to default to dark mode
    applyMode(currentMode);
    localStorage.setItem("mode", currentMode); // Store the default mode

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
  const menuTitleOnes = document.querySelectorAll(".menu-title.one");
  const menuTitleTwos = document.querySelectorAll(".menu-title.two");

  let menuOpen = false;

  if (burgerButton) {
    burgerButton.addEventListener("click", () => {
      menuOpen = !menuOpen;

      // Toggle burger rotation
      burgerButton.classList.toggle("rotate");

      // Get the .fixed-box element
      const fixedBox = document.querySelector(".fixed-box");

      // Determine if the screen is large
      const isLargeScreen = window.innerWidth >= 900;

      // Define x values (consistent across screen sizes now)
      const menuLineOpenX = "0%";
      const menuLineCloseX = "100%";

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
          backgroundColor: "var(--color-fourty)",
        });
        gsap.to(menuOverlay, {
          duration: 0.5,
          backdropFilter: "blur(3px)",
        });
        gsap.to(menuLines, {
          duration: 0.6,
          delay: 0.1,
          x: menuLineOpenX,
          stagger: 0.2,
          ease: "power4.out",
        });

        // Add scramble text animation to menu titles
        menuTitleTwos.forEach((element, index) => {
          gsap.fromTo(
            element,
            { text: { value: "" } },
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

        menuTitleOnes.forEach((element, index) => {
          gsap.fromTo(
            element,
            { text: { value: "" } },
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
          x: menuLineCloseX,
          stagger: 0.2,
          ease: "power4.out",
        });

        // Optionally, reset the text to original state when closing the menu
        menuTitleOnes.forEach((element) => {
          element.textContent = element.textContent;
        });
        menuTitleTwos.forEach((element) => {
          element.textContent = element.textContent;
        });
      }
    });
  }

  // --------------------------------------------------
  // 3) SLIDER FUNCTIONALITY (Updated)
  // --------------------------------------------------
  const totalSlides = 3;
  let currentSlide = 1;
  let isAnimating = false;
  let scrollAllowed = true;
  let lastScrollTime = 0;

  // Only slide titles remain
  const slideTitles = ["[CODING]", "[ARTICLES]", "[ABOUT]"];
  const slideLinks = ["encyclopedia.html", "articles.html", "about.html"];

  // Function to update and animate the slideSymbol button
  function updateSlideSymbolButton(direction) {
    const slideSymbolButton = document.getElementById("slideSymbol");
    if (slideSymbolButton) {
      const oldTextSpan = slideSymbolButton.querySelector("span");

      // Remove square brackets from slide title to get button text
      const newText = slideTitles[currentSlide - 1].replace(/\[|\]/g, "");
      const newTextSpan = document.createElement("span");
      newTextSpan.textContent = newText;

      // Set initial position of the new text span
      gsap.set(newTextSpan, { y: direction === "down" ? 20 : -20, opacity: 0 });

      slideSymbolButton.appendChild(newTextSpan);

      // Animate old text out and new text in
      const tl = gsap.timeline({
        onComplete: () => {
          // Remove old text span after animation completes
          if (oldTextSpan) {
            oldTextSpan.remove();
          }
        },
      });

      tl.to(
        oldTextSpan,
        {
          y: direction === "down" ? "-100%" : "100%",
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      ).fromTo(
        newTextSpan,
        { y: direction === "down" ? "100%" : "-100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      );

      // Update the button's click handler to navigate to the corresponding page with transition
      const linkTarget = slideLinks[currentSlide - 1];
      slideSymbolButton.onclick = function (event) {
        event.preventDefault(); // Prevent the default navigation

        // Activate the black overlay for slide-up transition
        const blackOverlay = document.getElementById("blackOverlay");
        if (blackOverlay) {
          blackOverlay.classList.add("active");

          // Listen for the end of the transition
          blackOverlay.addEventListener(
            "transitionend",
            () => {
              window.location.href = linkTarget;
            },
            { once: true } // Ensure the event fires only once
          );
        } else {
          // Fallback to default navigation if overlay not found
          window.location.href = linkTarget;
        }
      };
    }
  }

  // Initial call to set the button text on page load
  updateSlideSymbolButton("down");

  // Create a new slide's background
  function createSlide(slideNumber, direction) {
    const slide = document.createElement("div");
    slide.className = "slide";

    const slideBgImg = document.createElement("div");
    slideBgImg.className = "slide-bg-img";

    const img = document.createElement("img");
    img.src = `./assets/vid${slideNumber}.gif`;
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

  // **Updated Function:** Create the new main image wrapper with video
  function createMainImageWrapper(slideNumber, direction) {
    const wrapper = document.createElement("div");
    wrapper.className = "slide-main-img-wrapper";

    // Create img element instead of video
    const img = document.createElement("img");
    img.src = `./assets/vid${slideNumber}.gif`;
    img.alt = `Slide Image ${slideNumber}`;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.display = "block";

    // Create overlay div
    const overlay = document.createElement("div");
    overlay.className = "red-overlay";

    wrapper.appendChild(img);
    wrapper.appendChild(overlay);

    // Set initial clip-path for animation
    if (direction === "down") {
      wrapper.style.clipPath =
        "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
    } else {
      wrapper.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
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
        // Pause the previous video to save resources
        const previousVideo = currentMainWrapper.querySelector("video");
        if (previousVideo) {
          previousVideo.pause();
        }

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
          duration: 1.5,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        newMainWrapper.querySelector("img"),
        {
          y: "0%",
          duration: 1.5,
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

    // Update the slideSymbol button after slide change
    updateSlideSymbolButton(direction);
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

  // --------------------------------------------------
  // 5) DISPLAY ZURICH TIME IN THE .metathree DIV
  // --------------------------------------------------

  // Function to update Zurich time
  function updateZurichTime() {
    const zurichTimeElem = document.querySelector(".metathree");
    if (zurichTimeElem) {
      const zurichTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Zurich",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date());
      zurichTimeElem.textContent = zurichTime;
    }
  }

  // Initial call to display the time immediately
  updateZurichTime();

  // Update the time every second
  setInterval(updateZurichTime, 1000);
});
