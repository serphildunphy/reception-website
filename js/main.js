/**
 * ==========================================================================
 * WEDDING RECEPTION INVITATION - CLIENT-SIDE LOGIC
 * ==========================================================================
 * Features:
 *  - Countdown Timer with configurable event date
 *  - Ambient golden particle canvas
 *  - Ambient harmony audio player (Web Audio API synthesized harp chime)
 *  - Mobile drawer navigation & scroll-spy
 *  - Google Calendar event link
 *  - Interactive venue location copy with toast feedback
 * ==========================================================================
 */

// ==========================================================================
// EVENT DETAILS
// ==========================================================================
const VENUE_DIRECTIONS_URL = "https://www.google.com/maps/place/Bird+Valley+Hinjawadi/@18.5891426,73.7271667,15z/data=!4m6!3m5!1s0x3bc2bb788b4eec03:0xcbf6532841f5a6a9!8m2!3d18.5772427!4d73.7366577!16s%2Fg%2F11tmwtj4k0?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D";
const EVENT_CONFIG = {
  eventTitle: "Gargi & Aditya — Wedding Reception",
  eventDate: new Date("2026-12-13T17:00:00+05:30"),
  endDate: new Date("2026-12-13T22:30:00+05:30"),
  venueName: "Bird Valley, Hinjawadi, Pune, Maharashtra, India",
  description: "Gargi and Aditya would love to celebrate this special chapter with you. Reception begins at 5:00 PM IST on Sunday, 13 December 2026. Bird Valley, Hinjawadi, Pune. Directions: " + VENUE_DIRECTIONS_URL
};

// ==========================================================================
// 1. COUNTDOWN TIMER
// ==========================================================================
function initCountdown() {
  const cdDays = document.getElementById("cd-days");
  const cdHours = document.getElementById("cd-hours");
  const cdMins = document.getElementById("cd-mins");
  const cdSecs = document.getElementById("cd-secs");
  const countdownEl = document.getElementById("countdown");

  if (!cdDays || !countdownEl) return;

  const targetDateStr = countdownEl.getAttribute("data-event-date");
  const targetDate = targetDateStr ? new Date(targetDateStr).getTime() : EVENT_CONFIG.eventDate.getTime();

  function update() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      cdDays.textContent = "00";
      cdHours.textContent = "00";
      cdMins.textContent = "00";
      cdSecs.textContent = "00";
      countdownEl.classList.add("is-complete");
      countdownEl.setAttribute("role", "status");
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((difference % (1000 * 60)) / 1000);

    cdDays.textContent = String(days).padStart(2, "0");
    cdHours.textContent = String(hours).padStart(2, "0");
    cdMins.textContent = String(mins).padStart(2, "0");
    cdSecs.textContent = String(secs).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

// ==========================================================================
// 2. AMBIENT GOLD DUST CANVAS
// ==========================================================================
function initAmbientCanvas() {
  const canvas = document.getElementById("ambient-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(width < 768 ? 28 : 55, 60);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.4,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      fadeRate: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1)
    });
  }

  let animationId;
  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.y += p.speedY;
      p.x += p.speedX;
      p.alpha += p.fadeRate;

      if (p.alpha <= 0.1 || p.alpha >= 0.8) {
        p.fadeRate = -p.fadeRate;
      }

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(223, 186, 98, ${Math.max(0, p.alpha)})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(212, 175, 55, 0.45)";
      ctx.fill();
    }

    if (!document.hidden) {
      animationId = requestAnimationFrame(render);
    }
  }

  render();

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      render();
    } else {
      cancelAnimationFrame(animationId);
    }
  });
}

// ==========================================================================
// 4. NAVBAR & MOBILE DRAWER
// ==========================================================================
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sticky background on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
      navToggle.classList.toggle("active", isOpen);
    });

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("active");
      });
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("active");
      }
    });
  }
}

