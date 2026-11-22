/* ==========================================================
   Clevedon Barber 1 — site behaviour
   Everything a non-developer might need to change is in SETTINGS.
   ========================================================== */

const SETTINGS = {
  // Online booking page (Booksy, Fresha, Setmore, Square...). Leave empty to send people to the phone instead.
  bookingUrl: "",
  // Instagram profile, e.g. "https://www.instagram.com/clevedonbarber1/"
  instagramUrl: "",
  phone: "tel:+447393538789",

  // What Google Maps searches for to place the pin and give directions.
  mapQuery: "Clevedon Barber 1, 13 Old Church Road, Clevedon BS21 6LZ",

  // The shop's Google star rating, as shown on its Google Maps listing.
  rating: 4.9,
  reviewCount: 164,

  // "Website by" credit in the footer. Hidden if either is empty.
  creditName: "Jake L",
  creditUrl: "https://jakelovelock.com",
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- Links ---------- */
(function wireLinks() {
  const booking = SETTINGS.bookingUrl || SETTINGS.phone;
  document.querySelectorAll("[data-book-external]").forEach((a) => {
    a.href = booking;
    if (SETTINGS.bookingUrl) a.rel = "noopener";
    else {
      a.textContent = "Call 07393 538789";
      a.removeAttribute("target"); // a phone link shouldn't open a new tab
    }
  });
  if (!SETTINGS.bookingUrl) {
    document.querySelector("[data-book-alt]")?.setAttribute("hidden", "");
    const copy = document.querySelector("[data-book-copy]");
    if (copy) copy.textContent = copy.dataset.offlineText;
  }

  document.querySelectorAll("[data-instagram-link]").forEach((a) => {
    if (SETTINGS.instagramUrl) a.href = SETTINGS.instagramUrl;
    else a.closest("li, a")?.setAttribute("hidden", "");
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();

/* ---------- The pier drawing ---------- */
(function drawPier() {
  const svg = document.querySelector(".pier-svg");
  if (!svg) return;
  const NS = "http://www.w3.org/2000/svg";
  const lines = svg.querySelector(".pier-lines");

  const DECK = 150;      // deck height
  const RAIL = 128;      // handrail height
  const SPRING = 300;    // where the arches spring from the legs
  const FIRST_LEG = 40;
  const SPAN = 148;
  const SPANS = 8;       // Clevedon Pier has eight spans
  const LAST_LEG = FIRST_LEG + SPAN * SPANS;
  const HEAD_END = LAST_LEG + 190;

  const add = (d, cls, i) => {
    const p = document.createElementNS(NS, "path");
    p.setAttribute("d", d);
    p.setAttribute("pathLength", "1");
    p.setAttribute("class", cls);
    p.style.setProperty("--i", i);
    lines.appendChild(p);
  };

  // A point on a quadratic curve, for the vertical bracing
  const q = (t, a, c, b) => (1 - t) ** 2 * a + 2 * (1 - t) * t * c + t * t * b;

  // Deck and handrail run the full length first
  add(`M0 ${DECK} H${HEAD_END}`, "stroke-main", 0);
  add(`M0 ${RAIL} H${HEAD_END}`, "stroke-fine", 1);
  let posts = "";
  for (let x = 20; x <= HEAD_END; x += 32) posts += `M${x} ${RAIL} V${DECK} `;
  add(posts, "stroke-fine", 2);

  for (let s = 0; s < SPANS; s++) {
    const x1 = FIRST_LEG + s * SPAN + 6;
    const x2 = x1 + SPAN - 12;
    const mid = (x1 + x2) / 2;
    const i = s + 2;

    // Outer arch touches the deck at mid-span; inner arch sits just below it
    add(`M${x1} ${SPRING} Q${mid} 4 ${x2} ${SPRING}`, "stroke-main", i);
    add(`M${x1} ${SPRING} Q${mid} 40 ${x2} ${SPRING}`, "stroke-fine", i);

    let braces = "";
    [0.12, 0.25, 0.75, 0.88].forEach((t) => {
      const x = q(t, x1, mid, x2);
      const y = q(t, SPRING, 4, SPRING);
      braces += `M${x.toFixed(1)} ${DECK} V${y.toFixed(1)} `;
    });
    add(braces, "stroke-fine", i);
  }

  // Twin legs, running down into the water
  for (let l = 0; l <= SPANS; l++) {
    const x = FIRST_LEG + l * SPAN;
    add(`M${x - 6} ${DECK} V420 M${x + 6} ${DECK} V420`, "stroke-main", l + 2);
  }

  // Pierhead pavilion with its curved roof
  const px = LAST_LEG + 40;
  const pw = 110;
  const i = SPANS + 3;
  add(`M${px} ${DECK} V106 H${px + pw} V${DECK}`, "stroke-main", i);
  add(`M${px - 12} 106 Q${px + pw / 2} 50 ${px + pw + 12} 106`, "stroke-main", i + 1);
  add(`M${px + pw / 2} 78 V60`, "stroke-fine", i + 2);
  add(`M${px + 22} ${DECK} V128 Q${px + 32} 116 ${px + 42} 128 V${DECK} M${px + 68} ${DECK} V128 Q${px + 78} 116 ${px + 88} 128 V${DECK}`, "stroke-fine", i + 2);
  add(`M${HEAD_END} ${DECK} V420 M${HEAD_END - 12} ${DECK} V420`, "stroke-main", i);

  // Water
  const wave = (base, amp, len) => {
    let d = `M-20 ${base}`;
    for (let x = -20; x <= 1640; x += 20) {
      d += ` L${x} ${(base + Math.sin(x / len) * amp).toFixed(1)}`;
    }
    return d + " V480 H-20 Z";
  };
  svg.querySelector(".tide-back").setAttribute("d", wave(294, 4, 60));
  svg.querySelector(".tide-front").setAttribute("d", wave(316, 5, 85));
})();

/* ---------- Opening hours ---------- */
(function openingHours() {
  const table = document.querySelector("[data-hours]");
  const status = document.querySelector("[data-status]");
  if (!table) return;

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const rows = [...table.querySelectorAll("tr[data-day]")];
  const byDay = {};
  rows.forEach((r) => {
    byDay[r.dataset.day] = { open: r.dataset.open, close: r.dataset.close, row: r };
  });

  const toMins = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };
  const pretty = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    const suffix = h >= 12 ? "pm" : "am";
    const h12 = h % 12 || 12;
    return m ? `${h12}:${String(m).padStart(2, "0")}${suffix}` : `${h12}${suffix}`;
  };

  // Always use UK time, wherever the visitor is
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London", weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const today = days.indexOf(get("weekday"));
  const now = Number(get("hour")) * 60 + Number(get("minute"));

  const todayInfo = byDay[today];
  if (todayInfo) {
    todayInfo.row.classList.add("is-today");
    todayInfo.row.setAttribute("aria-current", "date");
  }

  if (!status) return;

  if (todayInfo?.open && now >= toMins(todayInfo.open) && now < toMins(todayInfo.close)) {
    status.textContent = `Open now until ${pretty(todayInfo.close)}`;
    status.classList.add("is-open");
    return;
  }

  if (todayInfo?.open && now < toMins(todayInfo.open)) {
    status.textContent = `Closed now. Opens today at ${pretty(todayInfo.open)}`;
    return;
  }

  for (let step = 1; step <= 7; step++) {
    const d = (today + step) % 7;
    const info = byDay[d];
    if (info?.open) {
      const when = step === 1 ? "tomorrow" : days[d];
      status.textContent = `Closed now. Opens ${when} at ${pretty(info.open)}`;
      return;
    }
  }
})();

/* ---------- Map, directions, rating, credit ---------- */
(function details() {
  const q = encodeURIComponent(SETTINGS.mapQuery);
  $$('[data-directions="google"]').forEach((a) => (a.href = `https://www.google.com/maps/dir/?api=1&destination=${q}`));
  $$('[data-directions="apple"]').forEach((a) => (a.href = `https://maps.apple.com/?daddr=${q}`));

  // The map only loads once it's close to being seen
  const map = $("[data-map]");
  if (map) {
    const src = `https://maps.google.com/maps?q=${q}&z=16&output=embed`;
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) { map.src = src; io.disconnect(); }
      }, { rootMargin: "600px" });
      io.observe(map);
    } else {
      map.src = src;
    }
  }

  if (SETTINGS.rating) {
    const value = Number(SETTINGS.rating).toFixed(1);
    $("[data-score-num]").textContent = value;
    $("[data-score-count]").textContent = SETTINGS.reviewCount ? `from ${SETTINGS.reviewCount} Google reviews` : "on Google";
    $("[data-score]").setAttribute("aria-label", `Rated ${value} out of 5 from ${SETTINGS.reviewCount} Google reviews`);
  } else {
    $(".rating")?.setAttribute("hidden", "");
  }

  const credit = $("[data-credit]");
  if (credit && SETTINGS.creditName && SETTINGS.creditUrl) {
    const link = $("[data-credit-link]", credit);
    link.textContent = SETTINGS.creditName;
    link.href = SETTINGS.creditUrl;
    credit.hidden = false;
  }

  // Tell screen-reader users when a link opens a new tab
  $$('a[target="_blank"]').forEach((a) => {
    if (a.querySelector(".sr-only")) return;
    const note = document.createElement("span");
    note.className = "sr-only";
    note.textContent = " (opens in a new tab)";
    a.appendChild(note);
  });
})();

