/* ==========================================================
   Clevedon Barber 1 — showcase
   Everything a non-developer might need to change is in SETTINGS.
   ========================================================== */

const SETTINGS = {
  // What Google Maps searches for to place the pin and give directions.
  mapQuery: "Clevedon Barber 1, 13 Old Church Road, Clevedon BS21 6LZ",

  // The shop's Google star rating, as shown on its Google Maps listing, e.g. rating: 4.9, reviewCount: 87.
  // Leave as null to show a sample figure. Live Google reviews (below) fill these in automatically.
  rating: 4.9,
  reviewCount: 164,

  // Online booking page (Booksy, Fresha, Setmore...). Leave empty to hide the "Book online" button.
  bookingUrl: "",

  // Instagram profile, e.g. "https://www.instagram.com/clevedonbarber1/". Leave empty to hide the link.
  instagramUrl: "",

  // Live Google reviews. Needs both of these; see README.md for how to get them.
  // The API key must be restricted to this website's domain in Google Cloud.
  googleApiKey: "",
  googlePlaceId: "",

  // "Website by" credit in the footer. Hidden until both are filled in.
  creditName: "Jake L",
  creditUrl: "https://jakelovelock.com",
};

/* ---------- Small helpers ---------- */
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const enc = encodeURIComponent;
const starString = (n) => "★★★★★".slice(0, Math.round(n)) + "☆☆☆☆☆".slice(0, 5 - Math.round(n));

/* ---------- Links, map and directions ---------- */
(function wireLinks() {
  const q = enc(SETTINGS.mapQuery);
  const google = SETTINGS.googlePlaceId
    ? `https://www.google.com/maps/dir/?api=1&destination=${q}&destination_place_id=${enc(SETTINGS.googlePlaceId)}`
    : `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  const apple = `https://maps.apple.com/?daddr=${q}`;
  $$('[data-directions="google"]').forEach((a) => (a.href = google));
  $$('[data-directions="apple"]').forEach((a) => (a.href = apple));

  // The map only loads once it's close to being seen
  const map = $("[data-map]");
  if (map) {
    const src = `https://maps.google.com/maps?q=${q}&z=16&output=embed`;
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          map.src = src;
          io.disconnect();
        }
      }, { rootMargin: "600px" });
      io.observe(map);
    } else {
      map.src = src;
    }
  }

  $$("[data-book-external]").forEach((a) => {
    if (SETTINGS.bookingUrl) a.href = SETTINGS.bookingUrl;
    else a.setAttribute("hidden", "");
  });

  $$("[data-instagram-link]").forEach((a) => {
    if (SETTINGS.instagramUrl) a.href = SETTINGS.instagramUrl;
    else a.setAttribute("hidden", "");
  });

  if (SETTINGS.googlePlaceId) {
    $$("[data-review-link]").forEach((a) => (a.href = `https://search.google.com/local/reviews?placeid=${enc(SETTINGS.googlePlaceId)}`));
    $$("[data-write-review-link]").forEach((a) => (a.href = `https://search.google.com/local/writereview?placeid=${enc(SETTINGS.googlePlaceId)}`));
  }

  // Tell screen-reader users when a link opens a new tab
  $$('a[target="_blank"]').forEach((a) => {
    if (a.querySelector(".sr-only")) return;
    const note = document.createElement("span");
    note.className = "sr-only";
    note.textContent = " (opens in a new tab)";
    a.appendChild(note);
  });

  const credit = $("[data-credit]");
  if (credit && SETTINGS.creditName && SETTINGS.creditUrl) {
    const link = $("[data-credit-link]", credit);
    link.prepend(SETTINGS.creditName); // keeps the "(opens in a new tab)" note added above
    link.href = SETTINGS.creditUrl;
    credit.hidden = false;
  }

  const year = $("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();

/* ---------- Star rating (reviews section) ---------- */
function showRating(rating, count) {
  if (!rating) return;
  const value = Number(rating).toFixed(1);
  const counted = count ? ` from ${count} Google reviews` : " on Google";
  $$("[data-stars]").forEach((el) => (el.textContent = starString(rating)));

  $("[data-score-num]").textContent = value;
  $("[data-score-count]").textContent = count ? `from ${count} Google reviews` : "on Google";
  $("[data-score]").setAttribute("aria-label", `Rated ${value} out of 5${counted}`);
  $("[data-score-sample]")?.remove();
}
if (SETTINGS.rating) showRating(SETTINGS.rating, SETTINGS.reviewCount);

/* ---------- Scroll animations ---------- */
(function animations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("js-anim");

  // Stagger the children of each group
  $$("[data-reveal-group]").forEach((group) => {
    [...group.children].forEach((child, i) => child.style.setProperty("--i", Math.min(i, 10)));
  });

  // Count a number up from zero, keeping its decimal places
  const countUp = (el) => {
    const target = parseFloat(el.textContent);
    if (!isFinite(target)) return;
    const decimals = (el.textContent.split(".")[1] || "").length;
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (t < 1) requestAnimationFrame(tick);
    };
    el.textContent = (0).toFixed(decimals);
    requestAnimationFrame(tick);
  };

  // Headings and the map start fully clipped, which the browser counts as "not visible",
  // so watch their container instead and reveal them when it comes into view.
  const watched = new Map();
  $$("[data-reveal], [data-reveal-group]").forEach((el) => {
    const clipped = el.dataset.reveal === "heading" || el.dataset.reveal === "wipe";
    const target = clipped ? el.parentElement : el;
    if (!watched.has(target)) watched.set(target, []);
    watched.get(target).push(el);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      (watched.get(e.target) || []).forEach((el) => {
        el.classList.add("is-in");
        el.querySelectorAll("[data-count]").forEach(countUp);
      });
      io.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });

  watched.forEach((_, target) => io.observe(target));

  // Hero: the photo drifts slower than the page and the words fade as you scroll away
  const hero = $(".hero");
  const photo = $(".hero-photo");
  const copy = $(".hero-copy");
  if (hero && photo && copy) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const h = hero.offsetHeight;
      if (y > h) return;
      photo.style.translate = `0 ${(y * 0.3).toFixed(1)}px`;
      copy.style.opacity = String(Math.max(0, 1 - y / (h * 0.7)));
      copy.style.translate = `0 ${(y * 0.12).toFixed(1)}px`;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }
})();

