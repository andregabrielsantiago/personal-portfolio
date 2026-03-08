/* ============================================================
   script.js — Andre Gabriel Portfolio
   ============================================================ */

/* ── PROJECT DATA ─────────────────────────────────────────
   Each project uses --accent (hex) and --rgb (r,g,b) for
   per-card theming via CSS custom properties.

   thumb  : filename in same folder, e.g. "my-image.png"
   video  : { type:"local"|"youtube"|"drive", src:"file.mp4" }
   openModal: true  → clicking the card opens the IBM modal
   ─────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: "IBM Department Shirt",
    subtitle: "Brand Identity & Uniform Design",
    category: "Branding",
    year: "2024",
    initials: "IBM",
    thumb: "portfolio-department-shirt-thumbnail.png",
    video: { type: "local", src: "Portfolio Department Shirt Video.mp4" },
    desc: "Official department shirt for the Institute of Business Management — featuring a DNA strand motif and a wolf emblem representing unity, leadership, and academic excellence. Officially adopted by the 2024 batch.",
    accent: "#f5c400",
    rgb: "245,196,0",
    openModal: true
  },
  {
    id: 2,
    title: "Social Media Campaign",
    subtitle: "Digital Content Strategy",
    category: "Social Media",
    year: "2024",
    initials: "SM",
    thumb: "",
    video: null,
    desc: "A full-scale social media campaign built to grow brand presence and audience engagement across multiple platforms through consistent visual storytelling and data-driven content planning.",
    accent: "#00d4ff",
    rgb: "0,212,255"
  },
  {
    id: 3,
    title: "Motion Graphics Reel",
    subtitle: "Animation & Video Production",
    category: "Motion",
    year: "2024",
    initials: "MG",
    thumb: "",
    video: null,
    desc: "A curated collection of motion graphics and animated visuals produced for various brand campaigns, showcasing fluid transitions, kinetic typography, and purposeful visual rhythm.",
    accent: "#9b59ff",
    rgb: "155,89,255"
  },
  {
    id: 4,
    title: "Web Interface Design",
    subtitle: "UI / UX & Visual Design",
    category: "UI/UX",
    year: "2024",
    initials: "WD",
    thumb: "",
    video: null,
    desc: "A clean, responsive web interface designed with a focus on user experience, accessibility, and modern visual design principles — built for a digital-first audience seeking intuitive interactions.",
    accent: "#ff6b35",
    rgb: "255,107,53"
  },
  {
    id: 5,
    title: "Print Design Collection",
    subtitle: "Editorial & Print Media",
    category: "Print",
    year: "2023",
    initials: "PD",
    thumb: "",
    video: null,
    desc: "A series of editorial and print design works including posters, flyers, and brochures — each crafted with intentional typography, structured layout, and strong visual hierarchy.",
    accent: "#00e5b4",
    rgb: "0,229,180"
  },
  {
    id: 6,
    title: "Event Branding Package",
    subtitle: "Event Identity & Collateral",
    category: "Branding",
    year: "2023",
    initials: "EB",
    thumb: "",
    video: null,
    desc: "A comprehensive event branding package covering visual identity, promotional materials, and on-site signage — designed to create a unified and memorable experience from invitation to stage.",
    accent: "#ff4d7e",
    rgb: "255,77,126"
  }
];

const SERVICES = [
  { abbr: "BRD", title: "Brand Strategy & Design",    desc: "Craft a compelling brand identity that resonates with your audience and stands apart from the competition." },
  { abbr: "UI",  title: "UI/UX & Web Design",         desc: "Design clean, user-centered interfaces that convert visitors into engaged users with intuitive visual systems." },
  { abbr: "SOC", title: "Social Media Design",         desc: "Build a consistent visual presence across platforms with scroll-stopping content and on-brand creative assets." },
  { abbr: "MOT", title: "Motion & Video Graphics",     desc: "Bring ideas to life through dynamic animation, kinetic typography, and purposeful motion design." },
  { abbr: "PRT", title: "Print & Editorial Design",    desc: "Create polished print materials — from posters to brochures — with precise layout and typographic craft." },
  { abbr: "PKG", title: "Packaging & Collateral",      desc: "Design packaging and event collateral that communicate quality, cohesion, and a strong visual narrative." }
];

/* ── MODAL (IBM project only) ─────────────────────────── */
const ibmData = PROJECTS.find(p => p.openModal);