/* ---------- Gallery: show all ---------- */
(function galleryMore() {
  const btn = $("[data-gallery-more]");
  const gallery = $("[data-gallery]");
  if (!btn || !gallery) return;
  const total = $$("li", gallery).length;
  const extras = $$(".is-extra", gallery);
  if (!extras.length) { btn.parentElement.hidden = true; return; }
  btn.addEventListener("click", () => {
    const open = !gallery.classList.contains("is-expanded");
    gallery.classList.toggle("is-expanded", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "Show fewer" : `Show all ${total} cuts`;
    if (open) extras.forEach((li, i) => (li.style.animationDelay = `${Math.min(i, 12) * 40}ms`));
    else $("#work").scrollIntoView({ block: "start" });
  });
})();

/* ---------- Full-screen photo viewer ---------- */
(function lightbox() {
  const dialog = $("[data-lightbox]");
  const img = $("[data-lightbox-img]");
  if (!dialog || !img || typeof dialog.showModal !== "function") return;
  const shots = $$("[data-gallery] button.shot img");
  let index = 0;
  const show = (i) => {
    index = (i + shots.length) % shots.length;
    img.src = shots[index].dataset.full || shots[index].src;
    img.alt = shots[index].alt;
    [index + 1, index - 1].forEach((n) => {
      const s = shots[(n + shots.length) % shots.length];
      if (s?.dataset.full) new Image().src = s.dataset.full;
    });
  };
  shots.forEach((s, i) => s.closest("button").addEventListener("click", () => { show(i); dialog.showModal(); }));
  $("[data-lightbox-prev]").addEventListener("click", () => show(index - 1));
  $("[data-lightbox-next]").addEventListener("click", () => show(index + 1));
  $("[data-lightbox-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
  let touchX = null;
  dialog.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  dialog.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    touchX = null;
  });
})();