/* ---------- Reviews slider ---------- */
(function reviewSlider() {
  const track = $("[data-reviews]");
  const controls = $("[data-slider-controls]");
  if (!track || !controls) return;
  const prev = $("[data-slider-prev]", controls);
  const next = $("[data-slider-next]", controls);
  const bar = $("[data-slider-bar]", controls);
  const smooth = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    controls.hidden = max <= 2;            // nothing to slide to
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max - 2;
    bar.style.width = `${(track.clientWidth / track.scrollWidth) * 100}%`;
    bar.style.left = `${(track.scrollLeft / track.scrollWidth) * 100}%`;
  };

  // Move by one card on phones and a full set of cards on bigger screens
  const step = (dir) => {
    const card = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const cardWidth = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    const perView = Math.max(1, Math.floor((track.clientWidth + gap) / cardWidth));
    track.scrollBy({ left: dir * cardWidth * perView, behavior: smooth });
  };

  prev.addEventListener("click", () => step(-1));
  next.addEventListener("click", () => step(1));
  track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
  window.addEventListener("resize", update);
  window.cb1SliderUpdate = update;
  update();
})();

/* ---------- Scroll cue fades once you start scrolling ---------- */
(function scrollCue() {
  const cue = $("[data-scroll-cue]");
  if (!cue) return;
  const update = () => cue.classList.toggle("is-hidden", window.scrollY > 40);
  update();
  window.addEventListener("scroll", update, { passive: true });
})();

/* ---------- Header turns solid once you scroll past the photo ---------- */
(function header() {
  const el = $("[data-header]");
  const hero = $(".hero");
  if (!el || !hero) return;
  const update = () => el.classList.toggle("is-solid", window.scrollY > hero.offsetHeight - 80);
  update();
  window.addEventListener("scroll", update, { passive: true });
})();

