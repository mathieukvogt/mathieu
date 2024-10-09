document.addEventListener("DOMContentLoaded", function () {
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
  gsap.registerPlugin(TextPlugin);

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

  // **End of Scramble Text Implementation**

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

  // ------------------------------
  // End of Integrated Noise Background
  // ------------------------------

  // ------------------------------
  // New Functionality: Update Left Title and Number on Scroll with Scramble Text Animation
  // ------------------------------

  // Select the elements to update
  const leftJavascriptDiv = document.querySelector(".left-javascript");
  const leftNumberDiv = document.querySelector(".left-number");

  // Select all table headings with the class 'tableletters'
  const tableHeadings = document.querySelectorAll(".tableletters");

  // Variables to keep track of the current heading
  let lastHeadingId = null;

  // Function to update the left title and number with scramble text effect
  const updateLeftTitle = () => {
    let currentHeading = null;

    // Loop through each heading to find the one currently in view
    tableHeadings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 76) {
        currentHeading = heading;
      }
    });

    // Update the content if a new heading is found
    if (currentHeading && currentHeading.id !== lastHeadingId) {
      lastHeadingId = currentHeading.id;

      // Update the left-javascript div with scramble text effect
      gsap.to(leftJavascriptDiv, {
        duration: 0.8,
        text: {
          value: currentHeading.textContent.toUpperCase(),
          scramble: 5, // Adjust the scramble amount as needed
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        },
        ease: "none",
      });

      // Update the left-number div with scramble text effect
      const headingNumber = currentHeading.getAttribute("data-number");
      gsap.to(leftNumberDiv, {
        duration: 0.8,
        text: {
          value: "[" + headingNumber + "]",
          scramble: 5, // Adjust the scramble amount as needed
          chars: "0123456789",
        },
        ease: "none",
      });
    }
  };

  // Add an event listener for the scroll event
  window.addEventListener("scroll", updateLeftTitle);

  // Initial call to set the correct title and number on page load
  updateLeftTitle();

  // ------------------------------
  // End of New Functionality
  // ------------------------------

  // ------------------------------
  // ASCII Cube Animation
  // ------------------------------

  // Get the canvas and context
  function getBackgroundColorOne() {
    const styles = getComputedStyle(document.body);
    return styles.getPropertyValue("--background-color-one").trim();
  }

  const cubeCanvas = document.getElementById("cubeCanvas");
  if (cubeCanvas) {
    const cubeCtx = cubeCanvas.getContext("2d");

    // Resize the canvas to match the size of the container and adjust for device pixel ratio
    function resizeCubeCanvas() {
      const pixelRatio = window.devicePixelRatio || 1;
      cubeCanvas.width = cubeCanvas.clientWidth * pixelRatio;
      cubeCanvas.height = cubeCanvas.clientHeight * pixelRatio;
      cubeCtx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0); // Reset the transform
    }

    window.addEventListener("resize", resizeCubeCanvas);
    resizeCubeCanvas(); // Initial resize

    // Variables for the cube animation
    const density = " -=+xyzd#";

    const l = 0.6;
    const box = {
      vertices: [
        vec3(l, l, l),
        vec3(-l, l, l),
        vec3(-l, -l, l),
        vec3(l, -l, l),
        vec3(l, l, -l),
        vec3(-l, l, -l),
        vec3(-l, -l, -l),
        vec3(l, -l, -l),
      ],
      edges: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ],
    };

    const boxProj = [];

    function animate(time) {
      // Fetch the current color at the start of each frame
      const color = getBackgroundColorOne();

      const t = time * 0.006;
      const width = cubeCanvas.clientWidth; // Use clientWidth for consistent scaling
      const height = cubeCanvas.clientHeight;
      const m = Math.min(width, height);
      const aspect = width / height;

      const rot = {
        x: t * 0.11,
        y: t * 0.13,
        z: -t * 0.15,
      };

      // Adjust d to zoom out the cube slightly
      const d = 3.0; // Adjusted from 2 to 1.8
      const zOffs = map(Math.sin(t * 0.12), -1, 1, -2.5, -6);

      for (let i = 0; i < box.vertices.length; i++) {
        const v = v3_copy(box.vertices[i]);
        let vt = v3_rotX(v, rot.x);
        vt = v3_rotY(vt, rot.y);
        vt = v3_rotZ(vt, rot.z);
        boxProj[i] = v2_mulN({ x: vt.x, y: vt.y }, d / (vt.z - zOffs));
      }

      // Clear the canvas
      cubeCtx.clearRect(0, 0, cubeCanvas.width, cubeCanvas.height);

      // Set font for ASCII characters
      cubeCtx.font = "12px monospace"; // Increased font size for sharpness
      cubeCtx.textAlign = "left";
      cubeCtx.textBaseline = "top";

      const charWidth = 8; // Adjusted character width
      const charHeight = 14; // Adjusted character height

      const cols = Math.floor(width / charWidth);
      const rows = Math.floor(height / charHeight);

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const coord = { x: x, y: y };
          const st = {
            x: ((2.0 * (coord.x - cols / 2 + 0.5)) / m) * aspect,
            y: (2.0 * (coord.y - rows / 2 + 0.5)) / m,
          };

          let d = 1e10;
          const n = box.edges.length;
          const thickness = 0.01;
          const expMul = -50;
          for (let i = 0; i < n; i++) {
            const a = boxProj[box.edges[i][0]];
            const b = boxProj[box.edges[i][1]];
            d = Math.min(d, sdSegment(st, a, b, thickness));
          }

          const idx = Math.floor(
            Math.exp(expMul * Math.abs(d)) * density.length
          );

          if (idx === 0) {
            // Do not draw anything for background
            continue;
          } else {
            const char = density[idx];
            cubeCtx.fillStyle = color;
            cubeCtx.fillText(char, x * charWidth, y * charHeight);
          }
        }
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    // Utility functions
    function vec3(x, y, z) {
      return { x: x, y: y, z: z };
    }

    function v3_copy(v) {
      return { x: v.x, y: v.y, z: v.z };
    }

    function v3_rotX(v, angle) {
      const sinAngle = Math.sin(angle);
      const cosAngle = Math.cos(angle);
      return {
        x: v.x,
        y: v.y * cosAngle - v.z * sinAngle,
        z: v.y * sinAngle + v.z * cosAngle,
      };
    }

    function v3_rotY(v, angle) {
      const sinAngle = Math.sin(angle);
      const cosAngle = Math.cos(angle);
      return {
        x: v.x * cosAngle + v.z * sinAngle,
        y: v.y,
        z: -v.x * sinAngle + v.z * cosAngle,
      };
    }

    function v3_rotZ(v, angle) {
      const sinAngle = Math.sin(angle);
      const cosAngle = Math.cos(angle);
      return {
        x: v.x * cosAngle - v.y * sinAngle,
        y: v.x * sinAngle + v.y * cosAngle,
        z: v.z,
      };
    }

    function v2_mulN(v, n) {
      return { x: v.x * n, y: v.y * n };
    }

    function map(value, inMin, inMax, outMin, outMax) {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    function sdSegment(p, a, b, thickness) {
      const pa = { x: p.x - a.x, y: p.y - a.y };
      const ba = { x: b.x - a.x, y: b.y - a.y };
      const h = Math.max(0, Math.min(1, dot(pa, ba) / dot(ba, ba)));
      const d = {
        x: pa.x - ba.x * h,
        y: pa.y - ba.y * h,
      };
      return length(d) - thickness;
    }

    function dot(a, b) {
      return a.x * b.x + a.y * b.y;
    }

    function length(v) {
      return Math.sqrt(v.x * v.x + v.y * v.y);
    }
  } else {
    console.error(
      'Canvas with id "cubeCanvas" not found. Please add a <canvas id="cubeCanvas"></canvas> inside your .left-image div.'
    );
  }

  // ------------------------------
  // End of ASCII Cube Animation
  // ------------------------------

  // ------------------------------
  // Mouse Circle Follow Effect
  // ------------------------------

  let prevX = null;
  let prevY = null;

  document.addEventListener("mousemove", function (e) {
    const square = document.getElementById("mouse-square");
    if (square) {
      // Update the position of the square
      square.style.left = e.pageX + "px";
      square.style.top = e.pageY + "px";

      // Calculate angle of movement for rotation
      if (prevX !== null && prevY !== null) {
        const deltaX = e.pageX - prevX;
        const deltaY = e.pageY - prevY;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        square.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      }

      // Update previous mouse positions
      prevX = e.pageX;
      prevY = e.pageY;
    }
  });

  // ------------------------------
  // End of Mouse Circle Follow Effect
  // ------------------------------

  // ------------------------------
  // Marquee Effect for the .update Element
  // ------------------------------

  // Select the .update element
  const marqueeContainer = document.querySelector(".marquee-container");
  const marquee = document.querySelector(".marquee");

  if (marquee) {
    // Add event listeners for mouse and touch interactions
    marquee.addEventListener("mousedown", () => {
      marquee.style.animationPlayState = "paused";
      marquee.style.filter = "none";
    });

    marquee.addEventListener("mouseup", () => {
      marquee.style.animationPlayState = "running";
      marquee.style.filter = "blur(2px)";
    });

    // For touch devices
    marquee.addEventListener("touchstart", () => {
      marquee.style.animationPlayState = "paused";
      marquee.style.filter = "none";
    });

    marquee.addEventListener("touchend", () => {
      marquee.style.animationPlayState = "running";
      marquee.style.filter = "blur(2px)";
    });
  }

  // ------------------------------
  // End of Marquee Effect
  // ------------------------------
  document.querySelectorAll("h4 u").forEach(function (element) {
    if (element.textContent.trim() === "Specifications") {
      element.textContent = "Examples";
    }
  });
});