/* ---------- Phone menu ---------- */
(function phoneMenu() {
  const btn = $("[data-burger]");
  const menu = $("[data-menu]");
  const header = $(".site-header");
  if (!btn || !menu) return;
  const setOpen = (open, { returnFocus = true, fromKeyboard = false } = {}) => {
    menu.classList.toggle("is-open", open);
    header?.classList.toggle("menu-open", open);
    document.documentElement.classList.toggle("menu-lock", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) {
      menu.removeAttribute("inert");
      const status = $("[data-status]");
      const menuStatus = $("[data-menu-status]");
      if (status && menuStatus) {
        menuStatus.textContent = status.textContent;
        menuStatus.classList.toggle("is-open", status.classList.contains("is-open"));
      }
      if (fromKeyboard) setTimeout(() => menu.querySelector("a")?.focus({ preventScroll: true }), 350);
    } else {
      menu.setAttribute("inert", "");
      if (returnFocus) btn.focus({ preventScroll: true });
    }
  };
  // A click with detail 0 came from the keyboard (Enter or Space)
  btn.addEventListener("click", (e) => setOpen(btn.getAttribute("aria-expanded") !== "true", { fromKeyboard: e.detail === 0 }));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false, { returnFocus: false }); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("is-open")) setOpen(false); });
  window.matchMedia("(min-width: 52.01rem)").addEventListener("change", (e) => { if (e.matches) setOpen(false, { returnFocus: false }); });
})();