/* ---------- Phone menu ---------- */
(function phoneMenu() {
  const btn = $("[data-burger]");
  const menu = $("[data-menu]");
  const header = $("[data-header]");
  if (!btn || !menu) return;

  const setOpen = (open, { returnFocus = true, fromKeyboard = false } = {}) => {
    menu.classList.toggle("is-open", open);
    header?.classList.toggle("menu-open", open);
    document.documentElement.classList.toggle("menu-lock", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) {
      menu.removeAttribute("inert");
      // Mirror the "open now" line into the menu
      const status = $("[data-status]");
      const menuStatus = $("[data-menu-status]");
      if (status && menuStatus) {
        menuStatus.textContent = status.textContent;
        menuStatus.classList.toggle("is-open", status.classList.contains("is-open"));
      }
      // Move focus into the menu for keyboard users only, so taps don't leave a focus ring on "Home"
      if (fromKeyboard) setTimeout(() => menu.querySelector("a")?.focus({ preventScroll: true }), 350);
    } else {
      menu.setAttribute("inert", "");
      if (returnFocus) btn.focus({ preventScroll: true });
    }
  };

  // A click with detail 0 came from the keyboard (Enter or Space)
  btn.addEventListener("click", (e) => setOpen(btn.getAttribute("aria-expanded") !== "true", { fromKeyboard: e.detail === 0 }));
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false, { returnFocus: false });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) setOpen(false);
  });
  window.matchMedia("(min-width: 52.01rem)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false, { returnFocus: false });
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

/* ---------- Gallery lightbox ---------- */
(function lightbox() {
  const dialog = $("[data-lightbox]");
  const img = $("[data-lightbox-img]");
  if (!dialog || !img || typeof dialog.showModal !== "function") return;

  const shots = $$("[data-gallery] button.shot img");
  let index = 0;
  const show = (i) => {
    index = (i + shots.length) % shots.length;
    img.src = shots[index].dataset.full || shots[index].currentSrc || shots[index].src;
    img.alt = shots[index].alt;
  };

  const preload = (i) => {
    const s = shots[(i + shots.length) % shots.length];
    if (s?.dataset.full) new Image().src = s.dataset.full;
  };
  const showAndPreload = (i) => { show(i); preload(index + 1); preload(index - 1); };

  // Swipe left and right on phones
  let touchX = null;
  dialog.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  dialog.addEventListener("touchend", (e) => {
    if (touchX === null || shots.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showAndPreload(index + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  shots.forEach((s, i) => s.closest("button").addEventListener("click", () => {
    showAndPreload(i);
    dialog.showModal();
  }));

  const many = shots.length > 1;
  $("[data-lightbox-prev]").hidden = !many;
  $("[data-lightbox-next]").hidden = !many;
  $("[data-lightbox-prev]").addEventListener("click", () => showAndPreload(index - 1));
  $("[data-lightbox-next]").addEventListener("click", () => showAndPreload(index + 1));
  $("[data-lightbox-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && many) showAndPreload(index - 1);
    if (e.key === "ArrowRight" && many) showAndPreload(index + 1);
  });
})();

/* ---------- Live Google reviews ---------- */
(function googleReviews() {
  if (!SETTINGS.googleApiKey || !SETTINGS.googlePlaceId) return; // sample cards stay, clearly labelled

  window.__cb1MapsReady = async () => {
    try {
      const { Place } = await google.maps.importLibrary("places");
      const place = new Place({ id: SETTINGS.googlePlaceId });
      await place.fetchFields({ fields: ["rating", "userRatingCount", "reviews", "googleMapsURI", "regularOpeningHours"] });
      render(place);
    } catch (err) {
      console.warn("Google reviews could not load:", err);
    }
  };

  const s = document.createElement("script");
  s.src = `https://maps.googleapis.com/maps/api/js?key=${enc(SETTINGS.googleApiKey)}&v=weekly&loading=async&callback=__cb1MapsReady`;
  s.async = true;
  document.head.appendChild(s);

  function render(place) {
    showRating(place.rating, place.userRatingCount);
    if (place.regularOpeningHours?.periods) window.cb1ApplyGoogleHours(place.regularOpeningHours.periods);
    if (place.googleMapsURI) $$("[data-review-link]").forEach((a) => (a.href = place.googleMapsURI));

    // Swap the sample cards for Google's reviews, keeping any written by hand
    const list = $("[data-reviews]");
    const reviews = (place.reviews || []).filter((r) => r.text);
    if (!reviews.length) return;
    $$(".is-sample", list).forEach((el) => el.remove());
    reviews.forEach((r) => list.appendChild(card(r)));
    $("[data-reviews-credit]").hidden = false;
    window.cb1SliderUpdate?.();
  }

  function card(r) {
    const li = document.createElement("li");
    li.className = "review";

    const stars = document.createElement("span");
    stars.className = "stars";
    stars.textContent = starString(r.rating);
    stars.setAttribute("role", "img");
    stars.setAttribute("aria-label", `${r.rating} out of 5 stars`);

    const quote = document.createElement("blockquote");
    const p = document.createElement("p");
    p.textContent = r.text;
    quote.appendChild(p);

    const by = document.createElement("p");
    by.className = "review-by";
    const author = r.authorAttribution;
    if (author?.photoURI) {
      const pic = document.createElement("img");
      pic.src = author.photoURI;
      pic.alt = "";
      pic.loading = "lazy";
      pic.referrerPolicy = "no-referrer";
      by.appendChild(pic);
    }
    const who = document.createElement("span");
    const name = document.createElement(author?.uri ? "a" : "span");
    name.textContent = author?.displayName || "Google user";
    if (author?.uri) { name.href = author.uri; name.rel = "noopener"; }
    const when = document.createElement("span");
    when.className = "review-when";
    when.textContent = r.relativePublishTimeDescription || "";
    who.append(name, when);
    by.appendChild(who);

    li.append(stars, quote, by);
    return li;
  }
})();

/* ---------- Opening hours ---------- */
(function openingHours() {
  const table = $("[data-hours]");
  const status = $("[data-status]");
  if (!table) return;

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const toMins = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
  const pretty = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    const suffix = h >= 12 ? "pm" : "am";
    const h12 = h % 12 || 12;
    return m ? `${h12}:${String(m).padStart(2, "0")}${suffix}` : `${h12}${suffix}`;
  };
  const hhmm = (h, m) => `${String(h).padStart(2, "0")}:${String(m || 0).padStart(2, "0")}`;

  function render() {
    const byDay = {};
    $$("[data-day]", table).forEach((el) => {
      el.classList.remove("is-today");
      el.removeAttribute("aria-current");
      byDay[el.dataset.day] = { open: el.dataset.open, close: el.dataset.close, el };
    });

    // Always use UK time, wherever the visitor is
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London", weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t)?.value;
    const today = days.indexOf(get("weekday"));
    const now = Number(get("hour")) * 60 + Number(get("minute"));

    const todayInfo = byDay[today];
    if (todayInfo) {
      todayInfo.el.classList.add("is-today");
      todayInfo.el.setAttribute("aria-current", "date");
    }
    if (!status) return;
    status.classList.remove("is-open");

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
        status.textContent = `Closed now. Opens ${step === 1 ? "tomorrow" : days[d]} at ${pretty(info.open)}`;
        return;
      }
    }
    status.textContent = "";
  }

  // Google's opening hours: [{ open: { day, hour, minute }, close: { day, hour, minute } }], day 0 = Sunday
  window.cb1ApplyGoogleHours = (periods) => {
    $$("[data-day]", table).forEach((row) => {
      const p = periods.find((x) => x.open?.day === Number(row.dataset.day));
      const cell = row.querySelector("td");
      if (p && p.close) {
        row.dataset.open = hhmm(p.open.hour, p.open.minute);
        row.dataset.close = hhmm(p.close.hour, p.close.minute);
        cell.textContent = `${pretty(row.dataset.open)} to ${pretty(row.dataset.close)}`;
      } else if (!p) {
        row.dataset.open = "";
        row.dataset.close = "";
        cell.textContent = "Closed";
      }
    });
    render();
  };

  render();
})();