// ==========================================================================
// 5. GOOGLE CALENDAR EVENT LINK
// ==========================================================================
function initCalendar() {
  const btnGoogle = document.getElementById("btn-google-cal");
  if (!btnGoogle) return;

  const toGoogleDate = (date) => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23"
    }).formatToParts(date).reduce((result, part) => {
      if (part.type !== "literal") result[part.type] = part.value;
      return result;
    }, {});
    return `${parts.year}${parts.month}${parts.day}T${parts.hour}${parts.minute}${parts.second}`;
  };
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_CONFIG.eventTitle,
    dates: `${toGoogleDate(EVENT_CONFIG.eventDate)}/${toGoogleDate(EVENT_CONFIG.endDate)}`,
    ctz: "Asia/Kolkata",
    details: EVENT_CONFIG.description,
    location: EVENT_CONFIG.venueName
  });
  btnGoogle.href = `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// ==========================================================================
// 6. VENUE ADDRESS COPY TO CLIPBOARD
// ==========================================================================
function initAddressCopy() {
  const copyBtn = document.getElementById("btn-copy-address");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => {
    const address = copyBtn.getAttribute("data-address") || EVENT_CONFIG.venueName;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          showToast("Venue location copied to clipboard!");
        })
        .catch(() => {
          fallbackCopyText(address);
        });
    } else {
      fallbackCopyText(address);
    }
  });

  function fallbackCopyText(text) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand("copy");
      showToast("Venue location copied to clipboard!");
    } catch (e) {
      showToast("Unable to copy automatically.");
    }
    document.body.removeChild(tempInput);
  }
}

// ==========================================================================
// 7. TOAST NOTIFICATION UTILITY
// ==========================================================================
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast-message");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("hidden");

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 3400);
}

// ==========================================================================
// 9. SCROLL REVEAL OBSERVER
// ==========================================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll("[data-reveal]");
  if (!revealElements.length) return;

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// ==========================================================================
// INITIALIZATION ON DOM READY
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initEnvelopeIntro();
  initPetAmbience();
  initCountdown();
  initAmbientCanvas();
  initNavigation();
  initCalendar();
  initAddressCopy();
  initScrollReveal();
});

// ===========================================================================
// SEALED ENVELOPE INTRO
// ===========================================================================
function initEnvelopeIntro() {
  const intro = document.getElementById("envelope-intro");
  const openButton = document.getElementById("open-invitation");
  const invitation = document.getElementById("invitation-content");
  const footer = document.getElementById("invitation-footer");
  const backgroundElements = [invitation, footer, document.getElementById("navbar"), null].filter(Boolean);
  if (!intro || !openButton || !invitation || !footer) return;

  backgroundElements.forEach((element) => {
    element.inert = true;
    element.setAttribute("aria-hidden", "true");
  });
  document.body.classList.add("envelope-locked");
  openButton.focus();

  openButton.addEventListener("click", () => {
    if (openButton.disabled) return;
    openButton.disabled = true;
    intro.classList.add("is-opening");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      intro.hidden = true;
      intro.setAttribute("aria-hidden", "true");
      document.body.classList.remove("envelope-locked");
      backgroundElements.forEach((element) => {
        element.inert = false;
        element.removeAttribute("aria-hidden");
      });
      invitation.focus({ preventScroll: true });
    }, reducedMotion ? 0 : 680);
  });
}

// ===========================================================================
// OCCASIONAL PET CAMEOS WHILE GUESTS EXPLORE THE INVITATION
// ===========================================================================
function initPetAmbience() {
  const scene = document.getElementById("pet-ambience");
  const openButton = document.getElementById("open-invitation");
  if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const pets = [...scene.querySelectorAll(".pet-character")];
  let explorationStarted = false;
  let lastActivity = 0;

  function scheduleCameo(isFirst = false) {
    const minDelay = isFirst ? 3500 : 14000;
    const maxDelay = isFirst ? 8500 : 28000;
    window.setTimeout(playCameo, minDelay + Math.random() * (maxDelay - minDelay));
  }

  function playCameo() {
    const recentlyActive = Date.now() - lastActivity < 45000;
    if (document.hidden || !recentlyActive || document.body.classList.contains("envelope-locked")) {
      scheduleCameo();
      return;
    }

    scene.hidden = false;
    scene.classList.remove("is-running", "is-greeting", "is-leaving");
    const width = window.innerWidth;
    const height = window.innerHeight;
    const size = Math.max(70, Math.min(124, width * 0.19));
    const bounds = { x: size * 0.72, y: size * 0.72 };
    const avoid = [...document.querySelectorAll("#navbar")]
      .map((element) => element.getBoundingClientRect());
    const overlapsAvoid = (point) => avoid.some((rect) =>
      point.x > rect.left - size && point.x < rect.right + size &&
      point.y > rect.top - size && point.y < rect.bottom + size
    );
    const pickPoint = (exclude = []) => {
      for (let attempt = 0; attempt < 80; attempt += 1) {
        const point = {
          x: bounds.x + Math.random() * Math.max(1, width - bounds.x * 2),
          y: bounds.y + Math.random() * Math.max(1, height - bounds.y * 2)
        };
        if (!overlapsAvoid(point) && exclude.every((other) => Math.hypot(point.x - other.x, point.y - other.y) > size * 1.7)) return point;
      }
      return { x: width * (0.2 + Math.random() * 0.6), y: height * (0.25 + Math.random() * 0.5) };
    };

    const startSide = Math.random() > 0.5 ? -1 : 1;
    const setFacing = (pet, from, to) => pet.classList.toggle("is-facing-left", to.x < from.x);
    const leaderStart = {
      x: startSide < 0 ? -size : width + size,
      y: height * (0.2 + Math.random() * 0.6)
    };
    const firstTurn = pickPoint();
    const secondTurn = pickPoint();
    const meetingPoint = pickPoint();
    const leaderRoute = [leaderStart, firstTurn, secondTurn, meetingPoint];
    const greetingOffsets = [0, size * 1.05, -size * 1.05];
    const runDuration = 4800 + Math.random() * 500;
    pets.forEach((pet, index) => {
      const petSize = index === 0 ? size * 1.16 : size * 0.9;
      pet.style.setProperty("--pet-size", `${petSize}px`);
      const greeting = {
        x: Math.max(bounds.x, Math.min(width - bounds.x, meetingPoint.x + (index === 0 ? 0 : size * (index === 1 ? 0.55 : -0.55)))),
        y: Math.max(bounds.y, Math.min(height - bounds.y, meetingPoint.y + greetingOffsets[index]))
      };
      const delay = index * 420;
      const trailOffset = index * size * 0.16;
      const runPoints = [
        { x: leaderRoute[0].x + (startSide < 0 ? -trailOffset : trailOffset), y: leaderRoute[0].y + index * size * 0.14 },
        { x: leaderRoute[1].x - trailOffset, y: leaderRoute[1].y + index * size * 0.18 },
        { x: leaderRoute[2].x - trailOffset, y: leaderRoute[2].y + index * size * 0.16 },
        greeting
      ];
      const runKeys = runPoints.map((point, frameIndex) => ({
        transform: `translate3d(${point.x}px, ${point.y}px, 0) rotate(${frameIndex === 3 ? 0 : (Math.random() * 18 - 9).toFixed(1)}deg)`,
        ...(frameIndex < 3 ? { offset: [0, 0.32, 0.68][frameIndex] } : {})
      }));
      pet.style.opacity = "0.96";
      pet.getAnimations().forEach((animation) => animation.cancel());
      pet.animate(runKeys, { duration: runDuration, delay, easing: "ease-in-out", fill: "both" });
      setFacing(pet, runPoints[0], runPoints[1]);
      window.setTimeout(() => setFacing(pet, runPoints[1], runPoints[2]), delay + runDuration * 0.32);
      window.setTimeout(() => setFacing(pet, runPoints[2], runPoints[3]), delay + runDuration * 0.68);
      pet.dataset.greetingX = greeting.x;
      pet.dataset.greetingY = greeting.y;
      pet.dataset.runDuration = runDuration;
      pet.dataset.runDelay = delay;
    });
    void scene.offsetWidth;
    scene.classList.add("is-running");

    const runTime = Math.max(...pets.map((pet) => Number(pet.dataset.runDuration) + Number(pet.dataset.runDelay)));
    window.setTimeout(() => {
      pets.forEach((pet) => {
        pet.getAnimations().forEach((animation) => animation.cancel());
        pet.style.transform = `translate3d(${pet.dataset.greetingX}px, ${pet.dataset.greetingY}px, 0)`;
        pet.classList.remove("is-facing-left");
      });
      scene.classList.remove("is-running");
      scene.classList.add("is-greeting");

      window.setTimeout(() => {
        scene.classList.remove("is-greeting");
        scene.classList.add("is-leaving");
        const exitSide = Math.random() > 0.5 ? -1 : 1;
        const chasePoint = pickPoint();
        const exitPoint = { x: exitSide < 0 ? -size * 1.6 : width + size * 1.6, y: Math.random() * height };
        const exitRuns = pets.map((pet, index) => {
          const from = { x: Number(pet.dataset.greetingX), y: Number(pet.dataset.greetingY) };
          const duration = 2600 + Math.random() * 900;
          const delay = index * 300;
          const trail = index * size * 0.14;
          const chase = { x: chasePoint.x - trail, y: chasePoint.y + index * size * 0.16 };
          const exit = { x: exitPoint.x - trail * (exitSide < 0 ? -1 : 1), y: exitPoint.y + index * size * 0.18 };
          setFacing(pet, from, chase);
          window.setTimeout(() => setFacing(pet, chase, exit), delay + duration * 0.48);
          pet.style.opacity = "0.96";
          pet.getAnimations().forEach((animation) => animation.cancel());
          const animation = pet.animate([
            { transform: `translate3d(${from.x}px, ${from.y}px, 0)` },
            { transform: `translate3d(${chase.x}px, ${chase.y}px, 0) rotate(${Math.random() * 24 - 12}deg)`, offset: 0.48 },
            { transform: `translate3d(${exit.x}px, ${exit.y}px, 0) rotate(${Math.random() * 24 - 12}deg)` }
          ], { duration, delay, easing: "ease-in", fill: "forwards" });
          return animation.finished.catch(() => {});
        });

        Promise.all(exitRuns).then(() => {
          scene.hidden = true;
          scene.classList.remove("is-running", "is-greeting", "is-leaving");
          pets.forEach((pet) => {
            pet.getAnimations().forEach((animation) => animation.cancel());
            pet.style.cssText = "";
            pet.classList.remove("is-facing-left");
          });
          scheduleCameo();
        });
      }, 3000);
    }, runTime);
  }

  function markActivity() {
    lastActivity = Date.now();
  }

  function beginTrackingAfterFirstScroll() {
    if (explorationStarted) return;
    explorationStarted = true;
    markActivity();
    window.removeEventListener("scroll", beginTrackingAfterFirstScroll);
    window.addEventListener("scroll", markActivity, { passive: true });
    window.addEventListener("pointerdown", markActivity, { passive: true });
    window.addEventListener("keydown", markActivity);
    scheduleCameo(true);
  }

  function armScrollDetection() {
    window.addEventListener("scroll", beginTrackingAfterFirstScroll, { passive: true });
  }

  if (openButton && document.body.classList.contains("envelope-locked")) {
    openButton.addEventListener("click", () => window.setTimeout(armScrollDetection, 720), { once: true });
  } else {
    armScrollDetection();
  }
}