function openModal() {
  document.getElementById("ibmModal").classList.add("open");
  document.body.style.overflow = "hidden";
  switchTab("img");
}

function closeModal() {
  document.getElementById("ibmModal").classList.remove("open");
  document.body.style.overflow = "";
  const vid = document.getElementById("modalVideo");
  if (vid) vid.pause();
}

function closeModalOnOverlay(e) {
  if (e.target === document.getElementById("ibmModal")) closeModal();
}

function switchTab(tab) {
  ["img", "vid", "desc"].forEach(t => {
    document.getElementById("tab-" + t).classList.toggle("active", t === tab);
    document.getElementById("panel-" + t).classList.toggle("active", t === tab);
  });
}

document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

function buildModalVideo() {
  const shell = document.getElementById("modalVideoShell");
  if (!shell || !ibmData || !ibmData.video) return;
  const { type, src } = ibmData.video;
  if (!src) {
    shell.innerHTML = `
      <div class="vid-placeholder">
        <div class="vid-play">&#9654;</div>
        <div class="vid-label">IBM Shirt Showcase Video</div>
        <div class="vid-hint">Set video.src in script.js to load your video</div>
      </div>`;
    return;
  }
  if (type === "local") {
    shell.innerHTML = `
      <video id="modalVideo" controls preload="metadata">
        <source src="${src}" type="video/mp4"/>
        Your browser does not support HTML5 video.
      </video>`;
  } else {
    shell.innerHTML = `<iframe src="${src}" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;
  }
}

function buildModalImage() {
  const frame = document.getElementById("modalImgFrame");
  if (!frame || !ibmData) return;
  if (ibmData.thumb) {
    const img = new Image();
    img.onload = () => { frame.innerHTML = `<img src="${ibmData.thumb}" alt="IBM Department Shirt Design"/>`; };
    img.onerror = () => showImgFallback(frame);
    img.src = ibmData.thumb;
  } else {
    showImgFallback(frame);
  }
}

function showImgFallback(frame) {
  frame.innerHTML = `
    <div class="modal-img-fallback">
      <div class="mif-initials">IBM</div>
      <div class="mif-label">IBM Department Shirt Design</div>
      <div class="mif-hint">Set thumb: "your-file.png" in PROJECTS[0]</div>
    </div>`;
}

/* ── RENDER PROJECTS ───────────────────────────────────── */
let activeFilter = "All";
let searchQuery  = "";

function getCategories() {
  return ["All", ...new Set(PROJECTS.map(p => p.category))];
}

function renderFilterBtns() {
  document.getElementById("filterBtns").innerHTML = getCategories()
    .map(c => `<button class="filter-btn${c === activeFilter ? " active" : ""}" onclick="setFilter('${c}')">${c}</button>`)
    .join("");
}

function setFilter(cat) { activeFilter = cat; renderFilterBtns(); renderProjects(); }

function filterProjects() {
  searchQuery = document.getElementById("searchInput").value.toLowerCase();
  renderProjects();
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");

  const list = PROJECTS.filter(p => {
    const mc = activeFilter === "All" || p.category === activeFilter;
    const ms = !searchQuery || [p.title, p.subtitle, p.category, p.desc]
      .some(s => s && s.toLowerCase().includes(searchQuery));
    return mc && ms;
  });

  if (!list.length) {
    grid.innerHTML = `<div class="no-results"><p>No projects found. Try a different filter.</p></div>`;
    return;
  }

  grid.innerHTML = list.map((p, i) => `
    <div class="large-card reveal"
         style="--accent:${p.accent};--accent-rgb:${p.rgb};transition-delay:${i * .1}s"
         onclick="${p.openModal ? 'openModal()' : ''}">

      ${p.openModal ? '<div class="lc-badge">Featured</div>' : ''}

      <!-- Left: image / initials -->
      <div class="lc-thumb">
        <div class="lc-initials">${p.initials}</div>
        ${p.thumb ? `<img class="lc-img" src="${p.thumb}" alt="${p.title}"/>` : ''}
        <div class="lc-year-tag">${p.year}</div>
      </div>

      <!-- Right: content -->
      <div class="lc-body">
        <div class="lc-top">
          <span class="lc-tag">${p.category}</span>
        </div>
        <h3 class="lc-title">${p.title}</h3>
        <p class="lc-sub">${p.subtitle}</p>
        <p class="lc-desc">${p.desc}</p>
        <div class="lc-footer">
          <span class="lc-link">${p.openModal ? 'View Full Project' : 'View Case Study'} &rarr;</span>
        </div>
      </div>

    </div>`).join("");

  observeReveal();
}

/* ── RENDER SERVICES ──────────────────────────────────── */
function renderServices() {
  document.getElementById("servicesGrid").innerHTML = SERVICES.map((s, i) => `
    <div class="svc-card reveal" style="transition-delay:${i * .08}s">
      <div class="svc-icon">${s.abbr}</div>
      <div class="svc-title">${s.title}</div>
      <div class="svc-desc">${s.desc}</div>
    </div>`).join("");
  observeReveal();
}

/* ── HERO MINI-CHARTS ─────────────────────────────────── */
function buildMiniCharts() {
  const bars1 = [30,55,40,70,50,90,75,100,85,110,95,145];
  const e1 = document.getElementById("miniChart1");
  if (e1) e1.innerHTML = bars1.map(h => `<div class="mini-bar" style="height:${h/145*38}px"></div>`).join("");

  const bars2 = [20,45,38,60,55,80,70,95,88,100,92,110];
  const e2 = document.getElementById("miniChart2");
  if (e2) e2.innerHTML = bars2.map(h =>
    `<div class="mini-bar" style="height:${h/110*38}px;background:linear-gradient(180deg,var(--blue),transparent)"></div>`
  ).join("");
}

/* ── COUNTER ANIMATION ────────────────────────────────── */
let countersStarted = false;
function animateCounters() {
  document.querySelectorAll("[data-count]").forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.closest(".stat-item").querySelector(".s-lbl").textContent.includes("%") ? "%" : "+";
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 25);
  });
}

/* ── INTERSECTION OBSERVERS ───────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); revealObs.unobserve(e.target); }
  });
}, { threshold: .1 });

function observeReveal() {
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => revealObs.observe(el));
}

const statsObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersStarted) { countersStarted = true; animateCounters(); }
}, { threshold: .4 });

/* ── NAVBAR ───────────────────────────────────────────── */
window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 40);
  const sections = ["hero", "projects", "services", "contact"];
  let current = "hero";
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  document.querySelectorAll(".nav-links a").forEach(a =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + current)
  );
});

function toggleMenu() { document.getElementById("mobileMenu").classList.toggle("open"); }

/* ── CONTACT FORM ─────────────────────────────────────── */
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector(".form-submit");
  btn.textContent = "Sending...";
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById("formSuccess").style.display = "block";
    btn.textContent = "Message Sent";
    btn.style.cssText = "background:rgba(57,255,126,.2);color:var(--green);border:1px solid var(--green)";
  }, 1200);
}

/* ── CANVAS PARTICLES ─────────────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById("bgCanvas");
  const ctx    = canvas.getContext("2d");
  let W, H, pts;
  const N = 55;

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function mkPt() {
    return { x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.5+.5,
             vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3, a: Math.random()*.6+.2 };
  }
  function init() { resize(); pts = Array.from({ length: N }, mkPt); }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < N; i++) {
      for (let j = i+1; j < N; j++) {
        const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if (d < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(57,255,126,${.12*(1-d/150)})`;
          ctx.lineWidth = .5;
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    pts.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(57,255,126,${p.a})`; ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener("resize", resize);
  init(); draw();
})();

/* ── INIT ─────────────────────────────────────────────── */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hide");
    renderFilterBtns();
    renderProjects();
    renderServices();
    buildMiniCharts();
    buildModalImage();
    buildModalVideo();
    observeReveal();
    statsObs.observe(document.getElementById("stats-bar"));
  }, 1400);

});
